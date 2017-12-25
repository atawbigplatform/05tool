/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
import jsonViewFile = require("./../JsonView");
export declare module ImageViewDom {
    class ImageViewDomAction extends domCore.DomAction {
    }
    class ImageViewDomReact extends domCore.DomReact<ImageViewDomProps, ImageViewDomStates, ImageViewDomAction> implements domCore.IReact {
        state: ImageViewDomStates;
        private _isAmount;
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
        private _checkSpan(sign, ischeck);
        private fTextChange(e, sign?);
        private fImgError(a);
    }
    interface IReactImageViewDomVm extends domCore.DomVm {
        ImagePath: string;
        HasImage: boolean;
        OrgImagePath: string;
        ImgWidth: number;
        ImgHeight: number;
        setOrgPath(): any;
        CheckDict: IImgCheckDic;
        JsonViewObj: jsonViewFile.JsonView.JsonViewVm;
    }
    interface IImageViewDomConfig {
    }
    interface IImgCheckDic {
        [name: string]: boolean;
    }
    class ImageViewDomVm extends domCore.DomVm implements IReactImageViewDomVm {
        ReactType: typeof ImageViewDomReact;
        ImagePath: string;
        OrgImagePath: string;
        HasImage: boolean;
        ImgWidth: number;
        ImgHeight: number;
        CheckDict: IImgCheckDic;
        ImageInfo: any;
        JsonViewObj: jsonViewFile.JsonView.JsonViewVm;
        constructor(config?: IImageViewDomConfig);
        setOrgPath(): void;
        private _setPath();
    }
    class ImageViewDomStates extends domCore.DomStates {
    }
    class ImageViewDomProps extends domCore.DomProps<IReactImageViewDomVm> {
    }
    interface IRadioSpanReact {
        IsCheck?: boolean;
        onClick?: (isCheck: boolean) => void;
        children?: any;
    }
    const RadioSpanReact: React.SFC<IRadioSpanReact>;
}
