import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';


const CLIENT_ID = "100737041884-8n7ddtukhha5ka3kjumhgpvk6o36a4bg.apps.googleusercontent.com"
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <GoogleOAuthProvider
            clientId={CLIENT_ID}
        >
            <App />
        </GoogleOAuthProvider>
    </Provider>
)
