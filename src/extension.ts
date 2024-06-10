import * as vscode from "vscode";
import Logger from "./logger";

import { LogLevel } from "./constants";
import { registerCommands } from "./commands";
import { GistViewDataProvider } from "./views/gistViewDataProvider";
import { registerViews } from "./views";

export async function activate(context: vscode.ExtensionContext) {
  Logger.log(LogLevel.info, "Initializing GitHub Gist extension...");

  /**
   * Register tree view data providers
   */
  const gistViewDataProvider = new GistViewDataProvider();

  /**
   * Register commands & views
   */
  registerCommands(context, gistViewDataProvider);

  /**
   * Register tree views within activity bar
   */
  registerViews(context, gistViewDataProvider);

  Logger.log(LogLevel.info, "...initialized.");
}

/**
 * Clean up the extension resources.
 */
export async function deactivate() {}
