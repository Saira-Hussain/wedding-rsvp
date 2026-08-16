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
        {/* STEP 1: WELCOME SCREEN */}
        {step === 'welcome' && (
          <div>
            <h1 style={{ fontSize: '32px', color: '#2C2C2C', marginBottom: '12px' }}>
              Welcome, {guest.family_name}
            </h1>
            <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px', lineHeight: '1.5' }}>
              We are honored to invite you to celebrate our special day.
            </p>
            <button
              onClick={() => setStep('details')}
              style={{
                backgroundColor: '#2C2C2C',
                color: '#FFFFFF',
                padding: '14px 32px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                letterSpacing: '1px',
              }}
            >
              Bismillah
            </button>
          </div>
        )}

        {/* STEP 2: WEDDING DETAILS */}
        {step === 'details' && (
          <div>
            <h2 style={{ fontSize: '26px', color: '#2C2C2C', marginBottom: '8px' }}>
              Wedding Details
            </h2>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>
              Join us in celebrating our wedding!
            </p>

            <div
              style={{
                backgroundColor: '#F9F9F9',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'left',
                marginBottom: '28px',
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#444',
              }}
            >
              <p><strong>📅 Date:</strong> [Insert Date Here]</p>
              <p><strong>⏰ Time:</strong> [Insert Time Here]</p>
              <p><strong>📍 Venue:</strong> [Insert Venue Name & Address]</p>
            </div>

            <button
              onClick={() => setStep('rsvp')}
              style={{
                backgroundColor: '#2C2C2C',
                color: '#FFFFFF',
                padding: '14px 32px',
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

        {/* STEP 3: RSVP FORM */}
        {step === 'rsvp' && (
          <div>
            <h2 style={{ fontSize: '26px', color: '#2C2C2C', marginBottom: '8px' }}>
              RSVP
            </h2>
            <p style={{ color: '#666', fontSize: '15px', marginBottom: '24px' }}>
              We reserved <strong>{guest.max_invites}</strong> {guest.max_invites === 1 ? 'seat' : 'seats'} in your honor.
            </p>
            <hr style={{ border: 'none', borderTop: '1px solid #EEE', margin: '24px 0' }} />
            <RSVPForm guest={guest} />
          </div>
        )}
      </div>
    </main>
  );
}
