import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctor: this.props.topDoctors,
            });
        }
    }
    componentDidMount() {
        this.props.fetchTopDoctor();
    }
    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    };
    render() {
        // console.log("check props topDoctors: ", this.props.topDoctors);
        let topDoctors = this.state.arrDoctor;
        return (
            <div className="section section-outstandingDoctor">
                <div className="section-container">
                    <div className="section-header">
                        <span>
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </span>
                        <button className="see-more">
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {topDoctors &&
                                topDoctors.length > 0 &&
                                topDoctors.map((item, index) => {
                                    let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;
                                    let previewImgUrl = "";
                                    if (item.image) {
                                        previewImgUrl = new Buffer(
                                            item.image,
                                            "base64",
                                        ).toString("binary");
                                    }
                                    return (
                                        <div
                                            className="img-customize text-center"
                                            key={index}
                                            onClick={() =>
                                                this.handleViewDetailDoctor(
                                                    item,
                                                )
                                            }
                                        >
                                            <div
                                                className="section-logo doctor-logo"
                                                style={{
                                                    backgroundImage: `url(${previewImgUrl})`,
                                                }}
                                            ></div>
                                            <span>
                                                {this.props.language ===
                                                LANGUAGES.VI
                                                    ? nameVi
                                                    : nameEn}
                                            </span>
                                            <br></br>
                                            <span>Ngoại Khoa Lồng Ngực</span>
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
        topDoctors: state.admin.arrDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTopDoctor: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor),
);
