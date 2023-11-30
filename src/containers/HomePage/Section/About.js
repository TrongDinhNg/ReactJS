import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
    render() {
        return (
            <div className="section section-about">
                <div className="about-header">
                    Truyền thông nói gì vể chúng tôi
                </div>
                <div className="about-content">
                    <div className="about-content-left"></div>
                    <div className="about-content-right text-center">
                        Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt
                        Nam vươn tầm khu vực Asean, giúp bệnh nhân lựa chọn dịch
                        vụ y tế phù hợp nhằm nâng cao hiệu quả chữa bệnh, tiết
                        kiệm thời gian và chi phí.
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
