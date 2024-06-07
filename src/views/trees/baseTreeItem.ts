import * as vscode from "vscode";
import { getIconPath } from "../../utils/getIconPath";

export class BaseTreeItem extends vscode.TreeItem {
  parent: BaseTreeItem | undefined;
  children: BaseTreeItem[] = [];

  constructor(
    public id: string,
    label: string,
    icon: string | vscode.ThemeIcon,
    collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.None,
    command?: vscode.Command,
    contextValue = "gist",
  ) {
    super(label, collapsibleState);
    this.command = command;
    this.contextValue = contextValue;

    if (icon instanceof vscode.ThemeIcon) {
      this.iconPath = icon;
    } else {
      this.iconPath = getIconPath(icon);
    }
  }

  makeCollapsible() {
    this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
  }
  expand() {
    this.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
  }
}
