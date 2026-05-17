/* =====================================================
   Fine Print Finance — Shared components
   ===================================================== */

const { useState, useEffect, useRef, useMemo } = React;

/* ---------- Wordmark ---------- */
function Wordmark({ size='md', onDark=false, onClick }) {
  return (
    <div className={`fp-wm s-${size} ${onDark?'on-dark':''}`} onClick={onClick} style={{cursor: onClick?'pointer':'default'}}>
      <span className="fp">Fine Print</span>
      <span className="fn">Finance</span>
    </div>
  );
}

/* ---------- SmartImage — graceful placeholder on load failure ---------- */
function SmartImage({ src, alt, label, className='', style={}, objectPosition='center top' }) {
  const [failed, setFailed] = useState(!src);
  if (failed || !src) {
    return (
      <div className={`img-placeholder ${className}`} style={style} role="img" aria-label={alt || label}>
        <span className="img-placeholder-label">{label || alt || 'Drop image here'}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt || ''}
      className={className}
      style={{...style, objectFit:'cover', objectPosition}}
      onError={() => setFailed(true)}
    />
  );
}

/* ---------- Icon (inline SVG) ---------- */
function Icon({ name, size=18 }) {
  const paths = {
    arrow:   <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    play:    <path d="M8 5v14l11-7z" fill="currentColor"/>,
    chat:    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    close:   <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>,
    send:    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    check:   <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    arrow_dn:<path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    yt:      <path d="M22.5 6.4a3 3 0 0 0-2.1-2.1C18.5 4 12 4 12 4s-6.5 0-8.4.3A3 3 0 0 0 1.5 6.4 31 31 0 0 0 1.2 12a31 31 0 0 0 .3 5.6 3 3 0 0 0 2.1 2.1C5.5 20 12 20 12 20s6.5 0 8.4-.3a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22.8 12a31 31 0 0 0-.3-5.6zM10 15.5v-7L16 12l-6 3.5z" fill="currentColor"/>,
    ig:      <><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></>,
    tiktok:  <path d="M16 4v6.5a4.5 4.5 0 1 1-4.5-4.5h.5V10h-.5a1.5 1.5 0 1 0 1.5 1.5V4h3z" fill="currentColor"/>,
    linkedin:<><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M7 10v7M7 7.5v0M11 17v-4.5a2 2 0 0 1 4 0V17M11 10v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/></>,
    book:    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{display:'inline-block',verticalAlign:'middle'}}>
      {paths[name]}
    </svg>
  );
}

/* ---------- Nav ---------- */
function Nav({ view, setView, onDarkHero=false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setMobileOpen(false); }, [view.name]);
  const links = [
    { id:'home',    label:'Home' },
    { id:'blog',    label:'Articles' },
    { id:'events',  label:'Events' },
    { id:'ask',     label:'Ask a Pro' },
    { id:'about',   label:'About' },
  ];
  const goTo = (id) => { setView({ name: id }); setMobileOpen(false); };
  return (
    <nav className={`nav ${scrolled?'scrolled':''} ${onDarkHero && !scrolled?'on-dark':''} ${mobileOpen?'mobile-open':''}`}>
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => goTo('home')}>
          <Wordmark size="nav" onDark={onDarkHero && !scrolled && !mobileOpen} />
        </div>
        <div className="nav-links">
          {links.map(l => (
            <span key={l.id}
              className={`nav-link ${view.name===l.id?'active':''}`}
              onClick={() => goTo(l.id)}>
              {l.label}
            </span>
          ))}
        </div>
        <button className="nav-cta" onClick={() => goTo('ask')}>
          Free guide <Icon name="arrow" size={14}/>
        </button>
        <button className="nav-burger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
          {mobileOpen ? <Icon name="close" size={20}/> : (
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>
      {mobileOpen && (
        <div className="nav-mobile-menu">
          {links.map(l => (
            <div key={l.id}
              className={`nav-mobile-link ${view.name===l.id?'active':''}`}
              onClick={() => goTo(l.id)}>
              {l.label}
              <Icon name="arrow" size={16}/>
            </div>
          ))}
          <button className="btn-primary" style={{justifyContent:'center',margin:'16px 24px 24px'}} onClick={() => goTo('ask')}>
            Get the free guide <Icon name="arrow" size={14}/>
          </button>
        </div>
      )}
    </nav>
  );
}

