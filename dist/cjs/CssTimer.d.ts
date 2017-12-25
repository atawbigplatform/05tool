/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module CssTimer {
    class CssTimerAction extends domCore.DomAction {
    }
    class CssTimerReact extends domCore.DomReact<CssTimerProps, CssTimerStates, CssTimerAction> implements domCore.IReact {
        state: CssTimerStates;
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
        fun_isStart(): void;
        fun_isStop(): void;
        fun_isReset(): void;
    }
    interface IReactCssTimerVm extends domCore.DomVm {
        IsAuto: boolean;
        IsStart: boolean;
        IsStop: boolean;
        IsReset: boolean;
        fun_isStart(): any;
        fun_isStop(): any;
        fun_isReset(): any;
    }
    interface ICssTimerConfig {
        IsAuto: boolean;
    }
    class CssTimerVm extends domCore.DomVm implements IReactCssTimerVm {
        ReactType: typeof CssTimerReact;
        IsAuto: boolean;
        IsStart: boolean;
        IsStop: boolean;
        IsReset: boolean;
        constructor(config?: ICssTimerConfig);
        fun_isStart(): void;
        fun_isStop(): void;
        fun_isReset(): void;
    }
    class CssTimerStates extends domCore.DomStates {
    }
    class CssTimerProps extends domCore.DomProps<IReactCssTimerVm> {
    }
}
