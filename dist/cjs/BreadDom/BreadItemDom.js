define(["require", "exports", "01core/0Dom", "01core/Url", "react", "react-dom"], function (require, exports, domFile, urlFile, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var BreadItemDom;
    (function (BreadItemDom) {
        class BreadItemDomAction extends domCore.DomAction {
        }
        BreadItemDom.BreadItemDomAction = BreadItemDomAction;
        class BreadItemDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new BreadItemDomStates();
            }
            _linkClickFun(val) {
                //   var _isMenu = val.length >= 6 && val.toUpperCase().indexOf("$MENU$") == 0;
                // urlFile.Core.AkUrl.Current().openUrl(a.Value, _isMenu);
                if (val == "0")
                    val = this.props.Vm.HomeUrl;
                urlFile.Core.AkUrl.Current().openUrlByNoMenu(val);
            }
            _clickEapandFun() {
                this.props.Vm.IsExpand = !this.props.Vm.IsExpand;
                this.forceUpdate();
            }
            _senderUL() {
                if (this.props.Vm.LinkList && this.props.Vm.LinkList.length > 0) {
                    return React.createElement("ul", { className: "nav  ACT-MENU-ITEMS Hz-scroll clearfix " + (this.props.Vm.IsExpand ? "" : "hide") }, this.props.Vm.LinkList.map((item, i) => {
                        return React.createElement("li", { className: "col-lg-3 col-md-3 col-sm-4 col-xs-6 ", key: i },
                            React.createElement("a", { onClick: () => { this._linkClickFun(item.Value); } }, item.Text));
                    }));
                }
                else
                    return null;
            }
            pSender() {
                return React.createElement("li", { key: this.props.Vm.key, className: ((this.props.Vm.LinkList && this.props.Vm.LinkList.length > 0) ? "" : "active") },
                    React.createElement("a", { onClick: () => { this._linkClickFun(this.props.Vm.Value); } }, this.props.Vm.Text),
                    React.createElement("a", { className: "Hu-icon " + ((this.props.Vm.LinkList && this.props.Vm.LinkList.length > 0) ? "" : "hide"), onClick: (e) => { this._clickEapandFun(); e.stopPropagation(); } },
                        React.createElement("i", { className: "ACT-BREAD-ICON " + (this.props.Vm.IsExpand ? " Ha-transform  " : " ") + ("icon-caret-right fa fa-caret-right ") })),
                    this._senderUL());
            }
            pComponentWillUnmount() {
                super.pComponentWillUnmount();
                $("body").unbind("click", this.fExpandFun);
            }
            pComponentDidMount() {
                super.pComponentDidMount();
                this.fExpandFun = (a) => {
                    var _$tar = $(a.target);
                    //  alert(2);
                    // if (!_$tar.hasClass("ACT-BREAD-UL") && !_$tar.parents().hasClass("ACT-BREAD-UL") && !_$tar.hasClass("ACT-BREAD-ICON")) {
                    if (this.props.Vm.IsExpand) {
                        this._clickEapandFun();
                        this.forceUpdate();
                    }
                    // }
                    return true;
                };
                $("body").bind("click", this.fExpandFun);
                var _dom = ReactDOM.findDOMNode(this);
                if (_dom) {
                    var _$dom = $(_dom);
                    var _w = $(window).width();
                    var _h = $(window).height();
                    _$dom.find(".ACT-MENU-ITEMS").css("width", _w * 0.5).css("max-height", _h - 60 - 30 - 30).css("min-height", _h / 6);
                }
            }
            pInstall() {
                super.pInstall();
                var _dom = ReactDOM.findDOMNode(this);
                if (_dom) {
                    var _$dom = $(_dom);
                    var _w = $(window).width();
                    var _h = $(window).height();
                    _$dom.find(".ACT-MENU-ITEMS").css("width", _w * 0.5).css("max-height", _h - 60 - 30 - 30).css("min-height", _h / 3);
                }
            }
        }
        BreadItemDom.BreadItemDomReact = BreadItemDomReact;
        class BreadItemDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = BreadItemDomReact;
                this.IsExpand = false;
                this.LinkList = [];
                this.HomeUrl = "$FEED$";
                this.IsMulit = true;
                if (config) {
                    this.Text = config.Text;
                    this.Value = config.Value;
                    this.IsExpand = config.IsExpand;
                    this.LinkList = config.LinkList;
                    if (config.HomeUrl) {
                        this.HomeUrl = config.HomeUrl;
                    }
                }
            }
        }
        BreadItemDom.BreadItemDomVm = BreadItemDomVm;
        class BreadItemDomStates extends domCore.DomStates {
        }
        BreadItemDom.BreadItemDomStates = BreadItemDomStates;
        class BreadItemDomProps extends domCore.DomProps {
        }
        BreadItemDom.BreadItemDomProps = BreadItemDomProps;
    })(BreadItemDom = exports.BreadItemDom || (exports.BreadItemDom = {}));
});
//# sourceMappingURL=BreadItemDom.js.map