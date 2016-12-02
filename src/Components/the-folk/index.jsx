import React, { Component } from "react";
import classnames from "classnames";

import "./styles/utils.css";
import "./styles/chamber.css";
import "./styles/head.css";
import "./styles/upperbody.css";
import "./styles/lowerbody.css";
import sweat from "./styles/sweat.svg";

class TheFolk extends Component {

    render() {
         return (
            <div className="chamber-wrapper">
                <div className="background">

                    <div className="horizontal-shift" />
                    <div className="verticle-shift" />

                    <span className={classnames("head", this.props.mistakes > 0 ? "shown" : "hidden")} >
                        <div className="eyes-and-ears">
                            <div className="ear ear-left in-bl">
                                <div className="inner" />
                            </div>
                            <div className="eye eye-left" />
                            <div className="eye eye-right" />

                            <div className="ear ear-right">
                                <div className="inner" />
                                <div className="earing" />
                            </div>
                        </div>

                        <div className="face">
                            <div className="hairWrapper">
                                <div className="hair">
                                    <div className="left" />
                                    <img className="sweat" alt="It's hot in here" src={sweat} />
                                    <div className="right" />
                                </div>
                            </div>

                            <div className="nose-and-below">
                                <div className="beard-border left-beard">
                                </div>
                                <div className="nose" />
                                <div className="beard-border right-beard">
                                </div>
                                <div className="mouth-and-mole">
                                    <div className="mole" />
                                    <div className="mouth" />
                                </div>
                                <div className="beard-rest" />
                            </div>
                        </div>
                    </span>

                    <span className={classnames("neck", this.props.mistakes > 1 ? "shown" : "hidden")}>
                        <div className="neck-itself" />
                    </span>

                    <span className="torso-and-arms">
                        <div className={classnames("hand", "left-hand", this.props.mistakes > 6 ? "shown" : "hidden")} />
                        <div className={classnames("arm", "left-arm", this.props.mistakes > 4 ? "shown" : "hidden")} />
                        <span id="torso-score-group" className={this.props.mistakes > 2 ? "shown" : "hidden"}>
                            <div className="torso left-torst" />
                            <div className="torso right-torst" />
                        </span>
                        <div className={classnames("arm", "right-arm", this.props.mistakes > 3 ? "shown" : "hidden")} />
                        <div className={classnames("hand", "right-hand", this.props.mistakes > 5 ? "shown" : "hidden")} />
                    </span>
                    <span className="hip-and-lower-body">
                        <div id="hip" className={this.props.mistakes > 2 ? "shown" : "hidden"} />
                        <div className="legs">
                            <div className={classnames("foot", this.props.mistakes > 10 ? "shown" : "hidden")} />
                            <div className={classnames("leg", "left-leg", this.props.mistakes > 8 ? "shown" : "hidden")} />
                            <div className={classnames("leg", "right-leg", this.props.mistakes > 7 ? "shown" : "hidden")} />
                            <div className={classnames("foot", this.props.mistakes > 9 ? "shown" : "hidden")} />
                        </div>
                    </span>
                </div>
            </div>);
    }
}

export default TheFolk