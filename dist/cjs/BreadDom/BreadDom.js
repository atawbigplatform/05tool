define(["require", "exports", "01core/0Dom", "01core/Url", "react", "react-dom", "./BreadItemDom"], function (require, exports, domFile, urlFile, React, ReactDOM, BreadItemDomFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var BreadDom;
    (function (BreadDom) {
        class BreadDomAction extends domCore.DomAction {
        }
        BreadDom.BreadDomAction = BreadDomAction;
        class BreadDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new BreadDomStates();
            }
            _clickEapandFun() {
                this.props.Vm.IsExpand = !this.props.Vm.IsExpand;
                this.forceUpdate();
            }
            _linkClickFun(val) {
                // var _isMenu = val.length >= 6 && val.toUpperCase().indexOf("$MENU$") == 0;
                //// urlFile.Core.AkUrl.Current().openUrl(a.Value, _isMenu);
                // urlFile.Core.AkUrl.Current().openUrl(val, _isMenu);
                urlFile.Core.AkUrl.Current().openUrlByNoMenu(val);
            }
            _senderUL() {
                if (this.props.Vm.NextLinkList && this.props.Vm.NextLinkList.length > 0) {
                    return React.createElement("ul", { className: "nav ACT-BREAD-UL Hz-scroll clearfix" + (this.props.Vm.IsExpand ? "" : " hide"), style: { overflow: "auto" } }, this.props.Vm.NextLinkList.map((item, i) => {
                        return React.createElement("li", { className: "col-lg-3 col-md-3 col-sm-4 col-xs-6 ", key: i },
                            React.createElement("a", { onClick: () => { this._linkClickFun(item.Value); } }, item.Text));
                    }));
                }
                else
                    return null;
            }
            fGetItems() {
                var _items = [];
                var _len = this.props.Vm.Items.length;
                for (var i = 0; i < _len; i++) {
                    var _item = this.props.Vm.Items[_len - i - 1];
                    _items.push(_item);
                }
                return _items;
            }
            pSender() {
                //this.props.Vm.
                return React.createElement("div", { className: "Hu-breadcrumb YSu-breadcrumb" },
                    React.createElement("span", null, "\u5F53\u524D\u4F4D\u7F6E\uFF1A"),
                    React.createElement("ol", { className: "breadcrumb " },
                        this.fGetItems().map((item, i) => {
                            return item.intoDom(i);
                        }),
                        React.createElement("li", null,
                            React.createElement("a", { className: ((this.props.Vm.NextLinkList && this.props.Vm.NextLinkList.length > 0) ? "" : "hide"), onClick: (e) => { this._clickEapandFun(); e.stopPropagation(); } },
                                React.createElement("i", { className: "ACT-BREAD-ICON " + (this.props.Vm.IsExpand ? " Ha-transform  " : " ") + ("icon-caret-right fa fa-caret-right ") })),
                            this._senderUL())));
            }
            pComponentDidUpdate(prevProps, prevState, prevContext) {
                super.pComponentDidUpdate(prevProps, prevState, prevContext);
                if (this.props.Vm.NextLinkList && this.props.Vm.NextLinkList.length > 0) {
                    var _dom = ReactDOM.findDOMNode(this);
                    if (_dom) {
                        var _$dom = $(_dom);
                        var _w = $(window).width();
                        var _h = $(window).height();
                        _$dom.find(".ACT-BREAD-UL").css("width", _w * 0.5).css("max-height", _h - 60 - 30 - 30).css("min-height", _h / 3);
                    }
                }
            }
            pComponentDidMount() {
                super.pComponentDidMount();
                $("body").click((a) => {
                    var _$tar = $(a.target);
                    // alert(1);
                    //  if (!_$tar.hasClass("ACT-BREAD-UL") && !_$tar.parents().hasClass("ACT-BREAD-UL") && !_$tar.hasClass("ACT-BREAD-ICON")) {
                    if (this.props.Vm.IsExpand) {
                        this._clickEapandFun();
                        this.forceUpdate();
                    }
                    // }
                });
                var _dom = ReactDOM.findDOMNode(this);
                if (_dom) {
                    var _$dom = $(_dom);
                    var _w = $(window).width();
                    var _h = $(window).height();
                    _$dom.find(".ACT-BREAD-UL").css("max-height", _h - 60 - 30 - 30).css("min-height", _h / 3);
                }
            }
            pInstall() {
                super.pInstall();
                var _dom = ReactDOM.findDOMNode(this);
                if (_dom) {
                    var _$dom = $(_dom);
                    var _w = $(window).width();
                    var _h = $(window).height();
                    _$dom.find(".ACT-BREAD-UL").css("max-height", _h - 60 - 30 - 30).css("min-height", _h / 3);
                }
            }
        }
        BreadDom.BreadDomReact = BreadDomReact;
        //  @decorator.setDecoratorCon("面包屑 BreadDom")
        //  @decorator.setDecoratorWUse("hk")
        class BreadDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = BreadDomReact;
                this.pRegName = "面包屑";
                this.Items = [];
                this.TreeArrangeHash = {};
                this.TreeKeyHash = {};
                this.NextLinkList = [];
                //  @decorator.setDecoratorProps("主页地址", "string","$FEED$")
                this.HomeUrl = "$FEED$";
                if (config) {
                    this.TreeModel = config.TreeModel;
                    this.initFast();
                    if (config.HomeUrl) {
                        this.HomeUrl = config.HomeUrl;
                        //this.TreeModel.CODE_VALUE = this.HomeUrl;
                    }
                    //this.setBreadShow("0");
                }
            }
            initFast() {
                this.fFastTree(this.TreeModel, "", 0);
            }
            fFastTree(treeModel, arrange, index) {
                treeModel.arrange = arrange + "_" + index;
                //  var _m = treeModel.CODE_VALUE.toUpperCase();
                var _str = treeModel.CODE_VALUE.toUpperCase();
                _str = _str.trim();
                if (_str && _str.length > 4 && (_str.lastIndexOf(".XML") == _str.length - 4)) {
                    _str = _str.replace(".XML", "");
                    // alert();
                }
                this.TreeKeyHash[_str] = treeModel;
                this.TreeArrangeHash[treeModel.arrange] = treeModel;
                if (treeModel.Children && treeModel.Children.length > 0) {
                    treeModel.Children.forEach((m, i) => {
                        //------
                        this.fFastTree(m, treeModel.arrange, i);
                    });
                }
            }
            findNodeByKey(val) {
                var _str = val.toUpperCase();
                if (_str && _str.length > 4 && (_str.lastIndexOf(".XML") == _str.length - 4)) {
                    _str = _str.replace(".XML", "");
                    // alert();
                }
                var _node = this.TreeKeyHash[_str];
                return _node;
            }
            findNodeByArrange(arr) {
                var _node = this.TreeArrangeHash[arr.toUpperCase()];
                return _node;
            }
            getParentArrange(arr) {
                var _i = arr.lastIndexOf("_");
                return arr.substring(0, _i);
            }
            resetRoot() {
                this.setBreadShow("0");
            }
            setBreadShow(val) {
                this.Items = [];
                var _node = this.findNodeByKey(val);
                if (_node) {
                    var _arr = _node.arrange;
                    var _item = new BreadItemDomFile.BreadItemDom.BreadItemDomVm({ HomeUrl: this.HomeUrl });
                    _item.Text = _node.CODE_TEXT;
                    _item.Value = _node.CODE_VALUE;
                    this.Items.push(_item);
                    var _parr = this.getParentArrange(_arr);
                    if (_parr && _parr != "") {
                        this.setBreadItemParent(_parr, _item);
                    }
                    this.NextLinkList = [];
                    this.IsExpand = false;
                    if (_node.Children) {
                        _node.Children.forEach((r) => {
                            var _link = { Text: r.CODE_TEXT, Value: r.CODE_VALUE };
                            this.NextLinkList.push(_link);
                        });
                    }
                }
            }
            setBreadItemParent(arr, item) {
                var _node = this.findNodeByArrange(arr);
                var _item = new BreadItemDomFile.BreadItemDom.BreadItemDomVm({ HomeUrl: this.HomeUrl });
                _item.Text = _node.CODE_TEXT;
                _item.Value = _node.CODE_VALUE;
                this.Items.push(_item);
                _item.LinkList = [];
                _node.Children.forEach((n) => {
                    _item.LinkList.push({ Text: n.CODE_TEXT, Value: n.CODE_VALUE });
                });
                if (arr != "_0") {
                    var _parr = this.getParentArrange(arr);
                    this.setBreadItemParent(_parr, _item);
                }
                else {
                }
                // }
            }
            expandItemByVal(val) {
                if (this.TreeModel.CODE_VALUE == val) {
                }
            }
        }
        BreadDom.BreadDomVm = BreadDomVm;
        class BreadDomStates extends domCore.DomStates {
        }
        BreadDom.BreadDomStates = BreadDomStates;
        class BreadDomProps extends domCore.DomProps {
        }
        BreadDom.BreadDomProps = BreadDomProps;
    })(BreadDom = exports.BreadDom || (exports.BreadDom = {}));
});
//# sourceMappingURL=BreadDom.js.map