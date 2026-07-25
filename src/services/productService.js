/**
 * Product Service - Handles all API calls for artwork/products
 * Base URL can be configured via environment variables
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const productService = {
  // ==================== PRODUCT/ARTWORK ENDPOINTS ====================

  /**
   * Fetch single product by ID
   * GET /api/products/:id
   */
  async fetchProduct(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(id)}`)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.warn('productService.fetchProduct error:', err)
      return {
        id,
        title: 'Divine Tunes-11',
        artist: 'Pradip Sarkar',
        price: '₹1,18,300',
        images: ['https://zigguratss.com/assets/upload/art-1155.jpg'],
        story: 'A contemplative series inspired by meditation and harmony.',
        specs: { size: '45.72 x 50.80 cm', material: 'Acrylic on Canvas' },
      }
    }
  },

  /**
   * Fetch all products with optional filters
   * GET /api/products?page=1&limit=20&artist=name&category=art
   */
  async fetchProducts(filters = {}) {
    try {
      const params = new URLSearchParams()
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key])
      })
      
      const url = params.toString() 
        ? `${API_BASE_URL}/products?${params.toString()}`
        : `${API_BASE_URL}/products`
      
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.fetchProducts error:', err)
      return { products: [], total: 0, page: 1, pages: 1 }
    }
  },

  /**
   * Create new product (requires authentication)
   * POST /api/products
   */
  async createProduct(productData) {
    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(productData)
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.createProduct error:', err)
      throw err
    }
  },

  /**
   * Update existing product (requires authentication)
   * PUT /api/products/:id
   */
  async updateProduct(id, productData) {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(productData)
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.updateProduct error:', err)
      throw err
    }
  },

  /**
   * Delete product (requires authentication)
   * DELETE /api/products/:id
   */
  async deleteProduct(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.deleteProduct error:', err)
      throw err
    }
  },

  // ==================== IMAGE UPLOAD ENDPOINTS ====================

  /**
   * Upload single image with orientation detection
   * POST /api/products/:id/images
   * FormData with fields: image (File), orientation (string), displayType (string)
   */
  async uploadProductImage(productId, imageBlob, orientationData) {
    try {
      const formData = new FormData()
      formData.append('image', imageBlob, 'artwork.jpg')
      formData.append('orientation', orientationData.orientation)
      formData.append('displayType', orientationData.displayType)
      formData.append('width', orientationData.width)
      formData.append('height', orientationData.height)
      formData.append('aspectRatio', orientationData.aspectRatio)

      const res = await fetch(`${API_BASE_URL}/products/${productId}/images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.uploadProductImage error:', err)
      throw err
    }
  },

  /**
   * Upload multiple images with batch processing
   * POST /api/products/:id/images/batch
   * FormData with fields: images[] (Array of Files)
   */
  async uploadProductImagesBatch(productId, imageBlobs) {
    try {
      const formData = new FormData()
      imageBlobs.forEach((blob, index) => {
        formData.append('images', blob.file, `artwork-${index}.jpg`)
        formData.append(`orientations[${index}]`, blob.orientation)
      })

      const res = await fetch(`${API_BASE_URL}/products/${productId}/images/batch`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.uploadProductImagesBatch error:', err)
      throw err
    }
  },

  /**
   * Delete product image
   * DELETE /api/products/:id/images/:imageId
   */
  async deleteProductImage(productId, imageId) {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${productId}/images/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.deleteProductImage error:', err)
      throw err
    }
  },

  /**
   * Get image with specific orientation
   * GET /api/products/:id/images/:imageId?orientation=portrait
   */
  async getProductImage(productId, imageId, orientation = null) {
    try {
      const url = orientation
        ? `${API_BASE_URL}/products/${productId}/images/${imageId}?orientation=${orientation}`
        : `${API_BASE_URL}/products/${productId}/images/${imageId}`
      
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.getProductImage error:', err)
      throw err
    }
  },

  // ==================== ARTIST ENDPOINTS ====================

  /**
   * Fetch artist details
   * GET /api/artists/:artistId
   */
  async fetchArtist(artistId) {
    try {
      const res = await fetch(`${API_BASE_URL}/artists/${artistId}`)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.fetchArtist error:', err)
      return { name: 'Pradip Sarkar', bio: '' }
    }
  },

  /**
   * Fetch all products by artist
   * GET /api/artists/:artistId/products
   */
  async fetchArtistProducts(artistId) {
    try {
      const res = await fetch(`${API_BASE_URL}/artists/${artistId}/products`)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.fetchArtistProducts error:', err)
      return { products: [] }
    }
  },

  // ==================== CART ENDPOINTS ====================

  /**
   * Add item to cart
   * POST /api/cart/items
   */
  async addToCart(productId, quantity = 1) {
    try {
      const res = await fetch(`${API_BASE_URL}/cart/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ productId, quantity })
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.addToCart error:', err)
      throw err
    }
  },

  /**
   * Get cart items
   * GET /api/cart/items
   */
  async getCart() {
    try {
      const res = await fetch(`${API_BASE_URL}/cart/items`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.getCart error:', err)
      return { items: [], total: 0 }
    }
  },

  /**
   * Remove item from cart
   * DELETE /api/cart/items/:cartItemId
   */
  async removeFromCart(cartItemId) {
    try {
      const res = await fetch(`${API_BASE_URL}/cart/items/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.removeFromCart error:', err)
      throw err
    }
  },

  // ==================== ORDER ENDPOINTS ====================

  /**
   * Create order from cart
   * POST /api/orders
   */
  async createOrder(orderData) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(orderData)
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.createOrder error:', err)
      throw err
    }
  },

  /**
   * Fetch order details
   * GET /api/orders/:orderId
   */
  async fetchOrder(orderId) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.fetchOrder error:', err)
      throw err
    }
  },

  /**
   * Get user orders
   * GET /api/orders?page=1&limit=20
   */
  async fetchUserOrders(page = 1, limit = 20) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.fetchUserOrders error:', err)
      return { orders: [], total: 0, page: 1, pages: 1 }
    }
  },

  // ==================== OFFER ENDPOINTS ====================

  /**
   * Submit offer for artwork
   * POST /api/products/:id/offers
   */
  async submitOffer(productId, offerData) {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${productId}/offers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(offerData)
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.submitOffer error:', err)
      throw err
    }
  },

  // ==================== REVIEW & RATING ENDPOINTS ====================

  /**
   * Submit review for product
   * POST /api/products/:id/reviews
   */
  async submitReview(productId, reviewData) {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(reviewData)
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.submitReview error:', err)
      throw err
    }
  },

  /**
   * Fetch reviews for product
   * GET /api/products/:id/reviews
   */
  async fetchReviews(productId) {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${productId}/reviews`)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.fetchReviews error:', err)
      return { reviews: [] }
    }
  },

  // ==================== WISHLIST ENDPOINTS ====================

  /**
   * Add to wishlist
   * POST /api/wishlist/items
   */
  async addToWishlist(productId) {
    try {
      const res = await fetch(`${API_BASE_URL}/wishlist/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ productId })
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.addToWishlist error:', err)
      throw err
    }
  },

  /**
   * Get wishlist items
   * GET /api/wishlist/items
   */
  async getWishlist() {
    try {
      const res = await fetch(`${API_BASE_URL}/wishlist/items`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.getWishlist error:', err)
      return { items: [] }
    }
  },

  /**
   * Remove from wishlist
   * DELETE /api/wishlist/items/:productId
   */
  async removeFromWishlist(productId) {
    try {
      const res = await fetch(`${API_BASE_URL}/wishlist/items/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.removeFromWishlist error:', err)
      throw err
    }
  },

  // ==================== SEARCH & FILTER ENDPOINTS ====================

  /**
   * Search products by keyword
   * GET /api/search?q=keyword&filters[category]=art
   */
  async searchProducts(query, filters = {}) {
    try {
      const params = new URLSearchParams({ q: query })
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(`filters[${key}]`, filters[key])
      })
      
      const res = await fetch(`${API_BASE_URL}/search?${params.toString()}`)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.searchProducts error:', err)
      return { results: [] }
    }
  },

  /**
   * Get product categories
   * GET /api/categories
   */
  async fetchCategories() {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.fetchCategories error:', err)
      return { categories: [] }
    }
  },

  // ==================== PAYMENT ENDPOINTS ====================

  /**
   * Create payment intent
   * POST /api/payments/intent
   */
  async createPaymentIntent(amount, currency = 'INR') {
    try {
      const res = await fetch(`${API_BASE_URL}/payments/intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ amount, currency })
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.createPaymentIntent error:', err)
      throw err
    }
  },

  /**
   * Verify payment
   * POST /api/payments/verify
   */
  async verifyPayment(paymentData) {
    try {
      const res = await fetch(`${API_BASE_URL}/payments/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(paymentData)
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return await res.json()
    } catch (err) {
      console.error('productService.verifyPayment error:', err)
      throw err
    }
  }
}

export default productService
