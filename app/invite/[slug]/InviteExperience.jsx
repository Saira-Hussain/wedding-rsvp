'use client';

import { useState } from 'react';
import RSVPForm from './RSVPForm';

export default function InviteExperience({ guest }) {
  const [step, setStep] = useState('welcome');
  const [confirmedSeats, setConfirmedSeats] = useState(guest?.attending_count || guest?.max_invites || 1);
  const [hasSubmitted, setHasSubmitted] = useState(guest?.has_rsvped || false);

  const backgroundStyle =
    step === 'welcome'
      ? {
          backgroundImage: "url('/welcome-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      : {
          backgroundImage: "url('/invite-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        };

  return (
    <main
      style={{
        minHeight: '100dvh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: step === 'welcome' ? 'space-between' : 'center',
        fontFamily: "var(--font-cormorant), 'Playfair Display', 'Georgia', serif",
        overflowX: 'hidden',
        backgroundColor: '#0a0203',
        boxSizing: 'border-box',
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
          transition: 'all 0.8s ease-in-out',
          zIndex: 0,
          ...backgroundStyle,
        }}
      />

      {/* STEP 1: WELCOME */}
      {step === 'welcome' && (
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 16px',
            boxSizing: 'border-box',
          }}
        >
          {/* Top Heading */}
          <div
            style={{
              paddingTop: '4vh',
              textAlign: 'center',
              width: '100%',
              maxWidth: '600px',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
                color: '#F4E4BC',
                fontWeight: '400',
                margin: 0,
                letterSpacing: '1px',
                textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                wordBreak: 'break-word',
              }}
            >
              Welcome, {guest?.family_name || 'Guest'}
            </h1>
          </div>

          {/* Bottom Action Button */}
          <div style={{ paddingBottom: '20px', width: '100%', textAlign: 'center' }}>
            <button
              onClick={() => setStep('details')}
              style={{
                backgroundColor: 'rgba(44, 44, 44, 0.85)',
                color: '#FFFFFF',
                padding: '12px 24px',
                fontSize: 'clamp(1rem, 4vw, 1.15rem)',
                border: '1px solid #C2A052',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                letterSpacing: '1px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                fontFamily: 'serif',
                backdropFilter: 'blur(4px)',
                maxWidth: '90vw',
              }}
            >
              بسم الله الرحمن الرحيم
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: INVITATION DETAILS */}
      {step === 'details' && (
        <div
          style={{
            zIndex: 1,
            margin: '20px 12px',
            maxWidth: '520px',
            width: 'calc(100% - 24px)',
            position: 'relative',
            backgroundColor: 'rgba(244, 232, 210, 0.94)',
            backdropFilter: 'blur(4px)',
            border: '2px solid #C2A052',
            borderRadius: '8px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75)',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              padding: '28px 18px',
              textAlign: 'center',
              color: '#3B2414',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div style={{ color: '#B8860B', fontSize: '20px', marginBottom: '8px', letterSpacing: '2px' }}>
              ❖ ⚜ ❖
            </div>

            <p
              style={{
                fontSize: 'clamp(1.1rem, 4.5vw, 1.4rem)',
                margin: '0 0 12px 0',
                color: '#8B6B23',
                fontFamily: 'serif',
                lineHeight: '1.4',
                fontWeight: '600',
              }}
            >
              بَارَكَ ٱللَّٰهُ لَهُمَا وَبَارَكَ عَلَيْهِمَا وَجَمَعَ بَيْنَهُمَا فِي خَيْرٍ
            </p>

            <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#3B2414', margin: '0 0 16px 0', fontStyle: 'italic', fontWeight: '500' }}>
              Mr. and Mrs. Syed Abrar-ul Hussain<br />
              invite you to the nikah ceremony<br />
              and reception of their daughter
            </p>

            <div style={{ color: '#C2A052', fontSize: '12px', margin: '0 0 14px 0', letterSpacing: '4px' }}>
              ─── ❖ ───
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 9vw, 3.5rem)',
                fontFamily: "var(--font-script), 'Great Vibes', cursive",
                color: '#610515',
                margin: '0 0 2px 0',
                fontWeight: '400',
                lineHeight: '1.2',
                wordBreak: 'break-word',
              }}
            >
              Ayesha Syeda Hussain
            </h1>

            <p
              style={{
                fontSize: '1.3rem',
                fontFamily: "var(--font-script), 'Great Vibes', cursive",
                color: '#B8860B',
                margin: '2px 0',
              }}
            >
              with
            </p>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 9vw, 3.5rem)',
                fontFamily: "var(--font-script), 'Great Vibes', cursive",
                color: '#610515',
                margin: '0 0 14px 0',
                fontWeight: '400',
                lineHeight: '1.2',
                wordBreak: 'break-word',
              }}
            >
              Owais Hasan Sayeed
            </h1>

            <div style={{ color: '#C2A052', fontSize: '12px', margin: '0 0 18px 0', letterSpacing: '4px' }}>
              ─── ❖ ───
            </div>

            <h2 style={{ fontSize: '0.95rem', letterSpacing: '2px', color: '#3B2414', margin: '0 0 10px 0', fontWeight: '700' }}>
              DECEMBER 26, 2026
            </h2>

            <p style={{ fontSize: '0.8rem', letterSpacing: '1.5px', color: '#610515', margin: '3px 0', fontWeight: '700' }}>
              NIKAH AT 4 PM
            </p>
            <p style={{ fontSize: '0.8rem', letterSpacing: '1.5px', color: '#610515', margin: '3px 0 18px 0', fontWeight: '700' }}>
              RECEPTION AT 6 PM
            </p>

            <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#3B2414', margin: '0 0 22px 0', fontWeight: '500' }}>
              Marriott Town Center<br />
              16090 City Walk,<br />
              Sugar Land, TX 77479
            </p>

            <button
              onClick={() => setStep('rsvp')}
              style={{
                backgroundColor: '#610515',
                color: '#F4E8D2',
                padding: '12px 28px',
                fontSize: '0.8rem',
                border: '1px solid #C2A052',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 15px rgba(97, 5, 21, 0.35)',
                width: '100%',
                maxWidth: '280px',
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
            margin: '20px 12px',
            maxWidth: '500px',
            width: 'calc(100% - 24px)',
            backgroundColor: 'rgba(244, 232, 210, 0.96)',
            border: '2px solid #C2A052',
            padding: '28px 18px',
            borderRadius: '12px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
            color: '#3B2414',
            boxSizing: 'border-box',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', color: '#610515', marginBottom: '8px' }}>
            RSVP
          </h2>

          {!hasSubmitted && (
            <>
              <p style={{ color: '#5B4332', fontSize: '0.9rem', marginBottom: '16px' }}>
                We reserved <strong>{guest?.max_invites || 1}</strong> {guest?.max_invites === 1 ? 'seat' : 'seats'} in your honor.
              </p>
              <hr style={{ border: 'none', borderTop: '1px solid #C2A052', margin: '16px 0' }} />
            </>
          )}

          <RSVPForm
            guest={guest}
            onSeatsUpdate={(count) => {
              setConfirmedSeats(count);
              setHasSubmitted(true);
            }}
            onEdit={() => setHasSubmitted(false)}
          />
        </div>
      )}
    </main>
  );
}
