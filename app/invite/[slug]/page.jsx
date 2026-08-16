export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { supabase } from '../../../lib/supabase';

export default async function InvitePage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const { data: guest, error } = await supabase
    .from('guests')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '40px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Database Diagnostic</h2>
      <p><strong>Slug from URL:</strong> <code>{slug || 'undefined'}</code></p>
      <p><strong>Supabase URL set?</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'YES' : 'NO (Missing Env Var)'}</p>
      <p><strong>Anon Key set?</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'YES' : 'NO (Missing Env Var)'}</p>
      <p><strong>Database Error:</strong> {error ? JSON.stringify(error) : 'None'}</p>
      <p><strong>Guest Record Found:</strong> {guest ? JSON.stringify(guest) : 'NULL'}</p>
    </div>
  );
}
