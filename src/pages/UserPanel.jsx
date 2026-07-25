import './UserPanel.css'
import '../styles/UserPanelIndex.css'
import { useState, useEffect } from 'react'
import { Header } from '../components/HeaderUserPanel'
import { LoginPage } from '../components/LoginPageUser'
import { HomePage } from '../components/HomePage'
import { MyAccount } from '../components/MyAccount'
import { MyInformationDashboard } from '../components/MyInformationDashboard'
import { MyAddress } from '../components/MyAddress'
import { MyPurchases } from '../components/MyPurchases'
import { FeaturedExhibition } from '../components/FeaturedExhibition'
import { BestsellerProducts } from '../components/BestsellerProducts'
import { ArtworkGallery } from '../components/ArtworkGallery'
import { FeaturedArtists } from '../components/FeaturedArtists'
import { AllExpertsPage } from '../components/AllExpertsPage'
import { AllArtworks } from '../components/AllArtworks'
import { ArtifactsGallery } from '../components/ArtifactsGallery'
import { ExhibitionsPage } from '../components/ExhibitionsPage'
import { CheckoutPage } from '../components/CheckoutPage'
import { ConversationsSection } from '../components/ConversationsSection'
import { GalleriesSection } from '../components/GalleriesSection'
import { CollectionsSection } from '../components/CollectionsSection'
import { Footer } from '../components/FooterUser'

function UserPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // Check for logged-in user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
      setCurrentPage('my-information');
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setCurrentPage('my-information');
  };

  const handleLogout = () => {
    // Step 1: Clear localStorage immediately
    localStorage.removeItem('user');
    
    // Step 2: Reset all states in correct order
    setCurrentUser(null);
    setIsLoggedIn(false);
    setSidebarOpen(true);
    setWishlist([]);
    setCart([]);
    setCurrentPage('login');
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const addToWishlist = (item) => {
    setWishlist(prev => {
      const exists = prev.find(w => w.id === item.id);
      if (exists) {
        return prev.filter(w => w.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(c => c.id === item.id);
      if (exists) {
        return prev.map(c => 
          c.id === item.id 
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(c => c.id !== itemId));
  };

  const removeFromWishlist = (itemId) => {
    setWishlist(prev => prev.filter(w => w.id !== itemId));
  };

  // Show login page if not logged in (works on all screen sizes)
  if (!isLoggedIn) {
    return (
      <div key="login-wrapper" style={{ width: '100%', minHeight: '100vh' }}>
        <LoginPage key="login-page-instance" onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Header 
        onNavigate={setCurrentPage} 
        onLogout={handleLogout}
        currentUser={currentUser}
        onSidebarToggle={handleToggleSidebar}
        wishlistCount={wishlist.length}
        cartCount={cart.length}
        wishlist={wishlist}
        cart={cart}
        onRemoveFromWishlist={removeFromWishlist}
        onRemoveFromCart={removeFromCart}
        
      />
      
      {currentPage === 'my-account' && (
        <>
          <MyAccount onNavigate={setCurrentPage} onLogout={handleLogout} />
          <Footer />
        </>
      )}
      
      {currentPage === 'my-information' && (
        <>
          <MyInformationDashboard currentUser={currentUser} sidebarOpen={sidebarOpen} onSidebarToggle={handleToggleSidebar} onLogout={handleLogout} />
          <Footer />
        </>
      )}
      
      {currentPage === 'my-purchases' && (
        <>
          <MyPurchases onNavigate={setCurrentPage} />
          <Footer />
        </>
      )}
      
      
      {currentPage === 'creative-hub' && (
        <>
          <FeaturedExhibition />
          <BestsellerProducts onNavigate={setCurrentPage} />
          <ArtworkGallery onNavigate={setCurrentPage} />
          <FeaturedArtists onNavigate={setCurrentPage} />
          <GalleriesSection />
          <CollectionsSection />
          <ConversationsSection />
          <Footer />
        </>
      )}

      {currentPage === 'all-experts' && (
        <>
          <AllExpertsPage onNavigate={setCurrentPage} />
          <Footer />
        </>
      )}

      {currentPage === 'all-exhibitions' && (
        <>
          <ExhibitionsPage onNavigate={setCurrentPage} />
          <Footer />
        </>
      )}

      {currentPage === 'all-artworks' && (
        <>
          <AllArtworks 
            onNavigate={setCurrentPage} 
            onAddToWishlist={addToWishlist}
            onAddToCart={addToCart}
          />
          <Footer />
        </>
      )}

      {currentPage === 'artifacts-gallery' && (
        <>
          <ArtifactsGallery isFullPage={true} onNavigate={setCurrentPage} />
          <Footer />
        </>
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage 
          onNavigate={setCurrentPage} 
          cart={cart}
          onRemoveFromCart={removeFromCart}
        />
      )}
    </div>
  )
}

export default UserPanel
