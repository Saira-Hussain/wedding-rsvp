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
      {/* Background Layer */}
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
              : "radial-gradient(ellipse at center, #2d0a10 0%, #0d0204 100%)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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

      {/* STEP 2: EXACT MATCH INVITATION CARD */}
      {step === 'details' && (
        <div
          style={{
            margin: '40px 20px',
            maxWidth: '520px',
            width: '90%',
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)',
          }}
        >
          {/* Card Image Display */}
          <div style={{ position: 'relative', width: '100%', display: 'block' }}>
            <img
              src="/card-frame.jpg"
              alt="Wedding Invitation"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            {/* Guest Name Overlay (Top center) */}
            <div
              style={{
                position: 'absolute',
                top: '12%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '18px',
                  color: '#5C3A21',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid #C4A462',
                  paddingBottom: '2px',
                }}
              >
                {guest.family_name}
              </span>
            </div>
          </div>

          {/* Action Button Section Below Card */}
          <div
            style={{
              backgroundColor: '#120306',
              padding: '20px 0',
              textAlign: 'center',
              borderTop: '1px solid #C4A462',
            }}
          >
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
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
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
