import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { INotebookTools, INotebookTracker } from '@jupyterlab/notebook';
import { TagTool } from '@jupyterlab/celltags';
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
        //~ If `first` is aready applied, then remove the exercise being selected
        //remove_element(cell);
        metadata.removeTag('first');
        // metadata.removeTag('hidden');
        // For each saved cell, show the cell again. 
        (_b = maps.get(lcells[0].id)) === null || _b === void 0 ? void 0 : _b.forEach(cell => {
            cell.show();
        });
        console.log('Removed Exercise');
        // N-otebookActions.selectBelow(tracker.currentWidget?.content); // select the next cell and check to see if it is part of the same exercise
        // while (notebook.activeCell !== null && metadata.checkApplied('hidden') && !metadata.checkApplied('first')) {
        //   metadata.removeTag('hidden');
        //   metadata.removeClass('hidden');
        //   n-otebook.activeCell.show();
        //   console.log('Found hidden cell');
        //   N-otebookActions.selectBelow(tracker.currentWidget?.content);
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
        //   N-otebookActions.selectBelow(tracker.currentWidget?.content);
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
    var tool = new TagTool(tracker, app); // metadata tool
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
    requires: [INotebookTools, INotebookTracker],
    optional: [ISettingRegistry],
    activate: init
};
export default plugin;
