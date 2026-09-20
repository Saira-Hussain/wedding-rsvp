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

  // Accordion & Tabbed Details State
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [activeTab, setActiveTab] = useState('stay');

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

  const faqs = [
    { q: 'When is the RSVP deadline?', a: 'Please RSVP by November 15th so we can finalize table settings and arrangements with our venue.' },
    { q: 'What time should I arrive?', a: 'We recommend arriving 20-30 minutes before the scheduled start time to park and find your seats comfortably.' },
    { q: 'Is there parking available on-site?', a: 'Yes! Both venues feature complimentary guest parking lots adjacent to the main halls.' },
    { q: 'What is the dress code?', a: 'Formal / Traditional South Asian attire or Black Tie Optional.' },
  ];

  const localRecsFood = ["Aga's Restaurant", "Ma's House", "Bundu Khan", "Levant Grill", "Fadi's Eatery", "Alings Chinese"];
  const localRecsExplore = ["Sugar Land Town Square", "Houston Museum District", "The Galleria", "Space Center Houston", "Discovery Green"];

  // Helper Flourish Divider Component
  const FlourishDivider = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '20px 0', color: '#8B6B23' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(194, 160, 82, 0.4)' }} />
      <span style={{ fontSize: '1rem' }}>❦</span>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(194, 160, 82, 0.4)' }} />
    </div>
  );

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

          {/* TABBED NAVIGATION: GUEST DETAILS */}
          <section style={cardContainerStyle}>
            <h2 style={sectionHeadingStyle}>Guest Details</h2>
            <FlourishDivider />

            {/* Top Navigation Tabs */}
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
              {[
                { id: 'stay', label: '🏨 Stay' },
                { id: 'travel', label: '✈️ Travel' },
                { id: 'food', label: '🍽️ Food' },
                { id: 'explore', label: '📍 Explore' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '20px',
                    border: '1px solid #C2A052',
                    backgroundColor: activeTab === tab.id ? '#610515' : '#FAF3E0',
                    color: activeTab === tab.id ? '#F4E4BC' : '#610515',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {activeTab === 'stay' && (
              <div style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#3B2414' }}>
                <p style={{ fontWeight: '700', color: '#610515', marginBottom: '6px' }}>Hotel Accommodations</p>
                <p style={{ margin: 0 }}>
                  A room block has been reserved at the <strong>Houston Marriott Sugar Land Town Center</strong>. Please mention the Ayesha & Owais wedding when reserving for special guest rates.
                </p>
              </div>
            )}

            {activeTab === 'travel' && (
              <div style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#3B2414' }}>
                <p style={{ fontWeight: '700', color: '#610515', marginBottom: '6px' }}>Airport & Local Transit</p>
                <p style={{ margin: 0 }}>
                  We recommend flying into <strong>William P. Hobby Airport (HOU)</strong> or <strong>George Bush Intercontinental Airport (IAH)</strong>. Rideshare options (Uber/Lyft) are readily available throughout the Houston metro area.
                </p>
              </div>
            )}

            {activeTab === 'food' && (
              <div>
                <p style={{ fontWeight: '700', color: '#610515', marginBottom: '12px', fontSize: '0.9rem' }}>A Few of Our Favorites!</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {localRecsFood.map((place) => (
                    <span
                      key={place}
                      style={{
                        padding: '6px 14px',
                        background: '#610515',
                        color: '#F4E4BC',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      }}
                    >
                      {place}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'explore' && (
              <div>
                <p style={{ fontWeight: '700', color: '#610515', marginBottom: '12px', fontSize: '0.9rem' }}>Things to Do in Houston</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {localRecsExplore.map((spot) => (
                    <span
                      key={spot}
                      style={{
                        padding: '6px 14px',
                        background: '#8B3A0F',
                        color: '#FFF',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      }}
                    >
                      {spot}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ACCORDION FAQ SECTION */}
          <section style={cardContainerStyle}>
            <h2 style={sectionHeadingStyle}>Frequently Asked Questions</h2>
            <FlourishDivider />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    border: '1px solid #C2A052',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    background: '#FAF3E0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.2s ease',
                  }}
                  onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', color: '#610515' }}>
                    <span style={{ fontSize: '0.9rem' }}>{faq.q}</span>
                    <span style={{ fontSize: '1.1rem', marginLeft: '8px' }}>{openFaqIdx === i ? '−' : '+'}</span>
                  </div>
                  {openFaqIdx === i && (
                    <p style={{ marginTop: '8px', fontSize: '0.85rem', color: '#3B2414', lineHeight: '1.4', marginBottom: 0 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>
      )}

      {/* STEP 3: RSVP FORM */}
      {step === 'rsvp' && (
        <div style={{ width: '100%', maxWidth: '600px', zIndex: 20, padding: '20px 0' }}>
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
