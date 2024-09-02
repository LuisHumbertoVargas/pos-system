import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Proveedor 1', contact: 'Contacto 1', phone: '123-456-7890' },
    { id: 2, name: 'Proveedor 2', contact: 'Contacto 2', phone: '098-765-4321' },
    { id: 3, name: 'Proveedor 3', contact: 'Contacto 3', phone: '111-222-3333' },
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestión de Proveedores</h2>
        <Button><Plus className="mr-2 h-4 w-4" /> Agregar Proveedor</Button>
      </div>
      <div className="mb-4">
        <Input type="text" placeholder="Buscar proveedores..." className="max-w-sm" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.contact}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
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