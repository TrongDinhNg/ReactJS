import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Speciality from "./Section/Speciality";

class HomePage extends Component {
    render() {
        return (
            <>
                <HomeHeader />
                <Speciality />
                <div style={{ height: "500px" }}></div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
