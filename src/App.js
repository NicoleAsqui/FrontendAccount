import { QueryClient, QueryClientProvider } from 'react-query';
import MainTemplate from './components/templates/MainTemplate';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <MainTemplate />
        </QueryClientProvider>
    );
};

export default App;
