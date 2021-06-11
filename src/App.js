import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // If you signout, userAuth value will be null.
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          // onSnapshot mothod gives the actual data.
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    //console.log(this.props);

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// This is also a another convention of writting selector without createStructuredSelector.
// const mapStateToProps = (state) => ({
//   currentUser: selectCurrentUser(state),
// });

// Below are general mapStateToProps in redux.
// const mapStateToProps = ({ user }) => {
//   return {
//     currentUser: user.currentUser,
//   };
// };

// The above and below mapStateToProps code are same.
// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.user.currentUser,
//   };
// };

// The below are mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

// The below code is same as above. Syntax only the difference.
// const mapDispatchToProps = (dispatch) => {
//   return {
//     setCurrentUser: (user) => {
//       return dispatch(setCurrentUser(user));
//     },
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
// First argument is null because, there is no mapStateToProps.
