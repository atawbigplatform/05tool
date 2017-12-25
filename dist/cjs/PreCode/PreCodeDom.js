define(["require", "exports", "01core/0Dom", "01core/Util", "react", "react-dom", "01core/Event"], function (require, exports, domFile, utilFile, React, ReactDOM, eventFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    utilFile.reqCss(["lib/akCss/atawPlatform-sass-1.0/dev/css/precode.css"]);
    var PreCodeDom;
    (function (PreCodeDom) {
        class PreCodeDomAction extends domCore.DomAction {
        }
        PreCodeDom.PreCodeDomAction = PreCodeDomAction;
        class PreCodeDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new PreCodeDomStates();
                this.fDivId = eventFile.App.getUniId().toString(); //唯一ID
            }
            pSender() {
                return React.createElement("ol", { style: { height: this.props.Vm.Height, overflow: "auto" }, className: "p-a Hm-precode " + ("ol" + this.fDivId) }, this.props.Vm.CommandList.map((line, index) => {
                    return React.createElement("li", { className: "", key: index },
                        React.createElement("i", { className: "fa fa-angle-double-right left Hu-precode-icon" }, index),
                        React.createElement("span", { className: "Hu-precode-content" }, line));
                }));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
            pInstall() {
                super.pInstall();
                this.props.Vm.getEmit("React").addListener("scrollTopgoto", () => {
                    var _dom = ReactDOM.findDOMNode(this); //获取节点
                    if (_dom) {
                        var element = _dom.getElementsByClassName("ol" + this.fDivId);
                        _dom.scrollTop = _dom.scrollHeight;
                    }
                    //var element = documtent.getElementsByClassName("ol" + this.fDivId);
                });
            }
        }
        PreCodeDom.PreCodeDomReact = PreCodeDomReact;
        class PreCodeDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = PreCodeDomReact;
                this.CommandList = [];
                this.Height = 380;
                if (config) {
                    this.CommandList.push(...config.CommandList);
                    if (config.Height) {
                        this.Height = config.Height;
                    }
                }
            }
            addCommandAndUpdate(command) {
                this.CommandList.push(...command);
                this.forceUpdate("", () => {
                    this.getEmit("React").emit("scrollTopgoto");
                });
            }
        }
        PreCodeDom.PreCodeDomVm = PreCodeDomVm;
        class PreCodeDomStates extends domCore.DomStates {
        }
        PreCodeDom.PreCodeDomStates = PreCodeDomStates;
        class PreCodeDomProps extends domCore.DomProps {
        }
        PreCodeDom.PreCodeDomProps = PreCodeDomProps;
    })(PreCodeDom = exports.PreCodeDom || (exports.PreCodeDom = {}));
});
//# sourceMappingURL=PreCodeDom.js.map