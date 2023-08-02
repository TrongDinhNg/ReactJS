import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import "./DetailDoctor.scss";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: "",
        };
    }
    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let res = await userService.getDetailDoctorService(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {}
    render() {
        let detailDoctor = this.state.detailDoctor;
        let { language } = this.props;
        let nameEn = "";
        let nameVi = "";
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="detail-doctor-container">
                    <div className="container">
                        <div className="row">
                            <div className="infor-doctor">
                                <div className="content-left">
                                    <div
                                        className="avatar"
                                        style={{
                                            backgroundImage: `url(${detailDoctor.image})`,
                                        }}
                                    ></div>
                                </div>
                                <div className="content-right">
                                    <div className="up">
                                        {language === LANGUAGES.VI
                                            ? nameVi
                                            : nameEn}
                                    </div>
                                    <div className="down">
                                        {detailDoctor &&
                                            detailDoctor.Markdown &&
                                            detailDoctor.Markdown
                                                .description && (
                                                <span>
                                                    {
                                                        detailDoctor.Markdown
                                                            .description
                                                    }
                                                </span>
                                            )}
                                    </div>
                                </div>
                            </div>
                            <div className="appointment-doctor"></div>
                            <div className="detail-doctor">
                                {detailDoctor &&
                                    detailDoctor.Markdown.contentHTML && (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: detailDoctor.Markdown
                                                    .contentHTML,
                                            }}
                                        />
                                    )}
                            </div>
                            <div className="comment"></div>
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
