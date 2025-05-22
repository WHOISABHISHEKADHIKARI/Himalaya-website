import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `https://blogdata.dapirates.xyz/wp-json/wp/v2/posts?slug=${slug}&_embed=true`
                );
                const data = await response.json();
                setPost(data[0]);
                // WordPress API returns an array
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        // Reset scroll position to top when component mounts
        window.scrollTo(0, 0);

        fetchPost();
    }, [slug]);

    if (!post) {
        return <div className="min-h-screen flex items-center justify-center text-[#1C4E37]">Loading...</div>;
    }

    // Get the featured image URL
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1C4E37]/5 via-white to-[#F4F9F1]/50">
            <Helmet>
                <title>{post.title.rendered} | Himalaya Krishi</title>
            </Helmet>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-[#1C4E37]/10 via-[#D8A51D]/5 to-[#1C4E37]/10 transform -skew-y-6"></div>
            <div className="absolute top-20 left-20 w-72 h-72 bg-[#D8A51D]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-[#1C4E37]/5 rounded-full blur-4xl animate-pulse"></div>

            {/* Content */}
            <div className="relative pt-32 px-4">
                {/* Breadcrumb Navigation */}
                <nav aria-label="breadcrumb" className="container mx-auto max-w-4xl py-4">
                    <ol className="flex items-center space-x-2 text-sm text-[#1C4E37]">
                        <li>
                            <Link to="/" className="hover:text-[#D8A51D] transition-colors duration-300">
                                Home
                            </Link>
                        </li>
                        <li>
                            <span className="mx-1 text-[#1C4E37]/50">/</span>
                            <Link to="/blog" className="hover:text-[#D8A51D] transition-colors duration-300">
                                Blog
                            </Link>
                        </li>
                        <span className="mx-1 text-[#1C4E37]/50">/</span>
                        <li aria-current="page" className="text-[#D8A51D]">
                            {post.title.rendered}
                        </li>
                    </ol>
                </nav>

                <div className="container mx-auto max-w-4xl py-16">
                    {/* Featured Image */}
                    {featuredImage && (
                        <div className="mb-8 flex justify-center">
                            <img
                                src={featuredImage}
                                alt={post.title.rendered}
                                className="w-2/3 h-auto rounded-lg object-cover"
                            />
                        </div>
                    )}

                    {/* Post Title */}
                    <div className="mb-12">
                        <h1 className="text-2xl md:text-4xl font-serif font-bold mb-6 text-[#1C4E37] relative text-center md:text-left">
                            <span className="relative block w-full">
                                {post.title.rendered}
                                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D8A51D] to-transparent"></div>
                            </span>
                        </h1>
                    </div>

                    {/* Post Content */}
                    <div
                        className="text-[#1C4E37]/80 leading-relaxed text-[18px] prose prose-lg mx-auto"
                        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
