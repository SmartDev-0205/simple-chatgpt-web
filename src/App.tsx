import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loading from './components/Loading';
import { LoadingProvider } from './contexts/LoadingContext';
import { MobileMenuProvider } from './contexts/MobileMenuContext';
import Routes from './Routes';
import { DialogSizeProvider } from './contexts/DialogSizeContext';
import { createPublicClient, http } from 'viem';


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
          <LoadingProvider>
            <MobileMenuProvider>
              <DialogSizeProvider>
                <Routes />
                <ToastContainer className="!z-[99999]" />
              </DialogSizeProvider>
            </MobileMenuProvider>
          </LoadingProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
