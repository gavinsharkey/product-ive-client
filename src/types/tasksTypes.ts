import { TaskGroup } from './taskGroupTypes'
import { User } from './userTypes';

export interface Task {
  id: number
  taskable_type: 'TaskGroup' | 'User'
  name: string
  completed: boolean
  taskable: TaskGroup & User
}