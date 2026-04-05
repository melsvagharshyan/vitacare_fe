import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
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
      <div className="min-h-screen w-full bg-white font-sans text-slate-800 overflow-x-hidden">
        <Header />

        <Routes>
          {appRoutes.map(route => (
            <Route key={route.path} path={route.path} element={<route.element />} />
          ))}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
