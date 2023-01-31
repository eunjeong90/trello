import { Route, BrowserRouter, Switch } from "react-router-dom";
import Main from "./Main";

const AppRouter = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
