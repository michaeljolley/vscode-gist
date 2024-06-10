interface GistTextDocument {
  fileName: string;
  getText(range?: any): string;
}
