/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module GooFlowDom {
    class GooFlowDomAction extends domCore.DomAction {
    }
    class GooFlowDomReact extends domCore.DomReact<GooFlowDomProps, GooFlowDomStates, GooFlowDomAction> implements domCore.IReact {
        private isUpdate;
        state: GooFlowDomStates;
        pSender(): React.ReactElement<any>;
        private fError;
        private fGooFlowInit();
        protected pInstall(): void;
        private fSetHeight();
        protected pComponentDidMount(): void;
        protected pComponentDidUpdate(prevProps: GooFlowDomProps, prevState: GooFlowDomStates, prevContext: any): void;
    }
    interface IReactGooFlowDomVm extends domCore.DomVm {
        GooFlowObj: any;
        GooFlowData: any;
        WorkHeight: number;
        WorkWidth: number;
        clickStep(name: string, type: string): any;
        delItem(id: string, type: string): any;
        addItem(id: string, type: string, json: any): any;
        newFlow(type: any, flowType: any): any;
        linePointMove(id: string, newStart: string, newEnd: string): any;
        IsChange: boolean;
        setName(): any;
        clearData(): any;
        mark(): any;
    }
    interface IGooFlowDomConfig {
        GooFlowData?: any;
        WorkHeight?: number;
        WorkWidth?: number;
        UniId?: string;
    }
    interface IItemName {
        id: string;
        type: string;
        json?: any;
    }
    interface IMoveLine {
        Id: string;
        newStartId: string;
        newEndId: string;
    }
    interface IItemReName {
        id: string;
        type: string;
        name: string;
    }
    class GooFlowDomVm extends domCore.DomVm implements IReactGooFlowDomVm {
        ReactType: typeof GooFlowDomReact;
        GooFlowObj: any;
        GooFlowData: any;
        WorkHeight: number;
        WorkWidth: number;
        constructor(config?: IGooFlowDomConfig);
        delItem(id: string, type: string): boolean;
        addItem(id: string, type: string, json: any): boolean;
        clickStep(id: string, type: string): void;
        linePointMove(id: string, newStart: string, newEnd: string): void;
        newFlow(type: any, flowType: any): void;
        setName(): void;
        mark(): void;
        clearData(): void;
    }
    class GooFlowDomStates extends domCore.DomStates {
    }
    class GooFlowDomProps extends domCore.DomProps<IReactGooFlowDomVm> {
    }
}
