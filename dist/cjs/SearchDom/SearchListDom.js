define(["require", "exports", "01core/0Dom", "01core/Event", "react"], function (require, exports, domFile, eventFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var SeacherListDom;
    (function (SeacherListDom) {
        class SeacherListDomAction extends domCore.DomAction {
        }
        SeacherListDom.SeacherListDomAction = SeacherListDomAction;
        class SeacherListDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new SeacherListDomStates();
            }
            pSender() {
                return React.createElement("div", { className: "Hm-search-list" },
                    React.createElement("div", { className: "Hm-input-group input-group" },
                        React.createElement("input", { className: "Hg-width form-control ", type: "text", value: this.props.Vm.Sreachstring, onChange: (e) => { this.pInputOnChange(e); return false; } }),
                        React.createElement("i", { className: "Hu-search-close fa fa-close Hu-pointer" + (this.props.Vm.IsEmpty ? "" : " hide"), onClick: () => { this.fun_empty(); } }),
                        React.createElement("span", { className: "input-group-addon Hu-pointer" },
                            React.createElement("i", { className: "fa fa-search" }))),
                    React.createElement("p", { className: "Hu-num" },
                        "\u5171\u6709",
                        this.props.Vm.DataList.length,
                        "\u6761\u6570\u636E"),
                    React.createElement("ul", { className: "Hm-regname-list nav nav-pills", style: { height: this.fSetHeight() } }, this.props.Vm.DataList.map((p, index) => {
                        var title = "";
                        if (p.DisplayName == p.Name)
                            title = p.Name;
                        else
                            title = p.DisplayName + p.Name;
                        return React.createElement("li", { key: index, className: "nav-item Hu-pointer", onClick: () => { this.fun_regName(p.Name); } },
                            React.createElement("span", { className: "Hf-text-overflow" },
                                p.Icon ? React.createElement("i", { className: p.Icon }) : null,
                                React.createElement("span", { title: title, dangerouslySetInnerHTML: { __html: this.Search_HighLight(title) } })));
                    })));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
            fSetHeight() {
                var _n = $(window).height() - $('.ACT-HEADER-BODY').height() - 180;
                return _n;
            }
            Search_HighLight(Text) {
                var key = this.props.Vm.Sreachstring;
                if (key) {
                    var index = Text.toLowerCase().indexOf(key.toLowerCase());
                    if (index != -1) {
                        if (index == 0) {
                            var str1 = "<b class='Hs-red'>" + Text.substr(0, key.length) + "</b>";
                            var str2 = Text.substring(key.length, Text.length);
                            Text = str1 + str2;
                        }
                        else {
                            var str1 = Text.substr(0, index);
                            var str2 = "<b class='Hs-red'>" + Text.substr(index, key.length) + "</b>";
                            var str3 = Text.substring(index + key.length, Text.length);
                            Text = str1 + str2 + str3;
                        }
                    }
                }
                return Text;
            }
            pInputOnChange(e) {
                var _val = e.target["value"];
                this.props.Vm.Sreachstring = _val;
                this.props.Vm.FiltDataList(_val);
                this.props.Vm.IsEmpty = true;
                this.forceUpdate();
            }
            fun_empty() {
                this.props.Vm.Sreachstring = "";
                this.props.Vm.FiltDataList("");
                this.props.Vm.IsEmpty = false;
                this.forceUpdate();
            }
            fun_regName(name) {
                // this.props.Vm.title = name;
                this.props.Vm.itemClickEmit(name, null);
                //this.props.Vm.PageDetailDom = new PageDetailDom.PageBrowserDetailDom.PageBrowserDetailDomVm({ Url: "$" + name + "$" });
                //this.forceUpdate();
            }
        }
        SeacherListDom.SeacherListDomReact = SeacherListDomReact;
        //  @decorator.setDecoratorCon("模糊查询搜索框")
        class SeacherListDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = SeacherListDomReact;
                //   @decorator.setDecoratorProps("搜索字符","string")
                this.Sreachstring = "";
                //    @decorator.setDecoratorProps("是否隐藏关闭按钮","boolean","false")
                this.IsEmpty = false;
                this.DataList = [];
                this.AllDataList = [];
                if (config) {
                    this.AllDataList = config.DataList;
                    this.UniId = config.UniId;
                    this.DataList = this.AllDataList.map((a) => { return a; });
                }
                if (!this.UniId) {
                    this.UniId = "SeacherListDomVm" + eventFile.App.getUniId();
                }
            }
            itemClickEmit(title, extObj) {
                var _obj = { Title: title, CustomObj: extObj };
                this.emitAppEvent("SDK_AllPage_Search", this.UniId, _obj);
                this.emitAppEvent("allcolpage", this.UniId, title);
            }
            FiltDataList(key) {
                this.DataList = [];
                this.AllDataList.map((a) => {
                    var title = "";
                    if (a.Name == a.DisplayName)
                        title = a.Name;
                    else
                        title = a.DisplayName + a.Name;
                    if (title.toLowerCase().indexOf(key.toLowerCase()) != -1) {
                        this.DataList.push(a);
                    }
                });
                this.forceUpdate("");
            }
        }
        SeacherListDom.SeacherListDomVm = SeacherListDomVm;
        class SeacherListDomStates extends domCore.DomStates {
        }
        SeacherListDom.SeacherListDomStates = SeacherListDomStates;
        class SeacherListDomProps extends domCore.DomProps {
        }
        SeacherListDom.SeacherListDomProps = SeacherListDomProps;
    })(SeacherListDom = exports.SeacherListDom || (exports.SeacherListDom = {}));
});
//# sourceMappingURL=SearchListDom.js.map