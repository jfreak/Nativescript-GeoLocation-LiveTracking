module.exports =
webpackJsonp([0],{

/***/ 127:
/*!**************************!*\
  !*** ./app.component.ts ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 158:
/*!********************************************************!*\
  !*** ../node_modules/nativescript-angular/renderer.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var view_1 = __webpack_require__(/*! tns-core-modules/ui/core/view */ 0);
var application_1 = __webpack_require__(/*! tns-core-modules/application */ 3);
var frame_1 = __webpack_require__(/*! tns-core-modules/ui/frame */ 7);
var profiling_1 = __webpack_require__(/*! tns-core-modules/profiling */ 2);
var platform_providers_1 = __webpack_require__(/*! ./platform-providers */ 20);
var view_util_1 = __webpack_require__(/*! ./view-util */ 156);
var element_registry_1 = __webpack_require__(/*! ./element-registry */ 32);
var trace_1 = __webpack_require__(/*! ./trace */ 14);
// CONTENT_ATTR not exported from NativeScript_renderer - we need it for styles application.
var COMPONENT_REGEX = /%COMP%/g;
exports.COMPONENT_VARIABLE = "%COMP%";
exports.HOST_ATTR = "_nghost-" + exports.COMPONENT_VARIABLE;
exports.CONTENT_ATTR = "_ngcontent-" + exports.COMPONENT_VARIABLE;
var ATTR_SANITIZER = /-/g;
var NativeScriptRendererFactory = /** @class */ (function () {
    function NativeScriptRendererFactory(rootView, device, zone) {
        this.zone = zone;
        this.componentRenderers = new Map();
        this.viewUtil = new view_util_1.ViewUtil(device);
        this.setRootNgView(rootView);
        this.defaultRenderer = new NativeScriptRenderer(this.rootNgView, zone, this.viewUtil);
    }
    NativeScriptRendererFactory.prototype.setRootNgView = function (rootView) {
        if (!rootView) {
            rootView = platform_providers_1.getRootPage() || frame_1.topmost().currentPage;
        }
        rootView.nodeName = "NONE";
        this.rootNgView = rootView;
    };
    NativeScriptRendererFactory.prototype.createRenderer = function (element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        var renderer = this.componentRenderers.get(type.id);
        if (renderer) {
            return renderer;
        }
        if (type.encapsulation === core_1.ViewEncapsulation.None) {
            type.styles.map(function (s) { return s.toString(); }).forEach(addStyleToCss);
            renderer = this.defaultRenderer;
        }
        else {
            renderer = new EmulatedRenderer(type, this.rootNgView, this.zone, this.viewUtil);
            renderer.applyToHost(element);
        }
        this.componentRenderers.set(type.id, renderer);
        return renderer;
    };
    NativeScriptRendererFactory = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()), __param(0, core_1.Inject(platform_providers_1.APP_ROOT_VIEW)),
        __param(1, core_1.Inject(platform_providers_1.DEVICE)),
        __metadata("design:paramtypes", [view_1.View, Object, core_1.NgZone])
    ], NativeScriptRendererFactory);
    return NativeScriptRendererFactory;
}());
exports.NativeScriptRendererFactory = NativeScriptRendererFactory;
var NativeScriptRenderer = /** @class */ (function (_super) {
    __extends(NativeScriptRenderer, _super);
    function NativeScriptRenderer(rootView, zone, viewUtil) {
        var _this = _super.call(this) || this;
        _this.rootView = rootView;
        _this.zone = zone;
        _this.viewUtil = viewUtil;
        _this.data = Object.create(null);
        trace_1.rendererLog("NativeScriptRenderer created");
        return _this;
    }
    NativeScriptRenderer.prototype.appendChild = function (parent, newChild) {
        trace_1.rendererLog("NativeScriptRenderer.appendChild child: " + newChild + " parent: " + parent);
        this.viewUtil.insertChild(parent, newChild);
    };
    NativeScriptRenderer.prototype.insertBefore = function (parent, newChild, _a) {
        var previous = _a.previous, next = _a.next;
        trace_1.rendererLog("NativeScriptRenderer.insertBefore child: " + newChild + " " +
            ("parent: " + parent + " previous: " + previous + " next: " + next));
        this.viewUtil.insertChild(parent, newChild, previous, next);
    };
    NativeScriptRenderer.prototype.removeChild = function (parent, oldChild) {
        trace_1.rendererLog("NativeScriptRenderer.removeChild child: " + oldChild + " parent: " + parent);
        this.viewUtil.removeChild(parent, oldChild);
    };
    NativeScriptRenderer.prototype.selectRootElement = function (selector) {
        trace_1.rendererLog("NativeScriptRenderer.selectRootElement: " + selector);
        return this.rootView;
    };
    NativeScriptRenderer.prototype.parentNode = function (node) {
        trace_1.rendererLog("NativeScriptRenderer.parentNode for node: " + node);
        return node.parent || node.templateParent;
    };
    NativeScriptRenderer.prototype.nextSibling = function (node) {
        trace_1.rendererLog("NativeScriptRenderer.nextSibling of " + node + " is " + node.nextSibling);
        return {
            previous: node,
            next: node.nextSibling,
        };
    };
    NativeScriptRenderer.prototype.createComment = function (_value) {
        trace_1.rendererLog("NativeScriptRenderer.createComment " + _value);
        return this.viewUtil.createComment();
    };
    NativeScriptRenderer.prototype.createElement = function (name, _namespace) {
        trace_1.rendererLog("NativeScriptRenderer.createElement: " + name);
        return this.viewUtil.createView(name);
    };
    NativeScriptRenderer.prototype.createText = function (_value) {
        trace_1.rendererLog("NativeScriptRenderer.createText " + _value);
        return this.viewUtil.createText();
    };
    NativeScriptRenderer.prototype.createViewRoot = function (hostElement) {
        trace_1.rendererLog("NativeScriptRenderer.createViewRoot " + hostElement.nodeName);
        return hostElement;
    };
    NativeScriptRenderer.prototype.projectNodes = function (parentElement, nodes) {
        var _this = this;
        trace_1.rendererLog("NativeScriptRenderer.projectNodes");
        nodes.forEach(function (node) { return _this.viewUtil.insertChild(parentElement, node); });
    };
    NativeScriptRenderer.prototype.destroy = function () {
        trace_1.rendererLog("NativeScriptRenderer.destroy");
        // Seems to be called on component dispose only (router outlet)
        // TODO: handle this when we resolve routing and navigation.
    };
    NativeScriptRenderer.prototype.setAttribute = function (view, name, value, namespace) {
        trace_1.rendererLog("NativeScriptRenderer.setAttribute " + view + " : " + name + " = " + value + ", namespace: " + namespace);
        return this.viewUtil.setProperty(view, name, value, namespace);
    };
    NativeScriptRenderer.prototype.removeAttribute = function (_el, _name) {
        trace_1.rendererLog("NativeScriptRenderer.removeAttribute " + _el + ": " + _name);
    };
    NativeScriptRenderer.prototype.setProperty = function (view, name, value) {
        trace_1.rendererLog("NativeScriptRenderer.setProperty " + view + " : " + name + " = " + value);
        return this.viewUtil.setProperty(view, name, value);
    };
    NativeScriptRenderer.prototype.addClass = function (view, name) {
        trace_1.rendererLog("NativeScriptRenderer.addClass " + name);
        this.viewUtil.addClass(view, name);
    };
    NativeScriptRenderer.prototype.removeClass = function (view, name) {
        trace_1.rendererLog("NativeScriptRenderer.removeClass " + name);
        this.viewUtil.removeClass(view, name);
    };
    NativeScriptRenderer.prototype.setStyle = function (view, styleName, value, _flags) {
        trace_1.rendererLog("NativeScriptRenderer.setStyle: " + styleName + " = " + value);
        this.viewUtil.setStyle(view, styleName, value);
    };
    NativeScriptRenderer.prototype.removeStyle = function (view, styleName, _flags) {
        trace_1.rendererLog("NativeScriptRenderer.removeStyle: ${styleName}");
        this.viewUtil.removeStyle(view, styleName);
    };
    // Used only in debug mode to serialize property changes to comment nodes,
    // such as <template> placeholders.
    NativeScriptRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
        trace_1.rendererLog("NativeScriptRenderer.setBindingDebugInfo: " + renderElement + ", " +
            propertyName + " = " + propertyValue);
    };
    NativeScriptRenderer.prototype.setElementDebugInfo = function (renderElement, _info /*RenderDebugInfo*/) {
        trace_1.rendererLog("NativeScriptRenderer.setElementDebugInfo: " + renderElement);
    };
    NativeScriptRenderer.prototype.invokeElementMethod = function (_renderElement, methodName, args) {
        trace_1.rendererLog("NativeScriptRenderer.invokeElementMethod " + methodName + " " + args);
    };
    NativeScriptRenderer.prototype.setValue = function (_renderNode, _value) {
        trace_1.rendererLog("NativeScriptRenderer.setValue " +
            ("renderNode: " + _renderNode + ", value: " + _value));
    };
    NativeScriptRenderer.prototype.listen = function (renderElement, eventName, callback) {
        var _this = this;
        trace_1.rendererLog("NativeScriptRenderer.listen: " + eventName);
        // Explicitly wrap in zone
        var zonedCallback = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.zone.run(function () {
                callback.apply(undefined, args);
            });
        };
        renderElement.on(eventName, zonedCallback);
        if (eventName === view_1.View.loadedEvent && renderElement.isLoaded) {
            var notifyData = { eventName: view_1.View.loadedEvent, object: renderElement };
            zonedCallback(notifyData);
        }
        return function () { return renderElement.off(eventName, zonedCallback); };
    };
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "appendChild", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "insertBefore", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "removeChild", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Object)
    ], NativeScriptRenderer.prototype, "selectRootElement", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], NativeScriptRenderer.prototype, "parentNode", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], NativeScriptRenderer.prototype, "nextSibling", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", element_registry_1.InvisibleNode)
    ], NativeScriptRenderer.prototype, "createComment", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", Object)
    ], NativeScriptRenderer.prototype, "createElement", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", element_registry_1.InvisibleNode)
    ], NativeScriptRenderer.prototype, "createText", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], NativeScriptRenderer.prototype, "createViewRoot", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Array]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "projectNodes", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "destroy", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, String, String]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "setAttribute", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "removeAttribute", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Object]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "setProperty", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "addClass", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "removeClass", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Object, Number]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "setStyle", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Number]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "removeStyle", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, String]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "setBindingDebugInfo", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "setElementDebugInfo", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Array]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "invokeElementMethod", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "setValue", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Function]),
        __metadata("design:returntype", Function)
    ], NativeScriptRenderer.prototype, "listen", null);
    return NativeScriptRenderer;
}(core_1.Renderer2));
exports.NativeScriptRenderer = NativeScriptRenderer;
var EmulatedRenderer = /** @class */ (function (_super) {
    __extends(EmulatedRenderer, _super);
    function EmulatedRenderer(component, rootView, zone, viewUtil) {
        var _this = _super.call(this, rootView, zone, viewUtil) || this;
        var componentId = component.id.replace(ATTR_SANITIZER, "_");
        _this.contentAttr = replaceNgAttribute(exports.CONTENT_ATTR, componentId);
        _this.hostAttr = replaceNgAttribute(exports.HOST_ATTR, componentId);
        _this.addStyles(component.styles, componentId);
        return _this;
    }
    EmulatedRenderer.prototype.applyToHost = function (view) {
        _super.prototype.setAttribute.call(this, view, this.hostAttr, "");
    };
    EmulatedRenderer.prototype.appendChild = function (parent, newChild) {
        _super.prototype.appendChild.call(this, parent, newChild);
    };
    EmulatedRenderer.prototype.createElement = function (parent, name) {
        var view = _super.prototype.createElement.call(this, parent, name);
        // Set an attribute to the view to scope component-specific css.
        // The property name is pre-generated by Angular.
        _super.prototype.setAttribute.call(this, view, this.contentAttr, "");
        return view;
    };
    EmulatedRenderer.prototype.addStyles = function (styles, componentId) {
        styles.map(function (s) { return s.toString(); })
            .map(function (s) { return replaceNgAttribute(s, componentId); })
            .forEach(addStyleToCss);
    };
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, String]),
        __metadata("design:returntype", void 0)
    ], EmulatedRenderer.prototype, "addStyles", null);
    return EmulatedRenderer;
}(NativeScriptRenderer));
// tslint:disable-next-line
var addStyleToCss = profiling_1.profile('"renderer".addStyleToCss', function addStyleToCss(style) {
    application_1.addCss(style);
});
function replaceNgAttribute(input, componentId) {
    return input.replace(COMPONENT_REGEX, componentId);
}
//# sourceMappingURL=renderer.js.map

