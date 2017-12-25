define(["require", "exports", "01core/0Dom", "01core/Util", "react"], function (require, exports, domFile, utilFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var FontDom;
    (function (FontDom) {
        FontDom.FontFamily = ["Microsoft YaHei", "宋体", "Arial", "黑体", "楷体", "隶书", "sans-serif"];
        FontDom.FontSize = ["10px", "12px", "14px", "16px", "18px", "24px", "32px", "48px"];
        FontDom.TextAlignData = [
            { Text: "居左", Value: "left", ClassName: "left", Cmd: "justify" },
            { Text: "居中", Value: "center", ClassName: "center", Cmd: "justify" },
            { Text: "居右", Value: "right", ClassName: "right", Cmd: "justify" },
            { Text: "两端对齐", Value: "justify", ClassName: "justify", Cmd: "justify" }
        ];
        FontDom.FontStateData = [
            { Text: "加粗", ProName: "IsBold", ClassName: "bold", Cmd: "bold" },
            { Text: "倾斜", ProName: "IsItalic", ClassName: "italic", Cmd: "italic" },
            { Text: "下划线", Mutex: "underline", ClassName: "underline", Cmd: "underline" },
            { Text: "删除线", Mutex: "line-through", ClassName: "strikethrough", Cmd: "strikethrough" } //存在data【Line】，改变样式值
        ];
        FontDom.FontAttrData = [
            //下标与上标互斥,data各自存储为ture/false，Mutex用来判断调用不同方法
            { Text: "下标", Mutex: true, ProName: "IsSub", ClassName: "subscript", Cmd: "subscript" },
            { Text: "上标", Mutex: true, ProName: "IsSuper", ClassName: "superscript", Cmd: "superscript" },
            { Text: "边框", ProName: "IsFontBorder", ClassName: "square-o", Cmd: "fontborder" },
            { Text: "设置", ProName: "IsSet", ClassName: "cog" }
        ];
        FontDom.FormatData = [
            { Text: "清除样式", ProName: "IsRemoveformat", ClassName: "trash", Cmd: "removeformat" },
            { Text: "格式刷", ProName: "IsFormatmatch", ClassName: "paint-brush", Cmd: "formatmatch" },
        ];
        class FontDomAction extends domCore.DomAction {
        }
        FontDom.FontDomAction = FontDomAction;
        class FontDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new FontDomStates();
            }
            pSender() {
                return React.createElement("div", { className: "uedit-form uedit-font clearfix " },
                    React.createElement("div", { className: "col-lg-12 col-md-12 m-t" },
                        React.createElement("div", { className: "font-wrapper" },
                            React.createElement("ul", null,
                                React.createElement("li", { className: "font-family m-b" },
                                    React.createElement("span", { className: "title" }, "\u5B57\u4F53"),
                                    React.createElement("select", { className: "form-control", onChange: (e) => { this._setFamily("fontfamily", $(e.target).val()); return false; } }, FontDom.FontFamily.map((item, index) => {
                                        return React.createElement("option", { className: "family-item family-" + index, selected: item == this.props.Vm.FontStyelData.FontFamily, value: item }, item);
                                    }))),
                                React.createElement("li", { className: "family-size m-b" },
                                    React.createElement("select", { onChange: (e) => { this._setFontSize("fontsize", $(e.target).val()); return false; } }, FontDom.FontSize.map((a) => {
                                        return React.createElement("option", { className: "font-" + a, selected: a == this.props.Vm.FontStyelData.FontSize, value: a }, a);
                                    }))),
                                React.createElement("li", { className: "font-tool m-b" },
                                    React.createElement("ul", { className: "font-grid m-r" }, FontDom.FontStateData.map((a) => {
                                        //加粗，斜体
                                        return React.createElement("li", { className: ((a.ProName && this.props.Vm.FontStyelData[a.ProName])) || (!a.ProName && this.props.Vm.FontStyelData.Line == a.Mutex) ? "active" : "", onClick: () => {
                                                a.ProName ? this._toggle(a.Cmd, a.ProName) : this._setFontLine(a.Cmd, a.Mutex);
                                            } },
                                            React.createElement("span", { className: "fa fa-" + a.ClassName, title: a.Text }));
                                    })),
                                    React.createElement("ul", { className: "font-grid " },
                                        React.createElement("li", { className: "font-color" },
                                            React.createElement("span", { className: "font-color-box", style: { background: this.props.Vm.FontStyelData.Color }, title: "字体颜色" })))),
                                React.createElement("li", { className: "font-attr m-b" },
                                    React.createElement("span", { className: "title" }, "\u5B57\u4F53\u5C5E\u6027\uFF1A"),
                                    React.createElement("ul", { className: "font-grid" }, FontDom.FontAttrData.map((a) => {
                                        //边框
                                        return React.createElement("li", { className: this.props.Vm.FontStyelData[a.ProName] ? "active" : "", onClick: () => { this._fontSateFun(a); } },
                                            React.createElement("span", { className: "fa fa-" + a.ClassName, title: a.ClassName }));
                                    }))),
                                React.createElement("li", { className: "font-backcolor m-b" },
                                    React.createElement("span", { className: "title" }, "\u6587\u5B57\u80CC\u666F\uFF1A"),
                                    React.createElement("ul", { className: "font-grid" },
                                        React.createElement("li", { className: "font-color" },
                                            " ",
                                            React.createElement("span", { className: "back-color", style: { background: this.props.Vm.FontStyelData.BackColor }, title: "背景颜色" })))),
                                React.createElement("li", { className: "font-align m-b" },
                                    React.createElement("span", { className: "title" }, "\u5BF9\u9F50\u65B9\u5F0F\uFF1A"),
                                    React.createElement("ul", { className: "font-grid" }, FontDom.TextAlignData.map((t) => {
                                        return React.createElement("li", { className: (this.props.Vm.FontStyelData.TextAlign == t.Value) ? "active" : "", onClick: () => { this._setTextAlign(t.Cmd, t.Value); } },
                                            React.createElement("span", { className: "fa fa-align-" + t.ClassName, title: t.Text }));
                                    }))),
                                React.createElement("li", { className: "font-format m-b" },
                                    React.createElement("ul", { className: "font-grid" }, FontDom.FormatData.map((a) => {
                                        return React.createElement("li", { onClick: () => { this._toggle(a.Cmd, a.ProName); } },
                                            React.createElement("span", { className: "fa fa-" + a.ClassName, title: a.Text }));
                                    })))))));
            }
            _fontSateFun(a) {
                a.Mutex ? this._setSubsOrSuper(a.Cmd, a.ProName) : this._toggle(a.Cmd, a.ProName);
            }
            pDomLoad() {
                super.pDomLoad();
                utilFile.Core.Util.AsyncJs(["/AtawStatic/lib/03Extend/colorPick/colpick.js"], () => {
                    this._senderColPick(".font-color-box", (hex) => { this._setFontColor("forecolor", "font", "#" + hex); });
                    this._senderColPick(".back-color", (hex) => { this._setFontColor("backcolor", "back", "#" + hex); });
                });
            }
            //(hex:string)=>void
            _senderColPick(calssName, setHexFun) {
                $(this.pGetDom()).find(calssName)["colpick"]({
                    colorScheme: 'dark',
                    layout: 'rgbhex',
                    color: 'ff8800',
                    onSubmit: (hsb, hex, rgb, el) => {
                        $(el).css('background-color', '#' + hex);
                        $(el)["colpickHide"]();
                        if (setHexFun) {
                            setHexFun(hex);
                        }
                    }
                });
            }
            _toggle(cmd, proName) {
                this.props.Vm.toggleState(cmd, proName);
            }
            _setFamily(cmd, family) {
                this.props.Vm.setFamily(cmd, family);
            }
            _setFontSize(cmd, size) {
                this.props.Vm.setFontSize(cmd, size);
            }
            _setFontLine(cmd, line) {
                this.props.Vm.setFontLine(cmd, line);
            }
            _setFontColor(cmd, type, color) {
                this.props.Vm.setFontColor(cmd, type, color);
            }
            _setTextAlign(cmd, val) {
                this.props.Vm.setTextAlign(cmd, val);
            }
            _setSubsOrSuper(cmd, proName) {
                this.props.Vm.setSubsOrSuper(cmd, proName);
            }
        }
        FontDom.FontDomReact = FontDomReact;
        class FontDomVm extends domCore.DomVm {
            constructor(config) {
                super(config);
                this.ReactType = FontDomReact;
                this.FontStyelData = {
                    FontFamily: "Microsoft YaHei",
                    FontSize: "16px",
                    IsBold: false,
                    IsFontBorder: false,
                    IsItalic: false,
                    Line: "",
                    Color: "#555",
                    BackColor: "#FFF",
                    IsSuper: false,
                    IsSub: false,
                    TextAlign: "left",
                    IsRemoveformat: false,
                    IsFormatmatch: false,
                    IsSet: false
                };
                if (config) {
                    if (config.FontStyelData) {
                        //config.FontStyelData如有修改个别初始化属性值，其他未修改的属性仍旧使用this.FontStyelData
                        this.FontStyelData = Object.assign({}, this.FontStyelData, config.FontStyelData);
                    }
                }
            }
            setFontData(data) {
                this.FontStyelData = Object.assign({}, this.FontStyelData, data);
                this.update();
            }
            setFamily(cmd, family) {
                this.FontStyelData.FontFamily = family;
                this.update(cmd, family);
            }
            setFontSize(cmd, size) {
                this.FontStyelData.FontSize = size;
                this.update(cmd, size);
            }
            toggleState(cmd, proName) {
                this.FontStyelData[proName] = !this.FontStyelData[proName];
                this.update(cmd);
            }
            setTextAlign(cmd, val) {
                this.FontStyelData.TextAlign = val;
                this.update(cmd, val);
            }
            setFontColor(cmd, type, color) {
                if (type == "font") {
                    this.FontStyelData.Color = color;
                }
                else {
                    this.FontStyelData.BackColor = color;
                }
                this.update(cmd, color);
            }
            setFontLine(cmd, line) {
                if (this.FontStyelData.Line == line) {
                    this.FontStyelData.Line = "none";
                }
                else {
                    this.FontStyelData.Line = line;
                }
                this.update(cmd);
            }
            setSubsOrSuper(cmd, proName) {
                this.FontStyelData[proName] = !this.FontStyelData[proName]; //proName传入属性名，直接动态修改属性值
                if (proName == "IsSub") {
                    if (this.FontStyelData.IsSub) {
                        this.FontStyelData.IsSuper = false;
                    }
                }
                else {
                    if (this.FontStyelData.IsSuper) {
                        this.FontStyelData.IsSub = false;
                    }
                }
                this.update(cmd);
            }
            update(cmd, cmdVal) {
                this.forceUpdate("", () => {
                    this.emitAppEvent("FontDom->FontEditPage-Change", "FontDom->FontEditPage-Change", cmd, cmdVal, this.FontStyelData);
                });
            }
        }
        FontDom.FontDomVm = FontDomVm;
        class FontDomStates extends domCore.DomStates {
        }
        FontDom.FontDomStates = FontDomStates;
        class FontDomProps extends domCore.DomProps {
        }
        FontDom.FontDomProps = FontDomProps;
    })(FontDom = exports.FontDom || (exports.FontDom = {}));
});
//# sourceMappingURL=FontDom.js.map