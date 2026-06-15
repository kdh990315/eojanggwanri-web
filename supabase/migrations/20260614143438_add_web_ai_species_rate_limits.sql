create table public.web_ai_species_rate_limits (
  client_hash text not null,
  window_start timestamptz not null,
  request_count integer not null default 1 check (request_count > 0),
  updated_at timestamptz not null default now(),
  primary key (client_hash, window_start)
);

alter table public.web_ai_species_rate_limits enable row level security;

comment on table public.web_ai_species_rate_limits is
  'Hourly request counters for anonymous web AI species identification. Stores hashed client identifiers only.';

create or replace function public.consume_web_ai_species_quota(
  request_client_hash text
)
returns boolean
language plpgsql
security definer
set search_path = public, pg_catalog
as $$
declare
  current_window timestamptz := date_trunc('hour', now());
  global_count integer;
  client_count integer;
begin
  if request_client_hash !~ '^[a-f0-9]{64}$' then
    return false;
  end if;

  delete from public.web_ai_species_rate_limits
  where window_start < current_window - interval '2 hours';

  insert into public.web_ai_species_rate_limits as limits (
    client_hash,
    window_start,
    request_count,
    updated_at
  ) values (
    '__global__',
    current_window,
    1,
    now()
  )
  on conflict (client_hash, window_start) do update
  set request_count = limits.request_count + 1,
      updated_at = now()
  where limits.request_count < 500
  returning request_count into global_count;

  if global_count is null then
    return false;
  end if;

  insert into public.web_ai_species_rate_limits as limits (
    client_hash,
    window_start,
    request_count,
    updated_at
  ) values (
    request_client_hash,
    current_window,
    1,
    now()
  )
  on conflict (client_hash, window_start) do update
  set request_count = limits.request_count + 1,
      updated_at = now()
  where limits.request_count < 10
  returning request_count into client_count;

  return client_count is not null;
end;
$$;

revoke all on table public.web_ai_species_rate_limits from anon, authenticated;
revoke all on function public.consume_web_ai_species_quota(text)
  from public, anon, authenticated;
grant execute on function public.consume_web_ai_species_quota(text)
  to service_role;
