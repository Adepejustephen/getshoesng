import { SnackbarProvider } from 'notistack';
import Layout from '../components/Layout';
import '../styles/globals.css'
import { StoreProvider } from "../utils/store";

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider>
      <StoreProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </SnackbarProvider>
  );
}

export default MyApp
