/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module RcTableDom {
    class RcTableDomAction extends domCore.DomAction {
    }
    interface IColumn {
        Title: string;
        Key: string;
        Width?: number;
        Fixed?: string;
        Name: string;
    }
    class RcTableDomReact extends domCore.DomReact<RcTableDomProps, RcTableDomStates, RcTableDomAction> implements domCore.IReact {
        state: RcTableDomStates;
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
    }
    interface IReactRcTableDomVm extends domCore.DomVm {
        columns: any;
        data: any[];
    }
    interface IRcTableDomConfig {
        Columns: IColumn[];
        Data: any[];
    }
    class RcTableDomVm extends domCore.DomVm implements IReactRcTableDomVm {
        ReactType: typeof RcTableDomReact;
        Subtext: string;
        WUse: string;
        HUse: string;
        columns: any[];
        data: any[];
        constructor(config?: IRcTableDomConfig);
    }
    class RcTableDomStates extends domCore.DomStates {
    }
    class RcTableDomProps extends domCore.DomProps<IReactRcTableDomVm> {
    }
}
