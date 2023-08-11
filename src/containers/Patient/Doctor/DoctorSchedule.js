import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import userService from "../../../services/userService";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
        };
    }
    async componentDidMount() {
        this.setArrDays();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays();
        }
    }
    setArrDays = () => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let date = moment().add(i, "days");
            let label =
                this.props.language === LANGUAGES.VI
                    ? date.format("dddd - DD/MM")
                    : date.locale("en").format("ddd - DD/MM");

            allDays.push({
                label: label,
                value: date.startOf("day").valueOf(),
            });
        }

        this.setState({
            allDays: allDays,
        });
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
    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;
        console.log("allAvailableTime", allAvailableTime);
        return (
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
                        Lịch khám
                    </div>
                    <div className="time-slots">
                        {allAvailableTime && allAvailableTime.length > 0 ? (
                            allAvailableTime.map((i, index) => {
                                let timeDisplay =
                                    language === LANGUAGES.VI
                                        ? i.timeTypeData.valueVi
                                        : i.timeTypeData.valueEn;
                                return (
                                    <button key={index}>{timeDisplay}</button>
                                );
                            })
                        ) : (
                            <div>
                                Khong co lich hen trong khoang thoi gian nay,
                                vui long chon lai!!
                            </div>
                        )}
                    </div>
                </div>
            </div>
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
