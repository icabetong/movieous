import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthLayout from "../auth/AuthLayout";
import HomeLayout from "../home/HomeLayout";
import MovieLayout from "../movie/MovieLayout";

const Main = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={HomeLayout} exact/>
                <Route path="/movies" component={MovieLayout}/>
                <Route path="/auth" component={AuthLayout}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Main;