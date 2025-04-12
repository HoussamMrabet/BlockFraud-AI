import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { TermsOfService } from './components/pages/TermsOfService';
import DashboardLayout from './components/layout/DashboardLayout';
import FraudPredictor from './components/pages/FraudPredictor';
import DataAnalyzer from './components/pages/DataAnalyzer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/dashboard" element={
          <DashboardLayout>
            <DataAnalyzer />
          </DashboardLayout>
        } />
        <Route path="/dashboard/predictor" element={
          <DashboardLayout>
            <FraudPredictor />
          </DashboardLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;