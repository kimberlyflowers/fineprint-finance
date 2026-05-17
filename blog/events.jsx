/* =====================================================
   Fine Print Finance — Events: list + detail pages
   ===================================================== */

const { useState: useStateEv, useMemo: useMemoEv } = React;

/* ====================== EVENTS LIST ====================== */
function EventsListPage({ setView }) {
  const [filter, setFilter] = useStateEv('upcoming'); // upcoming | past | free | paid | all

  const filtered = useMemoEv(() => {
    return EVENTS.filter(e => {
      if (filter === 'all') return true;
      if (filter === 'upcoming') return e.status === 'upcoming';
      if (filter === 'past') return e.status === 'past';
      const cheapest = Math.min(...e.tickets.map(t => t.price));
      if (filter === 'free') return cheapest === 0;
      if (filter === 'paid') return cheapest > 0;
      return true;
    });
  }, [filter]);

  return (
    <>
      <header className="ask-hero" style={{ paddingBottom: 64 }}>
        <div className="wrap">
          <div className="ask-hero-inner">
            <div>
              <span className="eyebrow" style={{color:'var(--coral)'}}>Live events</span>
              <h1>Show up. Ask anything. <em>Leave with a checklist.</em></h1>
              <p>Workshops, live Q&amp;As, and small-group cohorts where we walk through the fine print together — in real time, with your actual numbers. Most events are free. The paid ones come with a recording and the templates.</p>
              <div className="hero-ctas" style={{marginTop:24}}>
                <a className="btn-primary" href="#events-list" onClick={e => { e.preventDefault(); document.getElementById('events-list')?.scrollIntoView({behavior:'smooth'}); }}>
                  See what's coming <Icon name="arrow_dn" size={14}/>
                </a>
                <button className="btn-ghost" onClick={() => setView({ name:'ask' })}>
                  <Icon name="chat" size={14}/> Suggest an event
                </button>
              </div>
            </div>
            <div className="events-hero-meta">
              <div className="meta-stat"><b>{EVENTS.filter(e => e.status==='upcoming').length}</b><span>Upcoming events</span></div>
              <div className="meta-stat"><b>Free</b><span>Most livestreams</span></div>
              <div className="meta-stat"><b>30</b><span>Cohort cap</span></div>
              <div className="meta-stat"><b>Stripe</b><span>Secure checkout</span></div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="events-list" style={{ paddingTop: 64 }}>
        <div className="wrap">
          <div className="filter-bar">
            {[
              { id:'upcoming', label:'Upcoming' },
              { id:'past',     label:'Past' },
              { id:'free',     label:'Free events' },
              { id:'paid',     label:'Paid events' },
              { id:'all',      label:'All' },
            ].map(f => (
              <button key={f.id} className={`chip ${filter===f.id?'active':''}`} onClick={() => setFilter(f.id)}>
                {f.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{textAlign:'center',padding:'64px 0',color:'var(--text-2)'}}>
              No events in this filter — try another.
            </div>
          ) : (
            <div className="events-grid">
              {filtered.map(e => <EventCard key={e.slug} event={e} onOpen={() => setView({ name:'event', slug:e.slug })}/>)}
            </div>
          )}
        </div>
      </section>

      <section className="section lt">
        <div className="wrap">
          <Newsletter/>
        </div>
      </section>
    </>
  );
}

/* ---------- Event card (list) ---------- */
function EventCard({ event, onOpen }) {
  const cheapest = Math.min(...event.tickets.map(t => t.price));
  const isFree = cheapest === 0;
  const dateParts = parseDateParts(event.startDate);
  const seatsPct = event.seatsTotal > 0 ? Math.max(0, Math.min(100, ((event.seatsTotal - event.seatsLeft) / event.seatsTotal) * 100)) : null;

  return (
    <article className={`event-card ${event.status==='past'?'is-past':''}`} onClick={onOpen}>
      <div className="event-date">
        <span className="ev-month">{dateParts.month}</span>
        <span className="ev-day">{dateParts.day}</span>
        <span className="ev-weekday">{dateParts.weekday}</span>
      </div>
      <div className="event-thumb">
        <SmartImage src={event.thumbnail} alt={event.title} label={event.thumbnailLabel || event.title} style={{width:'100%',height:'100%'}}/>
        <span className={`ev-pill ${isFree?'free':'paid'}`}>{isFree ? 'Free' : `From $${cheapest}`}</span>
      </div>
      <div className="event-body">
        <span className="ev-cat">{event.category}</span>
        <h3>{event.title}</h3>
        <p>{event.tagline}</p>
        <div className="ev-meta">
          <span><Icon name="play" size={12}/> {event.startTime} {event.timezone}</span>
          <span className="ev-meta-dot"></span>
          <span>{event.format}</span>
        </div>
        {seatsPct !== null && event.status === 'upcoming' && (
          <div className="ev-seats">
            <div className="ev-seats-bar"><div style={{width: seatsPct + '%'}}></div></div>
            <span>{event.seatsLeft} of {event.seatsTotal} seats left</span>
          </div>
        )}
      </div>
    </article>
  );
}

function parseDateParts(dateStr) {
  // best-effort parse of "Saturday, March 14, 2026" → { month:'MAR', day:'14', weekday:'SAT' }
  // for strings that don't parse, falls back to chunked text
  const months = { Jan:'JAN', Feb:'FEB', Mar:'MAR', Apr:'APR', May:'MAY', Jun:'JUN',
                   Jul:'JUL', Aug:'AUG', Sep:'SEP', Oct:'OCT', Nov:'NOV', Dec:'DEC',
                   January:'JAN', February:'FEB', March:'MAR', April:'APR', June:'JUN',
                   July:'JUL', August:'AUG', September:'SEP', October:'OCT', November:'NOV', December:'DEC' };
  const wk = { Mon:'MON', Tue:'TUE', Wed:'WED', Thu:'THU', Fri:'FRI', Sat:'SAT', Sun:'SUN',
               Monday:'MON', Tuesday:'TUE', Wednesday:'WED', Thursday:'THU',
               Friday:'FRI', Saturday:'SAT', Sunday:'SUN', Tuesdays:'APR', Wednesdays:'APR' };

  const parts = dateStr.split(/[,\s]+/);
  let weekday = '', month = '', day = '';
  for (const p of parts) {
    if (!weekday && wk[p]) weekday = wk[p];
    if (!month && months[p]) month = months[p];
    if (!day && /^\d{1,2}$/.test(p)) day = p;
  }
  if (!month) month = 'TBA';
  if (!day) day = '—';
  if (!weekday) weekday = '';
  return { month, day, weekday };
}

/* ====================== EVENT DETAIL ====================== */
function EventDetailPage({ slug, setView }) {
  const event = EVENTS.find(e => e.slug === slug) || EVENTS[0];
  const [selectedTicket, setSelectedTicket] = useStateEv(event.tickets[0].id);
  const [openFaq, setOpenFaq] = useStateEv(0);
  const [submitted, setSubmitted] = useStateEv(false);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const ticket = event.tickets.find(t => t.id === selectedTicket);
  const isFreeTicket = ticket && ticket.price === 0;

  return (
    <>
      {/* Event hero */}
      <header className="event-hero">
        <div className="event-hero-bg">
          <SmartImage src={event.thumbnail} alt={event.title} label={event.thumbnailLabel || event.title} style={{width:'100%',height:'100%'}}/>
        </div>
        <div className="event-hero-fade"></div>
        <div className="wrap">
          <div className="event-hero-inner">
            <button className="event-back" onClick={() => setView({ name:'events' })}>
              ← Back to events
            </button>
            <span className="ev-pill" style={{position:'static',display:'inline-flex',alignSelf:'flex-start'}}>{event.category}</span>
            <h1>{event.title}</h1>
            <p className="event-tagline">{event.tagline}</p>
            <div className="event-hero-meta">
              <div className="ehm">
                <Icon name="play" size={14}/>
                <span><b>{event.startDate}</b>{event.endDate && ` — ${event.endDate}`}</span>
              </div>
              <div className="ehm">
                <Icon name="play" size={14}/>
                <span>{event.startTime} – {event.endTime} {event.timezone}</span>
              </div>
              <div className="ehm">
                <Icon name="play" size={14}/>
                <span>{event.format}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="event-body-grid">
        <div className="event-main">

          {/* About */}
          <section className="event-section">
            <h2>About this event</h2>
            {event.description.map((p, i) => <p key={i} className="event-p">{p}</p>)}
          </section>

          {/* Schedule */}
          <section className="event-section">
            <h2>Schedule</h2>
            <div className="event-schedule">
              {event.schedule.map((s, i) => (
                <div key={i} className="sched-row">
                  <div className="sched-time">{s.time}</div>
                  <div className="sched-body">
                    <b>{s.title}</b>
                    {s.desc && <span>{s.desc}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Speakers */}
          {event.speakers.length > 0 && (
            <section className="event-section">
              <h2>Speakers</h2>
              <div className="event-speakers">
                {event.speakers.map((sp, i) => (
                  <div key={i} className="speaker">
                    <div className="speaker-img">
                      <SmartImage src={sp.image} alt={sp.name} label={`Headshot · ${sp.name}`} style={{width:'100%',height:'100%'}}/>
                    </div>
                    <b>{sp.name}</b>
                    <span>{sp.role}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Location */}
          <section className="event-section">
            <h2>Location</h2>
            <div className="event-loc">
              <div className="loc-head">
                <b>{event.format}</b>
                <span>{event.venue}</span>
              </div>
              <div className="loc-map">
                <SmartImage src="" alt="Venue map" label="Venue map / photo" style={{width:'100%',height:'100%'}}/>
              </div>
            </div>
          </section>

          {/* FAQ */}
          {event.faqs.length > 0 && (
            <section className="event-section">
              <h2>Frequently asked</h2>
              <div className="event-faqs">
                {event.faqs.map((f, i) => (
                  <div key={i} className={`faq ${openFaq===i?'open':''}`} onClick={() => setOpenFaq(openFaq===i ? -1 : i)}>
                    <div className="faq-q">
                      <span>{f.q}</span>
                      <span className="faq-tog">{openFaq===i ? '−' : '+'}</span>
                    </div>
                    {openFaq === i && <div className="faq-a">{f.a}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="event-presented">
            <span>Presented by</span>
            <div className="presented-by" onClick={() => setView({ name:'about' })}>
              <Wordmark size="sm"/>
            </div>
          </div>
        </div>

        {/* Sticky ticket card */}
        <aside className="event-ticket-wrap">
          <div className="event-ticket-card">
            {submitted ? (
              <div className="ticket-success">
                <div className="ts-icon"><Icon name="check" size={22}/></div>
                <b>You're in.</b>
                <p>{isFreeTicket
                  ? "We just emailed you the calendar invite and join link. See you there."
                  : "Payment confirmed. Check your inbox for the receipt and join link."}</p>
                <button className="btn-ghost" style={{marginTop:18,width:'100%',justifyContent:'center',background:'var(--lt-grey)',color:'var(--text)',border:'1px solid var(--line)'}} onClick={() => setSubmitted(false)}>
                  Register another
                </button>
              </div>
            ) : (
              <>
                <div className="ticket-meta">
                  <div className="tm-row">
                    <div className="tm-ic"><Icon name="play" size={14}/></div>
                    <div>
                      <b>{event.startDate}</b>
                      <span>{event.startTime} – {event.endTime} {event.timezone}</span>
                    </div>
                  </div>
                  <div className="tm-row">
                    <div className="tm-ic"><Icon name="play" size={14}/></div>
                    <div>
                      <b>{event.format}</b>
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="ticket-section-label">Tickets</div>
                <div className="ticket-options">
                  {event.tickets.map(t => (
                    <label key={t.id} className={`ticket-opt ${selectedTicket===t.id?'sel':''}`}>
                      <input
                        type="radio"
                        name="ticket"
                        checked={selectedTicket === t.id}
                        onChange={() => setSelectedTicket(t.id)}
                      />
                      <div className="ticket-opt-body">
                        <div className="ticket-opt-head">
                          <b>{t.label}</b>
                          <span className="ticket-price">{t.price === 0 ? 'Free' : `$${t.price}`}</span>
                        </div>
                        <span className="ticket-desc">{t.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <button className="btn-primary ticket-register" onClick={() => setSubmitted(true)}>
                  <Icon name="check" size={14}/>
                  {isFreeTicket ? 'Register — free' : `Register — $${ticket.price}`}
                </button>

                <div className="ticket-footer">
                  <button className="btn-ghost-sm">
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Share
                  </button>
                  <span className="ticket-secure">
                    <Icon name="check" size={12}/> Secure checkout
                  </span>
                </div>

                <p className="ticket-fine">
                  {isFreeTicket
                    ? "Free registration — we'll email the calendar invite and the join link. No card required."
                    : "Payment processed securely by Stripe. Receipt and join link emailed after checkout."}
                </p>
              </>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

Object.assign(window, { EventsListPage, EventDetailPage });
