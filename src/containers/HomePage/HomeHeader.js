import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";

class HomeHeader extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.speciality" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.search-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        {" "}
                                        <FormattedMessage id="home-header.medical-facility" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        {" "}
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
                                        {" "}
                                        <FormattedMessage id="home-header.checkup-package" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    {" "}
                                    <FormattedMessage id="home-header.general-health-check" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="home-header.support" />
                            </div>
                            <div className="language-vi">VN</div>
                            <div className="language-en">EN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="search">
                        <div className="title">
                            <div className="title1">
                                <FormattedMessage id="banner.title1" />

                                <br></br>
                                <b>
                                    {" "}
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
                                <a href="/">
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
