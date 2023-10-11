import EventController from '@/server/controller/event'
import CreateEditEvent from './components/CreateEditEvent'

interface Params {
  event: string
  organization: string
}

const EventPage = async ({ params }: { params: Params }) => {
  const eventController = new EventController()
  const event = await eventController.getEvent(params.event, params.organization)

  return (
    <div className="px-4 pb-8">
      <CreateEditEvent event={event.toJson()} />
    </div>
  )
}

export default EventPage