import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import MDEditor from "@uiw/react-md-editor";
import MarkdownIt from "markdown-it";

import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils/constant";
import userService from "../../../services/userService";

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null,
            contentMarkdown: "",
            contentHTML: "",
            description: "",
            allDoctor: "",
            hasOldData: false, //kiểm tra detail bác sĩ đã có hay chưa
            action: "",
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
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
    onChangeDesc = (event) => {
        this.setState({ description: event.target.value });
    };

    render() {
        let allDoctor = this.state.allDoctor;
        let { hasOldData } = this.state;
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="mt-5">Tạo thêm thông tin Doctors</div>
                        <div className="more-infor">
                            <div className="content-left">
                                <label>Chọn bác sĩ</label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={allDoctor}
                                />
                            </div>
                            <div className="content-right">
                                <label>Thông tin giới thiệu</label>

                                <textarea
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={(event) =>
                                        this.onChangeDesc(event)
                                    }
                                    rows={4}
                                ></textarea>
                            </div>
                        </div>
                        <div>
                            <MDEditor
                                value={this.state.contentMarkdown}
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
                                    <span>Update Infor</span>
                                ) : (
                                    <span>Save Infor</span>
                                )}
                            </button>
                        </div>
                        <div className="custom-preview-md">
                            <h3>View Using Markdown Preview</h3>
                            <MDEditor
                                preview="preview"
                                hideToolbar
                                visibleDragbar={false}
                                value={this.state.contentMarkdown}
                                // enableScroll={false}
                                height={"400px"}
                            ></MDEditor>
                            <h3>View Using Render HTML</h3>

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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveInforDoctor: (data) => dispatch(actions.saveInforDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
