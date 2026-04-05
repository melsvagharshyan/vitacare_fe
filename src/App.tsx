import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import BackgroundEffects from './components/background-effects/BackgroundEffects';
import { appRoutes } from './routes/routes';
import { useEffect } from 'react';

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTopOnRouteChange />
      <div className="relative flex min-h-screen w-full flex-col bg-white font-sans text-slate-800 overflow-x-hidden">
        <Header />
        <div className="relative z-10 flex flex-1 flex-col">
          <Routes>
            {appRoutes.map(route => (
              <Route key={route.path} path={route.path} element={<route.element />} />
            ))}
          </Routes>
          <Footer />
        </div>
        <BackgroundEffects />
      </div>
    </Router>
  );
}

export default App;
