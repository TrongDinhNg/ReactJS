import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import userService from "../../../services/userService";

class MedicalFacility extends Component {
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
        console.log("dataClinic", dataClinic);
        return (
            <div className="section section-medicalFacility">
                <div className="section-container">
                    <div className="section-header">
                        <span>Cơ sở Y tế nổi bật</span>
                        <button className="see-more">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataClinic &&
                                dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <Link
                                            className="custom-link"
                                            to={`/detail-clinic/${item.id}`}
                                        >
                                            <div
                                                className="img-customize"
                                                key={index}
                                            >
                                                <div
                                                    className="section-logo medicalFacility-logo"
                                                    style={{
                                                        backgroundImage: `url(${item.image})`,
                                                    }}
                                                ></div>
                                                <span>{item.name}</span>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
