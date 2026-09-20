'use client';

import { useState, useEffect, useRef } from 'react';
import RSVPForm from './RSVPForm';

export default function InviteExperience({ guest }) {
  const [step, setStep] = useState('welcome');
  const [videoStarted, setVideoStarted] = useState(false);
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

    const targetDate = new Date('2026-12-26T15:00:00');
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

  const handleStartVideo = () => {
    setVideoStarted(true);

    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;

      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Mobile video playback prevented:', err);
          setVideoEnded(true);
        });
      }
    } else {
      setVideoEnded(true);
    }
  };

  const handleBismillahClick = (e) => {
    e.stopPropagation();
    if (!videoStarted) {
      handleStartVideo();
    }
    setStep('details');
  };

  const handleDownloadCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//EN',
      'BEGIN:VEVENT',
      'SUMMARY:Ayesha & Owais Shaadi',
      'DESCRIPTION:Nikah at 3:00 PM followed by Reception.',
      'LOCATION:Houston Marriott Sugar Land Town Center\\, 16090 City Walk\\, Sugar Land\\, TX 77479',
      'DTSTART:20261226T150000',
      'DTEND:20261226T230000',
      'END:VEVENT',
      'BEGIN:VEVENT',
      'SUMMARY:Ayesha & Owais Valima',
      'DESCRIPTION:Valima Reception starting at 5:30 PM.',
      'LOCATION:10505 Cash Rd\\, Stafford\\, TX 77477',
      'DTSTART:20261227T173000',
      'DTEND:20261227T220000',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ayesha-owais-wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isShaadiInvited = guest?.invited_to_shaadi ?? true;
  const isValimaInvited = guest?.invited_to_valima ?? true;

  const shaadiImgSrc = guest?.groom_side ? '/shaadi-groom.png' : '/shaadi-bride.png';
  const valimaImgSrc = guest?.groom_side ? '/valima-groom.png' : '/valima-bride.png';

  const welcomeBgImage = isMobile ? "url('/welcome-mobile-bg.jpg')" : "url('/welcome-bg.jpg')";
  const shaadiMapsUrl = "https://www.google.com/maps/search/?api=1&query=16090+City+Walk,+Sugar+Land,+TX+77479";
  const valimaMapsUrl = "https://www.google.com/maps/search/?api=1&query=10505+Cash+Rd,+Stafford,+TX+77477";

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

  const sectionHeadingStyle = {
    fontSize: '1.1rem',
    letterSpacing: '2px',
    color: '#610515',
    marginBottom: '16px',
    textTransform: 'uppercase',
    fontWeight: '700',
  };

  const subHeadingStyle = {
    fontWeight: '700',
    margin: '12px 0 2px 0',
    color: '#610515',
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
        padding: step === 'details' ? '32px 16px 60px 16px' : '0px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        overflowY: step === 'welcome' ? 'hidden' : 'auto',
      }}
    >
      {/* 1. BACKGROUND VIDEO LAYER */}
      {!videoEnded && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100dvh',
            overflow: 'hidden',
          }}
        >
          <video
            ref={videoRef}
            src="/envelope.mp4"
            autoPlay
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
            onEnded={() => setVideoEnded(true)}
            onError={() => setVideoEnded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              maxWidth: '500px',
            }}
          />
        </div>
      )}

      {/* 2. INVISIBLE FULL-SCREEN TAP TRIGGER */}
      {!videoStarted && step === 'welcome' && (
        <div
          onClick={handleStartVideo}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10,
            cursor: 'pointer',
            backgroundColor: 'transparent',
          }}
        />
      )}

      {/* 3. RESPONSIVE DYNAMIC BACKGROUND */}
      {videoEnded && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100dvh',
            zIndex: 0,
            backgroundImage: step === 'welcome' ? welcomeBgImage : 'none',
            backgroundColor: step === 'welcome' ? 'transparent' : '#000000',
            backgroundSize: isMobile ? 'cover' : 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'background-image 0.8s ease-in-out',
          }}
        />
      )}

      {step === 'welcome' && videoEnded && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100dvh',
            zIndex: 0,
            pointerEvents: 'none',
            background:
              'linear-gradient(to right, rgba(0,0,0,0.85) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.85) 100%)',
          }}
        />
      )}

      {/* STEP 1: WELCOME SCREEN */}
      {videoEnded && step === 'welcome' && (
        <div
          style={{
            position: 'relative',
            zIndex: 20,
            width: '100%',
            maxWidth: '1200px',
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            boxSizing: 'border-box',
            paddingTop: 'calc(env(safe-area-inset-top) + 40px)',
            paddingBottom: 'calc(env(safe-area-inset-bottom) + 32px)',
          }}
        >
          {/* COMPACT & ELEGANT WELCOME HEADER */}
          <div
            style={{
              padding: '6px 18px',
              border: '1px solid #C2A052',
              borderRadius: '20px',
              backgroundColor: '#000000',
              boxShadow: '0 4px 16px rgba(0,0,0,0.8)',
              margin: '0 16px',
              maxWidth: '90%',
              boxSizing: 'border-box',
            }}
          >
            <h1
              style={{
                color: '#FAF3E0',
                fontSize: 'clamp(0.75rem, 2.5vw, 1.05rem)',
                fontFamily: "var(--font-cormorant), 'Playfair Display', serif",
                fontWeight: '600',
                letterSpacing: '1.5px',
                margin: 0,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Welcome {guest?.family_name || 'Family'}
            </h1>
          </div>

          {/* BISMILLAH BUTTON */}
          <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleBismillahClick}
              style={{
                backgroundColor: 'rgba(20, 20, 20, 0.9)',
                color: '#FFFFFF',
                padding: '12px 24px',
                fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
                border: '1px solid #C2A052',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                letterSpacing: '1px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.8)',
                fontFamily: 'serif',
                backdropFilter: 'blur(6px)',
                width: '100%',
                maxWidth: '260px',
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
          
          {/* WELCOME HEADER */}
          <section
            style={{
              ...cardContainerStyle,
              marginBottom: '20px',
              padding: '24px 18px',
            }}
          >
            <h2
              style={{
                fontSize: '1.8rem',
                fontFamily: "'Great Vibes', 'Dancing Script', cursive",
                color: '#610515',
                margin: '0 0 6px 0',
                fontWeight: '400',
              }}
            >
              Welcome {guest?.family_name || 'Family'}
            </h2>
            <p
              style={{
                fontSize: '0.9rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#8B6B23',
                margin: 0,
                fontWeight: '700',
              }}
            >
              To Our Beginning
            </p>
          </section>

          {/* SHAADI CARD */}
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

          {/* VALIMA CARD */}
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

          {/* COUNTDOWN & SAVE TO CALENDAR */}
          <section style={cardContainerStyle}>
            <h2 style={sectionHeadingStyle}>Counting Down To Forever</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
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

            <button
              onClick={handleDownloadCalendar}
              style={{
                backgroundColor: 'rgba(97, 5, 21, 0.95)',
                color: '#F4E4BC',
                border: '1px solid #C2A052',
                borderRadius: '25px',
                padding: '10px 20px',
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '1px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              }}
            >
              📅 ADD TO CALENDAR (.ICS)
            </button>
          </section>

          {/* SHAADI VENUE MAP */}
          {isShaadiInvited && (
            <section style={cardContainerStyle}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '2px', color: '#8B6B23', textTransform: 'uppercase', margin: '0 0 4px 0', fontWeight: '700' }}>
                SHAADI VENUE
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#FAF3E0',
                    border: '1px solid #C2A052',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                  }}
                >
                  📍
                </div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#610515', margin: '0 0 4px 0' }}>
                  Houston Marriott Sugar Land Town Center
                </h2>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>
                  16090 City Walk, Sugar Land, TX 77479
                </p>
              </div>

              <div
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #C2A052',
                  marginBottom: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                <iframe
                  title="Shaadi Venue Location Map"
                  src="https://maps.google.com/maps?q=16090%20City%20Walk,%20Sugar%20Land,%20TX%2077479&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <a
                  href={shaadiMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    backgroundColor: '#8B3A0F',
                    color: '#FFF',
                    padding: '12px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  🗺️ OPEN SHAADI MAPS
                </a>
              </div>
            </section>
          )}

          {/* VALIMA VENUE MAP */}
          {isValimaInvited && (
            <section style={cardContainerStyle}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '2px', color: '#8B6B23', textTransform: 'uppercase', margin: '0 0 4px 0', fontWeight: '700' }}>
                VALIMA VENUE
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#FAF3E0',
                    border: '1px solid #C2A052',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                  }}
                >
                  📍
                </div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#610515', margin: '0 0 4px 0' }}>
                  Valima Reception Hall
                </h2>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>
                  10505 Cash Rd, Stafford, TX 77477
                </p>
              </div>

              <div
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #C2A052',
                  marginBottom: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                <iframe
                  title="Valima Venue Location Map"
                  src="https://maps.google.com/maps?q=10505%20Cash%20Rd,%20Stafford,%20TX%2077477&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <a
                  href={valimaMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    backgroundColor: '#8B3A0F',
                    color: '#FFF',
                    padding: '12px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  🗺️ OPEN VALIMA MAPS
                </a>
              </div>
            </section>
          )}

          {/* SHAADI TIMELINE */}
          {isShaadiInvited && (
            <section style={cardContainerStyle}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '2px', color: '#8B6B23', textTransform: 'uppercase', margin: '0 0 4px 0', fontWeight: '700' }}>
                ITINERARY OF EVENTS
              </p>
              <h2 style={{ ...sectionHeadingStyle, fontSize: '1.4rem', marginBottom: '16px' }}>
                Shaadi Timeline
              </h2>

              <div
                style={{
                  backgroundImage: "url('/gold-card-bg.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid #C2A052',
                  borderRadius: '20px',
                  padding: '6px 20px',
                  display: 'inline-block',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  color: '#610515',
                  letterSpacing: '1px',
                  marginBottom: '28px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                DECEMBER 26, 2026
              </div>

              {/* Vertical Timeline */}
              <div style={{ position: 'relative', paddingLeft: '40px', textAlign: 'left' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '17px',
                    top: '10px',
                    bottom: '10px',
                    width: '2px',
                    backgroundColor: '#C2A052',
                  }}
                />

                {/* Event 1: Nikah */}
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '-40px',
                      top: '0',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: '#FAF3E0',
                      border: '2px solid #C2A052',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                    }}
                  >
                    📖
                  </div>
                  <div
                    style={{
                      backgroundColor: '#FAF3E0',
                      borderRadius: '12px',
                      padding: '14px',
                      border: '1px solid rgba(194, 160, 82, 0.4)',
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#F4E4BC',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#610515',
                        display: 'inline-block',
                        marginBottom: '6px',
                      }}
                    >
                      3:00 PM
                    </span>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#610515' }}>Nikah Ceremony</h3>
                  </div>
                </div>

                {/* Event 2: Maghrib */}
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '-40px',
                      top: '0',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: '#FAF3E0',
                      border: '2px solid #C2A052',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                    }}
                  >
                    🕌
                  </div>
                  <div
                    style={{
                      backgroundColor: '#FAF3E0',
                      borderRadius: '12px',
                      padding: '14px',
                      border: '1px solid rgba(194, 160, 82, 0.4)',
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#F4E4BC',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#610515',
                        display: 'inline-block',
                        marginBottom: '6px',
                      }}
                    >
                      5:30 PM
                    </span>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#610515' }}>Maghrib Prayer</h3>
                  </div>
                </div>

                {/* Event 3: Entrances */}
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '-40px',
                      top: '0',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: '#FAF3E0',
                      border: '2px solid #C2A052',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                    }}
                  >
                    ✨
                  </div>
                  <div
                    style={{
                      backgroundColor: '#FAF3E0',
                      borderRadius: '12px',
                      padding: '14px',
                      border: '1px solid rgba(194, 160, 82, 0.4)',
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#F4E4BC',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#610515',
                        display: 'inline-block',
                        marginBottom: '6px',
                      }}
                    >
                      6:00 PM
                    </span>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#610515' }}>Grand Entrances</h3>
                  </div>
                </div>

                {/* Event 4: Dinner */}
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '-40px',
                      top: '0',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: '#FAF3E0',
                      border: '2px solid #C2A052',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                    }}
                  >
                    🍽️
                  </div>
                  <div
                    style={{
                      backgroundColor: '#FAF3E0',
                      borderRadius: '12px',
                      padding: '14px',
                      border: '1px solid rgba(194, 160, 82, 0.4)',
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#F4E4BC',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#610515',
                        display: 'inline-block',
                        marginBottom: '6px',
                      }}
                    >
                      7:00 PM
                    </span>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#610515' }}>Dinner Service</h3>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* VALIMA TIMELINE */}
          {isValimaInvited && (
            <section style={cardContainerStyle}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '2px', color: '#8B6B23', textTransform: 'uppercase', margin: '0 0 4px 0', fontWeight: '700' }}>
                ITINERARY OF EVENTS
              </p>
              <h2 style={{ ...sectionHeadingStyle, fontSize: '1.4rem', marginBottom: '16px' }}>
                Valima Timeline
              </h2>

              <div
                style={{
                  backgroundImage: "url('/gold-card-bg.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid #C2A052',
                  borderRadius: '20px',
                  padding: '6px 20px',
                  display: 'inline-block',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  color: '#610515',
                  letterSpacing: '1px',
                  marginBottom: '28px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                DECEMBER 27, 2026
              </div>

              {/* Vertical Timeline */}
              <div style={{ position: 'relative', paddingLeft: '40px', textAlign: 'left' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '17px',
                    top: '10px',
                    bottom: '10px',
                    width: '2px',
                    backgroundColor: '#C2A052',
                  }}
                />

                {/* Event 1: Maghrib */}
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '-40px',
                      top: '0',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: '#FAF3E0',
                      border: '2px solid #C2A052',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                    }}
                  >
                    🕌
                  </div>
                  <div
                    style={{
                      backgroundColor: '#FAF3E0',
                      borderRadius: '12px',
                      padding: '14px',
                      border: '1px solid rgba(194, 160, 82, 0.4)',
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#F4E4BC',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#610515',
                        display: 'inline-block',
                        marginBottom: '6px',
                      }}
                    >
                      5:30 PM
                    </span>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#610515' }}>Maghrib Prayer</h3>
                  </div>
                </div>

                {/* Event 2: Entrances */}
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '-40px',
                      top: '0',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: '#FAF3E0',
                      border: '2px solid #C2A052',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                    }}
                  >
                    ✨
                  </div>
                  <div
                    style={{
                      backgroundColor: '#FAF3E0',
                      borderRadius: '12px',
                      padding: '14px',
                      border: '1px solid rgba(194, 160, 82, 0.4)',
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#F4E4BC',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#610515',
                        display: 'inline-block',
                        marginBottom: '6px',
                      }}
                    >
                      6:00 PM
                    </span>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#610515' }}>Grand Entrances</h3>
                  </div>
                </div>

                {/* Event 3: Dinner */}
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '-40px',
                      top: '0',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: '#FAF3E0',
                      border: '2px solid #C2A052',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                    }}
                  >
                    🍽️
                  </div>
                  <div
                    style={{
                      backgroundColor: '#FAF3E0',
                      borderRadius: '12px',
                      padding: '14px',
                      border: '1px solid rgba(194, 160, 82, 0.4)',
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#F4E4BC',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#610515',
                        display: 'inline-block',
                        marginBottom: '6px',
                      }}
                    >
                      7:00 PM
                    </span>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#610515' }}>Dinner Service</h3>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Where to Stay */}
          <section style={cardContainerStyle}>
            <h2 style={sectionHeadingStyle}>Where to Stay</h2>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#3B2414', margin: '0 0 12px 0' }}>
              Below are some great options for hotels!
            </p>
            <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#3B2414', textAlign: 'left' }}>
              <p style={{ ...subHeadingStyle, marginTop: 0 }}>Sugar Land Town Square Area</p>
              <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                <li>Marriott Sugar Land Town Square</li>
                <li>Hyatt Place Houston / Sugar Land</li>
                <li>Courtyard by Marriott Houston Sugar Land / Lake Pointe</li>
                <li>Hilton Garden Inn Houston / Sugar Land</li>
              </ul>
            </div>
          </section>

          {/* Travel */}
          <section style={cardContainerStyle}>
            <h2 style={sectionHeadingStyle}>Travel</h2>
            <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#3B2414', textAlign: 'left' }}>
              <div>
                <p style={{ ...subHeadingStyle, marginTop: 0 }}>Getting In</p>
                <p style={{ margin: 0 }}>
                  We recommend flying into <strong>George Bush Intercontinental Airport (IAH)</strong>! <strong>William P. Hobby Airport (HOU)</strong> is another good option depending on where you’re staying.
                </p>
              </div>

              <div>
                <p style={subHeadingStyle}>Getting Downtown</p>
                <p style={{ margin: 0 }}>
                  There are plenty of ways to get around Houston! You’ll find several car rental options, plus taxis and rideshare services. If you plan to explore the city, renting a car is often the easiest option.
                </p>
                <div style={{ marginTop: '8px' }}>
                  <a
                    href="https://www.fly2houston.com/iah/ground-transportation"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#8B6B23', textDecoration: 'underline', fontSize: '0.8rem', fontWeight: '600' }}
                  >
                    George Bush Intercontinental Airport (IAH) - Ground Transportation Information
                  </a>
                </div>
              </div>

              <div>
                <p style={subHeadingStyle}>High Season in Houston</p>
                <p style={{ margin: 0 }}>
                  Houston stays busy all year, and hotels fill up fast on wedding weekends. Book your travel early to get the best rates and availability.
                </p>
              </div>
            </div>
          </section>

          {/* Our Favorite Restaurants */}
          <section style={cardContainerStyle}>
            <h2 style={sectionHeadingStyle}>A Few of Our Favorites!</h2>
            <p
              style={{
                fontSize: '0.85rem',
                color: '#8B6B23',
                fontWeight: '600',
                margin: '-8px 0 16px 0',
                letterSpacing: '0.5px',
              }}
            >
              Hungry in Houston? Here are a few places we love!
            </p>
            <ul style={{ fontSize: '0.85rem', lineHeight: '1.8', color: '#3B2414', textAlign: 'left', margin: 0, paddingLeft: '20px' }}>
              <li><strong>Aga's Restaurant & Catering</strong></li>
              <li><strong>Ma's House</strong></li>
              <li><strong>Bundu Khan</strong></li>
              <li><strong>Levant Grill & Bakery</strong></li>
            </ul>
          </section>

          {/* Things to Do in Houston */}
          <section style={cardContainerStyle}>
            <h2 style={sectionHeadingStyle}>Things to Do in Houston</h2>
            <ul style={{ fontSize: '0.85rem', lineHeight: '1.8', color: '#3B2414', textAlign: 'left', margin: 0, paddingLeft: '20px' }}>
              <li>Space Center Houston</li>
              <li>Museum District</li>
              <li>Buffalo Bayou Park</li>
              <li>Houston Zoo</li>
              <li>The Menil Collection</li>
              <li>Discovery Green</li>
              <li>The Galleria</li>
            </ul>
          </section>

          {/* Q&A Section */}
          import { useState } from 'react';

