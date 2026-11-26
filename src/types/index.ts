export type InvitationStatus = 'accepted' | 'declined' | 'pending'

export type DrinkOption = 'Beer' | 'Vodka' | 'Gin' | 'Rum' | 'Cocktails'

export type AmbienceOption = 'Candlelight' | 'Warm Dim Lights'

export type MusicOption =
  | 'Bollywood & Indian Favourites'
  | 'Indie & Acoustic'
  | 'R&B & Soul'
  | 'Jazz & Lounge'
  | 'Chill Electronic / Deep House'
  | 'Surprise Me With an Eclectic Mix'

export interface DinnerPreferences {
  invitationId: string
  invitationStatus: InvitationStatus
  selectedDrink?: DrinkOption
  selectedAmbience?: AmbienceOption
  selectedMusic?: MusicOption
  arrivalTime?: string
  guestName: string
  selectedFood?: string[]
  specialRequest?: string
}

export interface DinnerResponse {
  id: string
  guest_name: string
  invitation_status: InvitationStatus
  selected_drink?: string
  selected_ambience?: string
  selected_music?: string
  arrival_time?: string
  food_menu: string[]
  special_request?: string
  submitted_at: string
  updated_at: string
}

export const FOOD_MENU_OPTIONS = ['Chicken Curry', 'Chicken Kadhai', 'Prawns Butter Garlic', 'Fish Fry']

export const DRINK_OPTIONS: DrinkOption[] = ['Beer', 'Vodka', 'Gin', 'Rum', 'Cocktails']

export const AMBIENCE_OPTIONS: AmbienceOption[] = ['Candlelight', 'Warm Dim Lights']

export const MUSIC_OPTIONS: MusicOption[] = [
  'Bollywood & Indian Favourites',
  'Indie & Acoustic',
  'R&B & Soul',
  'Jazz & Lounge',
  'Chill Electronic / Deep House',
  'Surprise Me With an Eclectic Mix',
]

export const ARRIVAL_TIMES = [
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM',
  '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM',
]

export const MUSIC_EMOJIS: Record<MusicOption, string> = {
  'Bollywood & Indian Favourites': '🇮🇳',
  'Indie & Acoustic': '🎸',
  'R&B & Soul': '🎷',
  'Jazz & Lounge': '🍸',
  'Chill Electronic / Deep House': '🎧',
  'Surprise Me With an Eclectic Mix': '✨',
}
