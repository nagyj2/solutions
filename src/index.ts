import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import {
  INotebookTools,
  INotebookTracker,
  NotebookActions
} from '@jupyterlab/notebook';

import { TagTool } from '@jupyterlab/celltags';

import {
  Cell,
  ICellModel
} from '@jupyterlab/cells';

// New button
// https://stackoverflow.com/questions/63065310/how-do-i-create-a-jupyter-lab-extension-that-adds-a-custom-button-to-the-toolba
import { PanelLayout } from '@lumino/widgets';
import { ToolbarButton } from '@jupyterlab/apputils';

let maps = new Map<string, Cell<ICellModel>[]>();

function create_remove_exercise(notebook: INotebookTools, tracker: INotebookTracker, metadata: TagTool) {
  var lcells = notebook.selectedCells; // Cell<ICellModel>[]

  if (lcells.length < 1) {
    alert('Solution extension:  \nPlease select some cells...');
    return;
  }

  if (tracker.currentWidget?.content === undefined) { // Need to ensure a notebook is opened
    alert('Solution extension:  \nPlease open a notebook...');
    return;
  }

  if (metadata.checkApplied('first')) { // If removing the first of an exercise, remove entire exercise
    //~ If `first` is aready applied, then remove the exercise being selected
    //remove_element(cell);
    metadata.removeTag('first');
    // metadata.removeTag('hidden');
    
        // For each saved cell, show the cell again. 
        maps.get(lcells[0].id)?.forEach(cell => {
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

  } else {
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


function init(app: JupyterFrontEnd, notebook: INotebookTools, tracker: INotebookTracker, settingRegistry: ISettingRegistry | null) {
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

};

/**
 * Initialization data for the solutions extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'solutions:plugin',
  autoStart: true,
  requires: [INotebookTools, INotebookTracker],
  optional: [ISettingRegistry],
  activate: init
};

export default plugin;
