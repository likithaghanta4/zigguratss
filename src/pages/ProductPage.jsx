import React from 'react'
import ProductDetail from '../components/ProductDetail'
import TrustBar from '../components/TrustBar'

export default function ProductPage() {
  console.log('✓ ProductPage component loaded')
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <ProductDetail />
        <div className="mt-12 sm:mt-16">
          <TrustBar />
        </div>
      </div>
    </div>
  )
}
