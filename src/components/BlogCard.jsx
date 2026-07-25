import React from 'react';
import './BlogCard.css';

const BlogCard = ({ blog, featured }) => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <article className={`blog-card ${featured ? 'featured' : ''}`}>
            <a href={blog.link} className="card-image-wrapper">
                <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="card-image"
                    loading="lazy"
                />
                <div className="card-overlay">
                    <span className="read-article">Read Article</span>
                </div>
                <span className="card-category">{blog.category}</span>
            </a>
            
            <div className="card-content">
                <div className="card-meta">
                    <span className="card-author">{blog.author}</span>
                    <span className="meta-divider">•</span>
                    <span className="card-date">{formatDate(blog.date)}</span>
                </div>
                
                <h3 className="card-title">
                    <a href={blog.link}>{blog.title}</a>
                </h3>
                
                <p className="card-excerpt">{blog.excerpt}</p>
                
                <a href={blog.link} className="read-more">
                    <span>Read More</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>
        </article>
    );
};

export default BlogCard;
