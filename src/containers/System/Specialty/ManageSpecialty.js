import React, { Component } from "react";
import { connect } from "react-redux";
import MDEditor from "@uiw/react-md-editor";
import MarkdownIt from "markdown-it";
import CommonUtils from "../../../utils/CommonUtils";
import userService from "../../../services/userService";
import { toast } from "react-toastify";

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: "",
            contentHTML: "",
            name: "",
            imageBase64: "",
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
    handleOnchangeInput = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };
    HandleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleSaveNewSpecialty = async () => {
        let res = await userService.createNewSpecialtyService(this.state);
        if (res && res.errCode === 0) {
            toast.success("Add new specialty succeed!");
            this.setState({
                name: "",
                imageBase64: "",
                contentMarkdown: "",
                contentHTML: "",
            });
        } else {
            toast.error("Something wrongs...");
            console.log(res);
        }
    };

    render() {
        let { contentMarkdown, name } = this.state;
        return (
            <>
                <div className="title">Manage-Specialty</div>;
                <div className="manage-specialty-container container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>Tên chuyên khoa</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.handleOnchangeInput}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Ảnh chuyên khoa</label>
                            <input
                                className="form-control"
                                type="file"
                                onChange={this.HandleOnchangeImg}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <MDEditor
                            value={contentMarkdown}
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <button
                            className="btn-save-specialty"
                            onClick={() => this.handleSaveNewSpecialty()}
                        >
                            Save
                        </button>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
