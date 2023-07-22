import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrGender: [],
            arrRole: [],
            arrPosition: [],
        };
    }

    async componentDidMount() {
        await this.getGender();
        await this.getRole();
        await this.getPosition();
    }

    getGender = async () => {
        try {
            let res = await userService.getAllcodeService("gender");
            if (res && res.errCode === 0) {
                this.setState({
                    arrGender: res.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    getRole = async () => {
        try {
            let res = await userService.getAllcodeService("role");

            if (res && res.errCode === 0) {
                this.setState({
                    arrRole: res.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    getPosition = async () => {
        try {
            let res = await userService.getAllcodeService("position");

            if (res && res.errCode === 0) {
                this.setState({
                    arrPosition: res.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language);
    };

    render() {
        let genders = this.state.arrGender;
        let roles = this.state.arrRole;
        let postions = this.state.arrPosition;
        const language = this.props.language;
        return (
            <div className="user-redux-container">
                <div className="title">Learn React-Redux</div>
                <div className="user-redux-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-6 mt-3">
                                <h2>
                                    <FormattedMessage id="manage-user.add" />
                                </h2>
                            </div>
                            <form action="/post-crud" method="POST">
                                <div class="row mt-3">
                                    <div class="form-group col-md-3">
                                        <label for="inputEmail4">
                                            <FormattedMessage id="manage-user.email" />
                                        </label>
                                        <input
                                            type="email"
                                            class="form-control"
                                            placeholder="Email"
                                            name="email"
                                        />
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="inputPassword4">
                                            <FormattedMessage id="manage-user.password" />
                                        </label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            name="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="form-group col-md-3">
                                        <label for="inputEmail4">
                                            <FormattedMessage id="manage-user.first-name" />
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Son"
                                            name="firstName"
                                        />
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="inputPassword4">
                                            <FormattedMessage id="manage-user.last-name" />
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="XiaoLin"
                                            name="lastName"
                                        />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div class="form-group col-md-6">
                                        <label for="inputAddress">
                                            <FormattedMessage id="manage-user.address" />
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="address"
                                            placeholder="HCM"
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div class="form-group col-md-3">
                                        <label for="inputImgage">
                                            <FormattedMessage id="manage-user.image" />
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="image"
                                        />
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="inputImgage">
                                            <FormattedMessage id="manage-user.position" />
                                        </label>
                                        <select
                                            name="position"
                                            class="form-select"
                                        >
                                            <option>choose...</option>
                                            {postions &&
                                                postions.length > 0 &&
                                                postions.map((item, index) => {
                                                    return (
                                                        <option key={index}>
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? item.valueVi
                                                                : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="form-group col-md-2">
                                        <label for="inputCity">
                                            <FormattedMessage id="manage-user.phone-number" />
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="phoneNumber"
                                        />
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="inputState">
                                            <FormattedMessage id="manage-user.gender" />
                                        </label>
                                        <select
                                            name="gender"
                                            class="form-select"
                                        >
                                            <option>choose...</option>
                                            {genders &&
                                                genders.length > 0 &&
                                                genders.map((item, index) => {
                                                    return (
                                                        <option key={index}>
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? item.valueVi
                                                                : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="inputZip">
                                            <FormattedMessage id="manage-user.role" />
                                        </label>
                                        <select
                                            name="roleId"
                                            class="form-select"
                                        >
                                            <option>choose...</option>
                                            {roles &&
                                                roles.length > 0 &&
                                                roles.map((item, index) => {
                                                    return (
                                                        <option key={index}>
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? item.valueVi
                                                                : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    class="btn btn-primary mt-3"
                                >
                                    Add User
                                </button>
                            </form>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
