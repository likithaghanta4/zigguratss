/**
 * Image Service - Handles image processing, orientation detection, and optimization
 * Supports: Portrait, Landscape, Square, and Wall Hanging orientations
 */

export const ImageOrientations = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
  SQUARE: 'square',
  WALL_HANGING: 'wall_hanging'
}

/**
 * Analyzes image dimensions and determines orientation
 * @param {File} imageFile - Image file to analyze
 * @returns {Promise<Object>} - Object containing orientation, dimensions, and metadata
 */
export const analyzeImageOrientation = async (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      const img = new Image()
      
      img.onload = () => {
        const width = img.naturalWidth
        const height = img.naturalHeight
        const aspectRatio = width / height
        
        let orientation = ImageOrientations.SQUARE
        let displayType = 'standard'
        
        // Determine orientation based on aspect ratio
        if (Math.abs(aspectRatio - 1) < 0.1) {
          orientation = ImageOrientations.SQUARE
          displayType = 'square'
        } else if (aspectRatio > 1.2) {
          // Wide aspect ratio - potential wall hanging or landscape
          if (width > height * 1.5) {
            orientation = ImageOrientations.WALL_HANGING
            displayType = 'wall_hanging'
          } else {
            orientation = ImageOrientations.LANDSCAPE
            displayType = 'landscape'
          }
        } else if (aspectRatio < 0.8) {
          orientation = ImageOrientations.PORTRAIT
          displayType = 'portrait'
        } else {
          orientation = ImageOrientations.LANDSCAPE
          displayType = 'landscape'
        }
        
        resolve({
          orientation,
          displayType,
          width,
          height,
          aspectRatio,
          fileName: imageFile.name,
          fileSize: imageFile.size,
          fileType: imageFile.type,
          orientation_tag: getOrientationTag(orientation)
        })
      }
      
      img.onerror = () => {
        reject(new Error('Failed to load image'))
      }
      
      img.src = event.target.result
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    
    reader.readAsDataURL(imageFile)
  })
}

/**
 * Converts image to optimized format for upload
 * @param {File} imageFile - Image file to convert
 * @param {Object} options - Compression options
 * @returns {Promise<Blob>} - Optimized image blob
 */
export const optimizeImageForUpload = async (imageFile, options = {}) => {
  const maxWidth = options.maxWidth || 2000
  const maxHeight = options.maxHeight || 2000
  const quality = options.quality || 0.85
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      const img = new Image()
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.naturalWidth
        let height = img.naturalHeight
        
        // Scale down if necessary
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }
        
        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => resolve(blob),
          imageFile.type || 'image/jpeg',
          quality
        )
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = event.target.result
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(imageFile)
  })
}

/**
 * Gets orientation tag for API submission
 * @param {string} orientation - Orientation type
 * @returns {string} - API-compatible orientation tag
 */
const getOrientationTag = (orientation) => {
  const tags = {
    [ImageOrientations.PORTRAIT]: 'portrait',
    [ImageOrientations.LANDSCAPE]: 'landscape',
    [ImageOrientations.SQUARE]: 'square',
    [ImageOrientations.WALL_HANGING]: 'wall_hanging'
  }
  return tags[orientation] || 'standard'
}

/**
 * Validates image before upload
 * @param {File} imageFile - Image file to validate
 * @returns {Object} - Validation result
 */
export const validateImage = (imageFile) => {
  const maxSize = 50 * 1024 * 1024 // 50MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff']
  
  const errors = []
  
  if (!imageFile) {
    errors.push('No image file provided')
  }
  
  if (imageFile && imageFile.size > maxSize) {
    errors.push(`File size exceeds ${maxSize / 1024 / 1024}MB limit`)
  }
  
  if (imageFile && !allowedTypes.includes(imageFile.type)) {
    errors.push('Invalid image format. Allowed: JPEG, PNG, WebP, TIFF')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Converts blob to FormData for multipart upload
 * @param {Blob} imageBlob - Image blob
 * @param {string} fieldName - Field name for form data
 * @returns {FormData} - FormData object ready for upload
 */
export const createFormDataFromBlob = (imageBlob, fieldName = 'image') => {
  const formData = new FormData()
  formData.append(fieldName, imageBlob, 'artwork.jpg')
  return formData
}

/**
 * Gets CSS classes based on image orientation
 * @param {string} orientation - Image orientation
 * @returns {string} - CSS class names for styling
 */
export const getOrientationClasses = (orientation) => {
  const classes = {
    [ImageOrientations.PORTRAIT]: 'h-[640px] md:h-[800px]',
    [ImageOrientations.LANDSCAPE]: 'h-[400px] md:h-[500px]',
    [ImageOrientations.SQUARE]: 'h-[500px] md:h-[600px]',
    [ImageOrientations.WALL_HANGING]: 'h-[300px] md:h-[350px]'
  }
  return classes[orientation] || 'h-[500px] md:h-[600px]'
}
