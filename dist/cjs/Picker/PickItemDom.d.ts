/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module PickItemDom {
    class PickItemDomAction extends domCore.DomAction {
    }
    class PickItemDomReact extends domCore.DomReact<PickItemDomProps, PickItemDomStates, PickItemDomAction> implements domCore.IReact {
        state: PickItemDomStates;
        private _text(str);
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
        private close_fun(key);
    }
    interface IReactPickItemDomVm extends domCore.DomVm {
        Text?: string;
        Key?: string;
        delItem(k: string): void;
    }
    interface IPickItemDomConfig extends domCore.IDomVmConfig {
        Text: string;
        Key: string;
        UniId?: string;
        IsSingle?: boolean;
    }
    class PickItemDomVm extends domCore.DomVm implements IReactPickItemDomVm {
        ReactType: typeof PickItemDomReact;
        Text: string;
        Key: string;
        UniId: string;
        IsSingle: boolean;
        constructor(config?: IPickItemDomConfig);
        delItem(k: string): void;
    }
    class PickItemDomStates extends domCore.DomStates {
    }
    class PickItemDomProps extends domCore.DomProps<IReactPickItemDomVm> {
    }
}
