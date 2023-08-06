import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSchedule.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils/constant";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _ from "lodash";
import moment from "moment";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null,
            allDoctor: "",
            currentDate: "",
            rangeScheduleTime: "",
            isSelectedTime: "",
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllcodeScheduleTime();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let doctorSelect = this.buildSelectDoctors(this.props.allDoctor);
            this.setState({
                allDoctor: doctorSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let doctorSelect = this.buildSelectDoctors(this.props.allDoctor);
            this.setState({
                allDoctor: doctorSelect,
            });
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let rangeScheduleTime = this.props.allScheduleTime;
            if (rangeScheduleTime && rangeScheduleTime.length > 0) {
                rangeScheduleTime = rangeScheduleTime.map((item) => ({
                    ...item,
                    isSelectedTime: false,
                }));
            }
            this.setState({
                rangeScheduleTime: rangeScheduleTime,
            });
        }
    }
    buildSelectDoctors = (data) => {
        let language = this.props.language;
        let result = [];
        let optionDoctors = {};
        if (data && data.length > 0) {
            result = data.map((i, index) => {
                let labelVi = `${i.lastName} ${i.selectedTimeName}`;
                let labelEn = `${i.firstName} ${i.lastName}`;
                optionDoctors = {
                    label: language === LANGUAGES.VI ? labelVi : labelEn,
                    value: i.id,
                };
                return optionDoctors;
            });
        }
        return result;
    };
    handleChangeSelect = (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };
    handleDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };
    handlePickTime = (item) => {
        item.isSelectedTime = !item.isSelectedTime;
        this.setState({
            isSelectedTime: item.isSelectedTime,
        });
    };
    handleSaveSchedule = () => {
        let { rangeScheduleTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Please pick a day.");
            return;
        }
        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Please pick a doctor.");
            return;
        }
        let fomatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        if (rangeScheduleTime && rangeScheduleTime.length > 0) {
            let selectedTime = rangeScheduleTime.filter(
                (item) => item.isSelectedTime === true,
            );
            if (selectedTime && selectedTime.length > 0 && selectedTime) {
                let object = {};
                result = selectedTime.map((item) => {
                    object = {
                        doctorId: selectedDoctor.value,
                        date: fomatedDate,
                        time: item.keyMap,
                    };
                    return object;
                });
            } else {
                toast.error("Please pick times.");
                return;
            }
        }
        return result;
    };
    render() {
        let { rangeScheduleTime } = this.state;
        let language = this.props.language;

        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.allDoctor}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker
                                onChange={this.handleDatePicker}
                                value={this.state.currentDate}
                                minDate={new Date()}
                                className="form-control"
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeScheduleTime &&
                                rangeScheduleTime.length > 0 &&
                                rangeScheduleTime.map((item, index) => {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                this.handlePickTime(item)
                                            }
                                            className={
                                                item.isSelectedTime === true
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </button>
                                    );
                                })}
                        </div>
                        <div>
                            <button
                                className="btn btn-primary"
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
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
        allDoctor: state.admin.allDoctor,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllcodeScheduleTime: () =>
            dispatch(actions.fetchAllcodeScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
