import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}

    render() {
        return (
            <>
                <HomeHeader />
                <div>Hello</div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
});

export default connect(mapStateToProps)(DetailSpecialty);
