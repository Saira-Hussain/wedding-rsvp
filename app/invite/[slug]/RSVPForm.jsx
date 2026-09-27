'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase.js';

export default function RSVPForm({ guest, onSeatsUpdate, onBack }) {
  // Check invitation flags and maximum seats from the database schema
  const isInvitedShaadi = guest?.invited_to_shaadi ?? true;
  const isInvitedValima = guest?.invited_to_valima ?? false;

  const reservedShaadi = guest?.max_guests_shaadi || 4;
  const reservedValima = guest?.max_guests_valima || 4;

  // Form States
  const [attendingShaadi, setAttendingShaadi] = useState(isInvitedShaadi);
  const [shaadiCount, setShaadiCount] = useState(1);

  const [attendingValima, setAttendingValima] = useState(isInvitedValima);
  const [valimaCount, setValimaCount] = useState(1);

  const [duaNote, setDuaNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!guest?.id) {
      alert('Guest information is missing. Please refresh and try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        has_rsvped: true,
        notes: duaNote,
      };

      // Only update Shaadi fields if they were invited to it
      if (isInvitedShaadi) {
        updateData.rsvp_count_shaadi = attendingShaadi ? shaadiCount : 0;
      }

      // Only update Valima fields if they were invited to it
      if (isInvitedValima) {
        updateData.rsvp_count_valima = attendingValima ? valimaCount : 0;
      }

      const { error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', guest.id);

      if (error) throw error;
      
      setSubmitted(true);
      if (onSeatsUpdate) onSeatsUpdate();
    } catch (err) {
      console.error('Error updating RSVP:', err.message);
      alert(`Failed to submit RSVP: ${err.message}`);
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
          
          {/* SHAADI SECTION */}
          {isInvitedShaadi && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid #C2A052', paddingBottom: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: '#610515', fontWeight: '700', margin: 0 }}>
                  Shaadi: We have reserved {reservedShaadi} {reservedShaadi === 1 ? 'seat' : 'seats'} in your honor
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#610515', marginBottom: '8px' }}>
                  Will you be attending the Shaadi? (4 PM)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setAttendingShaadi(true)}
                    style={{
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #C2A052',
                      backgroundColor: attendingShaadi ? '#610515' : '#FAF3E0',
                      color: attendingShaadi ? '#F4E4BC' : '#3B2414',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    Joyfully Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendingShaadi(false)}
                    style={{
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #C2A052',
                      backgroundColor: !attendingShaadi ? '#610515' : '#FAF3E0',
                      color: !attendingShaadi ? '#F4E4BC' : '#3B2414',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {attendingShaadi && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#610515', marginBottom: '6px' }}>
                    Guests attending Shaadi:
                  </label>
                  <select 
                    value={shaadiCount} 
                    onChange={(e) => setShaadiCount(parseInt(e.target.value, 10))} 
                    style={inputStyle}
                  >
                    {Array.from({ length: reservedShaadi }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* VALIMA SECTION */}
          {isInvitedValima && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid #C2A052', paddingBottom: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: '#610515', fontWeight: '700', margin: 0 }}>
                  Valima: We have reserved {reservedValima} {reservedValima === 1 ? 'seat' : 'seats'} in your honor
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#610515', marginBottom: '8px' }}>
                  Will you be attending the Valima?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setAttendingValima(true)}
                    style={{
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #C2A052',
                      backgroundColor: attendingValima ? '#610515' : '#FAF3E0',
                      color: attendingValima ? '#F4E4BC' : '#3B2414',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    Joyfully Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendingValima(false)}
                    style={{
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #C2A052',
                      backgroundColor: !attendingValima ? '#610515' : '#FAF3E0',
                      color: !attendingValima ? '#F4E4BC' : '#3B2414',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {attendingValima && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#610515', marginBottom: '6px' }}>
                    Guests attending Valima:
                  </label>
                  <select 
                    value={valimaCount} 
                    onChange={(e) => setValimaCount(parseInt(e.target.value, 10))} 
                    style={inputStyle}
                  >
                    {Array.from({ length: reservedValima }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              )}
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
