
import eventFile = require("01core/Event");
import utilFile = require("01core/Util");
import notificationFile = require("./WebNotification");

import urlFile = require("01core/Url");
import iocFile = require("01core/Ioc");
import InodeclientFile = require("./INodeClient");
import React = require("react");
export namespace SocketIo
{
    export interface ICommandData
    {
        CMD: string;
        Data: any;
    }

    export interface IData
    {
        Data: ICommandData;
    }

    export interface INotifyEventFun
    {
        (num: number): void;
    }

    export class NodeClient implements InodeclientFile.INodeClient
    {
        private fEventBus: eventFile.Core.EventBus;
       
        private fNoFirstEvent: boolean = false;
        private fNotification: notificationFile.WebNotification.Notification;
        private Socket: any;
        private fUrl: string;
        public AppName: string;

        public constructor()
        {
           
            window["WinFormJs_NotifyCommond"] = () => {
                this.notify();
            }
        }

        private fNum: number = 0;

        public getNum(): number
        {
            return this.fNum;
        }

        public getServerOnlineInfo(callback: (data: InodeclientFile.IWebScocketData) => void ):void
        {
            urlFile.Core.AkPost(this.fUrl, {}, (a) => {
                var _data: InodeclientFile.IWebScocketData = a;
                
                if (callback) {
                    callback(_data);
                }
            });

        }
       
        public clear()
        {
            this.fNum = 0;
            this.getEmit().emit("notify", this.fNum);
        }
      

        public init(url: string) {
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
                            } else {
                                alert("请登录");
                            }
                            this.fNoFirstEvent = true;
                        }
                        else
                        {
                            if ($["AKjs"].LoginId) {
                                this.Socket.emit("setclientid", $["AKjs"].LoginId);
                                utilFile.Core.Util.Noty("重新连上了");
                            } else {
                                alert("请登录");
                            }
                        }
                        
                    });

                    this.Socket.on('error',()=>{
                        utilFile.Core.Util.Noty("连接 IM 发生异常");
                        //_this.showInfo();
                    });

                    this.Socket.on('disconnect', ()=> {
                        utilFile.Core.Util.Noty("断线了");
                       // _this.showInfo();
                    });
                    this.Socket.on('resclientid',  (a:any)=> {
                        //_this.notifyMesg("断线了");
                        utilFile.Core.Util.Noty(a);
                        
                       // _this.showInfo();
                    });

                    this.Socket.on('notify', ()=> {
                        //_this.notifyMesg("断线了");
                        this.notify();
                        // eventFile.App.GetAppEvent().emit("notify");
                        this.playMp3();
                    });


                    this.Socket.on('message', (a) => {
                        //_this.notifyMesg("断线了");
                        utilFile.Core.Util.Noty(a.Data);
                       
                    });

                    this.Socket.on('command', (a: IData) => {
                        //---------------
                        if (a.Data && a.Data.CMD) {
                            this.getEmit().emit("command-" + a.Data.CMD, a.Data.Data);
                        }

                    });

                }
            });
        }

        public sendCommand(data: InodeclientFile.INodeRequest) {
            let _users = data.ClientList.IdList.map((c) => { return c.Id });
            if (data.Data) {
            //messageList
                urlFile.Core.AkPost("/dev/socketio/messageList", { ids: _users, mesg: data.Data }, (a) => {

                });
            }
            else {
                urlFile.Core.AkPost("/dev/socketio/notifyList", { ids: _users}, (a) => {

                });
            }
        }

        protected getEmit(): eventFile.Core.IEvent {
            if (!this.fEventBus) {
                this.fEventBus = new eventFile.Core.EventBus();
            }
            return this.fEventBus.CustomEvent;
        }
        public notify()
        {
            utilFile.Core.Util.Noty("有消息到达...");
            notificationFile.WebNotification.Notification.fun_Notification("", "有消息到达...");
            this.numNotify();
        }
        public playMp3() {
            var myDom = $("#myMp3");
            if (myDom.length == 0) {
                var myIframe: any = document.createElement("iframe");
                myIframe.width = 0;
                myIframe.height = 0;
                myIframe.frameborder = 0;
                myIframe.id = "myMp3";
                myIframe.src = "/Content/Mp3.htm";

                document.body.appendChild(myIframe);
            } else {
                $("#myMp3").attr("src", "/Content/Mp3.htm");
            }
         
        }

        public listenNotify(fun: INotifyEventFun): Function
        {
            let _fun = this.getEmit().addListener("notify", fun);
            return _fun;
        }

        

        public removeNotify(fun: Function) {
            this.getEmit().removeListener("notify",fun);
        }

        public numNotify()
        {
            this.fNum++;
            this.getEmit().emit("notify", this.fNum);
        }

        public listenCmd(cmd: string, fun: Function) {
            this.getEmit().addListener("command-" + cmd, fun);
        }

        public removeCmd(cmd: string) {
            this.getEmit().removeAllListeners(cmd);
        }

    }

    iocFile.Core.Ioc.Current().RegisterType("NodeClient", "INodeClient", NodeClient);
}

