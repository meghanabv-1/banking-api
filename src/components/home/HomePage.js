import React from "react";
import { connect } from "react-redux";
// import * as authorActions from '../../redux/actions/authorActions';
// import { bindActionCreators } from "redux";

import Spinner from "../common/Spinner";
import TextInput from "../common/TextInput";

class HomePage extends React.Component {

  state = {
    email: '',
    password: '',
    errors: {},
    loading: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  formIsValid = () => {
    const { email, password } = this.state;
    const errors = {};

    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";

    this.setState({errors});
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  doLogin = (event) => {
    event.preventDefault();
    if (!this.formIsValid()) return;
  }

  render(){
    return(
      <div className="container">
        <h1>Login</h1>

        {this.props.loading ? (
          <Spinner />
        ) : (
        <form onSubmit={this.doLogin}>
          <TextInput
            type="email"
            name="email"
            label="Email"
            value={this.state.email}
            onChange={this.handleChange}
            error={this.state.errors.email}
            placeholder="enter email"
          />

          <TextInput
            type="password"
            name="password"
            label="Password"
            value={this.state.password}
            onChange={this.handleChange}
            error={this.state.errors.password}
            placeholder="enter password"
          />

          <button type="submit" disabled={this.state.loading} className="btn btn-primary">
            {this.state.loading ? "Logging in..." : "Login"}
          </button>
        </form>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      // loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
