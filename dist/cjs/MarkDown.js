define(["require", "exports", "01core/0Dom", "01core/Util", "react", "react-dom"], function (require, exports, domFile, utilFile, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var MarkDown;
    (function (MarkDown) {
        class MarkDownAction extends domCore.DomAction {
        }
        MarkDown.MarkDownAction = MarkDownAction;
        class MarkDownReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new MarkDownStates();
            }
            getTextDom() {
                var _dom = ReactDOM.findDOMNode(this);
                return $(_dom).find("textarea");
            }
            pSender() {
                return React.createElement("div", null,
                    React.createElement("h1", { className: "title" }, "jQueryMarkdown"),
                    React.createElement("div", { className: "markdown-wrapper" },
                        React.createElement("div", { className: "markdown-text" },
                            React.createElement("textarea", { ref: "content", style: { width: "330px", height: "500px" } }, "# H1")),
                        React.createElement("div", { ref: "md", className: "markdown" })));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
                var _this = this;
                utilFile.Core.Util.AsyncJs(["/AtawStatic/lib/03Extend/jquery-markdown/jquery.markdown.js", "/AtawStatic/lib/03Extend/jquery-markdown/markdown.css"], () => {
                    var _textarea = _this.fGetTextDom();
                    _textarea["markdown"]({
                        target_form: ".markdown"
                    });
                    _textarea.on("keyup", function () {
                        $(this)["markdown"]({
                            target_form: ".markdown"
                        });
                    });
                });
            }
            fGetTextDom() {
                var _reactObj = this.refs["content"];
                var _dom = ReactDOM.findDOMNode(_reactObj);
                var _$dom = $(_dom);
                return _$dom;
            }
        }
        MarkDown.MarkDownReact = MarkDownReact;
        class MarkDownVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = MarkDownReact;
            }
        }
        MarkDown.MarkDownVm = MarkDownVm;
        class MarkDownStates extends domCore.DomStates {
        }
        MarkDown.MarkDownStates = MarkDownStates;
        class MarkDownProps extends domCore.DomProps {
        }
        MarkDown.MarkDownProps = MarkDownProps;
    })(MarkDown = exports.MarkDown || (exports.MarkDown = {}));
});
//# sourceMappingURL=MarkDown.js.map