import React, { Component } from "react";
import { connect } from "react-redux";

class Handbook extends Component {
    render() {
        return (
            <div className="home-footer">
                <footer className="page-footer font-small cyan darken-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 py-5">
                                <div className="mb-5 flex-center">
                                    <a href="/" className="fb-ic">
                                        <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x">
                                            {" "}
                                        </i>
                                    </a>

                                    <a href="/" className="tw-ic">
                                        <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x">
                                            {" "}
                                        </i>
                                    </a>

                                    <a href="/" className="gplus-ic">
                                        <i className="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x">
                                            {" "}
                                        </i>
                                    </a>

                                    <a href="/" className="li-ic">
                                        <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x">
                                            {" "}
                                        </i>
                                    </a>

                                    <a href="/" className="ins-ic">
                                        <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x">
                                            {" "}
                                        </i>
                                    </a>

                                    <a href="/" className="pin-ic">
                                        <i className="fab fa-pinterest fa-lg white-text fa-2x">
                                            {" "}
                                        </i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-copyright text-center py-3">
                        © 2023 Copyright:
                        <a href="/"> Nguyễn Đình Trọng</a>
                    </div>
                </footer>
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
