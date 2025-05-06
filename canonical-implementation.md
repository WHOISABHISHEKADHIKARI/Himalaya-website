# Canonical Tag Implementation Guide

## Overview
Canonical tags help search engines understand which version of a page is the primary one when duplicate or similar content exists across multiple URLs. Based on the Google Search Console report, there are issues with duplicate content and improper canonical tag implementation.

## Implementation Instructions

### 1. For Standard Pages

Ensure all standard pages use the SEO component with the canonical URL parameter:

```jsx
<SEO 
  title="Page Title"
  description="Page description"
  canonicalUrl="https://krishihimalaya.com/page-path"
/>
```

### 2. For Duplicate Content Pages

When you have similar content across multiple pages (like language variations or pagination):

```jsx
// For a page that is a duplicate of another
<SEO 
  title="Duplicate Page Title"
  description="Page description"
  canonicalUrl="https://krishihimalaya.com/primary-page-path" // Point to the primary version
/>
```

### 3. For Paginated Content

For paginated content, use the following approach:

```jsx
// First page
<SEO 
  title="Page 1 Title"
  description="Page description"
  canonicalUrl="https://krishihimalaya.com/content" // First page is canonical to itself
  children={
    <>
      <link rel="next" href="https://krishihimalaya.com/content?page=2" />
    </>
  }
/>

// Middle pages
<SEO 
  title="Page 2 Title"
  description="Page description"
  canonicalUrl="https://krishihimalaya.com/content?page=2" // Each page is canonical to itself
  children={
    <>
      <link rel="prev" href="https://krishihimalaya.com/content?page=1" />
      <link rel="next" href="https://krishihimalaya.com/content?page=3" />
    </>
  }
/>

// Last page
<SEO 
  title="Page 3 Title"
  description="Page description"
  canonicalUrl="https://krishihimalaya.com/content?page=3" // Last page is canonical to itself
  children={
    <>
      <link rel="prev" href="https://krishihimalaya.com/content?page=2" />
    </>
  }
/>
```

### 4. For Language Variations

For multi-language content, implement hreflang tags:

```jsx
<SEO 
  title="English Page Title"
  description="English page description"
  canonicalUrl="https://krishihimalaya.com/page-path"
  children={
    <>
      <link rel="alternate" hrefLang="en" href="https://krishihimalaya.com/page-path" />
      <link rel="alternate" hrefLang="ne" href="https://krishihimalaya.com/ne/page-path" />
      <link rel="alternate" hrefLang="x-default" href="https://krishihimalaya.com/page-path" />
    </>
  }
/>
```

## Common Issues to Fix

1. **Missing Canonical Tags**: Ensure every page has a canonical tag.
2. **Self-Referencing Canonicals**: Most pages should have a self-referencing canonical tag.
3. **Inconsistent URLs**: Ensure canonical URLs use the same protocol (https) and domain format consistently.
4. **Pagination Issues**: Implement proper rel="prev" and rel="next" for paginated content.
5. **Multiple Canonicals**: Ensure no page has multiple canonical tags.

## Implementation Checklist

- [ ] Update all page components to use the SEO component
- [ ] Add canonical URLs to all pages
- [ ] Fix duplicate content issues by pointing to primary versions
- [ ] Implement hreflang tags for multi-language content
- [ ] Validate canonical implementation using Google Search Console