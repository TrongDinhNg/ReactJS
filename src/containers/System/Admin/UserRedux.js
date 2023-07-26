import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrGender: [],
            arrRole: [],
            arrPosition: [],
            previewImgUrl: "",
            isOpen: false,
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            position: "",
            address: "",
            gender: "",
            role: "",
            avatar: "",
            action: "",
            userEditId: "",
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let genderArr = this.props.genderRedux;
            this.setState({
                arrGender: genderArr,
                gender: genderArr && genderArr !== 0 ? genderArr[0].key : "",
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let positionArr = this.props.positionRedux;
            this.setState({
                arrPosition: positionArr,
                position:
                    positionArr && positionArr !== 0 ? positionArr[0].key : "",
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let roleArr = this.props.roleRedux;
            this.setState({
                arrRole: roleArr,
                role: roleArr && roleArr !== 0 ? roleArr[0].key : "",
            });
        }
        if (prevProps.users !== this.props.users) {
            // let genderArr = this.props.genderRedux;
            // let positionArr = this.props.positionRedux;
            // let roleArr = this.props.roleRedux;
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                // gender: genderArr && genderArr !== 0 ? genderArr[0].key : "",
                // position:
                //     positionArr && positionArr !== 0 ? positionArr[0].key : "",
                // role: roleArr && roleArr !== 0 ? roleArr[0].key : "",
                avatar: "",
                action: CRUD_ACTIONS.CREATE,
            });
        }
    }
    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language);
    };
    HandleOnchangeImg = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: file,
            });
        }
    };

    handlerSaveUser = () => {
        let isvalid = this.checkValidateInput();
        let { action } = this.state;
        if (!isvalid) {
            return;
        }
        // fire redux action
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
            });
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUser({
                id: this.state.userEditId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
            });
        }
    };
    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    checkValidateInput = () => {
        let isValid = true;
        let array = [
            "email",
            "password",
            "firstName",
            "lastName",
            "phoneNumber",
            "address",
        ];
        let len = array.length;
        for (let i = 0; i < len; i++) {
            if (!this.state[array[i]]) {
                isValid = false;
                alert("Missing " + array[i] + " input");
                break;
            }
        }
        return isValid;
    };
    editUserFromParent = (user) => {
        this.setState({
            email: user.email,
            password: "password",
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            roleId: user.roleId,
            position: user.positionId,
            userEditId: user.id,
            action: CRUD_ACTIONS.EDIT,
        });
    };

    render() {
        let genders = this.state.arrGender;
        let roles = this.state.arrRole;
        let postions = this.state.arrPosition;
        const language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let previewImg = this.state.previewImgUrl;
        let {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            role,
            position,
            gender,
        } = this.state;
        let action = this.state.action;
        return (
            <div className="user-redux-container">
                <div className="title">Learn React-Redux</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row col-6">
                            <div className="col-12 mt-3">
                                <h2>
                                    <FormattedMessage id="manage-user.add" />
                                </h2>
                                <h3>
                                    {isLoadingGender === true
                                        ? "Loading Gender"
                                        : ""}
                                </h3>
                            </div>
                            {/* action="/post-crud" method="POST" */}
                            <form>
                                <div className="row mt-3">
                                    <div className="form-group col-md-6">
                                        <label>
                                            <FormattedMessage id="manage-user.email" />
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            name="email"
                                            autoComplete="username"
                                            value={email}
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "email",
                                                )
                                            }
                                            disabled={
                                                this.state.action ===
                                                CRUD_ACTIONS.EDIT
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>
                                            <FormattedMessage id="manage-user.password" />
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "password",
                                                )
                                            }
                                            disabled={
                                                this.state.action ===
                                                CRUD_ACTIONS.EDIT
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="form-group col-md-6">
                                        <label>
                                            <FormattedMessage id="manage-user.first-name" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Son"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "firstName",
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>
                                            <FormattedMessage id="manage-user.last-name" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="XiaoLin"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "lastName",
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="form-group col-md-12">
                                        <label>
                                            <FormattedMessage id="manage-user.address" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            placeholder="HCM"
                                            value={address}
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "address",
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="form-group col-md-6">
                                        <label>
                                            <FormattedMessage id="manage-user.position" />
                                        </label>
                                        <select
                                            name="position"
                                            className="form-select"
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "position",
                                                )
                                            }
                                            value={position}
                                        >
                                            {postions &&
                                                postions.length > 0 &&
                                                postions.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.key}
                                                        >
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? item.valueVi
                                                                : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>
                                            <FormattedMessage id="manage-user.image" />
                                        </label>
                                        <div className="preview-img-container">
                                            <input
                                                id="previewImg"
                                                type="file"
                                                className="form-control"
                                                name="image"
                                                hidden
                                                onChange={(event) => {
                                                    this.HandleOnchangeImg(
                                                        event,
                                                        "avatar",
                                                    );
                                                }}
                                            />
                                            <label
                                                className="label-upload"
                                                htmlFor="previewImg"
                                            >
                                                Tải ảnh
                                                <i className="fas fa-upload"></i>
                                            </label>
                                            <div
                                                className="preview-img"
                                                style={{
                                                    backgroundImage: `url(${previewImg})`,
                                                }}
                                                onClick={() => {
                                                    if (
                                                        !this.state
                                                            .previewImgUrl
                                                    )
                                                        return;
                                                    this.setState({
                                                        isOpen: true,
                                                    });
                                                }}
                                            >
                                                {this.state.isOpen && (
                                                    <Lightbox
                                                        mainSrc={previewImg}
                                                        onCloseRequest={() =>
                                                            this.setState({
                                                                isOpen: false,
                                                            })
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="form-group col-md-6">
                                        <label>
                                            <FormattedMessage id="manage-user.phone-number" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phoneNumber"
                                            value={phoneNumber}
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "phoneNumber",
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label>
                                            <FormattedMessage id="manage-user.gender" />
                                        </label>
                                        <select
                                            name="gender"
                                            className="form-select"
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "gender",
                                                )
                                            }
                                            value={gender}
                                        >
                                            {genders &&
                                                genders.length > 0 &&
                                                genders.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.key}
                                                        >
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? item.valueVi
                                                                : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label>
                                            <FormattedMessage id="manage-user.role" />
                                        </label>
                                        <select
                                            name="role"
                                            className="form-select"
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "role",
                                                )
                                            }
                                            value={role}
                                        >
                                            {roles &&
                                                roles.length > 0 &&
                                                roles.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.key}
                                                        >
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? item.valueVi
                                                                : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className={
                                        action === CRUD_ACTIONS.EDIT
                                            ? "btn btn-warning mt-3"
                                            : "btn btn-primary mt-3"
                                    }
                                    onClick={() => {
                                        this.handlerSaveUser();
                                    }}
                                >
                                    {action === CRUD_ACTIONS.EDIT ? (
                                        <FormattedMessage id="manage-user.edit" />
                                    ) : (
                                        <FormattedMessage id="manage-user.save" />
                                    )}
                                </button>
                            </form>
                        </div>

                        <div className="row col-12">
                            <TableManageUser
                                editUserFromParent={this.editUserFromParent}
                                action={this.state.action}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUser: (data) => dispatch(actions.updateUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) =>
        //     dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
