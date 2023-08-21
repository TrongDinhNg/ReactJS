import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "../../../components/Input/DatePicker";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            arrPatient: "",
            isOpenConfirmModal: false,
            dataModal: {},
            isShowLoading: false,
        };
    }

    componentDidMount() {
        this.getDataPatient();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {}
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        console.log("formatedDate", formatedDate);

        let res = await userService.getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate,
        });
        console.log("res", res);
        if (res && res.errCode === 0) {
            this.setState({
                arrPatient: res.data,
            });
        }
    };
    handleDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatient();
            },
        );
    };
    handleBtnconfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        };
        this.setState({
            isOpenConfirmModal: true,
            dataModal: data,
        });
        console.log("this.state", this.state);
    };
    closeConfirmModal = () => {
        this.setState({
            isOpenConfirmModal: false,
            dataModal: {},
        });
    };
    sendConfirmedExamination = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true,
        });

        let res = await userService.postConfirmedExamination({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });
            toast.success("Gữi hoá đơn thành công");
            this.toggleConfirm();
            await this.getDataPatient();
        } else {
            toast.error("Gữi hoá đơn thất bại");
        }
    };
    toggleConfirm = () => {
        this.setState({
            isOpenConfirmModal: !this.state.isOpenConfirmModal,
        });
    };
    render() {
        let { arrPatient, isOpenConfirmModal, dataModal } = this.state;
        let { language } = this.props;
        console.log("arrPatient", arrPatient);
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text="Loading ..."
                >
                    <div className="manage-patient container">
                        <ConfirmModal
                            isOpenModal={isOpenConfirmModal}
                            dataModal={dataModal}
                            sendConfirmedExamination={
                                this.sendConfirmedExamination
                            }
                            toggleConfirm={this.toggleConfirm}
                        />
                        <div className="title">Manage Patient</div>
                        <div className="row">
                            <div className="col-3 form-group">
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    onChange={this.handleDatePicker}
                                    value={this.state.currentDate}
                                    className="form-control"
                                />
                            </div>
                            <div className="users-table mt-3 mx-1">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Thời gian</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Họ Tên</th>
                                            <th scope="col">Số điện thoại</th>
                                            <th scope="col">địa chỉ</th>
                                            <th scope="col">Giới tính</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {arrPatient && arrPatient.length > 0 ? (
                                            arrPatient.map((item, index) => {
                                                let time =
                                                    language === LANGUAGES.VI
                                                        ? item
                                                              .timeTypeDataPatient
                                                              .valueVi
                                                        : item
                                                              .timeTypeDataPatient
                                                              .valueEn;
                                                let gender =
                                                    language === LANGUAGES.VI
                                                        ? item.patientData
                                                              .genderData
                                                              .valueVi
                                                        : item.patientData
                                                              .genderData
                                                              .valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">
                                                            {index + 1}
                                                        </th>
                                                        <td>{time}</td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .email
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .firstName
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .phoneNumber
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .address
                                                            }
                                                        </td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary btn-success"
                                                                onClick={() =>
                                                                    this.handleBtnconfirm(
                                                                        item,
                                                                    )
                                                                }
                                                            >
                                                                Xác nhận
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary btn-info"
                                                            >
                                                                Gửi hóa đơn
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>Không có lịch khám</tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        user: state.user.userInfor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
