import { ThemeIcon, Uri } from "vscode";
import { File } from "../../types/file";
import { BaseTreeItem } from "./baseTreeItem";

export class FileTreeItem extends BaseTreeItem {
  constructor(
    public gistId: string,
    public key: string,
    public file: File,
  ) {
    super(`${gistId}-${key}`, file.filename, ThemeIcon.File);
    this.resourceUri = Uri.parse(file.raw_url, true);
  }
}
