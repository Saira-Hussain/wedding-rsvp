'use client';

import { useState } from 'react';
import RSVPForm from './RSVPForm';

export default function InviteExperience({ guest }) {
  // Navigation Steps: 'welcome' | 'details' | 'rsvp'
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
        fontFamily: "'Playfair Display', 'Cinzel', 'Georgia', serif",
        overflowY: 'auto',
        backgroundColor: '#0a0203',
      }}
    >
      {/* Background Image Layer */}
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
              : "radial-gradient(circle at center, rgba(61, 10, 17, 0.85) 0%, rgba(8, 1, 2, 0.95) 100%), url('/welcome-bg.jpg')",
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

      {/* STEP 2: MAROON VELVET & GOLD INVITATION CARD */}
      {step === 'details' && (
        <div
          style={{
            margin: '40px 20px',
            maxWidth: '560px',
            width: '90%',
            position: 'relative',
            backgroundColor: '#EAE1CE', // Cream parchment
            border: '3px double #C2A052', // Double gold border
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), inset 0 0 40px rgba(184, 134, 11, 0.15)',
            overflow: 'hidden',
          }}
        >
          {/* MAROON VELVET DRAPE - LEFT SIDE */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '42px',
              background: 'linear-gradient(90deg, #3d000a 0%, #610515 40%, #2b0007 80%, #C2A052 100%)',
              borderRight: '2px solid #C2A052',
              boxShadow: '3px 0 10px rgba(0,0,0,0.5)',
              zIndex: 2,
            }}
          />

          {/* MAROON VELVET DRAPE - RIGHT SIDE */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '42px',
              background: 'linear-gradient(-90deg, #3d000a 0%, #610515 40%, #2b0007 80%, #C2A052 100%)',
              borderLeft: '2px solid #C2A052',
              boxShadow: '-3px 0 10px rgba(0,0,0,0.5)',
              zIndex: 2,
            }}
          />

          {/* CARD INNER CONTENT */}
          <div style={{ padding: '48px 56px 40px 56px', textAlign: 'center', color: '#5B4332', position: 'relative', zIndex: 1 }}>
            
            {/* Top Gold Medallion */}
            <div style={{ color: '#B8860B', fontSize: '22px', marginBottom: '12px', letterSpacing: '4px' }}>
              ❖ ⚜ ❖
            </div>

            {/* Arabic Calligraphy */}
            <p
              style={{
                fontSize: '24px',
                margin: '0 0 18px 0',
                color: '#610515',
                fontFamily: 'serif',
                lineHeight: '1.4',
                fontWeight: '600',
              }}
            >
              بَارَكَ ٱللَّٰهُ لَهُمَا وَبَارَكَ عَلَيْهِمَا وَجَمَعَ بَيْنَهُمَا فِي خَيْرٍ
            </p>

            {/* Host Text */}
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#5B4332',
                margin: '0 0 20px 0',
                fontStyle: 'italic',
                fontWeight: '500',
              }}
            >
              Mr. and Mrs. Syed Abrar-ul Hussain<br />
              invite you to the nikah ceremony<br />
              and reception of their daughter
            </p>

            {/* Gold Ornament Divider */}
            <div style={{ color: '#C2A052', fontSize: '14px', margin: '0 0 20px 0', letterSpacing: '6px' }}>
              ─── ❖ ───
            </div>

            {/* Bride Name */}
            <h1
              style={{
                fontSize: '38px',
                fontFamily: "'Great Vibes', 'Alex Brush', 'Playfair Display', cursive",
                color: '#610515',
                margin: '0 0 4px 0',
                fontWeight: 'normal',
                letterSpacing: '1px',
              }}
            >
              Ayesha Syeda Hussain
            </h1>

            {/* Connector */}
            <p style={{ fontSize: '15px', color: '#B8860B', margin: '8px 0', fontStyle: 'italic', letterSpacing: '2px' }}>
              — with —
            </p>

            {/* Groom Name */}
            <h1
              style={{
                fontSize: '38px',
                fontFamily: "'Great Vibes', 'Alex Brush', 'Playfair Display', cursive",
                color: '#610515',
                margin: '0 0 24px 0',
                fontWeight: 'normal',
                letterSpacing: '1px',
              }}
            >
              Owais Hasan Sayeed
            </h1>

            {/* Gold Ornament Divider */}
            <div style={{ color: '#C2A052', fontSize: '14px', margin: '0 0 24px 0', letterSpacing: '6px' }}>
              ─── ❖ ───
            </div>

            {/* Event Details */}
            <h2
              style={{
                fontSize: '17px',
                letterSpacing: '3px',
                color: '#5B4332',
                margin: '0 0 14px 0',
                fontWeight: '700',
              }}
            >
              DECEMBER 26, 2026
            </h2>

            <p style={{ fontSize: '12px', letterSpacing: '2px', color: '#610515', margin: '4px 0', fontWeight: '700' }}>
              NIKAH AT 4 PM
            </p>
            <p style={{ fontSize: '12px', letterSpacing: '2px', color: '#610515', margin: '4px 0 24px 0', fontWeight: '700' }}>
              RECEPTION AT 6 PM
            </p>

            {/* Venue Address */}
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#5B4332', margin: '0 0 32px 0', fontWeight: '500' }}>
              Marriott Town Center<br />
              16090 City Walk,<br />
              Sugar Land, TX 77479
            </p>

            {/* Bottom Accent */}
            <div style={{ color: '#C2A052', fontSize: '16px', marginBottom: '28px' }}>
              ❦
            </div>

            {/* Button */}
            <button
              onClick={() => setStep('rsvp')}
              style={{
                backgroundColor: '#610515',
                color: '#F4E4BC',
                padding: '14px 38px',
                fontSize: '13px',
                border: '1px solid #C2A052',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 15px rgba(97, 5, 21, 0.4)',
              }}
            >
              Continue to RSVP
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: RSVP FORM CONTAINER */}
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
