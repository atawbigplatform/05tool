import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react/react-dom.d.ts" />
import React = require("react");
import ReactDOM = require("react-dom");
import decoratorFile = require("01core/Decorator");
import decorator = decoratorFile.Decorator.Decorator;
export module TabDom {
    export class TabDomAction extends domCore.DomAction {
    }

    export class TabDomReact extends domCore.DomReact<TabDomProps, TabDomStates, TabDomAction> implements domCore.IReact {

        public state = new TabDomStates();

        public pSender(): React.ReactElement<any> {
            return <div>
                <div className="Hm-workflow-tab clearfix YSm-tab">
                    <ul className="nav nav-tabs pull-left">
                        {
                            this.props.Vm.TabDomItemList.map((item,index) => {
                                return <li key={index}
                                    className={"nav-item Hu-pointer" + (item.IsActive ? " active" : " ")}
                                    onClick={() => { this.fun_TabsClick(item); } }>
                                    {this._tDom(item.TitleDomObj)}
                                    {item.Title}
                                </li>
                            })
                        }

                    </ul>
                    <ul className="nav nav-pills pull-right hide">
                        <li className="nav-item"><i className="Hu-pointer icon-repeat fa fa-repeat"></i></li>
                        <li className="nav-item"><i className={"Hu-pointer" + ("icon-" + (this.props.Vm.IsHide ? "chevron-up " : "chevron-down ")) + ("fa fa-" + (this.props.Vm.IsHide ? "chevron-up " : "chevron-down ")) } onClick={() => { this.fun_WorkShow() } }></i></li>
                        <li className="nav-item"><i className="Hu-pointer  icon-resize-full fa fa-expand"></i></li>
                    </ul>
                </div>
                <div className={(this.props.Vm.IsHide ? "hide" : "") }>
                    {
                        this.props.Vm.TabDomItemList.map((item,index) => {
                            return <div key={index} className={"tab-content " + (item.IsActive ? "" : " hide") }>{ this._tDom(item.DomObj, { nullNode: <span><i className="icon-spinner icon-spin a  fa  fa-spinner fa-spin "></i>等待载入选项卡...</span> }) }</div>;
                        })
                    }
                </div>
            </div>;
        }

        private fun_TabsClick(item: ITabDomItem) {
            this.props.Vm.tabActive(item);
            this.forceUpdate();
        }
        private fun_WorkShow() {
            this.props.Vm.IsHide = !this.props.Vm.IsHide;
            this.forceUpdate();
        }

        protected pComponentDidMount() {
            super.pComponentDidMount();

        }


    }

    export interface ITabDomItem {
        Name?: string;
        Title: string;
        DomObj: domCore.DomVm;
        IsActive?: boolean;
        LoadKind?: string;
        ReloadFun?: IReloadFun;
        IsNoFirst?: boolean;
        TitleDomObj?: domCore.DomVm;
        Index?: number;
    }

  

    export interface IReloadFun {
        (item: ITabDomItem): void;
    }

    export interface ITabDomConfig {
        Items: ITabDomItem[];
    }



  //  @decorator.setDecoratorCon("标签页")
    export class TabDomVm extends domCore.DomVm {
        public ReactType = TabDomReact;

     //   @decorator.setDecoratorProps("小标题", "","选项卡切换组件")
        public Subtext: string;
    //    @decorator.setDecoratorProps("何时使用","", "◇ 提供平级的区域将大块内容进行显示和隐藏，保持界面整洁")
        public WUse: string;
    //    @decorator.setDecoratorProps("如何使用", "","")
        public HUse: string;

        public TabDomItemList: ITabDomItem[];
    //    @decorator.setDecoratorProps("是否隐藏","boolean","false")
        public IsHide: boolean = false;
        
        public constructor(config?: ITabDomConfig) {
            super();
            if (config) {
                if (config.Items) {
                    this.TabDomItemList = config.Items;
                    if (this.TabDomItemList) {
                        this.TabDomItemList.forEach((a, i) => { a.Index = i; });
                    }
                }
            }           
        }

        public tabActive(item: ITabDomItem)
        {
            this.TabDomItemList.forEach((n) => {
                n.IsActive = false;
            });
            item.IsActive = true;
            
            if (item.ReloadFun) {
                item.ReloadFun(item);
            }
            item.IsNoFirst = true;
            this.emitAppEvent("TabDomItemVm", "TabDomItemVm", item.Name)
        }

    }
    export class TabDomStates extends domCore.DomStates {
    }


    export class TabDomProps extends domCore.DomProps<TabDomVm>{
    }



}


