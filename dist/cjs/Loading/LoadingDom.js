define(["require", "exports", "01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    exports.LoadingText = ({ children }) => {
        return React.createElement("span", null,
            React.createElement("i", { className: "fa  fa-spinner fa-spin " }),
            children);
    };
    var LoadingDom;
    (function (LoadingDom) {
        class LoadingDomAction extends domCore.DomAction {
        }
        LoadingDom.LoadingDomAction = LoadingDomAction;
        class LoadingDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new LoadingDomStates();
            }
            pSender() {
                return React.createElement("div", { className: "Hm-loading-panel" },
                    React.createElement("div", { className: this.props.Vm.LoadingClassNameString, style: { "transform": "scale(" + this.props.Vm.ScaleNum + ") " } }, this.fLoadingDiv(this.props.Vm.Num)));
            }
            fLoadingDiv(n) {
                var res = [];
                var n = this.props.Vm.Num;
                for (var i = 0; i < n; i++) {
                    var _div = React.createElement("div", { key: i });
                    res.push(_div);
                }
                return res;
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
        }
        LoadingDom.LoadingDomReact = LoadingDomReact;
        let LoadingClassNameEnum;
        (function (LoadingClassNameEnum) {
            LoadingClassNameEnum[LoadingClassNameEnum["Pacman"] = 100] = "Pacman";
            LoadingClassNameEnum[LoadingClassNameEnum["BallPulse"] = 101] = "BallPulse";
            LoadingClassNameEnum[LoadingClassNameEnum["Colors"] = 102] = "Colors";
            LoadingClassNameEnum[LoadingClassNameEnum["Timer"] = 103] = "Timer";
            LoadingClassNameEnum[LoadingClassNameEnum["BallClipRotate"] = 104] = "BallClipRotate";
            LoadingClassNameEnum[LoadingClassNameEnum["BallClipRotatePulse"] = 105] = "BallClipRotatePulse";
            LoadingClassNameEnum[LoadingClassNameEnum["SquareSpin"] = 106] = "SquareSpin";
            LoadingClassNameEnum[LoadingClassNameEnum["BallRise"] = 107] = "BallRise";
            LoadingClassNameEnum[LoadingClassNameEnum["BallRotate"] = 108] = "BallRotate";
            LoadingClassNameEnum[LoadingClassNameEnum["LineScaleParty"] = 109] = "LineScaleParty";
            LoadingClassNameEnum[LoadingClassNameEnum["CubeTransition"] = 110] = "CubeTransition";
            LoadingClassNameEnum[LoadingClassNameEnum["BallZigZag"] = 111] = "BallZigZag";
            LoadingClassNameEnum[LoadingClassNameEnum["TriangleSkewSpin"] = 112] = "TriangleSkewSpin";
            LoadingClassNameEnum[LoadingClassNameEnum["BallSpinFadeLoader"] = 113] = "BallSpinFadeLoader";
            LoadingClassNameEnum[LoadingClassNameEnum["LineSpinFadeLoader"] = 114] = "LineSpinFadeLoader";
            LoadingClassNameEnum[LoadingClassNameEnum["SemiCircleSpin"] = 115] = "SemiCircleSpin";
        })(LoadingClassNameEnum = LoadingDom.LoadingClassNameEnum || (LoadingDom.LoadingClassNameEnum = {}));
        LoadingDom.ColorsLoading = function () {
            return new LoadingDomVm({ LoadingClassName: LoadingClassNameEnum.Colors, Num: 5 });
        };
        LoadingDom.MircLoading = function () {
            return new LoadingDomVm({ LoadingClassName: LoadingClassNameEnum.Pacman, Num: 5, ScaleNum: 0.3 });
        };
        LoadingDom.TimeLoading = function () {
            return new LoadingDomVm({ LoadingClassName: LoadingClassNameEnum.Timer, Num: 1, ScaleNum: 2 });
        };
        LoadingDom.LoadingDataHash = {
            Pacman: "Hu-pacman",
            BallPulse: "Hu-ball-pulse",
            Colors: "Hu-colors",
            Timer: "Hu-timer",
            BallClipRotate: "Hu-ball-clip-rotate",
            BallClipRotatePulse: "Hu-ball-clip-rotate-pulse",
            SquareSpin: "Hu-square-spin",
            BallRise: "Hu-ball-pulse-rise",
            BallRotate: "Hu-ball-rotate",
            LineScaleParty: "Hu-line-scale-party",
            CubeTransition: "Hu-cube-transition",
            BallZigZag: "Hu-ball-zig-zag",
            TriangleSkewSpin: "Hu-triangle-skew-spin",
            BallSpinFadeLoader: "Hu-ball-spin-fade-loader",
            LineSpinFadeLoader: "Hu-line-spin-fade-loader",
            SemiCircleSpin: "Hu-semi-circle-spin"
        };
        //  @decorator.setDecoratorCon("加载中 LoadingDom")
        class LoadingDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = LoadingDomReact;
                //   @decorator.setDecoratorProps("组件div数量","number","3")
                this.Num = 3;
                if (config) {
                    if (config.LoadingClassName) {
                        this.LoadingClassName = config.LoadingClassName;
                    }
                    if (config.ScaleNum) {
                        this.ScaleNum = config.ScaleNum;
                    }
                    if (config.Num) {
                        this.Num = config.Num;
                    }
                    else {
                        if (this.LoadingClassName == LoadingClassNameEnum.Pacman) {
                            this.Num = 5;
                        }
                    }
                }
                this.LoadingClassNameString = LoadingDom.LoadingDataHash[LoadingClassNameEnum[this.LoadingClassName]];
            }
        }
        LoadingDom.LoadingDomVm = LoadingDomVm;
        class LoadingDomStates extends domCore.DomStates {
        }
        LoadingDom.LoadingDomStates = LoadingDomStates;
        class LoadingDomProps extends domCore.DomProps {
        }
        LoadingDom.LoadingDomProps = LoadingDomProps;
    })(LoadingDom = exports.LoadingDom || (exports.LoadingDom = {}));
});
//# sourceMappingURL=LoadingDom.js.map