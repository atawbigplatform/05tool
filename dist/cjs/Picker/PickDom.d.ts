/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
import ModalDomFile = require("./../Modal/ModalDom");
import pickItemDomFile = require("./PickItemDom");
import PickerContainerFile = require("./PickerContainer");
import pickProtalBaseDomFile = require("./PickProtalBaseDom");
export declare module PickDom {
    class PickDomAction extends domCore.DomAction {
    }
    class PickDomReact extends domCore.DomReact<PickDomProps, PickDomStates, PickDomAction> implements domCore.IReact {
        state: PickDomStates;
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
        private openModal_fun();
    }
    interface IReactPickDomVm extends domCore.DomVm {
        modalObj: ModalDomFile.ModalDom.ModalDomVm;
        PortalNode?: pickProtalBaseDomFile.PickProtalBaseDom.PickProtalBaseDomVm;
        IsSingle: boolean;
        IsNoBtn?: boolean;
    }
    interface IPickDomConfig extends domCore.IDomVmConfig {
        UniId: string;
        PickItemList?: pickItemDomFile.PickItemDom.IPickItemDomConfig[];
        PickerContainer?: PickerContainerFile.PickerContainer.IPickerContainerConfig;
        PortalNode?: pickProtalBaseDomFile.PickProtalBaseDom.PickProtalBaseDomVm;
        IsSingle?: boolean;
        Width?: string;
        IsNoBtn?: boolean;
    }
    class PickDomVm extends domCore.DomVm implements IReactPickDomVm {
        ReactType: typeof PickDomReact;
        UniId: string;
        PickerContainer: PickerContainerFile.PickerContainer.PickerContainerVm;
        modalObj: ModalDomFile.ModalDom.ModalDomVm;
        protected pRegName: string;
        PortalNode: pickProtalBaseDomFile.PickProtalBaseDom.PickProtalBaseDomVm;
        IsSingle: boolean;
        Width: string;
        IsNoBtn: boolean;
        constructor(config?: IPickDomConfig);
        protected pDispose(): void;
    }
    class PickDomStates extends domCore.DomStates {
    }
    class PickDomProps extends domCore.DomProps<IReactPickDomVm> {
    }
}
