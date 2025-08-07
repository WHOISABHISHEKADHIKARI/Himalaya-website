import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaComments, FaCheckCircle, FaTimesCircle, FaFlag, FaTrash,
  FaReply, FaUser, FaCalendar, FaGlobe, FaSearch, FaFilter,
  FaSort, FaEye, FaEyeSlash, FaExclamationTriangle, FaBan,
  FaUndo, FaEdit, FaCopy, FaShare, FaHeart, FaThumbsUp,
  FaThumbsDown, FaSpinner, FaDownload, FaUpload, FaCog
} from 'react-icons/fa';
import { useEnhancedAdminAuth, PermissionGate } from './EnhancedAdminAuth';

// Comment Moderation System Component
export const CommentModerationSystem = () => {
  const { user, hasPermission } = useEnhancedAdminAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPost, setFilterPost] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedComments, setSelectedComments] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [stats, setStats] = useState({});
  const [posts, setPosts] = useState([]);
  const [moderationRules, setModerationRules] = useState({
    autoApprove: false,
    requireApproval: true,
    spamDetection: true,
    profanityFilter: true,
    linkModeration: true,
    maxLinks: 2,
    blacklistedWords: ['spam', 'scam', 'fake'],
    whitelistedDomains: ['example.com'],
    autoDeleteSpam: false
  });

  // Load data on mount
  useEffect(() => {
    loadComments();
    loadPosts();
    loadStats();
  }, []);

  const loadComments = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API calls
      const mockComments = [
        {
          id: '1',
          postId: '1',
          postTitle: 'Getting Started with Sustainable Agriculture',
          author: 'John Smith',
          email: 'john@example.com',
          website: 'https://johnsmith.com',
          content: 'This is a great article! I learned a lot about sustainable farming practices. Thank you for sharing this valuable information.',
          status: 'approved',
          date: new Date('2024-01-15T10:30:00'),
          ip: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          likes: 5,
          dislikes: 0,
          replies: [],
          isSpam: false,
          spamScore: 0.1,
          sentiment: 'positive',
          language: 'en',
          location: 'New York, USA',
          isVerified: false,
          moderatedBy: 'admin',
          moderatedAt: new Date('2024-01-15T10:35:00'),
          flags: []
        },
        {
          id: '2',
          postId: '1',
          postTitle: 'Getting Started with Sustainable Agriculture',
          author: 'Spam Bot',
          email: 'spam@fake.com',
          website: 'https://spam-site.com',
          content: 'Check out this amazing deal! Click here to win $1000! Limited time offer! Buy now!',
          status: 'spam',
          date: new Date('2024-01-16T14:20:00'),
          ip: '192.168.1.200',
          userAgent: 'Bot/1.0',
          likes: 0,
          dislikes: 3,
          replies: [],
          isSpam: true,
          spamScore: 0.95,
          sentiment: 'neutral',
          language: 'en',
          location: 'Unknown',
          isVerified: false,
          moderatedBy: null,
          moderatedAt: null,
          flags: ['spam', 'suspicious-links']
        },
        {
          id: '3',
          postId: '2',
          postTitle: 'Mountain Tourism and Environmental Conservation',
          author: 'Alice Johnson',
          email: 'alice@example.com',
          website: '',
          content: 'I disagree with some points in this article. The tourism industry can be harmful to the environment if not managed properly.',
          status: 'pending',
          date: new Date('2024-01-17T09:15:00'),
          ip: '192.168.1.150',
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
          likes: 2,
          dislikes: 1,
          replies: [],
          isSpam: false,
          spamScore: 0.2,
          sentiment: 'negative',
          language: 'en',
          location: 'California, USA',
          isVerified: true,
          moderatedBy: null,
          moderatedAt: null,
          flags: []
        },
        {
          id: '4',
          postId: '1',
          postTitle: 'Getting Started with Sustainable Agriculture',
          author: 'Bob Wilson',
          email: 'bob@example.com',
          website: '',
          content: 'Great insights! I have been practicing organic farming for 5 years and can confirm these methods work well.',
          status: 'approved',
          date: new Date('2024-01-17T16:45:00'),
          ip: '192.168.1.175',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          likes: 8,
          dislikes: 0,
          replies: [
            {
              id: '4-1',
              author: 'Admin',
              content: 'Thank you for sharing your experience, Bob!',
              date: new Date('2024-01-17T17:00:00'),
              isAdmin: true
            }
          ],
          isSpam: false,
          spamScore: 0.05,
          sentiment: 'positive',
          language: 'en',
          location: 'Texas, USA',
          isVerified: false,
          moderatedBy: 'admin',
          moderatedAt: new Date('2024-01-17T16:50:00'),
          flags: []
        }
      ];

      setComments(mockComments);
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    try {
      const mockPosts = [
        { id: '1', title: 'Getting Started with Sustainable Agriculture' },
        { id: '2', title: 'Mountain Tourism and Environmental Conservation' },
        { id: '3', title: 'Renewable Energy Solutions' }
      ];
      setPosts(mockPosts);
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  };

  const loadStats = async () => {
    try {
      const mockStats = {
        total: 156,
        approved: 120,
        pending: 25,
        spam: 11,
        today: 8,
        thisWeek: 34,
        thisMonth: 89,
        avgPerDay: 4.2,
        spamRate: 7.1,
        approvalRate: 92.3
      };
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  // Filter and sort comments
  const filteredComments = comments.filter(comment => {
    const matchesSearch = 
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.postTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || comment.status === filterStatus;
    const matchesPost = filterPost === 'all' || comment.postId === filterPost;
    
    return matchesSearch && matchesStatus && matchesPost;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'author':
        return a.author.localeCompare(b.author);
      case 'post':
        return a.postTitle.localeCompare(b.postTitle);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'spam-score':
        return b.spamScore - a.spamScore;
      case 'likes':
        return b.likes - a.likes;
      default: // date
        return new Date(b.date) - new Date(a.date);
    }
  });

  // Comment actions
  const handleApproveComment = async (commentId) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, status: 'approved', moderatedBy: user.name, moderatedAt: new Date() }
        : comment
    ));
  };

  const handleRejectComment = async (commentId) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, status: 'rejected', moderatedBy: user.name, moderatedAt: new Date() }
        : comment
    ));
  };

  const handleMarkAsSpam = async (commentId) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, status: 'spam', isSpam: true, moderatedBy: user.name, moderatedAt: new Date() }
        : comment
    ));
  };

  const handleDeleteComment = async (commentId) => {
    if (confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedComments.length === 0) return;

    const timestamp = new Date();
    
    switch (bulkAction) {
      case 'approve':
        setComments(prev => prev.map(comment => 
          selectedComments.includes(comment.id)
            ? { ...comment, status: 'approved', moderatedBy: user.name, moderatedAt: timestamp }
            : comment
        ));
        break;
      case 'reject':
        setComments(prev => prev.map(comment => 
          selectedComments.includes(comment.id)
            ? { ...comment, status: 'rejected', moderatedBy: user.name, moderatedAt: timestamp }
            : comment
        ));
        break;
      case 'spam':
        setComments(prev => prev.map(comment => 
          selectedComments.includes(comment.id)
            ? { ...comment, status: 'spam', isSpam: true, moderatedBy: user.name, moderatedAt: timestamp }
            : comment
        ));
        break;
      case 'delete':
        if (confirm(`Delete ${selectedComments.length} selected comments?`)) {
          setComments(prev => prev.filter(comment => !selectedComments.includes(comment.id)));
        }
        break;
    }
    
    setSelectedComments([]);
    setBulkAction('');
  };

  const handleReply = async () => {
    if (!replyContent.trim() || !replyingTo) return;

    const newReply = {
      id: `${replyingTo.id}-${Date.now()}`,
      author: user.name,
      content: replyContent,
      date: new Date(),
      isAdmin: true
    };

    setComments(prev => prev.map(comment => 
      comment.id === replyingTo.id
        ? { ...comment, replies: [...comment.replies, newReply] }
        : comment
    ));

    setReplyContent('');
    setShowReplyModal(false);
    setReplyingTo(null);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      spam: 'bg-red-100 text-red-800'
    };
    
    const icons = {
      approved: FaCheckCircle,
      pending: FaClock,
      rejected: FaTimesCircle,
      spam: FaFlag
    };
    
    const Icon = icons[status];
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.pending}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Spam score component
  const SpamScore = ({ score }) => {
    const getColor = (score) => {
      if (score >= 0.8) return 'text-red-600';
      if (score >= 0.5) return 'text-yellow-600';
      return 'text-green-600';
    };
    
    return (
      <div className={`text-sm font-medium ${getColor(score)}`}>
        {Math.round(score * 100)}%
      </div>
    );
  };

  // Sentiment badge
  const SentimentBadge = ({ sentiment }) => {
    const colors = {
      positive: 'bg-green-100 text-green-800',
      negative: 'bg-red-100 text-red-800',
      neutral: 'bg-gray-100 text-gray-800'
    };
    
    const icons = {
      positive: FaThumbsUp,
      negative: FaThumbsDown,
      neutral: FaEye
    };
    
    const Icon = icons[sentiment];
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${colors[sentiment]}`}>
        <Icon className="w-3 h-3" />
        {sentiment}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Comment Moderation</h2>
          <p className="text-gray-600">Manage and moderate blog comments</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open('/admin/moderation-settings', '_blank')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <FaCog /> Settings
          </button>
          <button
            onClick={() => loadComments()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaUndo /> Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaComments className="text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Comments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FaClock className="text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <FaFlag className="text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Spam Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.spamRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FaCheckCircle className="text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approval Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approvalRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search comments, authors, emails..."
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
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="spam">Spam</option>
          </select>
          
          <select
            value={filterPost}
            onChange={(e) => setFilterPost(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Posts</option>
            {posts.map(post => (
              <option key={post.id} value={post.id}>{post.title}</option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="author">Sort by Author</option>
            <option value="post">Sort by Post</option>
            <option value="status">Sort by Status</option>
            <option value="spam-score">Sort by Spam Score</option>
            <option value="likes">Sort by Likes</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedComments.length > 0 && (
          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm text-gray-600">{selectedComments.length} comments selected</span>
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="">Bulk Actions</option>
              <option value="approve">Approve</option>
              <option value="reject">Reject</option>
              <option value="spam">Mark as Spam</option>
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

      {/* Comments List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <FaSpinner className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="ml-3 text-gray-600">Loading comments...</span>
          </div>
        ) : filteredComments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredComments.map((comment) => (
              <div key={comment.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedComments.includes(comment.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedComments(prev => [...prev, comment.id]);
                      } else {
                        setSelectedComments(prev => prev.filter(id => id !== comment.id));
                      }
                    }}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gray-400" />
                          <span className="font-medium text-gray-900">{comment.author}</span>
                          {comment.isVerified && (
                            <FaCheckCircle className="text-blue-500 w-4 h-4" title="Verified User" />
                          )}
                        </div>
                        <StatusBadge status={comment.status} />
                        <SentimentBadge sentiment={comment.sentiment} />
                      </div>
                      <div className="flex items-center gap-2">
                        <SpamScore score={comment.spamScore} />
                        <div className="text-sm text-gray-500">
                          {new Date(comment.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    {/* Post Info */}
                    <div className="text-sm text-gray-600 mb-2">
                      On: <span className="font-medium">{comment.postTitle}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="mb-3">
                      <p className="text-gray-900 leading-relaxed">{comment.content}</p>
                    </div>
                    
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>Email: {comment.email}</span>
                      {comment.website && (
                        <span>Website: <a href={comment.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{comment.website}</a></span>
                      )}
                      <span>IP: {comment.ip}</span>
                      <span>Location: {comment.location}</span>
                    </div>
                    
                    {/* Engagement */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <FaThumbsUp className="text-green-500" />
                        <span>{comment.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaThumbsDown className="text-red-500" />
                        <span>{comment.dislikes}</span>
                      </div>
                      {comment.replies.length > 0 && (
                        <div className="flex items-center gap-1">
                          <FaReply className="text-blue-500" />
                          <span>{comment.replies.length} replies</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Flags */}
                    {comment.flags.length > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <FaFlag className="text-red-500" />
                        <div className="flex gap-1">
                          {comment.flags.map((flag, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                              {flag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Moderation Info */}
                    {comment.moderatedBy && (
                      <div className="text-xs text-gray-500 mb-3">
                        Moderated by {comment.moderatedBy} on {new Date(comment.moderatedAt).toLocaleString()}
                      </div>
                    )}
                    
                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Replies:</h4>
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="mb-3 p-3 bg-gray-50 rounded">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{reply.author}</span>
                              {reply.isAdmin && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Admin</span>
                              )}
                              <span className="text-xs text-gray-500">
                                {new Date(reply.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      {comment.status === 'pending' && (
                        <>
                          <PermissionGate permission="comments.approve">
                            <button
                              onClick={() => handleApproveComment(comment.id)}
                              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors flex items-center gap-1"
                            >
                              <FaCheckCircle /> Approve
                            </button>
                          </PermissionGate>
                          <PermissionGate permission="comments.reject">
                            <button
                              onClick={() => handleRejectComment(comment.id)}
                              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors flex items-center gap-1"
                            >
                              <FaTimesCircle /> Reject
                            </button>
                          </PermissionGate>
                        </>
                      )}
                      
                      <PermissionGate permission="comments.spam">
                        <button
                          onClick={() => handleMarkAsSpam(comment.id)}
                          className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 transition-colors flex items-center gap-1"
                        >
                          <FaFlag /> Spam
                        </button>
                      </PermissionGate>
                      
                      <PermissionGate permission="comments.reply">
                        <button
                          onClick={() => {
                            setReplyingTo(comment);
                            setShowReplyModal(true);
                          }}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors flex items-center gap-1"
                        >
                          <FaReply /> Reply
                        </button>
                      </PermissionGate>
                      
                      <button
                        onClick={() => {
                          setSelectedComment(comment);
                          setShowDetailsModal(true);
                        }}
                        className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors flex items-center gap-1"
                      >
                        <FaEye /> Details
                      </button>
                      
                      <PermissionGate permission="comments.delete">
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors flex items-center gap-1"
                        >
                          <FaTrash /> Delete
                        </button>
                      </PermissionGate>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaComments className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Comments Found</h3>
            <p className="text-gray-600">No comments match your current filters</p>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      <AnimatePresence>
        {showReplyModal && replyingTo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowReplyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Reply to Comment</h2>
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-4 p-4 bg-gray-50 rounded">
                  <div className="font-medium text-gray-900 mb-1">{replyingTo.author}</div>
                  <p className="text-gray-700">{replyingTo.content}</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Write your reply..."
                  />
                </div>
                
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setShowReplyModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReply}
                    disabled={!replyContent.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <FaReply /> Send Reply
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comment Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedComment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Comment Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Comment Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Author</label>
                        <p className="text-gray-900">{selectedComment.author}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-900">{selectedComment.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Website</label>
                        <p className="text-gray-900">{selectedComment.website || 'None'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded">{selectedComment.content}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Technical Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">IP Address</label>
                        <p className="text-gray-900">{selectedComment.ip}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">User Agent</label>
                        <p className="text-gray-900 text-sm break-all">{selectedComment.userAgent}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <p className="text-gray-900">{selectedComment.location}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Language</label>
                        <p className="text-gray-900">{selectedComment.language}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Spam Score</label>
                        <SpamScore score={selectedComment.spamScore} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Sentiment</label>
                        <SentimentBadge sentiment={selectedComment.sentiment} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommentModerationSystem;