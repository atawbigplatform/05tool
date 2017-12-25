define(["require", "exports", "01core/0Dom", "01core/Util", "react"], function (require, exports, domFile, utilFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var MiniEditor;
    (function (MiniEditor) {
        class MiniEditorAction extends domCore.DomAction {
        }
        MiniEditor.MiniEditorAction = MiniEditorAction;
        class MiniEditorReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new MiniEditorStates();
            }
            pSender() {
                return React.createElement("div", null,
                    React.createElement("div", { className: "btn-group m-b m-t" },
                        React.createElement("a", { className: "btn btn-default btn-sm", onClick: () => { this._btnClick(); } }, "\u786E\u5B9A"),
                        React.createElement("a", { className: "btn btn-sm " + (this.fIsSourceCode ? "btn-primary" : "btn-default"), onClick: () => { this._togglrSource(); } }, this.fIsSourceCode ? "设计" : "源码")),
                    React.createElement("textarea", { value: this.props.Vm.Content, onChange: (e) => { this._textChange(e); }, className: (this.fIsSourceCode ? "" : "hide"), style: { "min-height": "332px" } }),
                    React.createElement("div", { className: "ACT-HTML-Editor " + (this.fIsSourceCode ? "hide" : "") }));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
            _btnClick() {
                this.props.Vm.sureContent();
            }
            _togglrSource() {
                this.fIsSourceCode = !this.fIsSourceCode;
                if (this._EditorObj)
                    this._EditorObj.txt.html(this.props.Vm.Content);
                this.forceUpdate();
            }
            _textChange(e) {
                let _val = e.target["value"];
                this.props.Vm.Content = _val;
                this.forceUpdate(() => {
                });
            }
            pDomLoad() {
                super.pDomLoad();
                let _dom = this.pGetDom();
                utilFile.Core.Util.AsyncJs(["/AtawStatic/lib/03Extend/wangEditor/wangEditor.css"], () => {
                    utilFile.Core.Util.AsyncJs([
                        "/AtawStatic/lib/03Extend/wangEditor/wangEditor.js"
                    ], (wang) => {
                        let _editor = new wang($(_dom).find(".ACT-HTML-Editor")[0]);
                        this._EditorObj = _editor;
                        _editor.customConfig.onchange = (html) => {
                            // html 即变化之后的内容
                            // console.log(html)
                            this.props.Vm.Content = html;
                        };
                        _editor.create();
                        _editor.txt.html(this.props.Vm.Content);
                    });
                });
            }
        }
        MiniEditor.MiniEditorReact = MiniEditorReact;
        class MiniEditorVm extends domCore.DomVm {
            constructor(config) {
                super(config);
                this.ReactType = MiniEditorReact;
                if (config) {
                    this.Content = config.Content;
                }
            }
            sureContent() {
                this.getEmit().emit("MiniEditorVm-sure-btn", this.Content);
            }
        }
        MiniEditor.MiniEditorVm = MiniEditorVm;
        class MiniEditorStates extends domCore.DomStates {
        }
        MiniEditor.MiniEditorStates = MiniEditorStates;
        class MiniEditorProps extends domCore.DomProps {
        }
        MiniEditor.MiniEditorProps = MiniEditorProps;
    })(MiniEditor = exports.MiniEditor || (exports.MiniEditor = {}));
});
//# sourceMappingURL=MiniEditor.js.map