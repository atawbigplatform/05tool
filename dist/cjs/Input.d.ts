/// <reference types="react" />
import React = require("react");
export interface IInputReact {
    Text?: string;
    inputOnChange?: (e: any) => void;
    onFocus?: (e: any) => void;
    IsMulitText?: boolean;
    IsUe?: boolean;
    Disabled?: boolean;
    PxWidth?: number;
    PxHeight?: number;
    Border?: string;
}
export declare const InputReact: React.SFC<IInputReact>;
