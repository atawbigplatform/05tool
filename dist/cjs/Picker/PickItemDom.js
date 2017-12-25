define(["require", "exports", "01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var PickItemDom;
    (function (PickItemDom) {
        class PickItemDomAction extends domCore.DomAction {
        }
        PickItemDom.PickItemDomAction = PickItemDomAction;
        class PickItemDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new PickItemDomStates();
            }
            _text(str) {
                try {
                    var _texts = $(str).text();
                    if (_texts == "") {
                        return str;
                    }
                    else
                        return _texts;
                }
                catch (ff) {
                    return str;
                }
            }
            pSender() {
                return React.createElement("li", { className: "nav-item Hc-multi-selector  Hz-selected" },
                    React.createElement("a", { onClick: () => { this.close_fun(this.props.Vm.Key); } },
                        this._text(this.props.Vm.Text),
                        React.createElement("em", null),
                        React.createElement("i", { className: "icon-remove fa fa-close" })));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
            close_fun(key) {
                this.props.Vm.delItem(key);
            }
        }
        PickItemDom.PickItemDomReact = PickItemDomReact;
        class PickItemDomVm extends domCore.DomVm {
            constructor(config) {
                super(config);
                this.ReactType = PickItemDomReact;
                this.IsMulit = true;
                if (config) {
                    if (config.Text) {
                        this.Text = config.Text;
                    }
                    if (config.Key) {
                        this.Key = config.Key;
                    }
                    if (config.UniId) {
                        this.UniId = config.UniId;
                    }
                }
            }
            delItem(k) {
                this.emitAppEvent("pickerContainerDelItem", this.UniId, k);
            }
        }
        PickItemDom.PickItemDomVm = PickItemDomVm;
        class PickItemDomStates extends domCore.DomStates {
        }
        PickItemDom.PickItemDomStates = PickItemDomStates;
        class PickItemDomProps extends domCore.DomProps {
        }
        PickItemDom.PickItemDomProps = PickItemDomProps;
    })(PickItemDom = exports.PickItemDom || (exports.PickItemDom = {}));
});
//# sourceMappingURL=PickItemDom.js.map