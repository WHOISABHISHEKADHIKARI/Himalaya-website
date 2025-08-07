import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaBold, FaItalic, FaUnderline, FaStrikethrough,
    FaListUl, FaListOl, FaQuoteLeft, FaCode,
    FaLink, FaImage, FaUndo, FaRedo, FaAlignLeft,
    FaAlignCenter, FaAlignRight, FaHeading
} from 'react-icons/fa';

const RichTextEditor = ({ value, onChange, placeholder = "Start writing your story...", height = 400 }) => {
    const editorRef = useRef(null);
    const [isToolbarVisible, setIsToolbarVisible] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [showLinkDialog, setShowLinkDialog] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const handleSelection = () => {
        const selection = window.getSelection();
        const text = selection.toString();
        setSelectedText(text);
        setIsToolbarVisible(text.length > 0);
    };

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current.focus();
        handleInput();
    };

    const insertHeading = (level) => {
        execCommand('formatBlock', `h${level}`);
    };

    const insertLink = () => {
        if (selectedText) {
            setShowLinkDialog(true);
        } else {
            const url = prompt('Enter URL:');
            if (url) {
                execCommand('createLink', url);
            }
        }
    };

    const confirmLink = () => {
        if (linkUrl) {
            execCommand('createLink', linkUrl);
            setShowLinkDialog(false);
            setLinkUrl('');
        }
    };

    const insertImage = () => {
        setShowImageDialog(true);
    };

    const confirmImage = () => {
        if (imageUrl) {
            execCommand('insertImage', imageUrl);
            setShowImageDialog(false);
            setImageUrl('');
        }
    };

    const toolbarButtons = [
        { icon: FaBold, command: 'bold', title: 'Bold (Ctrl+B)' },
        { icon: FaItalic, command: 'italic', title: 'Italic (Ctrl+I)' },
        { icon: FaUnderline, command: 'underline', title: 'Underline (Ctrl+U)' },
        { icon: FaStrikethrough, command: 'strikeThrough', title: 'Strikethrough' },
        { divider: true },
        { icon: FaListUl, command: 'insertUnorderedList', title: 'Bullet List' },
        { icon: FaListOl, command: 'insertOrderedList', title: 'Numbered List' },
        { icon: FaQuoteLeft, command: 'formatBlock', value: 'blockquote', title: 'Quote' },
        { divider: true },
        { icon: FaAlignLeft, command: 'justifyLeft', title: 'Align Left' },
        { icon: FaAlignCenter, command: 'justifyCenter', title: 'Align Center' },
        { icon: FaAlignRight, command: 'justifyRight', title: 'Align Right' },
        { divider: true },
        { icon: FaLink, action: insertLink, title: 'Insert Link' },
        { icon: FaImage, action: insertImage, title: 'Insert Image' },
        { divider: true },
        { icon: FaUndo, command: 'undo', title: 'Undo (Ctrl+Z)' },
        { icon: FaRedo, command: 'redo', title: 'Redo (Ctrl+Y)' }
    ];

    const headingButtons = [
        { label: 'H1', action: () => insertHeading(1) },
        { label: 'H2', action: () => insertHeading(2) },
        { label: 'H3', action: () => insertHeading(3) },
        { label: 'P', action: () => execCommand('formatBlock', 'p') }
    ];

    return (
        <div className="relative border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#1C4E37] focus-within:border-transparent">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-200 p-3">
                <div className="flex flex-wrap items-center gap-1">
                    {/* Heading Buttons */}
                    <div className="flex items-center gap-1 mr-3">
                        <FaHeading className="text-gray-600 mr-2" />
                        {headingButtons.map((btn, index) => (
                            <button
                                key={index}
                                onClick={btn.action}
                                className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors"
                                title={`Format as ${btn.label}`}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="w-px h-6 bg-gray-300 mx-2" />

                    {/* Main Toolbar Buttons */}
                    {toolbarButtons.map((btn, index) => {
                        if (btn.divider) {
                            return <div key={index} className="w-px h-6 bg-gray-300 mx-2" />;
                        }

                        const Icon = btn.icon;
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    if (btn.action) {
                                        btn.action();
                                    } else {
                                        execCommand(btn.command, btn.value);
                                    }
                                }}
                                className="p-2 text-gray-600 hover:text-[#1C4E37] hover:bg-gray-200 rounded transition-colors"
                                title={btn.title}
                            >
                                <Icon className="text-sm" />
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable={true}
                onInput={handleInput}
                onMouseUp={handleSelection}
                onKeyUp={handleSelection}
                className="p-6 focus:outline-none prose prose-lg max-w-none"
                style={{
                    minHeight: `${height}px`,
                    lineHeight: '1.8',
                    fontSize: '16px'
                }}
                data-placeholder={placeholder}
            />

            {/* Floating Toolbar for Selected Text */}
            {isToolbarVisible && selectedText && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bg-gray-800 text-white rounded-lg shadow-lg p-2 flex items-center gap-1 z-10"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <button
                        onClick={() => execCommand('bold')}
                        className="p-2 hover:bg-gray-700 rounded transition-colors"
                        title="Bold"
                    >
                        <FaBold className="text-sm" />
                    </button>
                    <button
                        onClick={() => execCommand('italic')}
                        className="p-2 hover:bg-gray-700 rounded transition-colors"
                        title="Italic"
                    >
                        <FaItalic className="text-sm" />
                    </button>
                    <button
                        onClick={insertLink}
                        className="p-2 hover:bg-gray-700 rounded transition-colors"
                        title="Link"
                    >
                        <FaLink className="text-sm" />
                    </button>
                </motion.div>
            )}

            {/* Link Dialog */}
            {showLinkDialog && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
                    >
                        <h3 className="text-lg font-semibold mb-4">Add Link</h3>
                        <input
                            type="url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent mb-4"
                            autoFocus
                        />
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setShowLinkDialog(false);
                                    setLinkUrl('');
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLink}
                                className="px-4 py-2 bg-[#1C4E37] text-white rounded hover:bg-[#164A32] transition-colors"
                            >
                                Add Link
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Image Dialog */}
            {showImageDialog && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
                    >
                        <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent mb-4"
                            autoFocus
                        />
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setShowImageDialog(false);
                                    setImageUrl('');
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmImage}
                                className="px-4 py-2 bg-[#1C4E37] text-white rounded hover:bg-[#164A32] transition-colors"
                            >
                                Insert Image
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            <style jsx>{`
                [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: #9CA3AF;
                    font-style: italic;
                }
                
                [contenteditable] h1 {
                    font-size: 2.25rem;
                    font-weight: bold;
                    margin: 1rem 0;
                    color: #1C4E37;
                }
                
                [contenteditable] h2 {
                    font-size: 1.875rem;
                    font-weight: bold;
                    margin: 0.875rem 0;
                    color: #1C4E37;
                }
                
                [contenteditable] h3 {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin: 0.75rem 0;
                    color: #1C4E37;
                }
                
                [contenteditable] blockquote {
                    border-left: 4px solid #1C4E37;
                    padding-left: 1rem;
                    margin: 1rem 0;
                    font-style: italic;
                    color: #4B5563;
                }
                
                [contenteditable] ul, [contenteditable] ol {
                    margin: 1rem 0;
                    padding-left: 2rem;
                }
                
                [contenteditable] img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }
                
                [contenteditable] a {
                    color: #1C4E37;
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;