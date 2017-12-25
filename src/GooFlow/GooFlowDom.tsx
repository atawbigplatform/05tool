
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import eventFile = require("01core/Event");
export module GooFlowDom {
    export class GooFlowDomAction extends domCore.DomAction {
    }


    export class GooFlowDomReact extends domCore.DomReact<GooFlowDomProps, GooFlowDomStates, GooFlowDomAction> implements domCore.IReact {

        private isUpdate: boolean = false;

        public state = new GooFlowDomStates();

        public pSender(): React.ReactElement<any> {

           // this.fGooFlowInit();

            return <div className="Hu-gooflow pull-left">
                <div id="GooFlowDom" >
                    <div>正在载入GooFlowDom的组件......</div>
                    <div>{this.fError ? <span>{this.fError}</span> : ""}</div>
                </div>
            </div>;
        }



        private fError: string;
        private fGooFlowInit() {
            this.fError = null;
            var __this = this;
            var _$dom = $(ReactDOM.findDOMNode(this)).find("#GooFlowDom");
            if (_$dom.length > 0) {
                _$dom.html("");
                // var GooFlow = this.props.Vm.GooFlowObj;
                utilFile.Core.Util.AsyncJs([
                    "/AtawStatic/lib/03Extend/gooFlow/js/GooFlow.css",
                    "/AtawStatic/lib/03Extend/gooFlow/js/GooFlow.js", "/AtawStatic/lib/03Extend/gooFlow/js/GooFunc.js"],
                    () => {

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
                                headBtns: ["new", "undo", "redo", "reload"], //如果haveHead=true，则定义HEAD区的按钮
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
                            GooFlow
                            GooFlow.onBtnNewClick = () => {
                                this.props.Vm.newFlow("","newflow");
                            };
                            GooFlow.onFreshClick = () => {
                                location.reload();
                            }
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
        protected pInstall() {
            super.pInstall();
        }

        private fSetHeight() {
            var _n = $(window).height() - $(".ACT-HEADER-BODY").height() - $(".Hu-breadcrumb").height() - 80;
            return _n;
        }

        protected pComponentDidMount(): void {
            super.pComponentDidMount();
            this.fGooFlowInit();
        }

        protected pComponentDidUpdate(prevProps: GooFlowDomProps, prevState: GooFlowDomStates, prevContext: any): void {
            super.pComponentDidUpdate(prevProps, prevState, prevContext);
            if (this.props.Vm.IsChange) {
                this.fGooFlowInit();
                this.props.Vm.IsChange = false;
            }
        };

    }

    export interface IReactGooFlowDomVm extends domCore.DomVm {
        GooFlowObj: any;
        GooFlowData: any;
        WorkHeight: number;
        WorkWidth: number;
        clickStep(name: string, type: string);
        delItem(id: string, type: string);
        addItem(id: string, type: string, json: any);
        newFlow(type,flowType);
        linePointMove(id: string, newStart: string, newEnd: string);
        IsChange: boolean;
        setName();
        clearData();
        mark();


    }

    export interface IGooFlowDomConfig {
        GooFlowData?: any
        WorkHeight?: number;
        WorkWidth?: number;
        UniId?: string;
    }

    export interface IItemName {
        id: string;
        type: string;
        json?: any;
    }

    export interface IMoveLine {
        Id: string;
        newStartId: string;
        newEndId:string;
    }

    export interface IItemReName {
        id: string;
        type: string;
        name: string;

    }

    export class GooFlowDomVm extends domCore.DomVm implements IReactGooFlowDomVm {
        public ReactType = GooFlowDomReact;
        public GooFlowObj: any;
        public GooFlowData: any;
        public WorkHeight: number;
        public WorkWidth: number;
       // public IsUpdate: boolean = false;

        public constructor(config?: IGooFlowDomConfig) {
            super();
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
                if (config.UniId)
                {
                    this.UniId = config.UniId;
                }
               
            }

            

        }

        public delItem(id: string, type: string) {
            this.emitAppEvent("GooFlowDom-Del", this.UniId, type, id);
            return true;
        }

        public addItem(id: string, type: string, json: any) {
            var _obj: IItemName = { id: id, type: type, json: json };
            this.emitAppEvent("GooFlowDom-Add", this.UniId, _obj);
            return true;
        }

        public clickStep(id: string, type: string) {
            var _obj: IItemName = { id: id, type: type };
            this.emitAppEvent("GooFlowDom-ItemClick", "GooFlowDom-ItemClick", _obj);
        }

        public linePointMove(id: string, newStart: string, newEnd: string) {
            var _obj: IMoveLine = { Id: id, newStartId: newStart, newEndId: newEnd };
            this.emitAppEvent("GooFlowDom-LinePointMove", "GooFlowDom-LinePointMove", _obj);
        }

        public newFlow(type,flowType) {
            this.emitAppEvent("FlowDesignerPage", "FlowDesignerPage", type,flowType);
        }
        public setName() {
            this.listenAppEvent("GooFlowDom-NameChange", this.UniId, (id, name, type) => {
                this.GooFlowObj.setName(id,name,type);
            })
        }
        public mark() {
            this.listenAppEvent("GooFlowDom-Mark", "GooFlowDom-Mark", (id, type, bool) => {
                this.GooFlowObj.markItem(id, type, bool);
            })
        }
        public clearData() {
            this.GooFlowObj.clearData();
        }

    }

    export class GooFlowDomStates extends domCore.DomStates {
    }

    export class GooFlowDomProps extends domCore.DomProps<IReactGooFlowDomVm>{
    }



}


