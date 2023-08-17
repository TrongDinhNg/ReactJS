import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
import userService from "../../services/userService";

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }
    async componentDidMount() {
        if (this.props.location) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get("token");
            let doctorId = urlParams.get("doctorId");
            let res = await userService.postVerifyBookAppointmentService({
                token,
                doctorId,
            });
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                });
            }
        }
    }
    render() {
        const { statusVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="title">
                    {statusVerify === false ? (
                        <div>Loading data...</div>
                    ) : (
                        <div>
                            {errCode === 0 ? (
                                <div className="infor-booking">
                                    Xác nhận lịch hẹn thành công!
                                </div>
                            ) : (
                                <div className="infor-booking">
                                    Lịch hẹn không tồn tại hoặc đã được xác
                                    nhận!
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
