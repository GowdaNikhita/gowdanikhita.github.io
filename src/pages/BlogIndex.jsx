import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { posts } from '../data/posts';
import '../styles/blog.css';

export function BlogIndex() {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div className="container">
        <div className="blog-hero">
          <div className="blog-hero-eyebrow">
            <span className="mono-eyebrow">// SIGNAL LOG</span>
          </div>
          <h1 className="blog-hero-title">Field Notes</h1>
          <p className="blog-hero-sub">
            Writing about security engineering, LLM red-teaming, and cloud infrastructure — one month at a time. Opinions are my own and based on things I've actually built and broken.
          </p>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-meta">
                <span className="blog-card-date">{post.date}</span>
                <span className="blog-card-read">{post.readTime} min read</span>
              </div>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <span className="blog-card-cta">
                Read post <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
