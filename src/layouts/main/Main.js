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
import TheaterLayout from "../theaters/TheaterLayout";
import ConsoleLayout from "../console/ConsoleLayout";
import ErrorStateLayout from "../state/ErrorStateLayout";

const Main = () => {
    return (
        <AuthProvider>
            <Router history={history}>
                <Switch>
                    <Route path="/" component={HomeLayout} exact/>
                    <Route path="/console" component={ConsoleLayout}/>
                    <Route path="/theater" component={TheaterLayout}/>
                    <Route path="/movie/:id" component={MovieLayout}/>
                    <Route path="/reserve/:id/:total/:free/:price" component={ReservationLayout}/>
                    <Route path="/blogs" component={BlogLayout}/>
                    <Route path="/about" component={AboutLayout}/>
                    <Route path="/account" component={AccountLayout}/>
                    <Route path="/auth" component={AuthLayout}/>
                    <Route path="/error" component={ErrorStateLayout}/>
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default Main;