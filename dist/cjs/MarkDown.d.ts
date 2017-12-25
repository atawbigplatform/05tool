/// <reference types="jquery" />
/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module MarkDown {
    class MarkDownAction extends domCore.DomAction {
    }
    class MarkDownReact extends domCore.DomReact<MarkDownProps, MarkDownStates, MarkDownAction> implements domCore.IReact {
        state: MarkDownStates;
        protected getTextDom(): JQuery;
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
        private fGetTextDom();
    }
    interface IReactMarkDownVm extends domCore.DomVm {
    }
    interface IMarkDownConfig {
    }
    class MarkDownVm extends domCore.DomVm implements IReactMarkDownVm {
        ReactType: typeof MarkDownReact;
        constructor(config?: IMarkDownConfig);
    }
    class MarkDownStates extends domCore.DomStates {
    }
    class MarkDownProps extends domCore.DomProps<IReactMarkDownVm> {
    }
}
