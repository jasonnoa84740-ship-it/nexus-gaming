import { supabase } from "@/lib/supabaseClient";

export async function upsertProfile(pseudo?: string) {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return;

  await supabase.from("profiles").upsert({
    id: user.id,
    pseudo: pseudo ?? user.user_metadata?.pseudo ?? null,
  });
}