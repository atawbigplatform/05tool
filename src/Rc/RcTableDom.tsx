
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import decoratorFile = require("01core/Decorator");
import decorator = decoratorFile.Decorator.Decorator;

import Table from 'rc-table';
//import tableFile = require("antd/lib/Table");
utilFile.reqCss(["/ts/lib/rc-table/rc-table.css"]);


export module RcTableDom {
    export class RcTableDomAction extends domCore.DomAction {
    }

    export interface IColumn
    {
        Title: string;
        Key: string;
        Width?: number;
        Fixed?: string;
        Name: string;
    }



    export class RcTableDomReact extends domCore.DomReact<RcTableDomProps, RcTableDomStates, RcTableDomAction> implements domCore.IReact {

        public state = new RcTableDomStates();

        public pSender(): React.ReactElement<any> {
            return <div><Table columns={this.props.Vm.columns} scroll={{ x: true, y: 300 }} data={this.props.Vm.data} /></div>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }


    }

    export interface IReactRcTableDomVm extends domCore.DomVm {
         columns: any;
         data: any[];
    }

    export interface IRcTableDomConfig {
        Columns: IColumn[];
        Data: any[];

    }

   // @decorator.setDecoratorCon("第三方表格插件")
    export class RcTableDomVm extends domCore.DomVm implements IReactRcTableDomVm {
        public ReactType = RcTableDomReact;

    //    @decorator.setDecoratorProps("小标题", "", "RcTable表格插件")
        public Subtext: string;
     //   @decorator.setDecoratorProps("何时使用", "", "◇ 需要表格的头部、左侧第一列、右侧最后一列固定等功能，可以使用此插件")
        public WUse: string;
     //   @decorator.setDecoratorProps("如何使用", "", "")
        public HUse: string;

      //  @decorator.setDecoratorProps("列","数组")
        public columns: any[];

      //  @decorator.setDecoratorProps("单元格数据","数组")
        public data: any[];

        public constructor(config?: IRcTableDomConfig) {
            super();
            if (config.Columns) {
                let _length = config.Columns.length;
                this.columns = config.Columns.map((c,index) => {
                    return {
                        title: c.Title,
                        dataIndex: c.Name,
                        key: index,

                        width: 150,
                        fixed: index == 0 ? "left" : ((_length > 2  && (index == _length - 1)) ? "right" : c.Fixed) 
                    };
                });
                
            }
            this.data = config.Data;
        }

    }
    export class RcTableDomStates extends domCore.DomStates {
    }


    export class RcTableDomProps extends domCore.DomProps<IReactRcTableDomVm>{
    }



}


