import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import WatchlistPage from './pages/WatchlistPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';

const queryClient = new QueryClient();

const protectedRoutes = [
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/deposit', element: <DepositPage /> },
  { path: '/withdraw', element: <WithdrawPage /> },
  { path: '/history', element: <HistoryPage /> },
  { path: '/watchlist', element: <WatchlistPage /> },
  { path: '/settings', element: <SettingsPage /> },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />

          {protectedRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute>{element}</ProtectedRoute>}
            />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
