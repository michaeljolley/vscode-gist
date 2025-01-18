import * as vscode from "vscode";

const settingsKey = "github-actions";
const DEFAULT_GITHUB_API = "https://api.github.com";

export function initConfiguration(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(async () => {}),
  );
}

function getConfiguration() {
  return vscode.workspace.getConfiguration();
}

function getSettingsKey(settingsPath: string): string {
  return `${settingsKey}.${settingsPath}`;
}

export function useEnterprise(): boolean {
  return getConfiguration().get<boolean>(
    getSettingsKey("use-enterprise"),
    false,
  );
}

export function getGitHubApiUri(): string {
  if (!useEnterprise()) {
    return DEFAULT_GITHUB_API;
  }
  const base = getConfiguration()
    .get<string>("github-enterprise.uri", DEFAULT_GITHUB_API)
    .replace(/\/$/, "");
  return base === DEFAULT_GITHUB_API ? base : `${base}/api/v3`;
}
