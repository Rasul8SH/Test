import { ToastContainer } from "react-toastify"
import AuthProvider from "./hooks/useAuth"
import NavBar from "./components/ui/navBar"
import { QualityProvider } from "./hooks/useQuality"
import { ProfessionProvider } from "./hooks/useProfession"
import Login from "./layouts/logIn"
import LogOut from "./layouts/logOut"
import Main from "./layouts/main"
import { Route, Routes } from "react-router-dom"
// import ProtectedRoute from "./components/common/protectedRoute"

const App = () => {
    return (
        <>
            <AuthProvider>
                <NavBar />

                <QualityProvider>
                    <ProfessionProvider>
                        <Routes>
                            {/* <ProtectedRoute path="/users/:userId?:edit?" component={} /> */}
                            <Route path="/login/:type?" element={<Login/>} />
                            <Route path="/logout" element={<LogOut/>} />
                            <Route path="/" element={<Main/>} />
                        </ Routes>
                    </ProfessionProvider>
                </QualityProvider>
            </AuthProvider>

            <ToastContainer/>
        </>
    )
}

export default App