/// <reference types="react" />
import * as domFile from "01core/0Dom";
import domCore = domFile.Core;
import * as React from "react";
import * as BreadItemDomFile from "./BreadItemDom";
export declare module BreadDom {
    class BreadDomAction extends domCore.DomAction {
    }
    interface IReactBreadDomVm extends domCore.DomVm {
        Items: BreadItemDomFile.BreadItemDom.BreadItemDomVm[];
        NextLinkList: BreadItemDomFile.BreadItemDom.ILink[];
        IsExpand: boolean;
    }
    interface ITreeCodeTableModel {
        CODE_VALUE: string;
        CODE_TEXT: string;
        Children?: Array<ITreeCodeTableModel>;
        arrange?: string;
    }
    class BreadDomReact extends domCore.DomReact<BreadDomProps, BreadDomStates, BreadDomAction> implements domCore.IReact {
        state: BreadDomStates;
        private _clickEapandFun();
        private _linkClickFun(val);
        private _senderUL();
        private fGetItems();
        pSender(): React.ReactElement<any>;
        protected pComponentDidUpdate(prevProps: BreadDomProps, prevState: BreadDomStates, prevContext: any): void;
        protected pComponentDidMount(): void;
        protected pInstall(): void;
    }
    interface IBreadDomConfig {
        TreeModel: ITreeCodeTableModel;
        HomeUrl?: string;
    }
    interface ITreeDic {
        [key: string]: ITreeCodeTableModel;
    }
    class BreadDomVm extends domCore.DomVm implements IReactBreadDomVm {
        ReactType: typeof BreadDomReact;
        protected pRegName: string;
        Subtext: string;
        WUse: string;
        Items: BreadItemDomFile.BreadItemDom.BreadItemDomVm[];
        TreeModel: ITreeCodeTableModel;
        TreeArrangeHash: ITreeDic;
        TreeKeyHash: ITreeDic;
        NextLinkList: BreadItemDomFile.BreadItemDom.ILink[];
        IsExpand: boolean;
        HomeUrl: string;
        constructor(config?: IBreadDomConfig);
        private initFast();
        private fFastTree(treeModel, arrange, index);
        private findNodeByKey(val);
        private findNodeByArrange(arr);
        private getParentArrange(arr);
        resetRoot(): void;
        setBreadShow(val: string): void;
        private setBreadItemParent(arr, item);
        private expandItemByVal(val);
    }
    class BreadDomStates extends domCore.DomStates {
    }
    class BreadDomProps extends domCore.DomProps<IReactBreadDomVm> {
    }
}
