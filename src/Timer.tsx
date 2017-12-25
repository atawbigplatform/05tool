
import React = require("react");
import ReactDOM = require("react-dom");

import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import decoratorFile = require("01core/Decorator");
import decorator = decoratorFile.Decorator.Decorator;


export module Timer {
    export class TimerAction extends domCore.DomAction {
    }

    export class TimerReact extends domCore.DomReact<TimerProps, TimerStates, TimerAction> implements domCore.IReact {

        public state = new TimerStates();
        private _funInterval: any;
        public pSender(): React.ReactElement<any> {
            return <span   className={this.props.Vm.ClassName}>{this.props.Vm.secondNum}<span>秒</span></span>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();
           this. _funInterval =  setInterval( () => {
                this.props.Vm.interVal();
                this.forceUpdate();
            },100);

        }

        protected pComponentWillUnmount(): void {
            super.pComponentWillUnmount();
            if (this._funInterval) {
                clearInterval(this._funInterval);
            }
        };


    }

   // @decorator.setDecoratorCon("计时器")
    export class TimerVm extends domCore.DomVm {
        public ReactType = TimerReact;

    //    @decorator.setDecoratorProps("时针长度","number","0.0")
        public timerLength: number = 0.0;

    //    @decorator.setDecoratorProps("数量","string")
        public secondNum: string = "";

   //     @decorator.setDecoratorProps("自定义样式名","string")
        public ClassName: string;
        public interVal()
        {
            this.timerLength = this.timerLength + 1;
            this.secondNum = (this.timerLength * 0.1).toFixed(1);
            this.vmDataValueSet(this.secondNum);
        }
    }
    export class TimerStates extends domCore.DomStates {
    }


    export class TimerProps extends domCore.DomProps<TimerVm>{
    }



}


