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

            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",

            nameClinic: "",
            addressClinic: "",
            note: "",
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
            const { resPrice, resPayment, resProvince } =
                allRequiredDoctorInfor;

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

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
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
        });
    };

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let md = await userService.getMarkdownByDoctorIdService(
            selectedDoctor.value,
        );
        if (md && md.errCode === 0) {
            this.setState({
                contentMarkdown: md.data.contentMarkdown,
                contentHTML: md.data.contentHTML,
                description: md.data.description,
                hasOldData: true,
            });
        } else {
            this.setState({
                contentMarkdown: "",
                contentHTML: "",
                description: "",
                hasOldData: false,
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
            selectedPrice,
            selectedPayment,
            selectedProvince,
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
                                        this.onChangeDesc(event)
                                    }
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