/***/ }),

/***/ 164:
/*!*********************!*\
  !*** ./main.aot.ts ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_static_1 = __webpack_require__(/*! nativescript-angular/platform-static */ 75);
var app_module_ngfactory_1 = __webpack_require__(/*! ./app.module.ngfactory */ 207);
platform_static_1.platformNativeScript().bootstrapModuleFactory(app_module_ngfactory_1.AppModuleNgFactory);
//# sourceMappingURL=main.aot.js.map

/***/ }),

/***/ 207:
/*!*********************************!*\
  !*** ./app.module.ngfactory.ts ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! @angular/core */ 1);
var i1 = __webpack_require__(/*! ./app.module */ 208);
var i2 = __webpack_require__(/*! ./app.component */ 127);
var i3 = __webpack_require__(/*! ../node_modules/nativescript-angular/common/detached-loader.ngfactory */ 209);
var i4 = __webpack_require__(/*! ./home/home.component.ngfactory */ 210);
var i5 = __webpack_require__(/*! ./app.component.ngfactory */ 238);
var i6 = __webpack_require__(/*! @angular/common */ 16);
var i7 = __webpack_require__(/*! nativescript-angular/directives/dialogs */ 157);
var i8 = __webpack_require__(/*! nativescript-angular/platform-providers */ 20);
var i9 = __webpack_require__(/*! tns-core-modules/ui/page/page */ 17);
var i10 = __webpack_require__(/*! nativescript-angular/renderer */ 158);
var i11 = __webpack_require__(/*! nativescript-angular/router/ns-platform-location */ 159);
var i12 = __webpack_require__(/*! nativescript-angular/router/ns-location-strategy */ 25);
var i13 = __webpack_require__(/*! nativescript-angular/router/router-extensions */ 51);
var i14 = __webpack_require__(/*! @angular/router */ 18);
var i15 = __webpack_require__(/*! tns-core-modules/ui/frame/frame */ 7);
var i16 = __webpack_require__(/*! nativescript-angular/nativescript.module */ 254);
var i17 = __webpack_require__(/*! nativescript-angular/common */ 74);
var i18 = __webpack_require__(/*! nativescript-angular/router/router.module */ 162);
var i19 = __webpack_require__(/*! ./home/home.component */ 72);
var i20 = __webpack_require__(/*! nativescript-angular/router/ns-route-reuse-strategy */ 50);
var i21 = __webpack_require__(/*! ./app.routing */ 259);
exports.AppModuleNgFactory = i0.ɵcmf(i1.AppModule, [i2.AppComponent], function (_l) {
    return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, [i3.DetachedLoaderNgFactory, i4.HomeComponentNgFactory, i5.AppComponentNgFactory]],
            [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(5120, i0.APP_ID, i0.ɵf, []), i0.ɵmpd(5120, i0.IterableDiffers, i0.ɵk, []),
        i0.ɵmpd(5120, i0.KeyValueDiffers, i0.ɵl, []), i0.ɵmpd(5120, i0.LOCALE_ID, i0.ɵm, [[3, i0.LOCALE_ID]]), i0.ɵmpd(4608, i6.NgLocalization, i6.NgLocaleLocalization, [i0.LOCALE_ID]), i0.ɵmpd(4608, i7.ModalDialogService, i7.ModalDialogService, []), i0.ɵmpd(5120, i8.DEVICE, i8.getDefaultDevice, []),
        i0.ɵmpd(5120, i9.Page, i8.getDefaultPage, []), i0.ɵmpd(4608, i10.NativeScriptRendererFactory, i10.NativeScriptRendererFactory, [[2, i8.APP_ROOT_VIEW], i8.DEVICE, i0.NgZone]),
        i0.ɵmpd(4608, i0.SystemJsNgModuleLoader, i0.SystemJsNgModuleLoader, [i0.Compiler,
            [2, i0.SystemJsNgModuleLoaderConfig]]), i0.ɵmpd(6144, i0.RendererFactory2, null, [i10.NativeScriptRendererFactory]), i0.ɵmpd(4608, i11.NativescriptPlatformLocation, i11.NativescriptPlatformLocation, [i12.NSLocationStrategy]), i0.ɵmpd(4608, i13.RouterExtensions, i13.RouterExtensions, [i14.Router, i12.NSLocationStrategy,
            i15.Frame]), i0.ɵmpd(5120, i14.ActivatedRoute, i14.ɵf, [i14.Router]),
        i0.ɵmpd(4608, i14.NoPreloading, i14.NoPreloading, []), i0.ɵmpd(6144, i14.PreloadingStrategy, null, [i14.NoPreloading]), i0.ɵmpd(135680, i14.RouterPreloader, i14.RouterPreloader, [i14.Router, i0.NgModuleFactoryLoader,
            i0.Compiler, i0.Injector, i14.PreloadingStrategy]), i0.ɵmpd(4608, i14.PreloadAllModules, i14.PreloadAllModules, []), i0.ɵmpd(5120, i0.NgProbeToken, function () {
            return [i14.ɵb()];
        }, []), i0.ɵmpd(5120, i14.ROUTER_INITIALIZER, i14.ɵi, [i14.ɵg]), i0.ɵmpd(5120, i0.APP_BOOTSTRAP_LISTENER, function (p0_0) {
            return [p0_0];
        }, [i14.ROUTER_INITIALIZER]), i0.ɵmpd(1024, i0.ErrorHandler, i16.errorHandlerFactory, []), i0.ɵmpd(512, i14.ɵg, i14.ɵg, [i0.Injector]), i0.ɵmpd(1024, i0.APP_INITIALIZER, function (p0_0) {
            return [i14.ɵh(p0_0)];
        }, [i14.ɵg]), i0.ɵmpd(512, i0.ApplicationInitStatus, i0.ApplicationInitStatus, [[2, i0.APP_INITIALIZER]]), i0.ɵmpd(131584, i0.ɵe, i0.ɵe, [i0.NgZone, i0.ɵConsole,
            i0.Injector, i0.ErrorHandler, i0.ComponentFactoryResolver, i0.ApplicationInitStatus]),
        i0.ɵmpd(2048, i0.ApplicationRef, null, [i0.ɵe]), i0.ɵmpd(512, i0.ApplicationModule, i0.ApplicationModule, [i0.ApplicationRef]), i0.ɵmpd(512, i6.CommonModule, i6.CommonModule, []), i0.ɵmpd(512, i17.NativeScriptCommonModule, i17.NativeScriptCommonModule, []), i0.ɵmpd(512, i16.NativeScriptModule, i16.NativeScriptModule, []), i0.ɵmpd(1024, i14.ɵa, i14.ɵd, [[3,
                i14.Router]]), i0.ɵmpd(512, i14.UrlSerializer, i14.DefaultUrlSerializer, []), i0.ɵmpd(512, i14.ChildrenOutletContexts, i14.ChildrenOutletContexts, []), i0.ɵmpd(1024, i15.Frame, i8.getDefaultFrame, []),
        i0.ɵmpd(1024, i12.NSLocationStrategy, i18.provideLocationStrategy, [[3, i12.NSLocationStrategy],
            i15.Frame]), i0.ɵmpd(512, i6.PlatformLocation, i11.NativescriptPlatformLocation, [i12.NSLocationStrategy]), i0.ɵmpd(256, i14.ROUTER_CONFIGURATION, {}, []),
        i0.ɵmpd(1024, i6.LocationStrategy, i14.ɵc, [i6.PlatformLocation, [2, i6.APP_BASE_HREF],
            i14.ROUTER_CONFIGURATION]), i0.ɵmpd(512, i6.Location, i6.Location, [i6.LocationStrategy]),
        i0.ɵmpd(512, i0.Compiler, i0.Compiler, []), i0.ɵmpd(512, i0.NgModuleFactoryLoader, i0.SystemJsNgModuleLoader, [i0.Compiler, [2, i0.SystemJsNgModuleLoaderConfig]]),
        i0.ɵmpd(1024, i14.ROUTES, function () {
            return [[{ path: '', redirectTo: '/home', pathMatch: 'full' }, { path: 'home', component: i19.HomeComponent }]];
        }, []), i0.ɵmpd(512, i20.NSRouteReuseStrategy, i20.NSRouteReuseStrategy, [i12.NSLocationStrategy]), i0.ɵmpd(2048, i14.RouteReuseStrategy, null, [i20.NSRouteReuseStrategy]), i0.ɵmpd(1024, i14.Router, i14.ɵe, [i0.ApplicationRef,
            i14.UrlSerializer, i14.ChildrenOutletContexts, i6.Location, i0.Injector,
            i0.NgModuleFactoryLoader, i0.Compiler, i14.ROUTES, i14.ROUTER_CONFIGURATION,
            [2, i14.UrlHandlingStrategy], [2, i14.RouteReuseStrategy]]), i0.ɵmpd(512, i14.RouterModule, i14.RouterModule, [[2, i14.ɵa], [2, i14.Router]]), i0.ɵmpd(512, i18.NativeScriptRouterModule, i18.NativeScriptRouterModule, []),
        i0.ɵmpd(512, i21.AppRoutingModule, i21.AppRoutingModule, []), i0.ɵmpd(512, i1.AppModule, i1.AppModule, [])]);
});
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL2hvbWUvamFncHJlZXQvRGVza3RvcC9OYXRpdmUvR2VvTG9jYXRpb24vYXBwL2FwcC5tb2R1bGUubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vaG9tZS9qYWdwcmVldC9EZXNrdG9wL05hdGl2ZS9HZW9Mb2NhdGlvbi9hcHAvYXBwLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIgIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
//# sourceMappingURL=app.module.ngfactory.js.map

