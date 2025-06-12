"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Smartphone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PhoneSpecs {
  processor: string;
  ram: string;
  storage: string[];
  display: string;
  camera: string;
  battery: string;
}

interface PurchaseLinks {
  amazon: string;
  official: string;
}

interface Phone {
  id: number;
  brand: string;
  model: string;
  price: number;
  image: string;
  specs: PhoneSpecs;
  purchaseLinks: PurchaseLinks;
}

const phones: Phone[] = [
  {
    id: 1,
    brand: "Apple",
    model: "iPhone 15 Pro",
    price: 999,
    image: "https://files.tecnoblog.net/wp-content/uploads/2025/01/iphone-15-pro-max-tecnoblog-titanio-azul.png",
    specs: { processor: "A17 Pro", ram: "8GB", storage: ["128GB", "256GB", "512GB", "1TB"], display: "6.1 OLED", camera: "48MP Main", battery: "3274mAh" },
    purchaseLinks: { amazon: "https://www.amazon.com/iPhone-15-Pro", official: "https://www.apple.com/iphone-15-pro" }
  },
  {
    id: 2,
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    price: 1199,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop",
    specs: { processor: "Snapdragon 8 Gen 3", ram: "12GB", storage: ["256GB", "512GB", "1TB"], display: "6.8 AMOLED", camera: "200MP Main", battery: "5000mAh" },
    purchaseLinks: { amazon: "https://www.amazon.com/Samsung-Galaxy-S24-Ultra", official: "https://www.samsung.com/galaxy-s24-ultra" }
  },
  {
    id: 3,
    brand: "Google",
    model: "Pixel 8 Pro",
    price: 899,
    image: "data:image/jpeg;base64,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[+W/8VtS6l1BqvtN2PbL5b/WTtN2PbL5b/WW1LqXUGq+03Y9svlv9ZdHcEVla17W8ZR7aEF7jzg4nSDoK2vdS6g0JLwRWhvJZaZCwdzUjAf9LoOCW1fGHdbfwW/rgS4NiDRbODW3i7S2SC60tbRzcGupUVpowad7QdIC4tfBhbZTektTnHaSzUa/BW9eLGxLg2INAy8D9odS9OTTRUt9VSMHB5lFga1ltkaGtDWgFmDWigHc6gt23BsS4NiDQUPBFamvEjbQQ8OLg4FtQ46ToUsMxcqfvCXrZ6q3PcGxc0Qanzc4LyLQy05QnltLozVjHuqwHn2jmFBtqtrMcdYXdEBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH//Z",
    specs: { processor: "Google Tensor G3", ram: "12GB", storage: ["128GB", "256GB", "512GB"], display: "6.7 OLED", camera: "50MP Main", battery: "5050mAh" },
    purchaseLinks: { amazon: "https://www.amazon.com/Google-Pixel-8-Pro", official: "https://store.google.com/pixel-8-pro" }
  },
  {
    id: 4,
    brand: "OnePlus",
    model: "12",
    price: 799,
    image: "https://images.unsplash.com/photo-1676037150007-c93df9c01532?w=800&auto=format&fit=crop",
    specs: { processor: "Snapdragon 8 Gen 3", ram: "12GB", storage: ["256GB", "512GB"], display: "6.82 AMOLED", camera: "50MP Main", battery: "5400mAh" },
    purchaseLinks: { amazon: "https://www.amazon.com/OnePlus-12", official: "https://www.oneplus.com/12" }
  }
];

interface FilterState {
  brand: string;
  processor: string;
  ram: string;
  storage: string;
  priceRange: number[];
  search: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    brand: "all",
    processor: "all",
    ram: "all",
    storage: "all",
    priceRange: [0, 1500],
    search: ""
  });

  const options = {
    brands: Array.from(new Set(phones.map(p => p.brand))),
    processors: Array.from(new Set(phones.map(p => p.specs.processor))),
    rams: Array.from(new Set(phones.map(p => p.specs.ram))),
    storages: Array.from(new Set(phones.flatMap(p => p.specs.storage)))
  };

  const filteredPhones = phones.filter(phone => 
    (filters.brand === "all" || phone.brand === filters.brand) &&
    (filters.processor === "all" || phone.specs.processor === filters.processor) &&
    (filters.ram === "all" || phone.specs.ram === filters.ram) &&
    (filters.storage === "all" || phone.specs.storage.includes(filters.storage)) &&
    (phone.price >= filters.priceRange[0] && phone.price <= filters.priceRange[1]) &&
    (phone.model.toLowerCase().includes(filters.search.toLowerCase()) || 
     phone.brand.toLowerCase().includes(filters.search.toLowerCase()))
  );

  const FilterSelect = ({ label, value, options, onChange }: FilterSelectProps) => (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={`Selecionar ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as opções</SelectItem>
          {options.map((opt: string) => (
            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const PhoneCard = ({ phone }: { phone: Phone }) => (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-card rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
          <img src={phone.image} alt={phone.model} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="font-semibold text-lg">{phone.model}</h3>
            <p className="text-muted-foreground">{phone.brand}</p>
            <p className="text-lg font-bold mt-2">${phone.price}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{phone.brand} {phone.model}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <img src={phone.image} alt={phone.model} className="w-full h-64 object-cover rounded-lg" />
          <div className="grid gap-2">
            <h3 className="font-semibold">Especificações:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {(Object.entries(phone.specs) as [keyof PhoneSpecs, string | string[]][]).map(([key, value]) => (
                <div key={key}>{key}: <span className="font-medium">{Array.isArray(value) ? value.join(", ") : value}</span></div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {(Object.entries(phone.purchaseLinks) as [keyof PurchaseLinks, string][]).map(([store, url]) => (
              <Button key={store} asChild className="flex-1" variant={store === "amazon" ? "default" : "outline"}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {store === "amazon" ? "Comprar na Amazon" : "Loja Oficial"} <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Smartphone className="h-6 w-6" />
            <h1 className="text-2xl font-bold">PhonePicker</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Filtros</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Pesquisar</label>
                  <Input
                    placeholder="Buscar por modelo..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                  />
                </div>
                
                <FilterSelect 
                  label="Marca" 
                  value={filters.brand}
                  options={options.brands}
                  onChange={(value: string) => setFilters({...filters, brand: value})}
                />
                
                <FilterSelect 
                  label="Processador"
                  value={filters.processor}
                  options={options.processors}
                  onChange={(value: string) => setFilters({...filters, processor: value})}
                />
                
                <FilterSelect 
                  label="Memória RAM"
                  value={filters.ram}
                  options={options.rams}
                  onChange={(value: string) => setFilters({...filters, ram: value})}
                />
                
                <FilterSelect 
                  label="Armazenamento"
                  value={filters.storage}
                  options={options.storages}
                  onChange={(value: string) => setFilters({...filters, storage: value})}
                />

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Faixa de preço: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </label>
                  <Slider
                    defaultValue={[0, 1500]}
                    max={1500}
                    step={100}
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters({...filters, priceRange: value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPhones.map(phone => (
                <PhoneCard key={phone.id} phone={phone} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
