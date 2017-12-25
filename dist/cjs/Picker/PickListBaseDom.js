define(["require", "exports", "01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var PickListBaseDom;
    (function (PickListBaseDom) {
        class PickListBaseDomAction extends domCore.DomAction {
        }
        PickListBaseDom.PickListBaseDomAction = PickListBaseDomAction;
        class PickListBaseDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new PickListBaseDomStates();
            }
            li_clickFun(item) {
                this.props.Vm.addItem(item);
            }
            pSender() {
                return React.createElement("div", { className: "Hc-list-item  " },
                    React.createElement("ul", { className: "nav nav-tabs clearfix" }, this.props.Vm.PickList.map((item, index) => {
                        return React.createElement("li", { key: index, className: "nav-item Hu-pointer Hc-multi-selector pull-left   " + (item.IsSelect ? "Hz-selected" : "") },
                            React.createElement("a", { onClick: () => { this.li_clickFun(item); } },
                                item.Text,
                                item.IsSelect ? React.createElement("em", null) : null,
                                item.IsSelect ? React.createElement("i", { className: "icon-ok fa fa-check" }) : null));
                    })));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
        }
        PickListBaseDom.PickListBaseDomReact = PickListBaseDomReact;
        class PickListBaseDomVm extends domCore.DomVm {
            constructor(config) {
                super(config);
                this.ReactType = PickListBaseDomReact;
                this.PickList = [];
                this.SelectPickList = [];
                if (config) {
                    if (config.UniId) {
                        this.UniId = config.UniId;
                        if (!this.IsHasEvent) {
                            this.IsHasEvent = true;
                            this.fRegAppEvent();
                        }
                    }
                }
            }
            addSelect(item) {
                var _res = this.SelectPickList.filter((a) => {
                    return a.Key == item.Key;
                });
                if (_res.length == 0) {
                    // alert(window["xxx"].PickItemList);
                    this.SelectPickList.push(item);
                    // alert(window["xxx"].PickItemList);
                    // alert(window["xxx"].PickItemList == this.SelectPickList);
                }
            }
            regAppEvent() {
                if (!this.IsHasEvent) {
                    if (this.UniId) {
                        this.IsHasEvent = true;
                        this.pRegAppEvent();
                    }
                }
            }
            pRegAppEvent() {
                this.fRegAppEvent();
            }
            fRegAppEvent() {
                this.listenAppEvent("PickDom-SetSelect", this.UniId, (keys) => {
                    this.PickList.forEach((i) => {
                        if (keys.indexOf(i.Key) >= 0) {
                            i.IsSelect = true;
                        }
                    });
                });
                this.listenAppEvent("pickerContainerDelItem", this.UniId, (k) => {
                    var _index = -1;
                    this.PickList.forEach((r, i) => {
                        if (r.Key == k) {
                            r.IsSelect = false;
                        }
                    });
                    this.removeSelect(k);
                    this.forceUpdate("");
                    // this.emitAppEvent("pickerContainerDelItemForce", this.UniId);
                });
            }
            removeSelect(k) {
                var _index = -1;
                this.SelectPickList.forEach((r, i) => {
                    if (r.Key == k) {
                        _index = i;
                    }
                });
                if (_index >= 0) {
                    this.SelectPickList.splice(_index, 1);
                }
            }
            sysLoadDom(items, callback) {
                this.loadDom(items, callback);
            }
            loadDom(items, callback) {
                this.PickList = [];
                for (var i = 0; i < 100; i++) {
                    var _item = { Text: "文本项" + i, Key: "key" + i, IsSelect: false };
                    if (items.filter((a) => a.Key == _item.Key).length > 0) {
                        _item.IsSelect = true;
                    }
                    this.PickList.push(_item);
                }
                this.IsChange = true;
                callback();
            }
            addItem(item) {
                if (!item.IsSelect) {
                    item.IsSelect = true;
                    this.addSelect({ Text: item.Text, Key: item.Key });
                    this.forceUpdate("");
                    this.emitAppEvent("pickerContainerAddItem", this.UniId, { Text: item.Text, Key: item.Key });
                }
                else {
                    item.IsSelect = false;
                    this.removeSelect(item.Key);
                    this.forceUpdate("");
                    this.emitAppEvent("pickerContainerDelItem", this.UniId, item.Key);
                }
            }
            pDispose() {
                super.pDispose();
            }
        }
        PickListBaseDom.PickListBaseDomVm = PickListBaseDomVm;
        class PickListBaseDomStates extends domCore.DomStates {
        }
        PickListBaseDom.PickListBaseDomStates = PickListBaseDomStates;
        class PickListBaseDomProps extends domCore.DomProps {
        }
        PickListBaseDom.PickListBaseDomProps = PickListBaseDomProps;
    })(PickListBaseDom = exports.PickListBaseDom || (exports.PickListBaseDom = {}));
});
//# sourceMappingURL=PickListBaseDom.js.map