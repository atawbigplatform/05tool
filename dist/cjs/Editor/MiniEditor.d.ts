/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module MiniEditor {
    class MiniEditorAction extends domCore.DomAction {
    }
    class MiniEditorReact extends domCore.DomReact<MiniEditorProps, MiniEditorStates, MiniEditorAction> implements domCore.IReact {
        state: MiniEditorStates;
        private fIsSourceCode;
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
        private _btnClick();
        private _togglrSource();
        private _textChange(e);
        private _EditorObj;
        protected pDomLoad(): void;
    }
    interface IReactMiniEditorVm extends domCore.DomVm {
        Content?: string;
        sureContent(): any;
    }
    interface IMiniEditorConfig extends domCore.IDomVmConfig {
        Content?: string;
    }
    class MiniEditorVm extends domCore.DomVm implements IReactMiniEditorVm {
        ReactType: typeof MiniEditorReact;
        Content: string;
        constructor(config?: IMiniEditorConfig);
        sureContent(): void;
    }
    class MiniEditorStates extends domCore.DomStates {
    }
    class MiniEditorProps extends domCore.DomProps<IReactMiniEditorVm> {
    }
}
