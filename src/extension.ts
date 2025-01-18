import * as vscode from "vscode";
import Logger from "./logger";

import { LogLevel } from "./constants";
import { GistViewDataProvider } from "./views/gistViewDataProvider";

export async function activate(context: vscode.ExtensionContext) {
  Logger.log(LogLevel.info, "Initializing GitHub Gist extension...");

  /**
   * Register commands & views
   */
  const gistViewDataProvider = new GistViewDataProvider();

  /**
   * Register tree views within activity bar
   */
  const gistTreeView = vscode.window.createTreeView("gistView", {
    treeDataProvider: gistViewDataProvider,
    showCollapseAll: false,
  });

  context.subscriptions.push(gistTreeView);

  Logger.log(LogLevel.info, "...initialized.");
}

/**
 * Clean up the extension resources.
 */
export async function deactivate() {}
