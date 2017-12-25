


import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

export const CssTimer: React.SFC<{ IsAuto?: boolean, IsStart?: boolean, IsStop?: boolean, IsReset?: boolean }> = ({IsAuto, IsStart, IsStop, IsReset}) => {
        return <div className="container">
            <div className="Hc-timer">
                <div className="Hm-cell">
                    <div className={"Hu-numbers Hu-tenhour Hu-moveten" +
                        (IsAuto ? " " : " Hu-playstate") +
                        (IsStart ? " Hu-start" : "") +
                        (IsStop ? " Hu-stop" : "") +
                        (IsReset ? " Hu-reset" : "")}>0 1 2 3 4 5 6 7 8 9</div>
                </div>
                <div className="Hm-cell">
                    <div className={"Hu-numbers Hu-hour Hu-moveten" +
                        (IsAuto ? " " : " Hu-playstate") +
                        (IsStart ? " Hu-start" : "") +
                        (IsStop ? " Hu-stop" : "") +
                        (IsReset ? " Hu-reset" : "")
                    }>0 1 2 3 4 5 6 7 8 9</div>
                </div>
                <div className="Hm-cell divider"><div className="Hu-numbers">: </div></div>
                <div className="Hm-cell">
                    <div className={"Hu-numbers Hu-tenminute Hu-movesix" +
                        (IsAuto ? " " : " Hu-playstate") +
                        (IsStart ? " Hu-start" : "") +
                        (IsStop ? " Hu-stop" : "") +
                        (IsReset ? " Hu-reset" : "")}>0 1 2 3 4 5 6</div>
                </div>
                <div className="Hm-cell">
                    <div className={"Hu-numbers Hu-minute Hu-moveten" +
                        (IsAuto ? " " : " Hu-playstate") +
                        (IsStart ? " Hu-start" : "") +
                        (IsStop ? " Hu-stop" : "") +
                        (IsReset ? " Hu-reset" : "")}>0 1 2 3 4 5 6 7 8 9</div>
                </div>
                <div className="Hm-cell divider"><div className="Hu-numbers">: </div></div>
                <div className="Hm-cell">
                    <div className={"Hu-numbers Hu-tensecond Hu-movesix" +
                        (IsAuto ? " " : " Hu-playstate") +
                        (IsStart ? " Hu-start" : "") +
                        (IsStop ? " Hu-stop" : "") +
                        (IsReset ? " Hu-reset" : "")
                    }>0 1 2 3 4 5 6</div>
                </div>
                <div className="Hm-cell">
                    <div className={"Hu-numbers Hu-second Hu-moveten" +
                        (IsAuto ? " " : " Hu-playstate") +
                        (IsStart ? " Hu-start" : "") +
                        (IsStop ? " Hu-stop" : "") +
                        (IsReset ? " Hu-reset" : "")}>
                        0 1 2 3 4 5 6 7 8 9</div>
                </div>
                <div className="Hm-cell divider"><div className="Hu-numbers">: </div></div>
                <div className="Hm-cell">
                    <div className={"Hu-numbers Hu-milisecond Hu-moveten" +
                        (IsAuto ? " " : " Hu-playstate") +
                        (IsStart ? " Hu-start" : "") +
                        (IsStop ? " Hu-stop" : "") +
                        (IsReset ? " Hu-reset" : "")
                    }>0 1 2 3 4 5 6 7 8 9</div>
                </div>
                <div className="Hm-cell">
                    <div className={"Hu-numbers Hu-tenmilisecond Hu-moveten" +
                        (IsAuto ? " " : " Hu-playstate") +
                        (IsStart ? " Hu-start" : "") +
                        (IsStop ? " Hu-stop" : "") +
                        (IsReset ? " Hu-reset" : "")}>0 1 2 3 4 5 6 7 8 9</div>
                </div>
                <div className="Hm-cell">
                    <div className={"Hu-numbers Hu-hundredmilisecond Hu-moveten" +
                        (IsAuto ? " " : " Hu-playstate") +
                        (IsStart ? " Hu-start" : "") +
                        (IsStop ? " Hu-stop" : "") +
                        (IsReset ? " Hu-reset" : "")}>0 1 2 3 4 5 6 7 8 9</div>
                </div>
            </div>
        </div>;
}

