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
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#111', color: '#fff', minHeight: '100vh' }}>
      <h2>Portal Diagnostic</h2>
      <p><strong>Received Slug:</strong> <code>{slug || 'None'}</code></p>
      <p><strong>URL String Value:</strong> <code>"{process.env.NEXT_PUBLIC_SUPABASE_URL}"</code></p>
      <p><strong>Key Starts With:</strong> <code>"{process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 12)}..."</code></p>
      <p><strong>Database Error:</strong> {error ? JSON.stringify(error) : 'None'}</p>
      <p><strong>Guest Data:</strong> {guest ? JSON.stringify(guest) : 'NULL'}</p>
    </div>
  );
}
