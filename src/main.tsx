// import React from 'react';
import ReactDOM from 'react-dom/client';

/** Router */
import { BrowserRouter } from 'react-router-dom';

/** Additional Dependencies */
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CartProvider } from 'react-use-cart';
import { Provider } from 'react-redux';
import { SkeletonTheme } from 'react-loading-skeleton';
import { ToastContainer } from 'react-toastify';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import TopBarProgress from 'react-topbar-progress-indicator';

/** Bootstrap JS */
import 'bootstrap/dist/js/bootstrap.bundle.min';

/** Custom Files */
import App from '@/App.tsx';
import '@/scss/main.scss';

/** Redux Store */
import store from '@/redux';
import AdultPopup from './components/AdultPopup';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const isAbove18 = localStorage.getItem('18+');
const showModal = isAbove18 === null ? true : JSON.parse(isAbove18) === true ? false : true;
// console.log(showModal)
TopBarProgress.config({
    barColors: {
        '0': 'rgb(215, 54, 68)',
        '1.0': 'rgb(215, 54, 68)',
    },
    shadowBlur: 5,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <CartProvider>
        <QueryClientProvider client={queryClient}>
            <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_CLIENT_ID }}>
                <Provider store={store}>
                    <SkeletonTheme baseColor="#7d7d7d">
                        <ToastContainer autoClose={5000} position="top-right" pauseOnHover pauseOnFocusLoss />
                        {showModal && <AdultPopup />}
                        <BrowserRouter basename="/ecommerce">
                            <App />
                        </BrowserRouter>
                    </SkeletonTheme>
                </Provider>
            </PayPalScriptProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </CartProvider>
);
