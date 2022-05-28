import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SnackbarProvider } from 'notistack';
import Layout from '../components/Layout';
import '../styles/globals.css'
import { StoreProvider } from "../utils/store";

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PayPalScriptProvider>
      </StoreProvider>
    </SnackbarProvider>
  );
}

export default MyApp
