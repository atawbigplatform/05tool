define(["require", "exports", "01core/Ioc", "./NodeClient", "./SuperWebSocketClient"], function (require, exports, iocFile, nodeclientFile, superWebnodeclientFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    nodeclientFile;
    superWebnodeclientFile;
    class NodeClientGlobal {
        static Current(name, appName) {
            name = name ? name : "NodeClient";
            if (!this.fNodeClient) {
                let _node = iocFile.Core.Ioc.Current().FetchInstance(name, "INodeClient");
                _node.AppName = appName;
                this.fNodeClient = _node;
            }
            return this.fNodeClient;
        }
    }
    exports.NodeClientGlobal = NodeClientGlobal;
});
//# sourceMappingURL=NodeClientGlobal.js.map