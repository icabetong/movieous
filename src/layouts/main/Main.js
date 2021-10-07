import { Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../../utils/auth";
import history from "../../utils/history";
import AuthLayout from "../auth/AuthLayout";
import HomeLayout from "../home/HomeLayout";
import MovieLayout from "../movie/MovieLayout";

const Main = () => {
    return (
        <AuthProvider>
            <Router history={history}>
                <Switch>
                    <Route path="/" component={HomeLayout} exact/>
                    <Route path="/movies" component={MovieLayout}/>
                    <Route path="/auth" component={AuthLayout}/>
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default Main;