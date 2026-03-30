import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import './BlogDetailPage.scss';

// Sample blog data - in production this would come from an API
const BLOG_POSTS = {
  'traditional-indoor-catering-delhi-ncr': {
    id: 1,
    title: 'Traditional Indoor Catering Services in Delhi NCR',
    excerpt: 'Discover the authentic flavors of traditional Indian catering. Our expert chefs bring decades of experience to make your events memorable with pure vegetarian cuisines.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Catering',
    date: '2024-01-15',
    author: 'The Famous Halwai Team',
    content: `
      <p>When it comes to celebrating special occasions in Delhi NCR, the food plays a central role in making the event memorable. Traditional indoor catering has been an integral part of Indian culture for centuries, bringing families together over authentic flavors that have been passed down through generations.</p>
      
      <h2>The Art of Traditional Indian Catering</h2>
      <p>At The Famous Halwai, we take pride in preserving the authenticity of traditional Indian cuisine. Our team of expert chefs brings decades of experience in preparing dishes that honor the rich culinary heritage of India. From royal thalis to regional specialties, every dish is prepared with meticulous attention to detail.</p>
      
      <h2>Why Choose Traditional Indoor Catering?</h2>
      <p>Traditional indoor catering offers a unique experience that outdoor or buffet catering simply cannot match. The intimacy of having chefs prepare food in your venue creates a more personal connection with your guests, and the aroma of freshly prepared dishes adds to the overall ambiance of your celebration.</p>
      
      <h2>Our Signature Dishes</h2>
      <p>From aromatic biryanis to creamy dal preparations, from crispy appetizers to decadent desserts, our menu showcases the best of Indian cuisine. We specialize in pure vegetarian dishes that cater to all taste preferences while maintaining the highest standards of hygiene and quality.</p>
      
      <h2>Making Your Event Special</h2>
      <p>We understand that every event is unique. Our team works closely with you to customize the menu according to your preferences and requirements. Whether it's a wedding, corporate event, or family celebration, we ensure that the food becomes the highlight of your memorable occasion.</p>
    `,
  },
  'wedding-catering-delhi-ncr': {
    id: 2,
    title: 'Wedding Catering Packages That Wow Your Guests',
    excerpt: 'From royal thalis to international cuisines, explore our comprehensive wedding catering solutions designed to make your special day truly unforgettable.',
    image: 'https://images.pexels.com/photos/11232639/pexels-photo-11232639.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Weddings',
    date: '2024-01-10',
    author: 'The Famous Halwai Team',
    content: `
      <p>Your wedding day is one of the most memorable occasions of your life, and the food you serve your guests can make or break the experience. At The Famous Halwai, we specialize in creating wedding catering experiences that leave a lasting impression on your guests.</p>
      
      <h2>Comprehensive Wedding Packages</h2>
      <p>Our wedding catering packages are designed to cover every aspect of your special day. From the welcome drinks to the final dessert, we ensure that every dish is prepared to perfection. Our team handles everything, allowing you to focus on enjoying your special day.</p>
      
      <h2>Customized Menu Options</h2>
      <p>We believe that every couple deserves a menu that reflects their unique tastes and preferences. Our team works closely with you to create a customized menu that combines traditional favorites with modern favorites, ensuring there's something for everyone.</p>
    `,
  },
  'corporate-event-catering': {
    id: 3,
    title: 'Corporate Event Catering - Professional Service Guaranteed',
    excerpt: 'Impress your clients and employees with our premium corporate catering services. We handle meetings, conferences, and team celebrations with equal excellence.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Corporate',
    date: '2024-01-05',
    author: 'The Famous Halwai Team',
    content: `
      <p>Corporate events require a different level of professionalism and efficiency. At The Famous Halwai, we understand the importance of making the right impression, whether you're hosting a business meeting, conference, or team celebration.</p>
    `,
  },
  'best-halwai-near-me': {
    id: 4,
    title: 'Finding the Best Halwai Near You in Delhi NCR',
    excerpt: 'A comprehensive guide to choosing the perfect halwai for your events. Learn what to look for and questions to ask before making your decision.',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Guide',
    date: '2023-12-28',
    author: 'The Famous Halwai Team',
    content: `
      <p>Finding the right halwai for your event can be a challenging task. With so many options available, it's important to know what to look for to ensure you make the best choice for your special occasion.</p>
    `,
  },
  'birthday-party-catering-ideas': {
    id: 5,
    title: 'Creative Birthday Party Catering Ideas for Kids & Adults',
    excerpt: 'Make your next birthday celebration special with these unique catering ideas. From themed menus to interactive food stations, we have it all covered.',
    image: 'https://images.pexels.com/photos/3062545/pexels-photo-3062545.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Party Ideas',
    date: '2023-12-20',
    author: 'The Famous Halwai Team',
    content: `
      <p>Birthday parties are incomplete without delicious food. Whether you're planning a children's birthday party or an adult celebration, The Famous Halwai has creative catering ideas that will make your party stand out.</p>
    `,
  },
  'vegetarian-catering-delhi': {
    id: 6,
    title: 'Premium Vegetarian Catering Services in Delhi',
    excerpt: 'Explore our extensive range of pure vegetarian dishes. From traditional North Indian to South Indian delicacies, we cater to all taste preferences.',
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Catering',
    date: '2023-12-15',
    author: 'The Famous Halwai Team',
    content: `
      <p>Vegetarian cuisine is an integral part of Indian food culture. At The Famous Halwai, we take pride in offering an extensive range of pure vegetarian dishes that showcase the diversity and richness of Indian cuisine.</p>
    `,
  },
};

