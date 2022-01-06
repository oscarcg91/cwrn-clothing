import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import {
  auth,
  createUserProfileDocument,
} from "../src/firebase/firebase.utils";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { setCurrentUser } from "../src/redux/user/user-actions";
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import CheckOutPage from "./pages/checkout/checkout.component";
import ShopRouter from "./routes/shop/shop.router";
import SignInSignOutRouter from "./routes/signinsignout/signinsignout.router";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(user);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <React.StrictMode>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="shop/*" element={<ShopRouter />}></Route>
            <Route path="checkout" element={<CheckOutPage />} />
            <Route
              path="signin"
              element={
                <SignInSignOutRouter currentUser={this.props.currentUser}>
                  <SignInAndSignUpPage />
                </SignInSignOutRouter>
              }
            />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
