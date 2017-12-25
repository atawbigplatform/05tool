/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module EditSpan {
    class EditSpanAction extends domCore.DomAction {
    }
    interface IChangeEvent {
        (vm: EditSpanVm, isChange: boolean): void;
    }
    class EditSpanReact extends domCore.DomReact<EditSpanProps, EditSpanStates, EditSpanAction> implements domCore.IReact {
        state: EditSpanStates;
        private fun_txtChange(e);
        private fun_SpanClick();
        private fun_PencilClick();
        private _initEditor();
        private _initSpan();
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
    }
    interface IEditSpanVm {
        Content?: string;
        Placeholder?: string;
        ChangeEvent?: IChangeEvent;
        Type?: string;
        ClassName?: string;
        TextEditName?: string;
    }
    class EditSpanVm extends domCore.DomVm {
        ReactType: typeof EditSpanReact;
        Subtext: string;
        WUse: string;
        HUse: string;
        Content: string;
        Placeholder: string;
        OriContent: string;
        IsEdit: boolean;
        ChangeEvent: IChangeEvent;
        Type: string;
        ClassName: string;
        TextEditName: string;
        constructor(config?: IEditSpanVm);
        spanClick(): void;
        private onChangeValueEvent(fun);
    }
    class EditSpanStates extends domCore.DomStates {
    }
    class EditSpanProps extends domCore.DomProps<EditSpanVm> {
    }
}
