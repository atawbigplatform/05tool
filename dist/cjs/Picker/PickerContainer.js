define(["require", "exports", "01core/0Dom", "react", "./PickItemDom"], function (require, exports, domFile, React, pickItemDomFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var PickerContainer;
    (function (PickerContainer) {
        class PickerContainerAction extends domCore.DomAction {
        }
        PickerContainer.PickerContainerAction = PickerContainerAction;
        class PickerContainerReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new PickerContainerStates();
                this.pIsSetScreenHeight = true;
            }
            fPickSure_fun() {
                this.props.Vm.PickSure();
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
            fInitSingle() {
                return React.createElement("div", { className: "Hm-picker clearfix" },
                    React.createElement("div", { className: this.props.Vm.IsPickSelectHide ? " hide " : "" },
                        React.createElement("div", null, "（已经选中" + this.props.Vm.PickItemList.length + "个）"),
                        React.createElement("ul", { className: "nav nav-tabs clearfix" }, this.props.Vm.PickItemList.map((p, i) => {
                            return p.intoDom(i);
                        })),
                        this.props.Vm.PickItemList.length == 0 ? React.createElement("button", { onClick: () => { this.fPickSure_fun(); } }, "\u786E\u5B9A") : null),
                    React.createElement("div", null, this._tDom(this.props.Vm.LeftDomVmObj, { nullNode: React.createElement("span", null,
                            React.createElement("i", { className: "icon-spinner icon-spin fa  fa-spinner fa-spin " }),
                            "\u7B49\u5F85\u8F7D\u5165\u5F85\u9009\u533A\u57DF...") })));
            }
            fInitMulti() {
                return React.createElement("div", { className: "Hm-picker" },
                    React.createElement("div", { className: "col-sm-8 col-lg-" + this.isRightClassName() + " col-xl-" + this.isRightClassName() + "  Hm-picker-left" }, this._tDom(this.props.Vm.LeftDomVmObj, { nullNode: React.createElement("span", null,
                            React.createElement("i", { className: "icon-spinner icon-spin fa  fa-spinner fa-spin " }),
                            "\u7B49\u5F85\u8F7D\u5165\u5F85\u9009\u533A\u57DF...") })),
                    React.createElement("div", { className: " col-sm-4 col-lg-4 col-xl-4 Hm-picker-right " + (this.props.Vm.IsPickSelectHide ? " hide " : "") },
                        React.createElement("div", null, "（已经选中" + this.props.Vm.PickItemList.length + "个）"),
                        React.createElement("ul", { className: "nav nav-pills clearfix" }, this.props.Vm.PickItemList.map((p, i) => {
                            return p.intoDom(i);
                        })),
                        React.createElement("div", { className: "text-center" },
                            React.createElement("a", { className: "btn btn-sm btn-primary", onClick: () => { this.fPickSure_fun(); } }, "\u786E\u5B9A"))));
            }
            isRightClassName() {
                return this.props.Vm.isRightEmpty ? "12" : "8";
            }
            pSender() {
                return React.createElement("div", { className: "row" },
                    " ",
                    this.props.Vm.IsSingle ? this.fInitSingle() : this.fInitMulti(),
                    " ");
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
        }
        PickerContainer.PickerContainerReact = PickerContainerReact;
        class PickerContainerVm extends domCore.DomVm {
            constructor(config) {
                super(config);
                this.ReactType = PickerContainerReact;
                this.PickItemList = [];
                this.isRightEmpty = false;
                this.IsRegEvent = false;
                if (config) {
                    if (config.LeftDomVmObj) {
                        this.LeftDomVmObj = config.LeftDomVmObj;
                        this.LeftDomVmObj.IsSingle = config.IsSingle;
                    }
                    if (config.IsSingle) {
                        this.IsSingle = config.IsSingle;
                    }
                    if (config.IsPickSelectHide) {
                        this.IsPickSelectHide = config.IsPickSelectHide;
                    }
                    if (config.UniId) {
                        this.UniId = config.UniId;
                        if (!this.IsRegEvent) {
                            this.IsRegEvent = true;
                            this.fRegAppEvent();
                        }
                    }
                    if (config.isRightEmpty) {
                        this.isRightEmpty = config.isRightEmpty;
                    }
                    if (config.PickItemList) {
                        config.PickItemList.forEach((item) => {
                            item.UniId = this.UniId;
                            this.PickItemList.push(new pickItemDomFile.PickItemDom.PickItemDomVm(item));
                        });
                    }
                }
            }
            regAppEvent() {
                if (!this.IsRegEvent) {
                    if (this.UniId) {
                        this.IsRegEvent = true;
                        this.fRegAppEvent();
                    }
                }
            }
            fRegAppEvent() {
                this.listenAppEvent("pickerContainerAddItem", this.UniId, (item) => {
                    //  alert("增加");
                    var _vm = new pickItemDomFile.PickItemDom.PickItemDomVm({
                        Key: item.Key,
                        Text: item.Text,
                        UniId: this.UniId
                    });
                    for (var index = 0; index < this.PickItemList.length; index++) {
                        if (this.PickItemList[index].Key == item.Key) {
                            alert("此项已添加！");
                            return;
                        }
                    }
                    if (this.IsSingle) {
                        this.PickItemList = [_vm];
                        this.PickSure();
                    }
                    else {
                        this.PickItemList.push(_vm);
                    }
                    this.forceUpdate("");
                    // this.emitAppEvent("pickerContainerDelItemForce", this.UniId);
                });
                this.listenAppEvent("call-PickDom-SetSelect", this.UniId, () => {
                    this.emitAppEvent("PickDom-SetSelect", this.UniId, this.PickItemList.map((p) => {
                        return p.Key;
                    }));
                });
                this.listenAppEvent("pickerSelect-HideOrShow", this.UniId, (isShow) => {
                    this.IsPickSelectHide = !isShow;
                    this.forceUpdate("");
                });
                this.listenAppEvent("pickerContainerDelItem", this.UniId, (k) => {
                    var _index = -1;
                    this.PickItemList.forEach((r, i) => {
                        if (r.Key == k) {
                            _index = i;
                        }
                    });
                    if (_index >= 0) {
                        this.PickItemList.splice(_index, 1);
                        this.PickItemList.forEach((r, i) => {
                            r.toChange();
                        });
                    }
                    this.forceUpdate("");
                    // this.emitAppEvent("pickerContainerDelItemForce", this.UniId);
                });
                this.listenAppEvent("pickerContainerClearItem", this.UniId, () => {
                    this.PickItemList = [];
                    this.forceUpdate("");
                });
            }
            loadDom(pickItemList, callback) {
                this.PickItemList = [];
                pickItemList.forEach((item) => {
                    item.UniId = this.UniId;
                    this.PickItemList.push(new pickItemDomFile.PickItemDom.PickItemDomVm(item));
                });
                this.IsChange = true;
                //  this.LeftDomVmObj.IsChange = tr
                this.LeftDomVmObj.sysLoadDom(pickItemList, callback);
            }
            pSetSureCustomerObj(_items) {
                if (this.SetSureCustomerObjFun) {
                    return this.SetSureCustomerObjFun(_items);
                }
            }
            PickSure() {
                this.emitAppEvent("modal-close", this.UniId);
                var _items = this.PickItemList.map((item) => {
                    return { Key: item.Key, Text: item.Text };
                });
                // this.LeftDomVmObj = null;
                //  this.PickItemList = [];
                this.emitAppEvent("picker-sure", this.UniId, _items, this.pSetSureCustomerObj(_items));
            }
            PickCancleSelect(k) {
            }
            PickSelect(k) {
            }
        }
        PickerContainer.PickerContainerVm = PickerContainerVm;
        class PickerContainerStates extends domCore.DomStates {
        }
        PickerContainer.PickerContainerStates = PickerContainerStates;
        class PickerContainerProps extends domCore.DomProps {
        }
        PickerContainer.PickerContainerProps = PickerContainerProps;
    })(PickerContainer = exports.PickerContainer || (exports.PickerContainer = {}));
});
//# sourceMappingURL=PickerContainer.js.map