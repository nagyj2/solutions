"use strict";
(self["webpackChunksolutions"] = self["webpackChunksolutions"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__);

function init(app, settingRegistry) {
    console.log('JupyterLab extension solutions is activated!');
    if (settingRegistry) {
        settingRegistry
            .load(plugin.id)
            .then(settings => {
            console.log('solutions settings loaded:', settings.composite);
        })
            .catch(reason => {
            console.error('Failed to load settings for solutions.', reason);
        });
    }
}
/**
 * Initialization data for the solutions extension.
 */
const plugin = {
    id: 'solutions:plugin',
    autoStart: true,
    optional: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__.ISettingRegistry],
    activate: init
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.29bf142391be466cab6f.js.map