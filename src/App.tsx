import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

import { protectedRoutes } from "./constants/ProtectedRoutes";
import NotFoundPage from './pages/NotFoundPage';

const queryClient = new QueryClient();


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
        <Toaster 
          position="top-right"
          toastOptions={{
            classNames: {
              error: 'bg-red-600 text-white border-red-700',
              success: 'bg-green-600 text-white border-green-700',
              warning: 'bg-yellow-600 text-white border-yellow-700',
              info: 'bg-blue-600 text-white border-blue-700',
            },
          }}
        />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
