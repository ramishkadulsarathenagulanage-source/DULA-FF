
export interface Product {
  id: string;
  name: string;
  category: 'PC' | 'Peripherals' | 'Audio' | 'Furniture' | 'Components' | 'Software';
  price: number;
  description: string;
  image: string;
  specs: string[];
  rating: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppRoute {
  HOME = 'home',
  SHOP = 'shop',
  CHECKOUT = 'checkout',
  PAYMENT = 'payment',
  SUCCESS = 'success',
  AUTH = 'auth',
  ADMIN = 'admin'
}
