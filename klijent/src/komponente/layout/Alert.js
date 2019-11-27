import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alertovi }) =>
  alertovi !== null &&
  alertovi.length > 0 &&
  alertovi.map(alert => (
      <div className={"alert alert-dismissible alert-" + alert.tipAlerta} key={alert.id}>
          <button type="button" className="close" data-dismiss="alert">&times;</button>
          <strong>{alert.msg}</strong>
      </div>
  ));

Alert.propTypes = {
  alertovi: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alertovi: state.alert
});

export default connect(mapStateToProps)(Alert);
