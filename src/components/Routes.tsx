import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function Routes() {
  const [routes, setRoutes] = useState([
    { id: 1, name: 'Ruta 1', driver: 'Conductor 1', status: 'En progreso' },
    { id: 2, name: 'Ruta 2', driver: 'Conductor 2', status: 'Completada' },
    { id: 3, name: 'Ruta 3', driver: 'Conductor 3', status: 'Pendiente' },
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestión de Rutas</h2>
        <Button><Plus className="mr-2 h-4 w-4" /> Agregar Ruta</Button>
      </div>
      <div className="mb-4">
        <Input type="text" placeholder="Buscar rutas..." className="max-w-sm" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Conductor</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes.map((route) => (
            <TableRow key={route.id}>
              <TableCell>{route.name}</TableCell>
              <TableCell>{route.driver}</TableCell>
              <TableCell>{route.status}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}