import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import eventFile = require("01core/Event");

utilFile.reqCss(["lib/akCss/atawPlatform-sass-1.0/dev/css/precode.css"]);
export module PreCodeDom {
    export class PreCodeDomAction extends domCore.DomAction {
    }

    export class PreCodeDomReact extends domCore.DomReact<PreCodeDomProps, PreCodeDomStates, PreCodeDomAction> implements domCore.IReact {

       

        public state = new PreCodeDomStates();

        private fDivId: string = eventFile.App.getUniId().toString(); //唯一ID

        public pSender(): React.ReactElement<any> {
            return <ol style={{ height: this.props.Vm.Height, overflow: "auto" }} className={"p-a Hm-precode " + ("ol" + this.fDivId)} >
           
                {this.props.Vm.CommandList.map((line, index) => {


                    return <li className="" key={index}><i className="fa fa-angle-double-right left Hu-precode-icon">{index}</i><span className="Hu-precode-content">{line}</span></li>;


                })}

            </ol>;
        }

        protected pComponentDidMount() {
          
            super.pComponentDidMount();

        }
        protected pInstall(): void {
            
            super.pInstall();
            this.props.Vm.getEmit("React").addListener("scrollTopgoto", () => {

                var _dom = ReactDOM.findDOMNode(this);  //获取节点
                if (_dom) {

                    var element = _dom.getElementsByClassName("ol" + this.fDivId);

                    _dom.scrollTop = _dom.scrollHeight;

                }
               
                //var element = documtent.getElementsByClassName("ol" + this.fDivId);

               
            });
        }

    }

    export interface IReactPreCodeDomVm extends domCore.DomVm {
        CommandList: string[];
        Height: number;
        Id: string;
    }

    export interface IPreCodeDomConfig {

        CommandList: string[];
        Height?: number;
    }

    export class PreCodeDomVm extends domCore.DomVm implements IReactPreCodeDomVm {
        public ReactType = PreCodeDomReact;

        public CommandList: string[] = [];
        public Height: number = 380;
        public Id: string;

        public constructor(config?: IPreCodeDomConfig) {
            super();

            if (config) {
                this.CommandList.push(...config.CommandList);
                if (config.Height) {
                    this.Height = config.Height;
                }
               
               

            }

        }

        public addCommandAndUpdate(command: string[])
        {
 
            this.CommandList.push(...command);
            this.forceUpdate("", () => {

                this.getEmit("React").emit("scrollTopgoto");

            });
        }



    }
    export class PreCodeDomStates extends domCore.DomStates {
    }


    export class PreCodeDomProps extends domCore.DomProps<IReactPreCodeDomVm>{
    }



}


