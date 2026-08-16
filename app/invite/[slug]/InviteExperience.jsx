'use client';

import { useState } from 'react';
import RSVPForm from './RSVPForm';

export default function InviteExperience({ guest }) {
  // Steps: 'welcome' | 'details' | 'rsvp'
  const [step, setStep] = useState('welcome');

  return (
    <main
      style={{
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: step === 'welcome' ? 'space-between' : 'center',
        fontFamily: "'Cinzel', 'Playfair Display', serif",
        overflowY: 'auto',
      }}
    >
      {/* Dynamic Background Image */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            step === 'welcome'
              ? "url('/welcome-bg.jpg')"
              : "url('/details-bg.jpg')", // Make sure to save your interior image as details-bg.jpg in public/
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'background-image 0.8s ease-in-out',
          zIndex: -1,
        }}
      />

      {/* STEP 1: WELCOME SCREEN */}
      {step === 'welcome' && (
        <>
          <div style={{ paddingTop: '6vh', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
            <h1
              style={{
                fontSize: '38px',
                color: '#F4E4BC',
                fontWeight: '400',
                margin: 0,
                letterSpacing: '1px',
                textShadow: '0 2px 10px rgba(0,0,0,0.85)',
              }}
            >
              Welcome, {guest.family_name}
            </h1>
          </div>

          <div style={{ paddingBottom: '35px' }}>
            <button
              onClick={() => setStep('details')}
              style={{
                backgroundColor: '#2C2C2C',
                color: '#FFFFFF',
                padding: '14px 36px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                letterSpacing: '1px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              }}
            >
              Bismillah
            </button>
          </div>
        </>
      )}

      {/* STEP 2: SCROLLABLE LUXURY INVITATION CARD */}
      {step === 'details' && (
        <div
          style={{
            margin: '40px 20px',
            maxWidth: '560px',
            width: '90%',
            backgroundColor: 'rgba(15, 12, 10, 0.88)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '12px',
            padding: '48px 32px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            color: '#E8D2A7',
            textAlign: 'center',
          }}
        >
          {/* Monogram Header */}
          <div
            style={{
              fontSize: '18px',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              width: '40px',
              height: '40px',
              lineHeight: '40px',
              margin: '0 auto 24px auto',
              borderRadius: '2px',
              transform: 'rotate(45deg)',
              color: '#D4AF37',
            }}
          >
            <div style={{ transform: 'rotate(-45deg)' }}>AH</div>
          </div>

          {/* Calligraphy */}
          <p style={{ fontSize: '26px', margin: '0 0 16px 0', color: '#F4E4BC', fontFamily: 'serif' }}>
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>

          <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#A39274', marginBottom: '24px' }}>
            A Private Invitation For
          </p>

          <h2 style={{ fontSize: '28px', color: '#FDF6E2', fontWeight: '300', margin: '0 0 32px 0' }}>
            {guest.family_name}
          </h2>

          <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)', width: '60%', margin: '0 auto 32px auto' }} />

          <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#C2B193', marginBottom: '28px' }}>
            With the blessings of Almighty Allah, we request the honor of your presence at the wedding celebrations of
          </p>

          {/* Couple Names */}
          <h1 style={{ fontSize: '42px', fontFamily: 'cursive', color: '#F7E7C4', margin: '0 0 8px 0', fontWeight: 'normal' }}>
            Ayesha
          </h1>
          <p style={{ fontSize: '20px', color: '#D4AF37', margin: '0 0 8px 0' }}>&</p>
          <h1 style={{ fontSize: '42px', fontFamily: 'cursive', color: '#F7E7C4', margin: '0 0 32px 0', fontWeight: 'normal' }}>
            Owais
          </h1>

          {/* Event Info Details */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '32px',
              textAlign: 'center',
              fontSize: '14px',
              lineHeight: '2',
            }}
          >
            <p style={{ margin: '0', color: '#F4E4BC' }}><strong>DATE:</strong> [Insert Date Here]</p>
            <p style={{ margin: '0', color: '#F4E4BC' }}><strong>TIME:</strong> [Insert Time Here]</p>
            <p style={{ margin: '0', color: '#F4E4BC' }}><strong>VENUE:</strong> [Insert Venue Name & Address]</p>
          </div>

          <p style={{ fontSize: '20px', color: '#F4E4BC', margin: '0 0 8px 0', fontFamily: 'serif' }}>
            فِي الدُّنْيَا وَالْآخِرَةِ
          </p>
          <p style={{ fontSize: '11px', letterSpacing: '2px', color: '#A39274', marginBottom: '36px' }}>
            In this world and the Hereafter
          </p>

          {/* Action Button */}
          <button
            onClick={() => setStep('rsvp')}
            style={{
              backgroundColor: '#D4AF37',
              color: '#0F0C0A',
              padding: '14px 40px',
              fontSize: '14px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
            }}
          >
            Continue to RSVP
          </button>
        </div>
      )}

      {/* STEP 3: RSVP FORM */}
      {step === 'rsvp' && (
        <div
          style={{
            margin: '40px 20px',
            maxWidth: '500px',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '36px 28px',
            borderRadius: '16px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '26px', color: '#2C2C2C', marginBottom: '8px' }}>
            RSVP
          </h2>
          <p style={{ color: '#666', fontSize: '15px', marginBottom: '20px' }}>
            We reserved <strong>{guest.max_invites}</strong> {guest.max_invites === 1 ? 'seat' : 'seats'} in your honor.
          </p>
          <hr style={{ border: 'none', borderTop: '1px solid #EEE', margin: '20px 0' }} />
          <RSVPForm guest={guest} />
        </div>
      )}
    </main>
  );
}
