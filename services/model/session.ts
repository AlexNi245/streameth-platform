import { IsNotEmpty, validate } from "class-validator";
import { IStage } from "./stage";
import { ISpeaker } from "./speaker";
import { generateId, BASE_PATH } from "../utils";
import { IEvent } from "./event";
import { IOrganization } from "./organization";
import path from "path";
export interface ISession {
  id: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  stageId: IStage["id"];
  speakers: ISpeaker[];
  videoUrl?: string;
  eventId: IEvent["id"];
  organizationId: IOrganization["id"];
}

export default class Session implements ISession {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  // @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  start: Date;

  @IsNotEmpty()
  end: Date;

  @IsNotEmpty()
  stageId: IStage["id"];

  @IsNotEmpty()
  speakers: ISpeaker[];

  videoUrl?: string;

  @IsNotEmpty()
  eventId: IEvent["id"];

  @IsNotEmpty()
  organizationId: IOrganization["id"];

  constructor({
    name,
    description,
    start,
    end,
    stageId,
    speakers,
    videoUrl,
    eventId,
    organizationId,
  }: Omit<ISession, "id"> & { id?: string }) {
    this.id = generateId(name);
    this.name = name;
    this.description = description;
    this.start = start;
    this.end = end;
    this.stageId = stageId;
    this.speakers = speakers;
    this.videoUrl = videoUrl;
    this.eventId = eventId;
    this.organizationId = organizationId;
    this.validateThis();
  }

  async validateThis() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new Error(`Validation failed! ${errors}`);
    }
  }

  toJson(): string {
    return JSON.stringify(this);
  }

  static async fromJson(jsonData: string | Promise<Session>) {
    const data = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;
    const session = new Session({
      ...data,
    });
    await session.validateThis();
    return session;
  }

  static async getSessionPath(
    organizationId: ISession["organizationId"],
    eventId: ISession["eventId"],
    sessionId?: ISession["id"]
  ): Promise<string> {
    if (sessionId) {
      return path.join(
        BASE_PATH,
        organizationId,
        "events",
        eventId,
        "sessions",
        sessionId
      );
    }
    return path.join(BASE_PATH, organizationId, "events", eventId, "sessions");
  }
}
