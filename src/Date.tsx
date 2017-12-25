import utilFile1 = require("01core/Util");

export const dateInitJs = async function (
    dom: Element,
    changeFun?: (val: string) => void,
    isDateTime?: boolean,
    isInAndAfterToday?: boolean) {

    let laydateArgs = await utilFile1.Core.Util.AsyncJsPromise(["/AtawStatic/lib/03Extend/laydate/laydate.js", "/AtawStatic/lib/03Extend/laydate/theme/default/laydate.css"]);
    let laydate = laydateArgs[0];
    let _obj;
    let _option: any = {
        elem: dom,
        type: isDateTime ? 'datetime' : "date",
        done: (value, date) => {
            if (changeFun) {
                changeFun(value);
            }
            //  alert('done : 你选择的日期是：' + value + '\n\n获得的对象是' + JSON.stringify(date));
        }
    };

    if (isInAndAfterToday) {
        _option = {
            ..._option, ...{
                min: new Date(new Date().setDate(new Date().getDate() + 1)).toDateString(),
                ready: function () {
                    _obj.hint('日期可选值设定在 今天以后... ');
                }
            }
        };
    }

    try {
        _obj = laydate.render(_option);
    }

    catch (ex) {
        console.log(ex);
        alert(ex + " 时间控件出错了");
    }



}