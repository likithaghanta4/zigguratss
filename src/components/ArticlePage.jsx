import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ArticlePage.css';

// Full article content for each blog post
const articleContent = {
    1: {
        title: "Nature Painting: Most Beautiful Nature Paintings on Canvas for Modern Homes",
        author: "SAMEER KARMAKAR",
        date: "2026-02-06",
        category: "Nature Art",
        image: "https://zigguratss.com/assets/upload/blog/zigguratss_23580bd6fc2e2abd7d22e7596bbcbaf8.jpg",
        content: `
            <p>Nature painting is one of the most admired and enduring forms of art, capturing the essence of landscapes, seasons, and the harmony of the natural world. From serene forests and flowing rivers to abstract interpretations of nature's energy, these artworks bring the outdoors inside, transforming any living space into a sanctuary of calm and beauty.</p>
            
            <h2>The Timeless Appeal of Nature Art</h2>
            <p>Throughout history, artists have been drawn to nature as a subject. The Impressionists captured fleeting moments of light on water; the Romantics portrayed nature's sublime power; and contemporary artists continue to find new ways to interpret the natural world. At Zigguratss, we celebrate this rich tradition while embracing modern techniques and perspectives.</p>
            
            <h2>Why Choose Nature Paintings for Your Home?</h2>
            <p>Nature paintings offer more than just visual appeal. Studies have shown that viewing natural scenes can reduce stress, improve mood, and enhance overall well-being. A carefully chosen nature painting can:</p>
            <ul>
                <li>Create a focal point in any room</li>
                <li>Bring color and life to neutral spaces</li>
                <li>Evoke memories of favorite outdoor places</li>
                <li>Complement both traditional and modern decor styles</li>
            </ul>
            
            <h2>Popular Styles of Nature Painting</h2>
            <p>From photorealistic landscapes to abstract interpretations, nature paintings come in countless styles. Some popular categories include:</p>
            <ul>
                <li><strong>Realistic Landscapes:</strong> Detailed depictions of mountains, forests, beaches, and meadows</li>
                <li><strong>Impressionist Nature:</strong> Soft, light-filled scenes capturing atmosphere and mood</li>
                <li><strong>Abstract Nature:</strong> Bold colors and forms inspired by natural elements</li>
                <li><strong>Botanical Art:</strong> Close-up studies of flowers, leaves, and plants</li>
            </ul>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-10-18-56.png" alt="Nature painting style example 1" />
                <img src="/screenshot-from-2026-04-02-10-19-33.png" alt="Nature painting style example 2" />
            </div>
            
            <h2>Choosing the Right Nature Painting</h2>
            <p>When selecting a nature painting for your home, consider the room's existing color scheme, the mood you want to create, and the scale of the wall space. A large statement piece can anchor a living room, while smaller works might be perfect for hallways or bedrooms.</p>
            
            <p>At Zigguratss Artwork LLP, our collection features nature paintings from talented Indian artists, each bringing their unique vision to this timeless genre. Whether you're drawn to the tranquility of a misty morning landscape or the vibrant energy of a tropical scene, you'll find artwork that speaks to your soul.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-10-20-14.png" alt="Nature painting example 3" />
                <img src="/screenshot-from-2026-04-02-10-21-47.png" alt="Nature painting example 4" />
            </div>
        `
    },
    2: {
        title: "Animal Painting: A Powerful Expression of Life and Emotion",
        author: "SAMEER KARMAKAR",
        date: "2026-01-06",
        category: "Animal Art",
        image: "https://zigguratss.com/assets/upload/blog/zigguratss_754fd6d2a7f46b90c234d55828ee2fec.png",
        content: `
            <p>Animal painting is one of the most captivating forms of visual art, representing strength, freedom, movement, and emotional depth. At Zigguratss Artwork LLP, every animal painting is thoughtfully created by skilled artists who understand the profound connection between humans and the animal kingdom.</p>
            
            <h2>The Rich History of Animal Art</h2>
            <p>From the prehistoric cave paintings of Lascaux to the detailed wildlife illustrations of the 19th century, animals have been a central subject in art for millennia. These works serve not only as beautiful decorations but also as documentation of our relationship with the natural world.</p>
            
            <h2>Symbolism in Animal Paintings</h2>
            <p>Animals carry powerful symbolic meanings across cultures:</p>
            <ul>
                <li><strong>Horses:</strong> Freedom, power, and nobility</li>
                <li><strong>Elephants:</strong> Wisdom, strength, and good fortune</li>
                <li><strong>Lions:</strong> Courage, leadership, and royalty</li>
                <li><strong>Birds:</strong> Freedom, spirituality, and transcendence</li>
                <li><strong>Tigers:</strong> Power, passion, and determination</li>
            </ul>
            
            <h2>Styles of Animal Painting</h2>
            <p>Our artists work in various styles to capture the essence of their subjects:</p>
            <ul>
                <li><strong>Realistic Wildlife Art:</strong> Detailed, lifelike portrayals</li>
                <li><strong>Expressionist Animals:</strong> Emotional, bold interpretations</li>
                <li><strong>Abstract Animal Forms:</strong> Simplified shapes capturing movement and energy</li>
                <li><strong>Traditional Indian:</strong> Animals depicted in classical Indian artistic traditions</li>
            </ul>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-10-31-43.png" alt="Animal painting style example 1" />
                <img src="/screenshot-from-2026-04-02-10-32-22.png" alt="Animal painting style example 2" />
            </div>
            
            <h2>Bringing Animal Art Into Your Space</h2>
            <p>An animal painting can transform a room, adding personality and visual interest. Consider the energy you want to bring into your space – the calm presence of an elephant, the dynamic motion of running horses, or the quiet dignity of a portrait-style piece.</p>
            
            <p>Each animal painting at Zigguratss tells a story, inviting viewers to connect with the spirit and beauty of the creature depicted. Explore our collection to find a piece that resonates with your personal connection to the animal kingdom.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-10-32-52.png" alt="Animal painting example 3" />
                <img src="/screenshot-from-2026-04-02-10-33-31.png" alt="Animal painting example 4" />
            </div>
        `
    },
    3: {
        title: "Landscape Painting: Timeless Art That Brings Nature to Life",
        author: "SAMEER KARMAKAR",
        date: "2026-01-02",
        category: "Landscape",
        image: "https://zigguratss.com/assets/upload/blog/zigguratss_5074553d02641db155d65613e29b20bc.jpg",
        content: `
            <p>One of the most appreciated types of visual art is landscape painting, because this style depicts an expansive view of nature that can show all that the environment has to offer: beautiful landscapes, heartfelt emotions and a specific ambiance in time.</p>
            
            <h2>The Evolution of Landscape Art</h2>
            <p>Landscape painting emerged as an independent genre during the Renaissance and has evolved dramatically over centuries. From the idealized vistas of Claude Lorrain to the atmospheric studies of J.M.W. Turner, from the bold colors of the Fauves to contemporary photorealistic landscapes, this genre continues to captivate artists and collectors alike.</p>
            
            <h2>Indian Landscape Traditions</h2>
            <p>India has its own rich tradition of landscape art, from the detailed backgrounds of Mughal miniatures to the luminous works of the Bengal School. Contemporary Indian landscape artists blend these traditions with modern techniques, creating works that celebrate the diverse geography of the subcontinent.</p>
            
            <h2>Elements of a Great Landscape Painting</h2>
            <ul>
                <li><strong>Composition:</strong> How the elements are arranged to guide the eye</li>
                <li><strong>Light:</strong> The quality and direction of illumination</li>
                <li><strong>Atmosphere:</strong> The sense of air, weather, and mood</li>
                <li><strong>Color Harmony:</strong> The palette that creates emotional impact</li>
                <li><strong>Depth:</strong> The sense of space and distance</li>
            </ul>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-10-39-05.png" alt="Landscape painting example 1" />
                <img src="/screenshot-from-2026-04-02-10-40-21.png" alt="Landscape painting example 2" />
            </div>
            
            <h2>Choosing Landscapes for Your Home</h2>
            <p>A landscape painting can set the tone for an entire room. Consider these factors when selecting:</p>
            <ul>
                <li>The overall mood – peaceful, dramatic, energizing</li>
                <li>Color palette compatibility with your decor</li>
                <li>Scale appropriate to your wall space</li>
                <li>Personal connection to the type of landscape depicted</li>
            </ul>
            
            <p>At Zigguratss, our landscape collection spans serene rural scenes, majestic mountain vistas, coastal panoramas, and urban landscapes. Each piece is created by artists who understand the power of place and the emotions that landscapes can evoke.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-10-41-00.png" alt="Landscape painting example 3" />
                <img src="/screenshot-from-2026-04-02-10-42-29.png" alt="Landscape painting example 4" />
            </div>
        `
    },
    4: {
        title: "Why Abstraction Painting Is Perfect for Modern Home Decor",
        author: "SAMER KARMAKAR",
        date: "2026-01-02",
        category: "Abstract",
        image: "https://zigguratss.com/assets/upload/blog/zigguratss_7de9b3e9dc1bc2b2be255db2e761f3ab.jpg",
        content: `
            <p>Art has always been a strong medium for humans to communicate thoughts, feelings and stories that can't be described easily with words. Abstract painting avoids copying the world as it is; instead, it talks to the soul directly with colors and shapes.</p>
            
            <h2>Understanding Abstract Art</h2>
            <p>Abstract art moves away from literal representation to explore form, color, line, and texture as subjects in themselves. Rather than depicting recognizable objects, abstract paintings invite viewers to engage with pure visual elements and find their own meaning and emotional response.</p>
            
            <h2>Why Abstract Art Works in Modern Interiors</h2>
            <p>Contemporary interior design often features clean lines, minimalist furniture, and neutral color palettes. Abstract art complements these spaces beautifully by:</p>
            <ul>
                <li>Adding visual interest without clutter</li>
                <li>Introducing color in a sophisticated way</li>
                <li>Creating conversation pieces</li>
                <li>Allowing for personal interpretation</li>
                <li>Working with various decor styles from minimalist to maximalist</li>
            </ul>
            
            <h2>Types of Abstract Painting</h2>
            <ul>
                <li><strong>Geometric Abstraction:</strong> Precise shapes and patterns</li>
                <li><strong>Lyrical Abstraction:</strong> Flowing, organic forms</li>
                <li><strong>Color Field:</strong> Large areas of flat color</li>
                <li><strong>Expressionist Abstract:</strong> Gestural, emotional brushwork</li>
                <li><strong>Minimalist:</strong> Reduced to essential elements</li>
            </ul>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-10-45-00.png" alt="Abstract painting example 1" />
                <img src="/screenshot-from-2026-04-02-10-45-11.png" alt="Abstract painting example 2" />
            </div>
            
            <h2>Selecting Abstract Art for Your Space</h2>
            <p>When choosing abstract art, trust your instincts. The right piece will speak to you emotionally, even if you can't articulate why. Consider the colors, the energy, and how the work makes you feel. Abstract art is deeply personal – what resonates with one person may leave another cold, and that's perfectly fine.</p>
            
            <p>Zigguratss features abstract works from emerging and established Indian artists, offering a range of styles from bold and vibrant to subtle and contemplative. Explore our collection to find the abstract painting that speaks to your soul.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-10-45-19.png" alt="Abstract painting example 3" />
                <img src="/screenshot-from-2026-04-02-10-47-10.png" alt="Abstract painting example 4" />
            </div>
        `
    },
    5: {
        title: "Chetan Katigar Paintings: A Journey Through Contemporary Indian Art",
        author: "SUPRIYA PAL",
        date: "2026-01-02",
        category: "Artist Feature",
        image: "https://zigguratss.com/assets/upload/blog/zigguratss_4b9363dade97fbb903c0999751461fd4.jpg",
        content: `
            <p>Chetan Katigar is a contemporary Indian artist known for his expressive use of bold colours and emotionally rich compositions. Drawn to art from early childhood, he developed a deep sensitivity for form, storytelling, and Indian cultural symbolism.</p>
            
            <h2>Early Life and Artistic Journey</h2>
            <p>Born and raised in India, Chetan Katigar showed artistic talent from a young age. His formal training combined classical techniques with contemporary approaches, resulting in a distinctive style that honors tradition while embracing modern expression.</p>
            
            <h2>Artistic Style and Themes</h2>
            <p>Katigar's work is characterized by:</p>
            <ul>
                <li><strong>Bold Color Palette:</strong> Vibrant reds, deep blues, and rich golds that capture attention</li>
                <li><strong>Figurative Elements:</strong> Human forms that express emotion and narrative</li>
                <li><strong>Cultural Symbolism:</strong> References to Indian mythology, spirituality, and daily life</li>
                <li><strong>Textural Richness:</strong> Layered paint application creating depth and interest</li>
            </ul>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-10-53-25.png" alt="Chetan Katigar work 1" />
                <img src="/screenshot-from-2026-04-02-10-53-42.png" alt="Chetan Katigar work 2" />
            </div>
            
            <h2>Major Works and Exhibitions</h2>
            <p>Chetan Katigar's paintings have been exhibited in galleries across India and internationally. His work is held in private collections worldwide, appreciated for its emotional depth and visual impact.</p>
            
            <h2>The Significance of Katigar's Art</h2>
            <p>Katigar's paintings represent an important voice in contemporary Indian art. By blending traditional themes with modern techniques, he creates works that speak to both heritage and contemporary experience. His art invites viewers to contemplate universal themes of love, spirituality, and the human condition.</p>
            
            <p>At Zigguratss, we are proud to feature selected works by Chetan Katigar. Each painting offers collectors the opportunity to own a piece of contemporary Indian art history.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-10-55-00.png" alt="Chetan Katigar work 3" />
                <img src="/screenshot-from-2026-04-02-10-55-43.png" alt="Chetan Katigar work 4" />
            </div>
        `
    },
    6: {
        title: "The Power of Thought: Discover Conceptual Painting at Zigguratss",
        author: "SUPRIYA PAL",
        date: "2026-01-02",
        category: "Conceptual",
        image: "https://zigguratss.com/assets/upload/blog/aaa_6915bd5eae304.jpg",
        content: `
            <p>In today's fast-paced world filled with visuals, only a few pieces of art truly stand out – those that make you think. This is the essence of conceptual painting, where the idea, message, and philosophy behind the creation take precedence over mere aesthetics.</p>
            
            <h2>What is Conceptual Art?</h2>
            <p>Conceptual art prioritizes ideas over visual form. While the execution may be beautiful, the primary goal is to convey a concept, provoke thought, or challenge assumptions. The artwork becomes a vehicle for intellectual engagement.</p>
            
            <h2>The History of Conceptual Art</h2>
            <p>Emerging in the 1960s, conceptual art challenged traditional notions of what art could be. Artists like Sol LeWitt, Joseph Kosuth, and Yoko Ono pushed boundaries, declaring that the idea itself could be the artwork. This movement liberated artists to explore new territories of meaning and communication.</p>
            
            <h2>Conceptual Painting Today</h2>
            <p>Contemporary conceptual painters blend visual beauty with intellectual depth. Their works may:</p>
            <ul>
                <li>Comment on social or political issues</li>
                <li>Explore philosophical questions</li>
                <li>Challenge perceptions of reality</li>
                <li>Investigate the nature of art itself</li>
                <li>Express complex emotions or experiences</li>
            </ul>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-10-58-58.png" alt="Conceptual painting example 1" />
                <img src="/screenshot-from-2026-04-02-10-59-19.png" alt="Conceptual painting example 2" />
            </div>
            
            <h2>Living with Conceptual Art</h2>
            <p>Owning a conceptual painting means living with a work that continues to reveal new layers of meaning over time. Unlike purely decorative art, conceptual pieces engage the mind and can transform how you see the world around you.</p>
            
            <p>At Zigguratss, our conceptual art collection features works by Indian artists who combine visual sophistication with intellectual depth. These are paintings that reward contemplation and grow richer with each viewing.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-10-59-35.png" alt="Conceptual painting example 3" />
                <img src="/screenshot-from-2026-04-02-11-00-54.png" alt="Conceptual painting example 4" />
            </div>
        `
    },
    7: {
        title: "Festival of Tooth: The Art of Faith, Culture, and Celebration",
        author: "ADARSH GULERIA",
        date: "2025-10-09",
        category: "Cultural",
        image: "https://zigguratss.com/assets/upload/blog/tooth_68e77e6d50c3b.jpg",
        content: `
            <p>Art has always been a way for people to connect with God and express their feelings. Colours, textures, and imagination make it look like culture, history, and belief. The painting 'Festival of Tooth' by Sanjana Patel is a beautiful example of this connection.</p>
            
            <h2>The Sacred Festival</h2>
            <p>The Esala Perahera, also known as the Festival of the Tooth, is one of the oldest and grandest Buddhist festivals. Held annually in Kandy, Sri Lanka, this spectacular procession honors the Sacred Tooth Relic of Buddha, housed in the Temple of the Tooth.</p>
            
            <h2>Artist's Interpretation</h2>
            <p>Sanjana Patel's painting captures the vibrant energy and spiritual significance of this ancient festival. Through her artistic vision, viewers can experience:</p>
            <ul>
                <li>The magnificent elephants adorned in ceremonial dress</li>
                <li>The rhythm of traditional dancers and drummers</li>
                <li>The devotion of thousands of pilgrims</li>
                <li>The interplay of torchlight and darkness</li>
            </ul>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-11-07-32.png" alt="Festival of Tooth artwork 1" />
                <img src="/screenshot-from-2026-04-02-11-07-54.png" alt="Festival of Tooth artwork 2" />
            </div>
            
            <h2>Cultural Significance</h2>
            <p>This artwork represents more than a festival – it embodies the living connection between art, spirituality, and cultural heritage. The painting serves as a window into traditions that have been celebrated for centuries and continue to inspire faith and community.</p>
            
            <h2>Art as Cultural Bridge</h2>
            <p>Works like 'Festival of Tooth' play an important role in preserving and sharing cultural heritage. They allow viewers from any background to experience the beauty and meaning of traditions they might never encounter otherwise.</p>
            
            <p>At Zigguratss, we believe in the power of art to connect cultures and celebrate diversity. This painting exemplifies our commitment to showcasing works that honor tradition while speaking to universal human experiences.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-11-08-16.png" alt="Festival of Tooth artwork 3" />
                <img src="/screenshot-from-2026-04-02-11-08-52.png" alt="Festival of Tooth artwork 4" />
            </div>
        `
    },
    8: {
        title: "Deepshikha Bishoyi: Transforming Imagination Into Living Art",
        author: "ADARSH GULERIA",
        date: "2025-09-27",
        category: "Artist Feature",
        image: "https://zigguratss.com/assets/upload/blog/deepshikha_bishnoyi_68d7bff108e28.jpg",
        content: `
            <p>Art has the remarkable power to transport us beyond the ordinary, inviting us into worlds built from imagination, emotion, and narrative. Few contemporary artists accomplish this as effortlessly as Deepshikha Bishoyi.</p>
            
            <h2>The Artist's Journey</h2>
            <p>Deepshikha Bishoyi's path to becoming a recognized artist is marked by dedication, continuous learning, and an unwavering commitment to her creative vision. Her work reflects years of honing her craft while staying true to her unique artistic voice.</p>
            
            <h2>Artistic Philosophy</h2>
            <p>Bishoyi believes that art should do more than please the eye – it should stir the soul. Her paintings are characterized by:</p>
            <ul>
                <li><strong>Narrative Depth:</strong> Each work tells a story or captures a moment of significance</li>
                <li><strong>Emotional Resonance:</strong> Colors and compositions chosen to evoke specific feelings</li>
                <li><strong>Technical Excellence:</strong> Mastery of medium that serves the artistic vision</li>
                <li><strong>Imaginative Freedom:</strong> Willingness to explore beyond conventional boundaries</li>
            </ul>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-11-25-18.png" alt="Deepshikha Bishoyi artwork 1" />
                <img src="/screenshot-from-2026-04-02-11-25-30.png" alt="Deepshikha Bishoyi artwork 2" />
            </div>
            
            <h2>Themes and Subjects</h2>
            <p>Deepshikha's work often explores themes of femininity, nature, mythology, and the human experience. Her paintings invite viewers to pause, reflect, and find personal meaning in her visual narratives.</p>
            
            <h2>Recognition and Collections</h2>
            <p>Bishoyi's paintings have earned recognition from critics and collectors alike. Her work is featured in private collections across India and abroad, appreciated for both its beauty and its depth.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-11-25-38.png" alt="Deepshikha Bishoyi artwork 3" />
                <img src="/screenshot-from-2026-04-02-11-25-48.png" alt="Deepshikha Bishoyi artwork 4" />
            </div>
            
            <p>Zigguratss is honored to feature Deepshikha Bishoyi's work. Her paintings represent the best of contemporary Indian art – technically accomplished, emotionally engaging, and distinctively personal.</p>
        `
    },
    9: {
        title: "Celebrating Creativity: Discover Modern Art & Original Paintings at Zigguratss Artwork LLP",
        author: "AJAY SINGH, CO-FOUNDER",
        date: "2025-09-24",
        category: "Modern Art",
        image: "https://zigguratss.com/assets/upload/blog/Rust_at_dusk_68d3a1706984b.jpg",
        content: `
            <p>In today's fast-transit world, art is one of the most influential forms of expression. It reflects culture, emotions and the specific vision of every artist. Whether it is a mixture of modern art, traditional pieces, or both, at Zigguratss we celebrate the full spectrum of creative expression.</p>
            
            <h2>Our Mission</h2>
            <p>Zigguratss Artwork LLP was founded with a clear purpose: to connect talented Indian artists with art lovers who appreciate quality, authenticity, and creative vision. We believe that original art should be accessible to everyone who values it.</p>
            
            <h2>What Makes Our Collection Special</h2>
            <ul>
                <li><strong>100% Original:</strong> Every piece is an authentic work by the artist</li>
                <li><strong>Diverse Styles:</strong> From traditional to contemporary, figurative to abstract</li>
                <li><strong>Emerging & Established Artists:</strong> Discover new talents alongside recognized names</li>
                <li><strong>Quality Assurance:</strong> Each artwork meets our standards for technique and presentation</li>
            </ul>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-11-27-10.png" alt="Modern art collection 1" />
                <img src="/screenshot-from-2026-04-02-11-27-30.png" alt="Modern art collection 2" />
            </div>
            
            <h2>Supporting Indian Artists</h2>
            <p>When you purchase from Zigguratss, you're directly supporting Indian artists. We work closely with our artists, ensuring fair compensation and helping them reach audiences who will appreciate their work.</p>
            
            <h2>Finding Your Perfect Piece</h2>
            <p>Whether you're a first-time buyer or an experienced collector, our team is here to help you find artwork that resonates with your taste and fits your space. Art should be a joy to live with – let us help you discover that joy.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-11-27-51.png" alt="Modern art collection 3" />
                <img src="/screenshot-from-2026-04-02-11-27-57.png" alt="Modern art collection 4" />
            </div>
            
            <p>Explore our collection and become part of the Zigguratss community of art lovers who believe in the power of original, handcrafted artwork to transform spaces and lives.</p>
        `
    },
    10: {
        title: "Discover the Soul of Modern Art: Authentic Indian Paintings at Zigguratss Artwork LLP",
        author: "ZIGGURATSS",
        date: "2025-09-09",
        category: "Indian Art",
        image: "https://zigguratss.com/assets/upload/blog/blog-84.jpg",
        content: `
            <p>In the vibrant tapestry of Indian artistry, Zigguratss Artwork LLP stands as a distinguished beacon, illuminating the world of modern art with its exceptional collection of art and painting.</p>
            
            <h2>The Indian Art Renaissance</h2>
            <p>India's contemporary art scene is experiencing a remarkable renaissance. A new generation of artists is blending traditional techniques with modern sensibilities, creating works that honor heritage while speaking to present-day experiences.</p>
            
            <h2>What Defines Authentic Indian Art</h2>
            <ul>
                <li><strong>Cultural Roots:</strong> Connection to India's rich artistic traditions</li>
                <li><strong>Individual Vision:</strong> Each artist's unique perspective and voice</li>
                <li><strong>Technical Skill:</strong> Mastery of chosen medium and technique</li>
                <li><strong>Emotional Truth:</strong> Genuine expression rather than commercial formula</li>
            </ul>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-11-29-24.png" alt="Indian art collection 1" />
                <img src="/screenshot-from-2026-04-02-11-29-37.png" alt="Indian art collection 2" />
            </div>
            
            <h2>Our Curatorial Approach</h2>
            <p>At Zigguratss, we carefully curate our collection to showcase the diversity and depth of Indian art. Our selection process considers artistic merit, authenticity, and the ability of each work to connect with viewers on an emotional level.</p>
            
            <h2>Investing in Indian Art</h2>
            <p>Beyond the joy of ownership, Indian art represents a meaningful investment. As the global art market increasingly recognizes Indian artists, early collectors have the opportunity to acquire significant works at accessible prices.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-11-29-53.png" alt="Indian art collection 3" />
                <img src="/screenshot-from-2026-04-02-11-30-58.png" alt="Indian art collection 4" />
            </div>
            
            <p>We invite you to explore the soul of modern Indian art through our collection. Each painting tells a story, reflects a vision, and offers the opportunity to own a piece of India's creative spirit.</p>
        `
    },
    11: {
        title: "Transform Your Home with Fine Artwork From Zigguratss Artwork LLP",
        author: "ZIGGURATSS",
        date: "2025-08-29",
        category: "Home Decor",
        image: "https://zigguratss.com/assets/upload/blog/blog-83.jpeg",
        content: `
            <p>Discover the perfect paintings for houses that reflect your personality and elevate your space. In today's modern homes, décor goes beyond furniture and lighting – artwork is what brings it all together.</p>
            
            <h2>The Power of Art in Interior Design</h2>
            <p>A well-chosen painting can transform a room in ways that other decor elements cannot. Art adds personality, creates focal points, and sets the emotional tone of a space. It's the finishing touch that turns a house into a home.</p>
            
            <h2>Choosing Art for Different Spaces</h2>
            <ul>
                <li><strong>Living Room:</strong> Make a statement with larger pieces or curated gallery walls</li>
                <li><strong>Bedroom:</strong> Choose calming subjects and soothing color palettes</li>
                <li><strong>Dining Room:</strong> Consider still life or abstract works that encourage conversation</li>
                <li><strong>Home Office:</strong> Select inspiring pieces that stimulate creativity</li>
                <li><strong>Entryway:</strong> Welcome guests with art that reflects your style</li>
            </ul>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-11-33-29.png" alt="Home decor example 1" />
                <img src="/screenshot-from-2026-04-02-11-33-45.png" alt="Home decor example 2" />
            </div>
            
            <h2>Size and Scale Considerations</h2>
            <p>The right size painting depends on your wall space and furniture arrangement. As a general rule, artwork should take up about two-thirds to three-quarters of the available wall space above a piece of furniture.</p>
            
            <h2>Building a Collection Over Time</h2>
            <p>You don't need to fill every wall at once. Many collectors prefer to acquire pieces gradually, choosing each work with care. This approach results in a more personal and meaningful collection.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-11-34-03.png" alt="Home decor example 3" />
                <img src="/screenshot-from-2026-04-02-11-34-20.png" alt="Home decor example 4" />
            </div>
            
            <p>Let Zigguratss help you find the perfect artwork to transform your home. Our collection offers options for every taste, space, and budget – all featuring original works by talented Indian artists.</p>
        `
    },
    12: {
        title: "Anupam Pal: Weaving Myth, Music & Modernity on Canvas",
        author: "ZIGGURATSS",
        date: "2025-06-23",
        category: "Artist Feature",
        image: "https://res.cloudinary.com/dp2e8mfvm/image/upload/v1750498194/vu97eyc10s7f86f8yqbk.png",
        content: `
            <p>Anupam Pal, born on October 11, 1991, in Jamshedpur, India, is a contemporary artist whose work seamlessly blends Indian mythology, spirituality, and contemporary abstraction.</p>
            
            <h2>Artistic Background</h2>
            <p>Growing up in the culturally rich environment of Jamshedpur, Anupam was exposed to diverse artistic influences from an early age. His formal training refined his technical skills while his personal exploration led him to develop a distinctive visual language.</p>
            
            <h2>The Intersection of Tradition and Modernity</h2>
            <p>Pal's work is distinguished by its ability to bridge ancient Indian themes with contemporary artistic expression. His paintings feature:</p>
            <ul>
                <li><strong>Mythological References:</strong> Gods, goddesses, and epic narratives reimagined</li>
                <li><strong>Musical Elements:</strong> The rhythm and flow of Indian classical music visualized</li>
                <li><strong>Modern Techniques:</strong> Contemporary approaches to color, composition, and form</li>
                <li><strong>Spiritual Depth:</strong> Exploration of consciousness and transcendence</li>
            </ul>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-11-37-44.png" alt="Anupam Pal artwork 1" />
                <img src="/screenshot-from-2026-04-02-11-38-04.png" alt="Anupam Pal artwork 2" />
            </div>
            
            <h2>Signature Style</h2>
            <p>Anupam Pal's paintings are immediately recognizable for their vibrant colors, dynamic compositions, and the seamless integration of figurative and abstract elements. His work invites contemplation while celebrating the visual richness of Indian artistic traditions.</p>
            
            <h2>Recognition and Impact</h2>
            <p>Pal's work has been featured in numerous exhibitions and is held in private collections throughout India and internationally. He represents the exciting potential of contemporary Indian art to speak to global audiences while remaining rooted in cultural heritage.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-11-38-16.png" alt="Anupam Pal artwork 3" />
                <img src="/screenshot-from-2026-04-02-11-38-36.png" alt="Anupam Pal artwork 4" />
            </div>
            
            <p>Discover Anupam Pal's captivating works in our collection and experience the unique fusion of myth, music, and modernity that defines his artistic vision.</p>
        `
    },
    13: {
        title: "Rajasekharan Parameswaran – The Painter Who Turned Devotion into a Guinness World Record",
        author: "ZIGGURATSS",
        date: "2025-06-23",
        category: "Artist Feature",
        image: "https://res.cloudinary.com/dp2e8mfvm/image/upload/v1750496955/zerej8ort1p4pxcpx0v3.png",
        content: `
            <p>In a world where art often bends toward trends, Rajasekharan Parameswaran stands out as an artist who remains deeply connected to his roots—both cultural and spiritual.</p>
            
            <h2>A Record-Breaking Achievement</h2>
            <p>Rajasekharan earned a place in the Guinness Book of World Records through his extraordinary dedication to his craft. His achievement demonstrates that devotion, persistence, and artistic vision can lead to recognition on the world stage.</p>
            
            <h2>Artistic Philosophy</h2>
            <p>For Rajasekharan, art is not merely a profession but a form of devotion. His work is characterized by:</p>
            <ul>
                <li><strong>Spiritual Themes:</strong> Deep engagement with Hindu mythology and spirituality</li>
                <li><strong>Technical Mastery:</strong> Exceptional skill developed through years of dedicated practice</li>
                <li><strong>Cultural Authenticity:</strong> Genuine connection to Indian artistic traditions</li>
                <li><strong>Meditative Process:</strong> Art-making as a spiritual practice</li>
            </ul>
            
            <h2>The Journey to Recognition</h2>
            <p>Rajasekharan's path to the world record was paved with countless hours of work, unwavering focus, and deep commitment to his artistic vision. His achievement serves as an inspiration to artists everywhere who pursue their craft with dedication.</p>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-11-40-11.png" alt="Rajasekharan Parameswaran artwork 1" />
                <img src="/screenshot-from-2026-04-02-11-40-20.png" alt="Rajasekharan Parameswaran artwork 2" />
            </div>
            
            <h2>Legacy and Influence</h2>
            <p>Beyond the world record, Rajasekharan's contribution lies in demonstrating that traditional Indian art forms remain vibrant and relevant. His work bridges generations, honoring ancient techniques while creating works that speak to contemporary audiences.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-11-40-34.png" alt="Rajasekharan Parameswaran artwork 3" />
                <img src="/screenshot-from-2026-04-02-11-40-42.png" alt="Rajasekharan Parameswaran artwork 4" />
            </div>
            
            <p>Explore works by this remarkable artist at Zigguratss and experience the devotion that earned him a place in the record books.</p>
        `
    },
    14: {
        title: "Mrinal Dutt: A Self-Taught Maestro of Indian Figurative Art",
        author: "ZIGGURATSS",
        date: "2025-06-03",
        category: "Artist Feature",
        image: "https://res.cloudinary.com/dp2e8mfvm/image/upload/v1748944747/c5lmca9omsv4oubltugh.jpg",
        content: `
            <p>In an age where formal education is often seen as the gateway to professional mastery, Mrinal Dutt defies the norm. A self-taught painter from Ahmedabad, India, Dutt's journey into the art world is both unconventional and inspiring.</p>
            
            <h2>The Self-Taught Path</h2>
            <p>Mrinal Dutt's artistic education came not from institutions but from observation, practice, and an insatiable curiosity about the human form. His journey demonstrates that talent combined with determination can overcome the lack of formal training.</p>
            
            <h2>Mastery of Figurative Art</h2>
            <p>Dutt's figurative paintings are celebrated for their:</p>
            <ul>
                <li><strong>Anatomical Accuracy:</strong> Precise understanding of the human form</li>
                <li><strong>Emotional Expression:</strong> Faces and bodies that convey deep feeling</li>
                <li><strong>Compositional Skill:</strong> Thoughtful arrangement that guides the viewer's eye</li>
                <li><strong>Color Sensitivity:</strong> Palettes that enhance mood and meaning</li>
            </ul>
            
            <h2>Themes and Subjects</h2>
            <p>Mrinal's work often explores themes of human connection, introspection, and the beauty of everyday moments. His subjects feel real and relatable, inviting viewers to see themselves in the painted figures.</p>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-11-42-26.png" alt="Mrinal Dutt artwork 1" />
                <img src="/screenshot-from-2026-04-02-11-42-34.png" alt="Mrinal Dutt artwork 2" />
            </div>
            
            <h2>An Inspiring Example</h2>
            <p>For aspiring artists, Mrinal Dutt's story offers hope and encouragement. His success proves that passion, practice, and perseverance can lead to artistic excellence regardless of formal credentials.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-11-42-42.png" alt="Mrinal Dutt artwork 3" />
                <img src="/screenshot-from-2026-04-02-11-42-49.png" alt="Mrinal Dutt artwork 4" />
            </div>
            
            <p>Discover Mrinal Dutt's remarkable figurative paintings at Zigguratss and experience the work of an artist who proves that mastery comes from within.</p>
        `
    },
    15: {
        title: "Fine Art: A Journey Through History and Modernity",
        author: "ZIGGURATSS",
        date: "2025-09-24",
        category: "Fine Art",
        image: "https://zigguratss.com/assets/upload/blog/Rust_at_dusk_68d3a1d736832.jpg",
        content: `
            <p>Fine art has always been a beacon of human creativity, a testament to our ability to transcend the mundane and capture the sublime. Whether through the delicate brushstrokes of a Renaissance masterpiece or the bold abstractions of contemporary works, fine art continues to inspire and challenge us.</p>
            
            <h2>What Defines Fine Art?</h2>
            <p>Fine art is created primarily for aesthetic and intellectual purposes, valued for its beauty and meaningfulness. Unlike applied or decorative arts, fine art exists for its own sake – to express ideas, emotions, and the artist's unique vision.</p>
            
            <h2>The Evolution of Fine Art</h2>
            <ul>
                <li><strong>Classical Period:</strong> Emphasis on idealized beauty and technical perfection</li>
                <li><strong>Renaissance:</strong> Rebirth of classical ideals with new techniques</li>
                <li><strong>Romanticism:</strong> Emotion, nature, and individual expression</li>
                <li><strong>Modernism:</strong> Breaking with tradition, exploring new forms</li>
                <li><strong>Contemporary:</strong> Diverse approaches, global perspectives</li>
            </ul>
            
            <h2>Fine Art in India</h2>
            <p>India has a rich tradition of fine art spanning millennia. From the cave paintings of Ajanta to the contemporary galleries of Mumbai and Delhi, Indian artists have contributed significantly to the global fine art conversation.</p>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-11-45-36.png" alt="Fine art collection 1" />
                <img src="/screenshot-from-2026-04-02-11-46-12.png" alt="Fine art collection 2" />
            </div>
            
            <h2>Collecting Fine Art</h2>
            <p>Building a fine art collection is a rewarding journey. Whether you're drawn to traditional techniques or contemporary experimentation, the key is to collect what moves you. Fine art should enhance your life and environment.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-11-46-21.png" alt="Fine art collection 3" />
                <img src="/screenshot-from-2026-04-02-11-46-31.png" alt="Fine art collection 4" />
            </div>
            
            <p>At Zigguratss, we offer a curated selection of fine art by Indian artists, spanning styles and subjects to suit diverse tastes. Begin or enhance your collection with works that will bring lasting beauty and meaning to your space.</p>
        `
    },
    16: {
        title: "Abstract Art: A Journey of Expression and Evolution",
        author: "AJAY SINGH, CO-FOUNDER",
        date: "2024-04-15",
        category: "Abstract",
        image: "https://res.cloudinary.com/dp2e8mfvm/image/upload/v1753375409/l1es8so5vlplt40duviu.jpg",
        content: `
            <p>Abstract art stands as a testament to human creativity, transcending the boundaries of traditional representation to convey emotions, ideas, and concepts in a profoundly personal and experimental manner.</p>
            
            <h2>The Birth of Abstraction</h2>
            <p>Abstract art emerged in the early 20th century as artists began to question the necessity of depicting the visible world. Pioneers like Kandinsky, Mondrian, and Malevich opened new frontiers of visual expression, proving that art could communicate powerfully without representation.</p>
            
            <h2>Understanding Abstract Art</h2>
            <p>Abstract art communicates through:</p>
            <ul>
                <li><strong>Color:</strong> Emotional and psychological impact of hues</li>
                <li><strong>Form:</strong> Shapes that suggest movement, tension, or harmony</li>
                <li><strong>Line:</strong> Energy, direction, and rhythm</li>
                <li><strong>Texture:</strong> Tactile quality that adds dimension</li>
                <li><strong>Composition:</strong> The arrangement of elements to create visual impact</li>
            </ul>
            
            <h2>Abstract Art in Contemporary India</h2>
            <p>Indian abstract artists bring unique perspectives to the genre, often incorporating elements of Indian aesthetics, spirituality, and cultural symbolism into their non-representational works.</p>
            
            <div class="article-inline-images">
                <img src="/screenshot-from-2026-04-02-11-48-39.png" alt="Abstract art 1" />
                <img src="/screenshot-from-2026-04-02-11-49-30.png" alt="Abstract art 2" />
            </div>
            
            <h2>Living with Abstract Art</h2>
            <p>Abstract art offers something different from figurative works: the freedom of interpretation. The same painting may evoke different responses in different viewers, making it a dynamic presence in your home.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/screenshot-from-2026-04-02-11-49-49.png" alt="Abstract art 3" />
                <img src="/screenshot-from-2026-04-02-11-50-16.png" alt="Abstract art 4" />
            </div>
            
            <p>Explore our collection of abstract art by Indian artists and discover works that speak to your personal aesthetic sense and emotional resonance.</p>
        `
    },
    17: {
        title: "Raja Ravi Varma: The Pioneer of Indian Art",
        author: "AJAY SINGH, CO-FOUNDER",
        date: "2023-11-09",
        category: "Art History",
        image: "https://res.cloudinary.com/dp2e8mfvm/image/upload/v1753375191/s4tgyrigukzxlpjprsqi.png",
        content: `
            <p>The world of Indian art is a tapestry woven with rich traditions, vibrant colors, and diverse stories. Among the many luminaries who have left an indelible mark on Indian art, Raja Ravi Varma stands tall as a pioneer.</p>
            
            <h2>Life and Background</h2>
            <p>Raja Ravi Varma (1848-1906) was born into an aristocratic family in Kilimanoor, Kerala. His talent was evident from childhood, and he received encouragement from the royal court of Travancore, where he had access to both Indian and European artistic traditions.</p>
            
            <h2>Revolutionary Contributions</h2>
            <ul>
                <li><strong>Synthesis of Styles:</strong> Combined European academic techniques with Indian subjects</li>
                <li><strong>Mythological Paintings:</strong> Created definitive visual interpretations of Hindu deities and epics</li>
                <li><strong>Democratization of Art:</strong> Established a lithographic press to make affordable prints of his works</li>
                <li><strong>Portrait Excellence:</strong> Renowned for his lifelike portraits of royalty and notable figures</li>
            </ul>
            
            <h2>Lasting Influence</h2>
            <p>Ravi Varma's depictions of gods and goddesses became so popular that they shaped how generations of Indians visualize their deities. His influence extends far beyond galleries – his imagery permeates Indian popular culture, from calendar art to film.</p>
            
            <div class="article-inline-images">
                <img src="/raviraj1.jpg" alt="Raja Ravi Varma artwork 1" />
                <img src="/raviraj2.jpeg" alt="Raja Ravi Varma artwork 2" />
            </div>
            
            <h2>Legacy for Contemporary Artists</h2>
            <p>Raja Ravi Varma demonstrated that Indian artists could master any technique while remaining true to Indian subjects and sensibilities. His example continues to inspire artists who seek to bridge tradition and innovation.</p>
            
            <div class="article-inline-images article-final-images">
                <img src="/raviraj3.jpeg" alt="Raja Ravi Varma artwork 3" />
                <img src="/raviraj4.jpeg" alt="Raja Ravi Varma artwork 4" />
            </div>
            
            <p>While original Ravi Varma works are museum pieces, his legacy lives on in contemporary Indian art. At Zigguratss, we honor his pioneering spirit by showcasing artists who, like him, push boundaries while celebrating Indian heritage.</p>
        `
    }
};

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const ArticlePage = () => {
    const { id } = useParams();
    const article = articleContent[id];
    const [showScrollTop, setShowScrollTop] = useState(false);
    const articleRef = useRef(null);

    // Get related articles (excluding current article)
    const relatedArticles = Object.entries(articleContent)
        .filter(([key]) => key !== id)
        .map(([key, value]) => ({ id: key, ...value }))
        .slice(0, 8); // Show up to 8 related articles (4 per side)

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [id]);

    // Line-by-line reveal on mount for article header and body elements
    useEffect(() => {
        if (!articleRef.current) return;

        const container = articleRef.current;
        // select header parts and each direct child of article body
        const headerParts = container.querySelectorAll('.article-header > *');
        const bodyChildren = container.querySelectorAll('.article-body > *');

        const items = [...headerParts, ...bodyChildren];
        items.forEach((el, i) => {
            el.classList.add('line-animate');
            el.style.setProperty('--i', i);
        });

        // trigger the loaded state so CSS applies staggered transitions
        // use a small timeout to ensure initial styles are applied first
        const t = setTimeout(() => container.classList.add('loaded'), 60);

        return () => {
            clearTimeout(t);
            container.classList.remove('loaded');
            items.forEach((el) => {
                el.classList.remove('line-animate');
                el.style.removeProperty('--i');
            });
        };
    }, [id]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getAuthorInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').slice(0, 2);
    };

    if (!article) {
        return (
            <div className="article-page">
                <div className="article-container">
                    <div className="article-not-found">
                        <h1>Article Not Found</h1>
                        <p>Sorry, the article you're looking for doesn't exist.</p>
                        <Link to="/" className="back-to-blog">← Back to Blog</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="article-page">
            {/* Left sidebar with related articles */}
            <aside className="article-sidebar article-sidebar-left">
                <h4 className="sidebar-title">More Articles</h4>
                {relatedArticles.slice(0, 4).map((item) => (
                    <Link to={`/article/${item.id}`} className="sidebar-article" key={item.id}>
                        <div className="sidebar-article-image">
                            <img src={item.image} alt={item.title} loading="lazy" />
                        </div>
                        <span className="sidebar-article-title">{item.title}</span>
                    </Link>
                ))}
            </aside>

            <div className="article-container">
                <Link to="/" className="back-to-blog">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Back to Blog
                </Link>
                
                <article className="article-content" ref={articleRef}>
                    <header className="article-header">
                        <span className="article-category">{article.category}</span>
                        <h1 className="article-title">{article.title}</h1>
                        <div className="article-meta">
                            <div className="author-info">
                                <div className="author-avatar">
                                    {getAuthorInitials(article.author)}
                                </div>
                                <span className="article-author">{article.author}</span>
                            </div>
                            <span className="meta-divider">•</span>
                            <span className="article-date">{formatDate(article.date)}</span>
                        </div>
                    </header>

                    <div className="article-featured-image">
                        <img src={article.image} alt={article.title} />
                    </div>

                    <div 
                        className="article-body"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    <footer className="article-footer">
                        <div className="article-tags">
                            <span className="tag">{article.category}</span>
                        </div>
                        <Link to="/" className="back-to-blog-bottom">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                            Back to All Articles
                        </Link>
                    </footer>
                </article>
            </div>

            {/* Right sidebar with related articles */}
            <aside className="article-sidebar article-sidebar-right">
                <h4 className="sidebar-title">Explore</h4>
                {relatedArticles.slice(4, 8).map((item) => (
                    <Link to={`/article/${item.id}`} className="sidebar-article" key={item.id}>
                        <div className="sidebar-article-image">
                            <img src={item.image} alt={item.title} loading="lazy" />
                        </div>
                        <span className="sidebar-article-title">{item.title}</span>
                    </Link>
                ))}
            </aside>

            <button 
                className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
            </button>
        </div>
    );
};

export default ArticlePage;
