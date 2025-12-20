
import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, AppRoute } from './types';
import { PRODUCTS as INITIAL_PRODUCTS } from './constants';
import AIConsultant from './components/AIConsultant';

const formatLKR = (amount: number) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2
  }).format(amount).replace('LKR', 'Rs.');
};

const Navbar: React.FC<{ cartCount: number; setRoute: (r: AppRoute) => void; currentRoute: AppRoute }> = ({ cartCount, setRoute, currentRoute }) => (
  <nav className="sticky top-0 z-40 glass border-b border-white/10 px-6 py-4 flex justify-between items-center">
    <div className="flex items-center gap-8">
      <div 
        onClick={() => setRoute(AppRoute.HOME)}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <img 
          src="https://img.freepik.com/premium-vector/rabbit-esport-mascot-logo-design_139366-444.jpg" 
          alt="Logo" 
          className="w-10 h-10 rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-yellow-500/20"
        />
        <h1 className="text-2xl font-orbitron font-bold tracking-tighter bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          DULA FF
        </h1>
      </div>
      <div className="hidden md:flex gap-6 font-semibold text-sm">
        <button onClick={() => setRoute(AppRoute.HOME)} className={`${currentRoute === AppRoute.HOME ? 'text-yellow-400' : 'text-gray-400 hover:text-white transition-colors'}`}>HOME</button>
        <button onClick={() => setRoute(AppRoute.SHOP)} className={`${currentRoute === AppRoute.SHOP ? 'text-yellow-400' : 'text-gray-400 hover:text-white transition-colors'}`}>STORE</button>
        <button onClick={() => setRoute(AppRoute.ADMIN)} className={`${currentRoute === AppRoute.ADMIN ? 'text-yellow-400' : 'text-gray-400 hover:text-white transition-colors'}`}>MANAGE GEAR</button>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button 
        onClick={() => setRoute(AppRoute.CHECKOUT)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
      <button 
        onClick={() => setRoute(AppRoute.AUTH)}
        className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all border border-white/10"
      >
        SIGN IN
      </button>
    </div>
  </nav>
);

const ProductCard: React.FC<{ product: Product; onAddToCart: (p: Product) => void }> = ({ product, onAddToCart }) => (
  <div className="glass rounded-3xl overflow-hidden group hover:border-yellow-500/50 transition-all duration-500">
    <div className="relative h-64 overflow-hidden bg-black/50">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {product.isNew && (
        <span className={`absolute top-4 left-4 ${product.category === 'Software' ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white'} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg`}>
          {product.category === 'Software' ? 'OFFICIAL FILE' : 'New Arrival'}
        </span>
      )}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
        <button 
          onClick={() => onAddToCart(product)}
          className="gaming-gradient text-white font-bold px-6 py-2 rounded-full hover:scale-110 transition-transform flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          ADD TO ARMORY
        </button>
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{product.name}</h3>
      </div>
      <div className="text-yellow-500 font-orbitron font-bold mb-4">{formatLKR(product.price)}</div>
      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
      <div className="flex gap-2 flex-wrap">
        {product.specs.slice(0, 3).map((spec, i) => (
          <span key={i} className="text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded-md border border-white/10 uppercase tracking-tighter">
            {spec}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const AdminDashboard: React.FC<{ products: Product[]; onUpdate: (p: Product) => void; onDelete: (id: string) => void }> = ({ products, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setFormData(p);
  };

  const handleSave = () => {
    if (formData.id) {
      onUpdate(formData as Product);
      setEditingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-orbitron font-bold">GEAR COMMAND CENTER</h2>
        <button className="gaming-gradient px-6 py-2 rounded-xl text-sm font-bold text-white">ADD NEW GEAR</button>
      </div>

      <div className="glass rounded-[2rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price (LKR)</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={p.image} className="w-12 h-12 object-cover rounded-lg" alt="" />
                    <span className="font-bold text-white group-hover:text-yellow-400">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded border border-gray-700">{p.category}</span>
                </td>
                <td className="px-6 py-4 font-orbitron text-yellow-500">{formatLKR(p.price)}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => startEdit(p)} className="text-gray-400 hover:text-white p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => onDelete(p.id)} className="text-red-500/50 hover:text-red-500 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingId(null)}></div>
          <div className="glass max-w-2xl w-full p-8 rounded-3xl relative border border-yellow-500/30">
            <h3 className="text-2xl font-orbitron font-bold mb-6">EDIT GEAR</h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Product Name</label>
                <input 
                  type="text" 
                  value={formData.name || ''} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-yellow-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Price (LKR)</label>
                <input 
                  type="number" 
                  value={formData.price || ''} 
                  onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-yellow-500 outline-none font-orbitron" 
                />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
                <input 
                  type="text" 
                  value={formData.image || ''} 
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-yellow-500 outline-none" 
                />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description || ''} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-yellow-500 outline-none" 
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={handleSave} className="flex-1 gaming-gradient py-3 rounded-xl font-bold text-white">SAVE CHANGES</button>
              <button onClick={() => setEditingId(null)} className="flex-1 bg-white/5 border border-white/10 py-3 rounded-xl font-bold text-white">CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AuthScreen: React.FC<{ onAuthSuccess: () => void; onBack: () => void }> = ({ onAuthSuccess, onBack }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const handleGoogleLogin = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onAuthSuccess();
    }, 1500);
  };
  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0c] flex items-center justify-center px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]"></div>
      </div>
      <div className="glass max-w-md w-full p-10 rounded-[2.5rem] relative border border-white/5 shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <img 
            src="https://img.freepik.com/premium-vector/rabbit-esport-mascot-logo-design_139366-444.jpg" 
            alt="DULA Mascot" 
            className="w-20 h-20 rounded-2xl shadow-xl shadow-yellow-500/20"
          />
        </div>
        <h1 className="text-3xl font-orbitron font-bold tracking-tighter bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-10">DULA FF</h1>
        <button onClick={handleGoogleLogin} disabled={isAuthenticating} className="w-full bg-white text-gray-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-4 group">
          {isAuthenticating ? <div className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin"></div> : <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>}
          Continue with Google
        </button>
        <button onClick={onBack} className="mt-10 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">← Return to Store</button>
      </div>
    </div>
  );
};

