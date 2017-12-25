define(["require", "exports", "01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var EditSpan;
    (function (EditSpan) {
        class EditSpanAction extends domCore.DomAction {
        }
        EditSpan.EditSpanAction = EditSpanAction;
        class EditSpanReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new EditSpanStates();
            }
            fun_txtChange(e) {
                var _val = e.target["value"];
                this.props.Vm.Content = _val;
                this.forceUpdate();
            }
            fun_SpanClick() {
                this.props.Vm.spanClick();
            }
            fun_PencilClick() {
                this.props.Vm.IsEdit = true;
                this.forceUpdate();
            }
            //private _initEditor(): React.ReactElement<any>
            //{
            //    return <div className="Hc-edit-span">
            //        <input type="text" 
            //            value={this.props.Vm.Content} placeholder="请输入.."
            //            onChange={(e) => { this.fun_txtChange(e); } }
            //            onBlur={() => { this.fun_SpanClick(); }}
            //            ></input>
            //        <i className="icon-share-alt fa fa-share Hu-pointer" onClick={() => { this.fun_SpanClick();}}></i>
            //    </div>;
            //}
            _initEditor() {
                if (this.props.Vm.Type == "") {
                    return React.createElement("div", { className: "Hc-edit-span" + (this.props.Vm.Content.toString().length < 10 ? " Hg-w50" : "") },
                        React.createElement("input", { type: "text", className: (this.props.Vm.Content.toString().length > 20 ? " Hg-width" : " ") + (this.props.Vm.Content.toString().length < 10 ? " Hg-w50" : ""), value: this.props.Vm.Content, placeholder: "请输入..", onChange: (e) => { this.fun_txtChange(e); }, onBlur: () => { this.fun_SpanClick(); } }),
                        React.createElement("i", { className: "icon-share-alt fa fa-share Hu-pointer", onClick: () => { this.fun_SpanClick(); } }));
                }
                else if (this.props.Vm.Type == "textarea") {
                    return React.createElement("div", { className: "Hc-edit-span" },
                        React.createElement("textarea", { className: (this.props.Vm.Content.length > 20 ? " Hg-width" : " "), value: this.props.Vm.Content, placeholder: "请输入..", onChange: (e) => { this.fun_txtChange(e); }, onBlur: () => { this.fun_SpanClick(); } }),
                        React.createElement("i", { className: "icon-share-alt fa fa-share Hu-pointer", onClick: () => { this.fun_SpanClick(); } }));
                }
            }
            _initSpan() {
                if (this.props.Vm.Content == "") {
                    return React.createElement("i", { className: "icon-pencil fa fa-pencil Hu-pointer" });
                }
                else
                    return this.props.Vm.Content;
            }
            pSender() {
                if (this.props.Vm.IsEdit)
                    return this._initEditor();
                else
                    return React.createElement("span", { className: "Hc-edit-span-text " + this.props.Vm.ClassName, onClick: () => { this.fun_PencilClick(); } },
                        this._initSpan(),
                        React.createElement("i", { className: "icon-pencil fa fa-pencil Hu-pointer" }));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
        }
        EditSpan.EditSpanReact = EditSpanReact;
        // @decorator.setDecoratorCon("编辑文字")
        class EditSpanVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = EditSpanReact;
                //    @decorator.setDecoratorProps("输入框的值","string")
                this.Content = "";
                this.Placeholder = "";
                //    @decorator.setDecoratorProps("输入框的原始值","string")
                this.OriContent = "";
                //     @decorator.setDecoratorProps("是否处于编辑状态","boolean","false")
                this.IsEdit = false;
                //    @decorator.setDecoratorProps("可以编辑的类型","string")
                this.Type = "";
                //   @decorator.setDecoratorProps("自定义样式名","string")
                this.ClassName = "";
                //   @decorator.setDecoratorProps("")
                this.TextEditName = "";
                if (config) {
                    if (config.Content) {
                        this.OriContent = this.Content = config.Content;
                    }
                    if (config.Type) {
                        this.Type = config.Type;
                    }
                    if (config.ChangeEvent) {
                        this.ChangeEvent = config.ChangeEvent;
                        this.onChangeValueEvent(this.ChangeEvent);
                    }
                    if (config.ClassName) {
                        this.ClassName = config.ClassName;
                    }
                    if (config.TextEditName) {
                        this.TextEditName = config.TextEditName;
                    }
                }
            }
            spanClick() {
                this.IsEdit = false;
                this.getEmit().emit("changeValue", this, this.Content != this.OriContent);
                if (this.Content != this.OriContent) {
                    this.ClassName = " Hs-edit";
                }
                else {
                    this.ClassName = "";
                }
                this.forceUpdate("");
            }
            onChangeValueEvent(fun) {
                this.getEmit().addListener("changeValue", fun);
            }
        }
        EditSpan.EditSpanVm = EditSpanVm;
        class EditSpanStates extends domCore.DomStates {
        }
        EditSpan.EditSpanStates = EditSpanStates;
        class EditSpanProps extends domCore.DomProps {
        }
        EditSpan.EditSpanProps = EditSpanProps;
    })(EditSpan = exports.EditSpan || (exports.EditSpan = {}));
});
//# sourceMappingURL=EditSpan.js.map