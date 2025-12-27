import { Product } from '../context/CartContext';

export interface DetailedProduct extends Product {
    description: string;
    specs: Record<string, string>;
    gallery: string[];
    reviews: number;
}

export const productsData: DetailedProduct[] = [
    {
        id: 1,
        name: 'RTX 4090 ROG Strix',
        category: 'Hardware',
        price: 14500.00,
        oldPrice: 15999.00,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop',
        badge: 'HOT',
        fpsStats: { game: 'Valorant', fps: 580 },
        description: "The ROG Strix GeForce RTX™ 4090 brings a whole new meaning to going with the flow. Inside and out, every element of the card gives the monstrous GPU headroom to breathe freely and achieve ultimate performance.",
        specs: {
            "Memory": "24GB GDDR6X",
            "Cuda Cores": "16384",
            "Boost Clock": "2640 MHz",
            "Interface": "PCI Express 4.0",
            "Recommended PSU": "1000W"
        },
        gallery: [
            "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop",
            "https://dlcdnwebimgs.asus.com/gain/49704204-79C0-459E-96B3-5C32A176B7C3",
            "https://dlcdnwebimgs.asus.com/gain/4D068C68-5C42-4537-88D2-48098319F41E"
        ],
        reviews: 128
    },
    {
        id: 2,
        name: 'Intel Core i9 14900K',
        category: 'Hardware',
        price: 4200.00,
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800&auto=format&fit=crop',
        fpsStats: { game: 'CS2', fps: 450 },
        description: "Game without compromise. Drive your performance with the 14th Gen Intel® Core™ processors.",
        specs: {
            "Cores": "24 (8P + 16E)",
            "Threads": "32",
            "Max Turbo": "6.0 GHz",
            "Socket": "LGA1700",
            "Cache": "36MB"
        },
        gallery: [
            "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800&auto=format&fit=crop",
            "https://m.media-amazon.com/images/I/61uJ+PWp3fL._AC_SL1500_.jpg"
        ],
        reviews: 84
    },
    {
        id: 3,
        name: 'Mouse Logitech G Pro X',
        category: 'Periféricos',
        price: 799.00,
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop',
        description: "Designed with pros, engineered to win. The PRO X SUPERLIGHT is less than 63 grams.",
        specs: {
            "Sensor": "HERO 25K",
            "Weight": "<63g",
            "Poll Rate": "1000Hz",
            "Battery": "70 Hours",
            "Connectivity": "LIGHTSPEED Wireless"
        },
        gallery: [
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop",
            "https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto:best,f_auto,b_rgb:000000/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-black-gallery-1.png"
        ],
        reviews: 340
    },
    {
        id: 4,
        name: 'Headset Cloud Alpha',
        category: 'Periféricos',
        price: 599.00,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop',
        description: "HyperX Cloud Alpha features Dual Chamber Drivers for more distinction and less distortion.",
        specs: {
            "Driver": "Dual Chamber 50mm",
            "Frequency": "13Hz - 27kHz",
            "Connection": "3.5mm Wired",
            "Weight": "298g",
            "Mic": "Detachable Noise-cancelling"
        },
        gallery: [
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop"
        ],
        reviews: 156
    },
    {
        id: 5,
        name: 'Monitor Alienware 360Hz',
        category: 'Monitores',
        price: 3200.00,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop',
        fpsStats: { game: 'Warzone 2', fps: 240 },
        description: "World's fastest refresh rate of 360Hz. Experience the fluid gameplay that lets you react faster.",
        specs: {
            "Panel": "Fast IPS",
            "Resolution": "1920x1080",
            "Refresh Rate": "360Hz",
            "Response Time": "0.5ms (GtG)",
            "NVIDIA G-SYNC": "Supported"
        },
        gallery: [
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop"
        ],
        reviews: 42
    },
    {
        id: 6,
        name: 'Teclado Apex Pro TKL',
        category: 'Periféricos',
        price: 1400.00,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop',
        badge: 'BEST SELLER',
        description: "The world's fastest keyboard. OmniPoint 2.0 switches offering 11x faster response.",
        specs: {
            "Switches": "OmniPoint 2.0 Adjustable",
            "Actuation": "0.2mm to 3.8mm",
            "Lighting": "Per Key RGB",
            "Frame": "Aircraft Grade Aluminum",
            "OLED Screen": "Smart Display"
        },
        gallery: [
            "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop"
        ],
        reviews: 210
    }
];
