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
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'serif',
        overflow: 'hidden',
      }}
    >
      {/* Fullscreen Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('/welcome-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
        }}
      />

      {/* TOP SECTION: Welcome Text moved up into the dome area */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '6vh', // Elevates text into dome section
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        {step === 'welcome' && (
          <div
            style={{
              textAlign: 'center',
              maxWidth: '650px',
              backgroundColor: 'rgba(0, 0, 0, 0.25)', // Subtle dark overlay for contrast
              backdropFilter: 'blur(4px)',
              padding: '16px 28px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <h1
              style={{
                fontSize: '36px',
                color: '#F4E4BC', // Soft warm gold
                fontWeight: '400',
                margin: '0 0 6px 0',
                letterSpacing: '1px',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
            >
              Welcome, {guest.family_name}
            </h1>
            <p
              style={{
                color: '#FFFFFF',
                fontSize: '16px',
                margin: 0,
                lineHeight: '1.4',
                opacity: 0.95,
                textShadow: '0 2px 6px rgba(0,0,0,0.8)',
              }}
            >
              We are honored to invite you to celebrate our special day.
            </p>
          </div>
        )}
      </div>

      {/* MIDDLE SECTION: Modals for Details & RSVP Steps */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '20px',
        }}
      >
        {step === 'details' && (
          <div
            style={{
              textAlign: 'center',
              maxWidth: '500px',
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '32px 24px',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
            }}
          >
            <h2 style={{ fontSize: '26px', color: '#2C2C2C', marginBottom: '8px' }}>
              Wedding Details
            </h2>
            <div
              style={{
                backgroundColor: '#F9F9F9',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'left',
                margin: '20px 0',
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#444',
              }}
            >
              <p style={{ margin: '4px 0' }}><strong>📅 Date:</strong> [Insert Date Here]</p>
              <p style={{ margin: '4px 0' }}><strong>⏰ Time:</strong> [Insert Time Here]</p>
              <p style={{ margin: '4px 0' }}><strong>📍 Venue:</strong> [Insert Venue Name & Address]</p>
            </div>
            <button
              onClick={() => setStep('rsvp')}
              style={{
                backgroundColor: '#2C2C2C',
                color: '#FFFFFF',
                padding: '12px 32px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              RSVP
            </button>
          </div>
        )}

        {step === 'rsvp' && (
          <div
            style={{
              textAlign: 'center',
              maxWidth: '500px',
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '32px 24px',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
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
      </div>

      {/* BOTTOM SECTION: Bismillah Button */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '35px',
        }}
      >
        {step === 'welcome' && (
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
        )}
      </div>
    </main>
  );
}
