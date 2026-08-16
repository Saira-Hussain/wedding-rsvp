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
        fontFamily: "'Playfair Display', 'Georgia', serif",
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
              : "radial-gradient(ellipse at center, #580816 0%, #2D030A 60%, #150104 100%), url('/details-bg.jpg')",
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

      {/* STEP 2: PARCHMENT & GOLD INVITATION CARD */}
      {step === 'details' && (
        <div
          style={{
            margin: '40px 20px',
            maxWidth: '540px',
            width: '90%',
            backgroundColor: '#F3ECE0',
            border: '2px solid #C4A462',
            borderRadius: '12px',
            padding: '44px 32px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
            color: '#5C3A21',
            textAlign: 'center',
          }}
        >
          {/* Top Guest Name */}
          <h3
            style={{
              fontSize: '22px',
              color: '#800020',
              fontWeight: '600',
              margin: '0 0 20px 0',
              letterSpacing: '0.5px',
            }}
          >
            {guest.family_name}
          </h3>

          {/* Calligraphy */}
          <p
            style={{
              fontSize: '26px',
              margin: '0 0 20px 0',
              color: '#800020',
              fontFamily: 'serif',
              lineHeight: '1.4',
            }}
          >
            بَارَكَ ٱللَّٰهُ لَهُمَا وَبَارَكَ عَلَيْهِمَا وَجَمَعَ بَيْنَهُمَا فِي خَيْرٍ
          </p>

          <p
            style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#6B4E38',
              margin: '0 0 24px 0',
              fontStyle: 'italic',
            }}
          >
            Mr. and Mrs. Syed Abrar-ul Hussain<br />
            invite you to the nikah ceremony<br />
            and reception of their daughter
          </p>

          <div style={{ borderTop: '1px solid #C4A462', width: '50%', margin: '0 auto 24px auto' }} />

          {/* Bride & Groom Names */}
          <h1
            style={{
              fontSize: '40px',
              fontFamily: "'Great Vibes', 'Baskerville', cursive",
              color: '#800020',
              margin: '0 0 4px 0',
              fontWeight: 'normal',
            }}
          >
            Ayesha Syeda Hussain
          </h1>

          <p style={{ fontSize: '16px', color: '#C4A462', margin: '8px 0', fontStyle: 'italic' }}>
            — with —
          </p>

          <h1
            style={{
              fontSize: '40px',
              fontFamily: "'Great Vibes', 'Baskerville', cursive",
              color: '#800020',
              margin: '0 0 28px 0',
              fontWeight: 'normal',
            }}
          >
            Owais Hasan Sayeed
          </h1>

          <div style={{ borderTop: '1px solid #C4A462', width: '50%', margin: '0 auto 28px auto' }} />

          {/* Date & Time */}
          <h2
            style={{
              fontSize: '18px',
              letterSpacing: '2px',
              color: '#5C3A21',
              margin: '0 0 16px 0',
              fontWeight: '600',
            }}
          >
            DECEMBER 26, 2026
          </h2>

          <p style={{ fontSize: '13px', letterSpacing: '1px', color: '#800020', margin: '4px 0', fontWeight: '600' }}>
            NIKAH AT 4 PM
          </p>
          <p style={{ fontSize: '13px', letterSpacing: '1px', color: '#800020', margin: '4px 0 24px 0', fontWeight: '600' }}>
            RECEPTION AT 6 PM
          </p>

          {/* Venue */}
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#5C3A21', margin: '0 0 32px 0' }}>
            Marriott Town Center<br />
            16090 City Walk,<br />
            Sugar Land, TX 77479
          </p>

          {/* Action Button */}
          <button
            onClick={() => setStep('rsvp')}
            style={{
              backgroundColor: '#800020',
              color: '#F3ECE0',
              padding: '14px 40px',
              fontSize: '14px',
              border: '1px solid #C4A462',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
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
