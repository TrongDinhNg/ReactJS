import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import "./Login.scss";
import userService from "../../services/userService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
        };
    }
    handlerOnchangeUsername = (even) => {
        this.setState({
            username: even.target.value,
        });
    };
    handlerOnchangePassword = (even) => {
        this.setState({
            password: even.target.value,
        });
    };
    handlerLogin = async () => {
        this.setState({
            errMessage: "",
        });
        try {
            let data = await userService.login(
                this.state.username,
                this.state.password,
            );
            if (data && data.errorCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            } else {
                this.props.userLoginSuccess(data.user);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    });
                }
            }
            console.log(error);
        }
    };
    handlerShowHidePassWord = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };
    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handlerLogin();
        }
    };

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(even) =>
                                    this.handlerOnchangeUsername(even)
                                }
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div className="custom-input-password">
                                <input
                                    type={
                                        this.state.isShowPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-control"
                                    placeholder="Enter your password "
                                    value={this.state.password}
                                    onChange={(even) =>
                                        this.handlerOnchangePassword(even)
                                    }
                                    onKeyDown={(even) =>
                                        this.handleKeyDown(even)
                                    }
                                />
                                <div
                                    onClick={() =>
                                        this.handlerShowHidePassWord()
                                    }
                                >
                                    <i
                                        className={
                                            this.state.isShowPassword
                                                ? "fas fa-eye"
                                                : "fas fa-eye-slash"
                                        }
                                    ></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: "red" }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 ">
                            <input
                                className="btn-login"
                                type="submit"
                                value="Log in"
                                onClick={() => this.handlerLogin()}
                            />
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">
                                Forgot your password?
                            </span>
                        </div>
                        <div className="col-12 mt-5">
                            <span>Or sign in with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-facebook-f icon-facebook"></i>
                            <i className="fab fa-google-plus-g icon-google"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) =>
            dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
