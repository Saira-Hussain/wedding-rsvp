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
        fontFamily: 'serif',
        overflow: 'hidden',
      }}
    >
      {/* Background with Mosque and Golden Text */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('/welcome-bg.jpg')", // Replace with your image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
        }}
      />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // Center content vertically
          padding: '0 20px',
        }}
      >
        {/* Step 1 Content: Direct Text Integration */}
        {step === 'welcome' && (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '800px',
            }}
          >
            {/* Direct White Text over Background */}
            <h1
              style={{
                fontSize: '48px', // Large, legible size
                color: '#FFFFFF',
                fontWeight: 'normal',
                marginBottom: '16px',
                textShadow: '2px 2px 8px rgba(0,0,0,0.6)', // Essential for contrast
              }}
            >
              Welcome, {guest.family_name}
            </h1>
            <p
              style={{
                color: '#FFFFFF',
                fontSize: '20px', // Readable font size
                marginBottom: '40px', // Space before button
                lineHeight: '1.6',
                maxWidth: '600px',
                textShadow: '1px 1px 4px rgba(0,0,0,0.6)', // Essential for contrast
              }}
            >
              We are honored to invite you to celebrate our special day.
            </p>
          </div>
        )}

        {/* Step 2 Content: Wedding Details (You may want to style this differently now) */}
        {step === 'details' && (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '800px',
              paddingTop: '60px', // Pad top for visibility
            }}
          >
            <h2 style={{ fontSize: '32px', color: '#FFFFFF', marginBottom: '8px', textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
              Wedding Details
            </h2>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-opaque details box
                padding: '30px',
                borderRadius: '16px',
                textAlign: 'left',
                marginBottom: '28px',
                fontSize: '17px',
                lineHeight: '1.8',
                color: '#444',
                maxWidth: '500px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              }}
            >
              <p><strong>📅 Date:</strong> [Insert Date Here]</p>
              <p><strong>⏰ Time:</strong> [Insert Time Here]</p>
              <p><strong>📍 Venue:</strong> [Insert Venue Name & Address]</p>
            </div>
          </div>
        )}

        {/* Step 3 Content: RSVP Form (Keep within card for complex form data) */}
        {step === 'rsvp' && (
          <div
            style={{
              textAlign: 'center',
              maxWidth: '500px',
              paddingTop: '60px', // Pad top for visibility
            }}
          >
             <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  padding: '40px 30px',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                }}
             >
                <h2 style={{ fontSize: '26px', color: '#2C2C2C', marginBottom: '8px' }}>
                  RSVP
                </h2>
                <p style={{ color: '#666', fontSize: '15px', marginBottom: '24px' }}>
                  We reserved <strong>{guest.max_invites}</strong> {guest.max_invites === 1 ? 'seat' : 'seats'} in your honor.
                </p>
                <hr style={{ border: 'none', borderTop: '1px solid #EEE', margin: '24px 0' }} />
                <RSVPForm guest={guest} />
             </div>
          </div>
        )}
      </div>

      {/* Button and Text Positioned at Bottom */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '40px', // Safe area from bottom edge
          position: 'relative', // Ensure it sits correctly
        }}
      >
        {/* Action Button */}
        {step === 'welcome' && (
          <button
            onClick={() => setStep('details')}
            style={{
              backgroundColor: '#2C2C2C', // Keeps existing button look
              color: '#FFFFFF',
              padding: '16px 40px', // Slightly larger for prominence
              fontSize: '18px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              letterSpacing: '1px',
              marginBottom: '20px', // Space between button and text
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)', // Lift button
            }}
          >
            Bismillah
          </button>
        )}

         {step === 'details' && (
          <button
            onClick={() => setStep('rsvp')}
            style={{
              backgroundColor: '#2C2C2C',
              color: '#FFFFFF',
              padding: '16px 40px',
              fontSize: '18px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              letterSpacing: '1px',
              marginBottom: '20px',
            }}
          >
            RSVP
          </button>
        )}

        {/* Golden Bottom Text (Implicit from background) */}
        {/* We use CSS to ensure it's positioned correctly over the background */}
        {/* This text is part of your image, but we ensure it's not obscured. */}
        {/* The button is placed exactly above it in this section. */}
      </div>
    </main>
  );
}
