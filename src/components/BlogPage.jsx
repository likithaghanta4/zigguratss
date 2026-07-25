import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, TrendingUp, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock Blog Data
const blogData = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    description: "Explore how artificial intelligence is revolutionizing the way we build and design modern web applications.",
    category: "AI",
    author: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    readTime: 8,
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1677442d019cecf8971046226fb015ce3fabf329?w=600&h=400&fit=crop",
    featured: true,
    likes: 234,
    comments: 42
  },
  {
    id: 2,
    title: "Mastering React Hooks: A Complete Guide",
    description: "Deep dive into React Hooks and learn how to write cleaner, more efficient functional components.",
    category: "Development",
    author: "Alex Kumar",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    readTime: 12,
    date: "March 12, 2024",
    image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600&h=400&fit=crop",
    featured: false,
    likes: 189,
    comments: 28
  },
  {
    id: 3,
    title: "Design Trends 2024: Minimalism Meets Motion",
    description: "Discover the latest design trends combining minimalist aesthetics with dynamic micro-interactions.",
    category: "Design",
    author: "Emma Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    readTime: 6,
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    featured: false,
    likes: 312,
    comments: 55
  },
  {
    id: 4,
    title: "Building Scalable Startups: Technical Architecture",
    description: "Essential insights on designing system architecture that grows with your startup's needs.",
    category: "Startups",
    author: "Marcus Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    readTime: 15,
    date: "March 8, 2024",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    featured: false,
    likes: 267,
    comments: 38
  },
  {
    id: 5,
    title: "Business Intelligence: Data-Driven Decision Making",
    description: "Learn how to leverage data analytics to make informed business decisions that drive growth.",
    category: "Business",
    author: "Lisa Anderson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    readTime: 10,
    date: "March 5, 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    featured: false,
    likes: 198,
    comments: 31
  },
  {
    id: 6,
    title: "Machine Learning Models for Production",
    description: "Best practices for deploying and maintaining ML models in production environments.",
    category: "Technology",
    author: "David Park",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    readTime: 14,
    date: "March 3, 2024",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    featured: false,
    likes: 421,
    comments: 67
  },
  {
    id: 7,
    title: "TypeScript Best Practices in 2024",
    description: "Master TypeScript patterns and practices for writing type-safe, maintainable code.",
    category: "Development",
    author: "Nina Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nina",
    readTime: 11,
    date: "February 28, 2024",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    featured: false,
    likes: 276,
    comments: 44
  },
  {
    id: 8,
    title: "UX Psychology: Understanding User Behavior",
    description: "Apply psychological principles to create intuitive and engaging user experiences.",
    category: "Design",
    author: "James White",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    readTime: 9,
    date: "February 25, 2024",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    featured: false,
    likes: 305,
    comments: 52
  },
  {
    id: 9,
    title: "Venture Capital Trends: Funding Your Startup",
    description: "Navigate the VC landscape and learn strategies for securing funding for your startup.",
    category: "Startups",
    author: "Rachel Green",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
    readTime: 13,
    date: "February 22, 2024",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    featured: false,
    likes: 234,
    comments: 39
  },
  {
    id: 10,
    title: "Cloud Infrastructure: AWS vs Azure vs GCP",
    description: "Comprehensive comparison of major cloud platforms and how to choose the right one.",
    category: "Technology",
    author: "Tom Mitchell",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
    readTime: 16,
    date: "February 20, 2024",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    featured: false,
    likes: 389,
    comments: 61
  },
  {
    id: 11,
    title: "Content Marketing Strategy That Works",
    description: "Proven strategies for creating engaging content that drives traffic and conversions.",
    category: "Business",
    author: "Sophie Laurent",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    readTime: 10,
    date: "February 18, 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    featured: false,
    likes: 267,
    comments: 43
  },
  {
    id: 12,
    title: "Natural Language Processing Breakthroughs",
    description: "Explore cutting-edge NLP techniques reshaping how machines understand human language.",
    category: "AI",
    author: "Christopher Lee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher",
    readTime: 12,
    date: "February 15, 2024",
    image: "https://images.unsplash.com/photo-1677442d019cecf8971046226fb015ce3fabf329?w=600&h=400&fit=crop",
    featured: false,
    likes: 445,
    comments: 73
  }
];

