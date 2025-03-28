"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Smartphone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const phones = [
  {
    id: 1,
    brand: "Apple",
    model: "iPhone 15 Pro",
    price: 999,
    image: "https://images.unsplash.com/photo-1696446702239-e36ce029b4bb?w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1698675145561-7e征d41c0a?w=800&auto=format&fit=crop",
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

type FilterState = {
  brand: string;
  processor: string;
  ram: string;
  storage: string;
  priceRange: number[];
  search: string;
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
    brands: [...new Set(phones.map(p => p.brand))],
    processors: [...new Set(phones.map(p => p.specs.processor))],
    rams: [...new Set(phones.map(p => p.specs.ram))],
    storages: [...new Set(phones.flatMap(p => p.specs.storage))]
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

  const FilterSelect = ({ label, value, options, onChange }: any) => (
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

  const PhoneCard = ({ phone }: any) => (
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
              {Object.entries(phone.specs).map(([key, value]) => (
                <div key={key}>{key}: <span className="font-medium">{Array.isArray(value) ? value.join(", ") : value}</span></div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {Object.entries(phone.purchaseLinks).map(([store, url]) => (
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