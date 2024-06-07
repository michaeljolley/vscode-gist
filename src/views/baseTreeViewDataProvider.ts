import { TreeDataProvider, TreeItem } from "vscode";
import { BaseTreeItem } from "./trees/baseTreeItem";

export class BaseTreeViewDataProvider implements TreeDataProvider<TreeItem> {
  private _treeItems: TreeItem[] = [];

  public async getChildren(element?: TreeItem): Promise<TreeItem[]> {
    if (!element) {
      return this._treeItems;
    }

    if (element instanceof BaseTreeItem) {
      return element.children;
    }

    return [];
  }

  public getTreeItem(element: TreeItem): TreeItem {
    return element;
  }

  public getParent(element?: TreeItem): TreeItem | undefined {
    if (element instanceof BaseTreeItem && element.parent) {
      return element.parent;
    }

    return undefined;
  }
}
