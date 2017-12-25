define(["require", "exports", "01core/0Dom", "01core/Util", "react", "react-dom"], function (require, exports, domFile, utilFile, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var MonacoEditor;
    (function (MonacoEditor) {
        class MonacoEditorAction extends domCore.DomAction {
        }
        MonacoEditor.MonacoEditorAction = MonacoEditorAction;
        let CodeType;
        (function (CodeType) {
            CodeType[CodeType["html"] = 1] = "html";
            CodeType[CodeType["csharp"] = 2] = "csharp";
            CodeType[CodeType["xml"] = 3] = "xml";
            CodeType[CodeType["javascript"] = 4] = "javascript";
            CodeType[CodeType["typescript"] = 5] = "typescript";
            CodeType[CodeType["sql"] = 6] = "sql";
        })(CodeType = MonacoEditor.CodeType || (MonacoEditor.CodeType = {}));
        class MonacoEditorReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new MonacoEditorStates();
                //HTML, XML, PHP, C#, C++, Razor, Markdown, Diff, Java, VB, CoffeeScript,
                //Handlebars, Batch, Jade, F#, Lua, Powershell,
                //Python, SASS, R, Objective-C
                this.fIsInit = false;
            }
            getHeight() {
                if (this.props.Vm.Height > 0) {
                    return this.props.Vm.Height;
                }
                else
                    return $(window).height() - 150; //- 8 *30 ;
            }
            getEdiotrVal_fun() {
                if (this.fEditorObj) {
                    var _val = this.fEditorObj.getValue();
                    let _list = _val.split('\n');
                    this.props.Vm.toggleGetValBtn(_list, _val);
                }
            }
            setEdiotrVal_fun(str) {
                var _s = new Date().getMilliseconds().toString();
                if (this.fEditorObj) {
                    this.fEditorObj.setValue(_s);
                }
            }
            resetEdiotrVal() {
                if (this.fEditorObj) {
                    this.fEditorObj.dispose();
                }
                this.fInit();
            }
            sendButton() {
                return React.createElement("div", null,
                    React.createElement("span", { className: "btn btn-default", onClick: () => { this.resetClick(); } }, "\u91CD\u8F7D"));
            }
            //
            //<span className="btn btn-primary" onClick={() => { this.getEdiotrVal_fun(); }}>获取</span>
            pComponentDidUpdate(prevProps, prevState, prevContext) {
                super.pComponentDidUpdate(prevProps, prevState, prevContext);
                if (this.fLastContentList != this.props.Vm.ContentList) {
                    if (this.fEditorObj) {
                        this.fLastContentList = this.props.Vm.ContentList;
                        this.fEditorObj.setValue(this.props.Vm.ContentList.join('\n'));
                    }
                }
            }
            pSender() {
                return React.createElement("div", null,
                    this.props.Vm.HasOptButton ? this.sendButton() : null,
                    React.createElement("div", { className: "label label-primary" }, CodeType[this.props.Vm.CodeType]),
                    React.createElement("select", { onChange: (e) => { this.slelectTheme(e); } },
                        React.createElement("option", null, "vs"),
                        React.createElement("option", null, "vs-dark"),
                        React.createElement("option", { selected: true }, "hc-black")),
                    React.createElement("div", { className: "MonacoEditor", style: { width: "100%", height: this.getHeight(), border: " 1px solid grey" } }));
            }
            slelectTheme(e) {
                let _v = $(e.target).val();
                // alert(_v);
                if (this.fEditorObj) {
                    window["monaco"].editor.setTheme(_v);
                }
            }
            fInit() {
                this.fLastContentList = this.props.Vm.ContentList;
                if (this.fEditorObj) {
                    this.fEditorObj.setValue(this.props.Vm.ContentList.join('\n'));
                }
                else {
                    var _$dom = $(ReactDOM.findDOMNode(this)).find(".MonacoEditor");
                    if (_$dom.length > 0) {
                        _$dom.html("");
                        window["requirejs"].config({
                            paths: { "vs": "/AtawStatic/lib/03Extend/monaco-editor/min/vs" }
                        });
                        utilFile.Core.Util.AsyncJs([
                            "/AtawStatic/lib/03Extend/monaco-editor/min/vs/loader.js"
                        ], () => {
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
            pInstall() {
                super.pInstall();
                if (!this.fIsInit) {
                    this.fInit();
                    this.fIsInit = true;
                }
            }
            resetClick() {
                if (this.fEditorObj) {
                    this.fEditorObj.setValue(this.props.Vm.ContentList.join('\n'));
                    this.getEdiotrVal_fun();
                    this.forceUpdate();
                }
            }
        }
        MonacoEditor.MonacoEditorReact = MonacoEditorReact;
        class MonacoEditorVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = MonacoEditorReact;
                this.CodeType = CodeType.javascript;
                this.ContentList = [];
                this.Height = 0;
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
            getCodeTypeStr() {
                switch (this.CodeType) {
                    case CodeType.csharp:
                        return "c#";
                    case CodeType.sql:
                        return "sql";
                    default:
                        return CodeType[this.CodeType];
                }
            }
            toggleGetValBtn(val, content) {
                this.ContentList = val;
                if (this.UniId) {
                    this.emitAppEvent("toggleGetValBtn", this.UniId, content);
                }
            }
        }
        MonacoEditor.MonacoEditorVm = MonacoEditorVm;
        class MonacoEditorStates extends domCore.DomStates {
        }
        MonacoEditor.MonacoEditorStates = MonacoEditorStates;
        class MonacoEditorProps extends domCore.DomProps {
        }
        MonacoEditor.MonacoEditorProps = MonacoEditorProps;
    })(MonacoEditor = exports.MonacoEditor || (exports.MonacoEditor = {}));
});
//# sourceMappingURL=MonacoEditor.js.map