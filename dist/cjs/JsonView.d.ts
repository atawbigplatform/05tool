/// <reference types="jquery" />
/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module JsonView {
    class JsonViewAction extends domCore.DomAction {
    }
    class JsonViewReact extends domCore.DomReact<JsonViewProps, JsonViewStates, JsonViewAction> implements domCore.IReact {
        state: JsonViewStates;
        protected getbtnDom(): JQuery;
        protected getshowDom(): JQuery;
        pSender(): React.ReactElement<any>;
        protected pUnInstall(vm?: domCore.DomVm): void;
        protected pDomLoad(): void;
        private fGetJsonDom();
        private fGetCollapseDom();
        private fGetExpandDom();
        private fGetToggleDom();
    }
    interface IReactJsonViewVm extends domCore.DomVm {
        data: any;
        IsCollapse: boolean;
    }
    interface IJsonViewConfig {
        data?: any;
        IsCollapse?: boolean;
    }
    class JsonViewVm extends domCore.DomVm implements IReactJsonViewVm {
        ReactType: typeof JsonViewReact;
        data: any;
        IsCollapse: boolean;
        constructor(config?: IJsonViewConfig);
    }
    class JsonViewStates extends domCore.DomStates {
    }
    class JsonViewProps extends domCore.DomProps<IReactJsonViewVm> {
    }
}
