'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RSVPForm({ guest }) {
  const [attending, setAttending] = useState(guest?.attending !== false ? 'yes' : 'no');
  const [attendingCount, setAttendingCount] = useState(
    guest?.attending_count ?? guest?.max_invites ?? 1
  );
  const [dietaryNotes, setDietaryNotes] = useState(guest?.dietary_notes || '');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(guest?.rsvp_submitted || false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    const isAttending = attending === 'yes';

    const { error } = await supabase
      .from('guests')
      .update({
        attending: isAttending,
        attending_count: isAttending ? parseInt(attendingCount, 10) : 0,
        dietary_notes: dietaryNotes,
        rsvp_submitted: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', guest.id);

    setSubmitting(false);

    if (error) {
      console.error('Supabase update error:', error);
      setErrorMessage('Failed to submit RSVP. Please try again.');
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <h3 style={{ fontSize: '22px', color: '#8C733E', marginBottom: '12px' }}>
          Thank You!
        </h3>
        <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.6' }}>
          Your RSVP has been recorded. We look forward to celebrating with you!
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          style={{
            marginTop: '20px',
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
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={attending === 'yes'}
              onChange={() => setAttending('yes')}
            />
            Joyfully Accept
          </label>
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
            Number of Guests Attending (Max {guest?.max_invites}):
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

      {/* Dietary Restrictions / Notes */}
      <div style={{ marginBottom: '24px' }}>
        <label htmlFor="dietaryNotes" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
          Dietary Restrictions or Notes:
        </label>
        <textarea
          id="dietaryNotes"
          rows={3}
          value={dietaryNotes}
          onChange={(e) => setDietaryNotes(e.target.value)}
          placeholder="e.g., Vegetarian, nut allergies, high chair needed"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #CCC',
            fontSize: '15px',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
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