/***/ }),

/***/ 208:
/*!***********************!*\
  !*** ./app.module.ts ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 209:
/*!********************************************************************************!*\
  !*** ../node_modules/nativescript-angular/common/detached-loader.ngfactory.ts ***!
  \********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! @angular/core */ 1);
var i1 = __webpack_require__(/*! nativescript-angular/common/detached-loader */ 45);
var styles_DetachedLoader = [];
exports.RenderType_DetachedLoader = i0.ɵcrt({ encapsulation: 2,
    styles: styles_DetachedLoader, data: {} });
function View_DetachedLoader_0(_l) {
    return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, [['loader', 1]], null, 0, 'Placeholder', [], null, null, null, null, null))], null, null);
}
exports.View_DetachedLoader_0 = View_DetachedLoader_0;
function View_DetachedLoader_Host_0(_l) {
    return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 16777216, null, null, 1, 'DetachedContainer', [], null, null, null, View_DetachedLoader_0, exports.RenderType_DetachedLoader)), i0.ɵdid(1, 49152, null, 0, i1.DetachedLoader, [i0.ComponentFactoryResolver, i0.ChangeDetectorRef, i0.ViewContainerRef], null, null)], null, null);
}
exports.View_DetachedLoader_Host_0 = View_DetachedLoader_Host_0;
exports.DetachedLoaderNgFactory = i0.ɵccf('DetachedContainer', i1.DetachedLoader, View_DetachedLoader_Host_0, {}, {}, []);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL2hvbWUvamFncHJlZXQvRGVza3RvcC9OYXRpdmUvR2VvTG9jYXRpb24vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vbi9kZXRhY2hlZC1sb2FkZXIubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vaG9tZS9qYWdwcmVldC9EZXNrdG9wL05hdGl2ZS9HZW9Mb2NhdGlvbi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uL2RldGFjaGVkLWxvYWRlci5kLnRzIiwibmc6Ly8vaG9tZS9qYWdwcmVldC9EZXNrdG9wL05hdGl2ZS9HZW9Mb2NhdGlvbi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uL2RldGFjaGVkLWxvYWRlci5kLnRzLkRldGFjaGVkTG9hZGVyLmh0bWwiLCJuZzovLy9ob21lL2phZ3ByZWV0L0Rlc2t0b3AvTmF0aXZlL0dlb0xvY2F0aW9uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb24vZGV0YWNoZWQtbG9hZGVyLmQudHMuRGV0YWNoZWRMb2FkZXJfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8UGxhY2Vob2xkZXIgI2xvYWRlcj48L1BsYWNlaG9sZGVyPiIsIjxEZXRhY2hlZENvbnRhaW5lcj48L0RldGFjaGVkQ29udGFpbmVyPiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O29CQ0FBO01BQUE7Ozs7b0JDQUE7TUFBQTsrQkFBQSxVQUFBO01BQUE7TUFBQTs7OyJ9
//# sourceMappingURL=detached-loader.ngfactory.js.map

/***/ }),

/***/ 210:
/*!******************************************!*\
  !*** ./home/home.component.ngfactory.ts ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! @angular/core */ 1);
var i1 = __webpack_require__(/*! ../../node_modules/nativescript-angular/directives/action-bar.ngfactory */ 211);
var i2 = __webpack_require__(/*! nativescript-angular/directives/action-bar */ 46);
var i3 = __webpack_require__(/*! tns-core-modules/ui/page/page */ 17);
var i4 = __webpack_require__(/*! ./home.component */ 72);
var i5 = __webpack_require__(/*! ../../node_modules/nativescript-angular/directives/list-view-comp.ngfactory */ 237);
var i6 = __webpack_require__(/*! nativescript-angular/directives/list-view-comp */ 48);
var styles_HomeComponent = [];
exports.RenderType_HomeComponent = i0.ɵcrt({ encapsulation: 2,
    styles: styles_HomeComponent, data: {} });
