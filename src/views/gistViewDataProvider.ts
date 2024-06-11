import { Event, EventEmitter, ProgressLocation, TreeDataProvider, window } from "vscode";
import { getGist, loadGists } from "../api/api";
import { GistTreeItem } from "./trees/gistTreeItem";
import { BaseTreeItem } from "./trees/baseTreeItem";
import { FileTreeItem } from "./trees/fileTreeItem";

export class GistViewDataProvider implements TreeDataProvider<BaseTreeItem> {
  private _onDidChangeTreeData: EventEmitter<
    BaseTreeItem | undefined | null | void
  > = new EventEmitter<BaseTreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: Event<BaseTreeItem | undefined | null | void> =
    this._onDidChangeTreeData.event;

  public async getChildren(element?: BaseTreeItem): Promise<BaseTreeItem[]> {
    if (element) {
      if (element.contextValue === "gist") {
        // Get the files from the gist
        let files: BaseTreeItem[] = [];

        await window.withProgress({
          location: ProgressLocation.SourceControl
        }, async (progress) => {
          progress.report({ message: "Fetching Gist files" });

          const gist = await getGist(element.id);

          if (!gist) {
            window.showErrorMessage("Failed to retrieve Gist from GitHub.");
            return [];
          }
  
          files = Object.entries(gist.files).map(([_, value]) => {
            return new FileTreeItem(element.id, value);
          });
        
        });

        return files;
      }
      return [];
    }

    const gists = await loadGists();

    return gists.map((gist: any) => {
      return new GistTreeItem(gist);
    });
  }

  public getTreeItem(element: BaseTreeItem): BaseTreeItem {
    return element;
  }

  public getParent(element?: BaseTreeItem): BaseTreeItem | undefined {
    if (element instanceof BaseTreeItem && element.parent) {
      return element.parent;
    }

    return undefined;
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}
