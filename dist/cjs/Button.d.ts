/// <reference types="react" />
import domFile = require("01core/0Dom");
import React = require("react");
export declare module ui {
    class ButtonAction extends domFile.Core.DomAction {
    }
    class ButtonReact extends domFile.Core.DomReact<ButtonProps, ButtonStates, ButtonAction> {
        pSender(): React.ReactElement<any>;
    }
    class ButtonBoxReact extends domFile.Core.DomReact<ButtonProps, ButtonStates, ButtonAction> {
        pSender(): React.ReactElement<any>;
        pBoxSender(): React.ReactElement<any>;
    }
    interface IButtonVmConfig {
        Name?: string;
        DisplayName?: string;
        FaCss?: string;
        IconCss?: string;
        KindCss?: string;
        NoEnable?: boolean;
        ClickFun?: Function;
        Right?: string;
        IsData?: boolean;
        IsNoBg?: boolean;
    }
    class ButtonVm extends domFile.Core.DomVm {
        ButtonBoxReact(): React.ReactElement<any>;
        ReactType: typeof ButtonReact;
        Subtext: string;
        WUse: string;
        HUse: string;
        Name: string;
        DisplayName: string;
        FaCss: string;
        IconCss: string;
        NoEnable: boolean;
        KindCss: string;
        ClickFun: Function;
        Right: string;
        IsData: boolean;
        IsNoBg: boolean;
        constructor(config?: IButtonVmConfig);
    }
    class ButtonProps extends domFile.Core.DomProps<ButtonVm> {
    }
    class ButtonStates extends domFile.Core.DomStates {
    }
}
