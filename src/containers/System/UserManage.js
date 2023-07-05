import React, { Component } from "react";
import { connect } from "react-redux";
import userService from "../../services/userService";
import "./UserManage.scss";
import ModalNewUser from "./ModalNewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            modal: false,
            modalDelete: false,
            modalEdit: false,
            userDelete: {},
            userEdit: {},
        };
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }
    getAllUsersFromReact = async () => {
        let response = await userService.getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.user,
            });
        }
    };
    handleNewUser = () => {
        this.setState({
            modal: true,
        });
    };
    handleDeleteUser = (data) => {
        this.setState({
            modalDelete: true,
            userDelete: data,
        });
    };
    handleEditUser = (data) => {
        this.setState({
            modalEdit: true,
            userEdit: data,
        });
    };
    toggleParent = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };
    toggleDelete = () => {
        this.setState({
            modalDelete: !this.state.modalDelete,
        });
    };
    toggleEdit = () => {
        this.setState({
            modalEdit: !this.state.modalEdit,
        });
    };
    createNewUser = async (data) => {
        try {
            let response = await userService.createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.message);
            } else {
                this.getAllUsersFromReact();
                this.setState({
                    modal: false,
                });
                emitter.emit("EVEN_CLEAR_MODAL_DATA");
            }
        } catch (error) {
            console.log(error);
        }
    };
    deleteUser = async (data) => {
        //console.log("data for Delete: ", data);
        //window.confirm(`You want to delete user: ${data.email} `)

        try {
            let res = await userService.deleteUserService(data.id);
            if (res && res.errCode === 0) {
                this.getAllUsersFromReact();
            } else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };
    editUser = async (data) => {
        try {
            let res = await userService.editUserService(data);
            // console.log("res about edit", res);
            if (res && res.errCode === 0) {
                this.getAllUsersFromReact();
            } else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };
    /**
     * Lifecycle
     * Run Component
     * 1_ run contructor => init state
     * 2_Did Mount(set state)
     * 2_render
     *
     */
    render() {
        // console.log("check Render", this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalNewUser
                    toggle={this.toggleParent}
                    isOpen={this.state.modal}
                    createNewUser={this.createNewUser}
                />
                <ModalDeleteUser
                    toggleDelete={this.toggleDelete}
                    isOpenDelete={this.state.modalDelete}
                    userDelete={this.state.userDelete}
                    deleteUser={this.deleteUser}
                />
                {this.state.modalEdit && (
                    <ModalEditUser
                        toggleEdit={this.toggleEdit}
                        isOpenEdit={this.state.modalEdit}
                        userEdit={this.state.userEdit}
                        editUser={this.editUser}
                    />
                )}

                <div className="title text-center"> User Manage</div>
                <div>
                    <div>
                        <button
                            className="btn-primary mx-2"
                            onClick={this.handleNewUser}
                        >
                            <i className="fas fa-plus-square mx-1"></i>
                            Add new user
                        </button>
                    </div>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">FirstName</th>
                                <th scope="col">LastName</th>
                                <th scope="col">Address</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-edit btn-primary"
                                                    onClick={() => {
                                                        this.handleEditUser(
                                                            item,
                                                        );
                                                    }}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-delete btn-primary"
                                                    onClick={() =>
                                                        this.handleDeleteUser(
                                                            item,
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
