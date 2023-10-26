'use client'

import React, { Dispatch, SetStateAction, useContext } from 'react'
import { FormTextArea } from '@/app/utils/FormTextArea'
import { FormTextInput } from '@/app/utils/FormTextInput'
import { IEvent } from '@/server/model/event'
import ImageFileUploader from './ImageFileUploader'
import { apiUrl } from '@/server/utils'
import { Button } from '@/app/utils/Button'
import EventPreview from './EventPreview'
import { ModalContext } from '@/components/context/ModalContext'
import { FormSelect } from '@/app/utils/FormSelect'
import { TIMEZONES } from '@/app/constants/timezones'

interface Props {
  formData: Omit<IEvent, 'id'>
  setFormData: Dispatch<SetStateAction<Omit<IEvent, 'id'>>>
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  organizationId: string
  onFileUpload: (e: string, key: string) => void
  handleSubmit: () => void
}
const CreateEditEventStepOne = ({ handleChange, handleSubmit, formData, setFormData, onFileUpload, organizationId }: Props) => {
  const { openModal, closeModal } = useContext(ModalContext)
  const onImageSubmit = async (file: Blob, key: string, setLoading: React.Dispatch<SetStateAction<boolean>>) => {
    try {
      const data = new FormData()
      data.set('file', file)
      const res = await fetch(`${apiUrl()}/organizations/${organizationId}/events/upload`, {
        method: 'POST',
        body: data,
      })
      if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
      console.error(e)
    } finally {
      onFileUpload(file.name, key)
      setLoading(false)
    }
  }

  return (
    <div>
      <p className="font-ubuntu text-lg pt-3 text-grey">
        Welcome to the first step in creating your event on StreamETH! Here, you{`'`}ll provide essential details like your event{`'`}s title,
        description, location, and dates. Additionally, you can upload your event{`'`}s digital assets, setting the foundation for a visually engaging
        event page that will captivate your audience.
      </p>
      <div className="mt-5 mb-10 gap-5 xl:gap-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <ImageFileUploader
          label="Event's Logo"
          image={formData?.logo}
          className="w-[180px] h-[180px]"
          isCircleImage
          imageKey="logo"
          onImageSubmit={onImageSubmit}
          toolTipHTML="Image size must have an aspect ratio of 1/1 or the dimensions of 200 x 200 pixels"
          aspectRatio={1 / 1}
        />
        <ImageFileUploader
          label="Event's Cover Image"
          image={formData?.eventCover}
          imageKey="eventCover"
          className="w-[258px] h-[180px]"
          iconClassName="left-[45%]"
          onImageSubmit={onImageSubmit}
          aspectRatio={4 / 3}
          toolTipHTML="Image size must have an aspect ratio of 4/3 or the dimensions of 1440 x 1080 pixels"
        />
        <ImageFileUploader
          label="Event's Banner Image"
          image={formData?.banner}
          imageKey="banner"
          className="w-[380px] h-[180px]"
          iconClassName="left-[47%]"
          onImageSubmit={onImageSubmit}
          toolTipHTML="Image size must have an aspect ratio of 16:9 or the dimensions of 1920 x 1080 pixels."
          aspectRatio={16 / 9}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FormTextInput
          label="Event's Name"
          name="name"
          placeholder="E.g. Ethereum Stream"
          required
          toolTip
          toolTipHTML="Enter Event Name"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <FormTextArea
          label="Description (markdown)"
          name="description"
          placeholder="E.g. Ethereum Streaming: Unveil blockchain's potential. Dive into Ethereum's world with experts, trends, and innovations. Join the revolution. Don't miss out!"
          required
          toolTip
          toolTipHTML="This form box supports Markdown"
          value={formData.description}
          onChange={handleChange}
          renderSecondaryLabel={
            <Button size="xs" onClick={() => openModal(<EventPreview closeModal={closeModal} handleSubmit={handleSubmit} formData={formData} />)}>
              Preview
            </Button>
          }
        />
        <FormTextInput
          label="Location"
          name="location"
          placeholder="E.g. Madrid, Spain"
          required
          toolTip
          value={formData.location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <FormTextInput
          label="Select your event start date"
          placeholder="E.g. 12-16 November 2023"
          required
          toolTip
          type="date"
          name="start"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          value={formData.start instanceof Date ? formData.start.toISOString().split('T')[0] : formData.start}
        />
        <FormTextInput
          label="Select your event end date"
          placeholder="E.g. 12-16 November 2023"
          required
          toolTip
          type="date"
          name="end"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          value={formData.end instanceof Date ? formData.end.toISOString().split('T')[0] : formData.end}
        />
        <FormSelect
          label="Timezone"
          required
          toolTip
          placeholder="Timezone"
          value={formData.timezone}
          options={TIMEZONES}
          titleKey="text"
          valueKey="value"
          optionsHeight={300}
          onChange={(timezone) => setFormData({ ...formData, timezone: timezone?.text })}
        />
      </div>
    </div>
  )
}

export default CreateEditEventStepOne