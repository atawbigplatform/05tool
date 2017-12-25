define(["require", "exports", "01core/0Dom", "react", "./../Modal/ModalDom", "./PickerContainer", "./PickProtalBaseDom"], function (require, exports, domFile, React, ModalDomFile, PickerContainerFile, pickProtalBaseDomFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var PickDom;
    (function (PickDom) {
        class PickDomAction extends domCore.DomAction {
        }
        PickDom.PickDomAction = PickDomAction;
        class PickDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new PickDomStates();
            }
            pSender() {
                return React.createElement("div", { className: "clearfix" },
                    " ",
                    React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group Hm-input-group ACT-M-PARENT" },
                        this._tDom(this.props.Vm.PortalNode),
                        this.props.Vm.IsNoBtn ? null : React.createElement("span", { className: "input-group-addon Hu-pointer", onClick: () => { this.openModal_fun(); } },
                            React.createElement("i", { className: "icon-search fa fa-search" })),
                        this._tDom(this.props.Vm.modalObj, { nullNode: React.createElement("span", null,
                                React.createElement("i", { className: "icon-spinner icon-spin fa  fa-spinner fa-spin " }),
                                "\u672A\u80FD\u8F7D\u5165\u5F39\u51FA\u6846\u7EC4\u4EF6") })));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
            openModal_fun() {
                if (this.props.Vm.modalObj) {
                    this.props.Vm.modalObj.open();
                }
                else {
                    alert("没有弹出层组件");
                }
            }
        }
        PickDom.PickDomReact = PickDomReact;
        // @decorator.setDecoratorCon("选取器")
        class PickDomVm extends domCore.DomVm {
            constructor(config) {
                super(config);
                this.ReactType = PickDomReact;
                this.pRegName = "pick";
                if (config) {
                    this.Width = config.Width;
                    if (config.IsSingle) {
                        this.IsSingle = config.IsSingle;
                    }
                    this.IsNoBtn = config.IsNoBtn;
                    if (config.UniId) {
                        this.UniId = config.UniId;
                        if (config.PickItemList) {
                            if (!config.PortalNode) {
                                this.PortalNode = new pickProtalBaseDomFile.PickProtalBaseDom.PickProtalBaseDomVm({
                                    PickItemList: config.PickItemList,
                                    UniId: this.UniId
                                    // Is 
                                });
                            }
                            else {
                                this.PortalNode = config.PortalNode;
                            }
                        }
                        if (config.PickerContainer) {
                            config.PickerContainer.UniId = this.UniId;
                            config.PickerContainer.PickItemList = config.PickItemList;
                            config.PickerContainer.IsSingle = config.IsSingle;
                            this.PickerContainer = new PickerContainerFile.PickerContainer.PickerContainerVm(config.PickerContainer);
                        }
                    }
                    this.modalObj = new ModalDomFile.ModalDom.ModalDomVm({
                        Title: "请选择",
                        Width: this.Width,
                        IsDebug: false,
                        UniId: this.UniId,
                        DomObj: this.PickerContainer,
                        ModalShowingFun: (obj, b) => {
                            if (!obj.DomObj) {
                                // alert("弹出");
                                obj.DomObj = this.PickerContainer;
                                this.PickerContainer.regAppEvent();
                                this.PickerContainer.LeftDomVmObj.regAppEvent();
                            }
                            this.PickerContainer.loadDom(this.PortalNode.PickItemList, b);
                            // b();
                        }
                    });
                    this.listenAppEvent("PickDom-ModalOpen", this.UniId, () => {
                        if (this.modalObj) {
                            this.modalObj.open();
                        }
                        else {
                            alert("没有弹出层组件");
                        }
                    });
                }
                //this.listenAppEvent("pickerContainerDelItemForce", this.UniId, () => {
                //    this.forceUpdate("");
                //})
            }
            pDispose() {
                super.pDispose();
            }
        }
        PickDom.PickDomVm = PickDomVm;
        class PickDomStates extends domCore.DomStates {
        }
        PickDom.PickDomStates = PickDomStates;
        class PickDomProps extends domCore.DomProps {
        }
        PickDom.PickDomProps = PickDomProps;
    })(PickDom = exports.PickDom || (exports.PickDom = {}));
});
//# sourceMappingURL=PickDom.js.map