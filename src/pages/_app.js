import '@/styles/globals.css';
import '../../node_modules/nprogress/nprogress.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import { ProfileProvider } from "../context/profileContext";
export default function App({ Component, pageProps }) {
    return (
      <ProfileProvider>
        <Component {...pageProps} />;
      </ProfileProvider>
    )
}
