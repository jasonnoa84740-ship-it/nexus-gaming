import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // IMPORTANT : on n'explose pas le build Next.
  // On laisse une erreur claire côté runtime si jamais un composant essaie d'utiliser Supabase.
  console.warn(
    "[supabase] Missing env vars NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

// On crée le client seulement si possible, sinon on met un "placeholder" qui évite de casser le build.
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as any);