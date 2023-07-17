import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Handbook extends Component {
    render() {
        return (
            <div className="section section-handBook">
                <div className="section-container">
                    <div className="section-header">
                        <span>Cẩm Nang</span>
                        <button className="see-more">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="img-customize">
                                <div className="section-logo handbook-logo"></div>
                                <span>Cơ Xương khớp</span>
                            </div>
                            <div className="img-customize">
                                <div className="section-logo handbook-logo"></div>
                                <span>Cơ Xương khớp2</span>
                            </div>
                            <div className="img-customize">
                                <div className="section-logo handbook-logo"></div>
                                <span>Cơ Xương khớp3</span>
                            </div>
                            <div className="img-customize">
                                <div className="section-logo handbook-logo"></div>
                                <span>Cơ Xương khớp4</span>
                            </div>
                            <div className="img-customize">
                                <div className="section-logo handbook-logo"></div>
                                <span>Cơ Xương khớp5</span>
                            </div>
                            <div className="img-customize">
                                <div className="section-logo handbook-logo"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
