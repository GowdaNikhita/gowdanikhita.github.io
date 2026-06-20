import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { posts } from '../data/posts';
import '../styles/blog.css';

function ContentBlock({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'p':
      return <p>{block.text}</p>;
    case 'blockquote':
      return <blockquote>{block.text}</blockquote>;
    case 'ul':
      return (
        <ul>
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    default:
      return null;
  }
}

export function BlogPost() {
  const { slug } = useParams();
  const idx = posts.findIndex((p) => p.slug === slug);

  if (idx === -1) return <Navigate to="/blog" replace />;

  const post = posts[idx];
  const prev = posts[idx - 1] ?? null;
  const next = posts[idx + 1] ?? null;

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div className="container container-narrow">
        <Link to="/blog" className="post-back">
          <ArrowLeft size={14} /> Back to Field Notes
        </Link>

        <header className="post-header">
          <div className="post-meta">
            <span className="post-date">{post.date}</span>
            <span style={{ color: 'var(--border-strong)' }}>·</span>
            <span className="post-readtime">{post.readTime} min read</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
        </header>

        <div className="post-body">
          {post.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>

        <nav className="post-nav" aria-label="Post navigation">
          <div>
            {next && (
              <Link to={`/blog/${next.slug}`} className="post-nav-link">
                <span className="post-nav-label"><ArrowLeft size={11} style={{ display: 'inline', marginRight: 4 }} />Older</span>
                <span className="post-nav-title">{next.title}</span>
              </Link>
            )}
          </div>
          <div>
            {prev && (
              <Link to={`/blog/${prev.slug}`} className="post-nav-link post-nav-right">
                <span className="post-nav-label">Newer <ArrowRight size={11} style={{ display: 'inline', marginLeft: 4 }} /></span>
                <span className="post-nav-title">{prev.title}</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
