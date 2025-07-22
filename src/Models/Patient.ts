import { Gender } from '@/Enums/Gender'
import type { IdentifiableData } from './IdentifableData'
import type { Name } from './Name'
import type { ContactPhone } from './ContactPhone'
import type { Language } from './Language'

export class Patient implements IdentifiableData {
  id?: ''
  mrn: string = ''
  gender: Gender = Gender.Unknown
  birthYear = 0
  birthMonth = 0
  birthDay = 0
  name: Name = {
    firstName: '',
    middleName: '',
    lastName: '',
  }
  phoneNumbers: ContactPhone[] = [
    {
      value: '0000000000',
      use: 'home',
    },
  ]
  email?: string = ''
  language?: Language = {
    preferred: 'en',
    alternate: '',
  }
}
