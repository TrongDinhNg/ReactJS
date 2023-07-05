import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";

class ModalDeleteUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    toggle = () => {
        this.props.toggleDelete();
    };

    componentDidMount() {}
    handleDeleteUser = () => {
        this.props.deleteUser(this.props.userDelete);
        this.toggle();
    };
    render() {
        // console.log("check child props: ", this.props);
        // console.log("check child userDelete: ", this.props.userDelete);
        return (
            <Modal
                isOpen={this.props.isOpenDelete}
                toggle={this.toggle}
                userDelete={this.props.userDelete}
            >
                <ModalHeader toggle={this.toggle}>Delete User</ModalHeader>
                <ModalBody>
                    You want to delete user : {this.props.userDelete.email}{" "}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleDeleteUser}>
                        Delete
                    </Button>{" "}
                    <Button color="secondary" onClick={this.toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteUser);
