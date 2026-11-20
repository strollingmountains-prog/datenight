import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Screen01Invitation from './screens/Screen01Invitation'
import Screen02Mood from './screens/Screen02Mood'
import Screen03Timing from './screens/Screen03Timing'
import Screen04Confirmation from './screens/Screen04Confirmation'
import ScreenDeclined from './screens/ScreenDeclined'
import AdminApp from './admin/AdminApp'
import { createInvitationResponse, submitPreferences } from './lib/api'
import type { DrinkOption, AmbienceOption, MusicOption } from './types'

type Screen = 'invitation' | 'mood' | 'timing' | 'confirmation' | 'declined'

interface AppState {
  invitationId: string
  screen: Screen
  selectedDrink?: DrinkOption
  selectedAmbience?: AmbienceOption
  selectedMusic?: MusicOption
  arrivalTime?: string
}

const STORAGE_KEY = 'dinner_invitation_state'

function getOrCreateInvitationId(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.invitationId) return parsed.invitationId
    }
  } catch {}
  return uuidv4()
}

function MainApp() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Only restore if invitation is accepted and screen is not invitation
        if (parsed.screen && parsed.screen !== 'invitation' && parsed.invitationId) {
          return parsed as AppState
        }
      }
    } catch {}
    return {
      invitationId: getOrCreateInvitationId(),
      screen: 'invitation',
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>()

  // Persist state to localStorage (but not invitation screen state to avoid re-showing)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [state])

  const handleAccept = async () => {
    setIsSubmitting(true)
    const { error } = await createInvitationResponse(state.invitationId, 'accepted')
    setIsSubmitting(false)

    if (error) {
      console.warn('Could not persist acceptance, continuing anyway:', error)
    }

    setState(prev => ({ ...prev, screen: 'mood' }))
  }

  const handleDecline = async () => {
    await createInvitationResponse(state.invitationId, 'declined')
    setState(prev => ({ ...prev, screen: 'declined' }))
  }

  const handleMoodUpdate = (drink: DrinkOption, ambience: AmbienceOption, music: MusicOption) => {
    setState(prev => ({ ...prev, selectedDrink: drink, selectedAmbience: ambience, selectedMusic: music }))
  }

  const handleMoodNext = () => {
    setState(prev => ({ ...prev, screen: 'timing' }))
  }

  const handleConfirm = async (time: string) => {
    if (!state.selectedDrink || !state.selectedAmbience || !state.selectedMusic) return

    setIsSubmitting(true)
    setSubmitError(undefined)

    const { error } = await submitPreferences({
      invitationId: state.invitationId,
      invitationStatus: 'accepted',
      selectedDrink: state.selectedDrink,
      selectedAmbience: state.selectedAmbience,
      selectedMusic: state.selectedMusic,
      arrivalTime: time,
      guestName: 'Rinki',
    })

    setIsSubmitting(false)

    if (error) {
      setSubmitError('Something went wrong saving your preferences. Please try again.')
      return
    }

    setState(prev => ({ ...prev, arrivalTime: time, screen: 'confirmation' }))

    // Clear stored state after successful submission
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }

  if (state.screen === 'invitation') {
    return <Screen01Invitation onAccept={handleAccept} onDecline={handleDecline} />
  }

  if (state.screen === 'mood') {
    return (
      <Screen02Mood
        selectedDrink={state.selectedDrink}
        selectedAmbience={state.selectedAmbience}
        selectedMusic={state.selectedMusic}
        onUpdate={handleMoodUpdate}
        onNext={handleMoodNext}
      />
    )
  }

  if (state.screen === 'timing' && state.selectedDrink && state.selectedAmbience && state.selectedMusic) {
    return (
      <Screen03Timing
        selectedDrink={state.selectedDrink}
        selectedAmbience={state.selectedAmbience}
        selectedMusic={state.selectedMusic}
        arrivalTime={state.arrivalTime}
        onConfirm={handleConfirm}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    )
  }

  if (state.screen === 'confirmation' && state.selectedDrink && state.selectedAmbience && state.selectedMusic && state.arrivalTime) {
    return (
      <Screen04Confirmation
        selectedDrink={state.selectedDrink}
        selectedAmbience={state.selectedAmbience}
        selectedMusic={state.selectedMusic}
        arrivalTime={state.arrivalTime}
      />
    )
  }

  if (state.screen === 'declined') {
    return <ScreenDeclined />
  }

  // Fallback
  return <Screen01Invitation onAccept={handleAccept} onDecline={handleDecline} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  )
}
