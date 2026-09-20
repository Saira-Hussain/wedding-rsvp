'use client';

import { useState } from 'react';

export default function InviteExperience({ guest }) {
  // Navigation & Interactive States
  const [activeTab, setActiveTab] = useState('stay');
  const [openFaq, setOpenFaq] = useState(null);
  const [showRsvpForm, setShowRsvpForm] = useState(false);

  // Guest invitation status flags (defaults to true if undefined)
  const isShaadiInvited = guest?.is_shaadi_invited ?? true;
  const isValimaInvited = guest?.is_valima_invited ?? true;

  // RSVP Form States
  const reservedSeats = guest?.reserved_seats || 4;
  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [menCount, setMenCount] = useState(1);
  const [womenCount, setWomenCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Dynamic Image Sources
  const shaadiImgSrc = guest?.shaadi_card_url || '/shaadi-card.jpg';
  const valimaImgSrc = guest?.valima_card_url || '/valima-card.jpg';

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleTotalGuestsChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setGuestCount(val);
    setMenCount(val);
    setWomenCount(0);
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();

    if (attending && menCount + womenCount !== guestCount) {
      alert(`The sum of Men (${menCount}) and Women (${womenCount}) must equal total attending guests (${guestCount}).`);
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 800));
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reusable Styling Objects
  const cardStyle = {
    backgroundColor: '#FAF3E0',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '24px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
  };

  const sectionHeaderStyle = {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#610515',
    textAlign: 'center',
    marginBottom: '16px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  };

  const goldButtonStyle = {
    marginTop: '20px',
    backgroundColor: '#AE7A44',
    color: '#610515',
    padding: '12px 24px',
    fontSize: '0.85rem',
    border: '2px solid #AE7A44',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '700',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
    width: '100%',
    maxWidth: '300px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #C2A052',
    backgroundColor: '#FAF3E0',
    color: '#3B2414',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
  };

  const faqs = [
    {
      q: 'When is the RSVP deadline?',
      a: 'Please RSVP by November 1st so we can get an accurate headcount. :)',
    },
    {
      q: 'What time should I arrive?',
      a: 'We recommend arriving 15–20 minutes before the scheduled start time so you can get settled and enjoy the celebration.',
    },
    {
      q: 'Is there parking available?',
      a: 'Yes! Parking will be available at the venue in the parking garage.',
    },
    {
      q: 'Can we use our phones and cameras to take photos?',
      a: 'We request for everyone to be careful when taking photographs and videos, especially around our hijabi guests. Please respect their privacy and refrain from photographing them without permission. Our professional photographers will be capturing the special moments throughout the celebration! JazakAllah Khair!',
    },
    {
      q: 'What will the weather be like?',
      a: 'Welcome to Houston, out-of-towners! You can expect cool, comfortable days—usually around 60–70°F—with cooler evenings. We recommend bringing layers, a light jacket, and comfortable shoes.',
    },
    {
      q: 'For our out-of-town guests',
      a: 'We hope you have a safe travel and a memorable stay in Houston. Please remember the couple in your duas while traveling!',
    },
  ];

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', padding: '20px 12px', color: '#FAF3E0', fontFamily: 'serif' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>

        {/* WELCOME HEADER */}
        <div style={{ ...cardStyle, marginBottom: '24px' }}>
          <h2 style={{ color: '#610515', margin: '0 0 6px 0', fontSize: '1.2rem', fontFamily: 'serif' }}>
            Welcome {guest?.family_name || 'Guest'}
          </h2>
          <p style={{ color: '#AE7A44', margin: 0, fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '700' }}>
            TO OUR BEGINNING
          </p>
        </div>

        {/* SHAADI INVITATION CARD IMAGE */}
        {isShaadiInvited && (
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.65)',
              }}
            >
              <img
                src={shaadiImgSrc}
                alt="Shaadi Invitation"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  transform: 'scale(1.08)',
                  transformOrigin: 'center center',
                }}
              />
            </div>
            <button style={goldButtonStyle} onClick={() => setShowRsvpForm(!showRsvpForm)}>
              {showRsvpForm ? 'Close RSVP' : 'Click to RSVP'}
            </button>
          </div>
        )}

        {/* VALIMA INVITATION CARD IMAGE */}
        {isValimaInvited && (
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.65)',
              }}
            >
              <img
                src={valimaImgSrc}
                alt="Valima Invitation"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  transform: 'scale(1.08)',
                  transformOrigin: 'center center',
                }}
              />
            </div>
            {!isShaadiInvited && (
              <button style={goldButtonStyle} onClick={() => setShowRsvpForm(!showRsvpForm)}>
                {showRsvpForm ? 'Close RSVP' : 'Click to RSVP'}
              </button>
            )}
          </div>
        )}

        {/* RSVP FORM MODAL / EXPANDABLE SECTION */}
        {showRsvpForm && (
          <div style={cardStyle}>
            {submitted ? (
              <div style={{ color: '#610515', padding: '10px 0' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>JazakAllah Khair!</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Your RSVP response has been received.</p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ textAlign: 'center', borderBottom: '1px solid #C2A052', paddingBottom: '12px' }}>
                  <p style={{ fontSize: '0.9rem', color: '#610515', fontWeight: '700', margin: 0 }}>
                    We have reserved {reservedSeats} {reservedSeats === 1 ? 'seat' : 'seats'} in your honor
                  </p>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#610515', marginBottom: '8px' }}>
                    Will you be attending?
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setAttending(true)}
                      style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #C2A052',
                        backgroundColor: attending ? '#610515' : '#FAF3E0',
                        color: attending ? '#F4E4BC' : '#3B2414',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      Joyfully Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending(false)}
                      style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #C2A052',
                        backgroundColor: !attending ? '#610515' : '#FAF3E0',
                        color: !attending ? '#F4E4BC' : '#3B2414',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      Regretfully Decline
                    </button>
                  </div>
                </div>

                {attending && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#610515', marginBottom: '6px' }}>
                        Guests attending:
                      </label>
                      <select value={guestCount} onChange={handleTotalGuestsChange} style={inputStyle}>
                        {Array.from({ length: reservedSeats }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#610515', marginBottom: '4px' }}>
                          Men:
                        </label>
                        <input
                          type="number"
                          min="0"
                          max={guestCount}
                          value={menCount}
                          onChange={(e) => {
                            const val = Math.max(0, parseInt(e.target.value, 10) || 0);
                            setMenCount(val);
                            setWomenCount(Math.max(0, guestCount - val));
                          }}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#610515', marginBottom: '4px' }}>
                          Women:
                        </label>
                        <input
                          type="number"
                          min="0"
                          max={guestCount}
                          value={womenCount}
                          onChange={(e) => {
                            const val = Math.max(0, parseInt(e.target.value, 10) || 0);
                            setWomenCount(val);
                            setMenCount(Math.max(0, guestCount - val));
                          }}
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    ...goldButtonStyle,
                    marginTop: '8px',
                    width: '100%',
                    maxWidth: '100%',
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* COUNTDOWN & CALENDAR CARD */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>COUNTING DOWN TO FOREVER</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            {['97\nDAYS', '00\nHOURS', '31\nMINS', '12\nSECS'].map((item, idx) => {
              const [val, label] = item.split('\n');
              return (
                <div key={idx} style={{ border: '1px solid #C2A052', borderRadius: '8px', padding: '8px 12px', backgroundColor: '#FAF3E0' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#610515' }}>{val}</div>
                  <div style={{ fontSize: '0.65rem', color: '#AE7A44', fontWeight: '700' }}>{label}</div>
                </div>
              );
            })}
          </div>
          <a
            href="/wedding-invite.ics"
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: '#610515',
              color: '#F4E4BC',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.8rem',
              fontWeight: '700',
            }}
          >
            📅 ADD TO CALENDAR (.ICS)
          </a>
        </div>

        {/* SHAADI VENUE CARD */}
        {isShaadiInvited && (
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>SHAADI VENUE</div>
            <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', color: '#610515', fontSize: '1rem' }}>
              Houston Marriott Sugar Land Town Center
            </p>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.8rem', color: '#3B2414' }}>
              16090 City Walk, Sugar Land, TX 77479
            </p>
            <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #C2A052', marginBottom: '16px' }}>
              <iframe
                title="Shaadi Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3468.212!2d-95.623!3d29.596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjkgMzUnNDUuNiJOIDk1wrAzNycyMi44Ilc!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                width="100%"
                height="180"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Houston+Marriott+Sugar+Land+Town+Center"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#610515',
                color: '#F4E4BC',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: '700',
              }}
            >
              🗺️ OPEN SHAADI MAPS
            </a>
          </div>
        )}

        {/* VALIMA VENUE CARD */}
        {isValimaInvited && (
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>VALIMA VENUE</div>
            <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', color: '#610515', fontSize: '1rem' }}>
              Valima Reception Hall
            </p>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.8rem', color: '#3B2414' }}>
              10505 Cash Rd, Stafford, TX 77477
            </p>
            <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #C2A052', marginBottom: '16px' }}>
              <iframe
                title="Valima Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3467.500!2d-95.568!3d29.620!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjkgMzcnMTIuMCJOIDk1wrAzNCc0NC44Ilc!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                width="100%"
                height="180"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
            <a
              href="https://maps.google.com/?q=10505+Cash+Rd,+Stafford,+TX+77477"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#610515',
                color: '#F4E4BC',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: '700',
              }}
            >
              🗺️ OPEN VALIMA MAPS
            </a>
          </div>
        )}

        {/* SHAADI TIMELINE CARD */}
        {isShaadiInvited && (
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>SHAADI TIMELINE</div>
            <div style={{ textAlign: 'center', color: '#AE7A44', fontWeight: '700', fontSize: '0.8rem', marginBottom: '16px' }}>
              DECEMBER 26, 2026
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
              {[
                { time: '3:00 PM', event: 'Nikah Ceremony' },
                { time: '5:30 PM', event: 'Maghrib Prayer' },
                { time: '6:00 PM', event: 'Grand Entrances' },
                { time: '7:00 PM', event: 'Dinner Service' },
              ].map((item, idx) => (
                <div key={idx} style={{ padding: '10px 14px', border: '1px solid #C2A052', borderRadius: '8px', backgroundColor: '#FAF3E0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#AE7A44', fontWeight: '700' }}>{item.time}</div>
                  <div style={{ fontSize: '0.9rem', color: '#610515', fontWeight: '700' }}>{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VALIMA TIMELINE CARD */}
        {isValimaInvited && (
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>VALIMA TIMELINE</div>
            <div style={{ textAlign: 'center', color: '#AE7A44', fontWeight: '700', fontSize: '0.8rem', marginBottom: '16px' }}>
              DECEMBER 27, 2026
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
              {[
                { time: '5:30 PM', event: 'Maghrib Prayer' },
                { time: '6:00 PM', event: 'Grand Entrances' },
                { time: '7:00 PM', event: 'Dinner Service' },
              ].map((item, idx) => (
                <div key={idx} style={{ padding: '10px 14px', border: '1px solid #C2A052', borderRadius: '8px', backgroundColor: '#FAF3E0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#AE7A44', fontWeight: '700' }}>{item.time}</div>
                  <div style={{ fontSize: '0.9rem', color: '#610515', fontWeight: '700' }}>{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TABBED GUEST GUIDE */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>GUEST GUIDE</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '20px' }}>
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
                  padding: '8px 4px',
                  borderRadius: '6px',
                  border: '1px solid #C2A052',
                  backgroundColor: activeTab === tab.id ? '#610515' : '#FAF3E0',
                  color: activeTab === tab.id ? '#F4E4BC' : '#3B2414',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ color: '#3B2414', fontSize: '0.85rem', lineHeight: '1.5', textAlign: 'left' }}>
            {activeTab === 'stay' && (
              <div>
                <p style={{ fontWeight: '700', color: '#610515', marginBottom: '8px' }}>
                  Sugar Land Town Square Area:
                </p>
                <ul style={{ paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Marriott Sugar Land Town Square</li>
                  <li>Hyatt Place Houston / Sugar Land</li>
                  <li>Courtyard by Marriott Houston Sugar Land / Lake Pointe</li>
                  <li>Hilton Garden Inn Houston / Sugar Land</li>
                </ul>
              </div>
            )}

            {activeTab === 'travel' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <strong style={{ color: '#610515' }}>Getting In:</strong>
                  <p style={{ margin: '4px 0 0 0' }}>
                    We recommend flying into <strong>George Bush Intercontinental Airport (IAH)</strong>. <strong>William P. Hobby Airport (HOU)</strong> is another good option depending on where you're staying.
                  </p>
                </div>
                <div>
                  <strong style={{ color: '#610515' }}>Getting Downtown & Around:</strong>
                  <p style={{ margin: '4px 0 0 0' }}>
                    There are plenty of ways to get around Houston! You'll find several car rental options, plus taxis and rideshare services like Uber and Lyft.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'food' && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: '700', color: '#610515', marginBottom: '12px' }}>
                  Hungry in Houston? Here are a few places we love!
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {["Aga's Restaurant & Catering", "Ma's House", 'Bundu Khan', 'Levant Grill & Bakery'].map((place) => (
                    <span
                      key={place}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#610515',
                        color: '#F4E4BC',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        border: '1px solid #C2A052',
                      }}
                    >
                      {place}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'explore' && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: '700', color: '#610515', marginBottom: '12px' }}>
                  Things to Do in Houston:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {[
                    'Space Center Houston',
                    'Museum District',
                    'Buffalo Bayou Park',
                    'Houston Zoo',
                    'The Menil Collection',
                    'Discovery Green',
                    'The Galleria',
                  ].map((spot) => (
                    <span
                      key={spot}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#FAF3E0',
                        color: '#610515',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        border: '1px solid #C2A052',
                      }}
                    >
                      {spot}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COLLAPSIBLE Q & A CARD */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>FREQUENTLY ASKED QUESTIONS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    border: '1px solid #C2A052',
                    borderRadius: '8px',
                    backgroundColor: '#FAF3E0',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      color: '#610515',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ fontSize: '1rem', marginLeft: '8px', color: '#AE7A44' }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 14px 12px 14px',
                        fontSize: '0.825rem',
                        color: '#3B2414',
                        lineHeight: '1.5',
                        borderTop: '1px dashed #C2A052',
                        paddingTop: '10px',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CLOSING CARD */}
        <div style={{ ...cardStyle, textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#610515', fontSize: '1rem', letterSpacing: '1px' }}>
            WE CAN'T WAIT TO CELEBRATE WITH YOU
          </h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '0.75rem', color: '#AE7A44', fontWeight: '700' }}>
            DECEMBER 2026 • HOUSTON, TEXAS
          </p>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: '#3B2414', fontStyle: 'italic' }}>
            JazakAllah Khair for being a part of our special day :)
          </p>
          <div style={{ color: '#610515', fontFamily: 'serif', fontSize: '1.2rem', fontWeight: 'bold' }}>
            With love,<br />Ayesha & Owais
          </div>
        </div>

      </div>
    </div>
  );
}
