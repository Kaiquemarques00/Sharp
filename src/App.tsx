import { useEffect, useState } from 'react';
import { useLocation } from './hooks/useNavigate';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import DashboardPlans from './pages/DashboardPlans';
import CheckoutStep1 from './pages/CheckoutStep1';
import CheckoutStep2 from './pages/CheckoutStep2';
import CheckoutStep3 from './pages/CheckoutStep3';
import Success from './pages/Success';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import PaymentPending from './pages/PaymentPending';
import { PlanType, BillingCycle } from './types/plans';

function App() {
  const location = useLocation();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleHashChange = () => {
      forceUpdate({});
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const path = location.pathname;

  if (path === '/login') return <Login />;
  if (path === '/signup') return <Signup />;
  if (path === '/dashboard') return <Dashboard />;
  if (path === '/dashboard/plans') return <DashboardPlans />;
  if (path === '/success') return <Success />;
  if (path === '/payment/success') return <PaymentSuccess />;
  if (path === '/payment/failure') return <PaymentFailure />;
  if (path === '/payment/pending') return <PaymentPending />;

  const checkoutMatch = path.match(/^\/checkout\/([^/]+)\/([^/]+)$/);
  if (checkoutMatch) {
    const [, planId, billingCycle] = checkoutMatch;
    return <CheckoutStep1 planId={planId as PlanType} billingCycle={billingCycle as BillingCycle} />;
  }

  const step2Match = path.match(/^\/checkout\/step2\/([^/]+)\/([^/]+)$/);
  if (step2Match) {
    const [, planId, billingCycle] = step2Match;
    return <CheckoutStep2 planId={planId as PlanType} billingCycle={billingCycle as BillingCycle} />;
  }

  const step3Match = path.match(/^\/checkout\/step3\/([^/]+)\/([^/]+)$/);
  if (step3Match) {
    const [, planId, billingCycle] = step3Match;
    return <CheckoutStep3 planId={planId as PlanType} billingCycle={billingCycle as BillingCycle} />;
  }

  return <LandingPage />;
}

export default App;
