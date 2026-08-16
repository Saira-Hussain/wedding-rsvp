export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { supabase } from '../../../lib/supabase';
import { notFound } from 'next/navigation';
import RSVPForm from './RSVPForm';

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

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#FAFAFA',
        fontFamily: 'serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '#FFFFFF',
          padding: '40px 30px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          textAlign: 'center',
          border: '1px solid #EAEAEA',
        }}
      >
        <h1 style={{ fontSize: '28px', color: '#2C2C2C', marginBottom: '8px' }}>
          {guest.family_name}
        </h1>
        <p style={{ color: '#666', fontSize: '15px', marginBottom: '24px' }}>
          We reserved <strong>{guest.max_invites}</strong> {guest.max_invites === 1 ? 'seat' : 'seats'} in your honor.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #EEE', margin: '24px 0' }} />

        <RSVPForm guest={guest} />
      </div>
    </main>
  );
}