function View_HomeComponent_1(_l) {
    return i0.ɵvid(0, [(_l()(), i0.ɵted(-1, null, ['\n                '])), (_l()(),
            i0.ɵeld(1, 0, null, null, 5, 'StackLayout', [], [[2, 'odd',
                    null], [2, 'even', null]], null, null, null, null)), (_l()(), i0.ɵted(-1, null, ['\n                    '])),
        (_l()(), i0.ɵeld(3, 0, null, null, 0, 'Label', [], [[8,
                'text', 0]], null, null, null, null)), (_l()(),
            i0.ɵted(-1, null, ['\n                    '])), (_l()(), i0.ɵeld(5, 0, null, null, 0, 'Label', [], [[8, 'text', 0]], null, null, null, null)), (_l()(), i0.ɵted(-1, null, ['\n                '])), (_l()(), i0.ɵted(-1, null, ['\n            ']))], null, function (_ck, _v) {
        var currVal_0 = _v.context.odd;
        var currVal_1 = _v.context.even;
        _ck(_v, 1, 0, currVal_0, currVal_1);
        var currVal_2 = ((('Index: ' + _v.context.index) + ' Timestamp: ') + _v.context.item.timestamp);
        _ck(_v, 3, 0, currVal_2);
        var currVal_3 = (((('[' + _v.context.item.Lat) + ', ') + _v.context.item.Long) + ']');
        _ck(_v, 5, 0, currVal_3);
    });
}
function View_HomeComponent_0(_l) {
    return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, 'ActionBar', [['title', 'Location']], null, null, null, i1.View_ActionBarComponent_0, i1.RenderType_ActionBarComponent)), i0.ɵdid(1, 49152, null, 0, i2.ActionBarComponent, [i0.ElementRef, i3.Page], null, null), (_l()(), i0.ɵted(-1, null, ['\n'])), (_l()(), i0.ɵted(-1, null, ['\n'])), (_l()(), i0.ɵeld(4, 0, null, null, 21, 'GridLayout', [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ['\n    '])),
        (_l()(), i0.ɵeld(6, 0, null, null, 18, 'StackLayout', [], null, null, null, null, null)),
        (_l()(), i0.ɵted(-1, null, ['\n        '])), (_l()(), i0.ɵeld(8, 0, null, null, 0, 'Label', [], [[8, 'text', 0]], null, null, null, null)), (_l()(), i0.ɵted(-1, null, ['\n        '])),
        (_l()(), i0.ɵeld(10, 0, null, null, 0, 'Label', [], [[8,
                'text', 0]], null, null, null, null)), (_l()(),
            i0.ɵted(-1, null, ['\n        '])), (_l()(), i0.ɵeld(12, 0, null, null, 0, 'Button', [['class', 'btn btn-primary btn-active'], ['text',
                'Update Location']], null, [[null, 'tap']], function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (('tap' === en)) {
                var pd_0 = (_co.updateLocation() !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)), (_l()(), i0.ɵted(-1, null, ['\n        '])),
        (_l()(), i0.ɵeld(14, 0, null, null, 0, 'Button', [['class', 'btn btn-primary btn-active'],
            ['text', 'Start Watching']], null, [[null, 'tap']], function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (('tap' === en)) {
                var pd_0 = (_co.startWatchingLocation() !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)), (_l()(), i0.ɵted(-1, null, ['\n        '])),
        (_l()(), i0.ɵeld(16, 0, null, null, 0, 'Button', [['class', 'btn btn-primary btn-active'],
            ['text', 'Stop Watching']], null, [[null, 'tap']], function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (('tap' === en)) {
                var pd_0 = (_co.stopWatchingLocation() !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)), (_l()(), i0.ɵted(-1, null, ['\n        '])),
        (_l()(), i0.ɵeld(18, 0, null, null, 5, 'ListView', [], null, null, null, i5.View_ListViewComponent_0, i5.RenderType_ListViewComponent)),
        i0.ɵdid(19, 1490944, null, 1, i6.ListViewComponent, [i0.ElementRef, i0.IterableDiffers,
            i0.ChangeDetectorRef], { items: [0, 'items'] }, null), i0.ɵqud(335544320, 1, { itemTemplateQuery: 0 }), (_l()(), i0.ɵted(-1, null, ['\n            '])),
        (_l()(), i0.ɵand(0, [[1, 2]], null, 0, null, View_HomeComponent_1)),
        (_l()(), i0.ɵted(-1, null, ['\n        '])), (_l()(), i0.ɵted(-1, null, ['\n    '])), (_l()(), i0.ɵted(-1, null, ['\n']))], function (_ck, _v) {
        var _co = _v.component;
        var currVal_2 = _co.dbDataArray;
        _ck(_v, 19, 0, currVal_2);
    }, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = i0.ɵinlineInterpolate(1, 'Latitude: ', _co.latitude, '');
        _ck(_v, 8, 0, currVal_0);
        var currVal_1 = i0.ɵinlineInterpolate(1, 'Longitude: ', _co.longitude, '');
        _ck(_v, 10, 0, currVal_1);
    });
}
exports.View_HomeComponent_0 = View_HomeComponent_0;
function View_HomeComponent_Host_0(_l) {
    return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, 'home', [], null, null, null, View_HomeComponent_0, exports.RenderType_HomeComponent)),
        i0.ɵdid(1, 114688, null, 0, i4.HomeComponent, [i0.NgZone], null, null)], function (_ck, _v) {
        _ck(_v, 1, 0);
    }, null);
}
exports.View_HomeComponent_Host_0 = View_HomeComponent_Host_0;
exports.HomeComponentNgFactory = i0.ɵccf('home', i4.HomeComponent, View_HomeComponent_Host_0, {}, {}, []);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL2hvbWUvamFncHJlZXQvRGVza3RvcC9OYXRpdmUvR2VvTG9jYXRpb24vYXBwL2hvbWUvaG9tZS5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vaG9tZS9qYWdwcmVldC9EZXNrdG9wL05hdGl2ZS9HZW9Mb2NhdGlvbi9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC50cyIsIm5nOi8vL2hvbWUvamFncHJlZXQvRGVza3RvcC9OYXRpdmUvR2VvTG9jYXRpb24vYXBwL2hvbWUvaG9tZS5jb21wb25lbnQuaHRtbCIsIm5nOi8vL2hvbWUvamFncHJlZXQvRGVza3RvcC9OYXRpdmUvR2VvTG9jYXRpb24vYXBwL2hvbWUvaG9tZS5jb21wb25lbnQudHMuSG9tZUNvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxBY3Rpb25CYXIgdGl0bGU9XCJMb2NhdGlvblwiPjwvQWN0aW9uQmFyPlxuPCEtLSA8QWN0aW9uQmFyIHRpdGxlPVwiQXBwIEljb24gRGVtb1wiIGFuZHJvaWQuaWNvbj1cInJlczovL2ljb25cIiBhbmRyb2lkLmljb25WaXNpYmlsaXR5PVwiYWx3YXlzXCI+PC9BY3Rpb25CYXI+IC0tPlxuPEdyaWRMYXlvdXQ+XG4gICAgPFN0YWNrTGF5b3V0PlxuICAgICAgICA8TGFiZWwgdGV4dD1cIkxhdGl0dWRlOiB7eyBsYXRpdHVkZSB9fVwiPjwvTGFiZWw+XG4gICAgICAgIDxMYWJlbCB0ZXh0PVwiTG9uZ2l0dWRlOiB7eyBsb25naXR1ZGUgfX1cIj48L0xhYmVsPlxuICAgICAgICA8QnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1hY3RpdmVcIiB0ZXh0PVwiVXBkYXRlIExvY2F0aW9uXCIgKHRhcCk9XCJ1cGRhdGVMb2NhdGlvbigpXCI+PC9CdXR0b24+XG4gICAgICAgIDxCdXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLWFjdGl2ZVwiIHRleHQ9XCJTdGFydCBXYXRjaGluZ1wiICh0YXApPVwic3RhcnRXYXRjaGluZ0xvY2F0aW9uKClcIj48L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tYWN0aXZlXCIgdGV4dD1cIlN0b3AgV2F0Y2hpbmdcIiAodGFwKT1cInN0b3BXYXRjaGluZ0xvY2F0aW9uKClcIj48L0J1dHRvbj5cbiAgICAgICAgPExpc3RWaWV3IFtpdGVtc109XCJkYkRhdGFBcnJheVwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtPVwiaXRlbVwiIGxldC1pPVwiaW5kZXhcIiBsZXQtb2RkPVwib2RkXCIgbGV0LWV2ZW49XCJldmVuXCI+XG4gICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IFtjbGFzcy5vZGRdPVwib2RkXCIgW2NsYXNzLmV2ZW5dPVwiZXZlblwiPlxuICAgICAgICAgICAgICAgICAgICA8TGFiZWwgW3RleHRdPSdcIkluZGV4OiBcIiArIGkgKyBcIiBUaW1lc3RhbXA6IFwiK2l0ZW0udGltZXN0YW1wJz48L0xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8TGFiZWwgW3RleHRdPSdcIltcIiArIGl0ZW0uTGF0ICtcIiwgXCIgKyBpdGVtLkxvbmcgKyBcIl1cIic+PC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9MaXN0Vmlldz5cbiAgICA8L1N0YWNrTGF5b3V0PlxuPC9HcmlkTGF5b3V0PiIsIjxob21lPjwvaG9tZT4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ1VxRiwwREFDckU7YUFBQTtVQUFBO1VBQUEsZ0JBQW1EO01BQy9DO1VBQUEscUVBQXNFO2lCQUFBLCtDQUN0RTtVQUFBO1VBQUEsNENBQStEO1VBQUEseUJBQ3JEOztRQUhEO1FBQWtCO1FBQS9CLFdBQWEsVUFBa0IsU0FBL0I7UUFDVztRQUFQLFdBQU8sU0FBUDtRQUNPO1FBQVAsV0FBTyxTQUFQOzs7O29CQWJwQjtNQUFBO3NDQUFBLFVBQUE7TUFBQSxxREFBd0M7TUFBQSxTQUN3RSwwQ0FDaEg7TUFBQTtNQUFBLDhCQUFZO01BQ1I7VUFBQTtNQUFhLGtEQUNUO1VBQUE7VUFBQSw4QkFBK0M7TUFDL0M7VUFBQSxxRUFBaUQ7aUJBQUEsbUNBQ2pEO1VBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBa0U7Y0FBQTtjQUFBO1lBQUE7WUFBbEU7VUFBQSxnQ0FBb0c7TUFDcEc7VUFBQTtnQkFBQTtRQUFBO1FBQUE7UUFBaUU7VUFBQTtVQUFBO1FBQUE7UUFBakU7TUFBQSxnQ0FBMEc7TUFDMUc7VUFBQTtRQUFBO1FBQUE7UUFBZ0U7VUFBQTtVQUFBO1FBQUE7UUFBaEU7TUFBQSxnQ0FBd0c7TUFDeEc7VUFBQTthQUFBOzhCQUFBO1VBQUEseUJBQWdDO01BQzVCO01BS2Msa0RBQ1A7VUFBQSxhQUNEOztJQVJBO0lBQVYsWUFBVSxTQUFWOzs7SUFMTztJQUFQLFdBQU8sU0FBUDtJQUNPO0lBQVAsWUFBTyxTQUFQOzs7O29CQ0xSO01BQUE7YUFBQTtVQUFBO0lBQUE7Ozs7In0=
//# sourceMappingURL=home.component.ngfactory.js.map

/***/ }),

/***/ 211:
/*!*******************************************************************************!*\
  !*** ../node_modules/nativescript-angular/directives/action-bar.ngfactory.ts ***!
  \*******************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! @angular/core */ 1);
var i1 = __webpack_require__(/*! nativescript-angular/directives/action-bar */ 46);
var i2 = __webpack_require__(/*! tns-core-modules/ui/page/page */ 17);
var styles_ActionBarComponent = [];
exports.RenderType_ActionBarComponent = i0.ɵcrt({ encapsulation: 2,
    styles: styles_ActionBarComponent, data: {} });
function View_ActionBarComponent_0(_l) {
    return i0.ɵvid(0, [i0.ɵncd(null, 0)], null, null);
}
exports.View_ActionBarComponent_0 = View_ActionBarComponent_0;
function View_ActionBarComponent_Host_0(_l) {
    return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, 'ActionBar', [], null, null, null, View_ActionBarComponent_0, exports.RenderType_ActionBarComponent)), i0.ɵdid(1, 49152, null, 0, i1.ActionBarComponent, [i0.ElementRef, i2.Page], null, null)], null, null);
}
exports.View_ActionBarComponent_Host_0 = View_ActionBarComponent_Host_0;
exports.ActionBarComponentNgFactory = i0.ɵccf('ActionBar', i1.ActionBarComponent, View_ActionBarComponent_Host_0, {}, {}, ['*']);
var styles_ActionBarScope = [];
exports.RenderType_ActionBarScope = i0.ɵcrt({ encapsulation: 2,
    styles: styles_ActionBarScope, data: {} });
