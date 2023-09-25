import { AuthenticateServiceAccount } from './google'
import { CONFIG } from 'utils/config'
import fs, { createReadStream } from 'fs'

export const PRESENTATION_SCOPES = ['https://www.googleapis.com/auth/presentations']
export const DRIVE_SCOPES = ['https://www.googleapis.com/auth/drive']

export async function CreateFolders(folders: string[], parentId?: string) {
  console.log('Create folders', folders, parentId)

  // MAKE SURE NOT TO COMMIT THE SECRET FILES
  const google = await AuthenticateServiceAccount(DRIVE_SCOPES)
  const client = google.drive('v3')

  for (const folder of folders) {
    const exists = await client.files.list({
      q: `name='${folder}' and trashed=false and mimeType='application/vnd.google-apps.folder' and ${parentId ? `'${parentId}' in parents` : ''}`,
      corpora: 'drive',
      spaces: 'drive',
      driveId: '0AMKHrdGKMYAeUk9PVA',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    })

    if (exists.data.files && exists.data.files.length > 0) {
      console.log('Folder already exists', folder)
      continue
    }

    const file = await client.files.create({
      supportsAllDrives: true,
      requestBody: {
        name: folder,
        mimeType: 'application/vnd.google-apps.folder',
        parents: parentId ? [parentId] : [],
      },
    })

    console.log('Folder created', file.data.id)
  }
}

export async function CreateSlide(title: string, parentId?: string) {
  console.log('CreateSlide', title)

  // MAKE SURE NOT TO COMMIT THE SECRET FILES
  const client = await AuthenticateServiceAccount([...PRESENTATION_SCOPES, ...DRIVE_SCOPES])

  const presentation = await client.slides('v1').presentations.create({
    requestBody: {
      title: title,
    },
  })

  if (presentation.data.presentationId) {
    console.log('Presentation created', `https://docs.google.com/presentation/d/${presentation.data.presentationId}`)

    console.log('Move file')
    const copy = await client.drive('v3').files.copy({
      fileId: presentation.data.presentationId,
      supportsAllDrives: true,
      requestBody: {
        name: `Copy of ${title}`,
        parents: parentId ? [parentId] : [],
      },
    })
    console.log('Presentation copied', `https://docs.google.com/presentation/d/${copy.data.id}`)

    return presentation.data.presentationId
  }
}

export async function DownloadSlides(id: string) {
  const res = await fetch(`https://docs.google.com/presentation/d/${id}/export/pdf?opts=shs%3D0`)
  const arr = await res.arrayBuffer()
  const buffer = Buffer.from(arr)

  if (buffer.length > 3125) {
    fs.writeFileSync(`${CONFIG.ASSET_FOLDER}/slides/${id}.pdf`, buffer)
  } else {
    console.log('Invalid slides', id)
  }
}

export async function UploadDrive(session: any, path: string, parentId?: string) {
  try {
    console.log('Upload session to Drive', session.id, path)
    const google = await AuthenticateServiceAccount(DRIVE_SCOPES)
    const client = google.drive('v3')

    const upload = await client.files.create({
      supportsAllDrives: true,
      requestBody: {
        name: session.id,
        parents: parentId ? [parentId] : [],
      },
      media: {
        mimeType: 'video/mp4',
        body: createReadStream(path),
      },
    })

    console.log('Upload completed', upload.data.id)
    return upload.data
  } catch (ex) {
    console.log('Unable to upload to Google Drive', session)
    console.error(ex)
  }
}

export function getSlidesId(url: string): string {
  let id = url
  id = id.replace('https://docs.google.com/presentation/d/', '')
  id = id.replace('/edit?usp=sharing', '')
  id = id.replace('/edit#slide=id.p', '')
  id = id.replace('/edit#slide=id.g13737362dea_0_1', '')
  id = id.replace('/edit?usp=drive_web&ouid=114193972392563644912', '')
  id = id.replace('/edit#slide=id.g14286fcf6b3_0_92', '')
  id = id.replace('/edit#slide=id.p1', '')
  id = id.replace('/edit#slide=id.g1433c566fdb_1_78', '')
  id = id.replace('/edit#slide=id.p1', '')
  id = id.replace('/edit#slide=id.p1', '')
  id = id.replace('/edit', '')

  return id
}