/* ---------- Article card (small grid) ---------- */
function ArticleCard({ article, onOpen }) {
  const pillar = PILLARS.find(p => p.id === article.pillar);
  return (
    <article className="article-card" onClick={() => onOpen(article)}>
      <div className={`cover ${article.thumbnail ? 'has-img' : article.bgClass}`}>
        {article.thumbnail
          ? <SmartImage src={article.thumbnail} alt={article.title} label={`Thumbnail · ${pillar.label}`}/>
          : <>
              <div className="bg-glow"></div>
              <div className="feature-num">{article.bigNum}</div>
            </>}
        <span className="pill"><span className="d" style={{display:'inline-block',width:6,height:6,borderRadius:'50%',background:'var(--coral)',marginRight:6}}></span>{pillar.label}</span>
      </div>
      <div className="body">
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="meta">
          <span>{article.date}</span>
          <span className="dot"></span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </article>
  );
}

/* ---------- Featured large/small ---------- */
function FeaturedLg({ article, onOpen }) {
  const pillar = PILLARS.find(p => p.id === article.pillar);
  const hasImg = !!article.thumbnail;
  return (
    <div className={`feature-lg ${hasImg?'has-img':''}`} onClick={() => onOpen(article)}>
      {hasImg
        ? <SmartImage src={article.thumbnail} alt={article.title} label={`Featured thumbnail · ${pillar.label}`} className="feature-img"/>
        : <div className={`bg ${article.bgClass}`}><div className="bg-glow"></div></div>}
      {!hasImg && <div className="feature-num">{article.bigNum}</div>}
      <div className="overlay"></div>
      <div className="body">
        <span className="pill">{pillar.label}</span>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="meta">
          <span>{article.author}</span>
          <span className="dot"></span>
          <span>{article.date}</span>
          <span className="dot"></span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </div>
  );
}

