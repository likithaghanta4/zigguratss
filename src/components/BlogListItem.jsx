import React from 'react';
import { Link } from 'react-router-dom';
import './BlogListItem.css';

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

// Split text into words wrapped in spans with --w index for staggered reveal
const WordReveal = ({ text }) => {
    const words = text.split(' ');
    return (
        <>
            {words.map((word, i) => (
                <span key={i} className="word" style={{ '--w': i }}>
                    {word}{' '}
                </span>
            ))}
        </>
    );
};

const BlogListItem = ({ blog, reverse, featured }) => {
    return (
        <article className={`post-row ${reverse ? 'reverse' : ''} ${featured ? 'featured' : ''}`}>
            <Link to={`/article/${blog.id}`} className="post-image" aria-label={blog.title}>
                <img src={blog.image} alt={blog.title} loading="lazy" />
            </Link>

            <div className="post-content">
                <div className="post-meta">
                    <span className="post-author">{blog.author}</span>
                    <span className="meta-divider">•</span>
                    <span className="post-date">{formatDate(blog.date)}</span>
                </div>

                <h3 className="post-title"><Link to={`/article/${blog.id}`}><WordReveal text={blog.title} /></Link></h3>
                <p className="post-excerpt"><WordReveal text={blog.excerpt} /></p>

                <Link className="post-readmore" to={`/article/${blog.id}`}>Read Article</Link>
            </div>
        </article>
    );
};

export default BlogListItem;
