/// <reference types="react" />
import domFile = require("01core/0Dom");
import React = require("react");
export declare module ui {
    class TreeAction extends domFile.Core.DomAction {
        IsActive: boolean;
    }
    class TreeReact extends domFile.Core.DomReact<TreeProps, TreeStates, TreeAction> implements domFile.Core.IReact {
        protected pIsSetScreenMaxHeight: boolean;
        protected pIsSetScreenHeight: boolean;
        pSender(): React.ReactElement<any>;
        private h_ulSend(className?);
        private _resizeFun;
        protected pComponentDidMount(): void;
        protected pComponentWillUnmount(): void;
    }
    class TreeNodeReact extends domFile.Core.DomReact<TreeNodeProps, TreeStates, TreeAction> implements domFile.Core.IReact {
        ExpandClick(): void;
        ActiveNode(): void;
        pSender(): React.ReactElement<any>;
        private className_getChildCheck();
        private h_Send(s, className?);
        private Search_HighLight(Text);
    }
    class TreeProps extends domFile.Core.DomProps<TreeVm> {
    }
    class TreeNodeProps extends domFile.Core.DomProps<TreeNodeVm> {
    }
    class TreeStates extends domFile.Core.DomStates {
    }
    class TreeNodeTplReact extends domFile.Core.DomReact<TreeNodeTplProps, any, any> implements domFile.Core.IReact {
        pSender(): React.ReactElement<any>;
    }
    class TreeNodeTplProps extends domFile.Core.DomProps<TreeNodeTplVm> {
    }
    class TreeNodeTplVm extends domFile.Core.DomVm implements domFile.Core.IVm {
        TreeNode: TreeNodeVm;
        ReactType: TreeNodeTplReact;
    }
    interface INodeSelectorFun {
        (node: TreeNodeVm): boolean;
    }
    interface ITreeCodeTableModel {
        CODE_VALUE: string;
        CODE_TEXT: string;
        CODE_ICON?: string;
        ExtData?: IExtData;
        open?: boolean;
        Children?: Array<ITreeCodeTableModel>;
        isParent?: boolean;
        IsSelect?: boolean;
        IsDisableSelect?: boolean;
    }
    interface IExtData {
        RightValue: string;
        Icon?: string;
        RightType?: string | number;
    }
    interface ITreeVm {
        StyleName?: string;
        IsYesParent?: boolean;
        IsYesChild?: boolean;
        IsNoParent?: boolean;
        IsNoChild?: boolean;
        IsMultiSelect?: boolean;
        IsOnLeafCanSelect?: boolean;
        IcoSrc?: string;
        NodeTplFun?: INodeTplFun;
        NNodeTplFun?: INNodeTplFun;
        OnExpandFun?: IOnExpandFun;
        OnActiveNodeSetValue?: IOnActiveNodeSetValue;
    }
    class TreeVm extends domFile.Core.DomVm implements domFile.Core.IVm {
        Roots: Array<TreeNodeVm>;
        ReactType: typeof TreeReact;
        protected pRegName: string;
        Subtext: string;
        WUse: string;
        HUse: string;
        NodeTplFun: INodeTplFun;
        NNodeTplFun: INNodeTplFun;
        SelectNodes: Array<TreeNodeVm>;
        CheckNodes: TreeNodeVm[];
        IsMultiSelect: boolean;
        Height: number;
        StyleName: string;
        ModifyNodeList: TreeNodeVm[];
        IsYesParent: boolean;
        IsYesChild: boolean;
        IsNoParent: boolean;
        IsNoChild: boolean;
        IsOnlyLeafCanSelect: boolean;
        isSearch: boolean;
        HighLightKey: string;
        OnExpandFun: IOnExpandFun;
        OnActiveNodeSetValue: IOnActiveNodeSetValue;
        constructor(config?: ITreeVm);
        updateModify(): void;
        pushModifyNode(node: TreeNodeVm): void;
        pushSelectNode(nodeVm: TreeNodeVm): void;
        onReactNodeClick(fun: INodeSelectorFun): void;
        appendToNode(nodeVM: ITreeCodeTableModel, parentNode: TreeNodeVm): TreeNodeVm;
        copyNode(nodeVM: TreeNodeVm): TreeNodeVm;
        private fToNode(nodeVM);
        initTreeVm(nodeVM: ITreeCodeTableModel): void;
        private fInitTreeVm(nodeVm, pNode);
        GetNodeByFun(nodevm: TreeNodeVm, nodeSelectorFun: INodeSelectorFun): TreeNodeVm;
        getNodeByFunRoot(nodeSelectorFun: INodeSelectorFun): TreeNodeVm[];
        getNodeByKey(keys: Array<string>): Array<TreeNodeVm>;
        ExpandParent(vm: TreeNodeVm): void;
        pExpandParent(vm: TreeNodeVm, noExpand: boolean): void;
        shrinkRoots(): void;
        resetRootNode(): void;
        ExpandNode(nodeSelectorFun: INodeSelectorFun, isSubmit: boolean): TreeNodeVm[];
    }
    interface INodeTplFun {
        (nodeVm: TreeNodeVm): React.ReactElement<any>[];
    }
    interface INNodeTplFun {
        (nodeVm: TreeNodeVm): React.ReactElement<any>[];
    }
    interface IOnExpandFun {
        (nodeVm: TreeNodeVm): void;
    }
    interface IOnActiveNodeSetValue {
        (nodeVm: TreeNodeVm): void;
    }
    class TreeNodeVm extends domFile.Core.DomVm implements domFile.Core.IVm {
        ReactType: typeof TreeNodeReact;
        Text: string;
        Mesg: string;
        Value: string;
        NoLeaf: boolean;
        ItemType: string;
        NoExpand: boolean;
        NoExpandIcon: string;
        ExpandIcon: string;
        IsActive: boolean;
        Children: Array<TreeNodeVm>;
        protected pRegName: string;
        TreeObj: TreeVm;
        ExtendObj: any;
        IsRoot: boolean;
        ParentNodeVm: TreeNodeVm;
        IsHide: boolean;
        IsParent: boolean;
        OnExpandFun: IOnExpandFun;
        OnActiveNodeSetValue: IOnActiveNodeSetValue;
        ParentId: string;
        IsDisableSelect: boolean;
        NodeIcoSrc: string;
        ExtData: IExtData;
        LiClass: string;
        updateModify(): void;
        pushModifyNode(node: TreeNodeVm): void;
        protected pDispose(): void;
        IsChildCheck: boolean;
        GetNodeKeyByFun(fun: {
            (nodevm: TreeNodeVm): boolean;
        }): TreeNodeVm;
        Expand(): void;
        private checkParentCheckToTrue(node);
        checkParentCheckToFalse(node: TreeNodeVm): void;
        private checkParentVmCheck(nodevm, isCheck);
        private checkChildrenVm(nodevm, isCheck);
        private fWillYesActive_Multi();
        private fWillNoActive_Multi();
        private fWillYesActive_Single();
        private fWillNoActive_Single();
        Active(): void;
        private setParentVmCheck(nodevm);
        hideElseRootNode(isSubmit: boolean): void;
        findRoot(nodevm: TreeNodeVm): TreeNodeVm;
        private fFindRootNode(nodevm);
    }
}
