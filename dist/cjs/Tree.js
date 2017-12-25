define(["require", "exports", "01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ui;
    (function (ui) {
        class TreeAction extends domFile.Core.DomAction {
        }
        ui.TreeAction = TreeAction;
        class TreeReact extends domFile.Core.DomReact {
            constructor() {
                super(...arguments);
                this.pIsSetScreenMaxHeight = true;
                this.pIsSetScreenHeight = true;
            }
            pSender() {
                switch (this.props.Vm.StyleName) {
                    case "H":
                        return this.h_ulSend("Hu-prototype");
                    case "Base":
                        return this.h_ulSend();
                    case "East":
                        return this.h_ulSend("Hu-east");
                    case "Abu":
                        return this.h_ulSend("Hu-ab");
                    default:
                        return null;
                }
            }
            h_ulSend(className) {
                var _ul = React.createElement("ul", { className: "nav " + className }, this.props.Vm.Roots.map((a, i) => {
                    if (!a.IsHide) {
                        return a.intoDom(i);
                    }
                }));
                return React.createElement("div", { className: "Hc-tree-naiv Hz-scroll", key: this.props.Vm.key, style: {
                        "overflowY": "auto"
                    } }, _ul);
            }
            pComponentDidMount() {
                super.pComponentDidMount();
                this._resizeFun = () => {
                    this.forceUpdate();
                };
                $(window).bind("resize", this._resizeFun);
                //$(window).bind("resize", (a) => {
                //    alert(a);
                //})
            }
            pComponentWillUnmount() {
                super.pComponentWillUnmount();
                if (this._resizeFun) {
                    $(window).unbind("resize", this._resizeFun);
                }
            }
        }
        ui.TreeReact = TreeReact;
        class TreeNodeReact extends domFile.Core.DomReact {
            ExpandClick() {
                // if (this.props.Vm.Children.length > 0) {
                //if (this.props.Vm.IsRoot) {
                //    //this.props.Vm.par
                //    this.props.Vm.TreeObj.shrinkRoots();
                //    this.props.Vm.TreeObj.updateModify();
                //}
                if (this.props.Vm.IsRoot && this.props.Vm.IsParent && !this.props.Vm.NoExpand) {
                    //this.props.Vm.par
                    this.props.Vm.TreeObj.shrinkRoots();
                    this.props.Vm.TreeObj.updateModify();
                    //alert("处理好了根节点 : " + this.props.Vm.NoExpand);
                }
                else {
                    if (this.props.Vm.IsParent) {
                        this.props.Vm.Expand();
                    }
                }
                this.props.Vm.TreeObj.forceUpdate("");
            }
            ActiveNode() {
                if (!this.props.Vm.IsDisableSelect) {
                    var _vm = this.props.Vm;
                    _vm.Active();
                    //广播选中
                    var _ac = new TreeAction();
                    _ac.Vm = _vm;
                    _ac.IsActive = true;
                    _ac.Id = "select";
                    this.pDispatcher(_ac);
                    if (_vm.OnActiveNodeSetValue) {
                        _vm.OnActiveNodeSetValue(_vm);
                    }
                    if (_vm.TreeObj) {
                        _vm.TreeObj.getEmit().emit("node_click", _vm);
                    }
                }
                else {
                    this.ExpandClick();
                }
                //this.props.Vm.TreePbj.getEmit().once("cancle", a=> {
                //    this.props.Vm.IsActive = false;
                //});
            }
            pSender() {
                switch (this.props.Vm.TreeObj.StyleName) {
                    case "H":
                        return this.h_Send("H", "Hg-relative Hu-item  ");
                    case "Base":
                        return this.h_Send("Base", "Hg-relative Hu-item Hm-xsd");
                    case "East":
                        return this.h_Send("East");
                    case "Abu":
                        return this.h_Send("Abu");
                    default:
                        return null;
                }
            }
            className_getChildCheck() {
                return this.props.Vm.IsChildCheck ? " Hz-checked" : " ";
            }
            h_Send(s, className) {
                if (!className)
                    className = "";
                className = className + " " + this.props.Vm.LiClass;
                var _tpl = this.props.Vm.TreeObj.NodeTplFun ? this.props.Vm.TreeObj.NodeTplFun(this.props.Vm) : [this.props.Vm.Text];
                var _nodeTpl = this.props.Vm.TreeObj.NNodeTplFun ? this.props.Vm.TreeObj.NNodeTplFun(this.props.Vm) : null;
                var _isLeaf = !this.props.Vm.IsParent; //this.props.Vm.Children.length == 0;
                var _i = React.createElement("span", null,
                    React.createElement("i", { className: !this.props.Vm.NoExpand ? this.props.Vm.ExpandIcon : this.props.Vm.NoExpandIcon, onClick: (e) => { e.stopPropagation(); this.ExpandClick(); } }),
                    React.createElement("i", { className: "fa fa-folder" }));
                var _ii = React.createElement("i", { className: (this.props.Vm.NodeIcoSrc) });
                // var _icon = _isLeaf ? _ii : _ii;
                var _icon = _isLeaf ? _ii : _ii;
                var _iicon = _isLeaf ? "" : _i;
                var _ul = React.createElement("ul", { className: "nav nav-1 " + (!this.props.Vm.NoExpand ? "Ha-tree-animation" : "hide") }, this.props.Vm.Children.map((a, i) => {
                    return a.intoDom(i);
                }));
                var _children = _isLeaf ? null : _ul;
                var _codeIcon = React.createElement("i", { className: this.props.Vm.ExtData ? this.props.Vm.ExtData.Icon : "" });
                var _c = ((this.props.Vm.IsActive ? "active Hz-checked" : "") + "  Hu-pointer Hu-title" + (_isLeaf ? " acsTreeNaivTitleBg Hf-text-overflow" : "")) + (this.className_getChildCheck()) + (this.props.Vm.IsDisableSelect ? " Hz-disabled" : " ");
                var _isEast = this.props.Vm.TreeObj.StyleName == "East";
                if (!this.props.Vm.TreeObj.NodeTplFun) {
                    return React.createElement("li", { className: className, key: this.props.Vm.key },
                        React.createElement("a", { className: _c + " ", onClick: (e) => { this.ActiveNode(); e.stopPropagation(); } }, _isEast ?
                            [_icon, React.createElement("span", null,
                                    _codeIcon,
                                    React.createElement("span", { className: "Hf-text-overflow", title: this.props.Vm.Text, dangerouslySetInnerHTML: { __html: this.props.Vm.TreeObj.isSearch ? this.Search_HighLight(this.props.Vm.Text) : this.props.Vm.Text } })), this.props.children]
                            : [_iicon, React.createElement("span", null,
                                    _codeIcon,
                                    " ",
                                    React.createElement("span", { className: "Hf-text-overflow", title: this.props.Vm.Text, dangerouslySetInnerHTML: { __html: this.props.Vm.TreeObj.isSearch ? this.Search_HighLight(this.props.Vm.Text) : this.props.Vm.Text } })), this.props.children]),
                        _nodeTpl,
                        React.createElement("div", null, this.props.Vm.Mesg),
                        _children);
                }
                else {
                    return React.createElement("li", { className: className, key: this.props.Vm.key },
                        React.createElement("a", { className: _c, onClick: (e) => { this.ActiveNode(); e.stopPropagation(); } }, _isEast ?
                            [_icon, React.createElement("span", null,
                                    _codeIcon,
                                    React.createElement("span", { className: "Hf-text-overflow", title: this.props.Vm.Text },
                                        " ",
                                        _tpl)), this.props.children]
                            : [_iicon, React.createElement("span", null,
                                    _codeIcon,
                                    " ",
                                    React.createElement("span", { className: "Hf-text-overflow", title: this.props.Vm.Text },
                                        " ",
                                        _tpl)), this.props.children]),
                        _nodeTpl,
                        React.createElement("div", null, this.props.Vm.Mesg),
                        _children);
                }
            }
            Search_HighLight(Text) {
                var key = this.props.Vm.TreeObj.HighLightKey;
                if (key) {
                    //Text.split()  Text.indexOf(key)
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
                            var str3 = Text.substring(key.length + index, Text.length);
                            Text = str1 + str2 + str3;
                        }
                        //Text.substring(index, key.length);
                        //var Texts = Text.split(key);
                        //Text = Texts.join("<b class='Hs-red'>" + key);
                    }
                }
                return Text;
            }
        }
        ui.TreeNodeReact = TreeNodeReact;
        class TreeProps extends domFile.Core.DomProps {
        }
        ui.TreeProps = TreeProps;
        class TreeNodeProps extends domFile.Core.DomProps {
        }
        ui.TreeNodeProps = TreeNodeProps;
        class TreeStates extends domFile.Core.DomStates {
        }
        ui.TreeStates = TreeStates;
        class TreeNodeTplReact extends domFile.Core.DomReact {
            pSender() {
                return React.createElement("span", null, this.props.Vm.TreeNode.Text);
            }
        }
        ui.TreeNodeTplReact = TreeNodeTplReact;
        class TreeNodeTplProps extends domFile.Core.DomProps {
        }
        ui.TreeNodeTplProps = TreeNodeTplProps;
        class TreeNodeTplVm extends domFile.Core.DomVm {
        }
        ui.TreeNodeTplVm = TreeNodeTplVm;
        class TreeVm extends domFile.Core.DomVm {
            constructor(config) {
                super();
                this.Roots = new Array();
                this.ReactType = TreeReact;
                this.pRegName = "树形";
                this.SelectNodes = new Array();
                this.CheckNodes = [];
                //  @decorator.setDecoratorProps("高度","number","0，表示跟页面可视高度一样")
                this.Height = 0; //树的高度，0表示跟页面可视高度一样
                //  @decorator.setDecoratorProps("样式类型","string","H,")
                this.StyleName = "H"; //"Base"  "H"  "East"
                this.ModifyNodeList = [];
                this.IsYesParent = false;
                this.IsYesChild = false;
                this.IsNoParent = false;
                this.IsNoChild = false;
                this.IsOnlyLeafCanSelect = false;
                this.isSearch = false; //是否是在搜索树
                this.HighLightKey = ""; //搜索时候高亮的关键字
                if (config) {
                    if (config.StyleName) {
                        this.StyleName = config.StyleName;
                    }
                    if (config.IsYesParent)
                        this.IsNoChild = config.IsYesParent;
                    if (config.IsYesChild)
                        this.IsNoChild = config.IsYesChild;
                    if (config.IsNoParent)
                        this.IsNoChild = config.IsNoParent;
                    if (config.IsNoChild)
                        this.IsNoChild = config.IsNoChild;
                    if (config.IsMultiSelect) {
                        this.IsMultiSelect = config.IsMultiSelect;
                    }
                    if (config.IsOnLeafCanSelect) {
                        this.IsOnlyLeafCanSelect = config.IsOnLeafCanSelect;
                    }
                    if (config.NodeTplFun) {
                        this.NodeTplFun = config.NodeTplFun;
                    }
                    if (config.NNodeTplFun) {
                        this.NNodeTplFun = config.NNodeTplFun;
                    }
                    if (config.OnExpandFun) {
                        this.OnExpandFun = config.OnExpandFun;
                    }
                    if (config.OnActiveNodeSetValue) {
                        this.OnActiveNodeSetValue = config.OnActiveNodeSetValue;
                    }
                }
            }
            updateModify() {
                this.ModifyNodeList.forEach((n) => {
                    //n.IsChange = true;
                    // n.IsMulit = true;
                    n.forceUpdate("");
                });
                this.ModifyNodeList = [];
            }
            pushModifyNode(node) {
                var _isN = false;
                for (var i = 0; i < this.ModifyNodeList.length; i++) {
                    if (node == this.ModifyNodeList[i]) {
                        _isN = true;
                        break;
                    }
                }
                if (!_isN) {
                    this.ModifyNodeList.push(node);
                }
            }
            pushSelectNode(nodeVm) {
                var _len = this.SelectNodes.length;
                var _has = false;
                for (var i = 0; i < _len; i++) {
                    if (this.SelectNodes[_len] == nodeVm) {
                        _has = true;
                        break;
                    }
                }
                if (!_has) {
                    this.SelectNodes.push(nodeVm);
                }
            }
            onReactNodeClick(fun) {
                this.getEmit().addListener("node_click", fun);
            }
            appendToNode(nodeVM, parentNode) {
                var _node = this.fToNode(nodeVM);
                _node.ParentNodeVm = parentNode;
                if (!parentNode.Children)
                    parentNode.Children = [];
                parentNode.Children.push(_node);
                if (nodeVM.Children) {
                    nodeVM.Children.forEach((a) => {
                        this.appendToNode(a, _node);
                    });
                }
                return _node;
            }
            copyNode(nodeVM) {
                var _node = new TreeNodeVm();
                _node.TreeObj = this;
                _node.Value = nodeVM.Value;
                _node.Text = nodeVM.Text;
                _node.ExtendObj = nodeVM.ExtData;
                _node.NoExpand = nodeVM.NoExpand;
                _node.IsParent = nodeVM.IsParent;
                _node.IsActive = nodeVM.IsActive;
                _node.IsDisableSelect = nodeVM.IsDisableSelect;
                _node.ExtData = nodeVM.ExtData;
                if (this.OnExpandFun) {
                    _node.OnExpandFun = this.OnExpandFun;
                }
                if (this.OnActiveNodeSetValue) {
                    _node.OnActiveNodeSetValue = this.OnActiveNodeSetValue;
                }
                if (this.IsOnlyLeafCanSelect && !_node.IsDisableSelect) {
                    if (_node.IsParent || (nodeVM.Children && nodeVM.Children.length > 0)) {
                        _node.IsDisableSelect = true;
                    }
                }
                return _node;
            }
            fToNode(nodeVM) {
                var _node = new TreeNodeVm();
                _node.TreeObj = this;
                _node.Value = nodeVM.CODE_VALUE.trim();
                _node.Text = nodeVM.CODE_TEXT;
                _node.ExtendObj = nodeVM.ExtData;
                _node.NoExpand = !nodeVM.open;
                _node.IsParent = nodeVM.isParent;
                _node.IsActive = nodeVM.IsSelect;
                _node.IsDisableSelect = nodeVM.IsDisableSelect;
                _node.ExtData = nodeVM.ExtData;
                if (this.OnExpandFun) {
                    _node.OnExpandFun = this.OnExpandFun;
                }
                if (this.OnActiveNodeSetValue) {
                    _node.OnActiveNodeSetValue = this.OnActiveNodeSetValue;
                }
                if (this.IsOnlyLeafCanSelect && !_node.IsDisableSelect) {
                    if (_node.IsParent || (nodeVM.Children && nodeVM.Children.length > 0)) {
                        _node.IsDisableSelect = true;
                    }
                }
                return _node;
            }
            initTreeVm(nodeVM) {
                this.Roots = [];
                this.SelectNodes = [];
                this.ModifyNodeList = [];
                this.CheckNodes = [];
                var _node = this.fToNode(nodeVM);
                // if (nodeVM.is)
                if (nodeVM.CODE_VALUE != "0") {
                    this.Roots = [_node];
                    _node.IsRoot = true;
                }
                if (nodeVM.Children != null && nodeVM.Children.length > 0) {
                    _node.IsParent = true;
                    nodeVM.Children.forEach((_n => {
                        //if (node.CODE_VALUE == "0") {
                        //    this.Roots.push(_n);
                        //}
                        this.fInitTreeVm(_n, _node);
                        _node.IsRoot = true;
                    }));
                }
            }
            fInitTreeVm(nodeVm, pNode) {
                var _node = this.fToNode(nodeVm);
                if (pNode.Value == "0") {
                    this.Roots.push(_node);
                    _node.IsRoot = true;
                }
                pNode.Children.push(_node);
                _node.ParentNodeVm = pNode;
                if (nodeVm.Children != null && nodeVm.Children.length > 0) {
                    _node.IsParent = true;
                    nodeVm.Children.forEach((_n => {
                        this.fInitTreeVm(_n, _node);
                    }));
                }
            }
            GetNodeByFun(nodevm, nodeSelectorFun) {
                //alert(1);
                // if (key == node.Value) {
                if (nodeSelectorFun(nodevm)) {
                    return nodevm;
                }
                else {
                    if (nodevm.Children != null && nodevm.Children.length > 0) {
                        for (var i = 0; i < nodevm.Children.length; i++) {
                            var a = nodevm.Children[i];
                            var _node = this.GetNodeByFun(a, nodeSelectorFun);
                            if (_node != null) {
                                return _node;
                            }
                        }
                    }
                    else
                        return null;
                }
                // return null;
            }
            getNodeByFunRoot(nodeSelectorFun) {
                var _res = new Array();
                this.Roots.forEach((root) => {
                    var _node = this.GetNodeByFun(root, nodeSelectorFun);
                    if (_node != null) {
                        _res.push(_node);
                    }
                });
                return _res;
            }
            getNodeByKey(keys) {
                var _res = new Array();
                keys.forEach((a) => {
                    this.Roots.forEach((root) => {
                        var _node = this.GetNodeByFun(root, (node) => {
                            return node.Value == a;
                        });
                        if (_node != null) {
                            _res.push(_node);
                        }
                    });
                });
                return _res;
            }
            ExpandParent(vm) {
                vm.IsChange = true;
                vm.NoExpand = false;
                if (vm.ParentNodeVm) {
                    this.ExpandParent(vm.ParentNodeVm);
                }
            }
            //当前节点不需要展开，只展开父节点
            pExpandParent(vm, noExpand) {
                vm.IsChange = true;
                vm.NoExpand = noExpand;
                if (vm.ParentNodeVm) {
                    this.pExpandParent(vm.ParentNodeVm, false);
                }
            }
            shrinkRoots() {
                this.Roots.forEach((root) => {
                    root.IsHide = false;
                    root.IsActive = false;
                    root.NoExpand = true;
                    // root.forceUpdate("");
                    this.pushModifyNode(root);
                });
            }
            resetRootNode() {
                this.SelectNodes.forEach((r) => {
                    r.IsActive = false;
                    r.IsChildCheck = false;
                    r.checkParentCheckToFalse(r);
                    this.pushModifyNode(r);
                });
                this.Roots.forEach((root) => {
                    root.IsHide = false;
                    root.IsActive = false;
                    root.NoExpand = true;
                    // root.forceUpdate("");
                    this.pushModifyNode(root);
                });
                //this.ModifyNodeList.forEach((n) => {
                //    //n.IsChange = true;
                //    // n.IsMulit = true;
                //    n.forceUpdate("");
                //});
                // this.ModifyNodeList = [];
                this.updateModify();
                this.forceUpdate("");
            }
            ExpandNode(nodeSelectorFun, isSubmit) {
                var _res = new Array();
                //  this.SelectNodes = null;
                this.Roots.forEach((root) => {
                    var _node = this.GetNodeByFun(root, nodeSelectorFun);
                    if (_node != null) {
                        root.IsHide = false;
                        _res.push(_node);
                    }
                    else {
                        root.IsHide = true;
                    }
                });
                //if (_res.length == 0) {
                //    this.Roots.forEach((root) => {
                //        root.IsHide = false;
                //    });
                //}
                _res.forEach((node) => {
                    this.SelectNodes.push(node);
                    // node.IsActive = true;
                    if (!node.IsActive) {
                        node.Active();
                    }
                    this.ExpandParent(node);
                });
                if (isSubmit) {
                    this.forceUpdate("");
                }
                return _res;
            }
        }
        ui.TreeVm = TreeVm;
        class TreeNodeVm extends domFile.Core.DomVm {
            constructor() {
                super(...arguments);
                this.ReactType = TreeNodeReact;
                this.NoExpand = true;
                this.NoExpandIcon = "icon-plus-sign  fa fa-caret-right";
                this.ExpandIcon = "icon-minus-sign  fa fa-caret-down";
                this.Children = new Array();
                this.pRegName = "树节点";
                this.IsHide = false;
                this.IsChildCheck = false;
            }
            updateModify() {
                this.TreeObj.updateModify();
            }
            pushModifyNode(node) {
                this.TreeObj.pushModifyNode(node);
            }
            pDispose() {
                this.TreeObj = null;
                this.ParentNodeVm = null;
                super.pDispose();
            }
            GetNodeKeyByFun(fun) {
                if (fun(this)) {
                    return this;
                }
                else {
                    if (this.Children.length > 0) {
                        return this.Children[0].GetNodeKeyByFun(fun);
                    }
                    else
                        return this;
                }
            }
            Expand() {
                if (this.OnExpandFun && this.Children.length == 0) {
                    this.OnExpandFun(this);
                }
                this.NoExpand = !this.NoExpand;
                super.forceUpdate("");
            }
            checkParentCheckToTrue(node) {
                if (node.ParentNodeVm) {
                    var _old = node.ParentNodeVm.IsChildCheck;
                    if (!_old) {
                        node.ParentNodeVm.IsChildCheck = true;
                        this.pushModifyNode(node.ParentNodeVm);
                    }
                    this.checkParentCheckToTrue(node.ParentNodeVm);
                }
            }
            //取消一下父节点 拥有 的效果
            checkParentCheckToFalse(node) {
                if (node.ParentNodeVm) {
                    var _old = node.ParentNodeVm.IsChildCheck;
                    if (_old) {
                        node.ParentNodeVm.IsChildCheck = false;
                        this.pushModifyNode(node.ParentNodeVm);
                    }
                    this.checkParentCheckToFalse(node.ParentNodeVm);
                }
            }
            checkParentVmCheck(nodevm, isCheck) {
                if (nodevm.ParentNodeVm) {
                    nodevm.ParentNodeVm.IsChildCheck = isCheck;
                    nodevm.IsChildCheck = isCheck;
                    if (this.TreeObj.IsMultiSelect) {
                        //选中的时候 关联父节点
                        if (this.TreeObj.IsYesParent && isCheck) {
                            nodevm.ParentNodeVm.IsActive = isCheck;
                            this.TreeObj.pushSelectNode(nodevm.ParentNodeVm);
                        }
                        else {
                            if (this.TreeObj.IsNoParent && (!isCheck)) {
                                nodevm.ParentNodeVm.IsActive = isCheck;
                                this.TreeObj.SelectNodes = this.TreeObj.SelectNodes.filter((a) => {
                                    return a != nodevm.ParentNodeVm;
                                });
                            }
                        }
                    }
                    this.pushModifyNode(nodevm.ParentNodeVm);
                    this.checkParentVmCheck(nodevm.ParentNodeVm, isCheck);
                }
            }
            checkChildrenVm(nodevm, isCheck) {
                if (nodevm.Children) {
                    //-------
                    nodevm.Children.forEach((n) => {
                        var _old = n.IsActive;
                        n.IsActive = isCheck;
                        n.IsChildCheck = isCheck;
                        if (isCheck) {
                            this.TreeObj.pushSelectNode(n);
                        }
                        if (_old != isCheck) {
                            this.pushModifyNode(n);
                        }
                        this.checkChildrenVm(n, isCheck);
                    });
                }
            }
            fWillYesActive_Multi() {
                //选中节点的设置 
                this.IsActive = true;
                this.pushModifyNode(this);
                this.TreeObj.SelectNodes.push(this);
                this.checkParentVmCheck(this, true);
                if (this.TreeObj.IsMultiSelect && this.TreeObj.IsYesChild) {
                    this.checkChildrenVm(this, true);
                }
                this.updateModify();
            }
            fWillNoActive_Multi() {
                this.IsActive = false;
                this.IsChildCheck = false;
                this.checkParentVmCheck(this, false);
                this.pushModifyNode(this);
                //取消结点 更新
                this.TreeObj.SelectNodes = this.TreeObj.SelectNodes.filter((a) => {
                    return a != this;
                });
                if (this.TreeObj.IsMultiSelect && this.TreeObj.IsNoChild) {
                    this.checkChildrenVm(this, false);
                }
                //不考虑取消关联，对选中的重新设置一下父节点
                this.TreeObj.SelectNodes.forEach((n) => {
                    n.checkParentCheckToTrue(n);
                });
                this.updateModify();
            }
            fWillYesActive_Single() {
                //取消所有的节点
                this.TreeObj.SelectNodes.forEach((se) => {
                    se.IsActive = false;
                    se.IsChildCheck = false;
                    this.pushModifyNode(se);
                    //上级节点也取消
                    this.checkParentCheckToFalse(se);
                });
                //选中节点的设置 
                this.IsActive = true;
                this.pushModifyNode(this);
                this.TreeObj.SelectNodes = [this];
                this.checkParentVmCheck(this, true);
                this.updateModify();
            }
            fWillNoActive_Single() {
                this.TreeObj.SelectNodes.forEach((se) => {
                    se.IsActive = false;
                    se.IsChildCheck = false;
                    this.checkParentCheckToFalse(se);
                    this.pushModifyNode(se);
                });
                this.IsActive = false;
                this.IsChildCheck = false;
                this.checkParentCheckToFalse(this);
                this.pushModifyNode(this);
                this.TreeObj.SelectNodes = [];
                this.updateModify();
            }
            Active() {
                if (this.IsActive) {
                    //取消
                    if (!this.TreeObj.IsMultiSelect) {
                        this.fWillNoActive_Single();
                    }
                    else {
                        this.fWillNoActive_Multi();
                    }
                }
                else {
                    //选中
                    if (!this.TreeObj.IsMultiSelect) {
                        this.fWillYesActive_Single();
                    }
                    else {
                        this.fWillYesActive_Multi();
                        //开始做关联......
                    }
                }
            }
            setParentVmCheck(nodevm) {
                if (nodevm.ParentNodeVm) {
                    var _old = nodevm.ParentNodeVm.IsChildCheck;
                    nodevm.ParentNodeVm.IsChildCheck = nodevm.IsActive;
                    nodevm.ParentNodeVm.IsChildCheck = false;
                    nodevm.ParentNodeVm.Children.forEach((n) => {
                        if (n.IsActive || n.IsChildCheck) {
                            nodevm.ParentNodeVm.IsChildCheck = true;
                        }
                    });
                    if (_old != nodevm.ParentNodeVm.IsChildCheck) {
                        nodevm.ParentNodeVm.forceUpdate("");
                    }
                    this.setParentVmCheck(nodevm.ParentNodeVm);
                }
            }
            hideElseRootNode(isSubmit) {
                this.fFindRootNode(this);
                if (isSubmit) {
                    this.forceUpdate("");
                }
            }
            findRoot(nodevm) {
                if (nodevm.IsRoot)
                    return nodevm;
                if (nodevm.ParentNodeVm) {
                    if (nodevm.ParentNodeVm.IsRoot)
                        return nodevm.ParentNodeVm;
                    else {
                        return this.findRoot(nodevm.ParentNodeVm);
                    }
                }
                else {
                    if (nodevm.IsRoot)
                        return nodevm;
                    else {
                        return null;
                    }
                }
            }
            fFindRootNode(nodevm) {
                if (!nodevm.IsRoot) {
                    if (nodevm.ParentNodeVm) {
                        if (nodevm.ParentNodeVm.IsRoot) {
                            nodevm.ParentNodeVm.IsHide = false;
                            nodevm.TreeObj.Roots.forEach((a) => {
                                if (a != nodevm.ParentNodeVm) {
                                    a.IsHide = true;
                                }
                            });
                        }
                        else {
                            this.fFindRootNode(nodevm.ParentNodeVm);
                        }
                    }
                }
                else {
                    nodevm.IsHide = false;
                    nodevm.TreeObj.Roots.forEach((a) => {
                        if (a != nodevm) {
                            a.IsHide = true;
                        }
                    });
                }
            }
        }
        ui.TreeNodeVm = TreeNodeVm;
    })(ui = exports.ui || (exports.ui = {}));
});
//# sourceMappingURL=Tree.js.map