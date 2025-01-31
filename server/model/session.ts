import { IsNotEmpty, validate } from 'class-validator'
import { IStage } from './stage'
import Speaker from './speaker'
import { generateId, BASE_PATH, PUBLIC_PATH } from '../utils'
import { IEvent } from './event'
import path from 'path'

export interface ISource {
  streamUrl: string
  start: number
  end: number
}

export interface IPlayback {
  livepeerId: string
  videoUrl: string
  ipfsHash: string
  format: string
  duration: number
}

export interface ISession {
  id: string
  name: string
  description: string
  start: number
  end: number
  stageId: IStage['id']
  speakers: Speaker[]
  source?: ISource
  playback?: IPlayback
  videoUrl?: string
  playbackId?: string
  eventId: IEvent['id']
  track?: string[]
  coverImage?: string
}

export default class Session implements ISession {
  @IsNotEmpty()
  id: string

  @IsNotEmpty()
  name: string

  // @IsNotEmpty()
  description: string

  // @IsNotEmpty()
  start: number

  //@IsNotEmpty()
  end: number

  @IsNotEmpty()
  stageId: IStage['id']

  @IsNotEmpty()
  speakers: Speaker[]

  source?: ISource

  videoUrl?: string

  playbackId?: string

  @IsNotEmpty()
  eventId: IEvent['id']

  track?: string[]

  coverImage?: string

  constructor({
    name,
    description,
    start,
    end,
    stageId,
    speakers,
    source,
    videoUrl,
    eventId,
    track,
    coverImage,
  }: Omit<ISession, 'id'> & { id?: string }) {
    this.id = generateId(name)
    this.name = name
    this.description = description
    this.start = start
    this.end = end
    this.stageId = stageId
    this.speakers = speakers
    this.source = source
    this.videoUrl = videoUrl
    this.playbackId = this.getPlaybackId()
    this.eventId = eventId
    this.track = track
    this.coverImage =
      coverImage ??
      '/sessions/' + this.eventId + '/' + this.id + '.jpg'
    this.validateThis()
  }

  async validateThis() {
    const errors = await validate(this)
    if (errors.length > 0) {
      throw new Error(`Validation failed! ${errors}`)
    }
  }

  getDate(): {
    start: Date
    end: Date
  } {
    return {
      start: new Date(this.start),
      end: new Date(this.end),
    }
  }

  toJson(): ISession {
    return { ...this }
  }

  getPlaybackId(): string {
    if (this.playbackId) {
      return this.playbackId
    } else if (this.videoUrl) {
      // https://lp-playback.com/hls/73e7hmd7ch7k8bnw/index.m3u8
      return this.videoUrl.split('/')?.[4]
    }
    return ''
  }

  static getSessionDate(date: Date): string {
    return new Date(date).toISOString()
  }

  static getSessionTime(date: Date): string {
    return date.toLocaleTimeString()
  }

  static async fromJson(jsonData: string | Promise<Session>) {
    const data =
      typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData
    const session = new Session({
      ...data,
    })
    await session.validateThis()
    return session
  }

  static async getSessionPath(
    eventId: ISession['eventId'],
    sessionId?: ISession['id']
  ): Promise<string> {
    if (sessionId) {
      return path.join(
        BASE_PATH,
        'sessions',
        eventId,
        `${sessionId}.json`
      )
    }
    return path.join(BASE_PATH, 'sessions', eventId)
  }

  static async getSessionImagePath(
    eventId: ISession['eventId'],
    sessionId: ISession['id']
  ): Promise<string> {
    return path.join(
      PUBLIC_PATH,
      'sessions',
      eventId,
      `${sessionId}.jpg`
    )
  }

  static async getSessionImageDirectory(
    eventId: ISession['eventId']
  ) {
    return path.join(PUBLIC_PATH, 'sessions', eventId)
  }
}
