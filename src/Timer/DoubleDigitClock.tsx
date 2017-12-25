

import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

export class DoubleDigitClock extends React.Component<any, any>{
    constructor(props) {
        super(props);

    }
    public render() {
        return <div className="Hm-clock" >
            <div className="Hu-double-animation" style={{ animationDuration: this.props.Duration + "s" }}></div>
            {this.props.IsShow ? this._imgPanel() : this._cssPanel()}
        </div>;

    }
    private _imgPanel(): React.ReactElement<any> {
        return <div className="Hu-double-panel"></div>;
    }
    private _cssPanel(): React.ReactElement<any> {
        return <div>
            <div className="Hu-circle Hu-position-left"></div>
            <div className="Hu-circle Hu-position-right"></div>
        </div>;
    }
}

