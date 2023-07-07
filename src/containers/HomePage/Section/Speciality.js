import React, { Component } from "react";
import { connect } from "react-redux";
import "./Speciality.scss";

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Speciality extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: true,
            arrows: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="section-speciality">
                <div className="speciality-container">
                    <div className="speciality-header">
                        <span>Chuyên Khoa phổ biến</span>
                        <button className="see-more">Xem thêm</button>
                    </div>
                    <div className="speciality-body">
                        <Slider {...settings}>
                            <div className="img-customize">
                                <div className="speciality-logo"></div>
                                <span>Cơ Xương khớp</span>
                            </div>
                            <div className="img-customize">
                                <div className="speciality-logo"></div>
                                <span>Cơ Xương khớp2</span>
                            </div>
                            <div className="img-customize">
                                <div className="speciality-logo"></div>
                                <span>Cơ Xương khớp3</span>
                            </div>
                            <div className="img-customize">
                                <div className="speciality-logo"></div>
                                <span>Cơ Xương khớp4</span>
                            </div>
                            <div className="img-customize">
                                <div className="speciality-logo"></div>
                                <span>Cơ Xương khớp5</span>
                            </div>
                            <div className="img-customize">
                                <div className="speciality-logo"></div>
                                <span>Cơ Xương khớp6</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
