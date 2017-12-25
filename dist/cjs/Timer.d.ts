/// <reference types="react" />
import React = require("react");
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
export declare module Timer {
    class TimerAction extends domCore.DomAction {
    }
    class TimerReact extends domCore.DomReact<TimerProps, TimerStates, TimerAction> implements domCore.IReact {
        state: TimerStates;
        private _funInterval;
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
        protected pComponentWillUnmount(): void;
    }
    class TimerVm extends domCore.DomVm {
        ReactType: typeof TimerReact;
        timerLength: number;
        secondNum: string;
        ClassName: string;
        interVal(): void;
    }
    class TimerStates extends domCore.DomStates {
    }
    class TimerProps extends domCore.DomProps<TimerVm> {
    }
}
