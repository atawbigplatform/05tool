var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "01core/Util"], function (require, exports, utilFile1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dateInitJs = function (dom, changeFun, isDateTime, isInAndAfterToday) {
        return __awaiter(this, void 0, void 0, function* () {
            let laydateArgs = yield utilFile1.Core.Util.AsyncJsPromise(["/AtawStatic/lib/03Extend/laydate/laydate.js", "/AtawStatic/lib/03Extend/laydate/theme/default/laydate.css"]);
            let laydate = laydateArgs[0];
            let _obj;
            let _option = {
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
                _option = Object.assign({}, _option, {
                    min: new Date(new Date().setDate(new Date().getDate() + 1)).toDateString(),
                    ready: function () {
                        _obj.hint('日期可选值设定在 今天以后... ');
                    }
                });
            }
            try {
                _obj = laydate.render(_option);
            }
            catch (ex) {
                console.log(ex);
                alert(ex + " 时间控件出错了");
            }
        });
    };
});
//# sourceMappingURL=Date.js.map