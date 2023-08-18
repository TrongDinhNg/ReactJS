import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import userService from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class Speciality extends Component {
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
            <div className="section section-speciality">
                <div className="section-container">
                    <div className="section-header">
                        <span>
                            <FormattedMessage id="homepage.popular-specialty" />
                        </span>
                        <button className="see-more">
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataSpecialty &&
                                dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div
                                            className="img-customize"
                                            key={index}
                                            onClick={() =>
                                                this.handleViewDetailSpecialty(
                                                    item,
                                                )
                                            }
                                        >
                                            <div
                                                className="section-logo speciality-logo"
                                                style={{
                                                    backgroundImage: `url(${item.image})`,
                                                }}
                                            ></div>
                                            <span className="specialty-name">
                                                {item.name}
                                            </span>
                                        </div>
                                    );
                                })}
                        </Slider>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Speciality),
);
