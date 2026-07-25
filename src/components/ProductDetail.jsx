import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, Maximize2, ShoppingCart, CreditCard, Truck, CheckCircle, X, Share2, MessageCircle, Package, Clock, MapPin, Shield, RefreshCw, Globe, Upload, AlertCircle } from 'lucide-react'
import ArtworkStatement from './ArtworkStatement'
import ReadMore from './ReadMore'
import ProductServices from '../services/productService'
import { analyzeImageOrientation, optimizeImageForUpload, validateImage, getOrientationClasses } from '../services/imageService'
import ArtistCardMini from './ArtistCardMini'
import ArtworkSlider from './ArtworkSlider'
import ArtistSaga from './ArtistSaga'
import WallHangedImageGenerator from './WallHangedImageGenerator'
import wallImage1 from '../assets/ProductPage-images/image 1.png'
import wallImage2 from '../assets/ProductPage-images/image2.png'
import wallImage3 from '../assets/ProductPage-images/image3.png'
import image4 from '../assets/ProductPage-images/image4.png'
import akhImage from '../assets/ProductPage-images/akh.webp'
import screenshotImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 14-57-58.png'
import testImage from '../assets/ProductPage-images/aasbshjdbas.webp'
import testImage2 from '../assets/ProductPage-images/testImage.jpg'
import hansImage from '../assets/ProductPage-images/hans.jpg'


const ART_SRC = 'https://zigguratss.com/assets/upload/art-1155.jpg'

const THUMBS = [
  { src: screenshotImage, alt: 'Divine Tunes-11 - main' },
  { src: screenshotImage, alt: 'Divine Tunes-11 - alternate' },
  { src: screenshotImage, alt: 'Divine Tunes-11 - room view' },
  { src: wallImage1, alt: 'Divine Tunes-11 - wall view 1' },
  { src: wallImage2, alt: 'Divine Tunes-11 - wall view 2' },
  { src: wallImage3, alt: 'Divine Tunes-11 - wall view 3' },
  { src: image4, alt: 'Gallery exhibition' }
]

