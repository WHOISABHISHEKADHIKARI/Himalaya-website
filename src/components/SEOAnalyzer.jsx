import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FaSearch, FaCheckCircle, FaExclamationTriangle, FaTimesCircle,
  FaEye, FaKeyboard, FaImage, FaLink, FaHeading, FaClock,
  FaChartLine, FaLightbulb, FaRobot, FaGlobe, FaShare
} from 'react-icons/fa';

// SEO Analyzer Component
export const SEOAnalyzer = ({ content, title, metaDescription, metaKeywords, slug, featuredImage, onSuggestionApply }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Analyze content whenever inputs change
  useEffect(() => {
    if (content || title) {
      analyzeContent();
    }
  }, [content, title, metaDescription, metaKeywords, slug, featuredImage]);

  const analyzeContent = async () => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const textContent = content ? content.replace(/<[^>]*>/g, '') : '';
      const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
      const readingTime = Math.ceil(wordCount / 200);
      
      // Extract headings
      const headings = {
        h1: (content?.match(/<h1[^>]*>(.*?)<\/h1>/gi) || []).map(h => h.replace(/<[^>]*>/g, '')),
        h2: (content?.match(/<h2[^>]*>(.*?)<\/h2>/gi) || []).map(h => h.replace(/<[^>]*>/g, '')),
        h3: (content?.match(/<h3[^>]*>(.*?)<\/h3>/gi) || []).map(h => h.replace(/<[^>]*>/g, '')),
        h4: (content?.match(/<h4[^>]*>(.*?)<\/h4>/gi) || []).map(h => h.replace(/<[^>]*>/g, '')),
        h5: (content?.match(/<h5[^>]*>(.*?)<\/h5>/gi) || []).map(h => h.replace(/<[^>]*>/g, '')),
        h6: (content?.match(/<h6[^>]*>(.*?)<\/h6>/gi) || []).map(h => h.replace(/<[^>]*>/g, ''))
      };
      
      // Extract images
      const images = content?.match(/<img[^>]*>/gi) || [];
      const imagesWithAlt = images.filter(img => img.includes('alt='));
      
      // Extract links
      const links = content?.match(/<a[^>]*href=["'][^"']*["'][^>]*>/gi) || [];
      const externalLinks = links.filter(link => 
        link.includes('http') && !link.includes(window.location.hostname)
      );
      
      // Keyword analysis
      const keywords = metaKeywords ? metaKeywords.split(',').map(k => k.trim().toLowerCase()) : [];
      const keywordDensity = keywords.map(keyword => {
        const regex = new RegExp(keyword, 'gi');
        const matches = (textContent.match(regex) || []).length;
        return {
          keyword,
          count: matches,
          density: wordCount > 0 ? ((matches / wordCount) * 100).toFixed(2) : 0
        };
      });
      
      // Calculate scores
      const scores = {
        title: calculateTitleScore(title),
        metaDescription: calculateMetaDescriptionScore(metaDescription),
        content: calculateContentScore(textContent, wordCount),
        headings: calculateHeadingsScore(headings),
        images: calculateImagesScore(images, imagesWithAlt),
        keywords: calculateKeywordsScore(keywordDensity, title, metaDescription, textContent),
        readability: calculateReadabilityScore(textContent),
        technical: calculateTechnicalScore(slug, featuredImage)
      };
      
      const overallScore = Math.round(
        (scores.title + scores.metaDescription + scores.content + scores.headings + 
         scores.images + scores.keywords + scores.readability + scores.technical) / 8
      );
      
      setAnalysis({
        overallScore,
        scores,
        wordCount,
        readingTime,
        headings,
        images: images.length,
        imagesWithAlt: imagesWithAlt.length,
        links: links.length,
        externalLinks: externalLinks.length,
        keywordDensity,
        suggestions: generateSuggestions(scores, {
          title,
          metaDescription,
          content: textContent,
          wordCount,
          headings,
          images,
          imagesWithAlt,
          keywords,
          slug
        })
      });
    } catch (error) {
      console.error('SEO analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Scoring functions
  const calculateTitleScore = (title) => {
    if (!title) return 0;
    const length = title.length;
    if (length >= 30 && length <= 60) return 100;
    if (length >= 20 && length <= 70) return 80;
    if (length >= 10 && length <= 80) return 60;
    return 30;
  };

  const calculateMetaDescriptionScore = (metaDescription) => {
    if (!metaDescription) return 0;
    const length = metaDescription.length;
    if (length >= 120 && length <= 160) return 100;
    if (length >= 100 && length <= 180) return 80;
    if (length >= 50 && length <= 200) return 60;
    return 30;
  };

  const calculateContentScore = (content, wordCount) => {
    if (wordCount >= 300 && wordCount <= 2000) return 100;
    if (wordCount >= 200 && wordCount <= 3000) return 80;
    if (wordCount >= 100) return 60;
    return 30;
  };

  const calculateHeadingsScore = (headings) => {
    const h1Count = headings.h1.length;
    const h2Count = headings.h2.length;
    const totalHeadings = Object.values(headings).flat().length;
    
    if (h1Count === 1 && h2Count >= 2 && totalHeadings >= 3) return 100;
    if (h1Count === 1 && totalHeadings >= 2) return 80;
    if (totalHeadings >= 1) return 60;
    return 30;
  };

  const calculateImagesScore = (images, imagesWithAlt) => {
    if (images.length === 0) return 70; // No images is okay
    const altRatio = imagesWithAlt.length / images.length;
    if (altRatio === 1) return 100;
    if (altRatio >= 0.8) return 80;
    if (altRatio >= 0.5) return 60;
    return 30;
  };

  const calculateKeywordsScore = (keywordDensity, title, metaDescription, content) => {
    if (keywordDensity.length === 0) return 50;
    
    const goodDensity = keywordDensity.filter(kw => 
      parseFloat(kw.density) >= 0.5 && parseFloat(kw.density) <= 3
    ).length;
    
    const keywordsInTitle = keywordDensity.filter(kw => 
      title?.toLowerCase().includes(kw.keyword)
    ).length;
    
    const keywordsInMeta = keywordDensity.filter(kw => 
      metaDescription?.toLowerCase().includes(kw.keyword)
    ).length;
    
    let score = (goodDensity / keywordDensity.length) * 40;
    score += (keywordsInTitle / keywordDensity.length) * 30;
    score += (keywordsInMeta / keywordDensity.length) * 30;
    
    return Math.min(100, Math.round(score));
  };

  const calculateReadabilityScore = (content) => {
    if (!content) return 0;
    
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = content.split(/\s+/).filter(w => w.length > 0);
    const avgWordsPerSentence = words.length / sentences.length;
    
    // Simple readability score based on sentence length
    if (avgWordsPerSentence <= 20) return 100;
    if (avgWordsPerSentence <= 25) return 80;
    if (avgWordsPerSentence <= 30) return 60;
    return 40;
  };

  const calculateTechnicalScore = (slug, featuredImage) => {
    let score = 0;
    
    // Slug check
    if (slug) {
      if (slug.length <= 60 && /^[a-z0-9-]+$/.test(slug)) score += 50;
      else if (slug.length <= 80) score += 30;
      else score += 10;
    }
    
    // Featured image check
    if (featuredImage) score += 50;
    
    return score;
  };

  // Generate suggestions
  const generateSuggestions = (scores, data) => {
    const suggestions = [];
    
    if (scores.title < 80) {
      suggestions.push({
        type: 'title',
        priority: 'high',
        message: 'Optimize your title length (30-60 characters recommended)',
        suggestion: data.title ? 
          `Consider: "${data.title.substring(0, 55)}${data.title.length > 55 ? '...' : ''}"` : 
          'Add a compelling title with your main keyword',
        action: 'title'
      });
    }
    
    if (scores.metaDescription < 80) {
      suggestions.push({
        type: 'meta',
        priority: 'high',
        message: 'Improve your meta description (120-160 characters)',
        suggestion: 'Write a compelling description that includes your main keywords and encourages clicks',
        action: 'metaDescription'
      });
    }
    
    if (scores.content < 80) {
      if (data.wordCount < 300) {
        suggestions.push({
          type: 'content',
          priority: 'medium',
          message: 'Content is too short for good SEO',
          suggestion: `Add ${300 - data.wordCount} more words to reach the minimum recommended length`,
          action: 'content'
        });
      }
    }
    
    if (scores.headings < 80) {
      suggestions.push({
        type: 'headings',
        priority: 'medium',
        message: 'Improve heading structure',
        suggestion: 'Use one H1 tag and multiple H2/H3 tags to organize your content',
        action: 'headings'
      });
    }
    
    if (scores.images < 80 && data.images.length > 0) {
      suggestions.push({
        type: 'images',
        priority: 'medium',
        message: 'Add alt text to all images',
        suggestion: `${data.images.length - data.imagesWithAlt.length} images are missing alt text`,
        action: 'images'
      });
    }
    
    if (scores.keywords < 70) {
      suggestions.push({
        type: 'keywords',
        priority: 'high',
        message: 'Optimize keyword usage',
        suggestion: 'Include your target keywords in title, meta description, and content naturally',
        action: 'keywords'
      });
    }
    
    return suggestions;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const ScoreCard = ({ title, score, icon: Icon, description }) => (
    <div className={`p-4 rounded-lg border ${getScoreBgColor(score)}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={getScoreColor(score)} />
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}%</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );

  const SuggestionCard = ({ suggestion }) => {
    const priorityColors = {
      high: 'border-red-200 bg-red-50',
      medium: 'border-yellow-200 bg-yellow-50',
      low: 'border-blue-200 bg-blue-50'
    };
    
    const priorityIcons = {
      high: FaTimesCircle,
      medium: FaExclamationTriangle,
      low: FaLightbulb
    };
    
    const Icon = priorityIcons[suggestion.priority];
    
    return (
      <div className={`p-4 rounded-lg border ${priorityColors[suggestion.priority]}`}>
        <div className="flex items-start gap-3">
          <Icon className={`mt-1 ${getScoreColor(suggestion.priority === 'high' ? 30 : suggestion.priority === 'medium' ? 60 : 80)}`} />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-1">{suggestion.message}</h4>
            <p className="text-sm text-gray-600 mb-3">{suggestion.suggestion}</p>
            {onSuggestionApply && (
              <button
                onClick={() => onSuggestionApply(suggestion)}
                className="text-sm bg-white px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Apply Suggestion
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-gray-600">Analyzing SEO...</span>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center py-8">
          <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">SEO Analysis</h3>
          <p className="text-gray-600">Add content to see SEO analysis and suggestions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">SEO Analysis</h3>
            <p className="text-sm text-gray-600">Optimize your content for search engines</p>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}>
              {analysis.overallScore}%
            </div>
            <div className="text-sm text-gray-600">Overall Score</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: 'Overview', icon: FaChartLine },
            { id: 'suggestions', label: 'Suggestions', icon: FaLightbulb },
            { id: 'keywords', label: 'Keywords', icon: FaKeyboard },
            { id: 'technical', label: 'Technical', icon: FaCog }
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
                {tab.id === 'suggestions' && analysis.suggestions.length > 0 && (
                  <span className="ml-1 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {analysis.suggestions.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ScoreCard
                title="Title"
                score={analysis.scores.title}
                icon={FaHeading}
                description="Title length and optimization"
              />
              <ScoreCard
                title="Meta Description"
                score={analysis.scores.metaDescription}
                icon={FaEye}
                description="Meta description quality"
              />
              <ScoreCard
                title="Content"
                score={analysis.scores.content}
                icon={FaNewspaper}
                description="Content length and quality"
              />
              <ScoreCard
                title="Keywords"
                score={analysis.scores.keywords}
                icon={FaKeyboard}
                description="Keyword optimization"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{analysis.wordCount}</div>
                <div className="text-sm text-gray-600">Words</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{analysis.readingTime}</div>
                <div className="text-sm text-gray-600">Min Read</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{analysis.images}</div>
                <div className="text-sm text-gray-600">Images</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{analysis.links}</div>
                <div className="text-sm text-gray-600">Links</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="space-y-4">
            {analysis.suggestions.length > 0 ? (
              analysis.suggestions.map((suggestion, index) => (
                <SuggestionCard key={index} suggestion={suggestion} />
              ))
            ) : (
              <div className="text-center py-8">
                <FaCheckCircle className="mx-auto h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Great Job!</h3>
                <p className="text-gray-600">Your content is well optimized for SEO</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'keywords' && (
          <div className="space-y-4">
            {analysis.keywordDensity.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-medium text-gray-900">Keyword</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-900">Count</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-900">Density</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.keywordDensity.map((kw, index) => {
                      const density = parseFloat(kw.density);
                      const status = density >= 0.5 && density <= 3 ? 'good' : density > 3 ? 'high' : 'low';
                      const statusColors = {
                        good: 'text-green-600 bg-green-100',
                        high: 'text-red-600 bg-red-100',
                        low: 'text-yellow-600 bg-yellow-100'
                      };
                      
                      return (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2 px-3 font-medium">{kw.keyword}</td>
                          <td className="py-2 px-3">{kw.count}</td>
                          <td className="py-2 px-3">{kw.density}%</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
                              {status === 'good' ? 'Optimal' : status === 'high' ? 'Too High' : 'Too Low'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <FaKeyboard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Keywords</h3>
                <p className="text-gray-600">Add keywords to analyze keyword density</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="space-y-6">
            {/* Headings Structure */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Heading Structure</h4>
              <div className="space-y-2">
                {Object.entries(analysis.headings).map(([level, headings]) => (
                  headings.length > 0 && (
                    <div key={level} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600 w-8">{level.toUpperCase()}</span>
                      <span className="text-sm text-gray-900">{headings.length} headings</span>
                      {headings.length > 0 && (
                        <div className="text-xs text-gray-500">({headings.slice(0, 2).join(', ')}{headings.length > 2 ? '...' : ''})</div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Images</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-lg font-semibold">{analysis.images}</div>
                  <div className="text-sm text-gray-600">Total Images</div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-lg font-semibold">{analysis.imagesWithAlt}</div>
                  <div className="text-sm text-gray-600">With Alt Text</div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Links</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-lg font-semibold">{analysis.links}</div>
                  <div className="text-sm text-gray-600">Total Links</div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-lg font-semibold">{analysis.externalLinks}</div>
                  <div className="text-sm text-gray-600">External Links</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SEOAnalyzer;