/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
import pickItemDomFile = require("./PickItemDom");
import pickListBaseDomFile = require("./PickListBaseDom");
export declare module PickerContainer {
    class PickerContainerAction extends domCore.DomAction {
    }
    class PickerContainerReact extends domCore.DomReact<PickerContainerProps, PickerContainerStates, PickerContainerAction> implements domCore.IReact {
        state: PickerContainerStates;
        protected pIsSetScreenHeight: boolean;
        private fPickSure_fun();
        private _text(str);
        private fInitSingle();
        private fInitMulti();
        protected isRightClassName(): "12" | "8";
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
    }
    interface IReactPickerContainerVm extends domCore.DomVm {
        LeftDomVmObj: pickListBaseDomFile.PickListBaseDom.PickListBaseDomVm;
        PickItemList: pickItemDomFile.PickItemDom.PickItemDomVm[];
        PickSure(): void;
        PickCancleSelect(k: string): void;
        PickSelect(k: string): void;
        IsSingle: boolean;
        IsPickSelectHide: boolean;
        isRightEmpty: boolean;
    }
    interface IPickerContainerConfig extends domCore.IDomVmConfig {
        LeftDomVmObj: pickListBaseDomFile.PickListBaseDom.PickListBaseDomVm;
        PickItemList?: pickItemDomFile.PickItemDom.IPickItemDomConfig[];
        UniId?: string;
        IsSingle?: boolean;
        SetSureCustomerObjFun?: ISetSureCustomerObj;
        IsPickSelectHide?: boolean;
        isRightEmpty?: boolean;
    }
    interface IPickItem {
        Text: string;
        Key: string;
        IsSelect?: boolean;
    }
    interface ISetSureCustomerObj {
        (_items: IPickItem[]): any;
    }
    class PickerContainerVm extends domCore.DomVm implements IReactPickerContainerVm {
        ReactType: typeof PickerContainerReact;
        LeftDomVmObj: pickListBaseDomFile.PickListBaseDom.PickListBaseDomVm;
        UniId: string;
        PickItemList: pickItemDomFile.PickItemDom.PickItemDomVm[];
        IsSingle: boolean;
        IsPickSelectHide: boolean;
        SetSureCustomerObjFun: ISetSureCustomerObj;
        isRightEmpty: boolean;
        private IsRegEvent;
        regAppEvent(): void;
        private fRegAppEvent();
        constructor(config?: IPickerContainerConfig);
        loadDom(pickItemList: pickItemDomFile.PickItemDom.IPickItemDomConfig[], callback: Function): void;
        protected pSetSureCustomerObj(_items: IPickItem[]): any;
        PickSure(): void;
        PickCancleSelect(k: string): void;
        PickSelect(k: string): void;
    }
    class PickerContainerStates extends domCore.DomStates {
    }
    class PickerContainerProps extends domCore.DomProps<IReactPickerContainerVm> {
    }
}
