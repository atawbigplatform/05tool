

import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

export const SingleDigitClock:React.SFC < { Duration?: number } > = ({Duration}) => {
        return <div className="Hm-clock" >
            <div className="Hu-single-animation" style={{ animationDuration: Duration + "s" }}></div>
            <div className="Hu-single-panel"></div>
        </div>;

}


