import { commands, window } from "vscode";
import { getGist } from "../api/api";
import { File } from "../types/file";

export async function openGist(gistId: string, file: File) {
  const gist = await getGist(gistId);
  if (!gist) {
    window.showErrorMessage(`Couldn't load ${file.filename}.`);
  }

  window.showInformationMessage(`I want to open ${file.filename}`);
}
