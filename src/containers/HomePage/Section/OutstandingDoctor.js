import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OutstandingDoctor extends Component {
    render() {
        return (
            <div className="section section-outstandingDoctor">
                <div className="section-container">
                    <div className="section-header">
                        <span>Bác sĩ nổi bậc tuần qua</span>
                        <button className="see-more">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="img-customize text-center">
                                <div className="section-logo doctor-logo"></div>
                                <span>Bác sĩ Jisung</span>
                                <br></br>
                                <span>Ngoại Khoa Lồng Ngực</span>
                            </div>
                            <div className="img-customize text-center">
                                <div className="section-logo doctor-logo"></div>
                                <span>Bác sĩ Jisung</span>
                                <br></br>
                                <span>Ngoại Khoa Lồng Ngực</span>
                            </div>
                            <div className="img-customize text-center">
                                <div className="section-logo doctor-logo"></div>
                                <span>Bác sĩ Jisung</span>
                                <br></br>
                                <span>Ngoại Khoa Lồng Ngực</span>
                            </div>
                            <div className="img-customize text-center">
                                <div className="section-logo doctor-logo"></div>
                                <span>Bác sĩ Jisung</span>
                                <br></br>
                                <span>Ngoại Khoa Lồng Ngực</span>
                            </div>
                            <div className="img-customize text-center">
                                <div className="section-logo doctor-logo"></div>
                                <span>Bác sĩ Jisung</span>
                                <br></br>
                                <span>Ngoại Khoa Lồng Ngực</span>
                            </div>
                            <div className="img-customize text-center">
                                <div className="section-logo doctor-logo"></div>
                                <span>Bác sĩ Jisung</span>
                                <br></br>
                                <span>Ngoại Khoa Lồng Ngực</span>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
