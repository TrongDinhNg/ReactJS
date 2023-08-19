import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import moment from "moment";
import userService from "../../../../services/userService";
import { LANGUAGES } from "../../../../utils";
import "./ProfileDoctor.scss";
import _ from "lodash";

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        const { doctorId } = this.props;
        if (doctorId) {
            let res = await userService.getProfileDoctorsService(doctorId);
            this.setState({
                dataProfile: res.data,
            });
        }
    }

    renderTimeBooking = (dataTime) => {
        const { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time =
                language === LANGUAGES.VI
                    ? dataTime.timeTypeData.valueVi
                    : dataTime.timeTypeData.valueEn;

            let date =
                language === LANGUAGES.VI
                    ? moment
                          .unix(+dataTime.date / 1000)
                          .format("dddd - DD/MM/YYYY")
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale("en")
                          .format("ddd - MM/DD/YYYY");
            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.priceBooking" />
                    </div>
                </>
            );
        }
    };

    render() {
        const { dataProfile } = this.state;
        const {
            language,
            doctorId,
            isShowDescriptionDoctor,
            dataTime,
            isShowLinkDetail,
            isShowPrice,
            isShowProvince,
        } = this.props;
        console.log("dataProfile", dataProfile);
        let nameVi = `${dataProfile.positionData?.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        let nameEn = `${dataProfile.positionData?.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;

        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor container">
                    <div
                        className="content-left"
                        style={{
                            backgroundImage: `url(${dataProfile?.image})`,
                        }}
                    >
                        {isShowLinkDetail === true && (
                            <div className="view-detail-doctor">
                                <Link
                                    className="custom-link"
                                    to={`/detail-doctor/${doctorId}`}
                                >
                                    Xem thêm
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="content-right">
                        <h3 className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </h3>
                        <p className="down">
                            {isShowDescriptionDoctor
                                ? dataProfile?.Markdown?.description
                                : this.renderTimeBooking(dataTime)}
                        </p>
                        {isShowProvince === true && (
                            <div>
                                <i className="fas fa-map-marker-alt custom-location"></i>
                                {language === LANGUAGES.VI
                                    ? dataProfile?.Doctor_Infor
                                          ?.provinceTypeData.valueVi
                                    : dataProfile?.Doctor_Infor
                                          ?.provinceTypeData.valueEn}
                            </div>
                        )}
                    </div>
                </div>

                {isShowPrice === true && (
                    <div className="price">
                        <FormattedMessage id="patient.booking-modal.price" />
                        {language === LANGUAGES.VI ? (
                            <NumberFormat
                                className="currency"
                                value={
                                    dataProfile?.Doctor_Infor?.priceTypeData
                                        ?.valueVi
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={"VND"}
                            />
                        ) : (
                            <NumberFormat
                                className="currency"
                                value={
                                    dataProfile?.Doctor_Infor?.priceTypeData
                                        ?.valueEn
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor),
);
