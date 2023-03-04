import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth()

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!currentUser) {
                    return <Redirect to={{
                        pathname: "/login",
                        state: {
                            from: props.location
                        }
                    }} />
                }
                return Component ? <Component {...props} /> : children
            }}
        />
    )
}

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}

export default ProtectedRoute