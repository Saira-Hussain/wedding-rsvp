export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import RSVPForm from './RSVPForm';

export default async function InvitePage({ params }) {
  // Next.js 15 requires awaiting params
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  // Fetch guest from Supabase matching the exact slug
  const { data: guest, error } = await supabase
    .from('guests')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  // Temporary Debug Mode to see why it fails
  if (error || !guest) {
    return (
      <main style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#d9534f' }}>Invite Debug Information</h2>
        <p><strong>Slug searched:</strong> <code>"{slug}"</code></p>
        <p><strong>Supabase Error:</strong> {error ? JSON.stringify(error) : 'None'}</p>
        <p><strong>Guest Record Found:</strong> {guest ? 'Yes' : 'No (Null)'}</p>
        <hr style={{ margin: '20px 0' }} />
        <p style={{ fontSize: '14px', color: '#666' }}>
          If <i>Guest Record Found</i> is "No", verify that your <code>guests</code> table in Supabase has a row where the <code>slug</code> column matches <code>"{slug}"</code> exactly.
        </p>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        background: '#FAF8F5',
        color: '#2C2C2C',
        fontFamily: 'serif',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          padding: '40px 30px',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          textAlign: 'center',
          border: '1px solid #EAE6DF',
        }}
      >
        <h2 style={{ fontSize: '18px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C733E', marginBottom: '12px' }}>
          Welcome
        </h2>
        <h1 style={{ fontSize: '36px', marginBottom: '16px', fontFamily: 'serif' }}>
          {guest.family_name}
        </h1>
        <p style={{ fontSize: '18px', color: '#555', marginBottom: '32px' }}>
          To the Wedding Portal of Ayesha & Owais
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #EAE6DF', margin: '24px 0' }} />

        <div style={{ marginBottom: '32px', textAlign: 'left', lineHeight: '1.8' }}>
          <h3 style={{ fontSize: '20px', textAlign: 'center', color: '#8C733E', marginBottom: '16px' }}>
            Event Details
          </h3>
          <p><strong>Date:</strong> Saturday, October 24, 2026</p>
          <p><strong>Time:</strong> 6:00 PM CST</p>
          <p><strong>Venue:</strong> The Grand Palace Hall</p>
          <p><strong>Address:</strong> 1234 Celebration Way, Houston, TX 77002</p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #EAE6DF', margin: '24px 0' }} />

        <p style={{ fontSize: '18px', color: '#333', marginBottom: '24px' }}>
          We have reserved <strong>{guest.max_invites}</strong> {guest.max_invites === 1 ? 'seat' : 'seats'} in your honor.
        </p>

        <RSVPForm guest={guest} />
      </div>
    </main>
  );
}
