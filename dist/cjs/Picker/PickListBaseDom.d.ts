/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module PickListBaseDom {
    class PickListBaseDomAction extends domCore.DomAction {
    }
    class PickListBaseDomReact extends domCore.DomReact<PickListBaseDomProps, PickListBaseDomStates, PickListBaseDomAction> implements domCore.IReact {
        state: PickListBaseDomStates;
        private li_clickFun(item);
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
    }
    interface IReactPickListBaseDomVm extends domCore.DomVm {
        PickList: IPickItem[];
        addItem(item: IPickItem): any;
    }
    interface IPickListBaseDomConfig extends domCore.IDomVmConfig {
        UniId?: string;
        PickList?: IPickItem[];
    }
    interface IPickItem {
        Text: string;
        Key: string;
        IsSelect?: boolean;
    }
    class PickListBaseDomVm extends domCore.DomVm implements IReactPickListBaseDomVm {
        ReactType: any;
        PickList: IPickItem[];
        UniId: string;
        IsSingle: boolean;
        SelectPickList: IPickItem[];
        IsHasEvent: boolean;
        addSelect(item: IPickItem): void;
        regAppEvent(): void;
        protected pRegAppEvent(): void;
        protected fRegAppEvent(): void;
        removeSelect(k: string): void;
        constructor(config?: IPickListBaseDomConfig);
        sysLoadDom(items: IPickItem[], callback: Function): void;
        protected loadDom(items: IPickItem[], callback: Function): void;
        addItem(item: IPickItem): void;
        protected pDispose(): void;
    }
    class PickListBaseDomStates extends domCore.DomStates {
    }
    class PickListBaseDomProps extends domCore.DomProps<IReactPickListBaseDomVm> {
    }
}
