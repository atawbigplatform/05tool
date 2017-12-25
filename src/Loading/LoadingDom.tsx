import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import decoratorFile = require("01core/Decorator");
import decorator = decoratorFile.Decorator.Decorator;


export const LoadingText: React.SFC<{ children?: any }> = ({  children}) => {
    return <span><i className="fa  fa-spinner fa-spin "></i>{children}</span>;
}


export module LoadingDom {
    export class LoadingDomAction extends domCore.DomAction {
    }

    export class LoadingDomReact extends domCore.DomReact<LoadingDomProps, LoadingDomStates, LoadingDomAction> implements domCore.IReact {

        public state = new LoadingDomStates();

        public pSender(): React.ReactElement<any> {
            return <div className="Hm-loading-panel">
            <div className={this.props.Vm.LoadingClassNameString} style={{ "transform": "scale(" + this.props.Vm.ScaleNum + ") " }}>

                {
                    this.fLoadingDiv(this.props.Vm.Num)
                }
               </div>

            </div>;
        }

        private fLoadingDiv(n: number): React.ReactElement<any>[] {
            var res: React.ReactElement<any>[] = []
            var n = this.props.Vm.Num;
           
            for (var i = 0; i < n; i++) {
                var _div = <div key={i}></div>;
                res.push(_div);
            }
            return res;
        }


        protected pComponentDidMount() {
            super.pComponentDidMount();

        }


    }

    export interface IReactLoadingDomVm extends domCore.DomVm {
        LoadingClassNameString: string;
        Num: number;
        ScaleNum: number;
    }

    export interface ILoadingDomConfig {

        LoadingClassName: LoadingClassNameEnum;
        Num?: number;
        ScaleNum?: number;
    }
    export enum LoadingClassNameEnum {
        Pacman = 100,
        BallPulse,
        Colors,
        Timer,
        BallClipRotate,
        BallClipRotatePulse,
        SquareSpin,
        BallRise,
        BallRotate,
        LineScaleParty,
        CubeTransition,
        BallZigZag,
        TriangleSkewSpin,
        BallSpinFadeLoader,
        LineSpinFadeLoader,
        SemiCircleSpin
    }

    export interface ILoadingDataHash {
        [index: string]: string;
    }

    export const ColorsLoading = function () {
        return new LoadingDomVm({ LoadingClassName: LoadingClassNameEnum.Colors, Num: 5 });
    }
    export const MircLoading = function () {
        return new LoadingDomVm({ LoadingClassName: LoadingClassNameEnum.Pacman, Num: 5, ScaleNum: 0.3 });
    }
    export const TimeLoading = function () {
        return new LoadingDomVm({ LoadingClassName: LoadingClassNameEnum.Timer, Num: 1, ScaleNum: 2 });
    }
    export const LoadingDataHash: ILoadingDataHash = {
        Pacman: "Hu-pacman",
        BallPulse: "Hu-ball-pulse",
        Colors: "Hu-colors",
        Timer: "Hu-timer",
        BallClipRotate: "Hu-ball-clip-rotate",
        BallClipRotatePulse: "Hu-ball-clip-rotate-pulse",
        SquareSpin: "Hu-square-spin",
        BallRise: "Hu-ball-pulse-rise",
        BallRotate: "Hu-ball-rotate",
        LineScaleParty: "Hu-line-scale-party",
        CubeTransition: "Hu-cube-transition",
        BallZigZag: "Hu-ball-zig-zag",
        TriangleSkewSpin: "Hu-triangle-skew-spin",
        BallSpinFadeLoader: "Hu-ball-spin-fade-loader",
        LineSpinFadeLoader: "Hu-line-spin-fade-loader",
        SemiCircleSpin: "Hu-semi-circle-spin"
    }

  //  @decorator.setDecoratorCon("加载中 LoadingDom")
    export class LoadingDomVm extends domCore.DomVm implements IReactLoadingDomVm {
        public ReactType = LoadingDomReact;

    //    @decorator.setDecoratorProps("小标题", "","刷新动画库")
        public Subtext: string;
     //   @decorator.setDecoratorProps("何时使用","", "◇ ")
        public WUse: string;

        public LoadingClassName: LoadingClassNameEnum;

     //   @decorator.setDecoratorProps("组件div数量","number","3")
        public Num: number = 3;

      //  @decorator.setDecoratorProps("样式名")
        public LoadingClassNameString: string;

      //  @decorator.setDecoratorProps("缩放大小","number")
        public ScaleNum: number;

        public constructor(config?: ILoadingDomConfig) {
            super();

            if (config) {
                if (config.LoadingClassName) {
                    this.LoadingClassName = config.LoadingClassName;
                }
                if (config.ScaleNum) {
                    this.ScaleNum = config.ScaleNum;
                }
                if (config.Num) {
                    this.Num = config.Num;
                }
                else {
                    if (this.LoadingClassName == LoadingClassNameEnum.Pacman) {
                        this.Num = 5;
                    }
                }

            }

            this.LoadingClassNameString = LoadingDataHash[LoadingClassNameEnum[this.LoadingClassName]];


        }

    }
    export class LoadingDomStates extends domCore.DomStates {
    }


    export class LoadingDomProps extends domCore.DomProps<IReactLoadingDomVm>{
    }



}


