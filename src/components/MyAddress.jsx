import React, { useState } from 'react';
import { ChevronRight, Home, X, MapPin } from 'lucide-react';
import map from '../assets/User-images/map.jpg';
import map1 from '../assets/User-images/map1.jpg';
import map3 from '../assets/User-images/3 vali.jpg';

// Add CSS for address page
const styles = `
  .address-container {
    background: linear-gradient(135deg, #fef3c7 0%, #ffffff 50%, #fcd34d 100%);
    min-h-screen;
  }
  
  .address-card {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 4px solid #fcd34d;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .address-card:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 30px 70px rgba(250, 204, 21, 0.4);
    border-color: #f59e0b;
  }
  
  .address-card-image {
    width: 100%;
    height: 420px;
    object-fit: cover;
    background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%);
  }
  
  .address-card-content {
    padding: 32px 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .address-card-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1a1a1a;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }
  
  .address-card-details {
    font-size: 1rem;
    color: #555;
    line-height: 1.7;
    margin-bottom: 20px;
    flex: 1;
  }
  
  .address-buttons {
    display: flex;
    gap: 12px;
    margin-top: auto;
  }
  
  .address-btn {
    flex: 1;
    padding: 14px 20px;
    border: 3px solid #fcd34d;
    background: white;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .address-btn:hover {
    background: #fcd34d;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(250, 204, 21, 0.3);
  }
  
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    animation: fadeIn 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .modal-content {
    background: white;
    border-radius: 24px;
    padding: 40px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.3);
    border: 3px solid #fcd34d;
    animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    border-bottom: 3px solid #fcd34d;
    padding-bottom: 16px;
  }
  
  .modal-title {
    font-size: 1.75rem;
    font-weight: 900;
    color: #1a1a1a;
    letter-spacing: -0.5px;
  }
  
  .form-group {
    margin-bottom: 20px;
    animation: fadeInUp 0.5s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .form-label {
    display: block;
    font-size: 1rem;
    font-weight: 800;
    color: #1a1a1a;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .form-input {
    width: 100%;
    padding: 14px 16px;
    border: 3px solid #e5e7eb;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    background: #f9fafb;
  }
  
  .form-input:focus {
    outline: none;
    border-color: #fcd34d;
    background: white;
    box-shadow: 0 0 0 4px rgba(253, 211, 77, 0.2);
    transform: scale(1.02);
  }
  
  .form-input select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23fcd34d' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
  }
  
  .save-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 900;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    margin-top: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 8px 25px rgba(250, 204, 21, 0.3);
    animation: slideUp 0.5s ease-out 0.3s both;
  }
  
  .save-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(250, 204, 21, 0.5);
  }
  
  .save-btn:active {
    transform: translateY(-2px);
  }
`;

// Artwork data - kept for reference
const artworksData = [
  { id: 1, title: 'Abstract Dreams', artist: 'Aria Chen', image: map, category: 'Strategy & Planning' },
  { id: 2, title: 'Urban Visions', artist: 'Marcus Reid', image: map1, category: 'Design & Development' },
  { id: 3, title: 'Cosmic Energy', artist: 'Sofia Rossi', image: map, category: 'Launch & Growth' },
];

export function MyAddress() {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      location: 'Cecilia Chapman, 711-2880 Nulla St, Manhatan',
      details: 'Primary residence'
    },
    {
      id: 2,
      name: 'Office',
      location: 'Sameer Pally Rd, SA Block, Samplipur, Krishnagur',
      details: 'Work location'
    },
    {
      id: 3,
      name: 'Studio',
      location: 'Art District Lane, Creative Hub, Downtown District',
      details: 'Creative workspace'
    }
  ]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    details: ''
  });

  const handleAddAddress = () => {
    if (formData.name && formData.location) {
      const newAddress = {
        id: addresses.length + 1,
        ...formData
      };
      setAddresses([...addresses, newAddress]);
      setFormData({ name: '', location: '', details: '' });
      setShowModal(false);
    }
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="address-container">
      <style>{styles}</style>
      
      {/* Breadcrumb */}
      <div className="px-4 md:px-8 py-4 md:py-6 flex items-center gap-2 text-xs md:text-sm text-gray-600 max-w-7xl mx-auto w-full">
        <Home className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" />
        <span className="whitespace-nowrap">My Account</span>
        <ChevronRight className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" />
        <span className="text-gray-900 font-medium whitespace-nowrap">My Address</span>
      </div>

      {/* Header with Add Button */}
      <div className="px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 md:gap-8 mb-10 md:mb-16">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-2 md:mb-3" style={{
              textShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(250, 204, 21, 0.3)',
              letterSpacing: '-1px'
            }}>
              My Addresses
            </h1>
            <p className="text-gray-600 text-base md:text-lg">Manage your delivery addresses</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-2xl w-14 h-14 flex-shrink-0"
          >
            +
          </button>
        </div>

        {/* Address Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
          {addresses.map((address, index) => (
            <div key={address.id} className="address-card">
              <img 
                src={index === 0 ? map : index === 1 ? map1 : map3} 
                alt={address.name}
                className="address-card-image"
              />
              <div className="address-card-content">
                <h3 className="address-card-title">{address.name}</h3>
                <p className="address-card-details">
                  <MapPin className="w-4 h-4 inline mr-2 text-amber-500" />
                  {address.location}
                </p>
                {address.details && (
                  <p className="address-card-details text-sm">{address.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Address Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Add New Address</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Full Address</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="Enter your full address"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Landmark (Optional)</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="Nearby landmark"
                value={formData.landmark}
                onChange={(e) => setFormData({...formData, landmark: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="Enter city"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label className="form-label">State</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="Enter state"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Pincode</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({...formData, pincode: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Address Type</label>
              <select 
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              >
                <option value="">Select address type</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Studio">Studio</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button 
              onClick={handleAddAddress}
              className="save-btn"
            >
              Save Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
