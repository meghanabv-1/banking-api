import React from "react";
import { toast } from "react-toastify";

import TextInput from "../common/TextInput";
import {registerUser} from '../../api/userApi';

class RegisterPage extends React.Component {

    state = {
      name: '',
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
      const { name, email, password } = this.state;
      const errors = {};
  
      if (!name) errors.name = "Name is required.";
      if (!email) errors.email = "Email is required.";
      if (!password) errors.password = "Password is required.";
  
      this.setState({errors});
      // Form is valid if the errors object still has no properties
      return Object.keys(errors).length === 0;
    }

    doRegister = (event) => {
      event.preventDefault();
      if (!this.formIsValid()) return;
      this.setState({loading: true});
      registerUser().then((res) => {
        toast.success("saved.");
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({loading: false });
        console.log(error)
      });
    }

  render(){
    return(
      <div className="container">
        <h1>Register</h1>

        <form onSubmit={this.doRegister}>
          <TextInput
            type="text"
            name="name"
            label="Name"
            value={this.state.name}
            onChange={this.handleChange}
            error={this.state.errors.name}
            placeholder="enter name"
          />

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
            {this.state.loading ? "regestering..." : "Register"}
          </button>
        </form>
      </div>
    )
  }
}



export default RegisterPage