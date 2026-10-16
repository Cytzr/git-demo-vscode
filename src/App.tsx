import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from './middlewares/error-boundary-middleware'
import ErrorPage from './pages/error/error-page'
import { AppRoute } from './routes'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              {/* Global Suspense (Optional) */}
              {/* <Suspense fallback={<Spinner />}> */}

              {/* Turn this on to enable error page params passing */}
              {/* <ErrorBoundary fallback={ErrorPage}> */}

              <ErrorBoundary fallback={<ErrorPage />}>
                <Routes>
                  {AppRoute.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                  ))}
                </Routes>
              </ErrorBoundary>
              {/* </Suspense> */}
            </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
