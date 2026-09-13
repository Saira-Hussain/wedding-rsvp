import { supabase } from '../lib/supabase';
import InviteExperience from './invite/[slug]/InviteExperience';

export default async function HomePage() {
  const { data: guest } = await supabase
    .from('guests')
    .select('*')
    .limit(1)
    .maybeSingle();

  return <InviteExperience guest={guest} />;
}
