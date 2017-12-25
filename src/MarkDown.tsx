
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

export module MarkDown {
    export class MarkDownAction extends domCore.DomAction {
    }

    export class MarkDownReact extends domCore.DomReact<MarkDownProps, MarkDownStates, MarkDownAction> implements domCore.IReact {

        public state = new MarkDownStates();

         protected getTextDom(): JQuery {
            var _dom = ReactDOM.findDOMNode(this);
            return $(_dom).find("textarea");
        }
        public pSender(): React.ReactElement<any> {
            return <div>
                <h1 className="title">jQueryMarkdown</h1>
                <div className="markdown-wrapper">
                    <div className="markdown-text">
                        <textarea ref="content" style={{width: "330px",height:"500px"}}>
                           # H1
                        </textarea>
                    </div>
                    <div ref="md" className="markdown"></div>
                </div>
            </div>;
            
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();
            var _this = this;
            utilFile.Core.Util.AsyncJs(["/AtawStatic/lib/03Extend/jquery-markdown/jquery.markdown.js","/AtawStatic/lib/03Extend/jquery-markdown/markdown.css"], () => {
                var _textarea = _this.fGetTextDom();
                _textarea["markdown"]({
                     target_form   : ".markdown"
                });

              _textarea.on("keyup", function() {
                    $(this)["markdown"]({
                     target_form   : ".markdown"
                });
             });
            });
        }
         private fGetTextDom(): JQuery {
            var _reactObj = this.refs["content"];
            var _dom = ReactDOM.findDOMNode(_reactObj);
            var _$dom = $(_dom);
            return _$dom;
        }
    }

    export interface IReactMarkDownVm extends domCore.DomVm {

    }

    export interface IMarkDownConfig {


    }

    export class MarkDownVm extends domCore.DomVm implements IReactMarkDownVm {
        public ReactType = MarkDownReact;

        public constructor(config?: IMarkDownConfig) {
            super();

        }

    }
    export class MarkDownStates extends domCore.DomStates {
    }


    export class MarkDownProps extends domCore.DomProps<IReactMarkDownVm>{
    }



}



