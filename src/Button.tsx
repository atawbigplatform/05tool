
import domFile = require("01core/0Dom");
import iocFile = require("01core/Ioc");
import utilFile = require("01core/Util");

import React = require("react");
import ReactDOM = require("react-dom");
import decoratorFile = require("01core/Decorator");
import decorator = decoratorFile.Decorator.Decorator;
export module ui {

    export class ButtonAction extends domFile.Core.DomAction {

    }
    export class ButtonReact extends domFile.Core.DomReact<ButtonProps, ButtonStates, ButtonAction>{

        

        public pSender(): React.ReactElement<any> {
            var _fa = this.props.Vm.FaCss != "" ? ("fa fa-" + this.props.Vm.FaCss ) : " ";

            var _icon = this.props.Vm.IconCss != "" ? ("icon-" + this.props.Vm.IconCss ) : " ";

            return <a
                className={("  " + (this.props.Vm.IsNoBg ? "" : "btn ") + " Hu-pointer " + this.props.Vm.KindCss + (this.props.Vm.NoEnable ? " Hs-btn-disabled " :" checked"))}
                onClick = {
                        () => {
                            if (!this.props.Vm.NoEnable) {
                                this.props.Vm.ClickFun(this.props.Vm);
                            }
                            else {
                                alert("该按钮不可用");
                            };
                            return false; 
                         }
                }> <i className={(_icon + " "+ _fa)}></i>
                    {this.props.Vm.DisplayName}
                </a>;
        };


    }
    export class ButtonBoxReact extends domFile.Core.DomReact<ButtonProps, ButtonStates, ButtonAction>{

        public pSender(): React.ReactElement<any> {
            return <li className="Hu-btn-list " onClick={() => {
                        if (!this.props.Vm.NoEnable) {
                            this.props.Vm.ClickFun(this.props.Vm);
                        }
                        else {
                            alert("该按钮不可用");
                        };
                        return false;
                    }
                }>{this.props.Vm.DisplayName}
            </li>;
        };

        public pBoxSender(): React.ReactElement<any> {
            return
        }


    }
    export interface IButtonVmConfig {
        Name?: string;
        DisplayName?: string;
        FaCss?: string;
        IconCss?: string;
        KindCss?: string;
        NoEnable?: boolean;
        ClickFun?: Function;
        Right?: string;
        IsData?: boolean;
        IsNoBg?: boolean;
    }


  //  @decorator.setDecoratorCon("按钮")
    export class ButtonVm extends domFile.Core.DomVm {

        public ButtonBoxReact(): React.ReactElement<any> {
            return this.intoDomR(ButtonBoxReact);
        }
        public ReactType = ButtonReact;

    //    @decorator.setDecoratorProps("小标题", "", "允许只输入部分字符串，根据这部分字符串自动搜索和匹配。")
        public Subtext: string;
    //    @decorator.setDecoratorProps("何时使用", "", "◇ 适用于各种数据的快速检索")
        public WUse: string;
     //   @decorator.setDecoratorProps("如何使用", "", "1.引入组件  import searchFile = require(\"./../../05tool/05tool/ SearchDom / SearchListDom\");")
        public HUse: string;
        
        public Name: string;

     //   @decorator.setDecoratorProps("按钮名称", "string")
        public DisplayName: string;

    //    @decorator.setDecoratorProps("自定义图标样式名fa-", "string")
        public FaCss: string = "";

    //    @decorator.setDecoratorProps("自定义图标样式名icon-", "string")
        public IconCss: string = "";

    //    @decorator.setDecoratorProps("是否禁用", "boolean")
        public NoEnable: boolean;

    //    @decorator.setDecoratorProps("自定义按钮样式名", "string","btn-sm")
        public KindCss: string = "btn-sm";
        public ClickFun: Function;
        public Right: string;
        public IsData: boolean;
        public IsNoBg: boolean;

        public constructor(config?: IButtonVmConfig) {
            super();
            if (config) {
                if (config.Name) {
                    this.Name = config.Name;
                }
                if (config.DisplayName) {
                    this.DisplayName = config.DisplayName;
                }
                if (config.FaCss) {
                    this.FaCss = config.FaCss;
                }
                if (config.FaCss) {
                    this.FaCss = config.FaCss;
                }
                if (config.IconCss) {
                    this.IconCss = config.IconCss;
                }
                if (config.NoEnable) {
                    this.NoEnable = config.NoEnable;
                }               
                if (config.KindCss) {
                    this.KindCss = config.KindCss;
                }
                if (config.ClickFun) {
                    this.ClickFun = config.ClickFun;
                } 
                if (config.Right) {
                    this.Right = config.Right;
                }
                if (config.IsData) {
                    this.IsData = config.IsData;
                }
                if (config.IsNoBg) {
                    this.IsNoBg = config.IsNoBg;
                }
            }
        }
    }


    export class ButtonProps extends domFile.Core.DomProps<ButtonVm>{




    }
    export class ButtonStates extends domFile.Core.DomStates {




    }
}