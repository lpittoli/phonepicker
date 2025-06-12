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
    price: 699,
    image: "https://images.unsplash.com/photo-1695619575474-9b45e37bc1e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lJTIwMTUlMjBwcm98ZW58MHx8MHx8fDA%3D",
    specs: { processor: "A17 Pro", ram: "8GB", storage: ["128GB", "256GB", "512GB", "1TB"], display: "6.1 OLED", camera: "48MP Main", battery: "3274mAh" },
    purchaseLinks: { amazon: "https://www.amazon.com/iPhone-15-Pro", official: "https://www.apple.com/iphone-15-pro" }
  },
  {
    id: 2,
    brand: "Samsung",
    model: "Galaxy S24 Ultra 5G",
    price: 689,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop",
    specs: { processor: "Snapdragon 8 Gen 3", ram: "12GB", storage: ["256GB", "512GB", "1TB"], display: "6.8 AMOLED", camera: "200MP Main", battery: "5000mAh" },
    purchaseLinks: { amazon: "https://www.amazon.com/Samsung-Galaxy-S24-Ultra", official: "https://www.samsung.com/galaxy-s24-ultra" }
  },
  {
    id: 3,
    brand: "Google",
    model: "Pixel 8 Pro",
    price: 385,
    image: "https://images.unsplash.com/photo-1706412703794-d944cd3625b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl4ZWwlMjA4JTIwcHJvfGVufDB8fDB8fHww",
    specs: { processor: "Google Tensor G3", ram: "12GB", storage: ["128GB", "256GB", "512GB"], display: "6.7 OLED", camera: "50MP Main", battery: "5050mAh" },
    purchaseLinks: { amazon: "https://www.amazon.com/Google-Pixel-8-Pro", official: "https://store.google.com/pixel-8-pro" }
  },
  {
    id: 4,
    brand: "OnePlus",
    model: "12",
    price: 746,
    image: "data:image/jpeg;base64,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",
    specs: { processor: "Snapdragon 8 Gen 3", ram: "12GB", storage: ["256GB", "512GB"], display: "6.82 AMOLED", camera: "50MP Main", battery: "5400mAh" },
    purchaseLinks: { amazon: "https://www.amazon.com/OnePlus-12", official: "https://www.oneplus.com/12" }
  },
  {
  id: 5,
  brand: "Xiaomi",
  model: "Xiaomi 14 Ultra",
  price: 1190,
  image: "https://images.unsplash.com/photo-1705585174953-9b2aa8afc174?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eGlhb21pJTIwMTQlMjB1bHRyYXxlbnwwfHwwfHx8MA%3D%3D",
  specs: {
    processor: "Snapdragon 8 Gen 3",
    ram: "16GB",
    storage: ["256GB", "512GB"],
    display: "6.73 AMOLED",
    camera: "50MP Quad Leica",
    battery: "5000mAh"
  },
  purchaseLinks: {
    amazon: "https://www.amazon.com/Xiaomi-14-Ultra",
    official: "https://www.mi.com/global/product/xiaomi-14-ultra"
  }
},
{
  id: 6,
  brand: "Motorola",
  model: "Edge+ 2024",
  price: 399,
  image: "data:image/jpeg;base64,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",
  specs: {
    processor: "Snapdragon 8 Gen 2",
    ram: "8GB",
    storage: ["256GB"],
    display: "6.7 OLED",
    camera: "50MP Main",
    battery: "5100mAh"
  },
  purchaseLinks: {
    amazon: "https://www.amazon.com/Motorola-Edge-Plus",
    official: "https://www.motorola.com/edge-plus"
  }
},
{
  id: 7,
  brand: "ASUS",
  model: "ROG Phone 8 Pro",
  price: 749,
  image: "https://cdn.awsli.com.br/2500x2500/1271/1271561/produto/265359512/smartphone-asus-rog-phone-8-pro--5g---512gb---16gb-ram---50mp---165hz-jex1knvnpt.jpg",
  specs: {
    processor: "Snapdragon 8 Gen 3",
    ram: "16GB",
    storage: ["512GB", "1TB"],
    display: "6.78 AMOLED 165Hz",
    camera: "50MP Main",
    battery: "5500mAh"
  },
  purchaseLinks: {
    amazon: "https://www.amazon.com/ASUS-ROG-Phone-8-Pro",
    official: "https://rog.asus.com/phones/rog-phone-8-pro"
  }
},
{
  id: 8,
  brand: "Realme",
  model: "GT 6 Pro",
  price: 599,
  image: "https://images.unsplash.com/photo-1695499405433-63b7d42e7326?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  specs: {
    processor: "Snapdragon 8 Gen 2",
    ram: "12GB",
    storage: ["256GB"],
    display: "6.74 AMOLED 144Hz",
    camera: "50MP Sony",
    battery: "5000mAh"
  },
  purchaseLinks: {
    amazon: "https://www.amazon.com/realme-gt-6-pro",
    official: "https://www.realme.com/global/gt-6-pro"
  }
},
{
  id: 9,
  brand: "Nothing",
  model: "Phone (2)",
  price: 599,
  image: "https://images.unsplash.com/photo-1711129250487-42c9078effe6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  specs: {
    processor: "Snapdragon 8+ Gen 1",
    ram: "12GB",
    storage: ["256GB", "512GB"],
    display: "6.7 OLED",
    camera: "50MP Dual",
    battery: "4700mAh"
  },
  purchaseLinks: {
    amazon: "https://www.amazon.com/Nothing-Phone-2",
    official: "https://nothing.tech/products/phone-2"
  }
},
{
  id: 10,
  brand: "Sony",
  model: "Xperia 1 V",
  price: 746,
  image: "https://files.refurbed.com/ii/xperia-1-v-1691658861.jpg",
  specs: {
    processor: "Snapdragon 8 Gen 2",
    ram: "12GB",
    storage: ["256GB", "512GB"],
    display: "6.5 4K OLED",
    camera: "48MP Triple Zeiss",
    battery: "5000mAh"
  },
  purchaseLinks: {
    amazon: "https://www.amazon.com/Sony-Xperia-1-V",
    official: "https://www.sony.com/electronics/smartphones/xperia-1m5"
  }
},
{
  id: 11,
  brand: "Huawei",
  model: "P60 Pro",
  price: 575,
  image: "https://images.unsplash.com/photo-1612474522113-6c2c6fc94c9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aHVhd2VpJTIwcDYwJTIwcHJvfGVufDB8fDB8fHww",
  specs: {
    processor: "Snapdragon 8+ Gen 1 4G",
    ram: "12GB",
    storage: ["256GB", "512GB"],
    display: "6.67 OLED",
    camera: "48MP XMAGE",
    battery: "4815mAh"
  },
  purchaseLinks: {
    amazon: "https://www.amazon.com/Huawei-P60-Pro",
    official: "https://consumer.huawei.com/en/phones/p60-pro"
  }
},
{
  id: 12,
  brand: "Honor",
  model: "Magic6 Pro",
  price: 898,
  image: "https://ae01.alicdn.com/kf/S1e736bd1b2634651a2b6f9b27afb58cc3.jpg",
  specs: {
    processor: "Snapdragon 8 Gen 3",
    ram: "12GB",
    storage: ["256GB", "512GB", "1TB"],
    display: "6.8 OLED LTPO",
    camera: "50MP Triple",
    battery: "5600mAh"
  },
  purchaseLinks: {
    amazon: "https://www.amazon.com/Honor-Magic6-Pro",
    official: "https://www.hihonor.com/global/phones/honor-magic6-pro"
  }
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
