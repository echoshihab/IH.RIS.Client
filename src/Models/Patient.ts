import type { Gender } from '@/Enums/Gender'
import type { IdentifiableData } from './IdentifableData'
import type { Name } from './Name'
import type { ContactPhone } from './ContactPhone'
import type { Language } from './Language'

export interface Patient extends IdentifiableData {
  mrn: string
  gender: Gender
  birthYear: number
  birthMonth: number
  birthDay: number
  name: Name
  phoneNumbers: ContactPhone[]
  email?: string
  language?: Language
}
