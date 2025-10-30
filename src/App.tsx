import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <h1>Smart ATM App</h1>
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
