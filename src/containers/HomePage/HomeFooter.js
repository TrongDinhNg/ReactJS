import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";

class Handbook extends Component {
    render() {
        return (
            <div className="home-footer-container">
                <div className="container home-footer">
                    <div className="row">
                        <div className="col-md-12 py-5">
                            <button type="button" className="btn btn-primary">
                                <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                            </button>
                            <button type="button" className="btn btn-primary">
                                <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                            </button>
                            <button type="button" className="btn btn-primary">
                                <i className="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                            </button>
                            <button type="button" className="btn btn-primary">
                                <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                            </button>
                            <button type="button" className="btn btn-primary">
                                <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                            </button>
                            <button type="button" className="btn btn-primary">
                                <i className="fab fa-pinterest fa-lg white-text fa-2x"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="copyright ">
                    © 2023 Copyright:
                    <a href="/"> Nguyễn Đình Trọng</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
