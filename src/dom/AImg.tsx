import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
export interface IAImg {

    Src: string;
    ClassName?: string;
    W?: number;
    H?: number;
    // Size?:string ;
    isDefault?: string;

}


export interface IAImgState {
    IsError: boolean;

}



export class AImg extends React.Component<IAImg, IAImgState> { 

    public constructor(props?: IAImg, context?: any)
    {
        super(props,context);
        this.state = { IsError: false  };
    }

    public render(): React.ReactElement<any> {


        if (this.state.IsError || !this.props.Src) {            
            return <div className={"cover " + this.props.isDefault} style={{ height: this.props.H, width: this.props.W }}></div>;
        } else {
            return <img src={this.getSrcBySize()} onError={() => { this._onError(); }} className={this.props.ClassName ? this.props.ClassName : ""} />;
           }
    }

    private _onError()
    {
        this.setState((s) => { return { IsError: true }});
    }

    private getSrcBySize()
    {
        if (this.props.W && this.props.H) {
            let _ss = this.props.Src.split(".");
           // let _end = _ss[_ss.length - 1];

            let _end = _ss.pop();

            return _ss.join(".") + "_" + this.props.W + "-" + this.props.H + "." + _end;
        }
        else {
            return this.props.Src;
        }
    }

}