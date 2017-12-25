define(["require", "exports", "01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var TabDom;
    (function (TabDom) {
        class TabDomAction extends domCore.DomAction {
        }
        TabDom.TabDomAction = TabDomAction;
        class TabDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new TabDomStates();
            }
            pSender() {
                return React.createElement("div", null,
                    React.createElement("div", { className: "Hm-workflow-tab clearfix YSm-tab" },
                        React.createElement("ul", { className: "nav nav-tabs pull-left" }, this.props.Vm.TabDomItemList.map((item, index) => {
                            return React.createElement("li", { key: index, className: "nav-item Hu-pointer" + (item.IsActive ? " active" : " "), onClick: () => { this.fun_TabsClick(item); } },
                                this._tDom(item.TitleDomObj),
                                item.Title);
                        })),
                        React.createElement("ul", { className: "nav nav-pills pull-right hide" },
                            React.createElement("li", { className: "nav-item" },
                                React.createElement("i", { className: "Hu-pointer icon-repeat fa fa-repeat" })),
                            React.createElement("li", { className: "nav-item" },
                                React.createElement("i", { className: "Hu-pointer" + ("icon-" + (this.props.Vm.IsHide ? "chevron-up " : "chevron-down ")) + ("fa fa-" + (this.props.Vm.IsHide ? "chevron-up " : "chevron-down ")), onClick: () => { this.fun_WorkShow(); } })),
                            React.createElement("li", { className: "nav-item" },
                                React.createElement("i", { className: "Hu-pointer  icon-resize-full fa fa-expand" })))),
                    React.createElement("div", { className: (this.props.Vm.IsHide ? "hide" : "") }, this.props.Vm.TabDomItemList.map((item, index) => {
                        return React.createElement("div", { key: index, className: "tab-content " + (item.IsActive ? "" : " hide") }, this._tDom(item.DomObj, { nullNode: React.createElement("span", null,
                                React.createElement("i", { className: "icon-spinner icon-spin a  fa  fa-spinner fa-spin " }),
                                "\u7B49\u5F85\u8F7D\u5165\u9009\u9879\u5361...") }));
                    })));
            }
            fun_TabsClick(item) {
                this.props.Vm.tabActive(item);
                this.forceUpdate();
            }
            fun_WorkShow() {
                this.props.Vm.IsHide = !this.props.Vm.IsHide;
                this.forceUpdate();
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
        }
        TabDom.TabDomReact = TabDomReact;
        //  @decorator.setDecoratorCon("标签页")
        class TabDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = TabDomReact;
                //    @decorator.setDecoratorProps("是否隐藏","boolean","false")
                this.IsHide = false;
                if (config) {
                    if (config.Items) {
                        this.TabDomItemList = config.Items;
                        if (this.TabDomItemList) {
                            this.TabDomItemList.forEach((a, i) => { a.Index = i; });
                        }
                    }
                }
            }
            tabActive(item) {
                this.TabDomItemList.forEach((n) => {
                    n.IsActive = false;
                });
                item.IsActive = true;
                if (item.ReloadFun) {
                    item.ReloadFun(item);
                }
                item.IsNoFirst = true;
                this.emitAppEvent("TabDomItemVm", "TabDomItemVm", item.Name);
            }
        }
        TabDom.TabDomVm = TabDomVm;
        class TabDomStates extends domCore.DomStates {
        }
        TabDom.TabDomStates = TabDomStates;
        class TabDomProps extends domCore.DomProps {
        }
        TabDom.TabDomProps = TabDomProps;
    })(TabDom = exports.TabDom || (exports.TabDom = {}));
});
//# sourceMappingURL=TabDom.js.map