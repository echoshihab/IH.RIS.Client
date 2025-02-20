import type { Patient } from '@/Models/Patient'
import { HttpService } from './httpService'

export class PatientService extends HttpService<Patient> {
  resourcePath = 'patient'
}
