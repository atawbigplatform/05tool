/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module XScroll {
    class XScrollAction extends domCore.DomAction {
    }
    class XScrollReact extends domCore.DomReact<XScrollProps, XScrollStates, XScrollAction> implements domCore.IReact {
        state: XScrollStates;
        private fun_left_click();
        private fun_right_click();
        private setWidth();
        private fun_mouseDown(e);
        private fun_mouseUp();
        private fun_touch_begin(e);
        private fun_touch_end(e);
        private fun_touch_move(e);
        private move(clientX);
        private fun_mouseMove(e);
        private NumIndex;
        private showFun();
        pSender(): React.ReactElement<any>;
        protected pInstall(): void;
        protected pComponentWillUnmount(): void;
        private fExpandFun;
        protected pComponentDidMount(): void;
        private _resizeFun;
        protected pUnInstall(): void;
    }
    interface IXScrollConfig {
        Size?: number;
        FunSetInnerContent?: IReactContent;
    }
    interface IReactContent {
        (): React.ReactElement<any>[];
    }
    class XScrollVm extends domCore.DomVm {
        ReactType: typeof XScrollReact;
        Size: number;
        ScrollNum: number;
        ScrollStep: number;
        IsMove: boolean;
        X0: number;
        Width: number;
        IsFirstMove: boolean;
        Index: number;
        List: number[];
        FunSetInnerContent: IReactContent;
        IsHidden: boolean;
        constructor(config?: IXScrollConfig);
        reStart(): void;
        left(): void;
        right(): void;
    }
    class XScrollStates extends domCore.DomStates {
    }
    class XScrollProps extends domCore.DomProps<XScrollVm> {
    }
}
