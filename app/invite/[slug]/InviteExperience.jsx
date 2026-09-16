'use client';

import { useState, useEffect } from 'react';
import RSVPForm from './RSVPForm';

export default function InviteExperience({ guest }) {
  const [isSealOpen, setIsSealOpen] = useState(false);
  const [step, setStep] = useState('welcome');
  const [isOpening, setIsOpening] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(guest?.has_rsvped || false);
  const [isMounted, setIsMounted] = useState(false);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setIsMounted(true);
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
    return () => clearInterval(timer);
  }, []);

  const isShaadiInvited = guest?.invited_to_shaadi ?? true;
  const isValimaInvited = guest?.invited_to_valima ?? true;

  const shaadiImgSrc = guest?.groom_side ? '/shaadi-groom.png' : '/shaadi-bride.png';
  const valimaImgSrc = guest?.groom_side ? '/valima-groom.png' : '/valima-bride.png';

  const handleOpenCurtains = () => {
    setIsOpening(true);
    setTimeout(() => {
      setStep('details');
      setIsOpening(false);
    }, 900);
  };

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
      <style jsx global>{`
        .envelope-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #3d050e;
          transition: opacity 0.8s ease-in-out 0.8s, visibility 0.8s 0.8s;
          perspective: 1400px;
          overflow: hidden;
        }

        .envelope-overlay.open {
          opacity: 0;
          visibility: hidden;
          pointer-events: none !important;
        }

        .envelope-container {
          position: relative;
          width: 100vw;
          max-width: 500px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .envelope-base {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 101;
        }

        /* Top Flap Container */
        .envelope-top-flap {
          position: absolute;
          top: -15px;
          left: 0;
          width: 100%;
          height: 52vh;
          z-index: 103;
          transform-origin: top center;
          transition: transform 1s cubic-bezier(0.77, 0, 0.175, 1);
          transform-style: preserve-3d;
        }

        .envelope-top-flap img.flap-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }

        .envelope-overlay.open .envelope-top-flap {
          transform: rotateX(-120deg) translateY(-100px);
        }

        /* Standalone Wax Seal positioned over flap tip */
        .wax-seal-overlay {
          position: absolute;
          bottom: -45px;
          left: 50%;
          transform: translateX(-50%);
          width: 110px;
          height: 110px;
          z-index: 104;
          cursor: pointer;
          filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5));
          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .wax-seal-overlay:hover {
          transform: translateX(-50%) scale(1.05);
          filter: drop-shadow(0px 6px 14px rgba(0, 0, 0, 0.6));
        }

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
        }
        .dynamic-bg.step-details,
        .dynamic-bg.step-rsvp {
          background-image: none;
          background-color: #000000;
        }

        .curtain-left, .curtain-right {
          position: fixed;
          top: 0;
          width: 50%;
          height: 100%;
          background-image: url('/welcome-bg.jpg');
          background-size: cover;
          background-repeat: no-repeat;
          z-index: 10;
          transition: transform 0.9s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .curtain-left {
          left: 0;
          background-position: left center;
        }
        .curtain-right {
          right: 0;
          background-position: right center;
        }
        .opening .curtain-left {
          transform: translateX(-100%);
        }
        .opening .curtain-right {
          transform: translateX(100%);
        }

        .stacked-invitation-item {
          z-index: 1;
          max-width: 560px;
          width: 92%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 28px;
        }
      `}</style>

      {/* ENVELOPE OVERLAY */}
      <div className={`envelope-overlay ${isSealOpen ? 'open' : ''}`}>
        <div className="envelope-container">
          {/* Lower Pocketfold Background */}
          <img
            src="/envelope-bottom.jpeg"
            alt="Envelope Pocket Background"
            className="envelope-base"
          />

          {/* Top Flap Container */}
          <div className="envelope-top-flap">
            <img
              src="/envelope-top.jpg"
              alt="Top Envelope Flap"
              className="flap-bg"
            />
            
            {/* Standalone Gold Wax Seal */}
            <img
              src="/wax-seal.png"
              alt="Wax Seal"
              className="wax-seal-overlay"
              onClick={() => setIsSealOpen(true)}
            />
          </div>
        </div>
      </div>

      <div className={isOpening ? 'opening' : ''} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
        {isOpening && (
          <>
            <div className="curtain-left" />
            <div className="curtain-right" />
          </>
        )}
      </div>

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
              onClick={handleOpenCurtains}
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

      {/* STEP 2: SCROLLABLE CARDS */}
      {step === 'details' && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {isShaadiInvited && (
            <div className="stacked-invitation-item">
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
              <button
                onClick={() => setStep('rsvp')}
                style={goldButtonStyle}
              >
                Click to RSVP
              </button>
            </div>
          )}

          {isValimaInvited && (
            <div className="stacked-invitation-item">
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
              <button
                onClick={() => setStep('rsvp')}
                style={goldButtonStyle}
              >
                Click to RSVP
              </button>
            </div>
          )}

          {/* Countdown Timer */}
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

              <div style={{ marginBottom: '14px' }}>
                <p style={{ fontWeight: '700', margin: '0 0 2px 0', color: '#610515' }}>Getting Around</p>
                <p style={{ margin: '0 0 6px 0' }}>
                  There are plenty of ways to get around Houston! You’ll find several car rental options, plus taxis and rideshare services. If you plan to explore the city, renting a car is often the easiest option.
                </p>
                <a
                  href="https://www.fly2houston.com/iah/ground-transportation"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#8B6B23', textDecoration: 'underline', fontSize: '0.8rem', fontWeight: '600' }}
                >
                  IAH Ground Transportation Information
                </a>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <p style={{ fontWeight: '700', margin: '0 0 2px 0', color: '#610515' }}>High Season in Houston</p>
                <p style={{ margin: 0 }}>
                  Houston stays busy all year, and hotels fill up fast on wedding weekends. Book your travel early to get the best rates and availability.
                </p>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <p style={{ fontWeight: '700', margin: '0 0 4px 0', color: '#610515' }}>Our Favorite Restaurants</p>
                <ul style={{ margin: 0, paddingLeft: '18px', listStyleType: 'disc' }}>
                  <li>Aga's</li>
                  <li>Ma's House</li>
                  <li>Bundu Khan</li>
                  <li>Levant</li>
                </ul>
              </div>

              <div>
                <p style={{ fontWeight: '700', margin: '0 0 4px 0', color: '#610515' }}>Things to Do in Houston</p>
                <ul style={{ margin: 0, paddingLeft: '18px', listStyleType: 'disc' }}>
                  <li>Space Center Houston</li>
                  <li>Museum District</li>
                  <li>Buffalo Bayou Park</li>
                  <li>Houston Zoo</li>
                  <li>The Menil Collection</li>
                  <li>Discovery Green</li>
                  <li>The Galleria</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Q&A Card */}
          <section style={cardContainerStyle}>
            <h2 style={{ fontSize: '1.1rem', letterSpacing: '2px', color: '#610515', marginBottom: '6px', textTransform: 'uppercase', fontWeight: '700' }}>
              Questions & Answers
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#8B6B23', fontStyle: 'italic', marginBottom: '16px' }}>
              If you have questions, please check our Q & A section first!
            </p>
            
            <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#3B2414', textAlign: 'left' }}>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontWeight: '700', margin: '0 0 2px 0', color: '#610515' }}>When is the RSVP deadline?</p>
                <p style={{ margin: 0 }}>Please RSVP by November 1st so we can get an accurate headcount. :)</p>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontWeight: '700', margin: '0 0 2px 0', color: '#610515' }}>What time should I arrive?</p>
                <p style={{ margin: 0 }}>We recommend arriving 15–20 minutes before the scheduled start time so you can get settled and enjoy the celebration.</p>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontWeight: '700', margin: '0 0 2px 0', color: '#610515' }}>Is there parking available?</p>
                <p style={{ margin: 0 }}>Yes! Parking will be available at the venue in the parking garage.</p>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontWeight: '700', margin: '0 0 2px 0', color: '#610515' }}>Can we use our phones and cameras to take photos during the wedding?</p>
                <p style={{ margin: 0 }}>Absolutely! Capture all the memories you’d like — just please don’t block our photographer’s shots. They’re talented, we promise :)</p>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontWeight: '700', margin: '0 0 2px 0', color: '#610515' }}>What is the dress code?</p>
                <p style={{ margin: 0 }}>Formal / Traditional South Asian attire.</p>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontWeight: '700', margin: '0 0 2px 0', color: '#610515' }}>Can I bring additional guests?</p>
                <p style={{ margin: 0 }}>Please refer to the seats allocated in your RSVP form step.</p>
              </div>

              <div>
                <p style={{ fontWeight: '700', margin: '0 0 2px 0', color: '#610515' }}>What will the weather be like?</p>
                <p style={{ margin: 0 }}>Welcome to Houston, out-of-towners! You can expect cool, comfortable days—usually around 60–70°F—with cooler evenings. We recommend bringing layers, a light jacket, and comfortable shoes. And as always, plan for a little extra traffic. ;)</p>
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
