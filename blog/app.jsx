/* =====================================================
   Fine Print Finance — App entry / SPA routing
   ===================================================== */

const { useState: useStateA, useEffect: useEffectA } = React;

function App() {
  const [view, setView] = useStateA({ name: 'home' });

  // Scroll to top on view change (except for article hash anchors)
  useEffectA(() => {
    if (view.name !== 'article') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [view.name]);

  const isHome = view.name === 'home';

  let page = null;
  switch (view.name) {
    case 'home':    page = <HomePage setView={setView}/>; break;
    case 'blog':    page = <BlogPage setView={setView} initialPillar={view.pillar}/>; break;
    case 'article': page = <ArticlePage setView={setView} slug={view.slug}/>; break;
    case 'events':  page = <EventsListPage setView={setView}/>; break;
    case 'event':   page = <EventDetailPage setView={setView} slug={view.slug}/>; break;
    case 'ask':     page = <AskPage setView={setView}/>; break;
    case 'about':   page = <AboutPage setView={setView}/>; break;
    default:        page = <HomePage setView={setView}/>;
  }

  return (
    <>
      <Nav view={view} setView={setView} onDarkHero={isHome || view.name==='ask' || view.name==='about' || view.name==='article' || view.name==='blog' || view.name==='events' || view.name==='event'} />
      {page}
      <Footer setView={setView}/>
      <ChatWidget/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