// Related posts
const RELATED_POSTS = [
  {
    id: 2,
    slug: 'wedding-catering-delhi-ncr',
    title: 'Wedding Catering Packages That Wow Your Guests',
    image: 'https://images.pexels.com/photos/11232639/pexels-photo-11232639.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 4,
    slug: 'best-halwai-near-me',
    title: 'Finding the Best Halwai Near You in Delhi NCR',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 6,
    slug: 'vegetarian-catering-delhi',
    title: 'Premium Vegetarian Catering Services in Delhi',
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS[slug];

  if (!post) {
    return (
      <div className="blog-detail">
        <div className="blog-detail__not-found">
          <h1>Blog Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="blog-detail__back-link">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail">
      {/* Hero Section */}
      <section className="blog-detail__hero" style={{ backgroundImage: `url(${post.image})` }}>
        <div className="blog-detail__hero-overlay" />
        <div className="blog-detail__hero-content">
          <nav className="blog-detail__breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={13} />
            <Link to="/blog">Blog</Link>
            <ChevronRight size={13} />
            <span>{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Article Content */}
      <section className="blog-detail__content">
        <div className="blog-detail__inner">
          <Link to="/blog" className="blog-detail__back">
            <ArrowLeft size={18} /> Back to Blog
          </Link>

          <article className="blog-detail__article">
            <header className="blog-detail__header">
              <span className="blog-detail__cat">{post.category}</span>
              <h1 className="blog-detail__title">{post.title}</h1>
              <div className="blog-detail__meta">
                <span><Calendar size={16} /> {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span><User size={16} /> {post.author}</span>
              </div>
            </header>

            <img src={post.image} alt={post.title} className="blog-detail__featured-img" />

            <div className="blog-detail__body" dangerouslySetInnerHTML={{ __html: post.content }} />

            <footer className="blog-detail__footer">
              <div className="blog-detail__share">
                <span>Share this article:</span>
                <div className="blog-detail__share-links">
                  <a href="#" className="blog-detail__share-link"><Facebook size={18} /></a>
                  <a href="#" className="blog-detail__share-link"><Twitter size={18} /></a>
                  <a href="#" className="blog-detail__share-link"><Linkedin size={18} /></a>
                </div>
              </div>
            </footer>
          </article>

          {/* Sidebar */}
          <aside className="blog-detail__sidebar">
            <div className="blog-detail__sidebar-section">
              <h3 className="blog-detail__sidebar-title">Related Articles</h3>
              <div className="blog-detail__related">
                {RELATED_POSTS.map((related) => (
                  <Link key={related.id} to={`/blog/${related.slug}`} className="blog-detail__related-card">
                    <img src={related.image} alt={related.title} className="blog-detail__related-img" />
                    <h4 className="blog-detail__related-title">{related.title}</h4>
                  </Link>
                ))}
              </div>
            </div>

            <div className="blog-detail__sidebar-section blog-detail__sidebar-cta">
              <h3>Book Our Catering Services</h3>
              <p>Get in touch with us for your next event</p>
              <Link to="/enquiry" className="blog-detail__sidebar-btn">Enquire Now</Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
