'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Box, Users, Truck, FileText, BarChart3, ShoppingCart, Menu } from 'lucide-react'
import Inventory from '@/components/Inventory'
import Customers from '@/components/Customers'
import Suppliers from '@/components/Suppliers'
import Routes from '@/components/Routes'
import Reports from '@/components/Reports'
import PointOfSale from '@/components/PointOfSale'
import Image from 'next/image'

export default function Home() {
  const [activeTab, setActiveTab] = useState("pos")
  const [notifications, setNotifications] = useState(3)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const tabs = [
    { id: "pos", label: "Punto de Venta", icon: ShoppingCart },
    { id: "inventory", label: "Inventario", icon: Box },
    { id: "customers", label: "Clientes", icon: Users },
    { id: "suppliers", label: "Proveedores", icon: Truck },
    { id: "routes", label: "Rutas", icon: FileText },
    { id: "reports", label: "Reportes", icon: BarChart3 },
  ]

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
        <div className="flex items-center space-x-4">
          <Image src="/images/logo.jpg" alt="Logo" width={40} height={40} className="rounded-full" />
          <h1 className="text-2xl font-bold">Aquí tu logo</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {notifications}
              </span>
            )}
          </Button>
          <Button variant="ghost">Cerrar sesión</Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <main className="flex-grow p-6 overflow-auto">
        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className={`grid w-full ${isMobileMenuOpen ? 'grid-cols-1' : 'hidden md:grid md:grid-cols-6'} mb-4`}>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} onClick={() => setIsMobileMenuOpen(false)}>
                  <tab.icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <CardContent>
              <TabsContent value="pos"><PointOfSale /></TabsContent>
              <TabsContent value="inventory"><Inventory /></TabsContent>
              <TabsContent value="customers"><Customers /></TabsContent>
              <TabsContent value="suppliers"><Suppliers /></TabsContent>
              <TabsContent value="routes"><Routes /></TabsContent>
              <TabsContent value="reports"><Reports /></TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </main>
    </div>
  )
}