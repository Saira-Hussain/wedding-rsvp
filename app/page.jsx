import { createClient } from '@supabase/supabase-js';
import InviteExperience from './InviteExperience';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function InvitePage({ params }) {
  const { slug } = params;

  const { data: guest } = await supabase
    .from('guests')
    .select('*')
    .eq('slug', slug)
    .single();

  return <InviteExperience guest={guest} />;
}
