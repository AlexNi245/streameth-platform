import CreateEditEvent from '../components/CreateEditEvent'
import { EventFormProvider } from '../components/EventFormContext'
interface Params {
  event: string
  organization: string
}

const CreateEvent = async ({ params }: { params: Params }) => {
  return (
    <EventFormProvider organizationId={params.organization}>
      <CreateEditEvent />
    </EventFormProvider>
  )
}

export default CreateEvent
