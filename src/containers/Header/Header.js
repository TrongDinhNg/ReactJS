import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils/constant";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }
    componentDidMount() {
        let { userInfor } = this.props;
        let menu = [];
        if (userInfor && !_.isEmpty(userInfor)) {
            let role = userInfor.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu,
        });
    }
    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language);
    };
    render() {
        const { processLogout, language, userInfor } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className="end-header">
                    <div className="welcome">
                        {" "}
                        <FormattedMessage id="home-header.welcome" />{" "}
                        {userInfor.firstName ? userInfor.firstName : ""}
                    </div>
                    {/* Change Language */}
                    <div
                        className={
                            language === LANGUAGES.VI
                                ? "language-vi active"
                                : "language-vi"
                        }
                    >
                        <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                            VN
                        </span>
                    </div>
                    <div
                        className={
                            language === LANGUAGES.EN
                                ? "language-en active"
                                : "language-en"
                        }
                    >
                        <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                            EN
                        </span>
                    </div>
                    {/* nút logout */}
                    <div
                        className="btn btn-logout"
                        onClick={processLogout}
                        title="Log Out"
                    >
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfor: state.user.userInfor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) =>
            dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
