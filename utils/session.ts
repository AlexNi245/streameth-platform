import { sealData, unsealData } from 'iron-session'
import { NextRequest, NextResponse } from 'next/server'

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET cannot be empty.')
}

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
  throw new Error(
    'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID cannot be empty.'
  )
}

const COOKIE_NAME = process.env.COOKIE_NAME ?? 'streameth.siwe'

const SESSION_OPTIONS = {
  ttl: 60 * 60 * 24 * 30, // 30 days
  password: process.env.SESSION_SECRET!,
}

export const WHITELISTED_ADDRESSES = [
  '0x8289432ACD5EB0214B1C2526A5EDB480Aa06A9ab', // wslyvh.eth
  '0x22C8260b018B8896b25aBa05364E41048B6b08FC', // pablov.eth
  '0x8dE7D6eD323e67923Bed1376d6fA2525F10Bb121', // Xander
  '0xCa2ea165feDC31bCc290153e2b3000979695e018', // filipo
  '0x9268d03EfF4A9A595ef619764AFCB9976c0375df', // Samuel
  '0x98a8F0E12E509aEFfb52eb30a60784593d7927ae', // carlota
]

export type ISession = {
  nonce?: string
  chainId?: number
  address?: string
}

class Session {
  nonce?: string
  chainId?: number
  address?: string

  constructor(session?: ISession) {
    this.nonce = session?.nonce
    this.chainId = session?.chainId
    this.address = session?.address
  }

  static async fromRequest(
    req: NextRequest
  ): Promise<Session | null> {
    const sessionCookie = req.cookies.get(COOKIE_NAME)?.value

    if (!sessionCookie) return null
    return new Session(
      await unsealData<ISession>(sessionCookie, SESSION_OPTIONS)
    )
  }

  clear(res: NextResponse): Promise<void> {
    this.nonce = undefined
    this.chainId = undefined
    this.address = undefined

    return this.persist(res)
  }

  toJSON(): ISession {
    return {
      nonce: this.nonce,
      address: this.address,
      chainId: this.chainId,
    }
  }

  async persist(res: NextResponse): Promise<void> {
    res.cookies.set(
      COOKIE_NAME,
      await sealData(this.toJSON(), SESSION_OPTIONS),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      }
    )
  }
}

export const tap = async <T>(
  value: T,
  cb: (value: T) => Promise<unknown>
): Promise<T> => {
  await cb(value)
  return value
}

export default Session
