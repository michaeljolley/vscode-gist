import { ThemeIcon, Uri } from "vscode";
import { BaseTreeItem } from "./baseTreeItem";
import { File } from "../../types/file";
import { Commands } from "../../constants";

export class FileTreeItem extends BaseTreeItem {
  constructor(
    public gistId: string,
    public file: File,
  ) {
    super(file.raw_url, file.filename, ThemeIcon.File, undefined, {
      command: Commands.openGist,
      title: "Open File",
      arguments: [gistId, file],
    });
    this.resourceUri = Uri.parse(file.raw_url, true);
  }
}
