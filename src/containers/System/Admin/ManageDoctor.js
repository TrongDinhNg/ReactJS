import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import MDEditor from "@uiw/react-md-editor";
import MarkdownIt from "markdown-it";

import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils/constant";
import userService from "../../../services/userService";
import { FormattedMessage } from "react-intl";

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Malkdown
            selectedDoctor: null,
            contentMarkdown: "",
            contentHTML: "",
            description: "",
            allDoctor: "",
            hasOldData: false, //kiểm tra detail bác sĩ đã có hay chưa
            action: "",

            //doctor_infor
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],

            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",
            selectedSpecialty: "",
            selectedClinic: "",

            nameClinic: "",
            addressClinic: "",
            note: "",
            specialtyId: "",
            clinicId: "",
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getRequiredDoctorInfor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { allDoctor, language, allRequiredDoctorInfor } = this.props;
        const { allRequiredDoctorInfor: prevRequiredDoctorInfor } = prevProps;

        if (
            allDoctor !== prevProps.allDoctor ||
            language !== prevProps.language
        ) {
            const doctorSelect = this.buildDataInputSelect(allDoctor, "USERS");
            this.setState({
                allDoctor: doctorSelect,
            });
        }

        if (
            allRequiredDoctorInfor !== prevRequiredDoctorInfor ||
            language !== prevProps.language
        ) {
            const {
                resPrice,
                resPayment,
                resProvince,
                resSpecialty,
                resClinic,
            } = allRequiredDoctorInfor;

            const dataSelectPrice = this.buildDataInputSelect(
                resPrice,
                "PRICE",
            );
            const dataSelectPayment = this.buildDataInputSelect(
                resPayment,
                "PAYMENT",
            );
            const dataSelectProvince = this.buildDataInputSelect(
                resProvince,
                "PROVINCE",
            );
            const dataSelectSpecialty = this.buildDataInputSelect(
                resSpecialty,
                "SPECIALTY",
            );
            let dataSelectedClinic = this.buildDataInputSelect(
                resClinic,
                "CLINIC",
            );

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectedClinic,
            });
        }
    }

    buildDataInputSelect = (inputData, type) => {
        const { language } = this.props;
        if (inputData && inputData.length > 0) {
            return inputData.map((item) => {
                const object = {
                    label:
                        language === LANGUAGES.VI ? item.valueVi : item.valueEn,
                    value: type === "USERS" ? item.id : item.keyMap,
                };

                if (type === "USERS") {
                    const [firstName, lastName] = [
                        item.firstName,
                        item.lastName,
                    ];
                    object.label =
                        language === LANGUAGES.VI
                            ? `${lastName} ${firstName}`
                            : `${firstName} ${lastName}`;
                }

                if (type === "PRICE") {
                    object.label =
                        language === LANGUAGES.VI
                            ? item.valueVi
                            : `${item.valueEn} USD`;
                }
                if (type === "SPECIALTY") {
                    object.label = item.name;
                    object.value = item.id;
                }
                if (type === "CLINIC") {
                    object.label = item.name;
                    object.value = item.id;
                }

                return object;
            });
        }
    };

    onChange = (contentMarkdown) => {
        this.setState({ contentMarkdown });
        // Chuyển đổi Markdown thành HTML khi nội dung thay đổi
        const md = new MarkdownIt();
        const contentHTML = md.render(contentMarkdown);
        this.setState({ contentHTML });
    };
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveInforDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action:
                hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId:
                this.state.selectedClinic && this.state.selectedClinic.value
                    ? this.state.selectedClinic.value
                    : 0,
        });
    };

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        const {
            listPrice,
            listProvince,
            listPayment,
            listSpecialty,
            listClinic,
        } = this.state;
        let res = await userService.getDetailDoctorService(
            selectedDoctor.value,
        );
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markDown = res.data.Markdown;
            let nameClinic = "",
                addressClinic = "",
                note = "",
                paymentId = "",
                priceId = "",
                provinceId = "",
                specialtyId = "",
                clinicId = "",
                selectedClinic = "",
                selectedPayment = "",
                selectedPrice = "",
                selectedProvince = "",
                selectedSpecialty = "";

            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;

                selectedPayment = listPayment.find(
                    (item) => item.value === paymentId,
                );
                selectedPrice = listPrice.find(
                    (item) => item.value === priceId,
                );
                selectedProvince = listProvince.find(
                    (item) => item.value === provinceId,
                );
                selectedSpecialty = listSpecialty.find(
                    (item) => item.value === specialtyId,
                );
                selectedClinic = listClinic.find((item) => {
                    return item && item.value === clinicId;
                });
            }

            this.setState({
                contentHTML: markDown.contentHTML,
                contentMarkdown: markDown.contentMarkdown,
                description: markDown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
            });
        } else {
            this.setState({
                contentMarkdown: "",
                contentHTML: "",
                description: "",
                hasOldData: false,
                addressClinic: "",
                nameClinic: "",
                note: "",
                selectedPayment: "",
                selectedPrice: "",
                selectedProvince: "",
                selectedSpecialty: "",
            });
        }
    };
    handleChangeSelectDoctorInfor = (selectedOption, name) => {
        let setName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[setName] = selectedOption;
        this.setState({
            ...stateCopy,
        });
    };
    handleOnchangeText = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    render() {
        const {
            selectedDoctor,
            description,
            allDoctor,
            contentMarkdown,
            hasOldData,
            listPrice,
            listPayment,
            listProvince,
            listSpecialty,
            listClinic,
            selectedPrice,
            selectedPayment,
            selectedProvince,
            selectedSpecialty,
            selectedClinic,
            nameClinic,
            addressClinic,
            note,
        } = this.state;
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="mt-5 title">
                            <FormattedMessage id="admin.manage-doctor.title" />
                        </div>
                        <div className="more-infor">
                            <div className="content-left col-4">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.choose-doctor" />
                                </label>
                                <Select
                                    value={selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={allDoctor}
                                    placeholder={
                                        <FormattedMessage id="admin.manage-doctor.choose-doctor" />
                                    }
                                />
                            </div>
                            <div className="content-right col-8">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.referral-details" />
                                </label>

                                <textarea
                                    className="form-control"
                                    value={description}
                                    onChange={(event) =>
                                        this.handleOnchangeText(event)
                                    }
                                    name="description"
                                ></textarea>
                            </div>
                        </div>
                        <div className="more-infor-doctor row mb-3">
                            <div className="col-4">
                                <label className="form-label">
                                    <FormattedMessage id="admin.manage-doctor.price" />
                                </label>
                                <Select
                                    value={selectedPrice}
                                    onChange={
                                        this.handleChangeSelectDoctorInfor
                                    }
                                    options={listPrice}
                                    placeholder={
                                        <FormattedMessage id="admin.manage-doctor.price" />
                                    }
                                    name="selectedPrice"
                                />
                            </div>
                            <div className="col-4">
                                <label className="form-label">
                                    <FormattedMessage id="admin.manage-doctor.payment" />
                                </label>
                                <Select
                                    value={selectedPayment}
                                    onChange={
                                        this.handleChangeSelectDoctorInfor
                                    }
                                    options={listPayment}
                                    placeholder={
                                        <FormattedMessage id="admin.manage-doctor.payment" />
                                    }
                                    name="selectedPayment"
                                />
                            </div>
                            <div className="col-4">
                                <label className="form-label">
                                    {" "}
                                    <FormattedMessage id="admin.manage-doctor.province" />
                                </label>
                                <Select
                                    value={selectedProvince}
                                    onChange={
                                        this.handleChangeSelectDoctorInfor
                                    }
                                    options={listProvince}
                                    placeholder={
                                        <FormattedMessage id="admin.manage-doctor.province" />
                                    }
                                    name="selectedProvince"
                                />
                            </div>
                            <div className="col-4">
                                <label className="form-label">
                                    <FormattedMessage id="admin.manage-doctor.clinic" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleOnchangeText}
                                    name="nameClinic"
                                    value={nameClinic}
                                />
                            </div>
                            <div className="col-4">
                                <label className="form-label">
                                    <FormattedMessage id="admin.manage-doctor.clinic-address" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleOnchangeText}
                                    name="addressClinic"
                                    value={addressClinic}
                                />
                            </div>
                            <div className="col-4">
                                <label className="form-label">
                                    <FormattedMessage id="admin.manage-doctor.note" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleOnchangeText}
                                    name="note"
                                    value={note}
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">
                                    <FormattedMessage id="admin.manage-doctor.specialty" />
                                </label>
                                <Select
                                    value={selectedSpecialty}
                                    onChange={
                                        this.handleChangeSelectDoctorInfor
                                    }
                                    options={listSpecialty}
                                    placeholder={
                                        <FormattedMessage id="admin.manage-doctor.specialty" />
                                    }
                                    name="selectedSpecialty"
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">
                                    <FormattedMessage id="admin.manage-doctor.select-clinic" />
                                </label>
                                <Select
                                    value={selectedClinic}
                                    onChange={
                                        this.handleChangeSelectDoctorInfor
                                    }
                                    options={listClinic}
                                    placeholder={
                                        <FormattedMessage id="admin.manage-doctor.select-clinic" />
                                    }
                                    name="selectedClinic"
                                />
                            </div>
                        </div>

                        <div>
                            <MDEditor
                                value={contentMarkdown}
                                onChange={this.onChange}
                            />
                        </div>
                        <div>
                            <button
                                className={
                                    hasOldData === true
                                        ? "update-content-doctor btn btn-warning mt-3"
                                        : "save-content-doctor btn btn-info mt-3"
                                }
                                onClick={() => this.handleSaveContentMarkdown()}
                            >
                                {hasOldData === true ? (
                                    <span>
                                        <FormattedMessage id="admin.manage-doctor.update" />
                                    </span>
                                ) : (
                                    <span>
                                        <FormattedMessage id="admin.manage-doctor.save" />
                                    </span>
                                )}
                            </button>
                        </div>
                        <div className="custom-preview-md">
                            <h3 className="title">
                                View Using Markdown Preview
                            </h3>
                            <MDEditor
                                preview="preview"
                                hideToolbar
                                visibleDragbar={false}
                                value={contentMarkdown}
                                // enableScroll={false}
                                height={"400px"}
                            ></MDEditor>
                            <h3 className="title">View Using Render HTML</h3>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: this.state.contentHTML,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        getRequiredDoctorInfor: () =>
            dispatch(actions.getRequiredDoctorInfor()),
        saveInforDoctor: (data) => dispatch(actions.saveInforDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
