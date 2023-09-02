import React, { Component } from "react";
import { connect } from "react-redux";
import userService from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import "./ChooseSpecialty.scss";
import HomeHeader from "../HomeHeader";

class ChooseSpeciality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }
    async componentDidMount() {
        let res = await userService.getAllSpecialtyService();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data,
            });
        }
    }
    handleViewDetailSpecialty = (specialty) => {
        this.props.history.push(`/detail-specialty/${specialty.id}`);
    };
    render() {
        let { dataSpecialty } = this.state;
        return (
            <div className="choose-speciality">
                <HomeHeader isShowBanner={false} />
                <div className="c-s-container container">
                    <div className="c-s-title">
                        <span>
                            <FormattedMessage id="homepage.popular-specialty" />
                        </span>
                    </div>

                    {dataSpecialty &&
                        dataSpecialty.length > 0 &&
                        dataSpecialty.map((item, index) => {
                            return (
                                <div className="c-s-content" key={index}>
                                    <div
                                        className="speciality-logo img-customize col-3"
                                        style={{
                                            backgroundImage: `url(${item.image})`,
                                        }}
                                        onClick={() =>
                                            this.handleViewDetailSpecialty(item)
                                        }
                                    ></div>
                                    <span
                                        className="specialty-name"
                                        onClick={() =>
                                            this.handleViewDetailSpecialty(item)
                                        }
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ChooseSpeciality),
);
