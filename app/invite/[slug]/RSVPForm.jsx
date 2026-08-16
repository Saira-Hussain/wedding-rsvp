const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    const isAttending = attending === 'yes';

    // Map form fields to your exact Supabase column names
    const { error } = await supabase
      .from('guests')
      .update({
        attending_count: isAttending ? parseInt(attendingCount, 10) : 0,
        has_rsvped: true,
        notes: dietaryNotes,
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
