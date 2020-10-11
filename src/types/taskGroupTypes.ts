import { Errors } from './errorTypes'

export interface TaskGroup {
  id: React.Key
  name: string
  errors? : Errors
}