import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function Customers() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Cliente 1', email: 'cliente1@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Cliente 2', email: 'cliente2@example.com', phone: '098-765-4321' },
    { id: 3, name: 'Cliente 3', email: 'cliente3@example.com', phone: '111-222-3333' },
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestión de Clientes</h2>
        <Button><Plus className="mr-2 h-4 w-4" /> Agregar Cliente</Button>
      </div>
      <div className="mb-4">
        <Input type="text" placeholder="Buscar clientes..." className="max-w-sm" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
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