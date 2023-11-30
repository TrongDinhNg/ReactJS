import React, { Component } from "react";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    Label,
} from "reactstrap";

class ModalNewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            roleId: "",
        };
        this.listenEmitter();

        // this.toggle = this.toggle.bind(this);
    }
    listenEmitter = () => {
        emitter.on("EVEN_CLEAR_MODAL_DATA", () => {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                gender: "",
                roleId: "",
            });
        });
    };
    toggle = () => {
        this.props.toggle();
    };

    componentDidMount() {}

    handleOnchangeInput = (even, id) => {
        //Bad Code
        // this.state[id] = even.target.value;
        // this.setState(
        //     {
        //         ...this.state,
        //     },
        //     () => {
        //         console.log("Check bad state: ", this.state);
        //     },
        // );

        //Good Code
        let copyState = { ...this.state };
        copyState[id] = even.target.value;
        this.setState(
            {
                ...copyState,
            },
            () => {
                // console.log("Check good state: ", this.state);
            },
        );
        // console.log("even 1: ", even.target.value, id);
    };
    isValidInputNewUser = () => {
        let isValid = true;
        let array = [
            "email",
            "password",
            "firstName",
            "lastName",
            "address",
            "phoneNumber",
            "gender",
            "roleId",
        ];
        let length = array.length;
        for (let i = 0; i < length; i++) {
            if (!this.state[array[i]]) {
                isValid = false;
                alert("Missing : " + array[i]);
                break;
            }
        }
        return isValid;
    };
    handleAddNewUser = () => {
        let isValid = this.isValidInputNewUser();
        if (isValid) {
            //call API create modal
            this.props.createNewUser(this.state);
            // console.log("data: ", this.state);
        }
    };

    render() {
        // console.log("check child props: ", this.props);
        // console.log("check child open modal: ", this.props.isOpen);
        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={this.toggle}
                    className={"modal-new-user"}
                    size="lg"
                >
                    <ModalHeader toggle={this.toggle}>
                        ==Create new user==
                    </ModalHeader>
                    <ModalBody>
                        <Form mt={3}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup mt={2}>
                                        <Label for="exampleEmail">Email</Label>
                                        <Input
                                            name="email"
                                            placeholder="email"
                                            type="email"
                                            onChange={(even) =>
                                                this.handleOnchangeInput(
                                                    even,
                                                    "email",
                                                )
                                            }
                                            value={this.state.email}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup mt={2}>
                                        <Label for="examplePassword">
                                            Password
                                        </Label>
                                        <Input
                                            name="password"
                                            placeholder="password "
                                            type="password"
                                            onChange={(even) =>
                                                this.handleOnchangeInput(
                                                    even,
                                                    "password",
                                                )
                                            }
                                            value={this.state.password}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6} mt={2}>
                                    <FormGroup mt={2}>
                                        <Label for="exampleEmail">
                                            FirstName
                                        </Label>
                                        <Input
                                            name="firstName"
                                            placeholder="Son"
                                            type="text"
                                            onChange={(even) =>
                                                this.handleOnchangeInput(
                                                    even,
                                                    "firstName",
                                                )
                                            }
                                            value={this.state.firstName}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="examplePassword">
                                            LastName
                                        </Label>
                                        <Input
                                            name="lastName"
                                            placeholder="XiaoLin"
                                            type="text"
                                            onChange={(even) =>
                                                this.handleOnchangeInput(
                                                    even,
                                                    "lastName",
                                                )
                                            }
                                            value={this.state.lastName}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="exampleAddress">Address</Label>

                                <Input
                                    name="address"
                                    placeholder="Ha Noi"
                                    onChange={(even) =>
                                        this.handleOnchangeInput(
                                            even,
                                            "address",
                                        )
                                    }
                                    value={this.state.address}
                                />
                            </FormGroup>

                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="phoneNumber">
                                            PhoneNumber
                                        </Label>
                                        <Input
                                            name="phoneNumber"
                                            onChange={(even) =>
                                                this.handleOnchangeInput(
                                                    even,
                                                    "phoneNumber",
                                                )
                                            }
                                            value={this.state.phoneNumber}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="exampleState">Sex</Label>
                                        <Input
                                            name="gender"
                                            type="select"
                                            onChange={(even) =>
                                                this.handleOnchangeInput(
                                                    even,
                                                    "gender",
                                                )
                                            }
                                            value={this.state.gender}
                                        >
                                            <option selected>Choose...</option>
                                            <option value={1}>Male</option>
                                            <option value={0}>Female</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="exampleZip">Role</Label>

                                        <Input
                                            name="roleId"
                                            type="select"
                                            onChange={(even) =>
                                                this.handleOnchangeInput(
                                                    even,
                                                    "roleId",
                                                )
                                            }
                                            value={this.state.roleId}
                                        >
                                            <option selected>Choose...</option>
                                            <option value={1}>Admin</option>
                                            <option value={2}>Doctor</option>
                                            <option value={3}>Patient</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleAddNewUser}>
                            Add New
                        </Button>{" "}
                        <Button color="secondary" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalNewUser);
