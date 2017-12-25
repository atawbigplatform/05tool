


import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

export module CssTimer {
    export class CssTimerAction extends domCore.DomAction {
    }

    export class CssTimerReact extends domCore.DomReact<CssTimerProps, CssTimerStates, CssTimerAction> implements domCore.IReact {

        public state = new CssTimerStates();

        public pSender(): React.ReactElement<any> {
            return <div className="container">
                <div className="Hc-timer">
                    <div className="Hm-cell">
                        <div className={"Hu-numbers Hu-tenhour Hu-moveten" +
                            (this.props.Vm.IsAuto ? " " : " Hu-playstate")+
                            (this.props.Vm.IsStart ? " Hu-start" : "") +
                            (this.props.Vm.IsStop ? " Hu-stop" : "") +
                            (this.props.Vm.IsReset ? " Hu-reset" : "")}>0 1 2 3 4 5 6 7 8 9</div>
                    </div>
                    <div className="Hm-cell">
                        <div className={"Hu-numbers Hu-hour Hu-moveten" +
                            (this.props.Vm.IsAuto ? " " : " Hu-playstate")+
                            (this.props.Vm.IsStart ? " Hu-start" : "") +
                            (this.props.Vm.IsStop ? " Hu-stop" : "") +
                            (this.props.Vm.IsReset ? " Hu-reset" : "")
                        }>0 1 2 3 4 5 6 7 8 9</div>
                    </div>
                    <div className="Hm-cell divider"><div className="Hu-numbers">: </div></div>
                    <div className="Hm-cell">
                        <div className={"Hu-numbers Hu-tenminute Hu-movesix" +
                            (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                            (this.props.Vm.IsStart ? " Hu-start" : "") +
                            (this.props.Vm.IsStop ? " Hu-stop" : "") +
                            (this.props.Vm.IsReset ? " Hu-reset" : "") }>0 1 2 3 4 5 6</div>
                    </div>
                    <div className="Hm-cell">
                        <div className={"Hu-numbers Hu-minute Hu-moveten" +
                            (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                            (this.props.Vm.IsStart ? " Hu-start" : "") +
                            (this.props.Vm.IsStop ? " Hu-stop" : "") +
                            (this.props.Vm.IsReset ? " Hu-reset" : "") }>0 1 2 3 4 5 6 7 8 9</div>
                    </div>
                    <div className="Hm-cell divider"><div className="Hu-numbers">: </div></div>
                    <div className="Hm-cell">
                        <div className={"Hu-numbers Hu-tensecond Hu-movesix" +
                            (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                            (this.props.Vm.IsStart ? " Hu-start" : "") +
                            (this.props.Vm.IsStop ? " Hu-stop" : "") +
                            (this.props.Vm.IsReset ? " Hu-reset" : "")
                        }>0 1 2 3 4 5 6</div>
                    </div>
                    <div className="Hm-cell">
                        <div className={"Hu-numbers Hu-second Hu-moveten" +
                            (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                            (this.props.Vm.IsStart? " Hu-start" : "") +
                            (this.props.Vm.IsStop ? " Hu-stop" : "") +
                            (this.props.Vm.IsReset ? " Hu-reset" : "")}>
                            0 1 2 3 4 5 6 7 8 9</div>
                    </div>
                    <div className="Hm-cell divider"><div className="Hu-numbers">: </div></div>
                    <div className="Hm-cell">
                        <div className={"Hu-numbers Hu-milisecond Hu-moveten" +
                            (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                            (this.props.Vm.IsStart ? " Hu-start" : "") +
                            (this.props.Vm.IsStop ? " Hu-stop" : "") +
                            (this.props.Vm.IsReset ? " Hu-reset" : "")
                        }>0 1 2 3 4 5 6 7 8 9</div>
                    </div>
                    <div className="Hm-cell">
                        <div className={"Hu-numbers Hu-tenmilisecond Hu-moveten" +
                            (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                            (this.props.Vm.IsStart ? " Hu-start" : "") +
                            (this.props.Vm.IsStop ? " Hu-stop" : "") +
                            (this.props.Vm.IsReset ? " Hu-reset" : "") }>0 1 2 3 4 5 6 7 8 9</div>
                    </div>
                    <div className="Hm-cell">
                        <div className={"Hu-numbers Hu-hundredmilisecond Hu-moveten" +
                            (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                            (this.props.Vm.IsStart ? " Hu-start" : "") +
                            (this.props.Vm.IsStop ? " Hu-stop" : "") +
                            (this.props.Vm.IsReset ? " Hu-reset" : "") }>0 1 2 3 4 5 6 7 8 9</div>
                    </div>
                </div>                
                </div>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }
        public fun_isStart() {
            this.props.Vm.fun_isStart();
        }
        public fun_isStop() {
            this.props.Vm.fun_isStop();
        }
        public fun_isReset() {
            this.props.Vm.fun_isReset();
        }

    }

    export interface IReactCssTimerVm extends domCore.DomVm {
        IsAuto: boolean;
        IsStart: boolean;
        IsStop: boolean;
        IsReset: boolean;
        fun_isStart();
        fun_isStop();
        fun_isReset();
    }

    export interface ICssTimerConfig {
        IsAuto: boolean;
    }

    export class CssTimerVm extends domCore.DomVm implements IReactCssTimerVm {
        public ReactType = CssTimerReact;
        public IsAuto: boolean = false;
        public IsStart: boolean = false;
        public IsStop: boolean = false;
        public IsReset: boolean = false;

        public constructor(config?: ICssTimerConfig) {
            super();
            if (config.IsAuto) {
                this.IsAuto = config.IsAuto;
            }
           
        }
        public fun_isStart() {
            this.IsStart = true;
            this.IsStop = false;
            this.IsReset = false;
            this.forceUpdate("");
        }
        public fun_isStop() {
            this.IsStart = false;
            this.IsStop = true;
            this.IsReset = false;
            this.forceUpdate("");
        }
        public fun_isReset() {
            this.IsStart = false;
            this.IsStop = false;
            this.IsReset = true;
            this.forceUpdate("");
        }

    }
    export class CssTimerStates extends domCore.DomStates {
    }


    export class CssTimerProps extends domCore.DomProps<IReactCssTimerVm>{
    }



}


