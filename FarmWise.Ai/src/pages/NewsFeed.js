


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const url = 'http://localhost:5000/api/news';

const NewsFeed = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(url);
                const uniqueArticles = filterByUniqueTitle(response.data.results);
                setArticles(uniqueArticles);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchNews();
    }, []);

    const filterByUniqueTitle = (articles) => {
        const uniqueTitles = new Set();
        const filteredArticles = articles.filter(article => {
            if (!uniqueTitles.has(article.title)) {
                uniqueTitles.add(article.title);
                return true;
            }
            return false;
        });
        return filteredArticles;
    };

    const styles = {
        newsContainer: {
            maxWidth: '1200px',
            margin: 'auto',
            padding: '20px',
            backgroundColor: '#f4f4f4',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '12px'
        },
        swiperSlide: {
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        imageStyle: {
            width: '80%',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '10px'
        },
        titleStyle: {
            fontSize: '24px',
            color: '#333',
            padding: '10px 0'
        },
        descriptionStyle: {
            padding: '0 20px',
            color: '#666'
        },
        readMoreLink: {
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#007BFF',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease'
        },
        headingStyle: {
            textAlign: 'center',
            color: '#2a9d8f', // A soothing greenish color
            fontSize: '32px', // Increased size for better visibility
            marginBottom: '20px' // Spacing below the heading
        }
    };

    return (
        <div style={styles.newsContainer}>
            <h1 style={styles.headingStyle}>Agriculture News</h1>
            {articles.length > 0 ? (
                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation
                    autoplay={{ delay: 3000 }}
                >
                    {articles.map((article, index) => (
                        <SwiperSlide key={index} style={styles.swiperSlide}>
                            <img 
                                src={article.image} 
                                alt={article.title} 
                                style={styles.imageStyle}
                            />
                            <h2 style={styles.titleStyle}>{article.title}</h2>
                            <p style={styles.descriptionStyle}>{article.description}</p>
                            <a 
                                href={article.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={styles.readMoreLink}
                            >
                                Read more
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p>Loading news...</p>
            )}
        </div>
    );
};

export default NewsFeed;