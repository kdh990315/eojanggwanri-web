create policy "No client access to web AI species rate limits"
on public.web_ai_species_rate_limits
for all
to anon, authenticated
using (false)
with check (false);
