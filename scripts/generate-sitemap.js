import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const urls = [
  { loc: 'https://www.krishihimalaya.com/', changefreq: 'daily', priority: 1.0 },
  { loc: 'https://www.krishihimalaya.com/blog/', changefreq: 'weekly', priority: 0.8 },
  // Add other URLs here
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

writeFileSync(join(__dirname, '../public/sitemap.xml'), sitemapContent, 'utf8');
console.log('Sitemap generated successfully.');