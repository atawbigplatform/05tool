/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module PlusMinus {
    class PlusMinusAction extends domCore.DomAction {
    }
    class PlusMinusReact extends domCore.DomReact<PlusMinusProps, PlusMinusStates, PlusMinusAction> implements domCore.IReact {
        state: PlusMinusStates;
        pSender(): React.ReactElement<any>;
        fun_Plus(): void;
        fun_Minus(): void;
        protected pComponentDidMount(): void;
    }
    interface IReactPlusMinusVm extends domCore.DomVm {
        Value: number;
        MinValue: number;
        MaxValue: number;
    }
    interface IPlusMinusConfig {
    }
    class PlusMinusVm extends domCore.DomVm implements IReactPlusMinusVm {
        ReactType: typeof PlusMinusReact;
        Value: number;
        MinValue: number;
        MaxValue: number;
        constructor(config?: IPlusMinusConfig);
        dataValueSet(value: any): void;
    }
    class PlusMinusStates extends domCore.DomStates {
    }
    class PlusMinusProps extends domCore.DomProps<IReactPlusMinusVm> {
    }
}
