/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
import modalFile = require("./Modal/ModalDom");
import ModalVm = modalFile.ModalDom.ModalDomVm;
export declare module Htmler {
    class HtmlerAction extends domCore.DomAction {
    }
    class HtmlerReact extends domCore.DomReact<HtmlerProps, HtmlerStates, HtmlerAction> implements domCore.IReact {
        state: HtmlerStates;
        private fIsBtnShow;
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
        private _bodyClickFun;
        protected pComponentWillUnmount(): void;
        private _hideBtn();
        private clickBtn();
        private InputColStyle();
        private _htmlChange();
    }
    interface IReactHtmlerVm extends domCore.DomVm {
        HtmlContent: string;
        change(): any;
        ModalObj: ModalVm;
    }
    interface IHtmlerConfig extends domCore.IDomVmConfig {
        HtmlContent: string;
    }
    class HtmlerVm extends domCore.DomVm implements IReactHtmlerVm {
        ReactType: typeof HtmlerReact;
        ModalObj: ModalVm;
        HtmlContent: string;
        constructor(config?: IHtmlerConfig);
        change(): void;
        private setHtmlByModal(val);
    }
    class HtmlerStates extends domCore.DomStates {
    }
    class HtmlerProps extends domCore.DomProps<IReactHtmlerVm> {
    }
}
