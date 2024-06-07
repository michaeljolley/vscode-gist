import { ThemeIcon, TreeItemCollapsibleState, Uri } from "vscode";
import { BaseTreeItem } from "./baseTreeItem";
import { Gist } from "../../types/gist";

export class GistTreeItem extends BaseTreeItem {
  constructor(public gist: Gist) {
    const label =
      gist.description || gist.files[Object.keys(gist.files)[0]].filename;

    super(gist.id, label, ThemeIcon.Folder, TreeItemCollapsibleState.Collapsed);

    const fileCount = Object.keys(gist.files).length;
    if (fileCount > 1) {
      this.description = gist.description
        ? `${fileCount} files`
        : `and ${fileCount} files`;
    }
    this.resourceUri = Uri.parse(gist.html_url, true);
  }
}
