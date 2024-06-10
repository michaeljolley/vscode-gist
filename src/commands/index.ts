import { commands, ExtensionContext, ViewColumn } from "vscode";
import { GistViewDataProvider } from "../views/gistViewDataProvider";
import { openGist } from "./openGist";
import { refreshGists } from "./refreshGists";

export function registerCommands(
  context: ExtensionContext,
  dataProvider: GistViewDataProvider,
) {
  const _openGist = commands.registerCommand("gist.openGist", openGist);
  const _refreshGists = commands.registerCommand(
    "gist.refreshGists",
    refreshGists(dataProvider),
  );

  context.subscriptions.push(...[_openGist, _refreshGists]);
}
