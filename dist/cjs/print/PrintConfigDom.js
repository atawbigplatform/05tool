define(["require", "exports", "01core/0Dom", "01core/Util", "react", "01core/PrintUtil"], function (require, exports, domFile, utilFile, React, printUtilFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var PrintConfigDom;
    (function (PrintConfigDom) {
        class PrintConfigDomAction extends domCore.DomAction {
        }
        PrintConfigDom.PrintConfigDomAction = PrintConfigDomAction;
        class PrintConfigDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new PrintConfigDomStates();
            }
            pSender() {
                return React.createElement("div", { className: "btn-group " },
                    React.createElement("button", { type: "button", className: "btn btn-primary  btn-sm " },
                        React.createElement("i", { className: "fa fa-print" }, "\u6253\u5370")),
                    React.createElement("button", { type: "button", className: "btn btn-primary  btn-sm dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
                        React.createElement("span", { className: "caret" }),
                        React.createElement("span", { className: "sr-only" }, "Toggle Dropdown")),
                    React.createElement("ul", { className: "dropdown-menu" },
                        React.createElement("li", null,
                            React.createElement("a", { onClick: () => {
                                    this._clikWeb();
                                } }, "\u7F51\u9875\u6253\u5370")),
                        React.createElement("li", null,
                            React.createElement("a", { onClick: () => {
                                    this._clickLocal();
                                } },
                                "\u63D2\u4EF6\u6253\u5370",
                                PrintConfigDomReact.fIsPrintLoad
                                    ? PrintConfigDomReact.fIsPrintLoad
                                    : null)),
                        React.createElement("li", null,
                            React.createElement("a", { onClick: () => { this._clickCopy(); } }, "\u62F7\u8D1Dhtml"))));
            }
            _loadPrint() {
                window["On_CLodop_Opened"] = () => {
                    // OpenPreview();	//执行打印预览 window.On_CLodop_Opened=null; alert("可以打印了");
                    PrintConfigDomReact.fIsPrintLoad = "";
                    this.forceUpdate();
                };
            }
            pComponentDidMount() {
                super.pComponentDidMount();
                utilFile
                    .Core
                    .Util
                    .AsyncJs(["http://localhost:8000/CLodopfuncs.js?name=CLODOPA"], (a) => {
                    this._loadPrint();
                }, () => {
                    PrintConfigDomReact.fIsPrintLoad = "插件未安装";
                });
            }
            _clikWeb() {
                this
                    .props
                    .Vm
                    .emitOut("web");
            }
            _clickLocal() {
                if (PrintConfigDomReact.fIsPrintLoad) {
                    alert(PrintConfigDomReact.fIsPrintLoad);
                }
                else {
                    this
                        .props
                        .Vm
                        .emitOut("local");
                }
            }
            _clickCopy() {
                this
                    .props
                    .Vm
                    .emitOut("copy");
            }
        }
        PrintConfigDomReact.fIsPrintLoad = "正在检测";
        PrintConfigDom.PrintConfigDomReact = PrintConfigDomReact;
        class PrintConfigDomVm extends domCore.DomVm {
            constructor(config) {
                super(config);
                this.ReactType = PrintConfigDomReact;
            }
            emitOut(mode) {
                this
                    .getEmit()
                    .emit("print", mode);
            }
            onPrint(fetchPrintConfigFun) {
                this
                    .getEmit()
                    .on("print", (mode) => {
                    const _config = fetchPrintConfigFun(mode);
                    _config.IsLocal = mode == "local";
                    _config.IsCode = mode == "copy";
                    printUtilFile.printLocal("", _config);
                });
            }
        }
        PrintConfigDom.PrintConfigDomVm = PrintConfigDomVm;
        class PrintConfigDomStates extends domCore.DomStates {
        }
        PrintConfigDom.PrintConfigDomStates = PrintConfigDomStates;
        class PrintConfigDomProps extends domCore.DomProps {
        }
        PrintConfigDom.PrintConfigDomProps = PrintConfigDomProps;
    })(PrintConfigDom = exports.PrintConfigDom || (exports.PrintConfigDom = {}));
});
//# sourceMappingURL=PrintConfigDom.js.map