import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPlus, FaEdit, FaTrash, FaEye, FaSave, FaUpload, FaSearch,
  FaFilter, FaSort, FaCalendar, FaUser, FaTags, FaImage,
  FaCog, FaChartBar, FaComments, FaNewspaper, FaRobot,
  FaCheckCircle, FaTimesCircle, FaClock, FaGlobe, FaLock,
  FaFileExport, FaFileImport, FaCopy, FaShare, FaBell,
  FaBookmark, FaHeart, FaFlag, FaArchive, FaRestore
} from 'react-icons/fa';
import { useEnhancedAdminAuth, PermissionGate } from './EnhancedAdminAuth';
import EnhancedRichTextEditor from './EnhancedRichTextEditor';
import EnhancedMediaUploader from './EnhancedMediaUploader';

// Enhanced Blog CMS Component
export const EnhancedBlogCMS = () => {
  const { user, hasPermission } = useEnhancedAdminAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [bulkAction, setBulkAction] = useState('');

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API calls
      const mockPosts = [
        {
          id: '1',
          title: 'Getting Started with Sustainable Agriculture',
          slug: 'getting-started-sustainable-agriculture',
          content: '<p>Sustainable agriculture is the future...</p>',
          excerpt: 'Learn the basics of sustainable farming practices.',
          status: 'published',
          author: 'John Doe',
          authorId: '1',
          publishDate: new Date('2024-01-15'),
          lastModified: new Date('2024-01-16'),
          categories: ['Agriculture', 'Sustainability'],
          tags: ['farming', 'organic', 'environment'],
          featuredImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
          metaTitle: 'Sustainable Agriculture Guide | Himalaya',
          metaDescription: 'Complete guide to sustainable agriculture practices for modern farmers.',
          metaKeywords: 'sustainable agriculture, organic farming, eco-friendly',
          views: 1250,
          likes: 45,
          comments: 12,
          shares: 8,
          readingTime: 5,
          seoScore: 85
        },
        {
          id: '2',
          title: 'Mountain Tourism and Environmental Conservation',
          slug: 'mountain-tourism-environmental-conservation',
          content: '<p>Balancing tourism with conservation...</p>',
          excerpt: 'How to promote responsible mountain tourism.',
          status: 'draft',
          author: 'Jane Smith',
          authorId: '2',
          publishDate: null,
          lastModified: new Date('2024-01-14'),
          categories: ['Tourism', 'Environment'],
          tags: ['mountains', 'conservation', 'tourism'],
          featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          metaTitle: '',
          metaDescription: '',
          metaKeywords: '',
          views: 0,
          likes: 0,
          comments: 0,
          shares: 0,
          readingTime: 3,
          seoScore: 45
        }
      ];

      const mockCategories = [
        { id: '1', name: 'Agriculture', slug: 'agriculture', count: 15, description: 'Farming and agricultural practices' },
        { id: '2', name: 'Tourism', slug: 'tourism', count: 8, description: 'Mountain tourism and travel' },
        { id: '3', name: 'Environment', slug: 'environment', count: 12, description: 'Environmental conservation' },
        { id: '4', name: 'Sustainability', slug: 'sustainability', count: 10, description: 'Sustainable practices' }
      ];

      const mockTags = [
        { id: '1', name: 'farming', count: 20 },
        { id: '2', name: 'organic', count: 15 },
        { id: '3', name: 'mountains', count: 12 },
        { id: '4', name: 'conservation', count: 18 },
        { id: '5', name: 'tourism', count: 10 }
      ];

      const mockComments = [
        {
          id: '1',
          postId: '1',
          author: 'Alice Johnson',
          email: 'alice@example.com',
          content: 'Great article! Very informative.',
          status: 'approved',
          date: new Date('2024-01-16'),
          ip: '192.168.1.1'
        },
        {
          id: '2',
          postId: '1',
          author: 'Bob Wilson',
          email: 'bob@example.com',
          content: 'This is spam content...',
          status: 'pending',
          date: new Date('2024-01-17'),
          ip: '192.168.1.2'
        }
      ];

      const mockAnalytics = {
        totalPosts: 25,
        publishedPosts: 20,
        draftPosts: 5,
        totalViews: 15420,
        totalComments: 156,
        totalSubscribers: 1250,
        monthlyViews: [1200, 1350, 1100, 1450, 1600, 1750, 1420],
        topPosts: mockPosts.slice(0, 3),
        recentActivity: [
          { type: 'post', action: 'published', title: 'New Agriculture Guide', time: '2 hours ago' },
          { type: 'comment', action: 'received', title: 'Comment on Tourism Post', time: '4 hours ago' },
          { type: 'subscriber', action: 'new', title: 'New Newsletter Subscriber', time: '6 hours ago' }
        ]
      };

      setPosts(mockPosts);
      setCategories(mockCategories);
      setTags(mockTags);
      setComments(mockComments);
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'views':
        return b.views - a.views;
      case 'status':
        return a.status.localeCompare(b.status);
      default: // date
        return new Date(b.lastModified) - new Date(a.lastModified);
    }
  });

  // Handle post actions
  const handleCreatePost = () => {
    setEditingPost({
      id: null,
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      status: 'draft',
      author: user.name,
      authorId: user.id,
      publishDate: null,
      categories: [],
      tags: [],
      featuredImage: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: ''
    });
    setShowEditor(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleSavePost = async (postData) => {
    try {
      if (postData.id) {
        // Update existing post
        setPosts(prev => prev.map(p => p.id === postData.id ? { ...postData, lastModified: new Date() } : p));
      } else {
        // Create new post
        const newPost = {
          ...postData,
          id: Date.now().toString(),
          publishDate: postData.status === 'published' ? new Date() : null,
          lastModified: new Date(),
          views: 0,
          likes: 0,
          comments: 0,
          shares: 0,
          readingTime: Math.ceil(postData.content.replace(/<[^>]*>/g, '').split(' ').length / 200)
        };
        setPosts(prev => [newPost, ...prev]);
      }
      setShowEditor(false);
      setEditingPost(null);
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(p => p.id !== postId));
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedItems.length === 0) return;

    switch (bulkAction) {
      case 'delete':
        if (confirm(`Delete ${selectedItems.length} selected items?`)) {
          setPosts(prev => prev.filter(p => !selectedItems.includes(p.id)));
          setSelectedItems([]);
        }
        break;
      case 'publish':
        setPosts(prev => prev.map(p => 
          selectedItems.includes(p.id) 
            ? { ...p, status: 'published', publishDate: new Date() }
            : p
        ));
        setSelectedItems([]);
        break;
      case 'draft':
        setPosts(prev => prev.map(p => 
          selectedItems.includes(p.id) 
            ? { ...p, status: 'draft', publishDate: null }
            : p
        ));
        setSelectedItems([]);
        break;
    }
    setBulkAction('');
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      scheduled: 'bg-blue-100 text-blue-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.draft}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // SEO Score component
  const SEOScore = ({ score }) => {
    const getColor = (score) => {
      if (score >= 80) return 'text-green-600';
      if (score >= 60) return 'text-yellow-600';
      return 'text-red-600';
    };
    return (
      <div className={`text-sm font-medium ${getColor(score)}`}>
        SEO: {score}%
      </div>
    );
  };

  // Dashboard Overview
  const DashboardOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaNewspaper className="text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalPosts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FaEye className="text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalViews?.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FaComments className="text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Comments</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalComments}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FaBell className="text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalSubscribers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {analytics.recentActivity?.map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {activity.type === 'post' && <FaNewspaper className="text-blue-600" />}
                  {activity.type === 'comment' && <FaComments className="text-green-600" />}
                  {activity.type === 'subscriber' && <FaBell className="text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Top Performing Posts</h3>
          <div className="space-y-3">
            {analytics.topPosts?.map((post) => (
              <div key={post.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{post.title}</p>
                  <p className="text-xs text-gray-500">{post.views} views</p>
                </div>
                <StatusBadge status={post.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Posts Management
  const PostsManagement = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Posts</h2>
          <p className="text-gray-600">Manage your blog posts</p>
        </div>
        <PermissionGate permission="posts.create">
          <button
            onClick={handleCreatePost}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaPlus /> New Post
          </button>
        </PermissionGate>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="author">Sort by Author</option>
            <option value="views">Sort by Views</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm text-gray-600">{selectedItems.length} items selected</span>
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="">Bulk Actions</option>
              <option value="publish">Publish</option>
              <option value="draft">Move to Draft</option>
              <option value="delete">Delete</option>
            </select>
            <button
              onClick={handleBulkAction}
              disabled={!bulkAction}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredPosts.length && filteredPosts.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(filteredPosts.map(p => p.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SEO</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(post.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(prev => [...prev, post.id]);
                        } else {
                          setSelectedItems(prev => prev.filter(id => id !== post.id));
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {post.featuredImage && (
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-12 h-12 object-cover rounded mr-3"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{post.author}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {post.publishDate ? new Date(post.publishDate).toLocaleDateString() : 'Not published'}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="space-y-1">
                      <div>{post.views} views</div>
                      <div>{post.comments} comments</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <SEOScore score={post.seoScore} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <PermissionGate permission="posts.edit">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                      </PermissionGate>
                      <PermissionGate permission="posts.delete">
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </PermissionGate>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">Enhanced Blog CMS</h1>
              <span className="text-sm text-gray-500">Welcome, {user?.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMediaLibrary(true)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Media Library"
              >
                <FaImage />
              </button>
              <button
                onClick={() => setShowAIAssistant(true)}
                className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                title="AI Assistant"
              >
                <FaRobot />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: FaChartBar },
              { id: 'posts', label: 'Posts', icon: FaNewspaper },
              { id: 'categories', label: 'Categories', icon: FaFolder },
              { id: 'tags', label: 'Tags', icon: FaTags },
              { id: 'comments', label: 'Comments', icon: FaComments },
              { id: 'media', label: 'Media', icon: FaImage },
              { id: 'subscribers', label: 'Subscribers', icon: FaBell },
              { id: 'settings', label: 'Settings', icon: FaCog }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && <DashboardOverview />}
            {activeTab === 'posts' && <PostsManagement />}
            {activeTab === 'categories' && (
              <div className="text-center py-12">
                <FaFolder className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Categories management coming soon</p>
              </div>
            )}
            {activeTab === 'tags' && (
              <div className="text-center py-12">
                <FaTags className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Tags management coming soon</p>
              </div>
            )}
            {activeTab === 'comments' && (
              <div className="text-center py-12">
                <FaComments className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Comments moderation coming soon</p>
              </div>
            )}
            {activeTab === 'media' && (
              <div className="text-center py-12">
                <FaImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Media management coming soon</p>
              </div>
            )}
            {activeTab === 'subscribers' && (
              <div className="text-center py-12">
                <FaBell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Subscriber management coming soon</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <FaCog className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Settings coming soon</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Post Editor Modal */}
      <AnimatePresence>
        {showEditor && editingPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditor(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">
                  {editingPost.id ? 'Edit Post' : 'Create New Post'}
                </h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleSavePost({ ...editingPost, status: 'draft' })}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <FaSave /> Save Draft
                  </button>
                  <button
                    onClick={() => handleSavePost({ ...editingPost, status: 'published' })}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <FaGlobe /> Publish
                  </button>
                  <button
                    onClick={() => setShowEditor(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter post title"
                    />
                  </div>
                  
                  {/* Content Editor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <EnhancedRichTextEditor
                      value={editingPost.content}
                      onChange={(content) => setEditingPost({ ...editingPost, content })}
                      height="400px"
                      enableAI={true}
                      enableTables={true}
                      enableImages={true}
                      enableMarkdown={true}
                    />
                  </div>
                  
                  {/* Meta Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                      <textarea
                        value={editingPost.excerpt}
                        onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Brief description of the post"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
                      <input
                        type="url"
                        value={editingPost.featuredImage}
                        onChange={(e) => setEditingPost({ ...editingPost, featuredImage: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  
                  {/* SEO Fields */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">SEO Settings</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                      <input
                        type="text"
                        value={editingPost.metaTitle}
                        onChange={(e) => setEditingPost({ ...editingPost, metaTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="SEO title for search engines"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                      <textarea
                        value={editingPost.metaDescription}
                        onChange={(e) => setEditingPost({ ...editingPost, metaDescription: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="SEO description for search engines"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                      <input
                        type="text"
                        value={editingPost.metaKeywords}
                        onChange={(e) => setEditingPost({ ...editingPost, metaKeywords: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media Library Modal */}
      <AnimatePresence>
        {showMediaLibrary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowMediaLibrary(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Media Library</h2>
                <button
                  onClick={() => setShowMediaLibrary(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                <EnhancedMediaUploader
                  onUpload={(file) => console.log('File uploaded:', file)}
                  onSelect={(files) => console.log('Files selected:', files)}
                  multiple={true}
                  enableImageEditor={true}
                  enableVideoPreview={true}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {showAIAssistant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAIAssistant(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <FaRobot className="text-purple-600 text-xl" />
                  <h2 className="text-xl font-semibold">AI Writing Assistant</h2>
                </div>
                <button
                  onClick={() => setShowAIAssistant(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="p-6 text-center">
                <FaRobot className="mx-auto h-16 w-16 text-purple-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">AI Assistant Coming Soon</h3>
                <p className="text-gray-600 mb-6">
                  The AI writing assistant will help you generate content, improve writing, 
                  create outlines, and optimize SEO. Integration with OpenAI GPT-4 coming soon.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Generate Content Ideas',
                    'Improve Writing Style',
                    'Create SEO Titles',
                    'Write Meta Descriptions',
                    'Generate Outlines',
                    'Suggest Keywords',
                    'Content Optimization',
                    'Grammar Check'
                  ].map((feature, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedBlogCMS;