
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

export module MonacoEditor {
    export class MonacoEditorAction extends domCore.DomAction {
    }

    export enum CodeType {
        html = 1,
        csharp,
        xml,
        javascript,
        typescript,
        sql
    }

    export class MonacoEditorReact extends domCore.DomReact<MonacoEditorProps, MonacoEditorStates, MonacoEditorAction> implements domCore.IReact {

        public state = new MonacoEditorStates();

        private getHeight(): number {
            if (this.props.Vm.Height > 0) {
                return this.props.Vm.Height;
            }else
            return $(window).height()-150; //- 8 *30 ;
        }

        private getEdiotrVal_fun() {

            if (this.fEditorObj) {
                var _val: string = this.fEditorObj.getValue();
                let _list:string[] = _val.split('\n');
                this.props.Vm.toggleGetValBtn(_list,_val);
            }

        }

        private setEdiotrVal_fun(str: string) {
            var _s = new Date().getMilliseconds().toString();
            if (this.fEditorObj) {
                this.fEditorObj.setValue(_s);
            }
        }

        private resetEdiotrVal() {
            if (this.fEditorObj) {
                this.fEditorObj.dispose();
            }
            this.fInit();

        }

        private sendButton(): React.ReactElement<any> {
            return <div>
               
                <span className="btn btn-default" onClick={() => { this.resetClick(); }}>重载</span>
            </div>;
        }
        //
        //<span className="btn btn-primary" onClick={() => { this.getEdiotrVal_fun(); }}>获取</span>
        protected pComponentDidUpdate(prevProps: MonacoEditorProps, prevState: MonacoEditorStates, prevContext: any): void {
            super.pComponentDidUpdate(prevProps, prevState, prevContext);
            if (this.fLastContentList != this.props.Vm.ContentList) {
                if (this.fEditorObj) {
                    this.fLastContentList = this.props.Vm.ContentList;
                    this.fEditorObj.setValue(this.props.Vm.ContentList.join('\n'));
                }
            }

        }

        public pSender(): React.ReactElement<any> {
            return <div>
                {this.props.Vm.HasOptButton ? this.sendButton() : null}
                <div className="label label-primary">{CodeType[this.props.Vm.CodeType]}</div>
                <select onChange={(e) => { this.slelectTheme(e) }}><option >vs</option><option>vs-dark</option><option selected={true}>hc-black</option></select>
                <div className="MonacoEditor" style={{ width: "100%", height: this.getHeight(), border: " 1px solid grey" }}>
                </div>
            </div>;
        }

        private slelectTheme(e)
        {
            let _v = $(e.target).val();
           // alert(_v);
            if (this.fEditorObj) {
                window["monaco"].editor.setTheme(_v);
            }

        }

        //HTML, XML, PHP, C#, C++, Razor, Markdown, Diff, Java, VB, CoffeeScript,
        //Handlebars, Batch, Jade, F#, Lua, Powershell,
        //Python, SASS, R, Objective-C

        private fIsInit: boolean = false;

        private fEditorObj: any;

        private fLastContentList: string[];

        private fInit() {
            this.fLastContentList = this.props.Vm.ContentList;
            if (this.fEditorObj) {
                this.fEditorObj.setValue(this.props.Vm.ContentList.join('\n'));
            }
            else {
                var _$dom = $(ReactDOM.findDOMNode(this)).find(".MonacoEditor");
                if (_$dom.length > 0) {
                    _$dom.html("");
                   window["requirejs"] .config({
                        paths: { "vs": "/AtawStatic/lib/03Extend/monaco-editor/min/vs" }
                    });
                    utilFile.Core.Util.AsyncJs([
                        "/AtawStatic/lib/03Extend/monaco-editor/min/vs/loader.js"],
                        () => {

                            window["requirejs"](['vs/editor/editor.main'], () => {

                               //  alert();
                                var editor = window["monaco"].editor.create(_$dom[0], {
                                    value: this.props.Vm.ContentList.join('\n'),
                                    language: this.props.Vm.getCodeTypeStr(),
                                    theme: "vs"
                                });
                                this.fEditorObj = editor;
                                var __this = this;
                                this.fEditorObj.onMouseLeave(function (e) {
                                    __this.getEdiotrVal_fun();
                                });
                            });
                        });
                }
            }
        }

        protected pInstall() {
            super.pInstall();
            if (!this.fIsInit) {
                this.fInit();
                this.fIsInit = true;
            }
        }


        public resetClick() {
            if (this.fEditorObj) {
                this.fEditorObj.setValue(this.props.Vm.ContentList.join('\n'));
                this.getEdiotrVal_fun();
                this.forceUpdate();
            }
        }

        


    }

    export interface IReactMonacoEditorVm extends domCore.DomVm {
        CodeType: CodeType,
        getCodeTypeStr(): string,
        ContentList: string[],
        toggleGetValBtn(val: string[],content:string),
        HasOptButton: boolean;
    }

    export interface IMonacoEditorConfig {
        CodeType?: CodeType;
        ContentList?: string[];
        UniId?: string;
        HasOptButton?: boolean;
        Height?: number;
    }

    export class MonacoEditorVm extends domCore.DomVm implements IReactMonacoEditorVm {
        public ReactType = MonacoEditorReact;
        public CodeType: CodeType = CodeType.javascript;
        public ContentList: string[] = [];
        public HasOptButton: boolean;
        public Height: number = 0;
        public constructor(config?: IMonacoEditorConfig) {
            super();
            if (config) {
                if (config.CodeType) {
                    this.CodeType = config.CodeType;
                }
                if (config.ContentList) {
                    this.ContentList = config.ContentList;
                }
                if (config.UniId) {
                    this.UniId = config.UniId;
                }
                if (config.Height) {
                    this.Height = config.Height;
                }
                this.HasOptButton = config.HasOptButton;
                
            }
        }

        public getCodeTypeStr(): string {
            switch (this.CodeType) {
                case CodeType.csharp:
                    return "c#";
                case CodeType.sql:
                    return "sql";
                default:
                    return CodeType[this.CodeType];
            }
        }

        public toggleGetValBtn(val: string[],content:string) {
            this.ContentList = val;
            if (this.UniId) {
                this.emitAppEvent("toggleGetValBtn", this.UniId, content);
            }
        }

    }
    export class MonacoEditorStates extends domCore.DomStates {
    }


    export class MonacoEditorProps extends domCore.DomProps<IReactMonacoEditorVm>{
    }



}


