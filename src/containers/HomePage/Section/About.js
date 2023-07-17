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
                    <div className="about-content-left">
                        <iframe
                            width="100%"
                            height="320"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div className="about-content-right text-center">
                        chỉ hận nhân sinh không lặp lại
                        <br />
                        nhiều chuyện sở ngộ không thể cầu
                        <br />
                        năm tháng đằng đẵng bỗng quay đầu <br />
                        cảnh còn người mất <br />
                        vạn vật vẫn kiệm lời sinh sôi nảy nở <br />
                        đôi lời bỡ ngỡ <br />
                        một thời hoa nở bỗng thành không
                        <br />
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
