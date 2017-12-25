
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

export module JsonView {
    export class JsonViewAction extends domCore.DomAction {
    }

    export class JsonViewReact extends domCore.DomReact<JsonViewProps, JsonViewStates, JsonViewAction> implements domCore.IReact {

        public state = new JsonViewStates();

        protected getbtnDom(): JQuery {
            var _dom = ReactDOM.findDOMNode(this);
            return $(_dom).find("a");
        }
        protected getshowDom(): JQuery {
            var _dom = ReactDOM.findDOMNode(this);
            return $(_dom).find("div");
        }

        public pSender(): React.ReactElement<any> {
            return <div>
                <h2>Data</h2>
                <div className="btn-group">
                    <a ref="collapse-btn" className="btn btn-xs btn-default ">Collapse</a>
                    <a ref="expand-btn" className="btn btn-xs btn-default ">Expand</a>
                    <a ref="toggle-btn" className="btn btn-xs btn-default ">Toggle</a>
                </div>
                <div ref="json" className="ACT-JSON-View"></div>
            </div>; 
        }

      
        protected pUnInstall(vm?: domCore.DomVm): void {
            super.pUnInstall(vm);
            var _$json = this.fGetJsonDom();;
            var _$collapse = this.fGetCollapseDom();
            var _$expand = this.fGetExpandDom();
            var _$toggle = this.fGetToggleDom();
           
            _$collapse.off("click");
            _$expand.off("click");
            _$toggle.off("click");
            _$json.empty();

        }

        protected pDomLoad(): void {
            super.pDomLoad();
           // var _this = this;
            utilFile.Core.Util.AsyncJs(["/AtawStatic/lib/03Extend/jsonView/jquery.jsonview.js", "/AtawStatic/lib/03Extend/jsonView/jquery.jsonview.min.css"], ()=> {
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
                }

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

        private fGetJsonDom(): JQuery {
            var _reactObj = this.refs["json"];
            var _dom = ReactDOM.findDOMNode(_reactObj);
            var _$dom = $(_dom);
            return _$dom;
        }
        private fGetCollapseDom(): JQuery {
            var _reactObj = this.refs["collapse-btn"];
            var _dom = ReactDOM.findDOMNode(_reactObj);
            var _$dom = $(_dom);
            return _$dom;
        }
        private fGetExpandDom(): JQuery {
            var _reactObj = this.refs["expand-btn"];
            var _dom = ReactDOM.findDOMNode(_reactObj);
            var _$dom = $(_dom);
            return _$dom;
        }
        private fGetToggleDom(): JQuery {
            var _reactObj = this.refs["toggle-btn"];
            var _dom = ReactDOM.findDOMNode(_reactObj);
            var _$dom = $(_dom);
            return _$dom;
        }
    }

    export interface IReactJsonViewVm extends domCore.DomVm {
        data: any;
        IsCollapse: boolean;
    }

    export interface IJsonViewConfig {
        data?: any;
        IsCollapse?: boolean;
    }

    export class JsonViewVm extends domCore.DomVm implements IReactJsonViewVm {
        public ReactType = JsonViewReact;
        public data: any;
        public IsCollapse: boolean = true;
        public constructor(config?: IJsonViewConfig) {
            super();
            if (config) {
              //if (config.IsCollapse) {
                   this.IsCollapse = config.IsCollapse;
            //  }
              if ( config.data) {
                    this.data = config.data;
               }
              else {
                    this.data = {};
               }
            }
        }

    }
    export class JsonViewStates extends domCore.DomStates {
    }


    export class JsonViewProps extends domCore.DomProps<IReactJsonViewVm>{
    }



}



