import { supabase } from './supabase'
import type { DinnerPreferences, DinnerResponse, InvitationStatus } from '../types'
import { FOOD_MENU } from '../types'

async function insertOrUpdate(
  id: string,
  data: Record<string, unknown>
): Promise<{ error: string | null }> {
  const { error: insertError } = await supabase
    .from('dinner_responses')
    .insert({ id, ...data })

  if (!insertError) return { error: null }

  // If duplicate key (row exists), fall back to update
  if (insertError.code === '23505') {
    const { error: updateError } = await supabase
      .from('dinner_responses')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (updateError) {
      console.error('Error updating response:', updateError)
      return { error: updateError.message }
    }
    return { error: null }
  }

  console.error('Error inserting response:', insertError)
  return { error: insertError.message }
}

export async function createInvitationResponse(
  invitationId: string,
  status: InvitationStatus
): Promise<{ error: string | null }> {
  return insertOrUpdate(invitationId, {
    guest_name: 'Rinky',
    invitation_status: status,
    food_menu: FOOD_MENU,
    submitted_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })
}

export async function submitPreferences(
  prefs: DinnerPreferences
): Promise<{ error: string | null }> {
  return insertOrUpdate(prefs.invitationId, {
    guest_name: prefs.guestName,
    invitation_status: prefs.invitationStatus,
    selected_drink: prefs.selectedDrink,
    selected_ambience: prefs.selectedAmbience,
    selected_music: prefs.selectedMusic,
    arrival_time: prefs.arrivalTime,
    food_menu: FOOD_MENU,
    submitted_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })
}

export async function getAllResponses(): Promise<{ data: DinnerResponse[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from('dinner_responses')
    .select('*')
    .order('submitted_at', { ascending: false })

  if (error) {
    return { data: null, error: error.message }
  }

  return { data: data as DinnerResponse[], error: null }
}

export async function getResponseById(id: string): Promise<{ data: DinnerResponse | null; error: string | null }> {
  const { data, error } = await supabase
    .from('dinner_responses')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return { data: null, error: error.message }
  }

  return { data: data as DinnerResponse, error: null }
}
