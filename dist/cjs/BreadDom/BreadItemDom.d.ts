/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module BreadItemDom {
    class BreadItemDomAction extends domCore.DomAction {
    }
    class BreadItemDomReact extends domCore.DomReact<BreadItemDomProps, BreadItemDomStates, BreadItemDomAction> implements domCore.IReact {
        state: BreadItemDomStates;
        private _linkClickFun(val);
        private _clickEapandFun();
        private _senderUL();
        pSender(): React.ReactElement<any>;
        protected pComponentWillUnmount(): void;
        private fExpandFun;
        protected pComponentDidMount(): void;
        protected pInstall(): void;
    }
    interface ILink {
        Text: string;
        Value: string;
    }
    interface IReactBreadItemDomVm extends domCore.DomVm {
        Text: string;
        Value: string;
        IsExpand: boolean;
        HomeUrl?: string;
        LinkList: ILink[];
    }
    interface IBreadItemDomConfig {
        Text?: string;
        Value?: string;
        IsExpand?: boolean;
        LinkList?: ILink[];
        HomeUrl?: string;
    }
    class BreadItemDomVm extends domCore.DomVm implements IReactBreadItemDomVm {
        ReactType: typeof BreadItemDomReact;
        Text: string;
        Value: string;
        IsExpand: boolean;
        LinkList: ILink[];
        HomeUrl: string;
        constructor(config?: IBreadItemDomConfig);
    }
    class BreadItemDomStates extends domCore.DomStates {
    }
    class BreadItemDomProps extends domCore.DomProps<IReactBreadItemDomVm> {
    }
}
