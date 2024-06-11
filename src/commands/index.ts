import { commands, ExtensionContext } from "vscode";
import { GistViewDataProvider } from "../views/gistViewDataProvider";
import { openGist } from "./openGist";
import { refreshGists } from "./refreshGists";
import { Commands } from "../constants";

export function registerCommands(
  context: ExtensionContext,
  dataProvider: GistViewDataProvider,
) {
  const _openGist = commands.registerCommand(Commands.openGist, openGist);
  const _refreshGists = commands.registerCommand(
    Commands.refreshGists,
    refreshGists(dataProvider),
  );

  context.subscriptions.push(...[_openGist, _refreshGists]);
}