export default function ProductDetail() {
  console.log('🔧 ProductDetail rendering...')
  const [active, setActive] = useState(0)
  const [tab, setTab] = useState('artwork')
  const [open, setOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 })
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const thumbnailContainerRef = React.useRef(null)
  
  // Image Upload States
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [imageOrientationData, setImageOrientationData] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [uploadedImages, setUploadedImages] = useState([]) // Store uploaded images with orientations
  
  // Gallery State - Dynamic thumbnails
  const [galleryThumbs, setGalleryThumbs] = useState([
    { src: screenshotImage, alt: 'Divine Tunes-11 - main' },
    { src: screenshotImage, alt: 'Divine Tunes-11 - alternate' },
    { src: screenshotImage, alt: 'Divine Tunes-11 - room view' },
    { src: wallImage1, alt: 'Divine Tunes-11 - wall view 1' },
    { src: wallImage2, alt: 'Divine Tunes-11 - wall view 2' },
    { src: wallImage3, alt: 'Divine Tunes-11 - wall view 3' },
    { src: image4, alt: 'Gallery exhibition' },
    { src: testImage, alt: 'Test wall hung', isWallHung: true },
    { src: testImage2, alt: 'Test image 2', isWallHung: true },
    { src: hansImage, alt: 'Test image 3', isWallHung: true }
  ])
  
  const [offerFormData, setOfferFormData] = useState({
    name: '',
    mobile: '',
    country: '',
    email: '',
    offerPrice: ''
  })

  const handleMouseMove = (e) => {
    const elem = e.currentTarget
    const { top, left, width, height } = elem.getBoundingClientRect()
    
    // Calculate mouse position relative to image
    const x = e.clientX - left
    const y = e.clientY - top
    
    // Set magnifier position (where the zoom box appears)
    setMagnifierPosition({ x: e.clientX, y: e.clientY })
    
    // Calculate the position on the image to show in magnifier
    setImagePosition({
      x: (x / width) * 100,
      y: (y / height) * 100
    })
    
    // Set mouse position for zoom transform origin
    setMousePosition({
      x: (x / width) * 100,
      y: (y / height) * 100
    })
  }

  // ==================== IMAGE UPLOAD HANDLERS ====================

  /**
   * Handle image selection and orientation detection
   */
  const handleImageSelect = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate image
    const validation = validateImage(file)
    if (!validation.isValid) {
      setUploadError(validation.errors[0])
      return
    }

    try {
      setUploadError(null)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => setPreviewImage(e.target?.result)
      reader.readAsDataURL(file)

      // Analyze orientation
      const orientationData = await analyzeImageOrientation(file)
      setImageOrientationData({ file, ...orientationData })
    } catch (err) {
      setUploadError(err.message)
    }
  }

  /**
   * Handle image upload with automatic orientation formatting
   */
  const handleUploadImage = async () => {
    if (!imageOrientationData || !previewImage) return

    try {
      setUploadingImage(true)
      setUploadError(null)

      // Create a new uploaded image object with all 4 orientations
      const newUploadedImage = {
        id: `uploaded-${Date.now()}`,
        originalUrl: previewImage, // Base64 preview image
        detectedOrientation: imageOrientationData.orientation,
        originalDimensions: {
          width: imageOrientationData.width,
          height: imageOrientationData.height,
          aspectRatio: imageOrientationData.aspectRatio
        },
        // Display in all 4 orientations
        displayOrientations: {
          portrait: {
            type: 'portrait',
            height: 'h-[640px] md:h-[800px]',
            aspectRatio: 0.7,
            label: 'Portrait View'
          },
          landscape: {
            type: 'landscape',
            height: 'h-[400px] md:h-[500px]',
            aspectRatio: 1.4,
            label: 'Landscape View'
          },
          square: {
            type: 'square',
            height: 'h-[500px] md:h-[600px]',
            aspectRatio: 1.0,
            label: 'Square View'
          },
          wall_hanging: {
            type: 'wall_hanging',
            height: 'h-[300px] md:h-[350px]',
            aspectRatio: 2.0,
            label: 'Wall Hanging View'
          }
        },
        uploadedAt: new Date().toLocaleString()
      }

      // Add to uploaded images state (temporary storage)
      setUploadedImages([...uploadedImages, newUploadedImage])

      // Also add to gallery thumbnails (wall display)
      const newThumbnail = {
        src: previewImage, // Base64 image
        alt: `Uploaded artwork - ${new Date().toLocaleString()}`
      }
      setGalleryThumbs([...galleryThumbs, newThumbnail])

      // Auto-select the newly uploaded image in the main gallery
      setActive(galleryThumbs.length) // Index of the new image

      setUploadSuccess(true)
      setPreviewImage(null)
      setImageOrientationData(null)

      // Reset after 2 seconds
      setTimeout(() => {
        setUploadSuccess(false)
        setShowUploadModal(false)
      }, 2000)
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setUploadingImage(false)
    }
  }

  useEffect(() => {
    console.log('✓ ProductDetail component loaded successfully')
  }, [])

  useEffect(() => {
    let t
    if (added) t = setTimeout(() => setAdded(false), 1200)
    return () => clearTimeout(t)
  }, [added])

  // Scroll thumbnail container to make first thumbnails visible on mobile
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      // Force scroll to 0 to show first items
      thumbnailContainerRef.current.scrollLeft = 0
      
      // Also set via scrollTo with immediate behavior
      setTimeout(() => {
        if (thumbnailContainerRef.current) {
          thumbnailContainerRef.current.scrollTo({ left: 0, behavior: 'instant' })
        }
      }, 50)
    }
  }, [])

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 px-4 md:px-6 lg:px-12">
      {/* Left - Artwork - Takes 70% on desktop */}
      <div className="md:col-span-8 md:pr-4 md:pl-4">
        {/* Image Gallery Section */}
        <div className="space-y-6">
        <div 
          className="relative rounded-lg overflow-visible"
          style={{
            background: 'white',
            border: '1px solid #e2e8f0'
          }}
        >
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="w-full h-[420px] sm:h-[520px] md:h-[640px] bg-white cursor-zoom-in rounded-lg flex items-center justify-center"
            onClick={() => setOpen(true)}
          >
            {galleryThumbs[active]?.isWallHung ? (
              <WallHangedImageGenerator 
                src={galleryThumbs[active].src}
                alt={galleryThumbs[active].alt}
                width={800}
                height={480}
              />
            ) : (
              <img
                src={galleryThumbs[active].src}
                alt={galleryThumbs[active].alt}
                className="w-full h-full object-contain"
                style={{ imageRendering: "auto" }}
              />
            )}
          </motion.div>

          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center space-x-2 sm:space-x-3" style={active >= 3 ? { top: '32px', right: '32px' } : {}}>
            <button aria-label="Zoom" onClick={() => setOpen(true)} className="p-1.5 sm:p-2 bg-white rounded-md shadow-sm border-2 border-[#c9a96e] hover:bg-[#c9a96e] hover:border-[#a87d4d] transition-all">
              <ZoomIn size={16} className="sm:w-[18px] sm:h-[18px] text-black" />
            </button>
            <button aria-label="Fullscreen" onClick={() => setOpen(true)} className="p-1.5 sm:p-2 bg-white rounded-md shadow-sm border-2 border-[#c9a96e] hover:bg-[#c9a96e] hover:border-[#a87d4d] transition-all">
              <Maximize2 size={16} className="sm:w-[18px] sm:h-[18px] text-black" />
            </button>
          </div>
        </div>

        <div ref={thumbnailContainerRef} className="flex md:justify-center items-center space-x-2 sm:space-x-3 md:space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory px-0" style={{ scrollbarWidth: 'none', scrollbarColor: '#c9a96e #f1f5f9' }}>
          {galleryThumbs.map((t, i) => {
            return (
              <button
                key={`${t.src}-${i}`}
                onClick={() => setActive(i)}
                className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-md transition-all cursor-pointer overflow-hidden border-2 snap-center ${i === active ? 'border-[#c9a96e]' : 'border-slate-200'} bg-white hover:border-[#c9a96e]`}
                aria-label={`Thumbnail ${i + 1}`}
              >
                {t.isWallHung ? (
                  <WallHangedImageGenerator 
                    src={t.src} 
                    alt={t.alt}
                    width={320}
                    height={192}
                  />
                ) : (
                  <img 
                    src={t.src} 
                    alt={t.alt} 
                    className="w-full h-full object-contain pointer-events-none bg-white"
                  />
                )}
              </button>
            );
          })}
        </div>
        </div>

        {/* Divine Tunes Box - Mobile Only */}
        <motion.div
          className="md:hidden -mx-4 sm:-mx-0 mt-0 px-4 sm:px-0 py-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full bg-white rounded-lg border-2 border-slate-300 text-slate-900 shadow-lg overflow-hidden">
            {/* Content */}
            <div className="p-4">
              <h1 className="font-serif text-2xl font-bold leading-tight mb-0.5">Divine Tunes-11</h1>
              <p className="text-xs text-slate-600 mb-2">Pradip Sarkar</p>

              {/* Price Section */}
              <div className="mb-2.5 pb-2.5 border-b border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Price</p>
                <p className="text-lg font-bold text-slate-900">₹1,18,300 <span className="text-xs text-slate-500 font-normal">($1,577.33)</span></p>
                <p className="text-xs text-slate-500">Tax included</p>
              </div>

              {/* Artwork Details Grid - Expanded */}
              <div className="mb-2.5 pb-2.5 border-b border-slate-200">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-slate-500 font-medium">Size (inch)</p>
                    <p className="font-bold text-slate-900">32.00 x 30.00</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Size (cm)</p>
                    <p className="font-bold text-slate-900">81.28 x 76.20</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Type</p>
                    <p className="font-bold text-slate-900">Painting</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Year</p>
                    <p className="font-bold text-slate-900">2023</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Medium</p>
                    <p className="font-bold text-slate-900">Acrylic Canvas</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Style</p>
                    <p className="font-bold text-slate-900">Geometric</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Technique</p>
                    <p className="font-bold text-slate-900">Layered</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Category</p>
                    <p className="font-bold text-slate-900">Abstract</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-2.5 space-y-1 text-xs">
                <div className="flex items-center gap-2"><CheckCircle size={12} className="text-green-600 flex-shrink-0" /> <span className="text-slate-700">14-Days Money Back Guarantee</span></div>
                <div className="flex items-center gap-2"><Shield size={12} className="text-blue-600 flex-shrink-0" /> <span className="text-slate-700">100% Secured Payment</span></div>
                <div className="flex items-center gap-2"><CheckCircle size={12} className="text-green-600 flex-shrink-0" /> <span className="text-slate-700">Certificate of Authenticity</span></div>
                <div className="flex items-center gap-2"><Truck size={12} className="text-amber-600 flex-shrink-0" /> <span className="text-slate-700">Free shipping world wide</span></div>
              </div>

              {/* Buttons */}
              <div className="flex gap-1.5">
                <button className="flex-1 py-2.5 px-2 bg-[#c9a96e] hover:bg-[#a87d4d] text-white rounded text-xs font-semibold transition-all flex items-center justify-center gap-1">
                  <ShoppingCart size={13} /> Add
                </button>
                <button onClick={() => setShowOfferModal(true)} className="flex-1 py-2.5 px-2 border-2 border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-white rounded text-xs font-semibold transition-all">
                  Offer
                </button>
                <button className="flex-1 py-2.5 px-2 bg-[#c9a96e] hover:bg-[#a87d4d] text-white rounded text-xs font-semibold transition-all">
                  Buy
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <motion.div 
                className="relative max-w-7xl w-[95%] sm:w-[92%] h-[85%] sm:h-[90%] bg-black rounded-2xl overflow-hidden shadow-2xl" 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setOpen(false)} 
                  className="absolute top-3 right-3 sm:top-5 sm:right-5 z-50 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 hover:bg-[#c9a96e] hover:border-[#c9a96e] text-white transition-all group"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
                
                {/* Zoom Instructions */}
                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-40 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm">
                  <ZoomIn size={14} className="inline mr-2" />
                  Hover to zoom • Click outside to close
                </div>

                <div 
                  className="w-full h-full flex items-center justify-center p-4 sm:p-8 overflow-hidden cursor-zoom-in group"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  <motion.img 
                    src={galleryThumbs[active].src} 
                    alt="fullscreen" 
                    className="max-w-full max-h-full object-contain"
                    animate={{ 
                      scale: isZoomed ? 2.5 : 1
                    }}
                    transition={{ 
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                    style={{
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* About the Artwork Section with Tabs */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 sm:gap-3 bg-slate-50/50 p-1.5 rounded-xl border border-slate-200 overflow-x-auto mb-6">
            <button 
              onClick={() => setTab('artwork')} 
              className={`
                relative px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap rounded-lg
                transition-all duration-300 ease-in-out
                ${tab === 'artwork' 
                  ? 'bg-white text-[#c9a96e] shadow-md shadow-[#c9a96e]/10 border border-[#c9a96e]/20' 
                  : 'text-slate-600 hover:text-[#c9a96e] hover:bg-white/50'
                }
              `}
            >
              <span className="relative z-10">About the Artwork</span>
              {tab === 'artwork' && (
                <span className="absolute inset-0 bg-gradient-to-r from-[#c9a96e]/5 via-[#d4af7a]/5 to-[#c9a96e]/5 rounded-lg animate-pulse"></span>
              )}
            </button>
            
            <button 
              onClick={() => setTab('artist')} 
              className={`
                relative px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap rounded-lg
                transition-all duration-300 ease-in-out
                ${tab === 'artist' 
                  ? 'bg-white text-[#c9a96e] shadow-md shadow-[#c9a96e]/10 border border-[#c9a96e]/20' 
                  : 'text-slate-600 hover:text-[#c9a96e] hover:bg-white/50'
                }
              `}
            >
              <span className="relative z-10">Artist Bio</span>
              {tab === 'artist' && (
                <span className="absolute inset-0 bg-gradient-to-r from-[#c9a96e]/5 via-[#d4af7a]/5 to-[#c9a96e]/5 rounded-lg animate-pulse"></span>
              )}
            </button>
            
            <button 
              onClick={() => setTab('shipping')} 
              className={`
                relative px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap rounded-lg
                transition-all duration-300 ease-in-out
                ${tab === 'shipping' 
                  ? 'bg-white text-[#c9a96e] shadow-md shadow-[#c9a96e]/10 border border-[#c9a96e]/20' 
                  : 'text-slate-600 hover:text-[#c9a96e] hover:bg-white/50'
                }
              `}
            >
              <span className="relative z-10">Shipping & Returns</span>
              {tab === 'shipping' && (
                <span className="absolute inset-0 bg-gradient-to-r from-[#c9a96e]/5 via-[#d4af7a]/5 to-[#c9a96e]/5 rounded-lg animate-pulse"></span>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4 text-sm text-slate-700">
            {/* About the Artwork Tab */}
            {tab === 'artwork' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h3 
                  className="text-3xl md:text-4xl font-serif font-extrabold text-slate-900 mb-6 flex items-center gap-4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.span 
                    className="h-1 bg-gradient-to-r from-[#c9a96e] via-[#b8935f] to-[#c9a96e] transition-all duration-500 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: 60 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  ></motion.span>
                  <span>About the Artwork</span>
                </motion.h3>
                
                <div className="space-y-4">
                  <div className="font-semibold text-base">Divine Tunes-11 Painting series</div>
                  <div>WxH: 32.00 x 30.00 inch (81.28 x 76.20 cm)</div>
                  <div>Type of Artwork: Painting</div>
                  <div>Shipped as: Rolled</div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div><span className="font-semibold">Category:</span> Portrait</div>
                    <div><span className="font-semibold">Style:</span> Geometric</div>
                    <div><span className="font-semibold">Techniques:</span> Acrylic</div>
                    <div><span className="font-semibold">Material used:</span> Canvas</div>
                    <div><span className="font-semibold">Size (WxH):</span> 45.72 x 50.80 cm</div>
                    <div><span className="font-semibold">Medium:</span> Acrylic</div>
                    <div><span className="font-semibold">Selling Options:</span> Original</div>
                    <div><span className="font-semibold">Year:</span> 2018</div>
                    <div className="col-span-full"><span className="font-semibold">Delivery:</span> Stretched</div>
                  </div>

                  <div className="mt-4">This piece is part of the 'DIVINE TUNES' series — a saga of urge whereby depicted deeds inspire others. Love, affection, innocence, bonding and festivity are the root of the sonata that created this ambiance of expression and effect. Art in itself is the final message.</div>

                  <ArtworkStatement title="Lady and Butterflies" defaultOpen={true}>
                    <div className="space-y-3">
                      <p>To further enhance the connection with nature, I have included three butterflies in the painting. Resplendent in darker shades of purple and pink, they flutter gracefully around the woman's face. These ethereal creatures symbolize the delicate balance of life and the interconnectedness between all living beings.</p>

                      <p>"Lady and Butterflies" belongs to the series "In Harmony with Nature." This collection explores the profound connection and interdependence between humans and the natural world. Through my art, I strive to inspire viewers to embrace compassion, appreciate the beauty of nature, and live in harmony with our surroundings.</p>

                      <h5 className="font-extrabold text-xl">Capturing the Awe-Inspiring Connection</h5>
                      <p>With "Lady and Butterflies", I aimed to capture the profound and awe-inspiring connection between humans and nature. The woman's gentle smile and loving gaze reflect her appreciation for the beauty that surrounds her. It is a reminder that we, too, can experience this sense of wonder and unity by embracing our role as caretakers of the earth.</p>

                      <h5 className="font-extrabold text-xl">Living in Harmony with Nature</h5>
                      <p>Through this artwork, I hope to convey the importance of living in harmony with nature. Our actions, both individually and collectively, reverberate through the delicate balance of ecosystems. By fostering empathy for all creatures, we can mitigate the negative impacts of human activities and strive towards a more sustainable coexistence.</p>

                      <p>In this series, I use symmetrical forms—squares, rectangles, checks, and butterflies—to cover the human figures. These geometric shapes represent the pursuit of perfection and balance, encapsulating the aspirations and struggles we all face as individuals striving for fulfillment.</p>
                    </div>
                  </ArtworkStatement>
                </div>
              </motion.div>
            )}

            {/* Artist Bio Tab */}
            {tab === 'artist' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 text-justify"
              >
                <p className="mb-3"><strong>About The Artist</strong></p>
                <p className="mb-3">PRADIP SARKAR was born in Dhanbad, Jharkhand. He is a commerce graduate from Ranchi University and holds a diploma in fine art from the British Institute, Mumbai. Pradip is a gifted artist and a well-known face in the Indian contemporary art world since 1995, with over 70 significant exhibitions.</p>
                
                {/* Artist Images 1 & 2 */}
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80" alt="Artist at work" className="w-full h-48 sm:h-56 md:h-64 object-cover" loading="lazy" />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img src="https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&q=80" alt="Geometric artwork" className="w-full h-48 sm:h-56 md:h-64 object-cover" loading="lazy" />
                  </div>
                </div>

                <p className="mb-3">PRADIP SARKAR is an eminent artist of international repute whose geometric abstraction masterpieces adorn many corporate collections in India and abroad. His works are present in prestigious galleries like Lalit Kala Akademi.</p>
                <p className="mb-3">Pradip's palette is warm, inviting and vibrant. His brush strokes speak of serenity, soothing hues and characteristic vibrancy. His work focuses on spiritual and cultural aspects of society and reflects his philosophy of life, leaning towards music and harmony.</p>
                
                {/* Artist Images 3 & 4 */}
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=400" alt="Artist studio" className="w-full h-48 sm:h-56 md:h-64 object-cover" />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400" alt="Abstract painting" className="w-full h-48 sm:h-56 md:h-64 object-cover" />
                  </div>
                </div>

                <p className="mb-3 mt-4"><strong>Artistic Vision</strong></p>
                <p className="mb-3">His 'Divine Tunes' series represents the pinnacle of his artistic vision, where music, spirituality, and visual art converge. Pradip draws inspiration from classical Indian music, folk traditions, and the vibrant cultural tapestry of India.</p>
                <p className="mb-3">Working primarily with acrylics on canvas, Pradip employs a sophisticated layering technique that gives his paintings remarkable depth and luminosity. Each artwork is meticulously crafted, with layers of acrylic carefully applied to create depth and texture.</p>
                
                {/* Artist Images 5 & 6 */}
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="rounded-lg overflow-hidden shadow-md bg-slate-50">
                    <img src={akhImage} alt="Gallery exhibition" className="w-full h-56 sm:h-64 md:h-72 object-contain" />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400" alt="Art collection" className="w-full h-56 sm:h-64 md:h-72 object-cover" />
                  </div>
                </div>

                <p className="mb-3">Pradip says, "Art is the expression of his own life story... art is divine" — his love for music and harmony shows itself through his works. His paintings are found in collections across Germany, USA, Dubai and India, and in numerous corporate and institutional collections including Lalit Kala Akademi.</p>
              </motion.div>
            )}

            {/* Shipping & Returns Tab */}
            {tab === 'shipping' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Shipping & Returns Policy Header */}
                <div className="border-l-4 border-[#c9a96e] pl-4">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">Shipping & Returns Policy</h3>
                  <p className="text-sm text-slate-600">Worldwide delivery with care</p>
                </div>

                {/* Delivery Timeline Section */}
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-lg mb-4">Delivery Timeline</h4>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-md border border-slate-200">
                      <div className="font-semibold text-slate-900 mb-1">Domestic Shipping</div>
                      <p className="text-sm text-slate-600">5-7 business days</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-md border border-slate-200">
                      <div className="font-semibold text-slate-900 mb-1">International Shipping</div>
                      <p className="text-sm text-slate-600">10-20 business days (varies by country)</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Cost Section */}
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-lg mb-4">Shipping Cost</h4>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-md border border-green-200">
                      <p className="text-sm text-slate-700">
                        <strong className="text-slate-900">Free shipping</strong> included in artwork price
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-md border border-slate-200">
                      <p className="text-sm text-slate-700">
                        Custom duties, octroi & taxes are <strong>customer's responsibility</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Returns Policy Section */}
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-lg mb-4">Returns Policy</h4>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-md border border-slate-200">
                      <p className="text-sm text-slate-700 mb-2">
                        <strong className="text-slate-900">24-hour window</strong> from delivery receipt
                      </p>
                      <p className="text-sm text-slate-700">
                        Returns accepted <strong>only if artwork is damaged</strong>
                      </p>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                      <p className="text-sm text-slate-700">
                        <strong className="text-slate-900">Note:</strong> Commissioned/custom orders are <strong className="text-amber-700">non-returnable</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Premium Packaging Section */}
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-lg mb-4">Premium Packaging</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-md border border-slate-200 text-sm text-slate-700">
                      Reinforced tube packaging
                    </div>
                    
                    <div className="bg-white p-3 rounded-md border border-slate-200 text-sm text-slate-700">
                      Professional framing available
                    </div>
                    
                    <div className="bg-white p-3 rounded-md border border-slate-200 text-sm text-slate-700">
                      Insured delivery option
                    </div>
                    
                    <div className="bg-white p-3 rounded-md border border-slate-200 text-sm text-slate-700">
                      Secure bubble wrap
                    </div>
                  </div>
                </div>

                {/* SKU Info */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">SKU:</span>
                      <span className="px-3 py-1 bg-slate-100 rounded-md font-mono text-xs">ART-1005</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">Stock:</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-md font-semibold text-xs">1 of 1</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Artist Section - Full Width in Left Column */}
        <motion.div 
          className="mt-16 md:col-span-7 flex flex-col items-center justify-center w-full"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
            <motion.h3 
              className="text-4xl md:text-5xl font-serif font-extrabold text-slate-900 mb-8 flex items-center justify-center gap-4 group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.span 
                className="h-1 bg-gradient-to-r from-slate-900 via-emerald-600 to-teal-600 group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-500 rounded-full shadow-lg"
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                whileHover={{ width: 80, height: 6 }}
              ></motion.span>
              <motion.span 
                className="group-hover:text-emerald-600 transition-colors duration-300"
                whileHover={{ scale: 1.05, x: 10 }}
              >
                The Artist
              </motion.span>
            </motion.h3>
            <div className="flex justify-center">
              <ArtistCardMini name="Pradip Sarkar" image="https://res.cloudinary.com/dp2e8mfvm/image/upload/v1753511549/kwcnlfdzx5kebvxrr1gz.jpg" location="Mumbai, India" />
            </div>
          </div>
        </motion.div>

        {/* Artist Saga Section - Left Column Only */}
        <motion.div 
          className="mt-16 md:col-span-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ArtistSaga />
        </motion.div>
      </div>

      {/* Right - Completely Fixed Sidebar - Takes 30% - Desktop Only */}
  <div className="hidden md:flex md:col-span-4 md:fixed md:top-0 md:right-0 md:w-[580px] md:h-screen md:overflow-auto md:justify-center md:items-start md:px-4 md:py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
  className="w-full min-h-[90vh] flex flex-col bg-white rounded-xl border-2 border-slate-300 text-slate-900 shadow-2xl overflow-hidden"
        >
          {/* Top Section - Price & Buttons */}
          <div className="flex-shrink-0 p-5 sm:p-7 border-b border-slate-200">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">Divine Tunes-11</h1>
            <a href="#" className="text-sm text-slate-600 block mt-2 hover:underline">Pradip Sarkar</a>

            <div className="mt-6">
              <div className="text-sm text-slate-500">Price</div>
              <div className="text-xl sm:text-2xl font-semibold mt-1">₹1,18,300 <span className="text-xs sm:text-sm text-slate-500 font-normal">($1,577.33)</span></div>
              <div className="text-xs text-slate-500 mt-1">Tax included</div>
            </div>

            {/* Artwork Details - Added */}
            <div className="mt-4 pt-3 border-t border-slate-200">
              <div className="space-y-2.5 text-xs sm:text-sm mb-3">
                <div>
                  <p className="text-slate-500 font-medium">Size (inch)</p>
                  <p className="font-bold text-slate-900">32.00 x 30.00</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Size (cm)</p>
                  <p className="font-bold text-slate-900">81.28 x 76.20</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Type</p>
                  <p className="font-bold text-slate-900">Painting</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Year</p>
                  <p className="font-bold text-slate-900">2023</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center space-x-2 text-slate-700"><RefreshCw size={14} className="sm:w-4 sm:h-4 flex-shrink-0" /> <span>14-Days Money Back Guarantee</span></div>
              <div className="flex items-center space-x-2 text-slate-700"><Shield size={14} className="sm:w-4 sm:h-4 flex-shrink-0" /> <span>100% Secured Payment</span></div>
              <div className="flex items-center space-x-2 text-slate-700"><CheckCircle size={14} className="sm:w-4 sm:h-4 flex-shrink-0" /> <span>Certificate of Authenticity</span></div>
              <div className="flex items-center space-x-2 text-slate-700"><Truck size={14} className="sm:w-4 sm:h-4 flex-shrink-0" /> <span>Free shipping world wide</span></div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <button className="flex-[0.8] flex items-center justify-center gap-1.5 px-3 py-3 bg-[#c9a96e] hover:bg-[#a87d4d] text-white rounded-lg font-semibold transition-all text-xs sm:text-sm">
                <ShoppingCart size={15} /> <span>Add to Cart</span>
              </button>
              <button 
                onClick={() => setShowOfferModal(true)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 border-2 border-[#c9a96e] rounded-lg text-[#c9a96e] hover:bg-[#c9a96e] hover:text-white font-semibold bg-white transition-all text-xs sm:text-sm"
              >
                <MessageCircle size={15} /> <span>Make an Offer</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 bg-[#c9a96e] hover:bg-[#a87d4d] text-white rounded-lg font-semibold transition-all text-xs sm:text-sm">
                <CreditCard size={15} /> <span>Buy Now</span>
              </button>
            </div>

            {/* Trust Badges - Golden */}
            <div className="mt-8 pt-6 border-t border-slate-200 space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center space-x-2"><RefreshCw size={14} className="text-[#c9a96e] flex-shrink-0" /> <span className="text-[#c9a96e] font-medium">14-Days Money Back Guarantee</span></div>
              <div className="flex items-center space-x-2"><Shield size={14} className="text-[#c9a96e] flex-shrink-0" /> <span className="text-[#c9a96e] font-medium">100% Secured Payment</span></div>
              <div className="flex items-center space-x-2"><CheckCircle size={14} className="text-[#c9a96e] flex-shrink-0" /> <span className="text-[#c9a96e] font-medium">Certificate of Authenticity</span></div>
              <div className="flex items-center space-x-2"><Truck size={14} className="text-[#c9a96e] flex-shrink-0" /> <span className="text-[#c9a96e] font-medium">Free shipping world wide</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Image Upload Modal */}
    <AnimatePresence>
      {showUploadModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/80 via-slate-900/80 to-black/80 backdrop-blur-md p-4"
          onClick={() => setShowUploadModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowUploadModal(false)}
              className="absolute top-5 right-5 z-20 p-2 bg-white/90 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 border border-slate-200"
            >
              <X size={20} strokeWidth={2.5} />
            </motion.button>

            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#c9a96e] via-[#d4af7a] to-[#c9a96e] px-8 py-10 overflow-hidden">
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="relative"
              >
                <h2 className="text-3xl font-extrabold text-white text-center mb-2 tracking-tight drop-shadow-lg">
                  UPLOAD ARTWORK
                </h2>
                <p className="text-white/90 text-center text-sm">
                  Images are automatically formatted based on orientation
                </p>
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative px-8 py-8 max-h-[calc(95vh-200px)] overflow-y-auto">
              {uploadError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{uploadError}</p>
                </motion.div>
              )}

              {uploadSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <p className="text-sm text-green-800 font-medium">✓ Image uploaded successfully!</p>
                </motion.div>
              )}

              {!imageOrientationData ? (
                <div className="space-y-6">
                  <label className="block">
                    <div className="border-2 border-dashed border-[#c9a96e] rounded-lg p-8 text-center cursor-pointer hover:border-[#d4af7a] hover:bg-[#c9a96e]/5 transition-all">
                      <Upload size={48} className="mx-auto mb-4 text-[#c9a96e]" />
                      <p className="text-lg font-semibold text-slate-900 mb-2">Drop your artwork here</p>
                      <p className="text-sm text-slate-600">or click to select (JPEG, PNG, WebP, TIFF)</p>
                      <p className="text-xs text-slate-500 mt-3">Max size: 50MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/tiff"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Preview */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-slate-900">Preview</p>
                    <div className={`bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center ${getOrientationClasses(imageOrientationData.orientation)}`}>
                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                  </div>

                  {/* Orientation Info */}
                  <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 font-medium mb-1">DETECTED ORIENTATION</p>
                      <p className="text-sm font-semibold text-[#c9a96e] capitalize">
                        {imageOrientationData.orientation.replace('_', ' ')}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-slate-600 font-medium mb-1">DIMENSIONS</p>
                        <p className="text-sm text-slate-700">{imageOrientationData.width} × {imageOrientationData.height}px</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-medium mb-1">ASPECT RATIO</p>
                        <p className="text-sm text-slate-700">{imageOrientationData.aspectRatio.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setImageOrientationData(null)
                        setPreviewImage(null)
                      }}
                      disabled={uploadingImage}
                      className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all disabled:opacity-50"
                    >
                      Choose Different
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUploadImage}
                      disabled={uploadingImage}
                      className="flex-1 px-4 py-3 bg-[#c9a96e] hover:bg-[#a87d4d] text-white rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {uploadingImage ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload size={18} />
                          Upload Image
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* YOUR UPLOADED IMAGES SECTION BELOW */}




    {/* Make an Offer Modal */}
    <AnimatePresence>
      {showOfferModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/80 via-slate-900/80 to-black/80 backdrop-blur-md p-4"
          onClick={() => setShowOfferModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="relative bg-gradient-to-br from-white via-slate-50 to-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200/30 to-yellow-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-200/20 to-transparent rounded-full blur-2xl"></div>
            
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowOfferModal(false)}
              className="absolute top-5 right-5 z-20 p-2 bg-white/90 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 border border-slate-200"
              aria-label="Close"
            >
              <X size={20} strokeWidth={2.5} />
            </motion.button>

            {/* Scrollable Content */}
            <div className="relative max-h-[95vh] overflow-y-auto custom-scrollbar">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#c9a96e] via-[#d4af7a] to-[#c9a96e] px-8 py-10 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="relative"
                >
                  <h2 className="text-4xl font-extrabold text-white text-center mb-2 tracking-tight drop-shadow-lg">
                    MAKE AN OFFER
                  </h2>
                  <div className="flex justify-center">
                    <div className="h-1 w-24 bg-white/50 rounded-full"></div>
                  </div>
                </motion.div>
              </div>

              {/* Form Content */}
              <div className="relative px-8 py-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 mb-6 shadow-inner"
                >
                  <p className="text-sm text-slate-700 text-center leading-relaxed">
                    If you think this artwork suits you, but its price is much more than your budget, you can make an offer to the artist and if accepted the artwork will be yours.
                  </p>
                </motion.div>

                <form className="space-y-5" onSubmit={(e) => {
                  e.preventDefault()
                  console.log('Offer submitted:', offerFormData)
                  alert('Your offer has been submitted successfully!')
                  setShowOfferModal(false)
                  setOfferFormData({ name: '', mobile: '', country: '', email: '', offerPrice: '' })
                }}>
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Your Name:
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={offerFormData.name}
                      onChange={(e) => setOfferFormData({ ...offerFormData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c9a96e]/50 focus:border-[#c9a96e] transition-all outline-none text-slate-800 placeholder:text-slate-400 shadow-sm hover:border-slate-300"
                    />
                  </motion.div>

                  {/* Mobile Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Your Mobile No with Country Code:
                    </label>
                    <input
                      type="tel"
                      placeholder="Your mobile number with Country Code"
                      value={offerFormData.mobile}
                      onChange={(e) => setOfferFormData({ ...offerFormData, mobile: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c9a96e]/50 focus:border-[#c9a96e] transition-all outline-none text-slate-800 placeholder:text-slate-400 shadow-sm hover:border-slate-300"
                    />
                  </motion.div>

                  {/* Country Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Country:
                    </label>
                    <select
                      value={offerFormData.country}
                      onChange={(e) => setOfferFormData({ ...offerFormData, country: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c9a96e]/50 focus:border-[#c9a96e] transition-all outline-none text-slate-800 shadow-sm hover:border-slate-300 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.2em] bg-[right_0.7em_center] bg-no-repeat pr-10"
                    >
                      <option value="">Select Your Country</option>
                      <option value="Afghanistan">Afghanistan</option>
                      <option value="Åland Islands">Åland Islands</option>
                      <option value="Albania">Albania</option>
                      <option value="Algeria">Algeria</option>
                      <option value="American Samoa">American Samoa</option>
                      <option value="Andorra">Andorra</option>
                      <option value="Angola">Angola</option>
                      <option value="Anguilla">Anguilla</option>
                      <option value="Antarctica">Antarctica</option>
                      <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Armenia">Armenia</option>
                      <option value="Aruba">Aruba</option>
                      <option value="Australia">Australia</option>
                      <option value="Austria">Austria</option>
                      <option value="Azerbaijan">Azerbaijan</option>
                      <option value="Bahamas">Bahamas</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Barbados">Barbados</option>
                      <option value="Belarus">Belarus</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Belize">Belize</option>
                      <option value="Benin">Benin</option>
                      <option value="Bermuda">Bermuda</option>
                      <option value="Bhutan">Bhutan</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                      <option value="Botswana">Botswana</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Brunei">Brunei</option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Burkina Faso">Burkina Faso</option>
                      <option value="Burundi">Burundi</option>
                      <option value="Cambodia">Cambodia</option>
                      <option value="Cameroon">Cameroon</option>
                      <option value="Canada">Canada</option>
                      <option value="Cape Verde">Cape Verde</option>
                      <option value="Cayman Islands">Cayman Islands</option>
                      <option value="Central African Republic">Central African Republic</option>
                      <option value="Chad">Chad</option>
                      <option value="Chile">Chile</option>
                      <option value="China">China</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Comoros">Comoros</option>
                      <option value="Congo">Congo</option>
                      <option value="Costa Rica">Costa Rica</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Cuba">Cuba</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Djibouti">Djibouti</option>
                      <option value="Dominica">Dominica</option>
                      <option value="Dominican Republic">Dominican Republic</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Egypt">Egypt</option>
                      <option value="El Salvador">El Salvador</option>
                      <option value="Equatorial Guinea">Equatorial Guinea</option>
                      <option value="Eritrea">Eritrea</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Fiji">Fiji</option>
                      <option value="Finland">Finland</option>
                      <option value="France">France</option>
                      <option value="Gabon">Gabon</option>
                      <option value="Gambia">Gambia</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Germany">Germany</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Greece">Greece</option>
                      <option value="Greenland">Greenland</option>
                      <option value="Grenada">Grenada</option>
                      <option value="Guam">Guam</option>
                      <option value="Guatemala">Guatemala</option>
                      <option value="Guinea">Guinea</option>
                      <option value="Guinea-Bissau">Guinea-Bissau</option>
                      <option value="Guyana">Guyana</option>
                      <option value="Haiti">Haiti</option>
                      <option value="Honduras">Honduras</option>
                      <option value="Hong Kong">Hong Kong</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Iceland">Iceland</option>
                      <option value="India">India</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Iran">Iran</option>
                      <option value="Iraq">Iraq</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Israel">Israel</option>
                      <option value="Italy">Italy</option>
                      <option value="Jamaica">Jamaica</option>
                      <option value="Japan">Japan</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Kazakhstan">Kazakhstan</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                      <option value="Laos">Laos</option>
                      <option value="Latvia">Latvia</option>
                      <option value="Lebanon">Lebanon</option>
                      <option value="Lesotho">Lesotho</option>
                      <option value="Liberia">Liberia</option>
                      <option value="Libya">Libya</option>
                      <option value="Liechtenstein">Liechtenstein</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Macao">Macao</option>
                      <option value="Madagascar">Madagascar</option>
                      <option value="Malawi">Malawi</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Maldives">Maldives</option>
                      <option value="Mali">Mali</option>
                      <option value="Malta">Malta</option>
                      <option value="Mauritania">Mauritania</option>
                      <option value="Mauritius">Mauritius</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Moldova">Moldova</option>
                      <option value="Monaco">Monaco</option>
                      <option value="Mongolia">Mongolia</option>
                      <option value="Montenegro">Montenegro</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Mozambique">Mozambique</option>
                      <option value="Myanmar">Myanmar</option>
                      <option value="Namibia">Namibia</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Nicaragua">Nicaragua</option>
                      <option value="Niger">Niger</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="North Korea">North Korea</option>
                      <option value="Norway">Norway</option>
                      <option value="Oman">Oman</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Palestine">Palestine</option>
                      <option value="Panama">Panama</option>
                      <option value="Papua New Guinea">Papua New Guinea</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Peru">Peru</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Poland">Poland</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Puerto Rico">Puerto Rico</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Romania">Romania</option>
                      <option value="Russia">Russia</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Senegal">Senegal</option>
                      <option value="Serbia">Serbia</option>
                      <option value="Seychelles">Seychelles</option>
                      <option value="Sierra Leone">Sierra Leone</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Slovakia">Slovakia</option>
                      <option value="Slovenia">Slovenia</option>
                      <option value="Somalia">Somalia</option>
                      <option value="South Africa">South Africa</option>
                      <option value="South Korea">South Korea</option>
                      <option value="South Sudan">South Sudan</option>
                      <option value="Spain">Spain</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Sudan">Sudan</option>
                      <option value="Suriname">Suriname</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Syria">Syria</option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Tajikistan">Tajikistan</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Togo">Togo</option>
                      <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                      <option value="Tunisia">Tunisia</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Turkmenistan">Turkmenistan</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Uruguay">Uruguay</option>
                      <option value="Uzbekistan">Uzbekistan</option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="Yemen">Yemen</option>
                      <option value="Zambia">Zambia</option>
                      <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Your Email ID:
                    </label>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={offerFormData.email}
                      onChange={(e) => setOfferFormData({ ...offerFormData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c9a96e]/50 focus:border-[#c9a96e] transition-all outline-none text-slate-800 placeholder:text-slate-400 shadow-sm hover:border-slate-300"
                    />
                  </motion.div>

                  {/* Offer Price Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Enter your offer price here:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Offer Price here"
                      value={offerFormData.offerPrice}
                      onChange={(e) => setOfferFormData({ ...offerFormData, offerPrice: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c9a96e]/50 focus:border-[#c9a96e] transition-all outline-none text-slate-800 placeholder:text-slate-400 shadow-sm hover:border-slate-300"
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-500 hover:from-green-600 hover:via-green-700 hover:to-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-base tracking-wide"
                  >
                    Submit
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    type="button"
                    onClick={() => setShowOfferModal(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#c9a96e] via-[#d4af7a] to-[#c9a96e] hover:from-[#a87d4d] hover:via-[#c9a96e] hover:to-[#a87d4d] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-base tracking-wide"
                  >
                    Close
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  )
}
