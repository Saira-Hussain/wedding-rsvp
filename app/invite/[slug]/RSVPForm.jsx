'use client';

import { useState } from 'react';
import { submitRSVP } from './actions';

export default function RSVPForm({ guest }) {
  const [attendingCount, setAttendingCount] = useState(
    guest.has_rsvped ? guest.attending_count : guest.max_invites
  );
  const [notes, setNotes] = useState(guest.notes || '');
  const [status, setStatus] = useState(guest.has_rsvped ? 'submitted' : 'idle');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('slug', guest.slug);
    formData.append('attending_count', attendingCount);
    formData.append('notes', notes);

    const result = await submitRSVP(formData);
    setLoading(false);

    if (result.success) {
      setStatus('submitted');
    } else {
      alert('Error saving RSVP: ' + result.error);
    }
  }

  return (
    <div style={{ maxWidth: '400px', width: '100%', padding: '24px', border: '1px solid #e5e5e5', borderRadius: '12px', background: '#ffffff' }}>
      {status === 'submitted' ? (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>RSVP Confirmed!</h2>
          <p style={{ color: '#555' }}>
            {attendingCount > 0
              ? `We look forward to hosting ${attendingCount} guest(s) from the ${guest.family_name}.`
              : `We are sorry to hear you can't make it!`}
          </p>
          <button
            onClick={() => setStatus('idle')}
            style={{ marginTop: '16px', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', color: '#777' }}
          >
            Update response
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Number of Guests Attending (Max {guest.max_invites})
            </label>
            <select
              value={attendingCount}
              onChange={(e) => setAttendingCount(Number(e.target.value))}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            >
              <option value={0}>0 — Regretfully Decline</option>
              {Array.from({ length: guest.max_invites }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Notes / Dietary Restrictions
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests..."
              rows={3}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            {loading ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </form>
      )}
    </div>
  );
}   