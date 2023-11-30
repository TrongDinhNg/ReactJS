import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import { Link } from "react-router-dom";

class HomeHeader extends Component {
    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language);
    };
    render() {
        let language = this.props.language;
        //console.log(language);
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content col-2">
                            <i className="fas fa-bars"></i>
                            <div
                                className="header-logo"
                                onClick={() => (window.location.href = "/")}
                            ></div>
                        </div>
                        <div className="center-content col-8">
                            <div className="child-content">
                                <Link
                                    className="custom-link"
                                    to={"/choose-specialty"}
                                >
                                    <div>
                                        <b>
                                            <FormattedMessage id="home-header.speciality" />
                                        </b>
                                    </div>
                                    <div className="sub-title">
                                        <FormattedMessage id="home-header.search-doctor" />
                                    </div>
                                </Link>
                            </div>
                            <div className="child-content">
                                <Link
                                    className="custom-link"
                                    to={"/choose-health-facility"}
                                >
                                    <div>
                                        <b>
                                            <FormattedMessage id="home-header.medical-facility" />
                                        </b>
                                    </div>
                                    <div className="sub-title">
                                        <FormattedMessage id="home-header.select-room" />
                                    </div>
                                </Link>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.doctor" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.checkup-package" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.general-health-check" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content col-2">
                            <div className="support col-4 d-flex align-items-center">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="home-header.support" />
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.VI
                                        ? "language-vi active col-2"
                                        : "language-vi col-2"
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changeLanguage(LANGUAGES.VI)
                                    }
                                >
                                    VN
                                </span>
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.EN
                                        ? "language-en active col-2"
                                        : "language-en col-2"
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changeLanguage(LANGUAGES.EN)
                                    }
                                >
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="search">
                            <div className="title">
                                <div className="title1">
                                    <FormattedMessage id="banner.title1" />
                                    <br></br>
                                    <b>
                                        <FormattedMessage id="banner.title2" />
                                    </b>
                                </div>
                            </div>

                            <div className="search-form">
                                <i className="fas fa-search"></i>
                                <div className="search-input">
                                    <input placeholder="Khám chuyên khoa" />
                                </div>
                            </div>
                        </div>

                        <div className="option">
                            <ul>
                                <li>
                                    <a href="/choose-specialty">
                                        <i className="far fa-hospital"></i>
                                        <div className="text">
                                            <FormattedMessage id="option.child1" />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <i className="fas fa-phone-volume"></i>
                                        <div className="text">
                                            <FormattedMessage id="option.child2" />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <i className="fas fa-notes-medical"></i>
                                        <div className="text">
                                            <FormattedMessage id="option.child3" />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <i className="fas fa-vial"></i>
                                        <div className="text">
                                            <FormattedMessage id="option.child4" />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <i className="fas fa-heartbeat"></i>

                                        <div className="text">
                                            <FormattedMessage id="option.child5" />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <i className="far fa-smile"></i>
                                        <div className="text">
                                            <FormattedMessage id="option.child6" />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <i className="fas fa-procedures"></i>
                                        <div className="text">
                                            <FormattedMessage id="option.child7" />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <i className="fas fa-syringe"></i>
                                        <div className="text">
                                            <FormattedMessage id="option.child8" />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <i className="fas fa-walking"></i>

                                        <div className="text">
                                            <FormattedMessage id="option.child9" />
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
