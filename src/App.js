import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import ExploreProduct from './Pages/ExploreProducts/ExploreProduct';
import AllProducts from './Pages/AllProdcts/AllProducts';
import Dashboard from './Pages/Dashboard/Dashbaoard/Dashboard';
import Register from './Pages/Login/Login/Register/Register';
import Login from './Pages/Login/Login/Login';
import AuthProvider from './Pages/Contexts/AuthProvider';
import PrivateRoute from './Pages/Login/Login/PrivateRoute/PrivateRoute';

function App() {
  return (
    <AuthProvider>

    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/allProducts">
            <AllProducts></AllProducts>
          </Route>
          <PrivateRoute path="/exploreProduct/:singleProductId">
            <ExploreProduct></ExploreProduct>
          </PrivateRoute>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
    </AuthProvider>
  );
}

export default App;
