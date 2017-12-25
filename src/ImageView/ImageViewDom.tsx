

import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import jsonViewFile = require("./../JsonView");

export module ImageViewDom {
    export class ImageViewDomAction extends domCore.DomAction {
    }

    export class ImageViewDomReact extends domCore.DomReact<ImageViewDomProps, ImageViewDomStates, ImageViewDomAction> implements domCore.IReact {

        public state = new ImageViewDomStates();
        private _isAmount: boolean;

        public pSender(): React.ReactElement<any> {
            return <div>
                <input type="text" value={this.props.Vm.OrgImagePath} onChange={(e) => { this.fTextChange(e); }} className="Hg-width form-control" ></input>
                <div>{this.props.Vm.ImagePath}</div>
                <div className="panel panel-primary">
                    宽:
                    <input type="number" value={this.props.Vm.ImgWidth} onChange={(e) => { this.fTextChange(e, "w"); }}  ></input>
                    高:
                    <input type="number" value={this.props.Vm.ImgHeight} onChange={(e) => { this.fTextChange(e, "h"); }}  ></input>
                </div>
                <div className="panel panel-primary">
                    <div> <RadioSpanReact IsCheck={this.props.Vm.CheckDict["m"]} onClick={(check) => { return this._checkSpan("m", check); }} > 比原图大原图返回，否则是补框 m</RadioSpanReact></div>
                    <div><RadioSpanReact IsCheck={this.props.Vm.CheckDict["s"]} onClick={(check) => { return this._checkSpan("s", check); }} >表示比原图小的话会补，否则是裁s</RadioSpanReact></div>
                    <div><RadioSpanReact IsCheck={this.props.Vm.CheckDict["o"]} onClick={(check) => { return this._checkSpan("o", check); }} >强制原图返回o</RadioSpanReact></div>
                    <div> <RadioSpanReact IsCheck={this.props.Vm.CheckDict["f"]} onClick={(check) => { return this._checkSpan("f", check); }}  >强制切图无视缓存f</RadioSpanReact></div>
                    <div><RadioSpanReact IsCheck={this.props.Vm.CheckDict["r"]} onClick={(check) => { return this._checkSpan("r", check); }} >返回图片信息r</RadioSpanReact></div>

                </div>
                <div className="row">
                    {this.props.Vm.HasImage ? <img className="img-thumbnail" src={this.props.Vm.ImagePath} onError={(a) => { this.fImgError(a); }} /> : "没有图片"}
                </div>
                <div className="row">
                    {this._tDom(this.props.Vm.JsonViewObj)}
                </div>
            </div>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();
            this._isAmount = true;
        }

        private _checkSpan(sign: string, ischeck: boolean): boolean {

            this.props.Vm.CheckDict[sign] = ischeck;
            this.forceUpdate(() => {
                this.props.Vm.setOrgPath();
                this.forceUpdate();
            });
            return true;
        }

        private fTextChange(e: React.FormEvent<any>, sign?: string) {
            let _val: string = e.target["value"];

            switch (sign) {
                case "w":
                    this.props.Vm.ImgWidth = parseInt(_val);
                    break;
                case "h":
                    this.props.Vm.ImgHeight = parseInt(_val);
                    break;
                default:
                    this.props.Vm.OrgImagePath = _val;
                    this.props.Vm.HasImage = true;
            }

            this.props.Vm.setOrgPath();
            this.forceUpdate();

        }

        private fImgError(a) {
            if (this.props.Vm.HasImage) {
                this.props.Vm.HasImage = false;
                //if(this.ism)
                if (this._isAmount) {
                    this.forceUpdate(() => {
                        this.props.Vm.HasImage = true;
                    });
                }
            }

        }


    }

    export interface IReactImageViewDomVm extends domCore.DomVm {
        ImagePath: string;
        HasImage: boolean;
        OrgImagePath: string;

        ImgWidth: number;
        ImgHeight: number;
        setOrgPath();
        CheckDict: IImgCheckDic;
        JsonViewObj: jsonViewFile.JsonView.JsonViewVm;
    }

    export interface IImageViewDomConfig {


    }

    export interface IImgCheckDic {
        [name: string]: boolean;
    }

    export class ImageViewDomVm extends domCore.DomVm implements IReactImageViewDomVm {
        public ReactType = ImageViewDomReact;
        public ImagePath: string;
        public OrgImagePath: string = "http://imghz.ataw.cn/Core/User/logo/20171205095024837AD0AB429F13C34B54AE376F4FDF8B1A4E.jpg";
        public HasImage: boolean;

        public ImgWidth: number;
        public ImgHeight: number;
        public CheckDict: IImgCheckDic = {};
        public ImageInfo: any;
        public JsonViewObj: jsonViewFile.JsonView.JsonViewVm;

        public constructor(config?: IImageViewDomConfig) {
            super();

            this.setOrgPath();
            this.HasImage = this.ImagePath ? true : false;
        }


        public setOrgPath() {
            this._setPath();
            this.HasImage = true;
        }

        private _setPath() {

            const _paths = this.OrgImagePath.split(".");
            const _length = _paths.length;
            if (_length >= 2) {
                //let _len2 = _paths[_length - 2];
                let _check = "";
                for (const n in this.CheckDict) {
                    if (this.CheckDict[n]) {
                        _check += n;
                    }
                }
                if (_check) {
                    _check = "$" + _check + "$";
                    _paths[_length - 2] = _paths[_length - 2] + _check;
                }

                if (this.ImgWidth > 0 && this.ImgHeight > 0) {
                    _paths[_length - 2] = _paths[_length - 2] + "_" + this.ImgWidth + "-" + this.ImgHeight;
                }
            }
            this.ImagePath = _paths.join(".");
            if (this.CheckDict["r"]) {
                this.HasImage = false;
                urlFile.Core.AkPost(this.ImagePath, {}, (_data) => {
                    this.JsonViewObj = new jsonViewFile.JsonView.JsonViewVm({ data: _data, IsCollapse: true });
                    this.forceUpdate("");
                }, { method: "GET" });

            }
        }
    }
    export class ImageViewDomStates extends domCore.DomStates {
    }


    export class ImageViewDomProps extends domCore.DomProps<IReactImageViewDomVm>{
    }


    export interface IRadioSpanReact {
        IsCheck?: boolean;
        onClick?: (isCheck: boolean) => void;
        children?: any;
    }

    export const RadioSpanReact: React.SFC<IRadioSpanReact> = (props) => {


        return <span>
            <i
                className={"Hu-checkbox Hu-pointer " + (props.IsCheck ? "icon-check fa fa-check-square-o " : "icon-check-empty fa fa-square-o")}
                data-value={props.IsCheck ? "true" : "false"}
                onClick={(e) => { return props.onClick ? props.onClick(!props.IsCheck) : false; }}
            ></i>{props.children}
        </span>

    };





}


