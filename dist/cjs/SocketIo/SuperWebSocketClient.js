define(["require", "exports", "01core/Event", "01core/Util", "01core/Url", "01core/Ioc"], function (require, exports, eventFile, utilFile, urlFile, iocFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SuperWebSocketClient {
        constructor() {
            this.fNum = 0;
        }
        getNum() {
            return this.fNum;
        }
        clear() {
            this.fNum = 0;
            this.getEmit().emit("notify", this.fNum);
        }
        notify() {
            utilFile.Core.Util.Noty("有消息到达...");
            // notificationFile.WebNotification.Notification.fun_Notification("", "有消息到达...");
            this.numNotify();
        }
        numNotify() {
            this.fNum++;
            this.getEmit().emit("notify", this.fNum);
        }
        listenCmd(cmd, fun) {
            this.getEmit().addListener("command-" + cmd, fun);
        }
        removeCmd(cmd) {
            this.getEmit().removeAllListeners("command-" + cmd);
        }
        listenNotify(fun) {
            let _fun = this.getEmit().addListener("notify", fun);
            return _fun;
        }
        removeNotify(fun) {
            this.getEmit().removeListener("notify", fun);
        }
        static Current() {
            if (!this.fClient) {
                this.fClient = new SuperWebSocketClient();
            }
            return this.fClient;
        }
        getEmit() {
            if (!this.fEventBus) {
                this.fEventBus = new eventFile.Core.EventBus();
            }
            return this.fEventBus.CustomEvent;
        }
        loadUrl(callback) {
            $.ajax({
                dataType: "json",
                url: this.fUrl,
                success: (a) => {
                    var _data = a;
                    this.WsData = _data;
                    if (callback) {
                        callback();
                    }
                }
            });
            //urlFile.Core.AkPost(this.fUrl, {}, (a) => {
            //    var _data: IWebScocketData = a;
            //    this.WsData = _data;
            //    if (callback) {
            //        callback();
            //    }
            //}, { method:"GET" });
        }
        asyLoadUrl() {
            return new Promise((resolver) => {
                this.loadUrl(resolver);
            });
        }
        fSetClientId(userId) {
            let _reqData = {
                AppName: this.AppName,
                UserId: userId,
                NodeCmd: "setclientid"
            };
            // this.fSendCommand(_reqData);
            return _reqData;
        }
        sendCommand(data) {
            data.AppName = this.AppName;
            let _users = data.ClientList.IdList.map((c) => { return c.Id; });
            if (data.Data) {
                //messageList
                urlFile.Core.AkPost("/dev/socketio/messageList", { ids: _users, mesg: data.Data }, (a) => {
                });
            }
            else {
                urlFile.Core.AkPost("/dev/socketio/notifyList", { ids: _users }, (a) => {
                });
            }
        }
        fSendCommand(ws, data, callback) {
            //---
            ws.send(JSON.stringify(data));
            if (callback)
                callback();
        }
        connectWs(callback) {
            let url = this.fUrl.split("//")[1];
            url = url.split(":")[0];
            var fullUrl = "ws://" + url + ":" + this.WsData.Port + "/" + Date.parse(new Date().toString());
            // var ws: WebSocket = null;
            if (!this.Ws) {
                if ("WebSocket" in window) {
                    this.Ws = new WebSocket(fullUrl);
                }
                else if ("MozWebSocket" in window) {
                    this.Ws = new window["MozWebSocket"](fullUrl);
                }
            }
            this.Ws.onopen = (ev) => {
                $["AKjs"] = $["AKjs"] ? $["AKjs"] : {};
                let _data = this.fSetClientId($["AKjs"].LoginId);
                this.fSendCommand(this.Ws, _data, callback);
            };
            this.Ws.onerror = (ev) => {
                // var tt = b;
                utilFile.Core.Util.Noty("superSocket 连接错误");
            };
            this.Ws.onclose = (ev) => {
                utilFile.Core.Util.Noty("superSocket 关闭");
            };
            this.Ws.onmessage = (ev) => {
                let _res = utilFile.parseJSON(ev.data);
                if (_res.IsSucess) {
                    let _data = $.parseJSON(ev.data);
                    switch (_data.JsCmd) {
                        case "notify":
                        case "Notify":
                            this.notify();
                            break;
                        case "message":
                            utilFile.Core.Util.Noty(_data.Data);
                            break;
                        case "command":
                            if (_data.Data && _data.Data.CMD) {
                                this.getEmit().emit("command-" + _data.Data.CMD, _data.Data.Data);
                            }
                            break;
                        default:
                            break;
                    }
                }
                else {
                    utilFile.Core.Util.Noty(_res.SourceString);
                }
            };
        }
        getServerOnlineInfo(callback) {
            $.ajax({
                url: this.fUrl,
                dataType: "json",
                success: (a) => {
                    var _data = a;
                    if (callback) {
                        callback(_data);
                    }
                }
            });
            //urlFile.Core.AkPost(this.fUrl, {}, (a) => {
            //}, { method:"GET" });
        }
        init(url) {
            //----
            this.fUrl = url;
            this.loadUrl(() => {
                this.connectWs(() => {
                    utilFile.Core.Util.Noty("连上了 im 服务");
                });
            });
        }
    }
    exports.SuperWebSocketClient = SuperWebSocketClient;
    iocFile.Core.Ioc.Current().RegisterType("SuperWebSocketClient", "INodeClient", SuperWebSocketClient);
});
//# sourceMappingURL=SuperWebSocketClient.js.map