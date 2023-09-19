import { IEvent } from "streameth-cli"

export const hasData = ({ event }: { event: IEvent }) => {
  return event.dataImporter !== undefined
}