import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import {
  auth,
  createUserProfileDocument,
} from "../src/firebase/firebase.utils";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import { connect } from "react-redux";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { setCurrentUser } from "../src/redux/user/user-actions";

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

        console.log(this.state);
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
            <Route path="shop" element={<ShopPage />} />
            {/* <Route path="signin" element={<SignInAndSignUpPage />} /> */}
            <Route
              path="signin"
              element={
                <SignInWrapper currentUser={this.props.currentUser}>
                  <SignInAndSignUpPage />
                </SignInWrapper>
              }
            />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
}

const SignInWrapper = ({ children, currentUser }) => {
  return currentUser ? <Navigate to="/" replace /> : children;
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
