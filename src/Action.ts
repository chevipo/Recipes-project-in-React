import { User } from "./User"

export type Action = {
    type: 'CREATE' | 'UPDATE' | 'DELETE',
    data: Partial<User>
}