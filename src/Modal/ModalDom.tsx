import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import decoratorFile = require("01core/Decorator");
import decorator = decoratorFile.Decorator.Decorator;

export module ModalDom {
    export class ModalDomAction extends domCore.DomAction {
    }

    export class ModalDomReact extends domCore.DomReact<ModalDomProps, ModalDomStates, ModalDomAction> implements domCore.IReact {

        public state = new ModalDomStates();
        //protected pIsSetScreenHeight: boolean = true;
       

        private open_fun() {
            this.props.Vm.open();
        } 
        private close_fun() {
            this.props.Vm.close();
        } 

        private setStyle(): any {
            if (this.props.Vm.Width) {
                return { width: this.props.Vm.Width, top: this.props.Vm.ModalTop.toString() + 'px', height: this.props.Vm.ModalHeight };
            }
            return { top: this.props.Vm.ModalTop.toString() + 'px' };
        }

        private getZindexStyle()
        {
            if (this.props.Vm.Zindex) {
                return { zIndex: this.props.Vm.Zindex };
            }
            else
                return {};
        }
        public pSender(): React.ReactElement<any> {
            return <div>
                <div className={(!this.props.Vm.IsDebug ? "hide" : "")}><button onClick={() => { this.open_fun(); }}>弹出</button></div>
                <div className={"  Hm-modals-bg Hg-width Hg-max-width  Hc-control-modal " + (this.props.Vm.IsModalShow ? "show ACT-HAS-MPDAL " : "hide")} style={this.getZindexStyle()}>
                    <div
                        className={"Hm-modals Hg-relative Hg-default-top Hm-modals-shape  Hs-fff  " + (this.props.Vm.IsModalShow ? "show Hf-overflow " : "hide ") + (this.props.Vm.ClassName ? this.props.Vm.ClassName : "") }
                        style={this.setStyle()}>
                        
                        <div className="Hu-naiv">
                            {this.props.Vm.Title ? <h3 className="Hu-modals-title pull-left">{this.props.Vm.Title}</h3> : null}
                            <a className=" Hu-close Hu-pointer pull-right" onClick={() => { this.close_fun(); } }>
                                <i className="icon-remove fa fa-close Hu-pointer "></i>
                            </a>
                        </div>   
                        <div className="ACT-MODAL-CONTENT Hm-modals-content">{this._tDom(this.props.Vm.DomObj, { nullNode: <span > <i className="icon-spinner icon-spin fa  fa-spinner fa-spin "></i>等待载入内容</span> }) }</div>
                    </div>
                   
                </div>
            </div>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();
            if ($(".ACT-HAS-MPDAL").length > 0) {
                $("body").addClass("Hf-overflow ");
            } 

            $(window).resize(() => {
                this.setWidth();
            });
            this.setWidth();
            
            
        }

        private setWidth()
        {
            var _dom = this.pGetDom();
            if (_dom) {
                var _$dom = $(_dom).find(".ACT-MODAL-CONTENT");
                // _$dom.children(".Hc-modals-list").height($(window).height() - 60 - 30 - 30);
                // _$dom.children(".Hc-modals-list").addClass("Hg-overflow-auto");
                if (this.props.Vm.ModalHeight) {
                     _$dom.css("height","auto");
                }
                else {
                     _$dom.css("height", ($(window).height() - 60 - 30 - 30 - 20) * 0.95 + "px").addClass("Hz-scroll Hg-overflow-auto");
                }
               
            }
        }

        protected pInstall(): void {
            super.pInstall();
            if (this.props.Vm.IsModalShow) {
                if ($(".ACT-HAS-MPDAL").length > 0) {
                    $("body").addClass("Hf-overflow ");
                } else {
                   // $("body").addClass("Hf-overflow ");
                }
            }
        }


    }

    export interface IReactModalDomVm extends domCore.DomVm {
        IsModalShow?: boolean;
        ModalTop?: number;
        Title?: string;
        DomObj?: domCore.DomVm;
        ClassName?:string ;

        open();
        close();
        IsDebug?: boolean;
        Width: string;
        Zindex: number;
        ModalHeight: string;
    }

    export interface IModalFun {
        (modal: ModalDomVm, callBack: Function): void;
    }

    export interface IModalDomConfig {
        IsModalShow?: boolean;
        ModalTop?: number;
        Title?: string;
        DomObj?: domCore.DomVm;
        ModalShowingFun?: IModalFun;
        IsDebug?: boolean;
        ClassName?: string;
        UniId?: string;
        ModalCloseFun?: IModalFun;
        Width?: string;
        ModalHeight?: string;
        Zindex?: number;
    }


