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
                backgroundColor: 'rgba(44, 44, 44, 0.7)',
                color: '#FFFFFF',
                padding: '14px 36px',
                fontSize: '18px',
                border: '1px solid #C2A052',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                letterSpacing: '1px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                fontFamily: 'serif',
                backdropFilter: 'blur(4px)',
              }}
            >
              بسم الله الرحمن الرحيم
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
            backgroundColor: 'rgba(244, 232, 210, 0.92)',
            backdropFilter: 'blur(4px)',
            border: '2px solid #C2A052',
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

            {/* Bride Name in Cursive Script */}
            <h1
              style={{
                fontSize: '42px',
                fontFamily: "'Sacramento', 'Dancing Script', 'Parisienne', cursive",
                color: '#610515',
                margin: '0 0 2px 0',
                fontWeight: 'normal',
                letterSpacing: '1px',
                lineHeight: '1.
