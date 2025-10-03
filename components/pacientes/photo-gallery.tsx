"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Camera, ImageIcon, Download, Trash2, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Photo {
  id: string
  url: string
  title: string
  description: string
  date: string
  category: "Antes" | "Durante" | "Después" | "Progreso" | "Actividad"
}

const initialPhotos: Photo[] = [
  {
    id: "p1",
    url: "/child-therapy-session.jpg",
    title: "Sesión de Articulación",
    description: "Trabajo con espejo para mejorar la producción del fonema /r/",
    date: "2024-04-15",
    category: "Durante",
  },
  {
    id: "p2",
    url: "/speech-therapy-progress.jpg",
    title: "Progreso en Fluidez",
    description: "Comparación del progreso en lectura fluida",
    date: "2024-04-10",
    category: "Progreso",
  },
  {
    id: "p3",
    url: "/therapy-materials.jpg",
    title: "Materiales de Terapia",
    description: "Tarjetas y materiales utilizados en la sesión",
    date: "2024-04-08",
    category: "Actividad",
  },
]

const categories = ["Antes", "Durante", "Después", "Progreso", "Actividad"] as const

const categoryColors = {
  Antes: "bg-blue-100 text-blue-800",
  Durante: "bg-green-100 text-green-800",
  Después: "bg-purple-100 text-purple-800",
  Progreso: "bg-orange-100 text-orange-800",
  Actividad: "bg-gray-100 text-gray-800",
}

export function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos)
  const [isUploading, setIsUploading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [newPhotoData, setNewPhotoData] = useState({
    title: "",
    description: "",
    category: "Durante" as Photo["category"],
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const { toast } = useToast()

  const handleFile = (file: File) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Archivo no válido",
          description: "Por favor, suba solo archivos de imagen.",
          variant: "destructive",
        })
        return
      }
      setPhotoFile(file)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!photoFile) return

    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newPhoto: Photo = {
          id: `p${photos.length + 1}`,
          url: e.target?.result as string,
          title: newPhotoData.title,
          description: newPhotoData.description,
          category: newPhotoData.category,
          date: format(new Date(), "yyyy-MM-dd"),
        }

        setPhotos((prev) => [newPhoto, ...prev])
        setIsUploading(false)
        setIsDialogOpen(false)
        setNewPhotoData({ title: "", description: "", category: "Durante" })
        setPhotoFile(null)

        toast({
          title: "Foto Guardada",
          description: "La nueva foto ha sido añadida a la galería del paciente.",
        })
      }
      reader.readAsDataURL(photoFile)
    }, 1500)
  }

  const handleDeletePhoto = (photoId: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== photoId))
    toast({
      title: "Foto Eliminada",
      description: "La foto ha sido eliminada de la galería.",
    })
  }

  const handleDownloadPhoto = (photo: Photo) => {
    // In a real app, this would download the actual file
    toast({
      title: "Descarga Iniciada",
      description: `Descargando ${photo.title}...`,
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Galería de Fotos Terapéuticas
          </CardTitle>
          <CardDescription>Registro visual del progreso y actividades del paciente.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Añadir Foto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Subir Nueva Foto</DialogTitle>
              <DialogDescription>Añada una foto del progreso o actividad terapéutica.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="photo-file">Foto</Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="photo-file"
                      className={cn(
                        "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/30 transition-colors",
                        isDragging ? "bg-muted border-primary" : "hover:bg-muted",
                      )}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {photoFile ? photoFile.name : "Click o arrastre para subir foto"}
                        </p>
                      </div>
                      <Input
                        id="photo-file"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Sesión de articulación"
                    required
                    value={newPhotoData.title}
                    onChange={(e) => setNewPhotoData((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <select
                    id="category"
                    className="w-full p-2 border rounded-md"
                    value={newPhotoData.category}
                    onChange={(e) =>
                      setNewPhotoData((prev) => ({ ...prev, category: e.target.value as Photo["category"] }))
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Descripción de la foto y contexto terapéutico..."
                    required
                    value={newPhotoData.description}
                    onChange={(e) => setNewPhotoData((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                  Guardar Foto
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        {photos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative bg-card border rounded-lg overflow-hidden">
                <div className="aspect-video relative">
                  <Image src={photo.url || "/placeholder.svg"} alt={photo.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <Button size="sm" variant="secondary" onClick={() => setSelectedPhoto(photo)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => handleDownloadPhoto(photo)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeletePhoto(photo.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">{photo.title}</h4>
                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", categoryColors[photo.category])}>
                      {photo.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{photo.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(photo.date), "d 'de' MMMM, yyyy", { locale: es })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay fotos guardadas.</p>
            <p className="text-sm">Haga clic en "Añadir Foto" para empezar.</p>
          </div>
        )}
      </CardContent>

      {/* Photo viewer dialog */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedPhoto.title}</DialogTitle>
              <DialogDescription>
                {selectedPhoto.category} - {format(new Date(selectedPhoto.date), "d 'de' MMMM, yyyy", { locale: es })}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative aspect-video">
                <Image
                  src={selectedPhoto.url || "/placeholder.svg"}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <p className="text-sm text-muted-foreground">{selectedPhoto.description}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
