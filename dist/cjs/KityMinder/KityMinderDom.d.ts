/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module KityMinderDom {
    class KityMinderDomAction extends domCore.DomAction {
    }
    interface IKMData {
        text: string;
        Image?: string;
        imageSize?: any;
        priority?: number;
        hyperlink?: string;
        expandState?: string;
        progress?: number;
    }
    interface IKMNode {
        data: IKMData;
        children: IKMNode[];
    }
    interface IKMTree {
        root: IKMNode;
    }
    class KityMinderDomReact extends domCore.DomReact<KityMinderDomProps, KityMinderDomStates, KityMinderDomAction> implements domCore.IReact {
        state: KityMinderDomStates;
        pSender(): React.ReactElement<any>;
        private fError;
        private fKityMinderInit();
        protected pInstall(): void;
        protected pComponentDidMount(): void;
    }
    interface IReactKityMinderDomVm extends domCore.DomVm {
        MDTreeObj: IKMTree;
    }
    interface IKityMinderDomConfig {
        MDTreeObj?: IKMTree;
    }
    interface ITreeCodeTableModel {
        CODE_VALUE: string;
        CODE_TEXT: string;
        Children?: Array<ITreeCodeTableModel>;
        arrange?: string;
    }
    var convertToKMNodeByTreeNode: (node: ITreeCodeTableModel) => IKMNode;
    class KityMinderDomVm extends domCore.DomVm implements IReactKityMinderDomVm {
        ReactType: typeof KityMinderDomReact;
        MDTreeObj: IKMTree;
        constructor(config?: IKityMinderDomConfig);
    }
    class KityMinderDomStates extends domCore.DomStates {
    }
    class KityMinderDomProps extends domCore.DomProps<IReactKityMinderDomVm> {
    }
}
