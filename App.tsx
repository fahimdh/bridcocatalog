
import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, LayoutGrid, Search, User as UserIcon, List } from 'lucide-react';
import { View, Product, CartItem, MainCategory, User } from './types';
import { PRODUCTS, MOCK_USERS } from './data';

// --- Views ---
import CatalogView from './views/Catalog';
import CategoriesView from './views/Categories';
import SearchView from './views/Search';
import CartView from './views/Cart';
import AccountView from './views/Account';
import ProductDetailsView from './views/ProductDetails';
import LoginView from './views/Login';
import PendingApprovalView from './views/PendingApproval';
import AdminView from './views/Admin';
import OrderSuccessView from './views/OrderSuccess';

const App: React.FC = () => {
  // Persistence Loading
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('sc_users_list');
    return saved ? JSON.parse(saved) : MOCK_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sc_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Re-fetch the latest state of the user from our users list
      return users.find(u => u.email === parsed.email) || parsed;
    }
    return null;
  });
  
  const [currentView, setCurrentView] = useState<View>(() => {
    if (!currentUser) return 'login';
    return currentUser.isApproved ? 'catalog' : 'pending';
  });

  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory | 'All'>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | 'All'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync users list to storage whenever it changes
  useEffect(() => {
    localStorage.setItem('sc_users_list', JSON.stringify(users));
  }, [users]);

  // Sync current user to storage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sc_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sc_user');
    }
  }, [currentUser]);

  // Authentication logic
  const handleLogin = (email: string) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      setCurrentView(user.isApproved ? 'catalog' : 'pending');
    } else {
      alert("Account not found. Please register first or use a demo email.");
    }
  };

  const handleRegister = (name: string, email: string) => {
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      alert("An account with this email already exists.");
      return;
    }

    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      isApproved: false, // Must be approved by admin
      priceListId: 'STANDARD',
      avatar: `https://i.pravatar.cc/150?u=${email}`
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentView('pending');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setCart([]);
  };

  const updateUserInList = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (currentUser?.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };

  // Price helper
  const getUserPrice = (product: Product) => {
    if (!currentUser) return 0;
    return product.prices[currentUser.priceListId];
  };

  // Cart Management
  const addToCart = (product: Product, quantity: number, packaging: string) => {
    const price = getUserPrice(product);
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.selectedPackaging === packaging);
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }
      const { prices, ...rest } = product;
      return [...prev, { ...rest, price, quantity, selectedPackaging: packaging }];
    });
  };

  const handleQuickAdd = (product: Product) => {
    addToCart(product, 1, product.packagingTypes[0]);
  };

  const updateCartQuantity = (id: string, packaging: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && (packaging === '' || item.selectedPackaging === packaging)) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleGridUpdateQuantity = (product: Product, delta: number) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      updateCartQuantity(product.id, existing.selectedPackaging, delta);
    } else if (delta > 0) {
      handleQuickAdd(product);
    }
  };

  const removeFromCart = (id: string, packaging: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedPackaging === packaging)));
  };

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('details');
  };

  // Navigation Logic
  if (!currentUser) {
    return <LoginView onLogin={handleLogin} onRegister={handleRegister} />;
  }

  const renderView = () => {
    // Force view to pending if not approved, unless they are already at pending
    if (!currentUser.isApproved && currentView !== 'pending') {
      setCurrentView('pending');
    }

    switch (currentView) {
      case 'pending':
        return <PendingApprovalView onLogout={handleLogout} />;
      case 'catalog':
        return (
          <CatalogView 
            onProductClick={navigateToProduct} 
            onQuickAdd={handleQuickAdd}
            onUpdateQuantity={handleGridUpdateQuantity}
            cart={cart}
            selectedMainCategory={selectedMainCategory}
            setSelectedMainCategory={setSelectedMainCategory}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            priceListId={currentUser.priceListId}
          />
        );
      case 'categories':
        return (
          <CategoriesView 
            onCategoryClick={(main, sub) => {
              setSelectedMainCategory(main);
              setSelectedSubCategory(sub);
              setCurrentView('catalog');
            }} 
          />
        );
      case 'search':
        return (
          <SearchView 
            onProductClick={navigateToProduct}
            onQuickAdd={handleQuickAdd}
            onUpdateQuantity={handleGridUpdateQuantity}
            cart={cart}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            priceListId={currentUser.priceListId}
          />
        );
      case 'cart':
        return (
          <CartView 
            cart={cart} 
            onUpdateQuantity={updateCartQuantity}
            onRemove={removeFromCart}
            onCheckout={() => setCurrentView('order-success')}
          />
        );
      case 'order-success':
        return (
          <OrderSuccessView 
            cart={cart} 
            onContinue={() => {
              setCart([]);
              setCurrentView('catalog');
            }} 
          />
        );
      case 'account':
        return <AccountView user={currentUser} onLogout={handleLogout} onAdminClick={() => setCurrentView('admin')} />;
      case 'admin':
        return <AdminView users={users} onUpdateUser={updateUserInList} onBack={() => setCurrentView('account')} />;
      case 'details':
        return selectedProduct ? (
          <ProductDetailsView 
            product={selectedProduct} 
            onBack={() => setCurrentView('catalog')} 
            onAddToCart={addToCart}
            priceListId={currentUser.priceListId}
          />
        ) : <div className="p-4">No product selected</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-50 relative overflow-hidden shadow-2xl">
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10 shrink-0">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-black">SC</span>
          SmartCatalog
        </h1>
        {currentUser.isApproved && currentView !== 'cart' && currentView !== 'order-success' && (
          <button onClick={() => setCurrentView('cart')} className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        )}
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-20 bg-slate-50">
        {renderView()}
      </main>

      {currentUser.isApproved && (
        <nav className="bg-white border-t flex justify-around items-center py-2 px-1 fixed bottom-0 left-0 right-0 max-w-md mx-auto z-20 safe-bottom">
          <NavButton active={currentView === 'catalog' || currentView === 'details'} icon={<LayoutGrid size={22} />} label="Catalog" onClick={() => { setCurrentView('catalog'); setSelectedProduct(null); }} />
          <NavButton active={currentView === 'categories'} icon={<List size={22} />} label="Categories" onClick={() => setCurrentView('categories')} />
          <NavButton active={currentView === 'search'} icon={<Search size={22} />} label="Search" onClick={() => setCurrentView('search')} />
          <NavButton active={currentView === 'cart' || currentView === 'order-success'} icon={<ShoppingCart size={22} />} label="Cart" onClick={() => setCurrentView('cart')} />
          <NavButton active={currentView === 'account' || currentView === 'admin'} icon={<UserIcon size={22} />} label="Account" onClick={() => setCurrentView('account')} />
        </nav>
      )}
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ active, icon, label, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center w-16 transition-all duration-200 ${active ? 'text-blue-600 scale-110' : 'text-slate-400'}`}>
    <div className={`${active ? 'bg-blue-50 p-1.5 rounded-xl' : ''}`}>{icon}</div>
    <span className="text-[10px] font-medium mt-1">{label}</span>
  </button>
);

export default App;
