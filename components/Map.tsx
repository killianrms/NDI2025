'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Project } from '@/lib/types'

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapProps {
  projects: Project[]
  onProjectClick: (project: Project) => void
}

export default function Map({ projects, onProjectClick }: MapProps) {
  return (
    <MapContainer
      center={[43.6319, 3.8620]}
      zoom={13}
      style={{ height: '500px', width: '100%', borderRadius: '1rem' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {projects.map((project) => (
        <Marker
          key={project.id}
          position={[project.location.lat, project.location.lng]}
          eventHandlers={{
            click: () => onProjectClick(project),
          }}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold text-base mb-1">{project.name}</h3>
              <p className="text-gray-600">{project.description.substring(0, 100)}...</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