  //  @decorator.setDecoratorCon("弹出层")
    export class ModalDomVm extends domCore.DomVm implements IReactModalDomVm {
        public ReactType = ModalDomReact;

      //  @decorator.setDecoratorProps("小标题","", "模态对话框")
        public Subtext: string;
      //  @decorator.setDecoratorProps("何时使用","", "◇ 需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面中打开一个浮层，承载相应的操作")
        public WUse: string;
      //  @decorator.setDecoratorProps("如何使用","", "1.引入组件 import modalFile = require(\"./05tool/05tool/Modal/ModalDom\");")
        public HUse: string;

     //   @decorator.setDecoratorProps("是否隐藏","boolean")
        public IsModalShow: boolean;

     //   @decorator.setDecoratorProps("距顶部的高度","number","0")
        public ModalTop: number = 0;

      //  @decorator.setDecoratorProps("标题","string")
        public Title: string;


        public DomObj: domCore.DomVm;
        public ModalShowFun: IModalFun;
        public IsNoFirst: boolean = false;
        public IsDebug: boolean = false;
        public ClassName: string;
        public UniId: string;
        public IsMulit: boolean = true;

      //  @decorator.setDecoratorProps("关闭时，调用的函数","object")
        public ModalCloseFun: IModalFun;
      //  @decorator.setDecoratorProps("宽度","string")
        public Width: string;
        public ModalHeight: string;

      //  @decorator.setDecoratorProps("层级","number")
        public Zindex: number;
        public constructor(config?: IModalDomConfig) {
            super();
            if (config) {
                if (config) {
                    if (config.IsModalShow) {
                        this.IsModalShow = config.IsModalShow;
                    }
                    if (config.ModalTop) {
                        this.ModalTop = config.ModalTop;
                    }
                    if (config.Title) {
                        this.Title = config.Title;
                    }
                    if (config.ModalShowingFun) {
                        this.ModalShowFun = config.ModalShowingFun;
                    }

                    if (config.ModalCloseFun) {
                        this.ModalCloseFun = config.ModalCloseFun;
                    }

                    if (config.IsDebug) {
                        this.IsDebug = config.IsDebug;
                    }
                    if (config.ClassName) {
                        this.ClassName = config.ClassName;
                    }
                    if (config.UniId) {
                        this.UniId = config.UniId;
                        this.listenAppEvent("modal-close", this.UniId, () => {
                            this.close();
                        })
                    }
                    if (config.DomObj) {
                        this.DomObj = config.DomObj;
                    }
                    if (config.Width) {
                        this.Width = config.Width;
                    }
                    if (config.ModalHeight) {
                        this.ModalHeight = config.ModalHeight;
                    }
                    if (config.Zindex) {
                        this.Zindex = config.Zindex;
                    }
                }
            }
        }

        public open() {
          
            this.IsModalShow = true;
            if (this.ModalShowFun) {
                this.ModalShowFun(this, () => {
                    if (!this.IsNoFirst) this.IsNoFirst = true;
                    this.forceUpdate("", () => {
                        if ($(".ACT-HAS-MPDAL").length > 0) {
                            $("body").addClass("Hf-overflow ");
                        } else {
                            $("body").removeClass("Hf-overflow ");
                        }
                    });
                });
            } else {
                if (!this.IsNoFirst) this.IsNoFirst = true;
                this.forceUpdate("", () => {
                    if ($(".ACT-HAS-MPDAL").length > 0) {
                        $("body").addClass("Hf-overflow ");
                    } else {
                        $("body").removeClass("Hf-overflow ");
                    }
                });
            }
           
        }
        public close() {
           // this.listenAppEvent("ModalDom-close", this.UniId);
            this.IsModalShow = false;
            if (this.ModalCloseFun) {
                this.ModalCloseFun(this, () => {
                     
                });
            }
            this.DomObj = null;
            this.forceUpdate("", () => {
                if ($(".ACT-HAS-MPDAL").length > 0) {
                    $("body").addClass("Hf-overflow ");
                } else {
                    $("body").removeClass("Hf-overflow ");
                }
                this.IsChange = true;
            });
        }

    }
    export class ModalDomStates extends domCore.DomStates {
    }


    export class ModalDomProps extends domCore.DomProps<IReactModalDomVm>{
    }



}


