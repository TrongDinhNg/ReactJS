import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSchedule.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import DatePicker from "../../../components/Input/DatePicker";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null,
            allDoctor: "",
            currentDate: "",
            rangeScheduleTime: "",
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
            this.setState({
                rangeScheduleTime: this.props.allScheduleTime,
            });
        }
    }
    buildSelectDoctors = (data) => {
        let language = this.props.language;
        let result = [];
        let optionDoctors = {};
        if (data && data.length > 0) {
            result = data.map((i, index) => {
                let labelVi = `${i.lastName} ${i.firstName}`;
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
                                        <button key={index}>
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </button>
                                    );
                                })}
                        </div>
                        <div>
                            <button className="btn btn-primary">
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
