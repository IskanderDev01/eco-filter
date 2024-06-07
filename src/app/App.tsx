import { Suspense } from 'react';
import './styles/index.scss';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import back from '../shared/assets/background2.jpg';
import { LoginModal } from 'features/AuthByUsername'

function App() {
    const token = localStorage.getItem('user')
    if(!token) {
        return (
            <LoginModal />
        )
    }
    return (
        <div className="app" style={{backgroundImage: `url(${back})`}} >
            <Navbar />
            <Suspense fallback="">
                <div className="content-page">
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;
