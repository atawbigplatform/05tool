define(["require", "exports", "01core/0Dom", "react", "react-dom"], function (require, exports, domFile, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var Web;
    (function (Web) {
        class ThDomAction extends domCore.DomAction {
        }
        Web.ThDomAction = ThDomAction;
        class ThDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new ThDomStates();
            }
            pSender() {
                return (React.createElement("th", { style: { "width": this.props.Vm.Width } },
                    this.props.children,
                    React.createElement("div", { className: "handle", draggable: true, onDragStart: (t) => {
                            this.x0 = t["screenX"];
                            this.props.Vm.getEmit().emit("table_width");
                        }, onDrag: (t) => {
                            this.onThDrag(t);
                        } })));
            }
            pInstall() {
                super.pInstall();
                this.props.Vm.getEmit().addListener("fixWidth", () => {
                    this.pFixWidth();
                });
            }
            ;
            pComponentDidMount() {
                super.pComponentDidMount();
            }
            onDrag(e) {
                //debugger;
            }
            onThDrag(t) {
                this.x1 = t["screenX"];
                var _x = this.x0 - this.x1;
                this.pFixWidth();
                this.x0 = this.x0 - _x;
                this.props.Vm.Width = this.props.Vm.Width - _x;
                console.log(this.x0 + "-" + this.x1 + "=" + (this.x0 - this.x1).toString());
                this.props.Vm.forceUpdate("");
                this.props.Vm.getEmit().emit("width_fix");
            }
            getWidth() {
                var elem = ReactDOM.findDOMNode(this);
                var _$th = $(elem);
                return _$th.innerWidth() + 2;
            }
            pFixWidth() {
                if (this.props.Vm.Width <= 0) {
                    this.props.Vm.Width = this.getWidth();
                }
            }
            fixWidth() {
                this.pFixWidth();
            }
        }
        Web.ThDomReact = ThDomReact;
        class ThDomVm extends domCore.DomVm {
            constructor() {
                super(...arguments);
                this.ReactType = ThDomReact;
                this.Width = 0;
            }
            fixWidth() {
                //this.pFixWidth();
                this.getEmit().emit("fixWidth");
            }
        }
        Web.ThDomVm = ThDomVm;
        class ThDomStates extends domCore.DomStates {
        }
        Web.ThDomStates = ThDomStates;
        class ThDomProps extends domCore.DomProps {
        }
        Web.ThDomProps = ThDomProps;
    })(Web = exports.Web || (exports.Web = {}));
});
//# sourceMappingURL=ThDom.js.map