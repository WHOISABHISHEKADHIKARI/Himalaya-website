# Google Search Console Cleanup Guide

## Phantom URLs Removal Process

The following malicious URLs are appearing in search results and need to be removed:

### Identified Phantom URL Patterns:
- `Classic/ckyfue/m109159032`
- `Classic/ckyfue/m109335855`
- `Classic/ckyfue/m10990070`
- `Classic/jddkaa/m109412487`
- `Ne/classic/ckyfue/m109411440`
- `Ne/ne/classic/phtjge/m109276773`
- `Ne/ne/classic/phtjge/m109192680`
- `Ne/home/index`
- `Mobile/login.html`

## Immediate Actions Required:

### 1. Google Search Console URL Removal
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property: `krishihimalaya.com`
3. Navigate to **Removals** in the left sidebar
4. Click **New Request**
5. Select **Remove this URL**
6. Add each phantom URL pattern:
   - `https://krishihimalaya.com/Classic/ckyfue/*`
   - `https://krishihimalaya.com/Classic/jddkaa/*`
   - `https://krishihimalaya.com/Ne/classic/*`
   - `https://krishihimalaya.com/Ne/ne/classic/*`
   - `https://krishihimalaya.com/Ne/home/*`
   - `https://krishihimalaya.com/Mobile/*`

### 2. Sitemap Resubmission
1. In Google Search Console, go to **Sitemaps**
2. Remove old sitemap if present
3. Submit new sitemap: `https://krishihimalaya.com/sitemap.xml`
4. Submit blog sitemap: `https://krishihimalaya.com/blog-sitemap.xml`

### 3. Request Re-indexing
1. Go to **URL Inspection** tool
2. Test each legitimate page:
   - `https://krishihimalaya.com/`
   - `https://krishihimalaya.com/about`
   - `https://krishihimalaya.com/vision`
   - `https://krishihimalaya.com/contact`
   - `https://krishihimalaya.com/agriculture-support-policies`
   - `https://krishihimalaya.com/NewsAboutUs`
3. Click **Request Indexing** for each valid page

### 4. Monitor and Verify
- Check search results weekly for phantom URLs
- Monitor Google Search Console for crawl errors
- Verify that security configurations are working

## Security Measures Implemented:

✅ **robots.txt** - Blocks phantom URL patterns
✅ **.htaccess** - Returns 403/404 for malicious URLs
✅ **_headers** - Netlify/Vercel security headers
✅ **Sitemap cleanup** - Removed invalid URLs
✅ **SEO route fixes** - Consistent URL structure

## Expected Timeline:
- **Immediate**: Phantom URLs return 404 errors
- **1-2 weeks**: Search Console removals processed
- **2-4 weeks**: Clean search results
- **4-6 weeks**: Complete cleanup and re-indexing

## Contact Information:
For technical support: info@krishihimalaya.com
Website: https://krishihimalaya.com

---
*Last updated: January 2025*