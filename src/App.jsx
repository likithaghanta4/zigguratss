import React, { useRef, useState } from 'react'
import useLenis from './lib/lenis'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Update from './components/UpdatesSection'


import Text from './components/Text'
import Home from './pages/Home'
import PageTransition from './components/PageTransition'
import { Sliders } from 'lucide-react'
import ProductSlider from './components/ProductSlider'
import Navbar from './components/Navbar'
import GridSection from './components/grid'
import { CustomCursor } from './components/CustomCursor'
import { SmoothScroll } from './components/SmoothScroll'
import Mostviewart from './components/Mostviewart'
import Canvas from './components/Canvas'
import ArtworkProductsPage from './components/ArtworkProductsPage'
import DesignCarousel from './components/DesignCarousel'
import ArtistArtworks from "./components/ArtistArtworks"
import AboutPage from './components/AboutPage';

import Contact from './components/Contact'
import LoginPage from "./components/LoginPage";
import ProductPage from './pages/ProductPage'
import DeliverToOrder from './pages/DeliverToOrder'
import FinalBlog from './pages/FinalBlog'
import ArticlePage from './components/ArticlePage';
import UserPanel from './pages/UserPanel'
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import AdminPanel from './pages/AdminPanel'



const App = () => {
  const [blogs, setBlogs] = useState([])

  const handleAddBlog = (blog) => {
    setBlogs((currentBlogs) => [blog, ...currentBlogs])
  }

  const handleDeleteBlog = (blogId) => {
    setBlogs((currentBlogs) => currentBlogs.filter((blog) => blog.id !== blogId))
  }

  const showToast = (message) => {
    window.alert(message)
  }

  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full flex flex-col">
        <CustomCursor />
        <Navbar /> 
        <main className="flex-grow">
          <PageTransition>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path="/about" element={<AboutPage />} />
          {/* <Route
            path="/blog"
            element={
              <BlogSection
                blogs={blogs}
                onAddBlog={handleAddBlog}
                onDeleteBlog={handleDeleteBlog}
                showToast={showToast}
              />
            }
          /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path='/slider' element={<ProductSlider/>} ></Route>
          <Route path='grid' element={<GridSection/>} ></Route>
          <Route path='most' element={<Mostviewart/>} ></Route>
          <Route path="/artist" element={<Canvas/>} ></Route>
          <Route path="/artwork" element={<ArtworkProductsPage/>} ></Route>
          <Route path='carousel' element={<DesignCarousel/>} ></Route>
          <Route path="/artistartworks" element={<ArtistArtworks/>} ></Route>
          <Route path="/login" element={<LoginPage/>} ></Route>
          <Route path="/Product" element={<ProductPage />} />
          <Route path="/Delivery" element={<DeliverToOrder />} />
          <Route path="/blog" element={<FinalBlog />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/User" element={<UserPanel />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </PageTransition>
    </main>
      {/* Footer would go here */}
      </div>
    </SmoothScroll>
  )
}

export default App