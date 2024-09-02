import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts'
import { Download, Printer } from 'lucide-react'
import { DateRange } from 'react-day-picker'

const salesData = [
  { name: 'Ene', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Abr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
]

const productPerformanceData = [
  { name: 'Producto A', sales: 4000, revenue: 2400 },
  { name: 'Producto B', sales: 3000, revenue: 1398 },
  { name: 'Producto C', sales: 2000, revenue: 9800 },
  { name: 'Producto D', sales: 2780, revenue: 3908 },
  { name: 'Producto E', sales: 1890, revenue: 4800 },
]

const customerSegmentationData = [
  { name: 'Nuevos', value: 400 },
  { name: 'Recurrentes', value: 300 },
  { name: 'VIP', value: 300 },
  { name: 'Inactivos', value: 200 },
]

const productSalesData = [
  { x: 10, y: 30, z: 200 },
  { x: 30, y: 200, z: 100 },
  { x: 45, y: 100, z: 400 },
  { x: 50, y: 400, z: 300 },
  { x: 70, y: 150, z: 200 },
  { x: 100, y: 250, z: 500 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Reports() {
  const [reportType, setReportType] = useState('sales')
  const [dateRange, setDateRange] = useState({ from: new Date(2023, 0, 1), to: new Date() })

  const handleExport = (format: 'pdf' | 'csv') => {
    // Implementación de la exportación (simulada)
    console.log(`Exportando en formato ${format}...`)
    // Aquí iría la lógica real de exportación
  }
  const handleDateChange = (date: DateRange | undefined) => {
    setDateRange(date as { from: Date; to: Date; } ?? { from: new Date(2023, 0, 1), to: new Date() });
  };

  return (
    <Tabs defaultValue="basic">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="basic">Reportes Básicos</TabsTrigger>
        <TabsTrigger value="advanced">Reportes Avanzados</TabsTrigger>
      </TabsList>
      <div className="flex justify-between items-center mb-4">
        <DatePickerWithRange date={dateRange} setDate={handleDateChange} />
        <div className="space-x-2">
          <Button onClick={() => handleExport('pdf')} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button onClick={() => handleExport('csv')} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
          <Button onClick={() => window.print()} variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>
      <TabsContent value="basic">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Reportes Básicos</h2>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de reporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Ventas</SelectItem>
                <SelectItem value="inventory">Inventario</SelectItem>
                <SelectItem value="customers">Clientes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% del mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Productos Vendidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">+180.1% del mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes Nuevos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">+19% del mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ganancias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$23,456.78</div>
                <p className="text-xs text-muted-foreground">+201 del mes pasado</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Reporte de Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="advanced">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Reportes Avanzados</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento de Productos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sales" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tendencias de Ventas</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Segmentación de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerSegmentationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {customerSegmentationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Ventas por Producto</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="precio" unit="$" />
                    <YAxis type="number" dataKey="y" name="ventas" unit="u" />
                    <ZAxis type="number" dataKey="z" range={[64, 144]} name="ingresos" unit="$" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Productos" data={productSalesData} fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Predicciones y Análisis de Tendencias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Predicción de Ventas para el Próximo Mes</h3>
                  <p className="text-2xl font-bold">$52,450.00</p>
                  <p className="text-sm text-muted-foreground">Basado en el análisis de tendencias históricas</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Productos con Mayor Potencial de Crecimiento</h3>
                  <ul className="list-disc list-inside">
                    <li>Producto A - Crecimiento esperado: 15%</li>
                    <li>Producto C - Crecimiento esperado: 12%</li>
                    <li>Producto E - Crecimiento esperado: 10%</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Recomendaciones</h3>
                  <p>Basado en el análisis de datos, se recomienda:</p>
                  <ul className="list-disc list-inside">
                    <li>Aumentar el stock de Producto A en un 20%</li>
                    <li>Lanzar una campaña promocional para Producto C</li>
                    <li>Revisar la estrategia de precios para Producto E</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}