function FeaturedSm({ article, onOpen }) {
  const pillar = PILLARS.find(p => p.id === article.pillar);
  const hasImg = !!article.thumbnail;
  return (
    <div className={`feature-sm ${hasImg?'has-img':''}`} onClick={() => onOpen(article)}>
      {hasImg
        ? <SmartImage src={article.thumbnail} alt={article.title} label={`Thumbnail · ${pillar.label}`} className="feature-img"/>
        : <div className={`bg ${article.bgClass}`}><div className="bg-glow"></div></div>}
      {!hasImg && <div className="feature-num">{article.bigNum}</div>}
      <div className="overlay"></div>
      <div className="body">
        <span className="pill">{pillar.label}</span>
        <h4>{article.title}</h4>
        <div className="meta">
          <span>{article.date}</span>
          <span className="dot" style={{width:3,height:3,borderRadius:'50%',background:'#a89e95'}}></span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Ask-a-pro banner (in-flow CTA) ---------- */
function AskBanner({ onCTA }) {
  return (
    <div className="ask-banner">
      <div className="ask-banner-l">
        <span className="eyebrow" style={{color:'var(--coral)'}}>Free advisor match</span>
        <h3>Have a question this article didn't answer? <em>Ask a real fiduciary.</em></h3>
        <p>Tell us what you're working on. We'll match you with a fee-only advisor in your state — no commissions, no upsells, no AI. Your first call is free.</p>
        <div className="ask-banner-ctas">
          <button className="btn-primary" onClick={onCTA}>Get matched — it's free <Icon name="arrow" size={14}/></button>
          <button className="btn-ghost" onClick={() => window.__chatOpen && window.__chatOpen()}>
            <Icon name="chat" size={14}/> Or chat with us
          </button>
        </div>
      </div>
      <div className="ask-banner-r">
        <SmartImage src={IMAGES.josh} alt="Josh" label="Josh portrait · swap at IMAGES.josh" style={{width:'100%',height:'100%'}}/>
        <div className="ask-banner-stats">
          <div className="ask-stat"><b>247</b><span>Advisors vetted</span></div>
          <div className="ask-stat"><b>50 states</b><span>Coverage</span></div>
          <div className="ask-stat"><b>Fee-only</b><span>Always fiduciary</span></div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Newsletter ---------- */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="newsletter">
      <div>
        <span className="eyebrow">Weekly upload + playbook</span>
        <h3>Get the <em>$1,847 tax playbook</em> when you subscribe.</h3>
        <p>One email a week. Whatever Josh covered on the channel, distilled to the actionable parts with the receipts. Plus the playbook the day you sign up.</p>
      </div>
      {submitted ? (
        <div style={{
          background:'var(--lt-grey)', border:'1px solid var(--line)', borderRadius:14, padding:'24px 28px',
          display:'flex', alignItems:'center', gap:14
        }}>
          <span style={{
            width:42, height:42, borderRadius:'50%', background:'var(--grad)',
            display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', flexShrink:0
          }}><Icon name="check" size={20}/></span>
          <div>
            <b style={{fontFamily:'Montserrat', fontWeight:700, fontSize:15, display:'block'}}>Check your inbox.</b>
            <span style={{fontSize:13, color:'var(--text-2)'}}>The playbook is on its way to {email}.</span>
          </div>
        </div>
      ) : (
        <form className="newsletter-form" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
          <div className="newsletter-row">
            <input type="email" placeholder="Email address" required value={email} onChange={e=>setEmail(e.target.value)}/>
            <input type="text" placeholder="ZIP" required maxLength={5} value={zip} onChange={e=>setZip(e.target.value)} style={{maxWidth:120}}/>
          </div>
          <button type="submit" className="btn-primary" style={{justifyContent:'center'}}>
            Send the playbook <Icon name="arrow" size={14}/>
          </button>
          <p className="newsletter-fine">No spam. Unsubscribe in one click. We don't sell your email — we do introduce you to one fee-only advisor in your area if you want. That's the deal.</p>
        </form>
      )}
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer({ setView }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Wordmark size="md" onDark/>
            <div className="tag">
              The money was always there.<br/>
              <span className="b">Nobody showed you where to look.</span>
            </div>
            <div className="footer-socials">
              <a href="#" aria-label="YouTube"><Icon name="yt" size={16}/></a>
              <a href="#" aria-label="Instagram"><Icon name="ig" size={16}/></a>
              <a href="#" aria-label="TikTok"><Icon name="tiktok" size={16}/></a>
              <a href="#" aria-label="LinkedIn"><Icon name="linkedin" size={16}/></a>
            </div>
          </div>
          <div>
            <h5>Topics</h5>
            <ul>
              {PILLARS.filter(p => p.id !== 'all').map(p => (
                <li key={p.id}><a onClick={() => setView({ name:'blog', pillar: p.id })} style={{cursor:'pointer'}}>{p.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Show</h5>
            <ul>
              <li><a onClick={() => setView({ name:'about' })} style={{cursor:'pointer'}}>About Josh</a></li>
              <li><a href="#">YouTube channel</a></li>
              <li><a onClick={() => setView({ name:'blog' })} style={{cursor:'pointer'}}>All articles</a></li>
              <li><a onClick={() => setView({ name:'events' })} style={{cursor:'pointer'}}>Events & workshops</a></li>
              <li><a onClick={() => setView({ name:'ask' })} style={{cursor:'pointer'}}>Ask a finance pro</a></li>
              <li><a onClick={() => setView({ name:'ask' })} style={{cursor:'pointer'}}>Community</a></li>
            </ul>
          </div>
          <div>
            <h5>Resources</h5>
            <ul>
              <li><a href="../Fine Print Finance Brand Kit.html" target="_blank" rel="noreferrer">Brand kit</a></li>
              <li><a href="#">Free playbooks</a></li>
              <li><a href="#">Newsletter archive</a></li>
              <li><a href="#">Press / media</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Fine Print Finance · All rights reserved</span>
          <span>Privacy · Terms · Cookies · Editorial Standards</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Reading-progress bar ---------- */
function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="progress-bar" style={{ width: pct + '%' }}></div>;
}

/* ---------- GHL Chat Widget ---------- */
function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from:'bot', text:"Hey — I'm Sam from Fine Print Finance. What money question can I point you to?", time:'now' },
  ]);
  const [quickReplies, setQuickReplies] = useState([
    'Match me with an advisor',
    "I have a tax question",
    'How does this site work?',
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);

  // Expose openers for cross-component triggering
  useEffect(() => {
    window.__chatOpen = () => setOpen(true);
    window.__chatClose = () => setOpen(false);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  const respond = (userText) => {
    setMessages(m => [...m, { from:'user', text:userText, time:'now' }]);
    setQuickReplies([]);
    setTyping(true);
    setTimeout(() => {
      let reply, replies = [];
      const t = userText.toLowerCase();
      if (t.includes('advisor') || t.includes('match') || t.includes('pro')) {
        reply = "Got it. We match you to a fee-only fiduciary in your state — no commissions, no upsells. Want me to grab your name and ZIP so I can get one on a call this week?";
        replies = ['Yes, set it up', 'What does it cost?', 'Maybe later'];
      } else if (t.includes('tax')) {
        reply = "Most tax questions land in one of three buckets — missed deductions, withholding, or self-employed quarterlies. Which one is closest?";
        replies = ['Missed deductions', 'Withholding / refund size', 'Self-employed'];
      } else if (t.includes('cost') || t.includes('price') || t.includes('how much')) {
        reply = "First advisor call is free. After that, advisors charge a flat fee (usually $1k–$3k for a plan) or hourly ($200–$400/hr). No assets-under-management fees, no product sales. We get a small flat referral fee — that's how the channel stays free.";
        replies = ['Sounds fair — match me', 'How are advisors vetted?'];
      } else if (t.includes('how does') || t.includes('how it works') || t.includes('site')) {
        reply = "Three things live here: weekly articles from the YouTube uploads, an advisor match if you want a human, and a community where people ask each other questions. The articles are free. The advisor match is free. The community is $9/mo.";
        replies = ['Show me articles', 'Match me with an advisor'];
      } else if (t.includes('vet')) {
        reply = "Every advisor in our network is (1) fee-only — no commissions, (2) a CFP or equivalent, (3) a registered fiduciary, (4) clean BrokerCheck. We turn down ~70% of applications.";
        replies = ['Match me', 'Got it, thanks'];
      } else if (t.includes('later') || t.includes('thanks')) {
        reply = "Sounds good. Anything else come up, just hit this chat. Have a good one.";
        replies = [];
      } else {
        reply = "Happy to help with that. Want me to point you to an article on it, or connect you with a human?";
        replies = ['Find me an article', 'Connect me with a human'];
      }
      setMessages(m => [...m, { from:'bot', text: reply, time:'now' }]);
      setQuickReplies(replies);
      setTyping(false);
    }, 900 + Math.random() * 700);
  };

  const onSend = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    respond(input.trim());
    setInput('');
  };

  return (
    <>
      {!open && (
        <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Open chat">
          <span className="ic"><Icon name="chat" size={16}/></span>
          <span className="chat-label">Ask a finance pro</span>
        </button>
      )}
      <div className={`chat-panel ${open?'open':''}`} aria-hidden={!open}>
        <div className="chat-head">
          <div className="av">S</div>
          <div className="ttl">
            <b>Sam · Fine Print Finance</b>
            <span>Online · typically replies in a few min</span>
          </div>
          <button className="close" onClick={() => setOpen(false)} aria-label="Close chat">
            <Icon name="close" size={14}/>
          </button>
        </div>
        <div className="chat-body" ref={bodyRef}>
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.from}`}>
              <div className="av">{m.from === 'user' ? 'YOU' : 'S'}</div>
              <div>
                <div className="b">{m.text}</div>
                <time>{m.time}</time>
              </div>
            </div>
          ))}
          {typing && <div className="typing"><span></span><span></span><span></span></div>}
          {quickReplies.length > 0 && (
            <div className="quick-replies">
              {quickReplies.map((q, i) => (
                <button key={i} className="quick-reply" onClick={() => respond(q)}>{q} →</button>
              ))}
            </div>
          )}
        </div>
        <form className="chat-input" onSubmit={onSend}>
          <input
            type="text"
            placeholder="Type a message…"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" className="send" aria-label="Send"><Icon name="send" size={14}/></button>
        </form>
        <div className="chat-foot">
          Powered by <b>Go High Level</b>
        </div>
      </div>
    </>
  );
}

Object.assign(window, {
  Wordmark, SmartImage, Icon, Nav, ArticleCard, FeaturedLg, FeaturedSm,
  AskBanner, Newsletter, Footer, ProgressBar, ChatWidget
});
