define(["require", "exports", "01core/0Dom", "01core/Util", "react", "react-dom"], function (require, exports, domFile, utilFile, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var JsonView;
    (function (JsonView) {
        class JsonViewAction extends domCore.DomAction {
        }
        JsonView.JsonViewAction = JsonViewAction;
        class JsonViewReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new JsonViewStates();
            }
            getbtnDom() {
                var _dom = ReactDOM.findDOMNode(this);
                return $(_dom).find("a");
            }
            getshowDom() {
                var _dom = ReactDOM.findDOMNode(this);
                return $(_dom).find("div");
            }
            pSender() {
                return React.createElement("div", null,
                    React.createElement("h2", null, "Data"),
                    React.createElement("div", { className: "btn-group" },
                        React.createElement("a", { ref: "collapse-btn", className: "btn btn-xs btn-default " }, "Collapse"),
                        React.createElement("a", { ref: "expand-btn", className: "btn btn-xs btn-default " }, "Expand"),
                        React.createElement("a", { ref: "toggle-btn", className: "btn btn-xs btn-default " }, "Toggle")),
                    React.createElement("div", { ref: "json", className: "ACT-JSON-View" }));
            }
            pUnInstall(vm) {
                super.pUnInstall(vm);
                var _$json = this.fGetJsonDom();
                ;
                var _$collapse = this.fGetCollapseDom();
                var _$expand = this.fGetExpandDom();
                var _$toggle = this.fGetToggleDom();
                _$collapse.off("click");
                _$expand.off("click");
                _$toggle.off("click");
                _$json.empty();
            }
            pDomLoad() {
                super.pDomLoad();
                // var _this = this;
                utilFile.Core.Util.AsyncJs(["/AtawStatic/lib/03Extend/jsonView/jquery.jsonview.js", "/AtawStatic/lib/03Extend/jsonView/jquery.jsonview.min.css"], () => {
                    var _$json = this.fGetJsonDom();
                    var _$collapse = this.fGetCollapseDom();
                    var _$expand = this.fGetExpandDom();
                    var _$toggle = this.fGetToggleDom();
                    var json = {
                        "anumber": 243,
                        "anobject": {
                            "whoa": "nuts",
                            "anarray": {
                                "aa": "11",
                                "bb": "22",
                                "cc": [1, 1, 2]
                            },
                            "more": "stuff"
                        },
                        "awesome": true,
                        "bogus": false
                    };
                    _$json["JSONView"](this.props.Vm.data, { collapsed: this.props.Vm.IsCollapse });
                    _$collapse.on('click', function () {
                        _$json["JSONView"]('collapse');
                    });
                    _$expand.on('click', function () {
                        _$json["JSONView"]('expand');
                    });
                    _$toggle.on('click', function () {
                        _$json["JSONView"]('toggle');
                    });
                });
            }
            //protected pComponentDidUpdate(prevProps: JsonViewProps, prevState: JsonViewStates, prevContext: any)
            //{
            //    super.pComponentDidUpdate(prevProps, prevState, prevContext);
            //    var _json = this.fGetJsonDom();
            //    _json.JSONView(this.props.Vm.data);
            //}
            fGetJsonDom() {
                var _reactObj = this.refs["json"];
                var _dom = ReactDOM.findDOMNode(_reactObj);
                var _$dom = $(_dom);
                return _$dom;
            }
            fGetCollapseDom() {
                var _reactObj = this.refs["collapse-btn"];
                var _dom = ReactDOM.findDOMNode(_reactObj);
                var _$dom = $(_dom);
                return _$dom;
            }
            fGetExpandDom() {
                var _reactObj = this.refs["expand-btn"];
                var _dom = ReactDOM.findDOMNode(_reactObj);
                var _$dom = $(_dom);
                return _$dom;
            }
            fGetToggleDom() {
                var _reactObj = this.refs["toggle-btn"];
                var _dom = ReactDOM.findDOMNode(_reactObj);
                var _$dom = $(_dom);
                return _$dom;
            }
        }
        JsonView.JsonViewReact = JsonViewReact;
        class JsonViewVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = JsonViewReact;
                this.IsCollapse = true;
                if (config) {
                    //if (config.IsCollapse) {
                    this.IsCollapse = config.IsCollapse;
                    //  }
                    if (config.data) {
                        this.data = config.data;
                    }
                    else {
                        this.data = {};
                    }
                }
            }
        }
        JsonView.JsonViewVm = JsonViewVm;
        class JsonViewStates extends domCore.DomStates {
        }
        JsonView.JsonViewStates = JsonViewStates;
        class JsonViewProps extends domCore.DomProps {
        }
        JsonView.JsonViewProps = JsonViewProps;
    })(JsonView = exports.JsonView || (exports.JsonView = {}));
});
//# sourceMappingURL=JsonView.js.map