const categories = ["All", "Technology", "AI", "Design", "Business", "Startups", "Development"];

// Animated Gradient Text Component
const AnimatedGradientText = ({ children }) => {
  return (
    
      {children}
    
  );
};

// Floating Background Elements Component
const FloatingElements = () => {
  return (
    
      
      
      
    
  );
};

// Hero Section Component
const HeroSection = ({ onExplore }) => {
  return (
    
      
      
      
        
          
            Latest Insights & Blogs
          
        
        
        
          Discover cutting-edge insights, expert tutorials, and industry trends from our community of thought leaders.
        

        
          
            Explore Blogs
          
          
          
            Subscribe
          
        
      
    
  );
};

// Featured Blog Component
const FeaturedBlog = ({ blog }) => {
  return (
    
      
        
          
            
          

          
            
              Featured • {blog.category}
            

            
              {blog.title}
            

            
              {blog.description}
            

            
              
                
                {blog.author}
              
              {blog.date}
              {blog.readTime} min read
            

            
              
                Read Article 
              
              
                
              
            
          
        
      
    
  );
};

// Category Filter Component
const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    
      
        {categories.map((category, index) => (
           onCategoryChange(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          
        ))}
      
    
  );
};

// Search Bar Component
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    
      
        
         onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      
    
  );
};

// Blog Card Component
const BlogCard = ({ blog, index }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    
      
        
          
          
            
              {blog.category}
            
          
        

        
          
            {blog.title}
          

          
            {blog.description}
          

          
            
            
              {blog.author}
              {blog.date}
            
          

          
            {blog.readTime} min read
            
              
                
              
               setIsLiked(!isLiked)}
                className={`transition-colors ${isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                
              
            
          

          
            Read More
            
              
            
          
        
      
    
  );
};

// Trending Blogs Sidebar Component
const TrendingSidebar = ({ blogs }) => {
  return (
    
      
        
          
          Trending
        

        
          {blogs.slice(0, 5).map((blog, index) => (
            
              
                {index + 1}
              
              
                
                  {blog.title}
                
                {blog.readTime} min read
              
            
          ))}
        
      
    
  );
};

// Newsletter Section Component
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setEmail('');
  };

  return (
    
      
        
          
          
        

        
          
            Stay Updated with Our Newsletter
          
          
            Get the latest articles, insights, and industry trends delivered directly to your inbox every week.
          

          
             setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border-2 border-white/30 focus:border-white focus:outline-none backdrop-blur-sm transition-colors duration-300"
              whileFocus={{ scale: 1.02 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            />
            
              {submitted ? 'Subscribed!' : 'Subscribe'}
            
          

          {submitted && (
            
              ✓ Check your email to confirm subscription
            
          )}
        
      
    
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    
      
         onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
        >
          
        

        
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
             onPageChange(page)}
              className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                currentPage === page
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: page * 0.05 }}
            >
              {page}
            
          ))}
        

         onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
        >
          
        
      
    
  );
};

// Reading Progress Indicator Component
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    
  );
};

// Main Blog Page Component
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredBlogs = blogData.filter((blog) => {
    const categoryMatch = activeCategory === 'All' || blog.category === activeCategory;
    const searchMatch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIdx, startIdx + itemsPerPage);

  const featuredBlog = blogData.find((blog) => blog.featured);

  const handleExplore = () => {
    const element = document.getElementById('categories-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    
      
      
      

      {featuredBlog && }

      
         {
            setActiveCategory(category);
            setCurrentPage(1);
          }}
        />
      

      

      
        
          
            
              {paginatedBlogs.map((blog, index) => (
                
              ))}
            
          

          
        
      

      

      

      
        
          
            
              Blog
              
                Latest Articles
                Categories
                Authors
              
            
            
              Company
              
                About
                Contact
                Careers
              
            
            
              Legal
              
                Privacy
                Terms
                Cookies
              
            
          

          
            © 2024 Modern Blog. All rights reserved. Built with React, Tailwind CSS, and Framer Motion.
          
        
      
    
  );
}