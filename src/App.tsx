import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import { WelcomeModal, VerificationModal } from './components/modals';
import { useRequestOtpMutation } from './app/auth/authApi';
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
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [emailForVerification, setEmailForVerification] = useState('');

  const [requestOtp, { isLoading: isRequestingOtp }] = useRequestOtpMutation();

  const handleContinueWithEmail = async (email: string) => {
    try {
      await requestOtp({ identifier: email }).unwrap();
      setEmailForVerification(email);
      setWelcomeModalOpen(false);
      setVerificationModalOpen(true);
    } catch (error) {
      console.error('Failed to request OTP:', error);
    }
  };

  const handleVerificationClose = () => {
    setVerificationModalOpen(false);
  };

  const handleVerificationGoBack = () => {
    setVerificationModalOpen(false);
    setWelcomeModalOpen(true);
  };

  return (
    <Router>
      <ScrollToTopOnRouteChange />
      <div className="min-h-screen w-full bg-white font-sans text-slate-800 overflow-x-hidden">
        <Header onOpenWelcomeModal={() => setWelcomeModalOpen(true)} />

        <WelcomeModal
          open={welcomeModalOpen}
          onClose={() => setWelcomeModalOpen(false)}
          onContinueWithEmail={handleContinueWithEmail}
          isSubmitting={isRequestingOtp}
        />

        <VerificationModal
          open={verificationModalOpen}
          email={emailForVerification}
          onClose={handleVerificationClose}
          onGoBack={handleVerificationGoBack}
        />

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
