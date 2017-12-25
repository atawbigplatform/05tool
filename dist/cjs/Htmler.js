define(["require", "exports", "01core/0Dom", "react", "./Modal/ModalDom", "./Editor/MiniEditor"], function (require, exports, domFile, React, modalFile, miniEditorFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var ModalVm = modalFile.ModalDom.ModalDomVm;
    var MiniEditorVm = miniEditorFile.MiniEditor.MiniEditorVm;
    var Htmler;
    (function (Htmler) {
        class HtmlerAction extends domCore.DomAction {
        }
        Htmler.HtmlerAction = HtmlerAction;
        class HtmlerReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new HtmlerStates();
                this.fIsBtnShow = false;
            }
            pSender() {
                return React.createElement("div", null,
                    this._tDom(this.props.Vm.ModalObj),
                    React.createElement("span", { style: { "position": "relative" } },
                        React.createElement("div", { className: "ACT-HTML", style: this.InputColStyle(), contentEditable: true, dangerouslySetInnerHTML: { __html: this.props.Vm.HtmlContent }, onFocus: (e) => { this.fIsBtnShow = true; this.forceUpdate(); e.stopPropagation(); }, onInput: () => {
                                this._htmlChange();
                            } }),
                        React.createElement("div", { className: "Hu-htmler-btn " + (this.fIsBtnShow ? "" : " hide") },
                            React.createElement("a", { className: " fa fa-edit", onClick: (e) => { this.clickBtn(); e.stopPropagation(); } }))));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
                this._bodyClickFun = (a) => {
                    var _$tar = $(a.target);
                    let _$html = $(this.pGetDom()).find(".ACT-HTML");
                    if (_$tar.parents().is(_$html[0]) || _$tar[0] == _$html[0]) {
                    }
                    else {
                        this._hideBtn();
                    }
                };
                $("body").click(this._bodyClickFun);
            }
            pComponentWillUnmount() {
                super.pComponentWillUnmount();
                $("body").unbind("click", this._bodyClickFun); //需解绑，否则造成内存泄漏
            }
            _hideBtn() {
                this.fIsBtnShow = false;
                this.forceUpdate();
            }
            clickBtn() {
                this.fIsBtnShow = false;
                this.props.Vm.ModalObj.open();
                // this.forceUpdate();
                this._hideBtn();
            }
            InputColStyle() {
                return {
                    display: "inline-block",
                    // position: "relative",
                    "min-width": (this.props.Vm.PxWidth ? this.props.Vm.PxWidth : "auto"),
                    "min-height": (this.props.Vm.PxHeight ? (this.props.Vm.PxHeight) : "auto")
                };
            }
            _htmlChange() {
                let _dom = this.pGetDom();
                if (_dom) {
                    let _$dom = $(_dom).find(".ACT-HTML");
                    //alert(_$dom.html());
                    this.props.Vm.HtmlContent = _$dom.html();
                    this.props.Vm.change();
                }
            }
        }
        Htmler.HtmlerReact = HtmlerReact;
        class HtmlerVm extends domCore.DomVm {
            constructor(config) {
                super(config);
                this.ReactType = HtmlerReact;
                if (config) {
                    this.HtmlContent = config.HtmlContent;
                }
                this.ModalObj = new ModalVm();
                this.ModalObj.Width = "50%";
                this.ModalObj.ModalShowFun = (a) => {
                    this.ModalObj.DomObj = new MiniEditorVm({ Content: this.HtmlContent });
                    this.ModalObj.DomObj.getEmit().on("MiniEditorVm-sure-btn", (val) => {
                        this.setHtmlByModal(val);
                    });
                };
                this.ModalObj.ModalCloseFun = (a) => {
                    if (this.ModalObj.DomObj)
                        this.ModalObj.DomObj.dispose();
                };
            }
            change() {
                this.getEmit().emit("htmlerChange");
                // this.
            }
            setHtmlByModal(val) {
                this.HtmlContent = val;
                this.ModalObj.close();
                this.forceUpdate("", () => {
                    this.change();
                });
            }
        }
        Htmler.HtmlerVm = HtmlerVm;
        class HtmlerStates extends domCore.DomStates {
        }
        Htmler.HtmlerStates = HtmlerStates;
        class HtmlerProps extends domCore.DomProps {
        }
        Htmler.HtmlerProps = HtmlerProps;
    })(Htmler = exports.Htmler || (exports.Htmler = {}));
});
//# sourceMappingURL=Htmler.js.map