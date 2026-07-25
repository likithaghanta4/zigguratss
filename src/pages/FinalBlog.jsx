import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import BlogSection from '../components/BlogSection.jsx';
import ArticlePage from '../components/ArticlePage';


function FinalBlog() {
    return (
        <>
            <HeroSection />
            <BlogSection />
        </>
    );
}

// function App() {
//     return (
//         <Router>
//             <div className="app">
//                 <main>
//                     <Routes>
//                         <Route path="/" element={<FinalBlog />} />
//                         <Route path="/article/:id" element={<ArticlePage />} />
//                     </Routes>
//                 </main>
//             </div>
//         </Router>
//     );
// }

export default FinalBlog;
