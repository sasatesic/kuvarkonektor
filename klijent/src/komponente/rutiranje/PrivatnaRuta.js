import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const PrivatnaRuta = ({
  component: Component,
  autorizacija: { odradjenaAutentikacija, loadovanje },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !odradjenaAutentikacija && !loadovanje ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivatnaRuta.propTypes = {
  autorizacija: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  autorizacija: state.autorizacija
});

export default connect(mapStateToProps)(PrivatnaRuta);
