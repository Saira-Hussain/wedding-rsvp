'use client';

import { useState, useEffect } from 'react';
import RSVPForm from './RSVPForm';

export default function InviteExperience({ guest }) {
  const [step, setStep] = useState('welcome');
  const [isOpening, setIsOpening] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(guest?.has_rsvped || false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
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

  const isNikkahInvited = guest?.invited_to_nikkah ?? true;
  const isShaadiInvited = guest?.invited_to_shaadi ?? true;

  const handleOpenCurtains = () => {
    setIsOpening(true);
    setTimeout(() => {
      setStep('details');
      setIsOpening(false);
    }, 900);
  };

  const cardContainerStyle = {
    zIndex: 1,
    maxWidth: '380px',
    width: '90%',
    backgroundColor: 'rgba(244, 232, 210, 0.94)',
    backdropFilter: 'blur(4px)',
    border: '2px solid #C2A052',
    borderRadius: '12px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.65)',
    boxSizing: 'border-box',
    padding: '24px 16px',
    textAlign: 'center',
    color: '#3B2414',
    marginBottom: '24px',
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
        backgroundColor: '#0a0203',
        padding: step === 'details' ? '32px 12px 60px 12px' : '24px 12px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        overflowY: 'auto',
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
            background-size: 100% 100% !important;
          }
        }
        .dynamic-bg.step-details,
        .dynamic-bg.step-rsvp {
          background-image: url('/welcome-bg.jpg');
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
      `}</style>

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
              onClick={handleOpenCurtains}
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

      {/* STEP 2: SCROLLABLE CARDS */}
      {step === 'details' && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Box 1: Invitation & Event Details */}
          <section style={cardContainerStyle}>
            <div style={{ color: '#B8860B', fontSize: '16px', marginBottom: '6px', letterSpacing: '2px' }}>
              ❖ ⚜ ❖
            </div>

            <p
              style={{
                fontSize: 'clamp(0.9rem, 3.5vw, 1.15rem)',
                margin: '0 0 8px 0',
                color: '#8B6B23',
                fontFamily: 'serif',
                lineHeight: '1.4',
                fontWeight: '600',
                padding: '0 4px',
              }}
            >
              بَارَكَ ٱللَّٰهُ لَهُمَا وَبَارَكَ عَلَيْهِمَا وَجَمَعَ بَيْنَهُمَا فِي خَيْرٍ
            </p>

            <p style={{ fontSize: '0.78rem', lineHeight: '1.4', color: '#3B2414', margin: '0 0 10px 0', fontStyle: 'italic', fontWeight: '500' }}>
              Under the guardianship of Mr. and Mrs. Syed Badar-ul Hussain<br />
              and the blessings of Late Mr. Mohammed Rafiuddin:<br />
              <br />
              <span style={{ fontSize: '0.95rem', fontWeight: '600', fontStyle: 'normal', display: 'inline-block', marginBottom: '2px' }}>
                Mr. and Mrs. Syed Abrar-ul Hussain
              </span><br />
              invite you to the reception of their daughter
            </p>

            <div style={{ color: '#C2A052', fontSize: '10px', margin: '0 0 8px 0', letterSpacing: '3px' }}>
              ─── ❖ ───
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
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
                fontSize: '1rem',
                fontFamily: "var(--font-script), 'Great Vibes', cursive",
                color: '#B8860B',
                margin: '2px 0',
              }}
            >
              with
            </p>

            <h1
              style={{
                fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
                fontFamily: "var(--font-script), 'Great Vibes', cursive",
                color: '#610515',
                margin: '0 0 8px 0',
                fontWeight: '400',
                lineHeight: '1.2',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                padding: '0 4px',
              }}
            >
              Owais Hasan Sayeed
            </h1>

            <div style={{ color: '#C2A052', fontSize: '10px', margin: '0 0 10px 0', letterSpacing: '3px' }}>
              ─── ❖ ───
            </div>

            <h2 style={{ fontSize: '0.85rem', letterSpacing: '2px', color: '#3B2414', margin: '0 0 6px 0', fontWeight: '700' }}>
              DECEMBER 26, 2026
            </h2>

            {isNikkahInvited && (
              <p style={{ fontSize: '0.74rem', letterSpacing: '1px', color: '#610515', margin: '2px 0', fontWeight: '700' }}>
                NIKKAH AT 4 PM
              </p>
            )}

            {isShaadiInvited && (
              <p style={{ fontSize: '0.74rem', letterSpacing: '1px', color: '#610515', margin: '2px 0 10px 0', fontWeight: '700' }}>
                RECEPTION AT 6 PM
              </p>
            )}

            <p style={{ fontSize: '0.78rem', lineHeight: '1.4', color: '#3B2414', margin: '0 0 14px 0', fontWeight: '500' }}>
              Marriott Town Center<br />
              16090 City Walk,<br />
              Sugar Land, TX 77479
            </p>

            <button
              onClick={() => setStep('rsvp')}
              style={{
                backgroundColor: '#610515',
                color: '#F4E8D2',
                padding: '10px 16px',
                fontSize: '0.74rem',
                border: '1px solid #C2A052',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 15px rgba(97, 5, 21, 0.35)',
                width: '100%',
                maxWidth: '240px',
              }}
            >
              Click to RSVP
            </button>
          </section>

          {/* Box 2: Countdown Timer */}
          <section style={cardContainerStyle}>
            <h2 style={{ fontSize: '1rem', letterSpacing: '2px', color: '#610515', marginBottom: '16px', textTransform: 'uppercase', fontWeight: '700' }}>
              Counting Down
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Mins', val: timeLeft.minutes },
                { label: 'Secs', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(97, 5, 21, 0.08)',
                    border: '1px solid #C2A052',
                    borderRadius: '6px',
                    padding: '8px 4px',
                  }}
                >
                  <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: '700', color: '#610515' }}>
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#8B6B23', letterSpacing: '0.5px' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Box 3: Travel */}
          <section style={cardContainerStyle}>
            <h2 style={{ fontSize: '1rem', letterSpacing: '2px', color: '#610515', marginBottom: '16px', textTransform: 'uppercase', fontWeight: '700' }}>
              Travel
            </h2>

            <div style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#3B2414', textAlign: 'left' }}>
              
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
                  style={{ color: '#8B6B23', textDecoration: 'underline', fontSize: '0.75rem', fontWeight: '600' }}
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

          {/* Box 4: Q&A */}
          <section style={cardContainerStyle}>
            <h2 style={{ fontSize: '1rem', letterSpacing: '2px', color: '#610515', marginBottom: '6px', textTransform: 'uppercase', fontWeight: '700' }}>
              Questions & Answers
            </h2>
            <p style={{ fontSize: '0.75rem', color: '#8B6B23', fontStyle: 'italic', marginBottom: '16px' }}>
              If you have questions, please check our Q & A section first!
            </p>
            
            <div style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#3B2414', textAlign: 'left' }}>
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
            maxWidth: '360px',
            width: '85%',
            backgroundColor: 'rgba(244, 232, 210, 0.96)',
            border: '2px solid #C2A052',
            padding: '20px 14px',
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
