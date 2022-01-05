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
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_celltags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/celltags */ "webpack/sharing/consume/default/@jupyterlab/celltags");
/* harmony import */ var _jupyterlab_celltags__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_celltags__WEBPACK_IMPORTED_MODULE_2__);



function create_remove_exercise(notebook, tracker, metadata) {
    var _a, _b, _c, _d, _e, _f;
    var lcells = notebook.selectedCells; // Cell<ICellModel>[]
    if (lcells.length < 1) {
        alert('Solution extension:  \nPlease select some cells...');
        return;
    }
    if (metadata.checkApplied('first')) {
        //remove_element(cell)
        metadata.removeTag('first');
        metadata.removeTag('hidden');
        if (((_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content) !== undefined)
            _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.selectBelow((_b = tracker.currentWidget) === null || _b === void 0 ? void 0 : _b.content);
        while (notebook.activeCell !== null && metadata.checkApplied('hidden') && !metadata.checkApplied('first')) {
            if (((_c = tracker.currentWidget) === null || _c === void 0 ? void 0 : _c.content) !== undefined) {
                _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.selectBelow((_d = tracker.currentWidget) === null || _d === void 0 ? void 0 : _d.content);
                metadata.removeTag('hidden');
                console.log('removed hidden tag');
            }
        }
        console.log('Removed');
    }
    else {
        metadata.addTag('first');
        metadata.addTag('hidden');
        //add_element(cell)
        for (var i = 1; i < lcells.length; i++) {
            if (((_e = tracker.currentWidget) === null || _e === void 0 ? void 0 : _e.content) !== undefined) {
                _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.selectBelow((_f = tracker.currentWidget) === null || _f === void 0 ? void 0 : _f.content);
                metadata.addTag('hidden');
            }
        }
        console.log('Added');
    }
}
// function refresh_exercises(notebook: INotebookTools, metadata: TagTool) {
//   var in_exercise = false;
//   notebook.
// }
function init(app, notebook, tracker, settingRegistry) {
    console.log('JupyterLab extension solutions is activated!!');
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
    var tool = new _jupyterlab_celltags__WEBPACK_IMPORTED_MODULE_2__.TagTool(tracker, app); // metadata tool
    app.commands.addCommand("solutions:debug-log", {
        label: "Debug Log",
        execute: () => {
            create_remove_exercise(notebook, tracker, tool);
        }
    });
    app.commands.addKeyBinding({
        command: 'solutions:debug-log',
        args: {},
        keys: ['\\', '\\'],
        selector: '.jp-Notebook'
    });
}
;
/**
 * Initialization data for the solutions extension.
 */
const plugin = {
    id: 'solutions:plugin',
    autoStart: true,
    requires: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.INotebookTools, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.INotebookTracker],
    optional: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__.ISettingRegistry],
    activate: init
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.04f3fb21b7d7842cdc5e.js.map