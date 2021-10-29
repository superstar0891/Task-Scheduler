import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import '../scss/register.scss';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className='registerBG' >
        <div className="re_Right-Container ">
          <div className="animation">Welcome to Task Scheduler</div>
          <form className=" re_Log-input " noValidate onSubmit={this.onSubmit}>

            <span className='add'>Please create your account</span>
            <div className="form-group">
              <label htmlFor="name" className="re_email-content">
                NAME :
              </label>
              <input className="form-control" size="large" id="name" type='text' value={this.state.name} onChange={this.onChange} error={errors.name} placeholder="Name here........" className={classnames("", {
                invalid: errors.name
              })} />
              <span className="red-text">{errors.name}</span>
             </div>

            <div className="form-group">
              <label htmlFor="email" className="re_email-content">
                E-Mail :
              </label>

              <input className="form-control" size="large" id="email" type="email" value={this.state.email} onChange={this.onChange} error={errors.email} placeholder="E-mail here..." className={classnames("", {
                invalid: errors.email
              })} />
              <span className="red-text">{errors.email}</span>

            </div>
            <div className="form-group" >
              <label htmlFor="password" className="re_email-content">PASSWORD :</label>

              <input className="form-control" size="large" type="text" id="password" value={this.state.password} onChange={this.onChange} error={errors.password} placeholder="Password here..." className={classnames("", {
                invalid: errors.password
              })} />
              <span className="red-text">{errors.password}</span>

            </div>
            <div className="form-group" >
              <label htmlFor="password2" className="re_email-content">CONFIRM PASSWORD :</label>

              <input className="form-control" size="large" type="password" id="password2" onChange={this.onChange} value={this.state.password2} placeholder="Type your password..." className={classnames("", {
                invalid: errors.password2
              })} />
              <span className="red-text" >{errors.password2}</span>

            </div>

            <div className="btncenter">
              <button className="re_Login-Button" type='submit' >REGISTER</button>
              <div style={{ fontSize: '15px' }}>Have already an account? <Link to="/"
                className="btncenter1" style={{ fontWeight: "bold", color: "#C90D08", cursor: "pointer", fontSize: '15px' }}>Login here</Link>
              </div>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
