

import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import modalFile = require("./Modal/ModalDom");
import ModalVm = modalFile.ModalDom.ModalDomVm;
import miniEditorFile = require("./Editor/MiniEditor");
import MiniEditorVm = miniEditorFile.MiniEditor.MiniEditorVm;

export module Htmler {
    export class HtmlerAction extends domCore.DomAction {
    }

    export class HtmlerReact extends domCore.DomReact<HtmlerProps, HtmlerStates, HtmlerAction> implements domCore.IReact {

        public state = new HtmlerStates();

        private fIsBtnShow: boolean = false;


        public pSender(): React.ReactElement<any> {
            return <div
               
              //  onBlur={(e) => { this._hideBtn(); e.stopPropagation(); }}

            >{this._tDom(this.props.Vm.ModalObj)}
                <span style={{ "position": "relative" }}   >
                    <div
                className="ACT-HTML"
                style={this.InputColStyle()}
                contentEditable={true}
                dangerouslySetInnerHTML={{ __html: this.props.Vm.HtmlContent }}
                onFocus={(e) => { this.fIsBtnShow = true; this.forceUpdate(); e.stopPropagation(); }}
                onInput={() => {

                    this._htmlChange();

                }}>

                </div>
                    <div className={"Hu-htmler-btn " + (this.fIsBtnShow ? "" : " hide")}><a className={" fa fa-edit"} onClick={(e) => { this.clickBtn(); e.stopPropagation(); }}></a></div>
                </span>
            </div>;
        }
       
        protected pComponentDidMount() {
            super.pComponentDidMount();

            this._bodyClickFun = (a) => {
                var _$tar = $(a.target);
                let _$html = $(this.pGetDom()).find(".ACT-HTML");
                if (_$tar.parents().is(_$html[0]) || _$tar[0] == _$html[0]) {
                }
                else {
                    this._hideBtn();
                }
               

            };
            $("body").click(this._bodyClickFun);

        }

        private _bodyClickFun: any;

        protected pComponentWillUnmount(): void {
            super.pComponentWillUnmount();
            $("body").unbind("click", this._bodyClickFun);  //需解绑，否则造成内存泄漏

        }


        private _hideBtn() {
            this.fIsBtnShow = false;
            this.forceUpdate();
        }
        private clickBtn() {
            this.fIsBtnShow = false;
            this.props.Vm.ModalObj.open();
            // this.forceUpdate();
            this._hideBtn();
        }


        private InputColStyle(): any {
            return {
                display: "inline-block",
                // position: "relative",
                "min-width": (this.props.Vm.PxWidth ? this.props.Vm.PxWidth : "auto"),
                "min-height": (this.props.Vm.PxHeight ? (this.props.Vm.PxHeight) : "auto")
            }
        }

        private _htmlChange() {
            let _dom = this.pGetDom();
            if (_dom) {
                let _$dom = $(_dom).find(".ACT-HTML");
                //alert(_$dom.html());
                this.props.Vm.HtmlContent = _$dom.html();
                this.props.Vm.change();
            }
        }


    }

    export interface IReactHtmlerVm extends domCore.DomVm {
        HtmlContent: string;
        change();
        ModalObj: ModalVm;
    }

    export interface IHtmlerConfig extends domCore.IDomVmConfig {
        HtmlContent: string;

    }

    export class HtmlerVm extends domCore.DomVm implements IReactHtmlerVm {
        public ReactType = HtmlerReact;
        public ModalObj: ModalVm;
        public HtmlContent: string;


        public constructor(config?: IHtmlerConfig) {
            super(config);
            if (config) {
                this.HtmlContent = config.HtmlContent;
            }
            this.ModalObj = new ModalVm();
            this.ModalObj.Width = "50%";
            this.ModalObj.ModalShowFun = (a) => {
                this.ModalObj.DomObj = new MiniEditorVm({ Content: this.HtmlContent });
                this.ModalObj.DomObj.getEmit().on("MiniEditorVm-sure-btn", (val: string) => {
                    this.setHtmlByModal(val);
                });
            };
            this.ModalObj.ModalCloseFun = (a) => {
                if (this.ModalObj.DomObj)
                this.ModalObj.DomObj.dispose();
            };
        }

        public change() {
            this.getEmit().emit("htmlerChange");
            // this.
        }

        private setHtmlByModal(val: string) {
            this.HtmlContent = val;
            this.ModalObj.close();
            this.forceUpdate("", () => {
                this.change();
            });
            
        }



    }
    export class HtmlerStates extends domCore.DomStates {
    }


    export class HtmlerProps extends domCore.DomProps<IReactHtmlerVm>{
    }



}


