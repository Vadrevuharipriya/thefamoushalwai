import { Link } from 'react-router-dom';
import { ChevronRight, Search, Calendar, User, ArrowRight } from 'lucide-react';
import './BlogPage.scss';

// Sample blog data - in production this would come from an API
const BLOG_POSTS = [
  {
    id: 1,
    slug: 'traditional-indoor-catering-delhi-ncr',
    title: 'Traditional Indoor Catering Services in Delhi NCR',
    excerpt: 'Discover the authentic flavors of traditional Indian catering. Our expert chefs bring decades of experience to make your events memorable with pure vegetarian cuisines.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Catering',
    date: '2024-01-15',
    author: 'The Famous Halwai Team',
  },
  {
    id: 2,
    slug: 'wedding-catering-delhi-ncr',
    title: 'Wedding Catering Packages That Wow Your Guests',
    excerpt: 'From royal thalis to international cuisines, explore our comprehensive wedding catering solutions designed to make your special day truly unforgettable.',
    image: 'https://images.pexels.com/photos/11232639/pexels-photo-11232639.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Weddings',
    date: '2024-01-10',
    author: 'The Famous Halwai Team',
  },
  {
    id: 3,
    slug: 'corporate-event-catering',
    title: 'Corporate Event Catering - Professional Service Guaranteed',
    excerpt: 'Impress your clients and employees with our premium corporate catering services. We handle meetings, conferences, and team celebrations with equal excellence.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Corporate',
    date: '2024-01-05',
    author: 'The Famous Halwai Team',
  },
  {
    id: 4,
    slug: 'best-halwai-near-me',
    title: 'Finding the Best Halwai Near You in Delhi NCR',
    excerpt: 'A comprehensive guide to choosing the perfect halwai for your events. Learn what to look for and questions to ask before making your decision.',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Guide',
    date: '2023-12-28',
    author: 'The Famous Halwai Team',
  },
  {
    id: 5,
    slug: 'birthday-party-catering-ideas',
    title: 'Creative Birthday Party Catering Ideas for Kids & Adults',
    excerpt: 'Make your next birthday celebration special with these unique catering ideas. From themed menus to interactive food stations, we have it all covered.',
    image: 'https://images.pexels.com/photos/3062545/pexels-photo-3062545.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Party Ideas',
    date: '2023-12-20',
    author: 'The Famous Halwai Team',
  },
  {
    id: 6,
    slug: 'vegetarian-catering-delhi',
    title: 'Premium Vegetarian Catering Services in Delhi',
    excerpt: 'Explore our extensive range of pure vegetarian dishes. From traditional North Indian to South Indian delicacies, we cater to all taste preferences.',
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Catering',
    date: '2023-12-15',
    author: 'The Famous Halwai Team',
  },
];

const CATEGORIES = ['All', 'Catering', 'Weddings', 'Corporate', 'Guide', 'Party Ideas', 'Recipes', 'Tips'];

export default function BlogPage() {
  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero" style={{ backgroundImage: 'url(https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1600)' }}>
        <div className="blog-hero__overlay" />
        <div className="blog-hero__content">
          <nav className="blog-hero__breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={13} />
            <span>Blog</span>
          </nav>
          <h1 className="blog-hero__title">
            The Famous Halwai <span className="text-brand-gold">Blog</span>
          </h1>
          <p className="blog-hero__sub">
            Tips, guides, and insights about catering, event planning, and authentic Indian cuisine.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="blog-filter">
        <div className="blog-filter__inner">
          <div className="blog-filter__search">
            <Search size={18} className="blog-filter__search-icon" />
            <input type="text" placeholder="Search articles..." className="blog-filter__search-input" />
          </div>
          <div className="blog-filter__categories">
            {CATEGORIES.map((cat) => (
              <button key={cat} className={`blog-filter__cat ${cat === 'All' ? 'blog-filter__cat--active' : ''}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="blog-featured">
        <div className="blog-featured__inner">
          <div className="blog-featured__card">
            <img src={BLOG_POSTS[0].image} alt={BLOG_POSTS[0].title} className="blog-featured__img" />
            <div className="blog-featured__content">
              <span className="blog-featured__cat">{BLOG_POSTS[0].category}</span>
              <h2 className="blog-featured__title">{BLOG_POSTS[0].title}</h2>
              <p className="blog-featured__excerpt">{BLOG_POSTS[0].excerpt}</p>
              <div className="blog-featured__meta">
                <span><Calendar size={14} /> {new Date(BLOG_POSTS[0].date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span><User size={14} /> {BLOG_POSTS[0].author}</span>
              </div>
              <Link to={`/blog/${BLOG_POSTS[0].slug}`} className="blog-featured__link">
                Read More <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-grid">
        <div className="blog-grid__inner">
          <h2 className="blog-grid__heading">Latest Articles</h2>
          <div className="blog-grid__cards">
            {BLOG_POSTS.slice(1).map((post) => (
              <article key={post.id} className="blog-card">
                <img src={post.image} alt={post.title} className="blog-card__img" />
                <div className="blog-card__content">
                  <span className="blog-card__cat">{post.category}</span>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <div className="blog-card__meta">
                    <span><Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span><User size={12} /> {post.author}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="blog-card__link">
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="blog-cta">
        <div className="blog-cta__inner">
          <h2 className="blog-cta__title">Subscribe to Our Newsletter</h2>
          <p className="blog-cta__desc">Get the latest articles, tips, and exclusive offers delivered to your inbox.</p>
          <form className="blog-cta__form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="blog-cta__input" />
            <button type="submit" className="blog-cta__btn">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