function View_ActionBarScope_0(_l) {
    return i0.ɵvid(0, [], null, null);
}
exports.View_ActionBarScope_0 = View_ActionBarScope_0;
function View_ActionBarScope_Host_0(_l) {
    return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, 'ActionBarExtension', [], null, null, null, View_ActionBarScope_0, exports.RenderType_ActionBarScope)), i0.ɵdid(1, 49152, null, 0, i1.ActionBarScope, [i2.Page], null, null)], null, null);
}
exports.View_ActionBarScope_Host_0 = View_ActionBarScope_Host_0;
exports.ActionBarScopeNgFactory = i0.ɵccf('ActionBarExtension', i1.ActionBarScope, View_ActionBarScope_Host_0, {}, {}, []);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL2hvbWUvamFncHJlZXQvRGVza3RvcC9OYXRpdmUvR2VvTG9jYXRpb24vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvYWN0aW9uLWJhci5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9ob21lL2phZ3ByZWV0L0Rlc2t0b3AvTmF0aXZlL0dlb0xvY2F0aW9uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2FjdGlvbi1iYXIuZC50cyIsIm5nOi8vL2hvbWUvamFncHJlZXQvRGVza3RvcC9OYXRpdmUvR2VvTG9jYXRpb24vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvYWN0aW9uLWJhci5kLnRzLkFjdGlvbkJhckNvbXBvbmVudC5odG1sIiwibmc6Ly8vaG9tZS9qYWdwcmVldC9EZXNrdG9wL05hdGl2ZS9HZW9Mb2NhdGlvbi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9hY3Rpb24tYmFyLmQudHMuQWN0aW9uQmFyQ29tcG9uZW50X0hvc3QuaHRtbCIsIm5nOi8vL2hvbWUvamFncHJlZXQvRGVza3RvcC9OYXRpdmUvR2VvTG9jYXRpb24vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvYWN0aW9uLWJhci5kLnRzLkFjdGlvbkJhclNjb3BlX0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiIsIjxBY3Rpb25CYXI+PC9BY3Rpb25CYXI+IiwiPEFjdGlvbkJhckV4dGVuc2lvbj48L0FjdGlvbkJhckV4dGVuc2lvbj4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7MkJDQUE7OztvQkNBQTtNQUFBO21DQUFBLFVBQUE7TUFBQTs7Ozs7Ozs7Ozs7b0JDQUE7TUFBQTsrQkFBQSxVQUFBO01BQUE7OzsifQ==
//# sourceMappingURL=action-bar.ngfactory.js.map

/***/ }),

/***/ 233:
/*!***********************************************************************!*\
  !*** ../node_modules/nativescript-geolocation/geolocation.android.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = __webpack_require__(/*! application */ 3);
var enums_1 = __webpack_require__(/*! ui/enums */ 36);
var timer_1 = __webpack_require__(/*! timer */ 52);
var geolocation_common_1 = __webpack_require__(/*! ./geolocation.common */ 234);
var permissions = __webpack_require__(/*! nativescript-permissions */ 235);
var REQUEST_ENABLE_LOCATION = 4269;
var _onEnableLocationSuccess = null;
var _onEnableLocationFail = null;
var locationListeners = {};
var watchIdCounter = 0;
var fusedLocationClient;
function _ensureLocationClient() {
    fusedLocationClient = fusedLocationClient ||
        com.google.android.gms.location.LocationServices.getFusedLocationProviderClient(application_1.android.context);
}
application_1.android.on(application_1.AndroidApplication.activityResultEvent, function (args) {
    if (args.requestCode === REQUEST_ENABLE_LOCATION) {
        if (args.resultCode === 0) {
            if (_onEnableLocationFail) {
                _onEnableLocationFail("Location not enabled.");
            }
        }
        else if (_onEnableLocationSuccess) {
            _onEnableLocationSuccess();
        }
    }
});
function getCurrentLocation(options) {
    return new Promise(function (resolve, reject) {
        enableLocationRequest().then(function () {
            if (options.timeout === 0) {
                LocationManager.getLastLocation(options.maximumAge, resolve, reject);
            }
            else {
                var locationRequest = _getLocationRequest(options);
                var watchId_1 = _getNextWatchId();
                var locationCallback = _getLocationCallback(watchId_1, function (nativeLocation) {
                    clearWatch(watchId_1);
                    resolve(new Location(nativeLocation));
                });
                LocationManager.requestLocationUpdates(locationRequest, locationCallback);
                var timerId_1 = timer_1.setTimeout(function () {
                    clearWatch(watchId_1);
                    timer_1.clearTimeout(timerId_1);
                    reject(new Error("Timeout while searching for location!"));
                }, options.timeout || geolocation_common_1.defaultGetLocationTimeout);
            }
        }, reject);
    });
}
exports.getCurrentLocation = getCurrentLocation;
function _getNextWatchId() {
    var watchId = ++watchIdCounter;
    return watchId;
}
function _getLocationCallback(watchId, onLocation) {
    var LocationCallback = com.google.android.gms.location.LocationCallback.extend({
        onLocationResult: function (locationResult) {
            this.onLocation(locationResult.getLastLocation());
        }
    });
    var locationCallback = new LocationCallback();
    locationCallback.onLocation = onLocation;
    locationListeners[watchId] = locationCallback;
    return locationCallback;
}
function _getLocationRequest(options) {
    var mLocationRequest = new com.google.android.gms.location.LocationRequest();
    var updateTime = options.updateTime === 0 ? 0 : options.updateTime || geolocation_common_1.minTimeUpdate;
    mLocationRequest.setInterval(updateTime);
    var minUpdateTime = options.minimumUpdateTime === 0 ?
        0 : options.minimumUpdateTime || Math.min(updateTime, geolocation_common_1.fastestTimeUpdate);
    mLocationRequest.setFastestInterval(minUpdateTime);
    if (options.desiredAccuracy === enums_1.Accuracy.high) {
        mLocationRequest.setPriority(com.google.android.gms.location.LocationRequest.PRIORITY_HIGH_ACCURACY);
    }
    else {
        mLocationRequest.setPriority(com.google.android.gms.location.LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY);
    }
    return mLocationRequest;
}
function _requestLocationPermissions() {
    return new Promise(function (resolve, reject) {
        if (LocationManager.shouldSkipChecks()) {
            resolve();
        }
        else {
            permissions.requestPermission(android.Manifest.permission.ACCESS_FINE_LOCATION).then(resolve, reject);
        }
    });
}
function _getLocationListener(maxAge, onLocation, onError) {
    return _getTaskSuccessListener(function (nativeLocation) {
        if (nativeLocation != null) {
            var location_1 = new Location(nativeLocation);
            if (typeof maxAge === "number" && nativeLocation != null) {
                if (location_1.timestamp.valueOf() + maxAge > new Date().valueOf()) {
                    onLocation(location_1);
                }
                else {
                    onError(new Error("Last known location too old!"));
                }
            }
            else {
                onLocation(location_1);
            }
        }
        else {
            onError(new Error("There is no last known location!"));
        }
    });
}
function _getTaskSuccessListener(done) {
    return new com.google.android.gms.tasks.OnSuccessListener({
        onSuccess: done
    });
}
function _getTaskFailListener(done) {
    return new com.google.android.gms.tasks.OnFailureListener({
        onFailure: done
    });
}
function watchLocation(successCallback, errorCallback, options) {
    var zonedSuccessCallback = zonedCallback(successCallback);
    var zonedErrorCallback = zonedCallback(errorCallback);
    if ((!permissions.hasPermission(android.Manifest.permission.ACCESS_FINE_LOCATION) ||
        !_isGooglePlayServicesAvailable()) && !LocationManager.shouldSkipChecks()) {
        throw new Error('Cannot watch location. Call "enableLocationRequest" first');
    }
    var locationRequest = _getLocationRequest(options);
    var watchId = _getNextWatchId();
    var locationCallback = _getLocationCallback(watchId, function (nativeLocation) {
        zonedSuccessCallback(new Location(nativeLocation));
    });
    LocationManager.requestLocationUpdates(locationRequest, locationCallback);
    return watchId;
}
exports.watchLocation = watchLocation;
function clearWatch(watchId) {
    var listener = locationListeners[watchId];
    if (listener) {
        LocationManager.removeLocationUpdates(listener);
        delete locationListeners[watchId];
    }
}
exports.clearWatch = clearWatch;
function enableLocationRequest(always) {
    return new Promise(function (resolve, reject) {
        _requestLocationPermissions().then(function () {
            _makeGooglePlayServicesAvailable().then(function () {
                _isLocationServiceEnabled().then(function () {
                    resolve();
                }, function (ex) {
                    var statusCode = ex.getStatusCode();
                    if (statusCode === com.google.android.gms.common.api.CommonStatusCodes.RESOLUTION_REQUIRED) {
                        try {
                            _onEnableLocationSuccess = resolve;
                            _onEnableLocationFail = reject;
                            ex.startResolutionForResult(application_1.android.foregroundActivity, REQUEST_ENABLE_LOCATION);
                        }
                        catch (sendEx) {
                            resolve();
                        }
                    }
                    else {
                        reject(new Error("Cannot enable the location service"));
                    }
                });
            }, reject);
        }, reject);
    });
}
exports.enableLocationRequest = enableLocationRequest;
function _makeGooglePlayServicesAvailable() {
    return new Promise(function (resolve, reject) {
        if (_isGooglePlayServicesAvailable()) {
            resolve();
            return;
        }
        var googleApiAvailability = com.google.android.gms.common.GoogleApiAvailability.getInstance();
        googleApiAvailability.makeGooglePlayServicesAvailable(application_1.android.foregroundActivity)
            .addOnSuccessListener(_getTaskSuccessListener(resolve))
            .addOnFailureListener(_getTaskFailListener(reject));
    });
}
function _isGooglePlayServicesAvailable() {
    if (LocationManager.shouldSkipChecks()) {
        return true;
    }
    var isLocationServiceEnabled = true;
    var googleApiAvailability = com.google.android.gms.common.GoogleApiAvailability.getInstance();
    var resultCode = googleApiAvailability.isGooglePlayServicesAvailable(application_1.android.foregroundActivity);
    if (resultCode !== com.google.android.gms.common.ConnectionResult.SUCCESS) {
        isLocationServiceEnabled = false;
    }
    return isLocationServiceEnabled;
}
function _isLocationServiceEnabled(options) {
    return new Promise(function (resolve, reject) {
        if (LocationManager.shouldSkipChecks()) {
            resolve(true);
            return;
        }
        options = options || { desiredAccuracy: enums_1.Accuracy.high, updateTime: 0, updateDistance: 0, maximumAge: 0, timeout: 0 };
        var locationRequest = _getLocationRequest(options);
        var locationSettingsBuilder = new com.google.android.gms.location.LocationSettingsRequest.Builder();
        locationSettingsBuilder.addLocationRequest(locationRequest);
        locationSettingsBuilder.setAlwaysShow(true);
        var locationSettingsClient = com.google.android.gms.location.LocationServices.getSettingsClient(application_1.android.context);
        locationSettingsClient.checkLocationSettings(locationSettingsBuilder.build())
            .addOnSuccessListener(_getTaskSuccessListener(function (a) {
            resolve();
        }))
            .addOnFailureListener(_getTaskFailListener(function (ex) {
            reject(ex);
        }));
    });
}
function isEnabled(options) {
    return new Promise(function (resolve, reject) {
        if (!_isGooglePlayServicesAvailable() ||
            !permissions.hasPermission(android.Manifest.permission.ACCESS_FINE_LOCATION)) {
            resolve(false);
        }
        else {
            _isLocationServiceEnabled(options).then(function () {
                resolve(true);
            }, function () {
                resolve(false);
            });
        }
    });
}
exports.isEnabled = isEnabled;
function distance(loc1, loc2) {
    if (!loc1.android) {
        loc1.android = androidLocationFromLocation(loc1);
    }
    if (!loc2.android) {
        loc2.android = androidLocationFromLocation(loc2);
    }
    return loc1.android.distanceTo(loc2.android);
}
exports.distance = distance;
function androidLocationFromLocation(location) {
    var androidLocation = new android.location.Location("custom");
    androidLocation.setLatitude(location.latitude);
    androidLocation.setLongitude(location.longitude);
    if (location.altitude) {
        androidLocation.setAltitude(location.altitude);
    }
    if (location.speed) {
        androidLocation.setSpeed(float(location.speed));
    }
    if (location.direction) {
        androidLocation.setBearing(float(location.direction));
    }
    if (location.timestamp) {
        try {
            androidLocation.setTime(long(location.timestamp.getTime()));
        }
        catch (e) {
            console.error("invalid location timestamp");
        }
    }
    return androidLocation;
}
var LocationManager = (function () {
    function LocationManager() {
    }
    LocationManager.getLastLocation = function (maximumAge, resolve, reject) {
        _ensureLocationClient();
        return fusedLocationClient.getLastLocation()
            .addOnSuccessListener(_getLocationListener(maximumAge, resolve, reject))
            .addOnFailureListener(_getTaskFailListener(function (e) { return reject(new Error(e.getMessage())); }));
    };
    LocationManager.requestLocationUpdates = function (locationRequest, locationCallback) {
        _ensureLocationClient();
        fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, null);
    };
    LocationManager.removeLocationUpdates = function (listener) {
        _ensureLocationClient();
        fusedLocationClient.removeLocationUpdates(listener);
    };
    LocationManager.shouldSkipChecks = function () {
        return false;
    };
    LocationManager.setMockLocationManager = function (MockLocationManager) {
        LocationManager.getLastLocation = MockLocationManager.getLastLocation;
        LocationManager.requestLocationUpdates = MockLocationManager.requestLocationUpdates;
        LocationManager.removeLocationUpdates = MockLocationManager.removeLocationUpdates;
        LocationManager.shouldSkipChecks = MockLocationManager.shouldSkipChecks;
    };
    return LocationManager;
}());
exports.LocationManager = LocationManager;
var Location = (function (_super) {
    __extends(Location, _super);
    function Location(androidLocation) {
        var _this = _super.call(this) || this;
        if (androidLocation) {
            _this.android = androidLocation;
            _this.latitude = androidLocation.getLatitude();
            _this.longitude = androidLocation.getLongitude();
            _this.altitude = androidLocation.getAltitude();
            _this.horizontalAccuracy = androidLocation.getAccuracy();
            _this.verticalAccuracy = androidLocation.getAccuracy();
            _this.speed = androidLocation.getSpeed();
            _this.direction = androidLocation.getBearing();
            _this.timestamp = new Date(androidLocation.getTime());
        }
        return _this;
    }
    return Location;
}(geolocation_common_1.LocationBase));
exports.Location = Location;
function setCustomLocationManager(MockLocationManager) {
    LocationManager.setMockLocationManager(MockLocationManager);
}
exports.setCustomLocationManager = setCustomLocationManager;


