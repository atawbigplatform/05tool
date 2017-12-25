/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module ModalDom {
    class ModalDomAction extends domCore.DomAction {
    }
    class ModalDomReact extends domCore.DomReact<ModalDomProps, ModalDomStates, ModalDomAction> implements domCore.IReact {
        state: ModalDomStates;
        private open_fun();
        private close_fun();
        private setStyle();
        private getZindexStyle();
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
        private setWidth();
        protected pInstall(): void;
    }
    interface IReactModalDomVm extends domCore.DomVm {
        IsModalShow?: boolean;
        ModalTop?: number;
        Title?: string;
        DomObj?: domCore.DomVm;
        ClassName?: string;
        open(): any;
        close(): any;
        IsDebug?: boolean;
        Width: string;
        Zindex: number;
        ModalHeight: string;
    }
    interface IModalFun {
        (modal: ModalDomVm, callBack: Function): void;
    }
    interface IModalDomConfig {
        IsModalShow?: boolean;
        ModalTop?: number;
        Title?: string;
        DomObj?: domCore.DomVm;
        ModalShowingFun?: IModalFun;
        IsDebug?: boolean;
        ClassName?: string;
        UniId?: string;
        ModalCloseFun?: IModalFun;
        Width?: string;
        ModalHeight?: string;
        Zindex?: number;
    }
    class ModalDomVm extends domCore.DomVm implements IReactModalDomVm {
        ReactType: typeof ModalDomReact;
        Subtext: string;
        WUse: string;
        HUse: string;
        IsModalShow: boolean;
        ModalTop: number;
        Title: string;
        DomObj: domCore.DomVm;
        ModalShowFun: IModalFun;
        IsNoFirst: boolean;
        IsDebug: boolean;
        ClassName: string;
        UniId: string;
        IsMulit: boolean;
        ModalCloseFun: IModalFun;
        Width: string;
        ModalHeight: string;
        Zindex: number;
        constructor(config?: IModalDomConfig);
        open(): void;
        close(): void;
    }
    class ModalDomStates extends domCore.DomStates {
    }
    class ModalDomProps extends domCore.DomProps<IReactModalDomVm> {
    }
}
