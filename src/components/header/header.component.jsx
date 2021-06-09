import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./header.styles.scss";

const Header = ({ currentUser, hidden }) => {
  // The props is coming from mapStateToProps. You can console log the state after change the destructing of props to (props) object to understand all the props coming to the component.
  // Looks like this: const Header = (props) => { console.log(props);}

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? "" : <CartDropdown />}
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => {
  // This is advanced way of destructuring, give currentUser from user object and give hidden from cart object.
  return {
    currentUser,
    hidden,
  };
};

// We can get props and use it like below ways.
// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.user.currentUser,
//   };
// };

// const mapStateToProps = ({user}) => {
//   return {
//     currentUser: user.currentUser,
//   };
// };

export default connect(mapStateToProps)(Header);
