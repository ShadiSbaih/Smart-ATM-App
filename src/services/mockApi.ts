// mockapi.io endpoint
export type Transaction = {
  id: number
  type: string
  amount: number
  currency: string
  date: string
  target_user?: string
}

export type User = {
  id: number
  user_name: string
  first_name: string
  last_name: string
  profile_img?: string
  pin?: string
  balance: number
  birthday?: string
  transactions?: Transaction[]
}

const REMOTE_API = 'https://690afbb71a446bb9cc24b53a.mockapi.io/api/atm/users'

const LOCAL_USERS: User[] = [
  {
    id: 1,
    user_name: 'Sarah',
    first_name: 'Sarah',
    last_name: 'Local',
    profile_img: 'https://i.pravatar.cc/150?u=sarah',
    pin: '1235',
    balance: 500,
    birthday: '2002-02-22',
    transactions: [],
  },
  {
    id: 2,
    user_name: 'sarah-abuzeneh',
    first_name: 'Sarah',
    last_name: 'Abu Zeneh',
    profile_img:
      'https://i.pinimg.com/236x/d1/4a/b5/d14ab57b9ddcfa1240ffabd13f8b609c.jpg',
    pin: 'Sa1234',
    balance: 1600,
    birthday: '2000-10-20',
    transactions: [
      {
        id: 1,
        type: 'Deposit',
        amount: 100,
        currency: 'ILS',
        date: '2025-10-24T10:00:00Z',
      },
      {
        id: 2,
        type: 'Transfer',
        amount: 50,
        currency: 'ILS',
        target_user: 'laith-nazzal',
        date: '2025-10-24T12:15:00Z',
      },
    ],
  },
]

async function fetchRemoteUser(username: string): Promise<User | null> {
  try {
    const res = await fetch(`${REMOTE_API}?user_name=${encodeURIComponent(username)}`)
    if (!res.ok) return null
    const data = await res.json()
   
    const first = Array.isArray(data) ? data[0] ?? null : data
    return first
  } catch {
   
    return null
  }
}

export async function findUserByUsername(username: string) {
  const remote = await fetchRemoteUser(username)
  if (remote) return remote
  return LOCAL_USERS.find((u) => u.user_name === username) ?? null
}

export async function loginWithUsernameAndPin(username: string, pin: string) {
// username === 'Sarah' and pin === '1235'
  const local = LOCAL_USERS.find((u) => u.user_name === username)
  if (!local) throw new Error('User not found')
  if (local.pin !== pin) throw new Error('Invalid credentials')

  return {
    id: local.id,
    user_name: local.user_name,
    first_name: local.first_name,
    last_name: local.last_name,
    profile_img: local.profile_img,
    balance: local.balance,
    birthday: local.birthday,
    transactions: local.transactions,
  }
}
