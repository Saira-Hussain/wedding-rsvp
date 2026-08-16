'use client';

import { useState } from 'react';
import RSVPForm from './RSVPForm';

export default function InviteExperience({ guest }) {
  // Navigation Steps: 'welcome' | 'details' | 'rsvp'
  const [step, setStep] = useState('welcome');

  // Background style based on current step
  const backgroundStyle =
    step === 'welcome'
      ? {
          backgroundImage: "url('/welcome-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      : {
          backgroundImage: "url('/invite-bg.jpg')", // New curtain & stage backdrop image
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
        fontFamily: "'Playfair Display', 'Cinzel', 'Georgia', serif",
        overflowY: 'auto',
        backgroundColor: '#0a0203',
      }}
    >
      {/* Dynamic Background Backdrop Layer */}
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

      {/* STEP 2: INVITATION DETAILS CARD OVERLAY */}
      {step === 'details' && (
        <div
          style={{
            zIndex: 1,
            margin: '40px 20px',
            maxWidth: '520px',
            width: '88%',
            position: 'relative',
            backgroundColor: 'rgba(244, 232, 210, 0.92)', // Semi-transparent warm parchment overlay
            backdropFilter: 'blur(4px)',
            border: '2px solid #C2A052', // Fine gold frame
            borderRadius: '8px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75), inset 0 0 30px rgba(194, 160, 82, 0.15)',
            overflow: 'hidden',
          }}
        >
          {/* INNER TEXT CONTENT AREA */}
          <div
            style={{
              padding: '44px 36px 40px 36px',
              textAlign: 'center',
              color: '#3B2414',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Top Gold Medallion Accent */}
            <div
              style={{
                color: '#B8860B',
                fontSize: '24px',
                marginBottom: '10px',
                letterSpacing: '2px',
              }}
            >
              ❖ ⚜ ❖
            </div>

            {/* Arabic Calligraphy Blessing */}
            <p
              style={{
                fontSize: '22px',
                margin: '0 0 16px 0',
                color: '#8B6B23',
                fontFamily: 'serif',
                lineHeight: '1.4',
                fontWeight: '600',
              }}
            >
              بَارَكَ ٱللَّٰهُ لَهُمَا وَبَارَكَ عَلَيْهِمَا وَجَمَعَ بَيْنَهُمَا فِي خَيْرٍ
            </p>

            {/* Host Announcement */}
            <p
              style={{
                fontSize: '13px',
                lineHeight: '1.7',
                color: '#3B2414',
                margin: '0 0 18px 0',
                fontStyle: 'italic',
                fontWeight: '500',
              }}
            >
              Mr. and Mrs. Syed Abrar-ul Hussain<br />
              invite you to the nikah ceremony<br />
              and reception of their daughter
            </p>

            {/* Subtle Divider */}
            <div style={{ color: '#C2A052', fontSize: '13px', margin: '0 0 18px 0', letterSpacing: '6px' }}>
              ─── ❖ ───
            </div>

            {/* Bride Name in Calligraphy Script */}
            <h1
              style={{
                fontSize: '38px',
                fontFamily: "'Great Vibes', 'Alex Brush', 'Playfair Display', cursive",
                color: '#610515',
                margin: '0 0 2px 0',
                fontWeight: 'normal',
                letterSpacing: '1px',
              }}
            >
              Ayesha Syeda Hussain
            </h1>

            {/* Connector */}
            <p
              style={{
                fontSize: '15px',
                color: '#B8860B',
                margin: '6px 0',
                fontStyle: 'italic',
                letterSpacing: '2px',
              }}
            >
              with
            </p>

            {/* Groom Name in Calligraphy Script */}
            <h1
              style={{
                fontSize: '38px',
                fontFamily: "'Great Vibes', 'Alex Brush', 'Playfair Display', cursive",
                color: '#610515',
                margin: '0 0 20px 0',
                fontWeight: 'normal',
                letterSpacing: '1px',
              }}
            >
              Owais Hasan Sayeed
            </h1>

            {/* Subtle Divider */}
            <div style={{ color: '#C2A052', fontSize: '13px', margin: '0 0 22px 0', letterSpacing: '6px' }}>
              ─── ❖ ───
            </div>

            {/* Event Schedule */}
            <h2
              style={{
                fontSize: '16px',
                letterSpacing: '3px',
                color: '#3B2414',
                margin: '0 0 12px 0',
                fontWeight: '700',
              }}
            >
              DECEMBER 26, 2026
            </h2>

            <p style={{ fontSize: '12px', letterSpacing: '2px', color: '#610515', margin: '4px 0', fontWeight: '700' }}>
              NIKAH AT 4 PM
            </p>
            <p style={{ fontSize: '12px', letterSpacing: '2px', color: '#610515', margin: '4px 0 22px 0', fontWeight: '700' }}>
              RECEPTION AT 6 PM
            </p>

            {/* Venue Location */}
            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#3B2414', margin: '0 0 28px 0', fontWeight: '500' }}>
              Marriott Town Center<br />
              16090 City Walk,<br />
              Sugar Land, TX 77479
            </p>

            {/* Bottom Ornament */}
            <div style={{ color: '#C2A052', fontSize: '16px', marginBottom: '24px' }}>
              ❦
            </div>

            {/* RSVP Navigation Button */}
            <button
              onClick={() => setStep('rsvp')}
              style={{
                backgroundColor: '#610515',
                color: '#F4E8D2',
                padding: '13px 36px',
                fontSize: '13px',
                border: '1px solid #C2A052',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 15px rgba(97, 5, 21, 0.35)',
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
            backgroundColor: 'rgba(244, 232, 210, 0.96)',
            border: '2px solid #C2A052',
            padding: '36px 28px',
            borderRadius: '12px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
            color: '#3B2414',
          }}
        >
          <h2 style={{ fontSize: '26px', color: '#610515', marginBottom: '8px' }}>
            RSVP
          </h2>
          <p style={{ color: '#5B4332', fontSize: '15px', marginBottom: '20px' }}>
            We reserved <strong>{guest.max_invites}</strong> {guest.max_invites === 1 ? 'seat' : 'seats'} in your honor.
          </p>
          <hr style={{ border: 'none', borderTop: '1px solid #C2A052', margin: '20px 0' }} />
          <RSVPForm guest={guest} />
        </div>
      )}
    </main>
  );
}
