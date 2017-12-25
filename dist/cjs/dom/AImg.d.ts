/// <reference types="react" />
import React = require("react");
export interface IAImg {
    Src: string;
    ClassName?: string;
    W?: number;
    H?: number;
    isDefault?: string;
}
export interface IAImgState {
    IsError: boolean;
}
export declare class AImg extends React.Component<IAImg, IAImgState> {
    constructor(props?: IAImg, context?: any);
    render(): React.ReactElement<any>;
    private _onError();
    private getSrcBySize();
}
