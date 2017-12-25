import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

export module PlusMinus {
    export class PlusMinusAction extends domCore.DomAction {
    }

    export class PlusMinusReact extends domCore.DomReact<PlusMinusProps, PlusMinusStates, PlusMinusAction> implements domCore.IReact {

        public state = new PlusMinusStates();



        public pSender(): React.ReactElement<any> {
            return <div className="input-group ">
                <span className="input-group-addon" onClick={() => { this.fun_Minus() }}>
                    <i className="fa fa-caret-down"></i>
                </span>

                <input type="text" className="form-control" placeholder="" value={this.props.Vm.Value} />

                <span className="input-group-addon" onClick={() => { this.fun_Plus() }}>
                    <i className="fa fa-caret-up"></i>
                </span>


            </div>;
        }

        public fun_Plus() {
            if (this.props.Vm.MaxValue) {
                if (this.props.Vm.Value < this.props.Vm.MaxValue)
                    this.props.Vm.Value++;
            } else {
                this.props.Vm.Value++;
            }

            this.props.Vm.reactDataValueSet(this.props.Vm.Value.toString());
            this.forceUpdate();
        }

        public fun_Minus() {
            if (this.props.Vm.Value <= this.props.Vm.MinValue) {
                this.props.Vm.Value = this.props.Vm.MinValue
            } else {
                this.props.Vm.Value--;
            }
            this.props.Vm.reactDataValueSet(this.props.Vm.Value.toString());
            this.forceUpdate();
        }

        protected pComponentDidMount() {
            super.pComponentDidMount();

        }


    }

    export interface IReactPlusMinusVm extends domCore.DomVm {
        Value: number;
        MinValue: number;
        MaxValue: number;
    }

    export interface IPlusMinusConfig {


    }

    export class PlusMinusVm extends domCore.DomVm implements IReactPlusMinusVm {
        public ReactType = PlusMinusReact;
        public Value: number = 0;
        public MinValue: number;
        public MaxValue: number;
        public constructor(config?: IPlusMinusConfig) {
            super();


        }


        public dataValueSet(value: any) {
            this.Value = value;
        }

    }
    export class PlusMinusStates extends domCore.DomStates {
    }


    export class PlusMinusProps extends domCore.DomProps<IReactPlusMinusVm>{
    }



}
