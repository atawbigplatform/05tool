/// <reference types="react" />
import React = require("react");
export declare module ui {
    class ALinkReact extends React.Component<IAlinkOption, any> {
        render(): React.ReactElement<any>;
        private fun_AClick();
    }
    interface IAlinkOption {
        ClassName?: string;
        IsUrl?: boolean;
        href: string;
    }
}
