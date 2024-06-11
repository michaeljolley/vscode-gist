import * as fs from "fs";
import * as path from "path";
import * as tmp from "tmp";
import { TextDocument, TextEditor } from "vscode";
import { File } from "../types/file";

const TMP_DIRECTORY_PREFIX = "vscode_gist_ext";

const dirSync = (gistId: string): string => {
  const prefix = `${[TMP_DIRECTORY_PREFIX, gistId].join("_")}_`;
  const directory = tmp.dirSync({ prefix });
  return directory.name;
};

export const fileSync = (
  gistId: string,
  filename: string,
  content: string,
): string => {
  const directory = dirSync(gistId);
  const filePath = path.join(directory, filename);
  fs.writeFileSync(filePath, content);

  return filePath;
};

export const filesSync = (gistId: string, files: File[]): string[] => {
  const filePaths: string[] = [];

  const directory = dirSync(gistId);
  fs.rmSync(directory, { recursive: true, force: true });

  for (const file of files) {
    filePaths.push(fileSync(gistId, file.filename, file.content || ""));
  }

  return filePaths;
};

export const filesSynced = (gistId: string, files: File[]): boolean => {
  const directory = dirSync(gistId);
  const existingFiles = fs.readdirSync(directory);
  const gistFiles = files
    .map((m) => m.filename)
    .sort((a, b) => a.localeCompare(b));
  if (gistFiles.length !== existingFiles.length) {
    return false;
  }
  return gistFiles.toString() === existingFiles.toString();
};

export const extractTextDocumentDetails = (
  doc: GistTextDocument,
  editor?: TextEditor,
): {
  content: string;
  filename: string;
  id: string;
  language: string;
  path: string;
} => {
  const sep = path.sep === "\\" ? "\\\\" : path.sep;
  const regexp = new RegExp(
    `.*${TMP_DIRECTORY_PREFIX}_([^_]*)_[^${sep}]*${sep}(.*)`,
  );
  const [fullPath, id, filename] = doc.fileName.match(regexp) || ["", "", ""];
  const content = doc.getText();

  const { languageId } = editor ? editor.document : { languageId: "unknown" };

  return {
    content,
    filename,
    id,
    language: languageId,
    path: path.dirname(fullPath),
  };
};

export const getFileName = (doc: TextDocument, fallback?: string): string => {
  const filepath = doc.fileName;

  return path.basename(filepath) || fallback || "unknown.txt";
};
