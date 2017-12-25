/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare module FontDom {
    const FontFamily: string[];
    const FontSize: string[];
    const TextAlignData: ITextAlign[];
    const FontStateData: IFontState[];
    const FontAttrData: IFontState[];
    const FormatData: IFontState[];
    class FontDomAction extends domCore.DomAction {
    }
    interface ISetHexFun {
        (hex: string): void;
    }
    class FontDomReact extends domCore.DomReact<FontDomProps, FontDomStates, FontDomAction> implements domCore.IReact {
        state: FontDomStates;
        pSender(): React.ReactElement<any>;
        private _fontSateFun(a);
        protected pDomLoad(): void;
        private _senderColPick(calssName, setHexFun);
        private _toggle(cmd, proName);
        private _setFamily(cmd, family);
        private _setFontSize(cmd, size);
        private _setFontLine(cmd, line);
        private _setFontColor(cmd, type, color);
        private _setTextAlign(cmd, val);
        private _setSubsOrSuper(cmd, proName);
    }
    interface IFontData {
        FontFamily?: string;
        FontSize?: string;
        IsBold?: boolean;
        IsFontBorder?: boolean;
        IsItalic?: boolean;
        Line?: string;
        Color?: string;
        BackColor?: string;
        IsSuper?: boolean;
        IsSub?: boolean;
        TextAlign?: string;
        IsRemoveformat?: boolean;
        IsFormatmatch?: boolean;
        IsSet?: boolean;
    }
    interface ITextAlign {
        Text: string;
        Value: string;
        ClassName: string;
        Cmd?: string;
    }
    interface IFontState {
        Text: string;
        Mutex?: any;
        ProName?: string;
        ClassName: string;
        Cmd?: string;
    }
    interface IReactfontDomVm extends domCore.DomVm {
        FontStyelData: IFontData;
        setTextAlign(cmd: string, val: string): any;
        toggleState(cmd: string, proName: string): any;
        setFamily(cmd: string, family: string): any;
        setFontSize(cmd: string, size: string): any;
        setFontLine(cmd: string, line: string): any;
        setFontColor(cmd: string, type: string, color: string): any;
        setSubsOrSuper(cmd: string, proName: string): any;
    }
    interface IfontDomConfig extends domCore.IDomVmConfig {
        FontStyelData?: IFontData;
    }
    class FontDomVm extends domCore.DomVm implements IReactfontDomVm {
        ReactType: typeof FontDomReact;
        FontStyelData: IFontData;
        constructor(config?: IfontDomConfig);
        setFontData(data: IFontData): void;
        setFamily(cmd: any, family: any): void;
        setFontSize(cmd: any, size: any): void;
        toggleState(cmd: any, proName: string): void;
        setTextAlign(cmd: any, val: any): void;
        setFontColor(cmd: any, type: any, color: any): void;
        setFontLine(cmd: any, line: any): void;
        setSubsOrSuper(cmd: any, proName: any): void;
        private update(cmd?, cmdVal?);
    }
    class FontDomStates extends domCore.DomStates {
    }
    class FontDomProps extends domCore.DomProps<IReactfontDomVm> {
    }
}