/***/ }),

/***/ 234:
/*!**********************************************************************!*\
  !*** ../node_modules/nativescript-geolocation/geolocation.common.js ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LocationBase = (function () {
    function LocationBase() {
    }
    return LocationBase;
}());
exports.LocationBase = LocationBase;
exports.defaultGetLocationTimeout = 5 * 60 * 1000;
exports.minRangeUpdate = 0.1;
exports.minTimeUpdate = 1 * 60 * 1000;
exports.fastestTimeUpdate = 5 * 1000;


/***/ }),

/***/ 235:
/*!***********************************************************************!*\
  !*** ../node_modules/nativescript-permissions/permissions.android.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**********************************************************************************
 * (c) 2016, Master Technology
 * Licensed under the MIT license or contact me for a Support or Commercial License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo
 * Version 1.1.3                                      Nathan@master-technology.com
 *********************************************************************************/


/* jshint camelcase: false */
/* global UIDevice, UIDeviceOrientation, getElementsByTagName, android, Promise, java, require, exports */

var application = __webpack_require__(/*! application */ 3);

//noinspection JSUnresolvedVariable,JSUnresolvedFunction
if (typeof application.AndroidApplication.activityRequestPermissionsEvent === 'undefined') {
	throw new Error("You must be using at least version 2.0 of the TNS runtime and core-modules!");
}

// Variables to track any pending promises
var pendingPromises = {}, promiseId = 3000;


//noinspection JSUnresolvedVariable,JSUnresolvedFunction
/**
 * This handles the results of getting the permissions!
 */
application.android.on(application.AndroidApplication.activityRequestPermissionsEvent, function (args) {

	// get current promise set
	//noinspection JSUnresolvedVariable
	var promises = pendingPromises[args.requestCode];

	// We have either gotten a promise from somewhere else or a bug has occurred and android has called us twice
	// In either case we will ignore it...
	if (!promises || typeof promises.granted !== 'function') {
		return;
	}

	// Delete it, since we no longer need to track it
	//noinspection JSUnresolvedVariable
	delete pendingPromises[args.requestCode];

	var trackingResults = promises.results;

	//noinspection JSUnresolvedVariable
	var length = args.permissions.length;
	for (var i = 0; i < length; i++) {
		// Convert back to JS String
		//noinspection JSUnresolvedVariable
		var name = args.permissions[i].toString();

		//noinspection RedundantIfStatementJS,JSUnresolvedVariable,JSUnresolvedFunction
		if (args.grantResults[i] === android.content.pm.PackageManager.PERMISSION_GRANTED) {
			trackingResults[name] = true;
		} else {
			trackingResults[name] = false;
		}
	}

	// Any Failures
	var failureCount = 0;
	for (var key in trackingResults) {
		if (!trackingResults.hasOwnProperty(key)) continue;
		if (trackingResults[key] === false) failureCount++;
	}

	if (failureCount === 0) {
		promises.granted(trackingResults);
	} else {
		promises.failed(trackingResults);
	}

});


exports.hasPermission = hasPermission;
exports.requestPermission = request;
exports.requestPermissions = request;


/**
 * Checks to see if v4 is installed and has the proper calls with it
 * @returns {boolean}
 */
function hasSupportVersion4() {
	//noinspection JSUnresolvedVariable
	if (!android.support || !android.support.v4 || !android.support.v4.content || !android.support.v4.content.ContextCompat || !android.support.v4.content.ContextCompat.checkSelfPermission) {
		console.log("No v4 support");
		return false;
	}
	return true;
}


/**
 *
 * @param perm
 * @returns {boolean}
 */
function hasPermission(perm) {
	// If we don't have support v4 loaded; then we can't run any checks and have to assume
	// that they have put the permission in the manifest and everything is good to go
	if (!hasSupportVersion4()) return true;

	// Check for permission
	// Interesting, this actually works on API less than 23 and will return false if the manifest permission was forgotten...
	//noinspection JSUnresolvedVariable,JSUnresolvedFunction
	var hasPermission = android.content.pm.PackageManager.PERMISSION_GRANTED ==
		android.support.v4.content.ContextCompat.checkSelfPermission(getContext(), perm);

	return (hasPermission);
}

function getContext() {
	//noinspection JSUnresolvedVariable,JSUnresolvedFunction
	var ctx = java.lang.Class.forName("android.app.AppGlobals").getMethod("getInitialApplication", null).invoke(null, null);
	if (ctx) { return ctx; }

	//noinspection JSUnresolvedVariable,JSUnresolvedFunction
	return java.lang.Class.forName("android.app.ActivityThread").getMethod("currentApplication", null).invoke(null, null);
}


function request(inPerms, explanation) {
	var perms;
	if (Array.isArray(inPerms)) {
		perms = inPerms;
	} else {
		perms = [inPerms];
	}

	return new Promise(function (granted, failed) {
		var totalFailures = 0, totalSuccesses = 0;
		var totalCount = perms.length;
		var permTracking = [], permResults = {};
		for (var i = 0; i < totalCount; i++) {
			// Check if we already have permissions, then we can grant automatically
			if (hasPermission(perms[i])) {
				permTracking[i] = true;
				permResults[perms[i]] = true;
				totalSuccesses++;
			} else {
				permTracking[i] = false;
				permResults[perms[i]] = false;
				totalFailures++;
			}
		}

		// If we have all perms, we don't need to continue
		if (totalSuccesses === totalCount) {
			granted(permResults);
			return;
		}

		//noinspection JSUnresolvedVariable
		if (totalFailures > 0 && android.os.Build.VERSION.SDK_INT < 23) {
			// If we are on API < 23 and we get a false back, then this means they forgot to put a manifest permission in...
			failed(permResults);
			return;
		}

		handleRequest(granted, failed, perms, explanation, permResults, permTracking);
	});
}

