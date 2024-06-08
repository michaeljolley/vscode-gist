import * as vscode from "vscode";
import { BaseTreeViewDataProvider } from "./baseTreeViewDataProvider";
import Logger from "../logger";
import { LogLevel } from "../constants";
import { getSession } from "../authentication/authentication";
import { getClient } from "../api/api";
import { GistTreeItem } from "./trees/gistTreeItem";
import { BaseTreeItem } from "./trees/baseTreeItem";
import { FileTreeItem } from "./trees/fileTreeItem";
import { Gist } from "../types/gist";

export class GistViewDataProvider extends BaseTreeViewDataProvider {
  public async getChildren(element?: BaseTreeItem): Promise<vscode.TreeItem[]> {
    if (element) {
      if (element.contextValue === "gist") {
        const files = (element as GistTreeItem).gist.files;

        return Object.entries(files).map(([key, value]) => {
          return new FileTreeItem(element.id, key, value);
        });
      }
      return [];
    }

    const gists = await listGists();

    return gists.map((gist: any) => {
      return new GistTreeItem(gist);
    });
  }
}

async function listGists(): Promise<Gist[]> {
  const session = await getSession(false);
  if (session) {
    const client = getClient(session.accessToken);
    const ghResponse = await client.gists.list();
    return (ghResponse.data as Gist[]).sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    );
  }
  return [];
}
