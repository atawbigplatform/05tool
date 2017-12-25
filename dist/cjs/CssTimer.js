define(["require", "exports", "01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var CssTimer;
    (function (CssTimer) {
        class CssTimerAction extends domCore.DomAction {
        }
        CssTimer.CssTimerAction = CssTimerAction;
        class CssTimerReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new CssTimerStates();
            }
            pSender() {
                return React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "Hc-timer" },
                        React.createElement("div", { className: "Hm-cell" },
                            React.createElement("div", { className: "Hu-numbers Hu-tenhour Hu-moveten" +
                                    (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                                    (this.props.Vm.IsStart ? " Hu-start" : "") +
                                    (this.props.Vm.IsStop ? " Hu-stop" : "") +
                                    (this.props.Vm.IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6 7 8 9")),
                        React.createElement("div", { className: "Hm-cell" },
                            React.createElement("div", { className: "Hu-numbers Hu-hour Hu-moveten" +
                                    (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                                    (this.props.Vm.IsStart ? " Hu-start" : "") +
                                    (this.props.Vm.IsStop ? " Hu-stop" : "") +
                                    (this.props.Vm.IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6 7 8 9")),
                        React.createElement("div", { className: "Hm-cell divider" },
                            React.createElement("div", { className: "Hu-numbers" }, ": ")),
                        React.createElement("div", { className: "Hm-cell" },
                            React.createElement("div", { className: "Hu-numbers Hu-tenminute Hu-movesix" +
                                    (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                                    (this.props.Vm.IsStart ? " Hu-start" : "") +
                                    (this.props.Vm.IsStop ? " Hu-stop" : "") +
                                    (this.props.Vm.IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6")),
                        React.createElement("div", { className: "Hm-cell" },
                            React.createElement("div", { className: "Hu-numbers Hu-minute Hu-moveten" +
                                    (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                                    (this.props.Vm.IsStart ? " Hu-start" : "") +
                                    (this.props.Vm.IsStop ? " Hu-stop" : "") +
                                    (this.props.Vm.IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6 7 8 9")),
                        React.createElement("div", { className: "Hm-cell divider" },
                            React.createElement("div", { className: "Hu-numbers" }, ": ")),
                        React.createElement("div", { className: "Hm-cell" },
                            React.createElement("div", { className: "Hu-numbers Hu-tensecond Hu-movesix" +
                                    (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                                    (this.props.Vm.IsStart ? " Hu-start" : "") +
                                    (this.props.Vm.IsStop ? " Hu-stop" : "") +
                                    (this.props.Vm.IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6")),
                        React.createElement("div", { className: "Hm-cell" },
                            React.createElement("div", { className: "Hu-numbers Hu-second Hu-moveten" +
                                    (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                                    (this.props.Vm.IsStart ? " Hu-start" : "") +
                                    (this.props.Vm.IsStop ? " Hu-stop" : "") +
                                    (this.props.Vm.IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6 7 8 9")),
                        React.createElement("div", { className: "Hm-cell divider" },
                            React.createElement("div", { className: "Hu-numbers" }, ": ")),
                        React.createElement("div", { className: "Hm-cell" },
                            React.createElement("div", { className: "Hu-numbers Hu-milisecond Hu-moveten" +
                                    (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                                    (this.props.Vm.IsStart ? " Hu-start" : "") +
                                    (this.props.Vm.IsStop ? " Hu-stop" : "") +
                                    (this.props.Vm.IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6 7 8 9")),
                        React.createElement("div", { className: "Hm-cell" },
                            React.createElement("div", { className: "Hu-numbers Hu-tenmilisecond Hu-moveten" +
                                    (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                                    (this.props.Vm.IsStart ? " Hu-start" : "") +
                                    (this.props.Vm.IsStop ? " Hu-stop" : "") +
                                    (this.props.Vm.IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6 7 8 9")),
                        React.createElement("div", { className: "Hm-cell" },
                            React.createElement("div", { className: "Hu-numbers Hu-hundredmilisecond Hu-moveten" +
                                    (this.props.Vm.IsAuto ? " " : " Hu-playstate") +
                                    (this.props.Vm.IsStart ? " Hu-start" : "") +
                                    (this.props.Vm.IsStop ? " Hu-stop" : "") +
                                    (this.props.Vm.IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6 7 8 9"))));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
            fun_isStart() {
                this.props.Vm.fun_isStart();
            }
            fun_isStop() {
                this.props.Vm.fun_isStop();
            }
            fun_isReset() {
                this.props.Vm.fun_isReset();
            }
        }
        CssTimer.CssTimerReact = CssTimerReact;
        class CssTimerVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = CssTimerReact;
                this.IsAuto = false;
                this.IsStart = false;
                this.IsStop = false;
                this.IsReset = false;
                if (config.IsAuto) {
                    this.IsAuto = config.IsAuto;
                }
            }
            fun_isStart() {
                this.IsStart = true;
                this.IsStop = false;
                this.IsReset = false;
                this.forceUpdate("");
            }
            fun_isStop() {
                this.IsStart = false;
                this.IsStop = true;
                this.IsReset = false;
                this.forceUpdate("");
            }
            fun_isReset() {
                this.IsStart = false;
                this.IsStop = false;
                this.IsReset = true;
                this.forceUpdate("");
            }
        }
        CssTimer.CssTimerVm = CssTimerVm;
        class CssTimerStates extends domCore.DomStates {
        }
        CssTimer.CssTimerStates = CssTimerStates;
        class CssTimerProps extends domCore.DomProps {
        }
        CssTimer.CssTimerProps = CssTimerProps;
    })(CssTimer = exports.CssTimer || (exports.CssTimer = {}));
});
//# sourceMappingURL=CssTimer.js.map