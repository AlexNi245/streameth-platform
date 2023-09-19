import { NextResponse } from 'next/server'
import { EventController } from 'streameth-cli'

export async function GET() {
  const controller = new EventController()
  const data = await controller.getAllEvents()

  return NextResponse.json(data)
}
