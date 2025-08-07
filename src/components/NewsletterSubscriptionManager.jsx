import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBell, FaEnvelope, FaUsers, FaChartLine, FaPlus, FaEdit,
  FaTrash, FaEye, FaSend, FaDownload, FaUpload, FaSearch,
  FaFilter, FaSort, FaCalendar, FaTag, FaCheckCircle,
  FaTimesCircle, FaExclamationTriangle, FaCog, FaRobot,
  FaFileExport, FaFileImport, FaCopy, FaShare, FaHeart,
  FaSpinner, FaUndo, FaPause, FaPlay, FaStop, FaArchive,
  FaUserPlus, FaUserMinus, FaGlobe, FaMobile, FaDesktop
} from 'react-icons/fa';
import { useEnhancedAdminAuth, PermissionGate } from './EnhancedAdminAuth';

// Newsletter & Subscription Management Component
export const NewsletterSubscriptionManager = () => {
  const { user, hasPermission } = useEnhancedAdminAuth();
  const [activeTab, setActiveTab] = useState('subscribers');
  const [subscribers, setSubscribers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterList, setFilterList] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);
  const [stats, setStats] = useState({});
  const [analytics, setAnalytics] = useState({});

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadSubscribers(),
        loadCampaigns(),
        loadTemplates(),
        loadLists(),
        loadStats(),
        loadAnalytics()
      ]);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubscribers = async () => {
    // Mock data - replace with actual API calls
    const mockSubscribers = [
      {
        id: '1',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        status: 'active',
        subscribeDate: new Date('2024-01-10'),
        lastActivity: new Date('2024-01-15'),
        source: 'website',
        lists: ['newsletter', 'updates'],
        preferences: {
          frequency: 'weekly',
          topics: ['agriculture', 'sustainability'],
          format: 'html'
        },
        location: 'New York, USA',
        device: 'desktop',
        engagement: {
          opens: 15,
          clicks: 8,
          openRate: 75,
          clickRate: 40
        },
        tags: ['vip', 'engaged']
      },
      {
        id: '2',
        email: 'jane.smith@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        status: 'active',
        subscribeDate: new Date('2024-01-12'),
        lastActivity: new Date('2024-01-17'),
        source: 'social_media',
        lists: ['newsletter'],
        preferences: {
          frequency: 'monthly',
          topics: ['tourism', 'environment'],
          format: 'html'
        },
        location: 'California, USA',
        device: 'mobile',
        engagement: {
          opens: 8,
          clicks: 3,
          openRate: 60,
          clickRate: 25
        },
        tags: ['new']
      },
      {
        id: '3',
        email: 'inactive@example.com',
        firstName: 'Bob',
        lastName: 'Wilson',
        status: 'unsubscribed',
        subscribeDate: new Date('2023-12-01'),
        lastActivity: new Date('2023-12-15'),
        unsubscribeDate: new Date('2024-01-05'),
        unsubscribeReason: 'Too many emails',
        source: 'popup',
        lists: [],
        preferences: {
          frequency: 'weekly',
          topics: ['agriculture'],
          format: 'text'
        },
        location: 'Texas, USA',
        device: 'desktop',
        engagement: {
          opens: 3,
          clicks: 1,
          openRate: 30,
          clickRate: 10
        },
        tags: ['churned']
      }
    ];
    setSubscribers(mockSubscribers);
  };

  const loadCampaigns = async () => {
    const mockCampaigns = [
      {
        id: '1',
        name: 'Weekly Agriculture Newsletter',
        subject: 'Latest Sustainable Farming Techniques',
        status: 'sent',
        type: 'newsletter',
        sendDate: new Date('2024-01-15T10:00:00'),
        scheduledDate: new Date('2024-01-15T10:00:00'),
        recipients: 1250,
        lists: ['newsletter', 'agriculture'],
        template: 'newsletter-template',
        content: '<h1>Weekly Newsletter</h1><p>Latest updates on sustainable farming...</p>',
        stats: {
          sent: 1250,
          delivered: 1200,
          opened: 900,
          clicked: 450,
          bounced: 25,
          unsubscribed: 5,
          openRate: 75,
          clickRate: 37.5,
          bounceRate: 2.1,
          unsubscribeRate: 0.4
        },
        createdBy: 'admin',
        createdAt: new Date('2024-01-14'),
        tags: ['weekly', 'agriculture']
      },
      {
        id: '2',
        name: 'Tourism Update Campaign',
        subject: 'Discover Mountain Tourism Opportunities',
        status: 'draft',
        type: 'promotional',
        sendDate: null,
        scheduledDate: new Date('2024-01-20T14:00:00'),
        recipients: 800,
        lists: ['tourism', 'updates'],
        template: 'promotional-template',
        content: '<h1>Mountain Tourism</h1><p>Explore sustainable tourism options...</p>',
        stats: null,
        createdBy: 'editor',
        createdAt: new Date('2024-01-16'),
        tags: ['tourism', 'promotional']
      },
      {
        id: '3',
        name: 'Welcome Series - Part 1',
        subject: 'Welcome to Himalaya Community!',
        status: 'scheduled',
        type: 'automation',
        sendDate: null,
        scheduledDate: new Date('2024-01-18T09:00:00'),
        recipients: 150,
        lists: ['welcome-series'],
        template: 'welcome-template',
        content: '<h1>Welcome!</h1><p>Thank you for joining our community...</p>',
        stats: null,
        createdBy: 'admin',
        createdAt: new Date('2024-01-10'),
        tags: ['welcome', 'automation']
      }
    ];
    setCampaigns(mockCampaigns);
  };

  const loadTemplates = async () => {
    const mockTemplates = [
      {
        id: '1',
        name: 'Newsletter Template',
        description: 'Standard newsletter layout with header, content sections, and footer',
        type: 'newsletter',
        thumbnail: 'https://via.placeholder.com/300x200?text=Newsletter',
        html: '<html><body><h1>{{title}}</h1><div>{{content}}</div></body></html>',
        variables: ['title', 'content', 'unsubscribe_link'],
        createdAt: new Date('2024-01-01'),
        lastModified: new Date('2024-01-10'),
        usageCount: 15,
        isDefault: true
      },
      {
        id: '2',
        name: 'Promotional Template',
        description: 'Eye-catching template for promotional campaigns',
        type: 'promotional',
        thumbnail: 'https://via.placeholder.com/300x200?text=Promotional',
        html: '<html><body><div class="promo">{{content}}</div></body></html>',
        variables: ['content', 'cta_button', 'unsubscribe_link'],
        createdAt: new Date('2024-01-05'),
        lastModified: new Date('2024-01-12'),
        usageCount: 8,
        isDefault: false
      }
    ];
    setTemplates(mockTemplates);
  };

  const loadLists = async () => {
    const mockLists = [
      {
        id: '1',
        name: 'Newsletter Subscribers',
        description: 'Main newsletter list for all subscribers',
        subscriberCount: 1250,
        activeCount: 1180,
        createdAt: new Date('2023-12-01'),
        lastActivity: new Date('2024-01-17'),
        tags: ['main', 'newsletter'],
        isDefault: true
      },
      {
        id: '2',
        name: 'Agriculture Updates',
        description: 'Subscribers interested in agriculture content',
        subscriberCount: 800,
        activeCount: 750,
        createdAt: new Date('2024-01-01'),
        lastActivity: new Date('2024-01-16'),
        tags: ['agriculture', 'specialized'],
        isDefault: false
      },
      {
        id: '3',
        name: 'Tourism Enthusiasts',
        description: 'Subscribers interested in mountain tourism',
        subscriberCount: 600,
        activeCount: 580,
        createdAt: new Date('2024-01-05'),
        lastActivity: new Date('2024-01-15'),
        tags: ['tourism', 'specialized'],
        isDefault: false
      }
    ];
    setLists(mockLists);
  };

  const loadStats = async () => {
    const mockStats = {
      totalSubscribers: 1250,
      activeSubscribers: 1180,
      newThisMonth: 85,
      unsubscribedThisMonth: 12,
      growthRate: 6.8,
      avgOpenRate: 68.5,
      avgClickRate: 32.1,
      avgUnsubscribeRate: 1.2,
      totalCampaigns: 24,
      campaignsThisMonth: 4,
      totalEmailsSent: 28500,
      emailsSentThisMonth: 3200
    };
    setStats(mockStats);
  };

  const loadAnalytics = async () => {
    const mockAnalytics = {
      subscriberGrowth: [120, 135, 142, 158, 165, 180, 195, 210, 225, 240, 255, 270],
      engagementTrends: {
        opens: [65, 68, 70, 72, 69, 71, 73, 75, 74, 76, 78, 80],
        clicks: [28, 30, 32, 35, 33, 34, 36, 38, 37, 39, 41, 43],
        unsubscribes: [2.1, 1.8, 1.5, 1.3, 1.6, 1.4, 1.2, 1.1, 1.3, 1.0, 0.9, 0.8]
      },
      topPerformingCampaigns: [
        { name: 'Agriculture Tips', openRate: 85, clickRate: 45 },
        { name: 'Tourism Guide', openRate: 78, clickRate: 38 },
        { name: 'Sustainability News', openRate: 72, clickRate: 35 }
      ],
      deviceBreakdown: {
        desktop: 45,
        mobile: 40,
        tablet: 15
      },
      locationBreakdown: [
        { country: 'USA', subscribers: 450 },
        { country: 'Canada', subscribers: 280 },
        { country: 'UK', subscribers: 220 },
        { country: 'Australia', subscribers: 180 },
        { country: 'Others', subscribers: 120 }
      ]
    };
    setAnalytics(mockAnalytics);
  };

  // Filter and sort functions
  const getFilteredData = () => {
    let data = [];
    
    switch (activeTab) {
      case 'subscribers':
        data = subscribers;
        break;
      case 'campaigns':
        data = campaigns;
        break;
      case 'templates':
        data = templates;
        break;
      case 'lists':
        data = lists;
        break;
      default:
        return [];
    }
    
    return data.filter(item => {
      const matchesSearch = searchTerm === '' || 
        (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.subject && item.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.firstName && item.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.lastName && item.lastName.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      const matchesList = filterList === 'all' || 
        (item.lists && item.lists.includes(filterList)) ||
        (item.id === filterList);
      
      return matchesSearch && matchesStatus && matchesList;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || `${a.firstName} ${a.lastName}`).localeCompare(b.name || `${b.firstName} ${b.lastName}`);
        case 'email':
          return (a.email || '').localeCompare(b.email || '');
        case 'status':
          return a.status.localeCompare(b.status);
        case 'engagement':
          return (b.engagement?.openRate || 0) - (a.engagement?.openRate || 0);
        default: // date
          const dateA = a.subscribeDate || a.createdAt || a.sendDate || new Date(0);
          const dateB = b.subscribeDate || b.createdAt || b.sendDate || new Date(0);
          return new Date(dateB) - new Date(dateA);
      }
    });
  };

  // Action handlers
  const handleCreateItem = () => {
    setEditingItem(null);
    setShowCreateModal(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  const handleDeleteItem = async (itemId) => {
    if (confirm('Are you sure you want to delete this item?')) {
      switch (activeTab) {
        case 'subscribers':
          setSubscribers(prev => prev.filter(s => s.id !== itemId));
          break;
        case 'campaigns':
          setCampaigns(prev => prev.filter(c => c.id !== itemId));
          break;
        case 'templates':
          setTemplates(prev => prev.filter(t => t.id !== itemId));
          break;
        case 'lists':
          setLists(prev => prev.filter(l => l.id !== itemId));
          break;
      }
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedItems.length === 0) return;

    switch (bulkAction) {
      case 'delete':
        if (confirm(`Delete ${selectedItems.length} selected items?`)) {
          switch (activeTab) {
            case 'subscribers':
              setSubscribers(prev => prev.filter(s => !selectedItems.includes(s.id)));
              break;
            case 'campaigns':
              setCampaigns(prev => prev.filter(c => !selectedItems.includes(c.id)));
              break;
          }
        }
        break;
      case 'activate':
        switch (activeTab) {
          case 'subscribers':
            setSubscribers(prev => prev.map(s => 
              selectedItems.includes(s.id) ? { ...s, status: 'active' } : s
            ));
            break;
        }
        break;
      case 'deactivate':
        switch (activeTab) {
          case 'subscribers':
            setSubscribers(prev => prev.map(s => 
              selectedItems.includes(s.id) ? { ...s, status: 'inactive' } : s
            ));
            break;
        }
        break;
    }
    
    setSelectedItems([]);
    setBulkAction('');
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      unsubscribed: 'bg-red-100 text-red-800',
      sent: 'bg-blue-100 text-blue-800',
      draft: 'bg-yellow-100 text-yellow-800',
      scheduled: 'bg-purple-100 text-purple-800',
      sending: 'bg-orange-100 text-orange-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.inactive}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Engagement score component
  const EngagementScore = ({ engagement }) => {
    if (!engagement) return <span className="text-gray-400">-</span>;
    
    const score = engagement.openRate || 0;
    const getColor = (score) => {
      if (score >= 70) return 'text-green-600';
      if (score >= 40) return 'text-yellow-600';
      return 'text-red-600';
    };
    
    return (
      <div className={`text-sm font-medium ${getColor(score)}`}>
        {score}%
      </div>
    );
  };

  // Subscribers view
  const SubscribersView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Subscribers</h3>
          <p className="text-gray-600">Manage your email subscribers</p>
        </div>
        <div className="flex items-center gap-3">
          <PermissionGate permission="newsletter.import">
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
              <FaUpload /> Import
            </button>
          </PermissionGate>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <FaDownload /> Export
          </button>
          <PermissionGate permission="newsletter.create">
            <button
              onClick={handleCreateItem}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaUserPlus /> Add Subscriber
            </button>
          </PermissionGate>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === getFilteredData().length && getFilteredData().length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(getFilteredData().map(item => item.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscriber</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lists</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredData().map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(subscriber.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(prev => [...prev, subscriber.id]);
                        } else {
                          setSelectedItems(prev => prev.filter(id => id !== subscriber.id));
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {subscriber.firstName} {subscriber.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{subscriber.email}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {subscriber.device === 'mobile' && <FaMobile className="text-gray-400 w-3 h-3" />}
                        {subscriber.device === 'desktop' && <FaDesktop className="text-gray-400 w-3 h-3" />}
                        <span className="text-xs text-gray-500">{subscriber.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={subscriber.status} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {subscriber.lists.map((list, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {list}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <EngagementScore engagement={subscriber.engagement} />
                    <div className="text-xs text-gray-500">
                      {subscriber.engagement?.opens || 0} opens
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {subscriber.source.replace('_', ' ')}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {new Date(subscriber.subscribeDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditItem(subscriber)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <PermissionGate permission="newsletter.delete">
                        <button
                          onClick={() => handleDeleteItem(subscriber.id)}
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

  // Campaigns view
  const CampaignsView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Campaigns</h3>
          <p className="text-gray-600">Manage your email campaigns</p>
        </div>
        <PermissionGate permission="newsletter.create">
          <button
            onClick={handleCreateItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaPlus /> New Campaign
          </button>
        </PermissionGate>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredData().map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900 mb-1">{campaign.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{campaign.subject}</p>
                <StatusBadge status={campaign.status} />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setPreviewContent(campaign);
                    setShowPreviewModal(true);
                  }}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Preview"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handleEditItem(campaign)}
                  className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <PermissionGate permission="newsletter.delete">
                  <button
                    onClick={() => handleDeleteItem(campaign.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </PermissionGate>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Recipients:</span>
                <span className="font-medium">{campaign.recipients.toLocaleString()}</span>
              </div>
              
              {campaign.stats && (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Open Rate:</span>
                    <span className="font-medium text-green-600">{campaign.stats.openRate}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Click Rate:</span>
                    <span className="font-medium text-blue-600">{campaign.stats.clickRate}%</span>
                  </div>
                </>
              )}
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Created:</span>
                <span className="text-gray-900">{new Date(campaign.createdAt).toLocaleDateString()}</span>
              </div>
              
              {campaign.scheduledDate && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Scheduled:</span>
                  <span className="text-gray-900">{new Date(campaign.scheduledDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
            
            {campaign.status === 'draft' && (
              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                  <FaSend /> Send Now
                </button>
                <button className="px-3 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors flex items-center gap-1">
                  <FaCalendar /> Schedule
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Newsletter & Subscriptions</h2>
          <p className="text-gray-600">Manage subscribers, campaigns, and email marketing</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <FaRobot /> AI Assistant
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
            <FaCog /> Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaUsers className="text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSubscribers?.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FaChartLine className="text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Growth Rate</p>
              <p className="text-2xl font-bold text-gray-900">+{stats.growthRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FaEnvelope className="text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Open Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgOpenRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FaBell className="text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Campaigns Sent</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCampaigns}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 rounded-t-lg">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'subscribers', label: 'Subscribers', icon: FaUsers },
            { id: 'campaigns', label: 'Campaigns', icon: FaEnvelope },
            { id: 'templates', label: 'Templates', icon: FaEdit },
            { id: 'lists', label: 'Lists', icon: FaTag },
            { id: 'analytics', label: 'Analytics', icon: FaChartLine }
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

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="unsubscribed">Unsubscribed</option>
            <option value="sent">Sent</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="status">Sort by Status</option>
            <option value="engagement">Sort by Engagement</option>
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
              <option value="activate">Activate</option>
              <option value="deactivate">Deactivate</option>
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

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <FaSpinner className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        ) : (
          <div className="p-6">
            {activeTab === 'subscribers' && <SubscribersView />}
            {activeTab === 'campaigns' && <CampaignsView />}
            {activeTab === 'templates' && (
              <div className="text-center py-12">
                <FaEdit className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Email templates management coming soon</p>
              </div>
            )}
            {activeTab === 'lists' && (
              <div className="text-center py-12">
                <FaTag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Subscriber lists management coming soon</p>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <FaChartLine className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Advanced analytics coming soon</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterSubscriptionManager;