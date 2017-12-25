define(["require", "exports", "01core/0Dom", "01core/Util", "react", "react-dom", "01core/Event"], function (require, exports, domFile, utilFile, React, ReactDOM, eventFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var GooFlowDom;
    (function (GooFlowDom) {
        class GooFlowDomAction extends domCore.DomAction {
        }
        GooFlowDom.GooFlowDomAction = GooFlowDomAction;
        class GooFlowDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.isUpdate = false;
                this.state = new GooFlowDomStates();
            }
            pSender() {
                // this.fGooFlowInit();
                return React.createElement("div", { className: "Hu-gooflow pull-left" },
                    React.createElement("div", { id: "GooFlowDom" },
                        React.createElement("div", null, "\u6B63\u5728\u8F7D\u5165GooFlowDom\u7684\u7EC4\u4EF6......"),
                        React.createElement("div", null, this.fError ? React.createElement("span", null, this.fError) : "")));
            }
            fGooFlowInit() {
                this.fError = null;
                var __this = this;
                var _$dom = $(ReactDOM.findDOMNode(this)).find("#GooFlowDom");
                if (_$dom.length > 0) {
                    _$dom.html("");
                    // var GooFlow = this.props.Vm.GooFlowObj;
                    utilFile.Core.Util.AsyncJs([
                        "/AtawStatic/lib/03Extend/gooFlow/js/GooFlow.css",
                        "/AtawStatic/lib/03Extend/gooFlow/js/GooFlow.js", "/AtawStatic/lib/03Extend/gooFlow/js/GooFunc.js"
                    ], () => {
                        try {
                            var remark = {
                                cursor: "选择指针",
                                direct: "结点连线",
                                start: "入口结点",
                                "end": "结束结点",
                                "task": "任务结点",
                                node: "自动结点",
                                chat: "决策结点",
                                state: "状态结点",
                                plug: "附加插件",
                                fork: "分支结点",
                                "join": "联合结点",
                                recombination: "复合结点",
                                group: "组织划分框编辑开关"
                            };
                            var op = {
                                height: this.fSetHeight(), width: this.props.Vm.WorkWidth,
                                toolBtns: ["start", "end", "task", "node", "fork"],
                                haveHead: true,
                                headBtns: ["new", "undo", "redo", "reload"],
                                haveTool: true,
                                // haveGroup: true,
                                useOperStack: true
                            };
                            var GooFlow = $["createGooFlow"]($("#GooFlowDom"), op);
                            this.props.Vm.GooFlowObj = GooFlow;
                            GooFlow.setNodeRemarks(remark);
                            if (this.props.Vm.GooFlowData) {
                                GooFlow.clearData();
                                GooFlow.loadData(this.props.Vm.GooFlowData);
                            }
                            GooFlow;
                            GooFlow.onBtnNewClick = () => {
                                this.props.Vm.newFlow("", "newflow");
                            };
                            GooFlow.onFreshClick = () => {
                                location.reload();
                            };
                            GooFlow.onItemFocus = (id, type) => {
                                this.props.Vm.clickStep(id, type);
                                return true;
                            };
                            GooFlow.onItemDel = (id, type) => {
                                this.props.Vm.delItem(id, type);
                                return true;
                            };
                            GooFlow.onItemAdd = (id, type, json) => {
                                this.props.Vm.addItem(id, type, json);
                                return true;
                            };
                            GooFlow.onLinePointMove = (id, newStart, newEnd) => {
                                this.props.Vm.linePointMove(id, newStart, newEnd);
                                return true;
                            };
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
            }
            fSetHeight() {
                var _n = $(window).height() - $(".ACT-HEADER-BODY").height() - $(".Hu-breadcrumb").height() - 80;
                return _n;
            }
            pComponentDidMount() {
                super.pComponentDidMount();
                this.fGooFlowInit();
            }
            pComponentDidUpdate(prevProps, prevState, prevContext) {
                super.pComponentDidUpdate(prevProps, prevState, prevContext);
                if (this.props.Vm.IsChange) {
                    this.fGooFlowInit();
                    this.props.Vm.IsChange = false;
                }
            }
            ;
        }
        GooFlowDom.GooFlowDomReact = GooFlowDomReact;
        class GooFlowDomVm extends domCore.DomVm {
            // public IsUpdate: boolean = false;
            constructor(config) {
                super();
                this.ReactType = GooFlowDomReact;
                this.UniId = eventFile.App.getUniId().toString();
                if (config) {
                    if (config.GooFlowData) {
                        this.GooFlowData = config.GooFlowData;
                    }
                    if (config.WorkHeight) {
                        this.WorkHeight = config.WorkHeight;
                    }
                    if (config.WorkWidth) {
                        this.WorkWidth = config.WorkWidth;
                    }
                    if (config.UniId) {
                        this.UniId = config.UniId;
                    }
                }
            }
            delItem(id, type) {
                this.emitAppEvent("GooFlowDom-Del", this.UniId, type, id);
                return true;
            }
            addItem(id, type, json) {
                var _obj = { id: id, type: type, json: json };
                this.emitAppEvent("GooFlowDom-Add", this.UniId, _obj);
                return true;
            }
            clickStep(id, type) {
                var _obj = { id: id, type: type };
                this.emitAppEvent("GooFlowDom-ItemClick", "GooFlowDom-ItemClick", _obj);
            }
            linePointMove(id, newStart, newEnd) {
                var _obj = { Id: id, newStartId: newStart, newEndId: newEnd };
                this.emitAppEvent("GooFlowDom-LinePointMove", "GooFlowDom-LinePointMove", _obj);
            }
            newFlow(type, flowType) {
                this.emitAppEvent("FlowDesignerPage", "FlowDesignerPage", type, flowType);
            }
            setName() {
                this.listenAppEvent("GooFlowDom-NameChange", this.UniId, (id, name, type) => {
                    this.GooFlowObj.setName(id, name, type);
                });
            }
            mark() {
                this.listenAppEvent("GooFlowDom-Mark", "GooFlowDom-Mark", (id, type, bool) => {
                    this.GooFlowObj.markItem(id, type, bool);
                });
            }
            clearData() {
                this.GooFlowObj.clearData();
            }
        }
        GooFlowDom.GooFlowDomVm = GooFlowDomVm;
        class GooFlowDomStates extends domCore.DomStates {
        }
        GooFlowDom.GooFlowDomStates = GooFlowDomStates;
        class GooFlowDomProps extends domCore.DomProps {
        }
        GooFlowDom.GooFlowDomProps = GooFlowDomProps;
    })(GooFlowDom = exports.GooFlowDom || (exports.GooFlowDom = {}));
});
//# sourceMappingURL=GooFlowDom.js.map