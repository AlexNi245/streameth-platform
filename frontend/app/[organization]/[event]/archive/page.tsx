import FilterBar from './components/FilterBar'
import FilteredItems from './components/FilteredItems'
import { FilterContextProvider } from './components/FilterContext'
import type { Metadata, ResolvingMetadata } from 'next'
import {
  EventController,
  StageController,
  SessionController,
  SpeakerController
} from 'streameth-cli'
interface Params {
  params: {
    event: string
    organization: string
  }
}

export default async function ArchivePage({ params }: Params) {
  const sessionController = new SessionController()
  const sessions = (
    await sessionController.getAllSessions({ eventId: params.event })
  ).map((session) => {
    return session.toJson()
  })

  const videoSessions = sessions.filter((session) => {
    return session.videoUrl != undefined
  })

  if (videoSessions === undefined || videoSessions.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-full lg:overflow-hidden">
        <span className="text-2xl font-bold text-center">
          No videos are uploaded yet
        </span>
      </div>
    )
  }

  const speakerController = new SpeakerController()
  const speakers = (
    await speakerController.getAllSpeakersForEvent(params.event)
  ).map((speaker) => {
    return speaker.toJson()
  })

  const stageController = new StageController()
  const stages = (
    await stageController.getAllStagesForEvent(params.event)
  ).map((stage) => {
    return stage.toJson()
  })

  return (
    <div className="flex flex-col-reverse justify-end lg:flex-row w-full lg:h-full lg:overflow-hidden">
      <FilterContextProvider items={videoSessions}>
        <FilteredItems />
        <div className="w-full lg:max-w-[20rem] sticky top-0 lg:pt-4 lg:pr-4">
          <FilterBar
            sessions={videoSessions}
            speakers={speakers}
            stages={stages}
          />
        </div>
      </FilterContextProvider>
    </div>
  )
}

export async function generateMetadata(
  { params }: Params,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const eventController = new EventController()
  const event = await eventController.getEvent(
    params.event,
    params.organization
  )
  const imageUrl = event.eventCover
    ? event.eventCover
    : event.id + '.png'

  return {
    title: `${event.name} - Archive`,
    description: `Watch all the Streameth videos from ${event.name} here`,
    openGraph: {
      images: [imageUrl],
    },
  }
}