/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare namespace Web {
    class ThDomAction extends domCore.DomAction {
    }
    class ThDomReact extends domCore.DomReact<ThDomProps, ThDomStates, ThDomAction> implements domCore.IReact {
        state: ThDomStates;
        pSender(): React.ReactElement<any>;
        protected pInstall(): void;
        protected pComponentDidMount(): void;
        private x0;
        private x1;
        private onDrag(e);
        private onThDrag(t);
        private getWidth();
        private pFixWidth();
        fixWidth(): void;
    }
    class ThDomVm extends domCore.DomVm {
        ReactType: typeof ThDomReact;
        Text: string;
        Width: number;
        fixWidth(): void;
    }
    class ThDomStates extends domCore.DomStates {
    }
    class ThDomProps extends domCore.DomProps<ThDomVm> {
    }
}
