import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBold, FaItalic, FaUnderline, FaStrikethrough, FaCode,
  FaListUl, FaListOl, FaQuoteLeft, FaLink, FaImage,
  FaTable, FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaUndo, FaRedo, FaEye, FaEdit, FaExpand, FaCompress,
  FaPalette, FaFont, FaTextHeight, FaRobot, FaClipboard,
  FaCheck, FaTimes, FaPlus, FaMinus, FaTrash, FaArrowUp,
  FaArrowDown, FaArrowLeft, FaArrowRight, FaSave, FaSpinner
} from 'react-icons/fa';

// Enhanced Rich Text Editor Component
export const EnhancedRichTextEditor = ({
  value = '',
  onChange,
  placeholder = 'Start writing your content...',
  height = '400px',
  enableAI = true,
  enableTables = true,
  enableImages = true,
  enableMarkdown = true,
  className = '',
  onImageUpload,
  aiApiKey = null
}) => {
  const [content, setContent] = useState(value);
  const [isMarkdownMode, setIsMarkdownMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showTableDialog, setShowTableDialog] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [linkData, setLinkData] = useState({ url: '', text: '', target: '_blank', rel: 'noopener' });
  const [imageData, setImageData] = useState({ src: '', alt: '', caption: '', width: '', height: '' });
  const [tableData, setTableData] = useState({ rows: 3, cols: 3, hasHeader: true });
  const [history, setHistory] = useState([value]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setContent(value);
  }, [value]);

  useEffect(() => {
    if (onChange) {
      onChange(content);
    }
  }, [content, onChange]);

  // Save to history for undo/redo
  const saveToHistory = useCallback((newContent) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newContent);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // Handle content change
  const handleContentChange = (newContent) => {
    setContent(newContent);
    saveToHistory(newContent);
  };

  // Undo/Redo functionality
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
    }
  };

  // Format text functions
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      handleContentChange(editorRef.current.innerHTML);
    }
  };

  // Get selected text
  const getSelectedText = () => {
    const selection = window.getSelection();
    return selection.toString();
  };

  // Insert HTML at cursor
  const insertHTML = (html) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const div = document.createElement('div');
      div.innerHTML = html;
      const fragment = document.createDocumentFragment();
      while (div.firstChild) {
        fragment.appendChild(div.firstChild);
      }
      range.insertNode(fragment);
      if (editorRef.current) {
        handleContentChange(editorRef.current.innerHTML);
      }
    }
  };

  // Handle link insertion
  const handleInsertLink = () => {
    const selected = getSelectedText();
    setLinkData({ ...linkData, text: selected || linkData.text });
    setShowLinkDialog(true);
  };

  const insertLink = () => {
    const linkHTML = `<a href="${linkData.url}" target="${linkData.target}" rel="${linkData.rel}">${linkData.text}</a>`;
    insertHTML(linkHTML);
    setShowLinkDialog(false);
    setLinkData({ url: '', text: '', target: '_blank', rel: 'noopener' });
  };

  // Handle image insertion
  const handleInsertImage = () => {
    setShowImageDialog(true);
  };

  const insertImage = () => {
    let imageHTML = `<img src="${imageData.src}" alt="${imageData.alt}"`;
    if (imageData.width) imageHTML += ` width="${imageData.width}"`;
    if (imageData.height) imageHTML += ` height="${imageData.height}"`;
    imageHTML += ` style="max-width: 100%; height: auto;" />`;
    
    if (imageData.caption) {
      imageHTML = `<figure>${imageHTML}<figcaption>${imageData.caption}</figcaption></figure>`;
    }
    
    insertHTML(imageHTML);
    setShowImageDialog(false);
    setImageData({ src: '', alt: '', caption: '', width: '', height: '' });
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && onImageUpload) {
      try {
        const imageUrl = await onImageUpload(file);
        setImageData({ ...imageData, src: imageUrl, alt: file.name });
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
  };

  // Handle table insertion
  const handleInsertTable = () => {
    setShowTableDialog(true);
  };

  const insertTable = () => {
    let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">';
    
    for (let i = 0; i < tableData.rows; i++) {
      tableHTML += '<tr>';
      for (let j = 0; j < tableData.cols; j++) {
        const cellTag = (i === 0 && tableData.hasHeader) ? 'th' : 'td';
        tableHTML += `<${cellTag} style="border: 1px solid #ddd; padding: 8px; text-align: left;">`;
        tableHTML += (i === 0 && tableData.hasHeader) ? `Header ${j + 1}` : `Cell ${i + 1}-${j + 1}`;
        tableHTML += `</${cellTag}>`;
      }
      tableHTML += '</tr>';
    }
    
    tableHTML += '</table>';
    insertHTML(tableHTML);
    setShowTableDialog(false);
    setTableData({ rows: 3, cols: 3, hasHeader: true });
  };

  // AI Assistant functions
  const aiSuggestions = [
    { id: 'improve', label: 'Improve Writing', prompt: 'Improve the writing style and clarity of this text:' },
    { id: 'expand', label: 'Expand Content', prompt: 'Expand this content with more details and examples:' },
    { id: 'summarize', label: 'Summarize', prompt: 'Summarize this content in a concise way:' },
    { id: 'title', label: 'Generate Title', prompt: 'Generate 5 compelling titles for this content:' },
    { id: 'meta', label: 'Meta Description', prompt: 'Generate an SEO-friendly meta description for this content:' },
    { id: 'keywords', label: 'Extract Keywords', prompt: 'Extract relevant SEO keywords from this content:' },
    { id: 'outline', label: 'Create Outline', prompt: 'Create a detailed outline for this topic:' },
    { id: 'intro', label: 'Write Introduction', prompt: 'Write an engaging introduction for this topic:' }
  ];

  const handleAIAssist = async (suggestion) => {
    if (!aiApiKey) {
      alert('AI API key not configured');
      return;
    }

    setAiLoading(true);
    try {
      const selectedContent = getSelectedText() || content.replace(/<[^>]*>/g, '').slice(0, 1000);
      const prompt = `${suggestion.prompt}\n\n${selectedContent}`;
      
      // Simulate AI API call (replace with actual API integration)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI response
      const aiResponse = `[AI Generated Content for "${suggestion.label}"]\n\nThis is a simulated AI response. In a real implementation, this would be the actual AI-generated content based on your prompt: "${suggestion.prompt}"\n\nOriginal content: ${selectedContent.slice(0, 100)}...`;
      
      // Insert AI response
      insertHTML(`<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 10px; margin: 10px 0;"><strong>AI Suggestion (${suggestion.label}):</strong><br/>${aiResponse.replace(/\n/g, '<br/>')}</div>`);
      
    } catch (error) {
      console.error('AI assistance failed:', error);
      alert('AI assistance failed. Please try again.');
    } finally {
      setAiLoading(false);
      setShowAIAssistant(false);
    }
  };

  // Convert to/from Markdown
  const convertToMarkdown = (html) => {
    // Basic HTML to Markdown conversion
    return html
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
      .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
      .replace(/<a[^>]*href="([^"]*)[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      .replace(/<img[^>]*src="([^"]*)[^>]*alt="([^"]*)[^>]*>/gi, '![$2]($1)')
      .replace(/<ul[^>]*>/gi, '')
      .replace(/<\/ul>/gi, '')
      .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
      .replace(/<ol[^>]*>/gi, '')
      .replace(/<\/ol>/gi, '')
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
      .replace(/<[^>]*>/g, '')
      .trim();
  };

  const convertFromMarkdown = (markdown) => {
    // Basic Markdown to HTML conversion
    return markdown
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\n/g, '<br />');
  };

  const toggleMarkdownMode = () => {
    if (isMarkdownMode) {
      // Convert from Markdown to HTML
      const htmlContent = convertFromMarkdown(content);
      setContent(htmlContent);
    } else {
      // Convert from HTML to Markdown
      const markdownContent = convertToMarkdown(content);
      setContent(markdownContent);
    }
    setIsMarkdownMode(!isMarkdownMode);
  };

  // Toolbar component
  const Toolbar = () => (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
      {/* History Controls */}
      <div className="flex items-center gap-1 mr-2 border-r border-gray-300 pr-2">
        <button
          onClick={undo}
          disabled={historyIndex <= 0}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Undo"
        >
          <FaUndo />
        </button>
        <button
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Redo"
        >
          <FaRedo />
        </button>
      </div>

      {/* Text Formatting */}
      <div className="flex items-center gap-1 mr-2 border-r border-gray-300 pr-2">
        <button
          onClick={() => formatText('bold')}
          className="p-2 rounded hover:bg-gray-200"
          title="Bold"
        >
          <FaBold />
        </button>
        <button
          onClick={() => formatText('italic')}
          className="p-2 rounded hover:bg-gray-200"
          title="Italic"
        >
          <FaItalic />
        </button>
        <button
          onClick={() => formatText('underline')}
          className="p-2 rounded hover:bg-gray-200"
          title="Underline"
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => formatText('strikeThrough')}
          className="p-2 rounded hover:bg-gray-200"
          title="Strikethrough"
        >
          <FaStrikethrough />
        </button>
      </div>

      {/* Headings */}
      <div className="flex items-center gap-1 mr-2 border-r border-gray-300 pr-2">
        <select
          onChange={(e) => formatText('formatBlock', e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded text-sm"
          defaultValue=""
        >
          <option value="">Format</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="p">Paragraph</option>
        </select>
      </div>

      {/* Lists */}
      <div className="flex items-center gap-1 mr-2 border-r border-gray-300 pr-2">
        <button
          onClick={() => formatText('insertUnorderedList')}
          className="p-2 rounded hover:bg-gray-200"
          title="Bullet List"
        >
          <FaListUl />
        </button>
        <button
          onClick={() => formatText('insertOrderedList')}
          className="p-2 rounded hover:bg-gray-200"
          title="Numbered List"
        >
          <FaListOl />
        </button>
        <button
          onClick={() => formatText('indent')}
          className="p-2 rounded hover:bg-gray-200"
          title="Indent"
        >
          <FaArrowRight />
        </button>
        <button
          onClick={() => formatText('outdent')}
          className="p-2 rounded hover:bg-gray-200"
          title="Outdent"
        >
          <FaArrowLeft />
        </button>
      </div>

      {/* Alignment */}
      <div className="flex items-center gap-1 mr-2 border-r border-gray-300 pr-2">
        <button
          onClick={() => formatText('justifyLeft')}
          className="p-2 rounded hover:bg-gray-200"
          title="Align Left"
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => formatText('justifyCenter')}
          className="p-2 rounded hover:bg-gray-200"
          title="Align Center"
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => formatText('justifyRight')}
          className="p-2 rounded hover:bg-gray-200"
          title="Align Right"
        >
          <FaAlignRight />
        </button>
      </div>

      {/* Insert Elements */}
      <div className="flex items-center gap-1 mr-2 border-r border-gray-300 pr-2">
        <button
          onClick={handleInsertLink}
          className="p-2 rounded hover:bg-gray-200"
          title="Insert Link"
        >
          <FaLink />
        </button>
        {enableImages && (
          <button
            onClick={handleInsertImage}
            className="p-2 rounded hover:bg-gray-200"
            title="Insert Image"
          >
            <FaImage />
          </button>
        )}
        {enableTables && (
          <button
            onClick={handleInsertTable}
            className="p-2 rounded hover:bg-gray-200"
            title="Insert Table"
          >
            <FaTable />
          </button>
        )}
        <button
          onClick={() => insertHTML('<hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />')}
          className="p-2 rounded hover:bg-gray-200"
          title="Insert Horizontal Rule"
        >
          <FaMinus />
        </button>
      </div>

      {/* View Options */}
      <div className="flex items-center gap-1 mr-2 border-r border-gray-300 pr-2">
        {enableMarkdown && (
          <button
            onClick={toggleMarkdownMode}
            className={`p-2 rounded hover:bg-gray-200 ${isMarkdownMode ? 'bg-blue-100 text-blue-600' : ''}`}
            title={isMarkdownMode ? 'Switch to Visual Mode' : 'Switch to Markdown Mode'}
          >
            {isMarkdownMode ? <FaEye /> : <FaEdit />}
          </button>
        )}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 rounded hover:bg-gray-200"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
      </div>

      {/* AI Assistant */}
      {enableAI && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowAIAssistant(true)}
            className="p-2 rounded hover:bg-gray-200 text-purple-600"
            title="AI Assistant"
            disabled={aiLoading}
          >
            {aiLoading ? <FaSpinner className="animate-spin" /> : <FaRobot />}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`border border-gray-300 rounded-lg overflow-hidden bg-white ${className} ${
        isFullscreen ? 'fixed inset-0 z-50' : ''
      }`}
    >
      <Toolbar />
      
      {/* Editor Content */}
      <div className="relative">
        {isMarkdownMode ? (
          <textarea
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 border-none outline-none resize-none font-mono text-sm"
            style={{ height: isFullscreen ? 'calc(100vh - 60px)' : height }}
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable="true"
            dangerouslySetInnerHTML={{ __html: content }}
            onInput={(e) => handleContentChange(e.target.innerHTML)}
            onMouseUp={() => setSelectedText(getSelectedText())}
            onKeyUp={() => setSelectedText(getSelectedText())}
            className="w-full p-4 border-none outline-none overflow-y-auto prose max-w-none"
            style={{ height: isFullscreen ? 'calc(100vh - 60px)' : height, minHeight: '200px' }}
            data-placeholder={placeholder}
          />
        )}
      </div>

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Link Dialog */}
      <AnimatePresence>
        {showLinkDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowLinkDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Text</label>
                  <input
                    type="text"
                    value={linkData.text}
                    onChange={(e) => setLinkData({ ...linkData, text: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter link text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    value={linkData.url}
                    onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                    <select
                      value={linkData.target}
                      onChange={(e) => setLinkData({ ...linkData, target: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="_blank">New Window</option>
                      <option value="_self">Same Window</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rel</label>
                    <input
                      type="text"
                      value={linkData.rel}
                      onChange={(e) => setLinkData({ ...linkData, rel: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="noopener"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowLinkDialog(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={insertLink}
                  disabled={!linkData.url || !linkData.text}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Insert Link
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Dialog */}
      <AnimatePresence>
        {showImageDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowImageDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={imageData.src}
                      onChange={(e) => setImageData({ ...imageData, src: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                      title="Upload Image"
                    >
                      <FaImage />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={imageData.alt}
                    onChange={(e) => setImageData({ ...imageData, alt: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the image"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Caption (Optional)</label>
                  <input
                    type="text"
                    value={imageData.caption}
                    onChange={(e) => setImageData({ ...imageData, caption: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Image caption"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Width (Optional)</label>
                    <input
                      type="text"
                      value={imageData.width}
                      onChange={(e) => setImageData({ ...imageData, width: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 300px or 50%"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (Optional)</label>
                    <input
                      type="text"
                      value={imageData.height}
                      onChange={(e) => setImageData({ ...imageData, height: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 200px or auto"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowImageDialog(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={insertImage}
                  disabled={!imageData.src}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Insert Image
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table Dialog */}
      <AnimatePresence>
        {showTableDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowTableDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Insert Table</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rows</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={tableData.rows}
                      onChange={(e) => setTableData({ ...tableData, rows: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Columns</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={tableData.cols}
                      onChange={(e) => setTableData({ ...tableData, cols: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={tableData.hasHeader}
                      onChange={(e) => setTableData({ ...tableData, hasHeader: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Include header row</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowTableDialog(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={insertTable}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Insert Table
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant Dialog */}
      <AnimatePresence>
        {showAIAssistant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowAIAssistant(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaRobot className="text-purple-600 text-xl" />
                <h3 className="text-lg font-semibold">AI Writing Assistant</h3>
              </div>
              
              <p className="text-gray-600 mb-4">
                Select text in the editor or use the entire content for AI assistance.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {aiSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleAIAssist(suggestion)}
                    disabled={aiLoading}
                    className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="font-medium text-sm">{suggestion.label}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {suggestion.prompt.slice(0, 50)}...
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowAIAssistant(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedRichTextEditor;