import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";

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
    render() {
        // console.log("check props topDoctors: ", this.props.topDoctors);
        let topDoctors = this.state.arrDoctor;
        topDoctors = topDoctors.concat(topDoctors).concat(topDoctors);

        return (
            <div className="section section-outstandingDoctor">
                <div className="section-container">
                    <div className="section-header">
                        <span>Bác sĩ nổi bậc tuần qua</span>
                        <button className="see-more">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {topDoctors &&
                                topDoctors.length > 0 &&
                                topDoctors.map((item, index) => {
                                    if (index === 0) {
                                        console.log("item", item);
                                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
