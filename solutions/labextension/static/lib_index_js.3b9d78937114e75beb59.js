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



let maps = new Map();
function create_remove_exercise(notebook, tracker, metadata) {
    var _a, _b;
    var lcells = notebook.selectedCells; // Cell<ICellModel>[]
    if (lcells.length < 1) {
        alert('Solution extension:  \nPlease select some cells...');
        return;
    }
    if (((_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content) === undefined) { // Need to ensure a notebook is opened
        alert('Solution extension:  \nPlease open a notebook...');
        return;
    }
    if (metadata.checkApplied('first')) { // If removing the first of an exercise, remove entire exercise
        //~ 
        //remove_element(cell); // 
        metadata.removeTag('first');
        // metadata.removeTag('hidden');
        // For each saved cell, show the cell again. 
        (_b = maps.get(lcells[0].id)) === null || _b === void 0 ? void 0 : _b.forEach(cell => {
            cell.show();
        });
        console.log('Removed Exercise');
        // NotebookActions.selectBelow(tracker.currentWidget?.content); // select the next cell and check to see if it is part of the same exercise
        // while (notebook.activeCell !== null && metadata.checkApplied('hidden') && !metadata.checkApplied('first')) {
        //   metadata.removeTag('hidden');
        //   metadata.removeClass('hidden');
        //   notebook.activeCell.show();
        //   console.log('Found hidden cell');
        //   NotebookActions.selectBelow(tracker.currentWidget?.content);
        // }
    }
    else {
        //~ Create a new exercise
        metadata.addTag('first'); // Indicates the first cell of an exercise
        // metadata.addTag('hidden'); // Indicates a hidden (exercise) cell
        // Hide all but the first cell of the exercise
        // `maps` is needed because hide() makes the cell invisible to the parent cell
        for (var i = 1; i < lcells.length; i++) {
            lcells[i].hide();
        }
        // Store a reference to the cells in `maps`. 
        maps.set(lcells[0].id, lcells);
        console.log('Added Exercise');
        // for (var i = 1; i < lcells.length; i++) {
        //   NotebookActions.selectBelow(tracker.currentWidget?.content);
        //   metadata.addTag('hidden');
        //   // metadata.addClass('hidden');
        //   if (notebook.activeCell !== null) notebook.activeCell.hide();
        //   console.log('Hid a cell');
        // }
    }
}
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
//# sourceMappingURL=lib_index_js.3b9d78937114e75beb59.js.map