function handleRequest(granted, failed, perms, explanation, permResults, permTracking) {
	//noinspection JSUnresolvedVariable
	var activity = application.android.foregroundActivity || application.android.startActivity;
	if (activity == null) {
		// Throw this off into the future since an activity is not available....
		setTimeout(function() {
			handleRequest(granted, failed, perms, explanation, permResults, permTracking);
		}, 250);
		return;
	}

	var totalCount = perms.length;
	// Check if we need to show a explanation , if so show it only once.
	for (var i = 0; i < totalCount; i++) {
		if (permTracking[i] === false) {
			//noinspection JSUnresolvedVariable,JSUnresolvedFunction
			if (android.support.v4.app.ActivityCompat.shouldShowRequestPermissionRationale(activity, perms[i])) {
				if (typeof explanation === "function") {
					explanation();
				} else if (explanation && explanation.length) {
					//noinspection JSUnresolvedVariable,JSUnresolvedFunction
					var toast = android.widget.Toast.makeText(getContext(), explanation, android.widget.Toast.LENGTH_LONG);
					//noinspection JSUnresolvedFunction
					toast.setGravity((49), 0, 0);
					toast.show();
				}

				// We don't need to show the explanation more than one time, if we even need to at all
				break;
			}
		}
	}

	// Build list of Perms we actually need to request
	var requestPerms = [];
	for (i = 0; i < totalCount; i++) {
		if (permTracking[i] === false) {
			requestPerms.push(perms[i]);
		}
	}

	// Ask for permissions
	promiseId++;
	pendingPromises[promiseId] = {granted: granted, failed: failed, results: permResults};

	//noinspection JSUnresolvedVariable,JSUnresolvedFunction
	android.support.v4.app.ActivityCompat.requestPermissions(activity, requestPerms, promiseId);

}


/***/ }),

/***/ 236:
/*!*******************************************************************!*\
  !*** ../node_modules/nativescript-couchbase/couchbase.android.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils = __webpack_require__(/*! utils/utils */ 8);
var Couchbase = (function () {
    function Couchbase(databaseName) {
        this.context = utils.ad.getApplicationContext();
        try {
            this.manager = new com.couchbase.lite.Manager(new com.couchbase.lite.android.AndroidContext(this.context), null);
            this.database = this.manager.getDatabase(databaseName);
        }
        catch (exception) {
            console.error("MANAGER ERROR:", exception.message);
        }
    }
    Couchbase.prototype.createDocument = function (data, documentId) {
        var document = documentId == null ? this.database.createDocument() : this.database.getDocument(documentId);
        var documentId = document.getId();
        try {
            document.putProperties(this.objectToMap(data));
        }
        catch (exception) {
            console.error("DOCUMENT ERROR:", exception.message);
        }
        return documentId;
    };
    Couchbase.prototype.getDocument = function (documentId) {
        var document = this.database.getDocument(documentId);
        return JSON.parse(this.mapToJson(document.getProperties()));
    };
    Couchbase.prototype.updateDocument = function (documentId, data) {
        var document = this.database.getDocument(documentId);
        var temp = JSON.parse(this.mapToJson(document.getProperties()));
        data._id = temp._id;
        data._rev = temp._rev;
        try {
            document.putProperties(this.objectToMap(data));
        }
        catch (exception) {
            console.error("DOCUMENT ERROR", exception.message);
        }
    };
    Couchbase.prototype.deleteDocument = function (documentId) {
        var document = this.database.getDocument(documentId);
        try {
            document.delete();
        }
        catch (exception) {
            console.error("DOCUMENT ERROR", exception.message);
        }
        return document.isDeleted();
    };
    Couchbase.prototype.destroyDatabase = function () {
        try {
            this.database.delete();
        }
        catch (exception) {
            console.error("DESTROY", exception.message);
        }
    };
    Couchbase.prototype.createView = function (viewName, viewRevision, callback) {
        var view = this.database.getView(viewName);
        var self = this;
        view.setMap(new com.couchbase.lite.Mapper({
            map: function (document, emitter) {
                var e = new Emitter(emitter);
                callback(JSON.parse(self.mapToJson(document)), e);
            }
        }), viewRevision);
    };
    Couchbase.prototype.executeQuery = function (viewName, options) {
        var query = this.database.getView(viewName).createQuery();
        if (options != null) {
            if (options.descending) {
                query.setDescending(options.descending);
            }
            if (options.limit) {
                query.setLimit(options.limit);
            }
            if (options.skip) {
                query.setSkip(options.skip);
            }
            if (options.startKey) {
                query.setStartKey(options.startKey);
            }
            if (options.endKey) {
                query.setEndKey(options.endKey);
            }
        }
        var result = query.run();
        var parsedResult = [];
        while (result.hasNext()) {
            var row = result.next();
            parsedResult.push(this.mapToObject(row.getValue()));
        }
        return parsedResult;
    };
    Couchbase.prototype.createPullReplication = function (remoteUrl) {
        var replication;
        try {
            replication = this.database.createPullReplication(new java.net.URL(remoteUrl));
        }
        catch (exception) {
            console.error("PULL ERROR", exception.message);
        }
        return new Replicator(replication);
    };
    Couchbase.prototype.createPushReplication = function (remoteUrl) {
        var replication;
        try {
            replication = this.database.createPushReplication(new java.net.URL(remoteUrl));
        }
        catch (exception) {
            console.error("PUSH ERROR", exception.message);
        }
        return new Replicator(replication);
    };
    Couchbase.prototype.addDatabaseChangeListener = function (callback) {
        try {
            this.database.addChangeListener(new com.couchbase.lite.Database.ChangeListener({
                changed: function (event) {
                    var changes = event.getChanges().toArray();
                    callback(changes);
                }
            }));
        }
        catch (exception) {
            console.error("DATABASE LISTENER ERROR", exception.message);
        }
    };
    Couchbase.prototype.objectToMap = function (data) {
        var gson = (new com.google.gson.GsonBuilder()).create();
        return gson.fromJson(JSON.stringify(data), (new java.util.HashMap).getClass());
    };
    Couchbase.prototype.mapToJson = function (data) {
        var gson = (new com.google.gson.GsonBuilder()).create();
        return gson.toJson(data);
    };
    Couchbase.prototype.mapToObject = function (data) {
        var gson = (new com.google.gson.GsonBuilder()).create();
        return JSON.parse(gson.toJson(data));
    };
    return Couchbase;
}());
exports.Couchbase = Couchbase;
var Replicator = (function () {
    function Replicator(replicator) {
        this.replicator = replicator;
    }
    Replicator.prototype.start = function () {
        this.replicator.start();
    };
    Replicator.prototype.stop = function () {
        this.replicator.stop();
    };
    Replicator.prototype.isRunning = function () {
        return this.replicator.isRunning;
    };
    Replicator.prototype.setContinuous = function (isContinuous) {
        this.replicator.setContinuous(isContinuous);
    };
    Replicator.prototype.setCookie = function (name, value, path, expirationDate, secure, httpOnly) {
        var date = new java.util.Date(expirationDate.getTime());
        this.replicator.setCookie(name, value, path, date, secure, httpOnly);
    };
    ;
    Replicator.prototype.deleteCookie = function (name) {
        this.replicator.deleteCookieNamed(name);
    };
    return Replicator;
}());
exports.Replicator = Replicator;
var Emitter = (function () {
    function Emitter(emitter) {
        this.emitter = emitter;
    }
    Emitter.prototype.emit = function (key, value) {
        if (typeof value === "object") {
            var gson = (new com.google.gson.GsonBuilder()).create();
            this.emitter.emit(key, gson.fromJson(JSON.stringify(value), (new java.util.HashMap).getClass()));
        }
        else {
            this.emitter.emit(key, value);
        }
    };
    return Emitter;
}());
exports.Emitter = Emitter;


/***/ }),

/***/ 237:
/*!***********************************************************************************!*\
  !*** ../node_modules/nativescript-angular/directives/list-view-comp.ngfactory.ts ***!
  \***********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! @angular/core */ 1);
var i1 = __webpack_require__(/*! nativescript-angular/directives/list-view-comp */ 48);
var styles_ListViewComponent = [];
exports.RenderType_ListViewComponent = i0.ɵcrt({ encapsulation: 2,
    styles: styles_ListViewComponent, data: {} });
function View_ListViewComponent_0(_l) {
    return i0.ɵvid(2, [i0.ɵqud(402653184, 1, { loader: 0 }), (_l()(), i0.ɵted(-1, null, ['\n        '])), (_l()(), i0.ɵeld(2, 0, null, null, 3, 'DetachedContainer', [], null, null, null, null, null)),
        (_l()(), i0.ɵted(-1, null, ['\n            '])), (_l()(), i0.ɵeld(4, 16777216, [[1, 3], ['loader', 1]], null, 0, 'Placeholder', [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ['\n        ']))], null, null);
}
exports.View_ListViewComponent_0 = View_ListViewComponent_0;
function View_ListViewComponent_Host_0(_l) {
    return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, 'ListView', [], null, null, null, View_ListViewComponent_0, exports.RenderType_ListViewComponent)),
        i0.ɵdid(1, 1490944, null, 1, i1.ListViewComponent, [i0.ElementRef, i0.IterableDiffers,
            i0.ChangeDetectorRef], null, null), i0.ɵqud(335544320, 1, { itemTemplateQuery: 0 })], function (_ck, _v) {
        _ck(_v, 1, 0);
    }, null);
}
exports.View_ListViewComponent_Host_0 = View_ListViewComponent_Host_0;
exports.ListViewComponentNgFactory = i0.ɵccf('ListView', i1.ListViewComponent, View_ListViewComponent_Host_0, { items: 'items' }, { setupItemView: 'setupItemView' }, []);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL2hvbWUvamFncHJlZXQvRGVza3RvcC9OYXRpdmUvR2VvTG9jYXRpb24vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvbGlzdC12aWV3LWNvbXAubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vaG9tZS9qYWdwcmVldC9EZXNrdG9wL05hdGl2ZS9HZW9Mb2NhdGlvbi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9saXN0LXZpZXctY29tcC5kLnRzIiwibmc6Ly8vaG9tZS9qYWdwcmVldC9EZXNrdG9wL05hdGl2ZS9HZW9Mb2NhdGlvbi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9saXN0LXZpZXctY29tcC5kLnRzLkxpc3RWaWV3Q29tcG9uZW50Lmh0bWwiLCJuZzovLy9ob21lL2phZ3ByZWV0L0Rlc2t0b3AvTmF0aXZlL0dlb0xvY2F0aW9uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2xpc3Qtdmlldy1jb21wLmQudHMuTGlzdFZpZXdDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCJcbiAgICAgICAgPERldGFjaGVkQ29udGFpbmVyPlxuICAgICAgICAgICAgPFBsYWNlaG9sZGVyICNsb2FkZXI+PC9QbGFjZWhvbGRlcj5cbiAgICAgICAgPC9EZXRhY2hlZENvbnRhaW5lcj4iLCI8TGlzdFZpZXc+PC9MaXN0Vmlldz4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztvRENBQTtNQUFBLGlCQUNRO01BQUE7TUFBbUIsc0RBQ2Y7VUFBQTtVQUFBLDBEQUFtQztVQUFBOzs7b0JDRi9DO01BQUE7YUFBQTs4QkFBQTs7UUFBQTs7Ozs7In0=
//# sourceMappingURL=list-view-comp.ngfactory.js.map

