import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            value: "",
        };
    }

    componentDidMount() {
        this.props.fetchUserREdux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                arrUsers: this.props.users,
            });
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id);
    };
    handleEditUser = (user) => {
        this.props.editUserFromParent(user);
    };

    onChange = (value) => {
        this.setState({ value });
    };

    render() {
        let arrUsers = this.state.arrUsers;
        // console.log("Check Table Redux arrUsers: ", arrUsers);
        return (
            <>
                <div className="users-container">
                    <div className="title text-center"> User Manage</div>
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
        // editUser: (userId) => dispatch(actions.updateUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
