/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module PreCodeDom {
    class PreCodeDomAction extends domCore.DomAction {
    }
    class PreCodeDomReact extends domCore.DomReact<PreCodeDomProps, PreCodeDomStates, PreCodeDomAction> implements domCore.IReact {
        state: PreCodeDomStates;
        private fDivId;
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
        protected pInstall(): void;
    }
    interface IReactPreCodeDomVm extends domCore.DomVm {
        CommandList: string[];
        Height: number;
        Id: string;
    }
    interface IPreCodeDomConfig {
        CommandList: string[];
        Height?: number;
    }
    class PreCodeDomVm extends domCore.DomVm implements IReactPreCodeDomVm {
        ReactType: typeof PreCodeDomReact;
        CommandList: string[];
        Height: number;
        Id: string;
        constructor(config?: IPreCodeDomConfig);
        addCommandAndUpdate(command: string[]): void;
    }
    class PreCodeDomStates extends domCore.DomStates {
    }
    class PreCodeDomProps extends domCore.DomProps<IReactPreCodeDomVm> {
    }
}
