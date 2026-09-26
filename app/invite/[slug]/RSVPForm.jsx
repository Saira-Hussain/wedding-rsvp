'use client';

import { useState } from 'react';

export default function RSVPForm({ guest, onSeatsUpdate, onBack }) {
  const reservedSeats = guest?.max_guests_shaadi || 4;

  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [duaNote, setDuaNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleTotalGuestsChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setGuestCount(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Replace with your actual Supabase update call:
      // const { error } = await supabase.from('your_table_name').update({ has_rsvpd: true, attending, guest_count: attending ? guestCount : 0, notes: duaNote }).eq('id', guest.id);
      // if (error) throw error;

      await new Promise((res) => setTimeout(res, 800));
      
      setSubmitted(true);
      if (onSeatsUpdate) onSeatsUpdate();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Back Button */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#610515',
            fontSize: '0.85rem',
            fontWeight: '700',
            cursor: 'pointer',
            textAlign: 'left',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ← Back to Invitation
        </button>
      )}

      {submitted ? (
        <div style={{ color: '#610515', padding: '20px 0', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>JazakAllah Khair!</h3>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            Your RSVP response and heartfelt dua have been received.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ textAlign: 'center', borderBottom: '1px solid #C2A052', paddingBottom: '12px' }}>
            <p style={{ fontSize: '0.9rem', color: '#610515', fontWeight: '700', margin: 0 }}>
              We have reserved {reservedSeats} {reservedSeats === 1 ? 'seat' : 'seats'} in your honor
            </p>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#610515', marginBottom: '8px' }}>
              Will you be attending the Shaadi? (4 PM)
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
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#610515', marginBottom: '6px' }}>
                Guests attending Shaadi:
              </label>
              <select value={guestCount} onChange={handleTotalGuestsChange} style={inputStyle}>
                {Array.from({ length: reservedSeats }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Leave a Dua Section */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#610515', marginBottom: '6px' }}>
              Leave a Dua for the Couple:
            </label>
            <textarea
              rows="3"
              value={duaNote}
              onChange={(e) => setDuaNote(e.target.value)}
              placeholder="Share your warm wishes or a sweet dua..."
              style={{
                ...inputStyle,
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: '4px',
              backgroundImage: "url('/gold-card-bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#610515',
              padding: '12px',
              fontSize: '0.85rem',
              border: '2px solid #C2A052',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              width: '100%',
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </form>
      )}
    </div>
  );
}
