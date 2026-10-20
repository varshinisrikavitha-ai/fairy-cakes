import React, { useState } from 'react';
import {
  ArrowRight, CakeSlice, Check, Clock3, Heart, MapPin, Menu,
  MessageCircle, Phone, Send, Sparkles, X
} from 'lucide-react';
import { business, whatsappMessages, whatsappUrl } from './config/business';
import { cakes } from './data/cakes';
import { categories } from './data/categories';

const navItems = [
  ['Home', 'home'], ['Our Cakes', 'cakes'], ['Categories', 'categories'],
  ['Custom Orders', 'custom-orders'], ['About', 'about'], ['Contact', 'contact'],
];

function openWhatsApp(message) {
  const url = whatsappUrl(message);
  if (url) window.open(url, '_blank', 'noopener,noreferrer');
}

function Logo() {
  return <a className="logo" href="#home" aria-label="Fairy Cakes home">
    <span className="logo-mark"><CakeSlice size={19} /></span>
    <span><strong>Fairy Cakes</strong><small>HOME BAKES</small></span>
  </a>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="navbar"><div className="container nav-inner">
    <Logo />
    <button className="icon-button menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
      {open ? <X /> : <Menu />}
    </button>
    <nav className={open ? 'nav-links open' : 'nav-links'}>
      {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      <button className="button button-small" onClick={() => openWhatsApp(whatsappMessages.general)}><MessageCircle size={16} /> WhatsApp enquiry</button>
    </nav>
  </div></header>;
}

function SectionIntro({ eyebrow, title, copy }) {
  return <div className="section-intro"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function Hero() {
  return <section className="hero" id="home"><div className="container hero-grid">
    <div className="hero-copy"><span className="eyebrow">A little sweetness for every moment</span>
      <h1>Sweet moments begin with a <em>beautiful</em> cake.</h1>
      <p>Explore cake ideas for birthdays, celebrations and special occasions. Contact Fairy Cakes (Home Bakes) to discuss your custom cake requirements.</p>
      <div className="hero-actions"><a href="#cakes" className="button">Explore our cakes <ArrowRight size={17} /></a><button className="button button-light" onClick={() => openWhatsApp(whatsappMessages.general)}><MessageCircle size={17} /> Custom cake enquiry</button></div>
      <div className="hero-note"><span><Check size={15} /> Illustrative sample ideas</span><span><Check size={15} /> Availability by enquiry</span></div>
    </div>
    <div className="hero-art"><div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1100&q=90" alt="Decorated celebration cake" /></div><div className="hero-sticker"><Sparkles size={18} /><span>Sweet<br /><strong>moments</strong></span></div><div className="hero-scribble">made with<br />care</div></div>
  </div></section>;
}

function Categories({ onSelect }) {
  return <section className="section categories-section" id="categories"><div className="container">
    <SectionIntro eyebrow="Find your favourite" title="Something lovely for every occasion" copy="Browse illustrative ideas to help you discover the right kind of sweetness. These categories are suggestions, not a confirmed menu." />
    <div className="category-grid">{categories.map((category, index) => <button className="category-card" key={category.name} onClick={() => onSelect(category.name)}>
      <div className="category-image"><img src={category.image} alt="" loading="lazy" /><span className="category-number">{String(index + 1).padStart(2, '0')}</span></div>
      <div className="category-content"><h3>{category.name}</h3><p>{category.description}</p><ArrowRight size={17} /></div>
    </button>)}</div>
  </div></section>;
}

function CakeCard({ cake }) {
  return <article className="cake-card"><div className="cake-image"><img src={cake.image} alt={`${cake.name} illustrative sample`} loading="lazy" /><span>Illustrative sample</span></div>
    <div className="cake-info"><small>{cake.category}</small><h3>{cake.name}</h3><p>{cake.description}</p><div className="cake-bottom"><strong>Price on enquiry</strong><button className="text-button" onClick={() => openWhatsApp(`Hi ${business.name}, I would like to enquire about ${cake.name}. Please share availability and pricing.`)}>Enquire <ArrowRight size={15} /></button></div></div>
  </article>;
}

function CakeGallery({ selectedCategory, onClear }) {
  const visibleCakes = selectedCategory ? cakes.filter((cake) => cake.category === selectedCategory) : cakes;
  return <section className="section cakes-section" id="cakes"><div className="container">
    <div className="gallery-heading"><SectionIntro eyebrow="The cake edit" title="Made for the moment" copy="These sample catalogue ideas are here to inspire. Contact Fairy Cakes to discuss availability, customisation and pricing." />
      <div className="gallery-filters"><button className={!selectedCategory ? 'filter-pill active' : 'filter-pill'} onClick={onClear}>All cakes</button>{selectedCategory && <button className="filter-pill" onClick={onClear}>{selectedCategory} <X size={15} /></button>}</div>
    </div>
    <div className="cake-grid">{visibleCakes.map((cake) => <CakeCard cake={cake} key={cake.name} />)}</div>
    {visibleCakes.length === 0 && <p className="empty-state">More ideas in this category can be discussed directly with the bakery.</p>}
    <div className="center-action"><button className="button button-outline" onClick={() => openWhatsApp(whatsappMessages.general)}>Ask about a custom idea <ArrowRight size={16} /></button></div>
  </div></section>;
}

function CustomOrder() {
  const [form, setForm] = useState({ name: '', occasion: '', date: '', type: '', size: '', design: '', message: '' });
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.occasion.trim() || !form.type.trim()) {
      setError('Please add your name, occasion and cake flavour or type.');
      setSent(false);
      return;
    }
    const message = `Hi ${business.name}, I would like to enquire about a custom cake. Name: ${form.name}. Occasion: ${form.occasion}. Preferred date: ${form.date || 'Not decided'}. Cake type: ${form.type}. Size: ${form.size || 'Not decided'}. Design details: ${form.design || 'Not specified'}. Additional message: ${form.message || 'None'}. Please let me know availability and pricing.`;
    const url = whatsappUrl(message);
    if (!url) { setError(`WhatsApp is not configured. Please call ${business.phone}.`); return; }
    setError(''); setSent(true); window.open(url, '_blank', 'noopener,noreferrer');
  };
  return <section className="section custom-section" id="custom-orders"><div className="container contact-grid">
    <div><SectionIntro eyebrow="Make it personal" title="Tell us about your celebration." copy="Share a few details and your enquiry will open in WhatsApp. The bakery will confirm availability, customisation and pricing directly." /><p className="muted">This form does not store your information or confirm an order.</p></div>
    <div className="form-card"><span className="form-card-label"><Clock3 size={16} /> Enquiry form</span><h3>Plan your custom cake</h3>
      <form className="enquiry-form" onSubmit={submit} noValidate><div className="form-row"><label>Customer name *<input value={form.name} onChange={update('name')} placeholder="Your name" /></label><label>Occasion *<input value={form.occasion} onChange={update('occasion')} placeholder="e.g. birthday" /></label></div>
        <div className="form-row"><label>Preferred date<input type="date" value={form.date} onChange={update('date')} /></label><label>Cake flavour or type *<input value={form.type} onChange={update('type')} placeholder="e.g. chocolate" /></label></div>
        <div className="form-row"><label>Approximate size<input value={form.size} onChange={update('size')} placeholder="If known" /></label><label>Design preferences<input value={form.design} onChange={update('design')} placeholder="Colours, theme or style" /></label></div>
        <label>Additional message<textarea value={form.message} onChange={update('message')} placeholder="Tell us about your idea..." rows="4" /></label>
        {error && <p className="form-feedback error" role="alert">{error}</p>}{sent && <p className="form-feedback success" role="status">Your enquiry is ready in WhatsApp. Please send it there to continue.</p>}
        <button className="button" type="submit"><Send size={16} /> Continue on WhatsApp</button><small className="form-note">No order is confirmed until Fairy Cakes responds.</small>
      </form>
    </div>
  </div></section>;
}

