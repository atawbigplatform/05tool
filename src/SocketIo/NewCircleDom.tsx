

import eventFile = require("01core/Event");
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

import inodeClientFile = require("./INodeClient");
import nodeGlob = require("./NodeClientGlobal");
export module NewCircleDom {
    export class NewCircleDomAction extends domCore.DomAction {
    }

    export class NewCircleDomReact extends domCore.DomReact<NewCircleDomProps, NewCircleDomStates, NewCircleDomAction> implements domCore.IReact {

        public state = new NewCircleDomStates();

        public pSender(): React.ReactElement<any> {
            return this.props.Vm.NewCount == 0 ? null :
                <div className="Hg-relative"><em className="label label-pill label-danger Hu-news-circle"
                    onClick={() => { this.props.Vm.clear(); } }
                    >{this.props.Vm.NewCount}
                </em></div>;
                
                 

        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }


    }

    export interface INewCircleDomConfig {
        NodeClientObj?: inodeClientFile.INodeClient;

    }

    export class NewCircleDomVm extends domCore.DomVm {
        public ReactType = NewCircleDomReact;
        public NewCount: number = 0;
        private fFun: Function;
        private NodeClientObj: inodeClientFile.INodeClient;

        public constructor(config?: INewCircleDomConfig) {
            super();
            if (config) {
                if (config.NodeClientObj) {
                    this.NodeClientObj = config.NodeClientObj;
                }
                else {
                    this.NodeClientObj = nodeGlob.NodeClientGlobal.Current();
                }
            } else {
                this.NodeClientObj = nodeGlob.NodeClientGlobal.Current();
            }

            this.NewCount = this.NodeClientObj.getNum();
            this.fFun = this.NodeClientObj.listenNotify((num: number) => {
                this.show(num);
                this.playMp3();
            });

            
        }

     

        public clear()
        {
            this.NodeClientObj.clear();
        }

        public show(num: number)
        {
            this.NewCount = num ;
            this.forceUpdate("");
        }

        public playMp3()
        {
            //function playMp3() {
                var myDom = $("#myMp3");
                if (myDom.length == 0) {
                    var myIframe :any = document.createElement("iframe");
                    myIframe.width = 0;
                    myIframe.height = 0;
                    myIframe.frameborder = 0;
                    myIframe.id = "myMp3";
                    myIframe.src = "/Content/Mp3.htm";

                    document.body.appendChild(myIframe);
                } else {
                    $("#myMp3").attr("src", "/Content/Mp3.htm");
                }
          //  }
        }

        public pDispose() {
            this.NodeClientObj.removeNotify(this.fFun);
            this.NodeClientObj = null;
            super.pDispose();
        }

    }
    export class NewCircleDomStates extends domCore.DomStates {
    }


    export class NewCircleDomProps extends domCore.DomProps<NewCircleDomVm>{
    }



}


