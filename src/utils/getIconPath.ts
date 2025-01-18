import * as path from "path";
import { IconPath, Uri } from "vscode";

export function getIconPath(iconName: string): IconPath {
  return {
    light: Uri.file(
      path.join(
        __filename,
        "..",
        "..",
        "..",
        "..",
        "resources",
        "icons",
        "light",
        `${iconName}.svg`,
      ),
    ),
    dark: Uri.file(
      path.join(
        __filename,
        "..",
        "..",
        "..",
        "..",
        "resources",
        "icons",
        "dark",
        `${iconName}.svg`,
      ),
    ),
  };
}
