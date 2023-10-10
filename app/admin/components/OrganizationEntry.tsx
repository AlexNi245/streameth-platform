'use client'

import React, { useContext } from 'react'
import { IOrganization } from '@/server/model/organization'
import EditOrganizationButton from './EditOrganizationButton'
import Link from 'next/link'
import { ModalContext } from '@/components/context/ModalContext'

interface OrganizationEntryProps {
  organization: IOrganization
}

const OrganizationEntry: React.FC<OrganizationEntryProps> = ({ organization }) => {
  const handleDelete = (organization: IOrganization) => {
    fetch(`/api/organizations?organization=${organization.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete organization and / or event(s)')
        }
      })
      .catch((err) => {
        console.error('An error occurred', err)
      })
      .finally(() => {
        closeModal()
      })
  }

  const { openModal, closeModal } = useContext(ModalContext)

  const handleModalOpen = (organization: IOrganization) => {
    openModal(
      <div className="flex flex-col items-center">
        <div className="font-bold text-center mb-2">
          <span>{`Are you sure you want to delete the event "${organization.name}" and its events?`}</span>
        </div>
        <div>
          <button onClick={() => handleDelete(organization)} className="bg-blue-500 hover:bg-blue-800 transition-colors text-white p-2 rounded m-2">
            Yes
          </button>
          <button onClick={() => closeModal()} className="bg-gray-200 hover:bg-gray-500 transition-colors p-2 rounded m-2">
            No
          </button>
        </div>
      </div>
    )
  }

  return (
    <li className="border p-2 rounded flex justify-between items-center">
      <Link href={`admin/${organization.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
        <img src={organization.logo} alt={organization.name} className="w-16 h-16 rounded" />
        <div>
          <h2 className="text-xl font-bold">{organization.name}</h2>
          <p>{organization.description}</p>
          <p className="text-sm text-gray-500">{organization.location}</p>
        </div>
      </Link>
      <div className="ml-auto  flex flex-row ">
        <EditOrganizationButton organization={organization} />
        <button className="bg-red-500 text-white p-2 rounded ml-2" onClick={() => handleModalOpen(organization)}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default OrganizationEntry
