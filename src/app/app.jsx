import { ToastContainer } from "react-toastify"
import AuthProvider from "./hooks/useAuth"
import NavBar from "./components/ui/navBar"
import { QualityProvider } from "./hooks/useQuality"
import { ProfessionProvider } from "./hooks/useProfession"
import { Route, Switch, Redirect } from "react-router-dom"

const App = () => {
    return (
        <>
            <AuthProvider>
                <NavBar />

                <QualityProvider>
                    <ProfessionProvider>
                        <Switch>
                            
                            <Route path="/login/:type?" component={} />
                            <Route path="/logout" component={} />
                            <Route exact path="/" component={} />
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionProvider>
                </QualityProvider>
            </AuthProvider>

            <ToastContainer/>
        </>
    )
}

export default App