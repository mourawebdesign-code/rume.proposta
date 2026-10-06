import { useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import AllWorks from './pages/AllWorks';
import About from './pages/About';
import Contact from './pages/Contact';
import Project from './pages/Project';

// Reference page changes are instant with scroll reset to top (no transition overlay).
function ScrollReset() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      <ScrollReset />
      {pathname !== '/' && <Nav />}
      <Routes location={pathname} key={pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/all-works" element={<AllWorks />} />
        <Route path="/all-works/:category" element={<AllWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/works/:slug" element={<Project />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
