/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
export declare const LoadingText: React.SFC<{
    children?: any;
}>;
export declare module LoadingDom {
    class LoadingDomAction extends domCore.DomAction {
    }
    class LoadingDomReact extends domCore.DomReact<LoadingDomProps, LoadingDomStates, LoadingDomAction> implements domCore.IReact {
        state: LoadingDomStates;
        pSender(): React.ReactElement<any>;
        private fLoadingDiv(n);
        protected pComponentDidMount(): void;
    }
    interface IReactLoadingDomVm extends domCore.DomVm {
        LoadingClassNameString: string;
        Num: number;
        ScaleNum: number;
    }
    interface ILoadingDomConfig {
        LoadingClassName: LoadingClassNameEnum;
        Num?: number;
        ScaleNum?: number;
    }
    enum LoadingClassNameEnum {
        Pacman = 100,
        BallPulse = 101,
        Colors = 102,
        Timer = 103,
        BallClipRotate = 104,
        BallClipRotatePulse = 105,
        SquareSpin = 106,
        BallRise = 107,
        BallRotate = 108,
        LineScaleParty = 109,
        CubeTransition = 110,
        BallZigZag = 111,
        TriangleSkewSpin = 112,
        BallSpinFadeLoader = 113,
        LineSpinFadeLoader = 114,
        SemiCircleSpin = 115,
    }
    interface ILoadingDataHash {
        [index: string]: string;
    }
    const ColorsLoading: () => LoadingDomVm;
    const MircLoading: () => LoadingDomVm;
    const TimeLoading: () => LoadingDomVm;
    const LoadingDataHash: ILoadingDataHash;
    class LoadingDomVm extends domCore.DomVm implements IReactLoadingDomVm {
        ReactType: typeof LoadingDomReact;
        Subtext: string;
        WUse: string;
        LoadingClassName: LoadingClassNameEnum;
        Num: number;
        LoadingClassNameString: string;
        ScaleNum: number;
        constructor(config?: ILoadingDomConfig);
    }
    class LoadingDomStates extends domCore.DomStates {
    }
    class LoadingDomProps extends domCore.DomProps<IReactLoadingDomVm> {
    }
}
