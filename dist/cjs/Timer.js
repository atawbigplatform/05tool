define(["require", "exports", "react", "01core/0Dom"], function (require, exports, React, domFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var Timer;
    (function (Timer) {
        class TimerAction extends domCore.DomAction {
        }
        Timer.TimerAction = TimerAction;
        class TimerReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new TimerStates();
            }
            pSender() {
                return React.createElement("span", { className: this.props.Vm.ClassName },
                    this.props.Vm.secondNum,
                    React.createElement("span", null, "\u79D2"));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
                this._funInterval = setInterval(() => {
                    this.props.Vm.interVal();
                    this.forceUpdate();
                }, 100);
            }
            pComponentWillUnmount() {
                super.pComponentWillUnmount();
                if (this._funInterval) {
                    clearInterval(this._funInterval);
                }
            }
            ;
        }
        Timer.TimerReact = TimerReact;
        // @decorator.setDecoratorCon("计时器")
        class TimerVm extends domCore.DomVm {
            constructor() {
                super(...arguments);
                this.ReactType = TimerReact;
                //    @decorator.setDecoratorProps("时针长度","number","0.0")
                this.timerLength = 0.0;
                //    @decorator.setDecoratorProps("数量","string")
                this.secondNum = "";
            }
            interVal() {
                this.timerLength = this.timerLength + 1;
                this.secondNum = (this.timerLength * 0.1).toFixed(1);
                this.vmDataValueSet(this.secondNum);
            }
        }
        Timer.TimerVm = TimerVm;
        class TimerStates extends domCore.DomStates {
        }
        Timer.TimerStates = TimerStates;
        class TimerProps extends domCore.DomProps {
        }
        Timer.TimerProps = TimerProps;
    })(Timer = exports.Timer || (exports.Timer = {}));
});
//# sourceMappingURL=Timer.js.map