import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import eventFile = require("01core/Event");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import decoratorFile = require("01core/Decorator");
import decorator = decoratorFile.Decorator.Decorator;

export module SeacherListDom {
    export class SeacherListDomAction extends domCore.DomAction {
    }

    export class SeacherListDomReact extends domCore.DomReact<SeacherListDomProps, SeacherListDomStates, SeacherListDomAction> implements domCore.IReact {

        public state = new SeacherListDomStates();

        public pSender(): React.ReactElement<any> {
            return <div className="Hm-search-list">
                <div className="Hm-input-group input-group">
                    <input className="Hg-width form-control " type="text" value={this.props.Vm.Sreachstring} onChange={(e) => { this.pInputOnChange(e); return false; } }></input>
                    <i className={"Hu-search-close fa fa-close Hu-pointer" + (this.props.Vm.IsEmpty ? "" : " hide") } onClick={() => { this.fun_empty() } }></i>
                    <span className="input-group-addon Hu-pointer"><i className="fa fa-search"></i></span>
                </div>
                <p className="Hu-num">共有{this.props.Vm.DataList.length}条数据</p>
                <ul className="Hm-regname-list nav nav-pills" style={{ height: this.fSetHeight() }}>
                    {
                        this.props.Vm.DataList.map((p, index) => {
                            var title = "";
                            if (p.DisplayName == p.Name)
                                title = p.Name;
                            else
                                title = p.DisplayName + p.Name;
                            return <li key={index} className="nav-item Hu-pointer" onClick={() => { this.fun_regName(p.Name) }}><span className="Hf-text-overflow">{p.Icon ? <i className={p.Icon}></i> : null}
                                <span title={title} dangerouslySetInnerHTML={{ __html: this.Search_HighLight(title) }}></span></span></li>;
                        }
                        ) }
                </ul>
            </div>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }
        private fSetHeight() {
            var _n = $(window).height() - $('.ACT-HEADER-BODY').height() - 180;
            return _n;
        }

        public Search_HighLight(Text: string) {
            var key = this.props.Vm.Sreachstring;
            if (key) {
                var index = Text.toLowerCase().indexOf(key.toLowerCase());
                if (index != -1) {
                    if (index == 0) {
                        var str1 = "<b class='Hs-red'>" + Text.substr(0, key.length) + "</b>";
                        var str2 = Text.substring(key.length, Text.length);
                        Text = str1 + str2;
                    }
                    else {
                        var str1 = Text.substr(0, index);
                        var str2 = "<b class='Hs-red'>" + Text.substr(index, key.length) + "</b>";
                        var str3 = Text.substring(index + key.length, Text.length);
                        Text = str1 + str2 + str3;
                    }
                }
            }
            return Text;
        }
        protected pInputOnChange(e: React.FormEvent<any>) {
            var _val = e.target["value"];
            this.props.Vm.Sreachstring = _val;
            this.props.Vm.FiltDataList(_val);
            this.props.Vm.IsEmpty = true;
            this.forceUpdate();
        }

        protected fun_empty() {
            this.props.Vm.Sreachstring = "";
            this.props.Vm.FiltDataList("");
            this.props.Vm.IsEmpty = false;
            this.forceUpdate();
        }

        public fun_regName(name: string) {
            // this.props.Vm.title = name;
            this.props.Vm.itemClickEmit(name, null);
            //this.props.Vm.PageDetailDom = new PageDetailDom.PageBrowserDetailDom.PageBrowserDetailDomVm({ Url: "$" + name + "$" });
            //this.forceUpdate();


        }

    }

    export interface IReactSeacherListDomVm extends domCore.DomVm {
        Sreachstring: string;
        IsEmpty: boolean;
        DataList: IEntity[];
        FiltDataList: Function;
        title: string;
        itemClickEmit(name: string, extObj: any): void;
    }

    export interface IEntity {
        Name: string;
        DisplayName: string;
        Icon?: string;
    }
    export interface ISeacherListDomConfig {

        DataList: IEntity[];
        UniId?: string;
    }

    export interface IResultItem {
        Title: string;
        CustomObj?: any;
    }


  //  @decorator.setDecoratorCon("模糊查询搜索框")
    export class SeacherListDomVm extends domCore.DomVm implements IReactSeacherListDomVm {
        public ReactType = SeacherListDomReact;

     //   @decorator.setDecoratorProps("小标题", "", "允许只输入部分字符串，根据这部分字符串自动搜索和匹配。")
        public Subtext: string;
    //    @decorator.setDecoratorProps("何时使用", "", "◇ 适用于各种数据的快速检索")
        public WUse: string;
     //   @decorator.setDecoratorProps("如何使用", "", "1.引入组件  import searchFile = require(\"./../../05tool/05tool/ SearchDom / SearchListDom\");")
        public HUse: string;

     //   @decorator.setDecoratorProps("搜索字符","string")
        public Sreachstring: string = "";

    //    @decorator.setDecoratorProps("是否隐藏关闭按钮","boolean","false")
        public IsEmpty: boolean = false;


        public DataList: IEntity[] = [];
        public AllDataList: IEntity[] = [];

      //  @decorator.setDecoratorProps("显示单条下拉框列表的内容","string")
        public title: string;

        public constructor(config?: ISeacherListDomConfig) {
            super();
            if (config) {
                this.AllDataList = config.DataList;
                this.UniId = config.UniId;
                this.DataList = this.AllDataList.map((a) => { return a; });
            }
            if (!this.UniId) {
                this.UniId = "SeacherListDomVm" + eventFile.App.getUniId();
            }

        }

        public itemClickEmit(title: string, extObj: any): void {
            var _obj: IResultItem = { Title: title, CustomObj: extObj };
            this.emitAppEvent("SDK_AllPage_Search", this.UniId, _obj);
            this.emitAppEvent("allcolpage", this.UniId, title);
        }

        public FiltDataList(key: string) {
            this.DataList = [];
            this.AllDataList.map((a) => {
                var title = ""
                if (a.Name == a.DisplayName)
                    title = a.Name;
                else
                    title = a.DisplayName + a.Name;
                if (title.toLowerCase().indexOf(key.toLowerCase()) != -1) {
                    this.DataList.push(a);
                }
            })

            this.forceUpdate("");

        }

    }
    export class SeacherListDomStates extends domCore.DomStates {
    }


    export class SeacherListDomProps extends domCore.DomProps<IReactSeacherListDomVm>{
    }



}



