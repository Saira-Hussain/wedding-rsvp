import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import RSVPForm from './RSVPForm';

export const revalidate = 0;

export default async function InvitePage({ params }) {
  const { slug } = await params;

  const { data: guest, error } = await supabase
    .from('guests')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !guest) {
    notFound();
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#fafafa' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>
          {guest.family_name}
        </h1>
        <p style={{ fontSize: '18px', color: '#666' }}>
          We have reserved <strong>{guest.max_invites}</strong> {guest.max_invites === 1 ? 'seat' : 'seats'} in your honor.
        </p>
      </div>

      <RSVPForm guest={guest} />
    </main>
  );
}