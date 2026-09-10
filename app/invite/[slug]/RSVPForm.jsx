'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function RSVPForm({ guest, onSeatsUpdate, onEdit }) {
  const isNikkahInvited = guest?.invited_to_nikkah ?? false;
  const isShaadiInvited = guest?.invited_to_shaadi ?? true;
  const isValimaInvited = guest?.invited_to_valima ?? false;

  const maxNikkah = guest?.max_guests_nikkah ?? 1;
  const maxShaadi = guest?.max_guests_shaadi ?? 1;
  const maxValima = guest?.max_guests_valima ?? 1;

  // Nikkah state: Defaults to 'yes' for first-time guests, retains saved choice if already RSVPed
  const [attendingNikkah, setAttendingNikkah] = useState(
    guest?.has_rsvped ? ((guest?.rsvp_count_nikkah ?? 0) > 0 ? 'yes' : 'no') : 'yes'
  );
  const [nikkahCount, setNikkahCount] = useState(
    guest?.rsvp_count_nikkah && guest.rsvp_count_nikkah > 0
      ? guest.rsvp_count_nikkah
      : maxNikkah
  );

  // Shaadi state: Defaults to 'yes' for first-time guests, retains saved choice if already RSVPed
  const [attendingShaadi, setAttendingShaadi] = useState(
    guest?.has_rsvped ? ((guest?.rsvp_count_shaadi ?? 0) > 0 ? 'yes' : 'no') : 'yes'
  );
  const [shaadiCount, setShaadiCount] = useState(
    guest?.rsvp_count_shaadi && guest.rsvp_count_shaadi > 0
      ? guest.rsvp_count_shaadi
      : maxShaadi
  );

  // Valima state: Defaults to 'yes' for first-time guests, retains saved choice if already RSVPed
  const [attendingValima, setAttendingValima] = useState(
    guest?.has_rsvped ? ((guest?.rsvp_count_valima ?? 0) > 0 ? 'yes' : 'no') : 'yes'
  );
  const [valimaCount, setValimaCount] = useState(
    guest?.rsvp_count_valima && guest.rsvp_count_valima > 0
      ? guest.rsvp_count_valima
      : maxValima
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

    const finalNikkahCount = isNikkahInvited && attendingNikkah === 'yes' ? parseInt(nikkahCount, 10) : 0;
    const finalShaadiCount = isShaadiInvited && attendingShaadi === 'yes' ? parseInt(shaadiCount, 10) : 0;
    const finalValimaCount = isValimaInvited && attendingValima === 'yes' ? parseInt(valimaCount, 10) : 0;

    try {
      const { error } = await supabase
        .from('guests')
        .update({
          rsvp_count_nikkah: finalNikkahCount,
          rsvp_count_shaadi: finalShaadiCount,
          rsvp_count_valima: finalValimaCount,
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
    const finalNikkahCount = isNikkahInvited && attendingNikkah === 'yes' ? parseInt(nikkahCount, 10) : 0;
    const finalShaadiCount = isShaadiInvited && attendingShaadi === 'yes' ? parseInt(shaadiCount, 10) : 0;
    const finalValimaCount = isValimaInvited && attendingValima === 'yes' ? parseInt(valimaCount, 10) : 0;

    return (
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <h3 style={{ fontSize: '24px', color: '#8C733E', marginBottom: '12px' }}>
          Thank You!
        </h3>
        
        {isNikkahInvited && (
          <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.5', margin: '4px 0' }}>
            <strong>Nikkah:</strong> {finalNikkahCount > 0 ? `${finalNikkahCount} ${finalNikkahCount === 1 ? 'guest' : 'guests'}` : 'Declined'}
          </p>
        )}

        {isShaadiInvited && (
          <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.5', margin: '4px 0' }}>
            <strong>Shaadi:</strong> {finalShaadiCount > 0 ? `${finalShaadiCount} ${finalShaadiCount === 1 ? 'guest' : 'guests'}` : 'Declined'}
          </p>
        )}

        {isValimaInvited && (
          <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.5', margin: '4px 0' }}>
            <strong>Valima:</strong> {finalValimaCount > 0 ? `${finalValimaCount} ${finalValimaCount === 1 ? 'guest' : 'guests'}` : 'Declined'}
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
      {/* 1. NIKKAH SECTION */}
      {isNikkahInvited && (
        <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #D4AF37' }}>
          <p style={{ color: '#5B4332', fontSize: '0.95rem', marginBottom: '8px' }}>
            We have reserved <strong>{maxNikkah}</strong> seats in your honor
          </p>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#610515', fontSize: '1.05rem' }}>
            Will you be attending the Nikkah? (4 PM)
          </label>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '12px' }}>
            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}>
              <input
                type="radio"
                name="attendingNikkah"
                value="yes"
                checked={attendingNikkah === 'yes'}
                onChange={() => setAttendingNikkah('yes')}
              />
              Joyfully Accept
            </label>
            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}>
              <input
                type="radio"
                name="attendingNikkah"
                value="no"
                checked={attendingNikkah === 'no'}
                onChange={() => setAttendingNikkah('no')}
              />
              Regretfully Decline
            </label>
          </div>

          {attendingNikkah === 'yes' && (
            <div>
              <label htmlFor="nikkahCount" style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                Guests attending Nikkah:
              </label>
              <select
                id="nikkahCount"
                value={nikkahCount}
                onChange={(e) => setNikkahCount(e.target.value)}
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
                {Array.from({ length: maxNikkah }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* 2. SHAADI SECTION */}
      {isShaadiInvited && (
        <div style={{ marginBottom: '20px', paddingBottom: isValimaInvited ? '16px' : '0', borderBottom: isValimaInvited ? '1px solid #D4AF37' : 'none' }}>
          <p style={{ color: '#5B4332', fontSize: '0.95rem', marginBottom: '8px' }}>
            We have reserved <strong>{maxShaadi}</strong> seats in your honor
          </p>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#610515', fontSize: '1.05rem' }}>
            Will you be attending the Shaadi? (4 PM)
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
                {Array.from({ length: maxShaadi }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* 3. VALIMA SECTION */}
      {isValimaInvited && (
        <div style={{ marginBottom: '20px' }}>
          <p style={{ color: '#5B4332', fontSize: '0.95rem', marginBottom: '8px' }}>
            We have reserved <strong>{maxValima}</strong> seats in your honor
          </p>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#610515', fontSize: '1.05rem' }}>
            Will you be attending the Valima? (7 PM)
          </label>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '12px' }}>
            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}>
              <input
                type="radio"
                name="attendingValima"
                value="yes"
                checked={attendingValima === 'yes'}
                onChange={() => setAttendingValima('yes')}
              />
              Joyfully Accept
            </label>
            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}>
              <input
                type="radio"
                name="attendingValima"
                value="no"
                checked={attendingValima === 'no'}
                onChange={() => setAttendingValima('no')}
              />
              Regretfully Decline
            </label>
          </div>

          {attendingValima === 'yes' && (
            <div>
              <label htmlFor="valimaCount" style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                Guests attending Valima:
              </label>
              <select
                id="valimaCount"
                value={valimaCount}
                onChange={(e) => setValimaCount(e.target.value)}
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
                {Array.from({ length: maxValima }, (_, i) => i + 1).map((num) => (
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
