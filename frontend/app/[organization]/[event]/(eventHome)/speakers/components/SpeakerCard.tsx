import { ISpeaker } from '@/server/model/speaker'
import SpeakerPhoto from './SpeakerPhoto'
import Link from 'next/link'

const SpeakerCard = ({ speaker }: { speaker: ISpeaker }) => {
  return (
    <Link
      href={`speakers/${speaker.id}`}
      className="m-2 flex flex-col items-center 
    text-sm bg-white shadow rounded w-40 lg:w-48">
      <SpeakerPhoto speaker={speaker} size="lg" />
      <span
        className="lg:text-lg h-16 lg:h-24 text-main-text uppercase p-2 flex 
      justify-center items-center w-full ">
        {speaker.name}
      </span>
    </Link>
  )
}

export default SpeakerCard