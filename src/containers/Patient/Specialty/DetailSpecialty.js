import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";

import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor/ProfileDoctor";
import userService from "../../../services/userService";
import "./DetailSpecialty.scss";
import { LANGUAGES } from "../../../utils";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
        };
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        let res = await userService.getAllDetailSpecialtyByIdService({
            id,
            location: "ALL",
        });

        let resProvince = await userService.getAllcodeService("PROVINCE");

        if (
            res &&
            res.errCode === 0 &&
            resProvince &&
            resProvince.errCode === 0
        ) {
            let arrDoctorId = [];
            res?.data?.doctorSpecialty?.map((item) => {
                return arrDoctorId.push(item.doctorId);
            });

            let dataProvince = resProvince.data;
            if (dataProvince && dataProvince.length > 0) {
                dataProvince.unshift({
                    createdAt: null,
                    keyMap: "ALL",
                    type: "PROVINCE",
                    valueVi: "Toàn quốc",
                    valueEn: "ALL",
                });
            }

            this.setState({
                dataDetailSpecialty: res.data,
                arrDoctorId: arrDoctorId,
                listProvince: dataProvince ? dataProvince : [],
            });
        }
    }

    handleOnChangeSelect = async (e) => {
        const { id } = this.props.match.params;
        let location = e.target.value;

        let res = await userService.getAllDetailSpecialtyByIdService({
            id,
            location,
        });

        if (res && res.errCode === 0) {
            let arrDoctorId = [];
            res?.data?.doctorSpecialty?.map((item) => {
                return arrDoctorId.push(item.doctorId);
            });

            this.setState({
                dataDetailSpecialty: res.data,
                arrDoctorId: arrDoctorId,
            });
        }
    };

    render() {
        const { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        console.log("listProvince", listProvince);
        console.log("arrDoctorId", arrDoctorId);

        const { language } = this.props;
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        <div
                            className="container"
                            dangerouslySetInnerHTML={{
                                __html: dataDetailSpecialty?.contentHTML,
                            }}
                        ></div>
                    </div>
                    <div className="search-sp-doctor">
                        <select onChange={this.handleOnChangeSelect}>
                            {listProvince?.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI
                                            ? item.valueVi
                                            : item.valueEn}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {arrDoctorId?.map((item, index) => {
                        return (
                            <div className="each-doctor" key={index}>
                                <div className="dt-content-left">
                                    <div className="profile-doctor">
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescriptionDoctor={true}
                                            isShowLinkDetail={true}
                                            isShowPrice={false}
                                            isShowProvince={true}
                                            // dataTime={dataTime}
                                        />
                                    </div>
                                </div>
                                <div className="dt-content-right">
                                    <div className="doctor-schedule">
                                        <DoctorSchedule doctorId={item} />
                                    </div>
                                    <div className="doctor-extra-infor">
                                        <DoctorExtraInfor doctorId={item} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
});

export default connect(mapStateToProps)(DetailSpecialty);
