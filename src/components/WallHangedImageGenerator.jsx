import React, { useEffect, useRef } from 'react'
import mainBackgroundImage from '../assets/ProductPage-images/mainbackground.png'

/**
 * WallHangedImageGenerator
 * Converts any image into a wall-hung mockup using canvas with dynamic background
 * Fills entire canvas with landscape background and hangs image on the wall
 * One-time setup - any future image will automatically adjust
 */
export default function WallHangedImageGenerator({ src, alt = 'Wall hung image', width = 500, height = 300, onImageReady = null }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !src) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size (landscape orientation for full width usage)
    canvas.width = width
    canvas.height = height

    // Load both the artwork image and background image
    const img = new Image()
    const bgImg = new Image()
    img.crossOrigin = 'anonymous'
    bgImg.crossOrigin = 'anonymous'
    
    let loadedImages = 0
    const totalImages = 2
    
    const renderCanvas = () => {
      // Fill entire canvas with background image (landscape, full coverage)
      // Scale background larger to completely fill and cover entire canvas area
      const bgScale = 1.35  // Scale background 35% larger for complete coverage
      const scaledBgWidth = width * bgScale
      const scaledBgHeight = height * bgScale
      const bgOffsetX = (width - scaledBgWidth) / 2
      const bgOffsetY = (height - scaledBgHeight) / 2
      ctx.drawImage(bgImg, bgOffsetX, bgOffsetY, scaledBgWidth, scaledBgHeight)
      
      // Calculate frame dimensions (smaller, hung on wall)
      const frameWidth = width * 0.38  // 38% of canvas width (slightly smaller)
      const frameHeight = height * 0.58  // 58% of canvas height (slightly smaller)
      const frameX = (width - frameWidth) / 2  // center horizontally
      const frameY = height * 0.15  // positioned in upper part of wall
      
      // Frame border thickness
      const borderThickness = 8
      
      // Draw outer frame border (dark wood)
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(frameX - borderThickness, frameY - borderThickness, frameWidth + borderThickness * 2, frameHeight + borderThickness * 2)
      
      // Draw frame gradient for depth (lighter edges)
      ctx.fillStyle = '#333333'
      ctx.fillRect(frameX - borderThickness + 2, frameY - borderThickness + 2, frameWidth + borderThickness * 2 - 4, borderThickness - 2)
      ctx.fillRect(frameX - borderThickness + 2, frameY + frameHeight + borderThickness - 2, frameWidth + borderThickness * 2 - 4, borderThickness - 4)
      
      // Draw metallic/copper inner border
      ctx.fillStyle = '#c9a96e'
      ctx.fillRect(frameX - 3, frameY - 3, frameWidth + 6, frameHeight + 6)
      
      // Draw white mat/mat board inside frame
      ctx.fillStyle = '#ffffff'
      const matThickness = 8
      ctx.fillRect(frameX, frameY, frameWidth, frameHeight)
      
      // Calculate image dimensions to fit in the mat (auto-adjust)
      const maxWidth = frameWidth - matThickness * 2
      const maxHeight = frameHeight - matThickness * 2
      
      let imgWidth = maxWidth
      let imgHeight = (img.height / img.width) * imgWidth
      
      // If image is too tall, fit by height instead
      if (imgHeight > maxHeight) {
        imgHeight = maxHeight
        imgWidth = (img.width / img.height) * imgHeight
      }
      
      // Center image in the mat
      const imgX = frameX + matThickness + (maxWidth - imgWidth) / 2
      const imgY = frameY + matThickness + (maxHeight - imgHeight) / 2
      
      // Draw the actual artwork image
      ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight)
      
      // Add subtle shadow/depth effect below frame
      const shadowGradient = ctx.createLinearGradient(frameX, frameY + frameHeight + borderThickness, frameX, frameY + frameHeight + borderThickness + 15)
      shadowGradient.addColorStop(0, 'rgba(0,0,0,0.25)')
      shadowGradient.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = shadowGradient
      ctx.fillRect(frameX - borderThickness - 5, frameY + frameHeight + borderThickness, frameWidth + borderThickness * 2 + 10, 15)
      
      // Call callback if provided (for saving the image)
      if (onImageReady) {
        canvas.toBlob((blob) => {
          onImageReady(blob)
        }, 'image/png')
      }
    }
    
    img.onload = () => {
      loadedImages++
      if (loadedImages === totalImages) {
        renderCanvas()
      }
    }
    
    bgImg.onload = () => {
      loadedImages++
      if (loadedImages === totalImages) {
        renderCanvas()
      }
    }
    
    img.src = src
    bgImg.src = mainBackgroundImage
  }, [src, width, height, onImageReady])

  return (
    <canvas
      ref={canvasRef}
      alt={alt}
      style={{
        maxWidth: '100%',
        height: 'auto',
        display: 'block'
      }}
    />
  )
}
