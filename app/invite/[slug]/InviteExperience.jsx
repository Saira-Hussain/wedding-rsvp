'use client';

import { useState } from 'react';
import RSVPForm from './RSVPForm';

export default function InviteExperience({ guest }) {
  // Navigation Steps: 'welcome' | 'details' | 'rsvp'
  const [step, setStep] = useState('welcome');

  // Background style based on step
  const backgroundStyle =
    step === 'welcome'
      ? {
          backgroundImage: "url('/welcome-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      : {
          background:
            "radial-gradient(circle at center, rgba(80, 10, 20, 0.9) 0%, rgba(20, 2, 5, 0.98) 100%), url('/welcome-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        };

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
        fontFamily: "'Cinzel', 'Playfair Display', 'Georgia', serif",
        overflowY: 'auto',
        backgroundColor: '#120205',
      }}
    >
      {/* Dynamic Background Image Layer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transition: 'all 0.8s ease-in-out',
          zIndex: 0,
          ...backgroundStyle,
        }}
      />

      {/* STEP 1: WELCOME SCREEN */}
      {step === 'welcome' && (
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
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
        </div>
      )}

      {/* STEP 2: ROYAL MAROON & GOLD ARCH INVITATION CARD */}
      {step === 'details' && (
        <div
          style={{
            zIndex: 1,
            margin: '40px 20px',
            maxWidth: '520px',
            width: '90%',
            position: 'relative',
            background: 'linear-gradient(180deg, #420a13 0%, #29040a 50%, #170105 100%)',
            border: '8px solid #D4AF37', // Heavy gold frame
            outline: '2px solid #5C0E1A',
            borderRadius: '4px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), inset 0 0 50px rgba(0, 0, 0, 0.8)',
            padding: '16px',
          }}
        >
          {/* Inner Decorative Arch Border */}
          <div
            style={{
              border: '2px solid #E6CA65',
              borderRadius: '220px 220px 4px 4px', // Creates the arched top
              padding: '40px 28px 36px 28px',
              textAlign: 'center',
              position: 'relative',
              background: 'radial-gradient(circle at top, #4A0B15 0%, #240308 80%)',
              boxShadow: 'inset 0 0 25px rgba(212, 175, 55, 0.2)',
            }}
          >
            {/* Top Ornamental Mandala / Arch Motif */}
            <div style={{ color: '#E6CA65', fontSize: '24px', marginBottom: '16px', letterSpacing: '4px' }}>
              ❖ ⚜ ❖
            </div>

            {/* Arabic Calligraphy */}
            <p
              style={{
                fontSize: '22px',
                margin: '0 0 20px 0',
                color: '#F3E5AB', // Soft gold text
                fontFamily: 'serif',
                lineHeight: '1.5',
                textShadow: '0 2px 4px rgba(0,0,0,0.6)',
              }}
            >
              بَارَكَ ٱللَّٰهُ لَهُمَا وَبَارَكَ عَلَيْهِمَا وَجَمَعَ بَيْنَهُمَا فِي خَيْرٍ
            </p>

            {/* Host Text */}
            <p
              style={{
                fontSize: '13px',
                lineHeight: '1.7',
                color: '#D4C391',
                margin: '0 0 20px 0',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Mr. and Mrs. Syed Abrar-ul Hussain<br />
              invite you to the nikah ceremony<br />
              and reception of their daughter
            </p>

            {/* Filigree Divider */}
            <div style={{ color: '#D4AF37', fontSize: '14px', margin: '0 0 22px 0', letterSpacing: '6px' }}>
              ─── ❖ ───
            </div>

            {/* Bride Name */}
            <h1
              style={{
                fontSize: '32px',
                color: '#FFFFFF',
                margin: '0 0 6px 0',
                fontWeight: '600',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              Ayesha Syeda Hussain
            </h1>

            {/* Connector */}
            <p
              style={{
                fontSize: '20px',
                color: '#E6CA65',
                margin: '6px 0',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
              }}
            >
              &amp;
            </p>

            {/* Groom Name */}
            <h1
              style={{
                fontSize: '32px',
                color: '#FFFFFF',
                margin: '0 0 24px 0',
                fontWeight: '600',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              Owais Hasan Sayeed
            </h1>

            {/* Filigree Divider */}
            <div style={{ color: '#D4AF37', fontSize: '14px', margin: '0 0 24px 0', letterSpacing: '6px' }}>
              ─── ❖ ───
            </div>

            {/* Event Details */}
            <h2
              style={{
                fontSize: '16px',
                letterSpacing: '2px',
                color: '#F3E5AB',
                margin: '0 0 12px 0',
                fontWeight: '600',
              }}
            >
              DECEMBER 26, 2026
            </h2>

            <p style={{ fontSize: '13px', letterSpacing: '2px', color: '#E6CA65', margin: '4px 0', fontWeight: '500' }}>
              NIKAH AT 4 PM
            </p>
            <p style={{ fontSize: '13px', letterSpacing: '2px', color: '#E6CA65', margin: '4px 0 24px 0', fontWeight: '500' }}>
              RECEPTION AT 6 PM
            </p>

            {/* Venue Address */}
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#D4C391', margin: '0 0 28px 0' }}>
              Marriott Town Center<br />
              16090 City Walk,<br />
              Sugar Land, TX 77479
            </p>

            {/* Bottom Kalash / Decorative Motifs */}
            <div style={{ color: '#D4AF37', fontSize: '18px', marginBottom: '28px', letterSpacing: '12px' }}>
              ⚜ ❖ ⚜
            </div>

            {/* RSVP Button */}
            <button
              onClick={() => setStep('rsvp')}
              style={{
                backgroundColor: '#D4AF37',
                color: '#1A0206',
                padding: '14px 38px',
                fontSize: '13px',
                border: '1px solid #FFF',
                borderRadius: '2px',
                cursor: 'pointer',
                fontWeight: '700',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
              }}
            >
              Continue to RSVP
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: RSVP FORM */}
      {step === 'rsvp' && (
        <div
          style={{
            zIndex: 1,
            margin: '40px 20px',
            maxWidth: '500px',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
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
