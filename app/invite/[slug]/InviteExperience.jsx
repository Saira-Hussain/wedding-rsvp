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

  // New State for Tabbed Navigation, Accordions, and FAQs
  const [activeTab, setActiveTab] = useState('stay');
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

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

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
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

  const FlourishDivider = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '24px 0', gap: '12px' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: '#C2A052', opacity: 0.6 }} />
      <span style={{ color: '#C2A052', fontSize: '1.2rem', lineHeight: '1' }}>❦</span>
      <div style={{ flex: 1, height: '1px', backgroundColor: '#C2A052', opacity: 0.6 }} />
    </div>
  );

  const faqData = [
    {
      q: 'What is the dress code for the events?',
      a: 'Formal South Asian or Western attire is welcomed. We encourage vibrant, festive colors for all celebrations!',
    },
    {
      q: 'Can I bring additional guests or children?',
      a: 'Due to venue seating constraints, we can only accommodate guests formally listed on your invitation portal.',
    },
    {
      q: 'Is parking available at the venues?',
      a: 'Yes, complimentary self-parking and valet options are available at both Sugar Land Marriott and the Valima Reception Hall.',
    },
    {
      q: 'What time should I arrive?',
      a: 'Please aim to arrive 15-20 minutes before event times to enjoy welcome refreshments and find your seating.',
    },
  ];

  const localFoodPills = [
    { name: 'Aga’s Restaurant', desc: 'Famous Pakistani & Indian' },
    { name: 'Fadi’s Mediterranean', desc: 'Buffet & Fresh Grills' },
    { name: 'Aling’s Chinese', desc: 'Indo-Chinese Fusion' },
    { name: 'Laredo Taqueria', desc: 'Authentic Local Tacos' },
  ];

  const localAttractionsPills = [
    { name: 'Sugar Land Town Square', desc: 'Dining & Outdoor Shopping' },
    { name: 'Houston Museum District', desc: 'World-Class Museums' },
    { name: 'The Galleria', desc: 'Premier Shopping Destination' },
    { name: 'Discovery Green', desc: 'Downtown Park & Arts' },
  ];

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

          <FlourishDivider />

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

          <FlourishDivider />

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
                    🤝
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
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#610515' }}>Guest Reception & Greetings</h3>
                  </div>
                </div>

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
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#610515' }}>Valima Feast</h3>
                  </div>
                </div>
              </div>
            </section>
          )}

          <FlourishDivider />

          {/* TABBED NAVIGATION FOR GUEST DETAILS */}
          <section style={{ ...cardContainerStyle, padding: '24px 16px' }}>
            <h2 style={sectionHeadingStyle}>Guest Details & Guide</h2>

            {/* Tab Buttons */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { id: 'stay', label: '🏨 Stay' },
                { id: 'travel', label: '✈️ Travel' },
                { id: 'food', label: '🍲 Food' },
                { id: 'explore', label: '🏙️ Explore' },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: '1 1 20%',
                      minWidth: '90px',
                      padding: '8px 12px',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      border: '1px solid #C2A052',
                      cursor: 'pointer',
                      backgroundColor: isActive ? '#610515' : '#FAF3E0',
                      color: isActive ? '#F4E4BC' : '#610515',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? '0 2px 8px rgba(97,5,21,0.3)' : 'none',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div
              style={{
                backgroundColor: '#FAF3E0',
                borderRadius: '10px',
                padding: '18px 14px',
                border: '1px solid rgba(194, 160, 82, 0.4)',
                textAlign: 'left',
              }}
            >
              {activeTab === 'stay' && (
                <div>
                  <h3 style={{ margin: '0 0 8px 0', color: '#610515', fontSize: '1rem', fontWeight: '700' }}>
                    Accommodations
                  </h3>
                  <p style={{ margin: '0 0 10px 0', fontSize: '0.88rem', color: '#444', lineHeight: '1.4' }}>
                    A room block is reserved at <strong>Houston Marriott Sugar Land Town Center</strong>. Mention the <em>Ayesha & Owais Wedding Block</em> for special rates.
                  </p>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#8B6B23', fontWeight: '600' }}>
                    📍 16090 City Walk, Sugar Land, TX 77479
                  </p>
                </div>
              )}

              {activeTab === 'travel' && (
                <div>
                  <h3 style={{ margin: '0 0 8px 0', color: '#610515', fontSize: '1rem', fontWeight: '700' }}>
                    Airport & Transit
                  </h3>
                  <p style={{ margin: '0 0 8px 0', fontSize: '0.88rem', color: '#444', lineHeight: '1.4' }}>
                    <strong>George Bush Intercontinental (IAH):</strong> ~45 min drive.
                  </p>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#444', lineHeight: '1.4' }}>
                    <strong>William P. Hobby Airport (HOU):</strong> ~35 min drive. Uber, Lyft, and rental cars are readily available at both airports.
                  </p>
                </div>
              )}

              {activeTab === 'food' && (
                <div>
                  <h3 style={{ margin: '0 0 12px 0', color: '#610515', fontSize: '1rem', fontWeight: '700', textAlign: 'center' }}>
                    Local Eats & Favorites
                  </h3>
                  {/* Pill / Chip Grid Layout */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    {localFoodPills.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: '#E4C6A3',
                          border: '1px solid #C2A052',
                          borderRadius: '16px',
                          padding: '10px 14px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      >
                        <span style={{ fontWeight: '700', fontSize: '0.85rem', color: '#610515' }}>{item.name}</span>
                        <span style={{ fontSize: '0.75rem', color: '#666' }}>{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'explore' && (
                <div>
                  <h3 style={{ margin: '0 0 12px 0', color: '#610515', fontSize: '1rem', fontWeight: '700', textAlign: 'center' }}>
                    Things to Do in Houston
                  </h3>
                  {/* Pill / Chip Grid Layout */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    {localAttractionsPills.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: '#E4C6A3',
                          border: '1px solid #C2A052',
                          borderRadius: '16px',
                          padding: '10px 14px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      >
                        <span style={{ fontWeight: '700', fontSize: '0.85rem', color: '#610515' }}>{item.name}</span>
                        <span style={{ fontSize: '0.75rem', color: '#666' }}>{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <FlourishDivider />

          {/* COLLAPSIBLE FAQ ACCORDIONS */}
          <section style={cardContainerStyle}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '2px', color: '#8B6B23', textTransform: 'uppercase', margin: '0 0 4px 0', fontWeight: '700' }}>
              QUESTIONS & ANSWERS
            </p>
            <h2 style={{ ...sectionHeadingStyle, fontSize: '1.4rem', marginBottom: '20px' }}>
              Frequently Asked Questions
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              {faqData.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#FAF3E0',
                      border: '1px solid #C2A052',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#610515', paddingRight: '8px' }}>
                        {faq.q}
                      </span>
                      <span
                        style={{
                          color: '#C2A052',
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        ▼
                      </span>
                    </button>

                    <div
                      style={{
                        maxHeight: isOpen ? '200px' : '0px',
                        opacity: isOpen ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.35s ease, opacity 0.3s ease, padding 0.3s ease',
                        padding: isOpen ? '0 16px 14px 16px' : '0 16px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#444', lineHeight: '1.45' }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* STEP 3: RSVP FORM SCREEN */}
      {step === 'rsvp' && (
        <div style={{ width: '100%', maxWidth: '600px', zIndex: 10, padding: '20px 0' }}>
          <RSVPForm
            guest={guest}
            onBack={() => setStep('details')}
            onComplete={() => {
              setHasSubmitted(true);
              setStep('details');
            }}
          />
        </div>
      )}
    </main>
  );
}
