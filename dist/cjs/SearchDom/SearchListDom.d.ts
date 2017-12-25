/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module SeacherListDom {
    class SeacherListDomAction extends domCore.DomAction {
    }
    class SeacherListDomReact extends domCore.DomReact<SeacherListDomProps, SeacherListDomStates, SeacherListDomAction> implements domCore.IReact {
        state: SeacherListDomStates;
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
        private fSetHeight();
        Search_HighLight(Text: string): string;
        protected pInputOnChange(e: React.FormEvent<any>): void;
        protected fun_empty(): void;
        fun_regName(name: string): void;
    }
    interface IReactSeacherListDomVm extends domCore.DomVm {
        Sreachstring: string;
        IsEmpty: boolean;
        DataList: IEntity[];
        FiltDataList: Function;
        title: string;
        itemClickEmit(name: string, extObj: any): void;
    }
    interface IEntity {
        Name: string;
        DisplayName: string;
        Icon?: string;
    }
    interface ISeacherListDomConfig {
        DataList: IEntity[];
        UniId?: string;
    }
    interface IResultItem {
        Title: string;
        CustomObj?: any;
    }
    class SeacherListDomVm extends domCore.DomVm implements IReactSeacherListDomVm {
        ReactType: typeof SeacherListDomReact;
        Subtext: string;
        WUse: string;
        HUse: string;
        Sreachstring: string;
        IsEmpty: boolean;
        DataList: IEntity[];
        AllDataList: IEntity[];
        title: string;
        constructor(config?: ISeacherListDomConfig);
        itemClickEmit(title: string, extObj: any): void;
        FiltDataList(key: string): void;
    }
    class SeacherListDomStates extends domCore.DomStates {
    }
    class SeacherListDomProps extends domCore.DomProps<IReactSeacherListDomVm> {
    }
}
