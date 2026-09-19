'use client';

import { useState, useEffect, useRef } from 'react';
import RSVPForm from './RSVPForm';

export default function InviteExperience({ guest }) {
  const [step, setStep] = useState('welcome');
  const [videoEnded, setVideoEnded] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(guest?.has_rsvped || false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const videoRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setIsMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Autoplay blocked or waiting for user interaction:', err);
      });
    }

    const targetDate = new Date('2026-12-26T16:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const isShaadiInvited = guest?.invited_to_shaadi ?? true;
  const isValimaInvited = guest?.invited_to_valima ?? true;

  const shaadiImgSrc = guest?.groom_side ? '/shaadi-groom.png' : '/shaadi-bride.png';
  const valimaImgSrc = guest?.groom_side ? '/valima-groom.png' : '/valima-bride.png';

  const welcomeBgImage = isMobile ? "url('/welcome-mobile-bg.jpg')" : "url('/welcome-bg.jpg')";

  const cardContainerStyle = {
    zIndex: 1,
    maxWidth: '560px',
    width: '92%',
    backgroundColor: '#E4C6A3',
    border: '2px solid #C2A052',
    borderRadius: '12px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.65)',
    boxSizing: 'border-box',
    padding: '28px 24px',
    textAlign: 'center',
    color: '#3B2414',
    marginBottom: '28px',
  };

  const goldButtonStyle = {
    marginTop: '16px',
    backgroundImage: "url('/gold-card-bg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#610515',
    padding: '12px 24px',
    fontSize: '0.85rem',
    border: '2px solid #C2A052',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '700',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
    width: '100%',
    maxWidth: '300px',
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
        justifyContent: step === 'welcome' ? 'space-between' : 'flex-start',
        fontFamily: "var(--font-cormorant), 'Playfair Display', 'Georgia', serif",
        backgroundColor: '#000000',
        padding: step === 'details' ? '32px 16px 60px 16px' : '24px 16px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      {/* 1. INTRO VIDEO OVERLAY */}
      {!videoEnded && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <video
            ref={videoRef}
            src="/envelope.mp4"
            autoPlay
            muted
            playsInline
            onEnded={() => setVideoEnded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              maxWidth: '500px',
            }}
          />
        </div>
      )}

      {/* 2. INLINE DYNAMIC BACKGROUND */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          backgroundImage: step === 'welcome' ? welcomeBgImage : 'none',
          backgroundColor: step === 'welcome' ? 'transparent' : '#000000',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'background-image 0.8s ease-in-out',
        }}
      />

      {step === 'welcome' && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.85) 100%)',
          }}
        />
      )}

      {/* STEP 1: WELCOME + BISMILLAH BUTTON */}
      {videoEnded && step === 'welcome' && (
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
          <div style={{ paddingTop: '2vh' }}>
            <div
              style={{
                border: '1px solid #C2A052',
                borderRadius: '50px',
                padding: '8px 24px',
                backgroundColor: 'rgba(10, 2, 3, 0.6)',
                backdropFilter: 'blur(4px)',
                display: 'inline-block',
              }}
            >
              <h1
                style={{
                  fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
                  color: '#F4E4BC',
                  margin: 0,
                  fontWeight: '400',
                  letterSpacing: '0.5px',
                }}
              >
                Welcome, {guest?.family_name || 'Guest'}
              </h1>
            </div>
          </div>

          <div style={{ paddingBottom: '2vh', width: '100%' }}>
            <button
              onClick={() => setStep('details')}
              style={{
                backgroundColor: 'rgba(20, 20, 20, 0.9)',
                color: '#FFFFFF',
                padding: '12px 24px',
                fontSize: 'clamp(0.9rem, 3.8vw, 1.1rem)',
                border: '1px solid #C2A052',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                letterSpacing: '1px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.8)',
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

      {/* STEP 2: SCROLLABLE CARDS & DETAILS */}
      {step === 'details' && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {isShaadiInvited && (
            <div
              style={{
                zIndex: 1,
                maxWidth: '560px',
                width: '92%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '28px',
              }}
            >
              <img
                src={shaadiImgSrc}
                alt="Shaadi Invitation"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.65)',
                  border: '2px solid #C2A052',
                  display: 'block',
                }}
              />
              <button onClick={() => setStep('rsvp')} style={goldButtonStyle}>
                Click to RSVP
              </button>
            </div>
          )}

          {isValimaInvited && (
            <div
              style={{
                zIndex: 1,
                maxWidth: '560px',
                width: '92%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '28px',
              }}
            >
              <img
                src={valimaImgSrc}
                alt="Valima Invitation"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.65)',
                  border: '2px solid #C2A052',
                  display: 'block',
                }}
              />
              <button onClick={() => setStep('rsvp')} style={goldButtonStyle}>
                Click to RSVP
              </button>
            </div>
          )}

          {/* Countdown */}
          <section style={cardContainerStyle}>
            <h2 style={{ fontSize: '1.1rem', letterSpacing: '2px', color: '#610515', marginBottom: '16px', textTransform: 'uppercase', fontWeight: '700' }}>
              Counting Down
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {[
                { label: 'Days', val: isMounted ? timeLeft.days : 0 },
                { label: 'Hours', val: isMounted ? timeLeft.hours : 0 },
                { label: 'Mins', val: isMounted ? timeLeft.minutes : 0 },
                { label: 'Secs', val: isMounted ? timeLeft.seconds : 0 },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(97, 5, 21, 0.08)',
                    border: '1px solid #C2A052',
                    borderRadius: '6px',
                    padding: '12px 6px',
                  }}
                >
                  <span style={{ display: 'block', fontSize: '1.4rem', fontWeight: '700', color: '#610515' }}>
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#8B6B23', letterSpacing: '0.5px' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Travel Card */}
          <section style={cardContainerStyle}>
            <h2 style={{ fontSize: '1.1rem', letterSpacing: '2px', color: '#610515', marginBottom: '16px', textTransform: 'uppercase', fontWeight: '700' }}>
              Travel
            </h2>
            <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#3B2414', textAlign: 'left' }}>
              <div style={{ marginBottom: '14px' }}>
                <p style={{ fontWeight: '700', margin: '0 0 2px 0', color: '#610515' }}>Getting In</p>
                <p style={{ margin: 0 }}>
                  We recommend flying into <strong>George Bush Intercontinental Airport (IAH)</strong>! <strong>William P. Hobby Airport (HOU)</strong> is another good option depending on where you’re staying.
                </p>
              </div>
              <div>
                <a
                  href="https://www.fly2houston.com/iah/ground-transportation"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#8B6B23', textDecoration: 'underline', fontSize: '0.8rem', fontWeight: '600' }}
                >
                  IAH Ground Transportation Information
                </a>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* STEP 3: RSVP FORM */}
      {step === 'rsvp' && (
        <div
          style={{
            zIndex: 1,
            maxWidth: '450px',
            width: '90%',
            backgroundColor: '#E4C6A3',
            border: '2px solid #C2A052',
            padding: '24px 18px',
            borderRadius: '12px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
            color: '#3B2414',
            boxSizing: 'border-box',
            margin: 'auto 0',
          }}
        >
          <h2 style={{ fontSize: '1.3rem', color: '#610515', marginBottom: '8px' }}>
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
