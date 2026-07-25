import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArticleGrid.css';

// Continuous horizontal scrolling carousel component with gold frames
const ArticleGrid = ({ articles }) => {
    const navigate = useNavigate();
    const carouselRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleArticleClick = (id) => {
        navigate(`/article/${id}`);
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        let scrollPosition = 0;
        let animationFrameId = null;

        const scroll = () => {
            if (!isHovering) {
                scrollPosition += 1;
                carousel.scrollLeft = scrollPosition;

                // Infinite loop: when reaching end, jump back to start seamlessly
                if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
                    scrollPosition = 0;
                    carousel.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isHovering]);

    return (
        <div className="article-carousel-section">
            <div 
                className="carousel-container"
                ref={carouselRef}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className="carousel-track">
                    {/* Original articles */}
                    {articles.map((article) => (
                        <div 
                            key={`original-${article.id}`} 
                            className="carousel-item"
                            onClick={() => handleArticleClick(article.id)}
                        >
                            <div className="article-image-wrapper">
                                <img 
                                    src={article.image} 
                                    alt={article.title}
                                    className="article-grid-image"
                                    loading="lazy"
                                    draggable="false"
                                />
                                <div className="article-overlay">
                                    <div className="overlay-content">
                                        <h3 className="overlay-title">{article.title}</h3>
                                        <p className="overlay-category">{article.category}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Duplicate articles for infinite loop effect */}
                    {articles.map((article) => (
                        <div 
                            key={`duplicate-${article.id}`} 
                            className="carousel-item"
                            onClick={() => handleArticleClick(article.id)}
                        >
                            <div className="article-image-wrapper">
                                <img 
                                    src={article.image} 
                                    alt={article.title}
                                    className="article-grid-image"
                                    loading="lazy"
                                    draggable="false"
                                />
                                <div className="article-overlay">
                                    <div className="overlay-content">
                                        <h3 className="overlay-title">{article.title}</h3>
                                        <p className="overlay-category">{article.category}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArticleGrid;
