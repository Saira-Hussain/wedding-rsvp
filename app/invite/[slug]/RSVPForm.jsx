'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function RSVPForm({ guest, onSeatsUpdate, onEdit }) {
  const isNikahInvited = guest?.invited_to_nikah ?? false;
  const isShaadiInvited = guest?.invited_to_shaadi ?? true;

  // Nikah state
  const [attendingNikah, setAttendingNikah] = useState(
    guest?.nikah_attending_count > 0 ? 'yes' : 'no'
  );
  const [nikahCount, setNikahCount] = useState(
    guest?.nikah_attending_count && guest.nikah_attending_count > 0
      ? guest.nikah_attending_count
      : guest?.max_invites ?? 1
  );

  // Shaadi state
  const [attendingShaadi, setAttendingShaadi] = useState(
    guest?.shaadi_attending_count > 0 || guest?.attending_count > 0 ? 'yes' : 'no'
  );
  const [shaadiCount, setShaadiCount] = useState(
    guest?.shaadi_attending_count && guest.shaadi_attending_count > 0
      ? guest.shaadi_attending_count
      : guest?.attending_count && guest.attending_count > 0
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

    const finalNikahCount = isNikahInvited && attendingNikah === 'yes' ? parseInt(nikahCount, 10) : 0;
    const finalShaadiCount = isShaadiInvited && attendingShaadi === 'yes' ? parseInt(shaadiCount, 10) : 0;

    try {
      const { error } = await supabase
        .from('guests')
        .update({
          nikah_attending_count: finalNikahCount,
          shaadi_attending_count: finalShaadiCount,
          attending_count: finalShaadiCount,
          has_rsvped: true,
          notes: dua,
          updated_at: new Date().toISOString(),
        })
        .eq('id', guest.id);

      if (error) {
        console.error('Supabase update error:', error);
        setErrorMessage('Failed to submit RSVP. Please try again.');
      } else {
        if (onSeatsUpdate) {
          onSeatsUpdate();
        }
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
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
    const finalNikahCount = isNikahInvited && attendingNikah === 'yes' ? parseInt(nikahCount, 10) : 0;
    const finalShaadiCount = isShaadiInvited && attendingShaadi === 'yes' ? parseInt(shaadiCount, 10) : 0;

    return (
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <h3 style={{ fontSize: '24px', color: '#8C733E', marginBottom: '12px' }}>
          Thank You!
        </h3>
        
        {isNikahInvited && (
          <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.5', margin: '4px 0' }}>
            <strong>Nikah:</strong> {finalNikahCount > 0 ? `${finalNikahCount} ${finalNikahCount === 1 ? 'guest' : 'guests'}` : 'Declined'}
          </p>
        )}

        {isShaadiInvited && (
          <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.5', margin: '4px 0' }}>
            <strong>Shaadi / Reception:</strong> {finalShaadiCount > 0 ? `${finalShaadiCount} ${finalShaadiCount === 1 ? 'guest' : 'guests'}` : 'Declined'}
          </p>
        )}

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
    <form onSubmit={handleSubmit} style={{ textAlign: 'left', marginTop: '10px' }}>
      {/* 1. NIKAH QUESTION */}
      {isNikahInvited && (
        <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #D4AF37' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#610515', fontSize: '1.05rem' }}>
            Will you be attending the Nikah? (4 PM)
          </label>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '12px' }}>
            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}>
              <input
                type="radio"
                name="attendingNikah"
                value="yes"
                checked={attendingNikah === 'yes'}
                onChange={() => setAttendingNikah('yes')}
              />
              Joyfully Accept
            </label>
            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}>
              <input
                type="radio"
                name="attendingNikah"
                value="no"
                checked={attendingNikah === 'no'}
                onChange={() => setAttendingNikah('no')}
              />
              Regretfully Decline
            </label>
          </div>

          {attendingNikah === 'yes' && (
            <div>
              <label htmlFor="nikahCount" style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                Guests attending Nikah:
              </label>
              <select
                id="nikahCount"
                value={nikahCount}
                onChange={(e) => setNikahCount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid #CCC',
                  fontSize: '15px',
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
        </div>
      )}

      {/* 2. SHAADI / RECEPTION QUESTION */}
      {isShaadiInvited && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#610515', fontSize: '1.05rem' }}>
            Will you be attending the Shaadi / Reception? (6 PM)
          </label>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '12px' }}>
            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}>
              <input
                type="radio"
                name="attendingShaadi"
                value="yes"
                checked={attendingShaadi === 'yes'}
                onChange={() => setAttendingShaadi('yes')}
              />
              Joyfully Accept
            </label>
            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}>
              <input
                type="radio"
                name="attendingShaadi"
                value="no"
                checked={attendingShaadi === 'no'}
                onChange={() => setAttendingShaadi('no')}
              />
              Regretfully Decline
            </label>
          </div>

          {attendingShaadi === 'yes' && (
            <div>
              <label htmlFor="shaadiCount" style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                Guests attending Shaadi:
              </label>
              <select
                id="shaadiCount"
                value={shaadiCount}
                onChange={(e) => setShaadiCount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid #CCC',
                  fontSize: '15px',
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
        </div>
      )}

      {/* DUA / MESSAGE */}
      <div style={{ marginBottom: '20px' }}>
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

      {/* SUBMIT BUTTON */}
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
