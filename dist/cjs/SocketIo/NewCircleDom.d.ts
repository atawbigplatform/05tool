/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
import inodeClientFile = require("./INodeClient");
export declare module NewCircleDom {
    class NewCircleDomAction extends domCore.DomAction {
    }
    class NewCircleDomReact extends domCore.DomReact<NewCircleDomProps, NewCircleDomStates, NewCircleDomAction> implements domCore.IReact {
        state: NewCircleDomStates;
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
    }
    interface INewCircleDomConfig {
        NodeClientObj?: inodeClientFile.INodeClient;
    }
    class NewCircleDomVm extends domCore.DomVm {
        ReactType: typeof NewCircleDomReact;
        NewCount: number;
        private fFun;
        private NodeClientObj;
        constructor(config?: INewCircleDomConfig);
        clear(): void;
        show(num: number): void;
        playMp3(): void;
        pDispose(): void;
    }
    class NewCircleDomStates extends domCore.DomStates {
    }
    class NewCircleDomProps extends domCore.DomProps<NewCircleDomVm> {
    }
}