/***/ }),

/***/ 238:
/*!************************************!*\
  !*** ./app.component.ngfactory.ts ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! @angular/core */ 1);
var i1 = __webpack_require__(/*! nativescript-angular/router/page-router-outlet */ 33);
var i2 = __webpack_require__(/*! @angular/router */ 18);
var i3 = __webpack_require__(/*! nativescript-angular/router/ns-location-strategy */ 25);
var i4 = __webpack_require__(/*! tns-core-modules/ui/frame/frame */ 7);
var i5 = __webpack_require__(/*! nativescript-angular/platform-providers */ 20);
var i6 = __webpack_require__(/*! nativescript-angular/router/ns-route-reuse-strategy */ 50);
var i7 = __webpack_require__(/*! ./app.component */ 127);
var styles_AppComponent = [];
exports.RenderType_AppComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_AppComponent,
    data: {} });
function View_AppComponent_0(_l) {
    return i0.ɵvid(0, [(_l()(), i0.ɵted(-1, null, ['\n'])), (_l()(), i0.ɵeld(1, 16777216, null, null, 1, 'page-router-outlet', [], null, null, null, null, null)), i0.ɵdid(2, 212992, null, 0, i1.PageRouterOutlet, [i2.ChildrenOutletContexts, i0.ViewContainerRef, [8, null],
            i3.NSLocationStrategy, i0.ComponentFactoryResolver, i0.ComponentFactoryResolver,
            i4.Frame, i0.ChangeDetectorRef, i5.DEVICE, i5.PAGE_FACTORY, i6.NSRouteReuseStrategy], null, null), (_l()(), i0.ɵted(-1, null, ['\n']))], function (_ck, _v) {
        _ck(_v, 2, 0);
    }, null);
}
exports.View_AppComponent_0 = View_AppComponent_0;
function View_AppComponent_Host_0(_l) {
    return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, 'ns-app', [], null, null, null, View_AppComponent_0, exports.RenderType_AppComponent)),
        i0.ɵdid(1, 49152, null, 0, i7.AppComponent, [], null, null)], null, null);
}
exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;
exports.AppComponentNgFactory = i0.ɵccf('ns-app', i7.AppComponent, View_AppComponent_Host_0, {}, {}, []);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL2hvbWUvamFncHJlZXQvRGVza3RvcC9OYXRpdmUvR2VvTG9jYXRpb24vYXBwL2FwcC5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vaG9tZS9qYWdwcmVldC9EZXNrdG9wL05hdGl2ZS9HZW9Mb2NhdGlvbi9hcHAvYXBwLmNvbXBvbmVudC50cyIsIm5nOi8vL2hvbWUvamFncHJlZXQvRGVza3RvcC9OYXRpdmUvR2VvTG9jYXRpb24vYXBwL2FwcC5jb21wb25lbnQuaHRtbCIsIm5nOi8vL2hvbWUvamFncHJlZXQvRGVza3RvcC9OYXRpdmUvR2VvTG9jYXRpb24vYXBwL2FwcC5jb21wb25lbnQudHMuQXBwQ29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiPCEtLSBodHRwczovL2RvY3MubmF0aXZlc2NyaXB0Lm9yZy9hbmd1bGFyL2NvcmUtY29uY2VwdHMvYW5ndWxhci1uYXZpZ2F0aW9uLmh0bWwjcGFnZS1yb3V0ZXItb3V0bGV0IC0tPlxuPHBhZ2Utcm91dGVyLW91dGxldD48L3BhZ2Utcm91dGVyLW91dGxldD5cbiIsIjxucy1hcHA+PC9ucy1hcHA+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDQXVHLDBDQUN2RztNQUFBO01BQUEsaUVBQUE7TUFBQTs7eUZBQUE7TUFBQSw2QkFBeUM7O0lBQXpDOzs7O29CQ0RBO01BQUE7YUFBQTtVQUFBOzs7In0=
//# sourceMappingURL=app.component.ngfactory.js.map

/***/ }),

/***/ 254:
/*!*******************************************************************!*\
  !*** ../node_modules/nativescript-angular/nativescript.module.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! tns-core-modules/globals */ 34);
// Require application early to work around a circular import
__webpack_require__(/*! tns-core-modules/application */ 3);
__webpack_require__(/*! ./zone-js/dist/zone-nativescript */ 106);
__webpack_require__(/*! reflect-metadata */ 62);
__webpack_require__(/*! ./polyfills/array */ 108);
__webpack_require__(/*! ./polyfills/console */ 109);
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var common_1 = __webpack_require__(/*! ./common */ 74);
var renderer_1 = __webpack_require__(/*! ./renderer */ 158);
var detached_loader_1 = __webpack_require__(/*! ./common/detached-loader */ 45);
function errorHandlerFactory() {
    return new core_1.ErrorHandler();
}
exports.errorHandlerFactory = errorHandlerFactory;
var NativeScriptModule = /** @class */ (function () {
    function NativeScriptModule() {
    }
    NativeScriptModule = __decorate([
        core_1.NgModule({
            declarations: [
                detached_loader_1.DetachedLoader,
            ],
            providers: [
                renderer_1.NativeScriptRendererFactory,
                core_1.SystemJsNgModuleLoader,
                { provide: core_1.ErrorHandler, useFactory: errorHandlerFactory },
                { provide: core_1.RendererFactory2, useExisting: renderer_1.NativeScriptRendererFactory },
            ],
            entryComponents: [
                detached_loader_1.DetachedLoader,
            ],
            imports: [
                core_1.ApplicationModule,
                common_1.NativeScriptCommonModule,
            ],
            exports: [
                core_1.ApplicationModule,
                common_1.NativeScriptCommonModule,
                detached_loader_1.DetachedLoader,
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], NativeScriptModule);
    return NativeScriptModule;
}());
exports.NativeScriptModule = NativeScriptModule;
//# sourceMappingURL=nativescript.module.js.map

/***/ }),

/***/ 259:
/*!************************!*\
  !*** ./app.routing.ts ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = __webpack_require__(/*! ./home/home.component */ 72);
var routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: home_component_1.HomeComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ 72:
/*!********************************!*\
  !*** ./home/home.component.ts ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var Geolocation = __webpack_require__(/*! nativescript-geolocation */ 233);
var nativescript_couchbase_1 = __webpack_require__(/*! nativescript-couchbase */ 236);
var enums_1 = __webpack_require__(/*! ui/enums */ 36);
var HomeComponent = (function () {
    function HomeComponent(zone) {
        this.zone = zone;
        this.dbDataArray = [];
        this.distance = 0;
        this.latitude = 0;
        this.longitude = 0;
        this.db = new nativescript_couchbase_1.Couchbase("testdb");
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.updateLocation();
    };
    //  ngOnChanges(){
    // 	 alert("Hooray");
    //  }
    HomeComponent.prototype.getLocation = function () {
        return new Promise(function (resolve, reject) {
            Geolocation.enableLocationRequest().then(function () {
                Geolocation.getCurrentLocation({
                    timeout: 10000,
                    desiredAccuracy: enums_1.Accuracy.high
                })
                    .then(function (location) {
                    resolve(location);
                }).catch(function (error) {
                    reject(error);
                });
            });
        });
    };
    HomeComponent.prototype.updateLocation = function () {
        var _this = this;
        this.getLocation().then(function (result) {
            _this.latitude = result.latitude;
            _this.longitude = result.longitude;
            _this.startWatchingLocation();
        }, function (error) {
            console.error(error);
        });
    };
    HomeComponent.prototype.startWatchingLocation = function () {
        var _this = this;
        this.watchId = Geolocation.watchLocation(function (location) {
            if (location) {
                _this.zone.run(function () {
                    _this.latitude = location.latitude;
                    _this.longitude = location.longitude;
                    var doc = _this.db.createDocument({
                        "timestamp": location.timestamp,
                        "Lat": _this.latitude,
                        "Long": _this.longitude
                    });
                    _this.showDbData(doc, location);
                });
            }
        }, function (error) {
            console.error(error);
        }, { updateDistance: 1, minimumUpdateTime: 1000 });
    };
    HomeComponent.prototype.showDbData = function (doc, location) {
        this.dbDataArray.push(this.db.getDocument(doc));
    };
    HomeComponent.prototype.stopWatchingLocation = function () {
        if (this.watchId) {
            Geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    };
    HomeComponent.ctorParameters = function () { return [{ type: core_1.NgZone }]; };
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map

/***/ })

},[164]);