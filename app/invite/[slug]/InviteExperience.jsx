'use client';

import { useState } from 'react';
import RSVPForm from './RSVPForm';

export default function InviteExperience({ guest }) {
  const [step, setStep] = useState('welcome');
  const [hasSubmitted, setHasSubmitted] = useState(guest?.has_rsvped || false);

  const isNikkahInvited = guest?.invited_to_nikkah ?? true;
  const isShaadiInvited = guest?.invited_to_shaadi ?? true;

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
        backgroundColor: '#0a0203',
        padding: '24px 16px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <style jsx global>{`
        .dynamic-bg {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transition: background-image 0.8s ease-in-out;
        }
        .dynamic-bg.step-welcome {
          background-image: url('/welcome-bg.jpg');
        }
        @media (max-width: 768px) {
          .dynamic-bg.step-welcome {
            background-image: url('/welcome-mobile-bg.jpg') !important;
          }
          .dynamic-bg.step-details,
          .dynamic-bg.step-rsvp {
            background-size: contain !important;
            background-color: #0a0203;
          }
        }
        .dynamic-bg.step-details,
        .dynamic-bg.step-rsvp {
          background-image: url('/invite-bg.jpg');
        }
      `}</style>

      <div
        className={`dynamic-bg step-${step}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* STEP 1: WELCOME */}
      {step === 'welcome' && (
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: '500px',
            minHeight: 'calc(100dvh - 48px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ paddingTop: '5vh', width: '100%' }}>
            <h1
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                color: '#F4E4BC',
                fontWeight: '400',
                margin: 0,
                letterSpacing: '1px',
                textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                wordBreak: 'break-word',
                lineHeight: '1.2',
              }}
            >
              Welcome, {guest?.family_name || 'Guest'}
            </h1>
          </div>

          <div style={{ paddingBottom: '3vh', width: '100%' }}>
            <button
              onClick={() => setStep('details')}
              style={{
                backgroundColor: 'rgba(20, 20, 20, 0.85)',
                color: '#FFFFFF',
                padding: '12px 24px',
                fontSize: 'clamp(0.9rem, 3.8vw, 1.1rem)',
                border: '1px solid #C2A052',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                letterSpacing: '1px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
                fontFamily: 'serif',
                backdropFilter: 'blur(6px)',
                width: '100%',
                maxWidth: '280px',
              }}
            >
              Bismillah
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: INVITATION DETAILS */}
      {step === 'details' && (
        <div
          style={{
            zIndex: 1,
            maxWidth: '480px',
            width: '100%',
            position: 'relative',
            backgroundColor: 'rgba(244, 232, 210, 0.94)',
            backdropFilter: 'blur(4px)',
            border: '2px solid #C2A052',
            borderRadius: '8px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75)',
            boxSizing: 'border-box',
            margin: 'auto 0',
          }}
        >
          <div
            style={{
              padding: '24px 16px',
              textAlign: 'center',
              color: '#3B2414',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div style={{ color: '#B8860B', fontSize: '18px', marginBottom: '8px', letterSpacing: '2px' }}>
              ❖ ⚜ ❖
            </div>

            <p
              style={{
                fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                margin: '0 0 10px 0',
                color: '#8B6B23',
                fontFamily: 'serif',
                lineHeight: '1.4',
                fontWeight: '600',
                padding: '0 4px',
              }}
            >
              بَارَكَ ٱللَّٰهُ لَهُمَا وَبَارَكَ عَلَيْهِمَا وَجَمَعَ بَيْنَهُمَا فِي خَيْرٍ
            </p>

            <p style={{ fontSize: '0.82rem', lineHeight: '1.5', color: '#3B2414', margin: '0 0 12px 0', fontStyle: 'italic', fontWeight: '500' }}>
              Under the guardianship of Mr. and Mrs. Syed Badar-ul Hussain<br />
              and the blessings of Late Mr. Mohammed Rafiuddin:<br />
              <br />
              <span style={{ fontSize: '1.05rem', fontWeight: '600', fontStyle: 'normal', display: 'inline-block', marginBottom: '2px' }}>
                Mr. and Mrs. Syed Abrar-ul Hussain
              </span><br />
              invite you to the reception of their daughter
            </p>

            <div style={{ color: '#C2A052', fontSize: '11px', margin: '0 0 10px 0', letterSpacing: '3px' }}>
              ─── ❖ ───
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.8rem, 7vw, 2.8rem)',
                fontFamily: "var(--font-script), 'Great Vibes', cursive",
                color: '#610515',
                margin: '0',
                fontWeight: '400',
                lineHeight: '1.2',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                padding: '0 4px',
              }}
            >
              Ayesha Syeda Hussain
            </h1>

            <p
              style={{
                fontSize: '1.1rem',
                fontFamily: "var(--font-script), 'Great Vibes', cursive",
                color: '#B8860B',
                margin: '2px 0',
              }}
            >
              with
            </p>

            <h1
              style={{
                fontSize: 'clamp(1.8rem, 7vw, 2.8rem)',
                fontFamily: "var(--font-script), 'Great Vibes', cursive",
                color: '#610515',
                margin: '0 0 10px 0',
                fontWeight: '400',
                lineHeight: '1.2',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                padding: '0 4px',
              }}
            >
              Owais Hasan Sayeed
            </h1>

            <div style={{ color: '#C2A052', fontSize: '11px', margin: '0 0 14px 0', letterSpacing: '3px' }}>
              ─── ❖ ───
            </div>

            <h2 style={{ fontSize: '0.9rem', letterSpacing: '2px', color: '#3B2414', margin: '0 0 8px 0', fontWeight: '700' }}>
              DECEMBER 26, 2026
            </h2>

            {isNikkahInvited && (
              <p style={{ fontSize: '0.78rem', letterSpacing: '1px', color: '#610515', margin: '2px 0', fontWeight: '700' }}>
                NIKKAH AT 4 PM
              </p>
            )}

            {isShaadiInvited && (
              <p style={{ fontSize: '0.78rem', letterSpacing: '1px', color: '#610515', margin: '2px 0 14px 0', fontWeight: '700' }}>
                RECEPTION AT 6 PM
              </p>
            )}

            <p style={{ fontSize: '0.82rem', lineHeight: '1.4', color: '#3B2414', margin: '0 0 18px 0', fontWeight: '500' }}>
              Marriott Town Center<br />
              16090 City Walk,<br />
              Sugar Land, TX 77479
            </p>

            <button
              onClick={() => setStep('rsvp')}
              style={{
                backgroundColor: '#610515',
                color: '#F4E8D2',
                padding: '12px 20px',
                fontSize: '0.78rem',
                border: '1px solid #C2A052',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 15px rgba(97, 5, 21, 0.35)',
                width: '100%',
                maxWidth: '260px',
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
            maxWidth: '480px',
            width: '100%',
            backgroundColor: 'rgba(244, 232, 210, 0.96)',
            border: '2px solid #C2A052',
            padding: '24px 16px',
            borderRadius: '12px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
            color: '#3B2414',
            boxSizing: 'border-box',
            margin: 'auto 0',
          }}
        >
          <h2 style={{ fontSize: '1.4rem', color: '#610515', marginBottom: '8px' }}>
            RSVP
          </h2>

          <RSVPForm
            guest={guest}
            onSeatsUpdate={() => setHasSubmitted(true)}
            onEdit={() => setHasSubmitted(false)}
          />
        </div>
      )}
    </main>
  );
}
