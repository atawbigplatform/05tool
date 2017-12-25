/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module TabDom {
    class TabDomAction extends domCore.DomAction {
    }
    class TabDomReact extends domCore.DomReact<TabDomProps, TabDomStates, TabDomAction> implements domCore.IReact {
        state: TabDomStates;
        pSender(): React.ReactElement<any>;
        private fun_TabsClick(item);
        private fun_WorkShow();
        protected pComponentDidMount(): void;
    }
    interface ITabDomItem {
        Name?: string;
        Title: string;
        DomObj: domCore.DomVm;
        IsActive?: boolean;
        LoadKind?: string;
        ReloadFun?: IReloadFun;
        IsNoFirst?: boolean;
        TitleDomObj?: domCore.DomVm;
        Index?: number;
    }
    interface IReloadFun {
        (item: ITabDomItem): void;
    }
    interface ITabDomConfig {
        Items: ITabDomItem[];
    }
    class TabDomVm extends domCore.DomVm {
        ReactType: typeof TabDomReact;
        Subtext: string;
        WUse: string;
        HUse: string;
        TabDomItemList: ITabDomItem[];
        IsHide: boolean;
        constructor(config?: ITabDomConfig);
        tabActive(item: ITabDomItem): void;
    }
    class TabDomStates extends domCore.DomStates {
    }
    class TabDomProps extends domCore.DomProps<TabDomVm> {
    }
}
