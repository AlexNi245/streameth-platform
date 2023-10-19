'use client'

import SpeakerPhoto from '../components/SpeakerPhoto'
import ScheduleCard from '@/app/[organization]/[event]/(eventHome)/schedule/components/ScheduleCard'
import { ISession } from '@/server/model/session'
import { ISpeaker } from '@/server/model/speaker'

interface Params {
  speaker: ISpeaker
  sessions: ISession[] | null
}

const SpeakerModal = ({ sessions, speaker }: Params) => {
  if (!sessions) {
    return null
  }

  const speakerSessions = sessions.filter((session) => session.speakers.some((sessionSpeaker) => sessionSpeaker.id === speaker.id))

  return (
    <div className="flex flex-col w-full p-4 justify-center items-center space-y-4">
      <div className="flex justify-center items-center w-48 p-2 border bg-white border-accent rounded shadow">
        <SpeakerPhoto speaker={speaker} size="lg" />
      </div>
      <div className="flex flex-col w-full max-w-xl space-y-4">
        <div className="bg-gray-100 shadow p-4 rounded">
          <p className="text-lg font-bold uppercase mb-4">{speaker.name}</p>
          <p className="text-main-text py-1">{speaker.bio}</p>
        </div>
        <div className="flex flex-col bg-gray-100 shadow p-4 rounded space-y-4">
          <p className="font-bold text-lg">Sessions</p>
          {speakerSessions.map((session, index) => (
            <ScheduleCard key={session.id} session={session} showTime />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpeakerModal