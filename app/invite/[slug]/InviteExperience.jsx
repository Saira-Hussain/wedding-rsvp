'use client';

import { useState } from 'react';
import RSVPForm from './RSVPForm';

export default function InviteExperience({ guest }) {
  // Navigation Steps: 'welcome' | 'details' | 'rsvp'
  const [step, setStep] = useState('welcome');

  // Background style based on step
  const backgroundStyle =
    step === 'welcome'
      ? {
          backgroundImage: "url('/welcome-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      : {
          background:
            "radial-gradient(circle at center, rgba(61, 10, 17, 0.85) 0%, rgba(8, 1, 2, 0.95) 100%), url('/welcome-bg.jpg')",
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
      {/* Dynamic Background Layer */}
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

      {/* STEP 2: PHYSICAL INVITATION RECREATION CARD */}
      {step === 'details' && (
        <div
          style={{
            zIndex: 1,
            margin: '40px 20px',
            maxWidth: '560px',
            width: '90%',
            position: 'relative',
            backgroundColor: '#F4E8D2', // Warm Ivory / Parchment
            border: '4px double #C2A052', // Ornate Gold Border
            borderRadius: '6px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), inset 0 0 50px rgba(194, 160, 82, 0.2)',
            overflow: 'hidden',
          }}
        >
          {/* MAROON VELVET DRAPE & GOLD TRIM - LEFT SIDE */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '46px',
              background: 'linear-gradient(90deg, #3d000a 0%, #610515 45%, #2b0007 85%, #C2A052 100%)',
              borderRight: '2px solid #C2A052',
              boxShadow: '4px 0 12px rgba(0,0,0,0.6)',
              zIndex: 3,
            }}
          />

          {/* MAROON VELVET DRAPE & GOLD TRIM - RIGHT SIDE */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '46px',
              background: 'linear-gradient(-90deg, #3d000a 0%, #610515 45%, #2b0007 85%, #C2A052 100%)',
              borderLeft: '2px solid #C2A052',
              boxShadow: '-4px 0 12px rgba(0,0,0,0.6)',
              zIndex: 3,
            }}
          />

          {/* HANGING LANTERN - LEFT */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '58px',
              color: '#B8860B',
              fontSize: '20px',
              zIndex: 4,
              opacity: 0.85,
            }}
          >
            🏮
          </div>

          {/* HANGING LANTERN - RIGHT */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '58px',
              color: '#B8860B',
              fontSize: '20px',
              zIndex: 4,
              opacity: 0.85,
            }}
          >
            🏮
          </div>

          {/* INNER PARCHMENT CONTENT AREA */}
          <div
            style={{
              padding: '44px 58px 40px 58px',
              textAlign: 'center',
              color: '#3B2414', // Dark Espresso Text
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Top Gold Medallion with Ruby Emblem */}
            <div
              style={{
                color: '#B8860B',
                fontSize: '26px',
                marginBottom: '10px',
                letterSpacing: '2px',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              ❖ 💎 ❖
            </div>

            {/* Arabic Calligraphy Blessing in Antique Gold */}
            <p
              style={{
                fontSize: '23px',
                margin: '0 0 16px 0',
                color: '#8B6B23', // Muted Antique Gold
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

            {/* Subtle Gold Ornament Divider */}
            <div style={{ color: '#C2A052', fontSize: '13px', margin: '0 0 18px 0', letterSpacing: '6px' }}>
              ─── ❖ ───
            </div>

            {/* Bride Name in Flowing Script */}
            <h1
              style={{
                fontSize: '40px',
                fontFamily: "'Great Vibes', 'Alex Brush', 'Playfair Display', cursive",
                color: '#610515', // Deep Burgundy Calligraphy
                margin: '0 0 2px 0',
                fontWeight: 'normal',
                letterSpacing: '1px',
              }}
            >
              Ayesha Syeda Hussain
            </h1>

            {/* Connecting 'with' */}
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

            {/* Groom Name in Flowing Script */}
            <h1
              style={{
                fontSize: '40px',
                fontFamily: "'Great Vibes', 'Alex Brush', 'Playfair Display', cursive",
                color: '#610515', // Deep Burgundy Calligraphy
                margin: '0 0 20px 0',
                fontWeight: 'normal',
                letterSpacing: '1px',
              }}
            >
              Owais Hasan Sayeed
            </h1>

            {/* Subtle Gold Ornament Divider */}
            <div style={{ color: '#C2A052', fontSize: '13px', margin: '0 0 22px 0', letterSpacing: '6px' }}>
              ─── ❖ ───
            </div>

            {/* Event Date & Schedule */}
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

            {/* Venue Details */}
            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#3B2414', margin: '0 0 28px 0', fontWeight: '500' }}>
              Marriott Town Center<br />
              16090 City Walk,<br />
              Sugar Land, TX 77479
            </p>

            {/* Bottom Filigree Accent */}
            <div style={{ color: '#C2A052', fontSize: '16px', marginBottom: '24px' }}>
              ❦
            </div>

            {/* RSVP Button */}
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
            backgroundColor: '#F4E8D2',
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