function About() {
  return <section className="section about-section" id="about"><div className="container about-grid"><div className="about-image"><img src="https://images.unsplash.com/photo-1559620192-032c4d1e7f55?auto=format&fit=crop&w=1000&q=85" alt="Cake being prepared on a bakery table" loading="lazy" /><span className="about-badge"><Heart size={16} fill="currentColor" /> For moments that matter</span></div><div className="about-copy"><SectionIntro eyebrow="A little about us" title="Let’s make your celebration a little sweeter." copy="Looking for a cake for your next celebration? Explore cake ideas and contact Fairy Cakes (Home Bakes) to discuss your preferences, custom designs and availability." /><p className="muted">This website is an unofficial design concept. The story, menu and details can be personalised with the owner’s confirmed information.</p><button className="text-button" onClick={() => openWhatsApp(whatsappMessages.general)}>Start a conversation <ArrowRight size={16} /></button></div></div></section>;
}

function Delivery() {
  return <section className="section delivery-section" id="delivery"><div className="container delivery-card"><div><span className="eyebrow">The finishing touch</span><h2>Planning a celebration?</h2><p>Contact us to enquire about delivery availability for your location and preferred date.</p><div className="delivery-points"><span><Check size={16} /> Confirm delivery areas and charges</span><span><Check size={16} /> Ask about timing and order deadlines</span><span><Check size={16} /> Availability must be confirmed directly</span></div></div><div className="delivery-actions"><button className="button" onClick={() => openWhatsApp(whatsappMessages.delivery)}><MessageCircle size={17} /> Check delivery availability</button></div></div></section>;
}

