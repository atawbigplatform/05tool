/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module MonacoEditor {
    class MonacoEditorAction extends domCore.DomAction {
    }
    enum CodeType {
        html = 1,
        csharp = 2,
        xml = 3,
        javascript = 4,
        typescript = 5,
        sql = 6,
    }
    class MonacoEditorReact extends domCore.DomReact<MonacoEditorProps, MonacoEditorStates, MonacoEditorAction> implements domCore.IReact {
        state: MonacoEditorStates;
        private getHeight();
        private getEdiotrVal_fun();
        private setEdiotrVal_fun(str);
        private resetEdiotrVal();
        private sendButton();
        protected pComponentDidUpdate(prevProps: MonacoEditorProps, prevState: MonacoEditorStates, prevContext: any): void;
        pSender(): React.ReactElement<any>;
        private slelectTheme(e);
        private fIsInit;
        private fEditorObj;
        private fLastContentList;
        private fInit();
        protected pInstall(): void;
        resetClick(): void;
    }
    interface IReactMonacoEditorVm extends domCore.DomVm {
        CodeType: CodeType;
        getCodeTypeStr(): string;
        ContentList: string[];
        toggleGetValBtn(val: string[], content: string): any;
        HasOptButton: boolean;
    }
    interface IMonacoEditorConfig {
        CodeType?: CodeType;
        ContentList?: string[];
        UniId?: string;
        HasOptButton?: boolean;
        Height?: number;
    }
    class MonacoEditorVm extends domCore.DomVm implements IReactMonacoEditorVm {
        ReactType: typeof MonacoEditorReact;
        CodeType: CodeType;
        ContentList: string[];
        HasOptButton: boolean;
        Height: number;
        constructor(config?: IMonacoEditorConfig);
        getCodeTypeStr(): string;
        toggleGetValBtn(val: string[], content: string): void;
    }
    class MonacoEditorStates extends domCore.DomStates {
    }
    class MonacoEditorProps extends domCore.DomProps<IReactMonacoEditorVm> {
    }
}
