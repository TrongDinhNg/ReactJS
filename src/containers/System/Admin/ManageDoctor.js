import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import MDEditor from "@uiw/react-md-editor";
import MarkdownIt from "markdown-it";

import Select from "react-select";

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null,
            contentMarkdown: "",
            contentHTML: "",
            description: "",
        };
    }

    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {}

    onChange = (contentMarkdown) => {
        this.setState({ contentMarkdown });
        // Chuyển đổi Markdown thành HTML khi nội dung thay đổi
        const md = new MarkdownIt();
        const contentHTML = md.render(contentMarkdown);
        this.setState({ contentHTML });
    };
    handleSaveContentMarkdown = () => {
        console.log("this.state: ", this.state);
    };
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor),
        );
    };
    onChangeDesc = (event) => {
        this.setState({ description: event.target.value });
    };
    render() {
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
                                    onChange={this.handleChange}
                                    options={options}
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
                                className=""
                                onClick={() => this.handleSaveContentMarkdown()}
                            >
                                Lưu thông tin
                            </button>
                        </div>
                        <div className="custom-preview-md">
                            <MDEditor
                                preview="preview"
                                hideToolbar
                                visibleDragbar={false}
                                onDragOver={true}
                                value={this.state.contentMarkdown}
                                // enableScroll={false}
                                height={"400px"}
                            ></MDEditor>
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
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserREdux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (userId) => dispatch(actions.deleteUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
