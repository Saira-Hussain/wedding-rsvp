export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { supabase } from '../../../lib/supabase';
import { notFound } from 'next/navigation';
import InviteExperience from './InviteExperience';

export default async function InvitePage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const { data: guest, error } = await supabase
    .from('guests')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !guest) {
    notFound();
  }

  return <InviteExperience guest={guest} />;
}
