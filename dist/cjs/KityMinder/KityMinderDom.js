define(["require", "exports", "01core/0Dom", "01core/Util", "react", "react-dom"], function (require, exports, domFile, utilFile, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var KityMinderDom;
    (function (KityMinderDom) {
        class KityMinderDomAction extends domCore.DomAction {
        }
        KityMinderDom.KityMinderDomAction = KityMinderDomAction;
        class KityMinderDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new KityMinderDomStates();
            }
            pSender() {
                return React.createElement("div", null,
                    React.createElement("div", { className: "KityMinderDom", style: { height: 800 } },
                        React.createElement("div", null, "\u6B63\u5728\u8F7D\u5165KityMinderDom\u7684\u7EC4\u4EF6......"),
                        React.createElement("div", null, this.fError ? React.createElement("span", null, this.fError) : "")));
            }
            fKityMinderInit() {
                this.fError = null;
                var _$dom = $(ReactDOM.findDOMNode(this)).find(".KityMinderDom");
                if (this.props.Vm.MDTreeObj && _$dom.length > 0) {
                    _$dom.html("");
                    //  urlFile.Core.AkPost("/right/right/Menu/GetAllTree?regname=MenuTreeCodeTable", {}, (a: any) => {
                    //  var _data: ITreeCodeTableModel = a;
                    // var _o = convertToKMNodeByTreeNode(_data);
                    // _o.data.text = "平台菜单";
                    // _o.data.expandState = "";
                    utilFile.Core.Util.AsyncJs([
                        "/AtawStatic/lib/03Extend/kityMinder/kity.min.js",
                        "/AtawStatic/lib/03Extend/kityMinder/kityMinder.core.css",
                        "/AtawStatic/lib/03Extend/kityMinder/kityMinder.core.js"
                    ], () => {
                        try {
                            var km = window["km"] = new window["kityminder"].Minder({ renderTo: _$dom[0] });
                            km.importJson(this.props.Vm.MDTreeObj);
                        }
                        catch (ex) {
                            console.error(ex);
                            this.fError = ex;
                            this.forceUpdate();
                        }
                    });
                }
            }
            pInstall() {
                super.pInstall();
                // this.fKityMinderInit();
            }
            pComponentDidMount() {
                super.pComponentDidMount();
                this.fKityMinderInit();
            }
        }
        KityMinderDom.KityMinderDomReact = KityMinderDomReact;
        KityMinderDom.convertToKMNodeByTreeNode = function (node) {
            var _km = { data: { text: node.CODE_TEXT, expandState: "collapse" }, children: [] };
            if (node.Children && node.Children.length > 0) {
                node.Children.forEach((n) => {
                    var km = KityMinderDom.convertToKMNodeByTreeNode(n);
                    _km.children.push(km);
                });
            }
            return _km;
        };
        // var fconvertToKMNodeByTreeNode = function (node: ITreeCodeTableModel):
        class KityMinderDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = KityMinderDomReact;
                if (config) {
                    if (config.MDTreeObj) {
                        this.MDTreeObj = config.MDTreeObj;
                    }
                }
            }
        }
        KityMinderDom.KityMinderDomVm = KityMinderDomVm;
        class KityMinderDomStates extends domCore.DomStates {
        }
        KityMinderDom.KityMinderDomStates = KityMinderDomStates;
        class KityMinderDomProps extends domCore.DomProps {
        }
        KityMinderDom.KityMinderDomProps = KityMinderDomProps;
    })(KityMinderDom = exports.KityMinderDom || (exports.KityMinderDom = {}));
});
//# sourceMappingURL=KityMinderDom.js.map