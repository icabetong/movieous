import { Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../../utils/auth";
import history from "../../utils/history";
import AuthLayout from "../auth/AuthLayout";
import HomeLayout from "../home/HomeLayout";
import ReservationLayout from "../reserve/ReservationLayout";
import BlogLayout from "../blogs/BlogLayout";
import AboutLayout from "../about/AboutLayout";
import AccountLayout from "../account/AccountLayout";
import MovieLayout from "../movie/MovieLayout";
import MovieListLayout from "../movie/MovieListLayout";
import ConsoleLayout from "../console/ConsoleLayout";
import UnauthorizedErrorLayout from "../error/UnauthorizedErrorLayout";

const Main = () => {
    return (
        <AuthProvider>
            <Router history={history}>
                <Switch>
                    <Route path="/" component={HomeLayout} exact/>
                    <Route path="/console" component={ConsoleLayout}/>
                    <Route path="/movies" component={MovieListLayout}/>
                    <Route path="/movie/:id" component={MovieLayout}/>
                    <Route path="/reserve/:id" component={ReservationLayout}/>
                    <Route path="/blogs" component={BlogLayout}/>
                    <Route path="/about" component={AboutLayout}/>
                    <Route path="/account" component={AccountLayout}/>
                    <Route path="/auth" component={AuthLayout}/>
                    <Route path="/unauthorized" component={UnauthorizedErrorLayout}/>
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default Main;