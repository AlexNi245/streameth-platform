import { NextResponse } from 'next/server'
import { SpeakerController } from 'streameth-cli'
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string; eventId: string }
  }
) {
  const speakerController = new SpeakerController()
  try {
    const data = await speakerController.getAllSpeakersForEvent(
      params.eventId
    )
    return NextResponse.json(data)
  } catch (e) {
    console.log(e)
    return NextResponse.json({})
  }
}