const SuccessScreen: React.FC<{ onReset: () => void }> = ({ onReset }) => (
  <div className="max-w-2xl mx-auto px-6 py-20 text-center">
    <div className="w-24 h-24 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-yellow-500/30">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
    </div>
    <h2 className="text-4xl font-orbitron font-bold mb-4">ORDER DEPLOYED!</h2>
    <p className="text-gray-400 mb-10">Your gear is being prepared for shipment. You will receive a confirmation message shortly.</p>
    <button onClick={onReset} className="bg-white/5 border border-white/10 text-white font-bold py-4 px-10 rounded-full">RETURN TO STORE</button>
  </div>
);

const App: React.FC = () => {
  const [route, setRoute] = useState<AppRoute>(AppRoute.HOME);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState<string>('All');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen pb-20">
      {route !== AppRoute.AUTH && (
        <Navbar cartCount={cartCount} setRoute={setRoute} currentRoute={route} />
      )}
      
      {route === AppRoute.AUTH && (
        <AuthScreen onBack={() => setRoute(AppRoute.HOME)} onAuthSuccess={() => setRoute(AppRoute.HOME)} />
      )}

      {route === AppRoute.ADMIN && (
        <AdminDashboard products={products} onUpdate={updateProduct} onDelete={deleteProduct} />
      )}

      {route === AppRoute.HOME && (
        <>
          <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-20 animate-pulse-slow grayscale" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/80 to-transparent"></div>
            </div>
            <div className="relative z-10 text-center px-4 flex flex-col items-center">
              <div className="mb-8 relative">
                 <img 
                  src="https://img.freepik.com/premium-vector/rabbit-esport-mascot-logo-design_139366-444.jpg" 
                  alt="DULA Mascot" 
                  className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] shadow-2xl shadow-yellow-500/30 border-4 border-yellow-500/20 animate-bounce-slow"
                />
              </div>
              <h2 className="text-5xl md:text-8xl font-orbitron font-bold mb-6 tracking-tighter">GEAR UP FOR <span className="text-yellow-500">VICTORY</span></h2>
              <button onClick={() => setRoute(AppRoute.SHOP)} className="gaming-gradient py-4 px-10 rounded-full font-bold shadow-2xl text-black uppercase tracking-widest hover:scale-105 transition-transform">BROWSE THE STORE</button>
            </div>
          </section>
          <section className="px-6 py-20 max-w-7xl mx-auto">
            <h2 className="text-4xl font-orbitron font-bold mb-12 border-l-4 border-yellow-500 pl-6">LATEST RELEASES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 3).map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
            </div>
          </section>
        </>
      )}

      {route === AppRoute.SHOP && (
        <section className="px-6 py-12 max-w-7xl mx-auto">
          <h2 className="text-3xl font-orbitron font-bold mb-8">THE GEAR ARMORY</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar mb-12">
            {['All', 'PC', 'Peripherals', 'Audio', 'Components', 'Furniture', 'Software'].map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-full border transition-all ${filter === cat ? 'bg-yellow-500 border-yellow-500 text-black font-bold' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter(p => filter === 'All' || p.category === filter).map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
          </div>
        </section>
      )}

      {route === AppRoute.CHECKOUT && (
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-orbitron font-bold mb-10">YOUR ARMORY</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {cart.map(item => (
                <div key={item.id} className="glass p-6 rounded-3xl flex items-center gap-6">
                  <img src={item.image} className="w-24 h-24 object-cover rounded-2xl" alt="" />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-yellow-500 font-bold">{formatLKR(item.price)}</p>
                  </div>
                  <div className="font-bold">x{item.quantity}</div>
                </div>
              ))}
            </div>
            <div className="glass p-8 rounded-3xl h-fit">
              <div className="flex justify-between font-bold text-xl mb-8"><span>TOTAL</span><span className="text-yellow-500">{formatLKR(total)}</span></div>
              <button onClick={() => setRoute(AppRoute.PAYMENT)} className="w-full gaming-gradient py-4 rounded-2xl font-bold text-black">PROCEED TO PAYMENT</button>
            </div>
          </div>
        </div>
      )}

      {route === AppRoute.SUCCESS && <SuccessScreen onReset={() => setRoute(AppRoute.HOME)} />}
      
      {route !== AppRoute.AUTH && <AIConsultant />}
    </div>
  );
};

export default App;
