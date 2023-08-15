import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import userService from "../../../services/userService";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
        };
    }
    async componentDidMount() {
        const { doctorId } = this.props;

        let allDays = this.getArrDays();
        if (allDays && allDays.length > 0) {
            let res = await userService.getScheduleDoctorByDate(
                doctorId,
                allDays[0].value,
            );
            this.setState({
                allDays,
                allAvailableTime: res.data ? res.data : [],
            });
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays();
            this.setState({
                allDays,
            });
        }
    }
    getArrDays = () => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let date = moment().add(i, "days");
            let label =
                this.props.language === LANGUAGES.VI
                    ? date.format("dddd - DD/MM")
                    : date.locale("en", localization).format("ddd - DD/MM");

            allDays.push({
                label: label,
                value: date.startOf("day").valueOf(),
            });
        }
        return allDays;
    };
    handleOnChangeSelect = async (e) => {
        const { doctorId } = this.props;
        let date = e.target.value;
        let res = await userService.getScheduleDoctorByDate(doctorId, date);
        if (res && res.errCode === 0) {
            this.setState({
                allAvailableTime: res.data ? res.data : [],
            });
        }
    };
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
        });
    };

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false,
        });
    };
    render() {
        let {
            allDays,
            allAvailableTime,
            isOpenModalBooking,
            dataScheduleTimeModal,
        } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="select-day">
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            {allDays &&
                                allDays.length > 0 &&
                                allDays.map((i, index) => {
                                    return (
                                        <option key={index} value={i.value}>
                                            {i.label}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="apointment-time">
                        <div className="title-apointment-time">
                            <i className="fas fa-calendar-alt icon-calendar"></i>
                            <FormattedMessage id="patient.detail-doctor.schedule" />
                        </div>
                        <div className="time-slots">
                            {allAvailableTime && allAvailableTime.length > 0 ? (
                                <>
                                    <div className="time-slots-btns">
                                        {allAvailableTime.map((i, index) => {
                                            let timeDisplay =
                                                language === LANGUAGES.VI
                                                    ? i.timeTypeData.valueVi
                                                    : i.timeTypeData.valueEn;
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() =>
                                                        this.handleClickScheduleTime(
                                                            i,
                                                        )
                                                    }
                                                >
                                                    {timeDisplay}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="guide">
                                        <FormattedMessage id="patient.detail-doctor.choose" />
                                        <i className="far fa-hand-point-up"></i>
                                        <FormattedMessage id="patient.detail-doctor.book-free" />
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleTimeModal}
                    doctorId={this.props.doctorId}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
