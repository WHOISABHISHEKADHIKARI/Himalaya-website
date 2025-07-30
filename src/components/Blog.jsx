import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaArrowRight } from 'react-icons/fa';
import BLOG_CONFIG from '../config/api';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPosts = () => {
            try {
                const localPosts = BLOG_CONFIG.getPosts()
                    .filter(post => post.status === 'published')
                    .slice(0, 6);
                setPosts(localPosts);
            } catch (error) {
                console.error('Error loading posts:', error);
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Blog Posts</h1>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                </div>
            ))}
        </div>
    );
};

export default Blog;
