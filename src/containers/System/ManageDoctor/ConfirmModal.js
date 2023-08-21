import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { CommonUtils } from "../../../utils";

class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imgBase64: "",
        };
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }
    toggle = () => {
        this.props.toggleConfirm();
    };
    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        });
    };
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64,
            });
        }
    };
    sendConfirmedExamination = () => {
        this.props.sendConfirmedExamination(this.state);
    };

    render() {
        let { isOpenModal } = this.props;
        console.log("this.props", this.props);
        console.log("this.state", this.state);
        return (
            <Modal isOpen={isOpenModal} size="md" centered toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>
                    Confirmed Examination
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>Email bệnh nhân</label>
                            <input
                                className="form-control"
                                type="email"
                                value={this.state.email}
                                onChange={(event) =>
                                    this.handleOnchangeEmail(event)
                                }
                            ></input>
                        </div>

                        <div className="col-6 form-group">
                            <label>Chọn file đơn thuốc</label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(event) =>
                                    this.handleOnchangeImage(event)
                                }
                            ></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => this.sendConfirmedExamination()}
                    >
                        Send
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
