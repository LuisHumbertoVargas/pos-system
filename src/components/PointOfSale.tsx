import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Minus,
  Trash2,
  Search,
  BarChart4,
  DollarSign,
} from "lucide-react";
import Image from "next/image";

interface Item {
  id: number;
  name: string;
  price: number;
  type: "product" | "service";
  category: string;
  image: string;
  stock?: number;
}

interface CartItem extends Item {
  quantity: number;
}

const initialItems: Item[] = [
  {
    id: 1,
    name: "Producto 1",
    price: 10.99,
    type: "product",
    category: "Electrónicos",
    image: "/images/producto.png",
    stock: 50,
  },
  {
    id: 2,
    name: "Servicio 1",
    price: 25.0,
    type: "service",
    category: "Mantenimiento",
    image: "/images/servicio.png",
  },
  {
    id: 3,
    name: "Producto 2",
    price: 15.99,
    type: "product",
    category: "Hogar",
    image: "/images/producto.png",
    stock: 30,
  },
  {
    id: 4,
    name: "Servicio 2",
    price: 50.0,
    type: "service",
    category: "Consultoría",
    image: "/images/servicio.png",
  },
  {
    id: 5,
    name: "Producto 3",
    price: 12.99,
    type: "product",
    category: "Electrónicos",
    image: "/images/producto.png",
    stock: 20,
  },
  {
    id: 6,
    name: "Servicio 3",
    price: 30.0,
    type: "service",
    category: "Mantenimiento",
    image: "/images/servicio.png",
  },
  {
    id: 7,
    name: "Producto 4",
    price: 8.99,
    type: "product",
    category: "Hogar",
    image: "/images/producto.png",
    stock: 40,
  },
  {
    id: 8,
    name: "Servicio 4",
    price: 60.0,
    type: "service",
    category: "Consultoría",
    image: "/images/servicio.png",
  },
];

export default function PointOfSale() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "product" | "service">("all");
  const [newItem, setNewItem] = useState<Partial<Item>>({ type: "product" });
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === "all" || item.type === activeTab)
  );

  const addToCart = (item: Item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleAddNewItem = () => {
    if (newItem.name && newItem.price) {
      setItems([
        ...items,
        {
          ...(newItem as Item),
          id: items.length + 1,
          image: "/placeholder.svg?height=100&width=100",
        },
      ]);
      setNewItem({ type: "product" });
      setIsAddItemDialogOpen(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const applyDiscount = (percentage: number) => {
    const discountAmount = total * (percentage / 100);
    return total - discountAmount;
  };

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const finalTotal = applyDiscount(discountPercentage);

  const handleValueChange = (value: string) => {
    if (value === "product" || value === "service" || value === "all") {
      setActiveTab(value);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Catálogo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Buscar productos o servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as "product" | "service" | "all")}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="services">Servicios</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
            {filteredItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => addToCart(item)}
                variant="outline"
                className="h-auto py-2 flex flex-col items-center justify-between"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="mb-2 rounded-md"
                />
                <div className="text-center">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </div>
                  {item.type === "product" && (
                    <div className="text-xs text-muted-foreground">
                      Stock: {item.stock}
                    </div>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Dialog
            open={isAddItemDialogOpen}
            onOpenChange={setIsAddItemDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Agregar Nuevo Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Item</DialogTitle>
                <DialogDescription>
                  Ingrese los detalles del nuevo producto o servicio.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    value={newItem.name || ""}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Precio
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={newItem.price || ""}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        price: parseFloat(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Tipo
                  </Label>
                  <Select
                    value={newItem.type}
                    onValueChange={(value: "product" | "service") =>
                      setNewItem({ ...newItem, type: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Producto</SelectItem>
                      <SelectItem value="service">Servicio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newItem.type === "product" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock" className="text-right">
                      Stock
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newItem.stock || ""}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          stock: parseInt(e.target.value),
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Categoría
                  </Label>
                  <Input
                    id="category"
                    value={newItem.category || ""}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddNewItem}>Agregar Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Carrito</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>{" "}
                {/* Nueva columna para la imagen */}
                <TableHead>Item</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />{" "}
                    {/* Mostrar la imagen */}
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <div className="flex justify-between w-full mb-4">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <Label htmlFor="discount">Descuento (%):</Label>
            <Input
              id="discount"
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(Number(e.target.value))}
              className="w-20"
            />
          </div>
          <div className="flex justify-between w-full mb-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold">${finalTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-full">
            <Button variant="outline">
              <BarChart4 className="mr-2 h-4 w-4" />
              Ver Resumen
            </Button>
            <Button>
              <DollarSign className="mr-2 h-4 w-4" />
              Completar Venta
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

