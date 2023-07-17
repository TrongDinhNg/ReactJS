import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {
    render() {
        return (
            <div className="section section-medicalFacility">
                <div className="section-container">
                    <div className="section-header">
                        <span>Cơ sở Y tế nổi bật</span>
                        <button className="see-more">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="img-customize">
                                <div className="section-logo medicalFacility-logo"></div>
                                <span>Bệnh Viện Chợ Rẫy 1 </span>
                            </div>
                            <div className="img-customize">
                                <div className="section-logo medicalFacility-logo"></div>
                                <span>Bệnh Viện Chợ Rẫy 2</span>
                            </div>
                            <div className="img-customize">
                                <div className="section-logo medicalFacility-logo"></div>
                                <span>Bệnh Viện Chợ Rẫy 3</span>
                            </div>
                            <div className="img-customize">
                                <div className="section-logo medicalFacility-logo"></div>
                                <span>Bệnh Viện Chợ Rẫy 4</span>
                            </div>
                            <div className="img-customize">
                                <div className="section-logo medicalFacility-logo"></div>
                                <span>Bệnh Viện Chợ Rẫy 5</span>
                            </div>
                            <div className="img-customize">
                                <div className="section-logo medicalFacility-logo"></div>
                                <span>Bệnh Viện Chợ Rẫy 6</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
