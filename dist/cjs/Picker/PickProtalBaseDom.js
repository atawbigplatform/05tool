define(["require", "exports", "01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var PickProtalBaseDom;
    (function (PickProtalBaseDom) {
        class PickProtalBaseDomAction extends domCore.DomAction {
        }
        PickProtalBaseDom.PickProtalBaseDomAction = PickProtalBaseDomAction;
        class PickProtalBaseDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new PickProtalBaseDomStates();
            }
            getInputVal() {
                var _list = this.props.Vm.PickItemList.map((m) => { return m.Text; });
                return _list.join(",");
            }
            pSender() {
                return React.createElement("input", { className: "form-control", ref: "input", value: this.getInputVal(), readOnly: true });
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
        }
        PickProtalBaseDom.PickProtalBaseDomReact = PickProtalBaseDomReact;
        class PickProtalBaseDomVm extends domCore.DomVm {
            constructor(config) {
                super(config);
                this.ReactType = PickProtalBaseDomReact;
                //  public TextAreaText: string;
                this.PickItemList = [];
                if (config) {
                    if (config.PickItemList) {
                        this.PickItemList = config.PickItemList.map((c) => {
                            return { Text: c.Text, Key: c.Key };
                        });
                    }
                    if (config.UniId) {
                        this.UniId = config.UniId;
                        this.listenAppEvent("picker-sure", this.UniId, (items) => {
                            //--------
                            this.pPickerSure(items);
                        });
                    }
                }
            }
            pPickerSure(items) {
                if (this.pCheckItemEq(items)) {
                    //没有更新不需要操作
                    this.forceUpdate("");
                }
                else {
                    this.PickItemList = items;
                    this.forceUpdate("");
                }
            }
            pCheckItemEq(items) {
                var _isCheck = true;
                if (items.length == this.PickItemList.length) {
                    for (var i = 0; i < items.length; i++) {
                        var it = items[i];
                        if (this.PickItemList.filter((v) => v.Key == it.Key).length > 0) {
                        }
                        else {
                            _isCheck = false;
                            break;
                        }
                    }
                }
                else {
                    _isCheck = false;
                }
                return _isCheck;
            }
        }
        PickProtalBaseDom.PickProtalBaseDomVm = PickProtalBaseDomVm;
        class PickProtalBaseDomStates extends domCore.DomStates {
        }
        PickProtalBaseDom.PickProtalBaseDomStates = PickProtalBaseDomStates;
        class PickProtalBaseDomProps extends domCore.DomProps {
        }
        PickProtalBaseDom.PickProtalBaseDomProps = PickProtalBaseDomProps;
    })(PickProtalBaseDom = exports.PickProtalBaseDom || (exports.PickProtalBaseDom = {}));
});
//# sourceMappingURL=PickProtalBaseDom.js.map