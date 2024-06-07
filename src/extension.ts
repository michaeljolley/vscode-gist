import * as vscode from "vscode";
import Logger from "./logger";

import { Commands, LogLevel } from "./constants";
import { getClient } from "./api/api";
import { getSession } from "./authentication/authentication";

export async function activate(context: vscode.ExtensionContext) {
  Logger.log(LogLevel.info, "Initializing GitHub Gist extension...");

  const listGistsDisposable = vscode.commands.registerCommand(
    "vscode-gist.listGists",
    listGists,
  );
  context.subscriptions.push(listGistsDisposable);

  async function listGists() {
    Logger.log(LogLevel.info, "listGists");
    const session = await getSession(false);
    Logger.log(LogLevel.info, `session: ${session}`);
    if (session) {
      const client = getClient(session.accessToken);

      const gists = await client.gists.list();

      vscode.window.showInformationMessage(gists.data.length.toString());
    }
  }

  Logger.log(LogLevel.info, "...initialized.");
}

/**
 * Clean up the extension resources.
 */
export async function deactivate() {}
