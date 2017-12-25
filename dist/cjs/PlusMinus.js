define(["require", "exports", "01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var PlusMinus;
    (function (PlusMinus) {
        class PlusMinusAction extends domCore.DomAction {
        }
        PlusMinus.PlusMinusAction = PlusMinusAction;
        class PlusMinusReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new PlusMinusStates();
            }
            pSender() {
                return React.createElement("div", { className: "input-group " },
                    React.createElement("span", { className: "input-group-addon", onClick: () => { this.fun_Minus(); } },
                        React.createElement("i", { className: "fa fa-caret-down" })),
                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.props.Vm.Value }),
                    React.createElement("span", { className: "input-group-addon", onClick: () => { this.fun_Plus(); } },
                        React.createElement("i", { className: "fa fa-caret-up" })));
            }
            fun_Plus() {
                if (this.props.Vm.MaxValue) {
                    if (this.props.Vm.Value < this.props.Vm.MaxValue)
                        this.props.Vm.Value++;
                }
                else {
                    this.props.Vm.Value++;
                }
                this.props.Vm.reactDataValueSet(this.props.Vm.Value.toString());
                this.forceUpdate();
            }
            fun_Minus() {
                if (this.props.Vm.Value <= this.props.Vm.MinValue) {
                    this.props.Vm.Value = this.props.Vm.MinValue;
                }
                else {
                    this.props.Vm.Value--;
                }
                this.props.Vm.reactDataValueSet(this.props.Vm.Value.toString());
                this.forceUpdate();
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
        }
        PlusMinus.PlusMinusReact = PlusMinusReact;
        class PlusMinusVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = PlusMinusReact;
                this.Value = 0;
            }
            dataValueSet(value) {
                this.Value = value;
            }
        }
        PlusMinus.PlusMinusVm = PlusMinusVm;
        class PlusMinusStates extends domCore.DomStates {
        }
        PlusMinus.PlusMinusStates = PlusMinusStates;
        class PlusMinusProps extends domCore.DomProps {
        }
        PlusMinus.PlusMinusProps = PlusMinusProps;
    })(PlusMinus = exports.PlusMinus || (exports.PlusMinus = {}));
});
//# sourceMappingURL=PlusMinus.js.map