import * as vscode from "vscode";
import { GistViewDataProvider } from "./gistViewDataProvider";

export function registerViews(
  context: vscode.ExtensionContext,
  dataProvider: GistViewDataProvider,
) {
  const gistTreeView = vscode.window.createTreeView("gistView", {
    treeDataProvider: dataProvider,
    showCollapseAll: false,
  });
  gistTreeView.title = "";

  context.subscriptions.push(gistTreeView);
}