export default function QASection({ cardContainerStyle, sectionHeadingStyle }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQA = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const subHeadingStyle = {
    fontWeight: '700',
    color: '#610515',
    margin: 0,
    fontSize: '0.95rem',
  };

  const qaData = [
    {
      question: 'When is the RSVP deadline?',
      answer: 'Please RSVP by November 1st so we can get an accurate headcount. :)',
    },
    {
      question: 'What time should I arrive?',
      answer:
        'We recommend arriving 15–20 minutes before the scheduled start time so you can get settled and enjoy the celebration.',
    },
    {
      question: 'Is there parking available?',
      answer: 'Yes! Parking will be available at the venue in the parking garage.',
    },
    {
      question: 'Can we use our phones and cameras to take photos during the wedding?',
      answer:
        'We request for everyone to be careful when taking photographs and videos, especially around our hijabi guests. Please respect their privacy and refrain from photographing them without their permission. Our professional photographers will be capturing the special moments throughout the celebration, so we kindly ask that you leave the photography to them whenever possible. Thank you for helping us create a comfortable and respectful environment for everyone! Jazakallah Khair! :)',
    },
    {
      question: 'What will the weather be like?',
      answer:
        'Welcome to Houston, out-of-towners! You can expect cool, comfortable days—usually around 60–70°F—with cooler evenings. We recommend bringing layers, a light jacket, and comfortable shoes. And as always, plan for a little extra traffic. ;)',
    },
    {
      question: 'For our out of town guests',
      answer:
        'We hope you have a safe travel and a memorable stay in Houston, please remember the couple in your duas while travelling!',
    },
  ];

  return (
    <section style={cardContainerStyle}>
      <h2 style={sectionHeadingStyle}>Q & A</h2>
      <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#3B2414', margin: '0 0 16px 0' }}>
        If you have questions, please check our Q & A section first!
      </p>

      <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#3B2414', textAlign: 'left' }}>
        {qaData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              style={{
                borderBottom: index !== qaData.length - 1 ? '1px solid rgba(194, 160, 82, 0.4)' : 'none',
                paddingBottom: '12px',
                marginBottom: '12px',
              }}
            >
              <button
                type="button"
                onClick={() => toggleQA(index)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '4px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <p style={subHeadingStyle}>{item.question}</p>
                <span
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#610515',
                    marginLeft: '12px',
                    transition: 'transform 0.2s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                    lineHeight: '1',
                  }}
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    marginTop: '8px',
                    paddingLeft: '4px',
                    animation: 'fadeIn 0.2s ease-in-out',
                  }}
                >
                  <p style={{ margin: 0, color: '#3B2414' }}>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
          {/* FINAL CLOSING CARD */}
          <section style={cardContainerStyle}>
            <h2
              style={{
                fontSize: 'clamp(0.9rem, 3.8vw, 1.1rem)',
                letterSpacing: '1px',
                color: '#610515',
                marginBottom: '16px',
                textTransform: 'uppercase',
                fontWeight: '700',
                lineHeight: '1.4',
                wordBreak: 'break-word',
              }}
            >
              We can't wait to <br />
              celebrate with you
            </h2>

            <p
              style={{
                fontSize: '0.8rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#8B6B23',
                margin: '0 0 16px 0',
                fontWeight: '600',
              }}
            >
              December 2026 • Houston, Texas
            </p>

            <p
              style={{
                fontSize: '0.9rem',
                lineHeight: '1.6',
                color: '#3B2414',
                margin: '0 0 16px 0',
              }}
            >
              JazakAllah Khair for being a part of our special day :)
            </p>

            <p
              style={{
                fontSize: '1.35rem',
                fontFamily: "var(--font-cormorant), 'Playfair Display', serif",
                fontStyle: 'italic',
                fontWeight: '600',
                color: '#610515',
                margin: '16px 0 20px 0',
              }}
            >
              With love, <br />
              Ayesha & Owais
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg width="60" height="16" viewBox="0 0 60 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 8H22" stroke="#C2A052" strokeWidth="1" />
                <polygon points="30,2 36,8 30,14 24,8" fill="#C2A052" />
                <path d="M38 8H60" stroke="#C2A052" strokeWidth="1" />
              </svg>
            </div>
          </section>

          {/* RING BOX SECTION */}
          <section
            style={{
              ...cardContainerStyle,
              padding: '20px',
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src="/ring box.png"
              alt="Ring Box"
              style={{
                width: '100%',
                maxHeight: '350px',
                objectFit: 'contain',
                borderRadius: '8px',
                display: 'block',
              }}
            />
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
