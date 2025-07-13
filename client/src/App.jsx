import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SiteLoader from "./components/SiteLoader";
import ErrorBoundary from "./components/ErrorBoundary";
import authManager from "./utils/auth";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToHash from "./components/ScrollToHash";
import WhatsAppButton from "./components/WhatsAppButton";

// Homepage Components
import HomeSlider from "./components/HomeSlider";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Features from "./components/Features";
import Results from "./components/Results";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Events from "./components/Events";

// Other Pages
import GallerySection from "./components/GallerySection";
import DownloadSection from "./components/DownloadSection";
import DirectorsMessage from "./pages/DirectorsMessage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactPage from "./pages/ContactPage";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import About from "./pages/About";
import ResultsPage from "./pages/ResultsPage";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Setup auth manager interceptors
    authManager.setupAxiosInterceptors();

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SiteLoader />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToHash />
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <main className="pt-[96px]">
                  <HomeSlider />

                  <Events />

                  <Hero />

                  {/* Courses Section */}
                  <div id="courses" className="scroll-mt-24">
                    <Courses />
                  </div>

                  <Features />

                  <Results />

                  <Gallery />

                  {/* Testimonials Section */}
                  <div id="testimonials" className="scroll-mt-24">
                    <Testimonials />
                  </div>
                </main>
                <Footer />
              </>
            }
          />

          {/* Other Pages */}
          <Route path="/gallery" element={<GallerySection />} />
          <Route path="/downloads" element={<DownloadSection />} />
          <Route path="/directors-message" element={<DirectorsMessage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
