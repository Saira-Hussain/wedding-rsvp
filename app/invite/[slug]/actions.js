'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function submitRSVP(formData) {
  const slug = formData.get('slug');
  const attendingCount = parseInt(formData.get('attending_count'), 10);
  const notes = formData.get('notes') || '';

  const { error } = await supabase
    .from('guests')
    .update({
      attending_count: attendingCount,
      notes: notes,
      has_rsvped: true,
      updated_at: new Date().toISOString(),
    })
    .eq('slug', slug);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath(`/invite/${slug}`);
  return { success: true };
}