function Contact() {
  return <section className="section contact-section" id="contact"><div className="container contact-grid"><div className="contact-info"><SectionIntro eyebrow="Let’s talk cake" title="Your next sweet moment starts here." copy="Have a question, a date in mind or an idea you’d love to bring to life? Reach out to Fairy Cakes." /><div className="contact-details"><a href={business.phoneHref}><span><Phone size={18} /></span><div><small>Call us</small><strong>{business.phone}</strong></div></a><a href={business.googleSearchUrl} target="_blank" rel="noreferrer"><span><MapPin size={18} /></span><div><small>Search location</small><strong>{business.location}</strong></div></a></div><div className="contact-links"><button className="button" onClick={() => openWhatsApp(whatsappMessages.general)}><MessageCircle size={17} /> WhatsApp enquiry</button><a className="button button-light" href={business.phoneHref}><Phone size={17} /> Call now</a></div></div></div></section>;
}

function Footer() {
  return <footer><div className="container footer-grid"><div><Logo /><p>A proposed home-bakery experience for cakes, celebrations and sweet moments in Komarapalayam.</p></div><div><h4>Explore</h4>{navItems.slice(0, 5).map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</div><div><h4>Get in touch</h4><a href={business.phoneHref}>{business.phone}</a><a href={business.googleSearchUrl} target="_blank" rel="noreferrer">{business.location}</a><button onClick={() => openWhatsApp(whatsappMessages.general)}>WhatsApp us <ArrowRight size={14} /></button></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Fairy Cakes (Home Bakes)</span><span>{business.disclaimer}</span></div></footer>;
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const selectCategory = (category) => { setSelectedCategory(category); document.getElementById('cakes')?.scrollIntoView({ behavior: 'smooth' }); };
  return <><Navbar /><main><Hero /><Categories onSelect={selectCategory} /><CakeGallery selectedCategory={selectedCategory} onClear={() => setSelectedCategory('')} /><CustomOrder /><About /><Delivery /><Contact /></main><Footer /><button className="floating-whatsapp" onClick={() => openWhatsApp(whatsappMessages.general)} aria-label="Enquire on WhatsApp"><MessageCircle size={23} /><span>Chat with us</span></button></>;
}
