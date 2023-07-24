import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";

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
        this.props.getGenderStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                arrGender: this.props.genderRedux,
            });
        }
    }

    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language);
    };

    render() {
        let genders = this.state.arrGender;
        let roles = this.state.arrRole;
        let postions = this.state.arrPosition;
        const language = this.props.language;
        console.log("check props from Redux: ", this.props.genderRedux);
        return (
            <div className="user-redux-container">
                <div className="title">Learn React-Redux</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 mt-3">
                                <h2>
                                    <FormattedMessage id="manage-user.add" />
                                </h2>
                            </div>
                            <form action="/post-crud" method="POST">
                                <div className="row mt-3">
                                    <div className="form-group col-md-3">
                                        <label>
                                            <FormattedMessage id="manage-user.email" />
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            name="email"
                                            autoComplete="username"
                                        />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label>
                                            <FormattedMessage id="manage-user.password" />
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                            autoComplete="current-password"
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="form-group col-md-3">
                                        <label>
                                            <FormattedMessage id="manage-user.first-name" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Son"
                                            name="firstName"
                                        />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label>
                                            <FormattedMessage id="manage-user.last-name" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="XiaoLin"
                                            name="lastName"
                                        />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="form-group col-md-6">
                                        <label>
                                            <FormattedMessage id="manage-user.address" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            placeholder="HCM"
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="form-group col-md-3">
                                        <label>
                                            <FormattedMessage id="manage-user.image" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="image"
                                        />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label>
                                            <FormattedMessage id="manage-user.position" />
                                        </label>
                                        <select
                                            name="position"
                                            className="form-select"
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

                                <div className="row mt-3">
                                    <div className="form-group col-md-2">
                                        <label>
                                            <FormattedMessage id="manage-user.phone-number" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phoneNumber"
                                        />
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label>
                                            <FormattedMessage id="manage-user.gender" />
                                        </label>
                                        <select
                                            name="gender"
                                            className="form-select"
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
                                    <div className="form-group col-md-2">
                                        <label>
                                            <FormattedMessage id="manage-user.role" />
                                        </label>
                                        <select
                                            name="roleId"
                                            className="form-select"
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
                                    className="btn btn-primary mt-3"
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
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) =>
        //     dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
