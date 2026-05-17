/* =====================================================
   Fine Print Finance — Page views
   ===================================================== */

const { useState: useStateP, useEffect: useEffectP, useMemo: useMemoP } = React;

/* ====================== HOME ====================== */
function HomePage({ setView }) {
  const featuredLg = ARTICLES.find(a => a.featured === 'lg');
  const featuredSm = ARTICLES.filter(a => a.featured === 'sm').slice(0, 2);
  const latest = ARTICLES.filter(a => !a.featured).slice(0, 6);
  const open = (a) => setView({ name:'article', slug:a.slug });

  return (
    <>
      {/* HERO — banner image speaks for itself, soft CTA band below */}
      <header className="hero">
        <div className="hero-bg" style={{backgroundImage:`url('${IMAGES.hero}')`}}></div>
        <div className="hero-fade"></div>
        <div className="hero-cta-band">
          <div className="wrap">
            <div className="hero-cta-inner">
              <div className="hero-cta-copy">
                <span className="hero-eyebrow">Welcome · Start here</span>
                <h1 className="hero-headline">Finance, <em>decoded.</em><br/>One topic at a time.</h1>
                <p className="hero-line">Plain-English articles + short videos on the financial fine print every industry hides. <span className="accent">Pick a topic below and dig in.</span></p>
              </div>
              <div className="hero-cta-actions">
                <button className="btn-primary" onClick={() => setView({ name:'blog' })}>
                  Browse articles <Icon name="arrow" size={14}/>
                </button>
                <button className="btn-ghost" onClick={() => document.getElementById('topics')?.scrollIntoView({ behavior:'smooth' })}>
                  <Icon name="arrow_dn" size={14}/> See what’s here
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TOPICS — "start with what you actually want to know" */}
      <section className="section" id="topics">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Start with what you want to know</span>
              <h2>Pick a topic. <em>We’ll meet you there.</em></h2>
            </div>
            <p className="lede" style={{maxWidth:440}}>Every topic has a small library of short, plain-English articles. No jargon, no fluff — just “here’s how this works and what to do.”</p>
          </div>
          <div className="topic-grid">
            {PILLARS.filter(p => p.id !== 'all').map(p => {
              const count = ARTICLES.filter(a => a.pillar === p.id).length;
              return (
                <div key={p.id} className="topic-card" onClick={() => setView({ name:'blog', pillar: p.id })}>
                  <div className="topic-ic">{p.label[0]}</div>
                  <h4>{p.label}</h4>
                  <p>{topicBlurb(p.id)}</p>
                  <div className="topic-foot">
                    <span>{count} article{count===1?'':'s'}</span>
                    <Icon name="arrow" size={14}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FREE STARTER VIDEO COURSE */}
      <section className="section lt">
        <div className="wrap">
          <div className="course-card" onClick={() => setView({ name:'ask' })}>
            <div className="course-visual">
              <div className="course-glow"></div>
              <div className="course-videos">
                <div className="course-vid course-vid--on">
                  <div className="vid-thumb" style={{backgroundImage:`url('${IMAGES.thumbnails.taxStrategy}')`,backgroundSize:'cover',backgroundPosition:'center'}}>
                    <span className="vid-play"><svg width={22} height={22} viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#fff"/></svg></span>
                    <span className="vid-dur">6:42</span>
                    <span className="vid-num">DAY 03</span>
                  </div>
                  <div className="vid-meta">
                    <b>Build your tax strategy — what to do first</b>
                    <span>Now playing · 6 min</span>
                  </div>
                </div>
                <div className="course-vid">
                  <div className="vid-thumb" style={{backgroundImage:`url('${IMAGES.thumbnails.irsRewards}')`,backgroundSize:'cover',backgroundPosition:'center'}}>
                    <span className="vid-play"><svg width={18} height={18} viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#fff"/></svg></span>
                    <span className="vid-dur">5:18</span>
                    <span className="vid-num">DAY 04</span>
                  </div>
                  <div className="vid-meta">
                    <b>7 IRS rewards hidden in plain sight</b>
                    <span>Up next</span>
                  </div>
                </div>
                <div className="course-vid">
                  <div className="vid-thumb" style={{backgroundImage:`url('${IMAGES.thumbnails.moneyMissed}')`,backgroundSize:'cover',backgroundPosition:'center'}}>
                    <span className="vid-play"><svg width={18} height={18} viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#fff"/></svg></span>
                    <span className="vid-dur">7:04</span>
                    <span className="vid-num">DAY 05</span>
                  </div>
                  <div className="vid-meta">
                    <b>Money you missed — incentives explained</b>
                    <span>5 of 7</span>
                  </div>
                </div>
              </div>
              <div className="course-progress">
                <div className="course-progress-bar"><div style={{width:'42%'}}></div></div>
                <span>Day 3 of 7</span>
              </div>
            </div>
            <div className="course-body">
              <span className="eyebrow" style={{color:'var(--coral)'}}>Free · 7 short videos · One a day</span>
              <h3>The <em>Money 101</em> video course.</h3>
              <p>One short video a day for a week, delivered to your inbox. Five to seven minutes each. By the end, you’ll have a one-page money plan you can actually follow.</p>
              <ul className="course-bullets">
                <li><Icon name="check" size={14}/> 5–7 min videos, no fluff</li>
                <li><Icon name="check" size={14}/> One real action per day</li>
                <li><Icon name="check" size={14}/> Watch on phone or desktop</li>
              </ul>
              <button className="btn-primary" style={{alignSelf:'flex-start'}}>
                Start the free video course <Icon name="arrow" size={14}/>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLES — reframed for visitors */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Most watched this week</span>
              <h2>The articles people are using <em>right now</em>.</h2>
            </div>
            <span className="right-link" onClick={() => setView({ name:'blog' })}>
              See all articles <Icon name="arrow" size={14}/>
            </span>
          </div>
          <div className="featured">
            {featuredLg && <FeaturedLg article={featuredLg} onOpen={open}/>}
            <div className="feature-side">
              {featuredSm.map(a => (
                <FeaturedSm key={a.slug} article={a} onOpen={open}/>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LATEST GRID */}
      <section className="section lt">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Recently published</span>
              <h2>More to read when you have a few minutes.</h2>
            </div>
            <span className="right-link" onClick={() => setView({ name:'blog' })}>
              Full library <Icon name="arrow" size={14}/>
            </span>
          </div>
          <div className="article-grid">
            {latest.map(a => (
              <ArticleCard key={a.slug} article={a} onOpen={open}/>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY — join people learning together (low-pressure) */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Learn alongside other readers</span>
              <h2>A small community of people <em>figuring this out together</em>.</h2>
            </div>
            <p className="lede" style={{maxWidth:440}}>If you’d rather ask a peer than a professional, the community is where you compare notes, share what worked, and read about what didn’t.</p>
          </div>
          <div className="community-grid">
            <div className="community-card dark">
              <span className="eyebrow" style={{color:'var(--coral)'}}>Live now</span>
              <h3 style={{color:'#fff'}}>2,847 members. <span style={{background:'var(--grad)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Real questions, real answers.</span></h3>
              <p>Threads people are working through this week:</p>
              <div className="threads">
                {COMMUNITY_THREADS.map((t, i) => (
                  <div key={i} className="thread">
                    <div className="av">{t.initials}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <b>{t.name}</b>
                      <span>{t.topic}</span>
                    </div>
                    <span className="replies">{t.replies}</span>
                  </div>
                ))}
              </div>
              <div className="stat">
                <div><b>2,847</b><span>Members</span></div>
                <div><b>94</b><span>Threads/wk</span></div>
                <div><b>$9</b><span>Per month</span></div>
              </div>
            </div>
            <div className="community-card">
              <span className="eyebrow">How it works</span>
              <h3>Read first. Post when you’re ready.</h3>
              <p>Most members lurk for a week or two before posting their first question. That’s normal. The community is moderated by Josh and a small team — no bots, no spam, no recruiters in your DMs.</p>
              <ul style={{listStyle:'none',padding:0,margin:'4px 0 0',display:'flex',flexDirection:'column',gap:12}}>
                <li className="perk"><span className="perk-tick"><Icon name="check" size={12}/></span><span>Weekly office hours with a CFP — free for members</span></li>
                <li className="perk"><span className="perk-tick"><Icon name="check" size={12}/></span><span>Templates: tax checklist, 401(k) fee audit, mortgage script</span></li>
                <li className="perk"><span className="perk-tick"><Icon name="check" size={12}/></span><span>First 14 days free — cancel anytime</span></li>
              </ul>
              <button className="btn-primary" style={{marginTop:18,alignSelf:'flex-start'}}>
                Try it for 14 days <Icon name="arrow" size={14}/>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ASK A PRO — reframed as optional, low-pressure */}
      <section className="section lt">
        <div className="wrap">
          <div className="ask-banner">
            <div className="ask-banner-l">
              <span className="eyebrow" style={{color:'var(--coral)'}}>If you’d rather talk to a human</span>
              <h3>Want a real fiduciary to <em>look at your numbers</em>?</h3>
              <p>No pressure — most of our readers never need this. But if you’d like a one-time second opinion from a fee-only CFP, we’ll match you with one in your state. First call is free.</p>
              <div className="ask-banner-ctas">
                <button className="btn-primary" onClick={() => setView({ name:'ask' })}>
                  How the match works <Icon name="arrow" size={14}/>
                </button>
                <button className="btn-ghost" onClick={() => window.__chatOpen && window.__chatOpen()}>
                  <Icon name="chat" size={14}/> Quick question? Chat instead
                </button>
              </div>
            </div>
            <div className="ask-banner-r">
              <img src="../assets/josh-portrait.png" alt="Josh"/>
              <div className="ask-banner-stats">
                <div className="ask-stat"><b>Fee-only</b><span>No commissions</span></div>
                <div className="ask-stat"><b>CFP</b><span>Or equivalent</span></div>
                <div className="ask-stat"><b>Free</b><span>First call</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section">
        <div className="wrap">
          <Newsletter/>
        </div>
      </section>
    </>
  );
}

function topicBlurb(id) {
  switch (id) {
    case 'taxes':       return 'Deductions, withholding, side hustles. The money you might already be owed.';
    case 'investing':   return '401(k) fees, IRAs, index funds. The stuff that compounds while you sleep.';
    case 'banking':     return 'Savings rates, hidden fees, credit cards. Where banks make money on you.';
    case 'healthcare':  return 'HSAs, plan choice, billing errors. Medical money decisions that aren’t medical.';
    case 'realestate':  return 'Mortgages, closing costs, refinancing. Six-figure decisions explained simply.';
    case 'cashflow':    return 'Budgeting without the spreadsheet shame. Real numbers, real life.';
    default: return '';
  }
}

/* ====================== BLOG (article index) ====================== */
function BlogPage({ setView, initialPillar }) {
  const [filter, setFilter] = useStateP(initialPillar || 'all');
  const list = useMemoP(() =>
    filter === 'all' ? ARTICLES : ARTICLES.filter(a => a.pillar === filter),
  [filter]);

  return (
    <>
      <header className="article-hero" style={{ paddingTop: 140, paddingBottom: 56 }}>
        <div className="bg-glow"></div>
        <div className="article-hero-inner" style={{ maxWidth: 1240 }}>
          <span className="pill">All articles · {ARTICLES.length}</span>
          <h1>The whole <em>library</em>.</h1>
          <p className="dek">Every fine-print breakdown we've published, sorted by topic. Each one comes from a YouTube upload — the article goes deeper than the video had time for.</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 56, borderTop:'none' }}>
        <div className="wrap">
          <div className="filter-bar">
            {PILLARS.map(p => (
              <button key={p.id} className={`chip ${filter===p.id?'active':''}`} onClick={() => setFilter(p.id)}>
                {p.id !== 'all' && <span className="d"></span>}
                {p.label}
              </button>
            ))}
          </div>
          <div className="article-grid">
            {list.map(a => (
              <ArticleCard key={a.slug} article={a} onOpen={(a) => setView({ name:'article', slug:a.slug })}/>
            ))}
          </div>
        </div>
      </section>

      <section className="section lt">
        <div className="wrap">
          <AskBanner onCTA={() => setView({ name:'ask' })}/>
        </div>
      </section>
    </>
  );
}

/* ====================== ARTICLE ====================== */
function ArticlePage({ slug, setView }) {
  const article = ARTICLES.find(a => a.slug === slug) || ARTICLES[0];
  const pillar = PILLARS.find(p => p.id === article.pillar);
  const related = (article.related || []).map(s => ARTICLES.find(a => a.slug === s)).filter(Boolean);
  const headings = article.body.filter(b => b.type === 'h2');

  useEffectP(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const renderBlock = (b, i) => {
    switch (b.type) {
      case 'lede':  return <p key={i} className="lede" dangerouslySetInnerHTML={{__html:b.text}}></p>;
      case 'p':     return <p key={i} dangerouslySetInnerHTML={{__html:b.text}}></p>;
      case 'h2':    return <h2 key={i} id={`h-${i}`}>{b.text}</h2>;
      case 'h3':    return <h3 key={i}>{b.text}</h3>;
      case 'list':  return <ul key={i}>{b.items.map((it, j) => <li key={j} dangerouslySetInnerHTML={{__html:it}}></li>)}</ul>;
      case 'quote': return <blockquote key={i}>"{b.text}"</blockquote>;
      case 'stat':  return (
        <div key={i} className="stat-callout">
          <div className="num">{b.num}</div>
          <div className="txt" dangerouslySetInnerHTML={{__html:b.txt}}></div>
        </div>
      );
      case 'fineprint': return (
        <div key={i} className="fineprint-box">
          <div className="label">Fine print</div>
          <p>{b.text.replace(/^§\s*/, '')}</p>
        </div>
      );
      case 'image': return (
        <figure key={i} className="article-figure">
          <div className="frame">
            {b.src
              ? <img src={b.src} alt={b.alt || ''}/>
              : <div className="placeholder">{b.alt || 'Image placeholder — drop image src here'}</div>}
          </div>
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      );
      case 'video': return (
        <figure key={i} className="article-figure">
          {b.embed ? (
            <div className="frame" style={{aspectRatio:'16/9'}}>
              <iframe src={b.embed} title={b.caption || 'Video'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{display:'block',width:'100%',height:'100%',border:0}}></iframe>
            </div>
          ) : (
            <div className="article-video" onClick={() => b.url && window.open(b.url,'_blank')}>
              <div className="play-tri"></div>
              <div className="vid-title">{b.title || 'Watch the full episode on YouTube'}</div>
            </div>
          )}
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      );
      default: return null;
    }
  };

  return (
    <>
      <ProgressBar/>
      <header className="article-hero">
        <div className="bg-glow"></div>
        <div className="article-hero-inner">
          <span className="pill">{pillar.label} · {article.video}</span>
          <h1 dangerouslySetInnerHTML={{ __html: article.title.replace(/\$([0-9,]+|[0-9.]+%)/g, '<em>$&</em>') }}></h1>
          <p className="dek">{article.excerpt}</p>
          <div className="article-meta">
            <div className="author-chip">
              <SmartImage src={IMAGES.josh} alt={article.author} label="Josh"/>
              <b>{article.author}</b>
            </div>
            <span>{article.date}</span>
            <span className="dot"></span>
            <span>{article.readTime}</span>
            <span className="dot"></span>
            <a className="link" style={{color:'var(--coral)', cursor:'pointer'}} href="#"><Icon name="yt" size={14}/> Watch the video</a>
          </div>
        </div>
      </header>

      <div className="article-body">
        <div className="article-content">
          {article.body.map(renderBlock)}
        </div>

        <aside className="article-sidebar">
          <div className="sb-card ask dark">
            <h3>Real human. <em>Real answers.</em></h3>
            <p>Have a question this article didn't touch? Get matched with a fee-only fiduciary advisor — first call free.</p>
            <button className="btn-primary" onClick={() => setView({ name:'ask' })}>
              Get matched <Icon name="arrow" size={14}/>
            </button>
            <button className="btn-ghost" style={{marginTop:8, background:'rgba(255,255,255,0.06)'}} onClick={() => window.__chatOpen && window.__chatOpen()}>
              <Icon name="chat" size={14}/> Or chat with us
            </button>
          </div>

          {headings.length > 0 && (
            <div className="sb-card">
              <h4>In this article</h4>
              <div className="toc-list">
                {headings.map((h, i) => {
                  const idx = article.body.indexOf(h);
                  return (
                    <a key={i} onClick={() => {
                      document.getElementById(`h-${idx}`)?.scrollIntoView({ behavior:'smooth', block:'start' });
                    }}>{h.text}</a>
                  );
                })}
              </div>
            </div>
          )}

          {related.length > 0 && (
            <div className="sb-card">
              <h4>Keep reading</h4>
              <div className="related-list">
                {related.map(r => (
                  <div key={r.slug} className="related-item" onClick={() => setView({ name:'article', slug:r.slug })}>
                    <div className={`related-thumb ${r.bgClass}`}><div className="bg-glow"></div></div>
                    <div>
                      <h5>{r.title}</h5>
                      <span>{PILLARS.find(p => p.id === r.pillar).label} · {r.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <section className="section lt" style={{borderTop:'none'}}>
        <div className="wrap">
          <Newsletter/>
        </div>
      </section>
    </>
  );
}

/* ====================== ASK A PRO ====================== */
function AskPage({ setView }) {
  const [submitted, setSubmitted] = useStateP(false);
  return (
    <>
      <header className="ask-hero">
        <div className="wrap">
          <div className="ask-hero-inner">
            <div>
              <span className="eyebrow" style={{color:'var(--coral)'}}>Ask a Pro · Free</span>
              <h1>Real answers from a <em>real fiduciary</em>.</h1>
              <p>Tell us what you're working on. We match you with a fee-only, CFP-credentialed advisor in your state — no commissions, no upsells, no AI pretending to be a person. Your first call is free, and the match is free.</p>
              <div className="ask-hero-trust">
                <div><b>247</b><span>Vetted advisors</span></div>
                <div><b>50 states</b><span>Coverage</span></div>
                <div><b>Fee-only</b><span>Always fiduciary</span></div>
                <div><b>$0</b><span>To get matched</span></div>
              </div>
            </div>

            <div className="ask-form-card">
              <span className="eyebrow">Get matched in 60 seconds</span>
              <h3>Tell us what's on your mind.</h3>
              {submitted ? (
                <div style={{
                  background:'rgba(74,103,65,0.15)', border:'1px solid rgba(107,143,94,0.3)',
                  borderRadius:12, padding:'20px', color:'#fff', display:'flex', alignItems:'flex-start', gap:14
                }}>
                  <span style={{width:36,height:36,borderRadius:'50%',background:'var(--grad)',
                    display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Icon name="check" size={18}/></span>
                  <div>
                    <b style={{fontFamily:'Montserrat',fontWeight:700,fontSize:15,display:'block',marginBottom:4}}>You're in.</b>
                    <span style={{fontSize:13,color:'#cfc7bf',lineHeight:1.5}}>We'll match you with an advisor in your state in the next 24 hours and email you their calendar.</span>
                  </div>
                </div>
              ) : (
                <form className="ask-form" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                  <input type="text" placeholder="First name" required/>
                  <input type="text" placeholder="ZIP code" required maxLength={5}/>
                  <input className="full" type="email" placeholder="Email address" required/>
                  <select className="full" required defaultValue="">
                    <option value="" disabled>Household income — pick a range</option>
                    <option>Under $60k</option>
                    <option>$60k – $120k</option>
                    <option>$120k – $250k</option>
                    <option>$250k+</option>
                  </select>
                  <select className="full" required defaultValue="">
                    <option value="" disabled>What's the topic?</option>
                    <option>Taxes — missed deductions, withholding, side hustle</option>
                    <option>Investing — 401(k), IRA, brokerage</option>
                    <option>Banking — savings, debt, credit cards</option>
                    <option>Real estate — buying, refinancing, closing</option>
                    <option>Healthcare — HSA, insurance, plan selection</option>
                    <option>General financial plan</option>
                  </select>
                  <textarea className="full" placeholder="What's the question or situation? (optional)"></textarea>
                  <button type="submit" className="btn-primary" style={{justifyContent:'center'}}>
                    Match me with an advisor <Icon name="arrow" size={14}/>
                  </button>
                  <p className="ask-form-fine">Submitting connects you with one fee-only advisor in our network. We get a flat referral fee from them — never from you. Your first call is free; no obligation. Privacy: we don't sell, share, or rent your info.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* How it works */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">How it works</span>
              <h2>From question to <em>booked call</em> in 4 steps.</h2>
            </div>
            <p className="lede" style={{maxWidth:420}}>No salesy funnels, no AUM hooks. We match you, you talk to a human, you decide if it's worth continuing.</p>
          </div>
          <div className="steps">
            <div className="step">
              <span className="n">1</span>
              <h4>Tell us what's up</h4>
              <p>30 seconds. Name, ZIP, income range, the topic. That's all we need to match.</p>
            </div>
            <div className="step">
              <span className="n">2</span>
              <h4>We match in 24h</h4>
              <p>You get an email with one advisor's bio, credentials, and calendar — no spammy bidding.</p>
            </div>
            <div className="step">
              <span className="n">3</span>
              <h4>Free 30-min call</h4>
              <p>No prep. Bring the question. The advisor scopes the work and tells you the fee up front.</p>
            </div>
            <div className="step">
              <span className="n">4</span>
              <h4>Your call</h4>
              <p>Hire them, ask for a different match, or take what you learned and run. No pressure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="section lt">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Or join the community</span>
              <h2>Get answers from <em>people who already fixed it</em>.</h2>
            </div>
            <p className="lede" style={{maxWidth:420}}>$9/month. Real humans, mostly DIY-ers, occasional advisor drop-ins. Use it as a sanity check or a peer review.</p>
          </div>
          <div className="community-grid">
            <div className="community-card dark">
              <span className="eyebrow" style={{color:'var(--coral)'}}>Live now</span>
              <h3 style={{color:'#fff'}}>2,847 members. <span style={{background:'var(--grad)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Hourly threads.</span></h3>
              <p>Most active topics: 401(k) fee audits, tax-return amendments, mortgage rate shopping, HSA strategy.</p>
              <div className="threads">
                {COMMUNITY_THREADS.map((t, i) => (
                  <div key={i} className="thread">
                    <div className="av">{t.initials}</div>
                    <div style={{flex:1}}>
                      <b>{t.name}</b>
                      <span>{t.topic}</span>
                    </div>
                    <span className="replies">{t.replies} replies</span>
                  </div>
                ))}
              </div>
              <div className="stat">
                <div><b>2,847</b><span>Members</span></div>
                <div><b>94</b><span>Threads/wk</span></div>
                <div><b>$9</b><span>Per month</span></div>
              </div>
            </div>
            <div className="community-card">
              <span className="eyebrow">Why members stick around</span>
              <h3>Less advice. More <span style={{background:'var(--grad)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>"here's what I did."</span></h3>
              <p>Every thread is anchored to a specific decision someone actually made — with the numbers attached. No vague hot takes, no shilling, no "DM me to learn more."</p>
              <ul style={{listStyle:'none',padding:0,margin:'8px 0 0',display:'flex',flexDirection:'column',gap:10}}>
                <li style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                  <span style={{width:22,height:22,borderRadius:'50%',background:'var(--grad)',color:'#fff',display:'inline-flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2}}><Icon name="check" size={12}/></span>
                  <span style={{fontSize:14.5,lineHeight:1.5}}>Weekly office hours with a CFP — free for members</span>
                </li>
                <li style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                  <span style={{width:22,height:22,borderRadius:'50%',background:'var(--grad)',color:'#fff',display:'inline-flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2}}><Icon name="check" size={12}/></span>
                  <span style={{fontSize:14.5,lineHeight:1.5}}>Templates: tax checklist, 401(k) fee audit, mortgage script</span>
                </li>
                <li style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                  <span style={{width:22,height:22,borderRadius:'50%',background:'var(--grad)',color:'#fff',display:'inline-flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2}}><Icon name="check" size={12}/></span>
                  <span style={{fontSize:14.5,lineHeight:1.5}}>No bots, no ads, no upsells — moderated by Josh and team</span>
                </li>
              </ul>
              <button className="btn-primary" style={{marginTop:18,alignSelf:'flex-start'}}>
                Try free for 14 days <Icon name="arrow" size={14}/>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ====================== ABOUT ====================== */
function AboutPage({ setView }) {
  return (
    <>
      <header className="ask-hero" style={{ paddingBottom: 64 }}>
        <div className="wrap">
          <div className="ask-hero-inner">
            <div>
              <span className="eyebrow" style={{color:'var(--coral)'}}>About</span>
              <h1>Hey — I'm <em>Josh</em>.</h1>
              <p>I started Fine Print Finance because every time I helped a friend through a money decision, the answer was the same: <strong style={{color:'#fff'}}>the information was always public. Nobody just translated it.</strong></p>
              <p style={{marginTop:14}}>The IRS publishes its menu. Every 401(k) plan publishes its fees. Every mortgage lender publishes its rate sheet. The "fine print" isn't a secret — it's just buried in language designed to bore you out of reading it. That's what I do here.</p>
              <div className="hero-ctas" style={{marginTop:28}}>
                <button className="btn-primary" onClick={() => setView({ name:'blog' })}>
                  Read the articles <Icon name="arrow" size={14}/>
                </button>
                <button className="btn-ghost" onClick={() => setView({ name:'ask' })}>
                  <Icon name="chat" size={14}/> Or ask me directly
                </button>
              </div>
            </div>
            <div style={{borderRadius:18,overflow:'hidden',border:'1px solid #3a3330',background:'#0f0d0b',aspectRatio:'1/1.1'}}>
              <SmartImage src={IMAGES.josh} alt="Josh" label="Josh portrait" style={{width:'100%',height:'100%'}}/>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">What I won't do</span>
              <h2>The promises that <em>actually matter</em>.</h2>
            </div>
          </div>
          <div className="steps">
            <div className="step">
              <span className="n" style={{background:'rgba(74,103,65,0.15)',color:'var(--green)'}}><Icon name="check" size={14}/></span>
              <h4>I won't sell you a product</h4>
              <p>No course funnels. No "secret strategy." No affiliate-link credit cards. When I make money, it's from advisor referrals — flat fee, paid by them, never by you.</p>
            </div>
            <div className="step">
              <span className="n" style={{background:'rgba(74,103,65,0.15)',color:'var(--green)'}}><Icon name="check" size={14}/></span>
              <h4>I won't dress it up</h4>
              <p>If the answer is "yes, contribute to your 401(k)," that's a 30-second video, not a 22-minute one. I'd rather you finish watching than feel like an expert.</p>
            </div>
            <div className="step">
              <span className="n" style={{background:'rgba(74,103,65,0.15)',color:'var(--green)'}}><Icon name="check" size={14}/></span>
              <h4>I won't fake credentials</h4>
              <p>I'm not your CFP. I'm not your CPA. I'm the friend who's read all the form instructions so you don't have to. For the real plan, you talk to a real advisor.</p>
            </div>
            <div className="step">
              <span className="n" style={{background:'rgba(74,103,65,0.15)',color:'var(--green)'}}><Icon name="check" size={14}/></span>
              <h4>I won't waste your time</h4>
              <p>If a video runs long, it's because the IRS made the rule complicated, not because I'm padding for the algorithm. Short, dense, useful. That's the contract.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section lt">
        <div className="wrap">
          <AskBanner onCTA={() => setView({ name:'ask' })}/>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { HomePage, BlogPage, ArticlePage, AskPage, AboutPage });
