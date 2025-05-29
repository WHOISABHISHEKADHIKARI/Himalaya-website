import React from 'react';
import { Link } from 'react-router-dom';

const InternalLinks = ({ currentPage, relatedPages }) => {
  return (
    <nav aria-label="Related pages" className="internal-links">
      <h3>Related Topics</h3>
      <ul>
        {relatedPages.map(page => (
          <li key={page.slug}>
            <Link 
              to={page.url} 
              title={page.description}
              rel="related"
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default InternalLinks;