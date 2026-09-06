'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function RSVPForm({ guest, onSeatsUpdate, onEdit }) {
  const [attending, setAttending] = useState(guest?.attending_count > 0 ? 'yes' : 'no');
  const [attendingCount, setAttendingCount] = useState(
    guest?.attending_count && guest.attending_count > 0
      ? guest.attending_count
      : guest?.max_invites ?? 1
  );
  const [dua, setDua] = useState(guest?.notes || '');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(guest?.has_rsvped || false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    if (!guest?.id) {
      setErrorMessage('Guest profile not found. Please try reloading the page.');
      setSubmitting(false);
      return;
    }

    const isAttending = attending === 'yes';
    const finalCount = isAttending ? parseInt(attendingCount, 10) : 0;

    try {
      const { error } = await supabase
        .from('guests')
        .update({
          attending_count: finalCount,
          has_rsvped: true,
          notes: dua,
          updated_at: new Date().toISOString(),
        })
        .eq('id', guest.id);

      if (error) {
        console.error('Supabase update error:', error);
        setErrorMessage('Failed to submit RSVP. Please check your connection and try again.');
      } else {
        if (onSeatsUpdate) {
          onSeatsUpdate(finalCount);
        }
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Unexpected error during RSVP submission:', err);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = () => {
    setSubmitted(false);
    if (onEdit) {
      onEdit();
    }
  };

  if (submitted) {
    const finalAttendingCount = attending === 'yes' ? parseInt(attendingCount, 10) : 0;

    return (
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <h3 style={{ fontSize: '24px', color: '#8C733E', marginBottom: '12px' }}>
          Thank You!
        </h3>
        <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.6', marginBottom: '10px' }}>
          {finalAttendingCount > 0
            ? `Your RSVP for ${finalAttendingCount} ${finalAttendingCount === 1 ? 'guest' : 'guests'} has been recorded.`
            : 'Your response has been recorded. We will miss you!'}
        </p>
        <button
          type="button"
          onClick={handleEdit}
          style={{
            marginTop: '16px',
            background: 'none',
            border: 'none',
            color: '#8C733E',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Edit Response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'left', marginTop: '20px' }}>
      {/* Attendance Option */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
          Will you be attending?
        </label>
        <div style={{ display: 'flex', gap: '20px' }}>
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}>
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={attending === 'yes'}
              onChange={() => setAttending('yes')}
            />
            Joyfully Accept
          </label>
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}>
            <input
              type="radio"
              name="attending"
              value="no"
              checked={attending === 'no'}
              onChange={() => setAttending('no')}
            />
            Regretfully Decline
          </label>
        </div>
      </div>

      {/* Guest Count Selection */}
      {attending === 'yes' && (
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="attendingCount" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
            Number of Guests Attending:
          </label>
          <select
            id="attendingCount"
            value={attendingCount}
            onChange={(e) => setAttendingCount(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #CCC',
              fontSize: '16px',
              backgroundColor: '#FFF',
              color: '#333',
            }}
          >
            {Array.from({ length: guest?.max_invites || 1 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Dua / Message for the Couple */}
      <div style={{ marginBottom: '24px' }}>
        <label htmlFor="dua" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
          Leave a dua for the couple!
        </label>
        <textarea
          id="dua"
          rows={3}
          value={dua}
          onChange={(e) => setDua(e.target.value)}
          placeholder="May Allah bless your union with love, happiness, and prosperity..."
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #CCC',
            fontSize: '15px',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            color: '#333',
          }}
        />
      </div>

      {errorMessage && (
        <p style={{ color: '#D9534F', fontSize: '14px', marginBottom: '16px' }}>
          {errorMessage}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        style={{
          width: '100%',
          backgroundColor: '#8C733E',
          color: '#FFFFFF',
          padding: '14px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: submitting ? 'not-allowed' : 'pointer',
          opacity: submitting ? 0.7 : 1,
          transition: 'background-color 0.2s',
        }}
      >
        {submitting ? 'Submitting...' : 'Submit RSVP'}
      </button>
    </form>
  );
}
