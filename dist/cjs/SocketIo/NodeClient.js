define(["require", "exports", "01core/Event", "01core/Util", "./WebNotification", "01core/Url", "01core/Ioc"], function (require, exports, eventFile, utilFile, notificationFile, urlFile, iocFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SocketIo;
    (function (SocketIo) {
        class NodeClient {
            constructor() {
                this.fNoFirstEvent = false;
                this.fNum = 0;
                window["WinFormJs_NotifyCommond"] = () => {
                    this.notify();
                };
            }
            getNum() {
                return this.fNum;
            }
            getServerOnlineInfo(callback) {
                urlFile.Core.AkPost(this.fUrl, {}, (a) => {
                    var _data = a;
                    if (callback) {
                        callback(_data);
                    }
                });
            }
            clear() {
                this.fNum = 0;
                this.getEmit().emit("notify", this.fNum);
            }
            init(url) {
                this.fUrl = url;
                window["requirejs"](["/AtawStatic/lib/03Extend/socketio/socket.io.min.js"], () => {
                    this.Socket = window["io"].connect(url);
                    if (!this.fNoFirstEvent) {
                        this.Socket.on('connect', (msg) => {
                            if (!this.fNoFirstEvent) {
                                if ($["AKjs"].LoginId) {
                                    //alert($.AKjs.LoginId);
                                    this.Socket.emit("setclientid", $["AKjs"].LoginId);
                                    utilFile.Core.Util.Noty("欢迎来到Ataw大平台");
                                }
                                else {
                                    alert("请登录");
                                }
                                this.fNoFirstEvent = true;
                            }
                            else {
                                if ($["AKjs"].LoginId) {
                                    this.Socket.emit("setclientid", $["AKjs"].LoginId);
                                    utilFile.Core.Util.Noty("重新连上了");
                                }
                                else {
                                    alert("请登录");
                                }
                            }
                        });
                        this.Socket.on('error', () => {
                            utilFile.Core.Util.Noty("连接 IM 发生异常");
                            //_this.showInfo();
                        });
                        this.Socket.on('disconnect', () => {
                            utilFile.Core.Util.Noty("断线了");
                            // _this.showInfo();
                        });
                        this.Socket.on('resclientid', (a) => {
                            //_this.notifyMesg("断线了");
                            utilFile.Core.Util.Noty(a);
                            // _this.showInfo();
                        });
                        this.Socket.on('notify', () => {
                            //_this.notifyMesg("断线了");
                            this.notify();
                            // eventFile.App.GetAppEvent().emit("notify");
                            this.playMp3();
                        });
                        this.Socket.on('message', (a) => {
                            //_this.notifyMesg("断线了");
                            utilFile.Core.Util.Noty(a.Data);
                        });
                        this.Socket.on('command', (a) => {
                            //---------------
                            if (a.Data && a.Data.CMD) {
                                this.getEmit().emit("command-" + a.Data.CMD, a.Data.Data);
                            }
                        });
                    }
                });
            }
            sendCommand(data) {
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
            getEmit() {
                if (!this.fEventBus) {
                    this.fEventBus = new eventFile.Core.EventBus();
                }
                return this.fEventBus.CustomEvent;
            }
            notify() {
                utilFile.Core.Util.Noty("有消息到达...");
                notificationFile.WebNotification.Notification.fun_Notification("", "有消息到达...");
                this.numNotify();
            }
            playMp3() {
                var myDom = $("#myMp3");
                if (myDom.length == 0) {
                    var myIframe = document.createElement("iframe");
                    myIframe.width = 0;
                    myIframe.height = 0;
                    myIframe.frameborder = 0;
                    myIframe.id = "myMp3";
                    myIframe.src = "/Content/Mp3.htm";
                    document.body.appendChild(myIframe);
                }
                else {
                    $("#myMp3").attr("src", "/Content/Mp3.htm");
                }
            }
            listenNotify(fun) {
                let _fun = this.getEmit().addListener("notify", fun);
                return _fun;
            }
            removeNotify(fun) {
                this.getEmit().removeListener("notify", fun);
            }
            numNotify() {
                this.fNum++;
                this.getEmit().emit("notify", this.fNum);
            }
            listenCmd(cmd, fun) {
                this.getEmit().addListener("command-" + cmd, fun);
            }
            removeCmd(cmd) {
                this.getEmit().removeAllListeners(cmd);
            }
        }
        SocketIo.NodeClient = NodeClient;
        iocFile.Core.Ioc.Current().RegisterType("NodeClient", "INodeClient", NodeClient);
    })(SocketIo = exports.SocketIo || (exports.SocketIo = {}));
});
//# sourceMappingURL=NodeClient.js.map