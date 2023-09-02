import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import userService from "../../../services/userService";
import HomeHeader from "../HomeHeader";
import "./ChooseHealthFacility.scss";

class ChooseHealthFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        };
    }
    async componentDidMount() {
        let res = await userService.getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data,
            });
        }
    }

    render() {
        let { dataClinic } = this.state;
        return (
            <>
                <HomeHeader isShowBaner={false} />
                <div className="choose-health-facilities container">
                    <div className="h-f-title">
                        <span>Cơ sở Y tế nổi bật</span>
                    </div>

                    <div className="container list-h-f">
                        <div className="row">
                            {dataClinic &&
                                dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className="col-lg-4" key={index}>
                                            <Link
                                                className="custom-link"
                                                to={`/detail-clinic/${item.id}`}
                                            >
                                                <div
                                                    className="img-customize h-f-logo"
                                                    style={{
                                                        backgroundImage: `url(${item.image})`,
                                                    }}
                                                >
                                                    <span className="name-hf">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChooseHealthFacility);
