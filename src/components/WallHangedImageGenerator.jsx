import React, { useEffect, useRef } from 'react'
import livingRoomImg from '../assets/rooms/living_room.jpg'

/**
 * WallHangedImageGenerator
 * Converts any artwork image into a real-room wall-hung mockup using high-performance HTML5 canvas
 * Centers and mounts the artwork on realistic luxury interior walls
 */
export default function WallHangedImageGenerator({ 
  src, 
  alt = 'Wall hung image', 
  width = 500, 
  height = 300, 
  bgSrc = livingRoomImg,
  onImageReady = null 
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !src) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set high-DPI canvas size
    canvas.width = width
    canvas.height = height

    const img = new Image()
    const bgImg = new Image()
    img.crossOrigin = 'anonymous'
    bgImg.crossOrigin = 'anonymous'
    
    let loadedImages = 0
    const totalImages = 2
    
    const renderCanvas = () => {
      // Draw luxury interior room background (cover entire canvas)
      ctx.drawImage(bgImg, 0, 0, width, height)
      
      // Calculate realistic artwork wall dimensions (28% of room width)
      const frameWidth = width * 0.28
      const frameHeight = frameWidth * (img.height / img.width || 0.95)
      const frameX = (width - frameWidth) / 2
      const frameY = height * 0.22 // Positioned naturally on center accent wall
      
      const borderThickness = Math.max(3, Math.round(width * 0.012))
      
      // Soft radial ambient spotlight on the wall
      const spotlight = ctx.createRadialGradient(
        width / 2, frameY + frameHeight / 2, 10,
        width / 2, frameY + frameHeight / 2, frameWidth * 1.6
      )
      spotlight.addColorStop(0, 'rgba(255, 245, 220, 0.25)')
      spotlight.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = spotlight
      ctx.fillRect(0, 0, width, height)

      // Cast drop shadow below frame
      ctx.shadowColor = 'rgba(0, 0, 0, 0.65)'
      ctx.shadowBlur = Math.round(width * 0.035)
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = Math.round(width * 0.02)
      
      // Draw outer luxury gold frame border
      ctx.fillStyle = '#c9a96e'
      ctx.fillRect(
        frameX - borderThickness, 
        frameY - borderThickness, 
        frameWidth + borderThickness * 2, 
        frameHeight + borderThickness * 2
      )
      
      // Reset shadow for inner elements
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      
      // Draw white mat board
      const matThickness = Math.max(2, Math.round(width * 0.008))
      ctx.fillStyle = '#fbf9f4'
      ctx.fillRect(frameX, frameY, frameWidth, frameHeight)
      
      // Draw inner artwork canvas
      const innerX = frameX + matThickness
      const innerY = frameY + matThickness
      const innerW = frameWidth - matThickness * 2
      const innerH = frameHeight - matThickness * 2
      
      ctx.drawImage(img, innerX, innerY, innerW, innerH)
      
      // Glass sheen gradient reflection
      const sheen = ctx.createLinearGradient(innerX, innerY, innerX + innerW, innerY + innerH)
      sheen.addColorStop(0, 'rgba(255, 255, 255, 0.15)')
      sheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)')
      sheen.addColorStop(1, 'rgba(255, 255, 255, 0.1)')
      ctx.fillStyle = sheen
      ctx.fillRect(innerX, innerY, innerW, innerH)
      
      // Call callback if provided
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
    bgImg.src = bgSrc
  }, [src, bgSrc, width, height, onImageReady])

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
