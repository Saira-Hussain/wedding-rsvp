'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase.js';

export default function RSVPForm({ guest, onSeatsUpdate, onBack }) {
  // Check invitation flags and maximum seats from the database schema
  const isInvitedShaadi = guest?.invited_to_shaadi ?? true;
  const isInvitedValima = guest?.invited_to_valima ?? false;

  const reservedShaadi = guest?.max_guests_shaadi || 4;
  const reservedValima = guest?.max_guests_valima || 4;

  // Determine if they already have an existing RSVP in the database
  const alreadyRsvpd = guest?.has_rsvped ?? false;

  // Track whether they are currently editing their response
  const [isEditing, setIsEditing] = useState(false);

  // Form States (pre-fill with existing database data if they already RSVP'd)
  const [attendingShaadi, setAttendingShaadi] = useState(
    alreadyRsvpd ? (guest?.rsvp_count_shaadi > 0) : isInvitedShaadi
  );
  const [shaadiCount, setShaadiCount] = useState(guest?.rsvp_count_shaadi || 1);

  const [attendingValima, setAttendingValima] = useState(
    alreadyRsvpd ? (guest?.rsvp_count_valima > 0) : isInvitedValima
  );
  const [valimaCount, setValimaCount] = useState(guest?.rsvp_count_valima || 1);

  const [duaNote, setDuaNote] = useState(guest?.notes || '');
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

      if (isInvitedShaadi) {
        updateData.rsvp_count_shaadi = attendingShaadi ? shaadiCount : 0;
      }

      if (isInvitedValima) {
        updateData.rsvp_count_valima = attendingValima ? valimaCount : 0;
      }

      const { error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', guest.id);

      if (error) throw error;
      
      setSubmitted(true);
      setIsEditing(false);
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

      {/* Show completion message if submitted in this session or already RSVP'd and not editing */}
      {(submitted || (alreadyRsvpd && !isEditing)) ? (
        <div style={{ color: '#610515', padding: '20px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ margin: '0 0 10px 0' }}>JazakAllah Khair!</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              Your RSVP response has already been completed. We have received your details and duas.
            </p>
          </div>

          <div style={{ backgroundColor: '#FAF3E0', border: '1px solid #C2A052', padding: '12px', borderRadius: '6px', textAlign: 'left', fontSize: '0.85rem' }}>
            <p style={{ margin: '0 0 6px 0', fontWeight: '700' }}>Your Response Summary:</p>
            {isInvitedShaadi && (
              <p style={{ margin: '0 0 4px 0' }}>
                • Shaadi: {guest?.rsvp_count_shaadi > 0 ? `${guest.rsvp_count_shaadi} Attending` : 'Declined'}
              </p>
            )}
            {isInvitedValima && (
              <p style={{ margin: '0 0 4px 0' }}>
                • Valima: {guest?.rsvp_count_valima > 0 ? `${guest.rsvp_count_valima} Attending` : 'Declined'}
              </p>
            )}
            {guest?.notes && (
              <p style={{ margin: '4px 0 0 0', fontStyle: 'italic' }}>
                &quot;{guest.notes}&quot;
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            style={{
              background: 'none',
              border: '1px solid #610515',
              color: '#610515',
              padding: '10px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Edit Your Response
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {isEditing && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #C2A052', paddingBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#610515' }}>Editing RSVP</span>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                style={{ background: 'none', border: 'none', color: '#610515', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Cancel
              </button>
            </div>
          )}

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
                      backgroundColor: attendingShaadi === true ? '#610515' : '#FAF3E0',
                      color: attendingShaadi === true ? '#F4E4BC' : '#3B2414',
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
                      backgroundColor: attendingShaadi === false ? '#610515' : '#FAF3E0',
                      color: attendingShaadi === false ? '#F4E4BC' : '#3B2414',
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
                      backgroundColor: attendingValima === true ? '#610515' : '#FAF3E0',
                      color: attendingValima === true ? '#F4E4BC' : '#3B2414',
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
                      backgroundColor: attendingValima === false ? '#610515' : '#FAF3E0',
                      color: attendingValima === false ? '#F4E4BC' : '#3B2414',
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
            {isSubmitting ? 'Submitting...' : 'Update RSVP'}
          </button>
        </form>
      )}
    </div>
  );
}
