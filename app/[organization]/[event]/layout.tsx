import EventController from '@/server/controller/event'
import StageController from '@/server/controller/stage'
import { notFound } from 'next/navigation'
import SessionController from '@/server/controller/session'
import ColorComponent from '../../utils/ColorComponent'

export async function generateStaticParams() {
  const eventController = new EventController()
  const allEvents = await eventController.getAllEvents({})
  const paths = allEvents.map((event) => ({
    organization: event.organizationId,
    event: event.id,
  }))
  return paths
}

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    organization: string
    event: string
  }
}) => {
  const stageController = new StageController()
  const eventController = new EventController()
  const event = await eventController.getEvent(params.event, params.organization)
  const stages = await stageController.getAllStagesForEvent(params.event)

  if (!event) {
    return notFound()
  }

  return (
    <div className="flex flex-col overflow-hidden h-full">
      <main className={`flex w-full overflow-scroll  ml-auto bg-background`}>
        <ColorComponent event={event} stages={stages}>{children}</ColorComponent>
      </main>
    </div>
  )
}

export default Layout
