import { NextResponse } from 'next/server'
import {
  EventController,
  StageController,
  SessionController,
} from 'streameth-cli'

export async function GET() {
  const controller = new EventController()
  const data = await controller.getAllEvents()

  return NextResponse.json(data)
}
