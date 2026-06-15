import "server-only";

import { createClient } from "@supabase/supabase-js";

const getRequiredEnv = (name: "SUPABASE_PUBLISHABLE_KEY" | "SUPABASE_URL") => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} 환경 변수가 필요합니다.`);
  }

  return value;
};

export const createSupabaseServerClient = () => {
  return createClient(
    getRequiredEnv("SUPABASE_URL"),
    getRequiredEnv("SUPABASE_PUBLISHABLE_KEY"),
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    },
  );
};
