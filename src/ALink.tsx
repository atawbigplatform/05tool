
import domFile = require("01core/0Dom");
import iocFile = require("01core/Ioc");
import utilFile = require("01core/Util");
import urlFile = require("01core/Url");

import React = require("react");
import ReactDOM = require("react-dom");
import decoratorFile = require("01core/Decorator");
import decorator = decoratorFile.Decorator.Decorator;
export module ui {

   
    export class ALinkReact extends React.Component<IAlinkOption, any>{
        
        public render(): React.ReactElement<any> {
           
            return <a onClick={() => { this.fun_AClick(); } } className={this.props.ClassName}>{this.props.children}</a>;
        };
  
        private fun_AClick() {
            if (this.props.href) {
                urlFile.Core.AkUrl.Current().openUrl(this.props.href,!this.props.IsUrl);
            }
        }


    }
    export interface IAlinkOption
    {
        ClassName?: string;
       
        IsUrl?: boolean;
        href: string;
    }

}