

import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

export module MiniEditor {
    export class MiniEditorAction extends domCore.DomAction {
    }

    export class MiniEditorReact extends domCore.DomReact<MiniEditorProps, MiniEditorStates, MiniEditorAction> implements domCore.IReact {

        public state = new MiniEditorStates();

        private fIsSourceCode: boolean;

        public pSender(): React.ReactElement<any> {
            return <div >
                <div className="btn-group m-b m-t">
                    <a className="btn btn-default btn-sm" onClick={() => { this._btnClick(); }}>确定</a>
                    <a className={"btn btn-sm " + (this.fIsSourceCode ? "btn-primary" :"btn-default")} onClick={() => { this._togglrSource(); }}>{this.fIsSourceCode ? "设计" : "源码"}</a>
                
                </div>                   
                <textarea value={this.props.Vm.Content} onChange={(e) => { this._textChange(e); }} className={(this.fIsSourceCode ? "" : "hide")} style={{"min-height":"332px"}}></textarea>
                    <div className={"ACT-HTML-Editor " + (this.fIsSourceCode ? "hide" : "") } ></div>
                 </div>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }

        private _btnClick()
        {
            this.props.Vm.sureContent();
        }
        private _togglrSource()
        {
            this.fIsSourceCode = !this.fIsSourceCode;
            if (this._EditorObj)
                this._EditorObj.txt.html(this.props.Vm.Content);
            this.forceUpdate();
        }

        private _textChange(e)
        {
            let _val = e.target["value"];
            this.props.Vm.Content = _val;
            this.forceUpdate(() => {
               
            });
        }

        private _EditorObj: any;

        protected pDomLoad(): void{
            super.pDomLoad();
            let _dom = this.pGetDom();
            utilFile.Core.Util.AsyncJs(["/AtawStatic/lib/03Extend/wangEditor/wangEditor.css"], () => {
                utilFile.Core.Util.AsyncJs(
                    [
                        "/AtawStatic/lib/03Extend/wangEditor/wangEditor.js"

                    ], (wang) => {
                       
                        let _editor = new wang($(_dom).find(".ACT-HTML-Editor")[0]);
                        this._EditorObj = _editor;
                        _editor.customConfig.onchange =  (html)=> {
                            // html 即变化之后的内容
                            // console.log(html)
                            this.props.Vm.Content = html;
                        }
                        _editor.create();
                        _editor.txt.html(this.props.Vm.Content);
                        
                    });
            });
            
       }


    }

    export interface IReactMiniEditorVm extends domCore.DomVm {
        Content?: string;
        sureContent();
    }

    export interface IMiniEditorConfig extends domCore.IDomVmConfig {
        Content?: string;

    }

    export class MiniEditorVm extends domCore.DomVm implements IReactMiniEditorVm {
        public ReactType = MiniEditorReact;
        public Content: string;

        public constructor(config?: IMiniEditorConfig) {
            super(config);
            if (config) {
                this.Content = config.Content;
            }
        }

        public sureContent()
        {
            this.getEmit().emit("MiniEditorVm-sure-btn", this.Content);
        }

    }
    export class MiniEditorStates extends domCore.DomStates {
    }


    export class MiniEditorProps extends domCore.DomProps<IReactMiniEditorVm>{
    }



}


