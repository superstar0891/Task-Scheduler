import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import '../scss/login.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="loginBG">
        <div className="Right-Container ">
          <div className="animation">Welcome to Task Scheduler</div> 
            <form className="Log-input " noValidate onSubmit={this.onSubmit}>
            <span className='add'>Please login to your account</span>
                <div className="form-group">
                <label htmlFor="email" className="re_email-content">
                E-Mail :
              </label>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  placeholder="E-mail here..."
                  className="form-control"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="form-group">
              <label htmlFor="password" className="re_email-content">PASSWORD :</label>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  placeholder="Password here..."
                  className="form-control"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                  <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="btncenter">
              <button className="re_Login-Button" type='submit' >LOGIN</button>
              <div style={{ fontSize: '15px' }}>Don't you have your account? <Link to="/register"
                className="btncenter1" style={{ fontWeight: "bold", color: "#C90D08", cursor: "pointer", fontSize: '15px' }}>Register here</Link>
              </div>
            </div>
            </form>
          </div>
        </div>
        
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
