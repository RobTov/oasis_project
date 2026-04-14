import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './presentation/contexts/AuthContext';
import { Router } from './infrastructure/router/Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
