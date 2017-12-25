/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module PickProtalBaseDom {
    class PickProtalBaseDomAction extends domCore.DomAction {
    }
    interface IPickItem {
        Text: string;
        Key: string;
    }
    class PickProtalBaseDomReact extends domCore.DomReact<PickProtalBaseDomProps, PickProtalBaseDomStates, PickProtalBaseDomAction> implements domCore.IReact {
        state: PickProtalBaseDomStates;
        private getInputVal();
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
    }
    interface IReactPickProtalBaseDomVm extends domCore.DomVm {
        PickItemList: IPickItem[];
    }
    interface IPickProtalBaseDomConfig extends domCore.IDomVmConfig {
        PickItemList?: IPickItem[];
        UniId?: string;
    }
    class PickProtalBaseDomVm extends domCore.DomVm implements IReactPickProtalBaseDomVm {
        ReactType: typeof PickProtalBaseDomReact;
        PickItemList: IPickItem[];
        protected pPickerSure(items: IPickItem[]): void;
        constructor(config?: IPickProtalBaseDomConfig);
        protected pCheckItemEq(items: IPickItem[]): boolean;
    }
    class PickProtalBaseDomStates extends domCore.DomStates {
    }
    class PickProtalBaseDomProps extends domCore.DomProps<IReactPickProtalBaseDomVm> {
    }
}
