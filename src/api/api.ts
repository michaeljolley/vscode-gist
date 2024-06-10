import { Octokit } from "@octokit/rest";
import { version } from "../../package.json";
import { getGitHubApiUri } from "../configuration/configuration";
import { getSession } from "../authentication/authentication";
import Logger from "../logger";
import { LogLevel } from "../constants";
import { Gist } from "../types/gist";

const userAgent = `VS Code GitHub Gist (${version})`;

export const getClient = async (): Promise<Octokit | undefined> => {
  const session = await getSession(false);
  if (!session) {
    return undefined;
  }

  return new Octokit({
    auth: session.accessToken,
    userAgent: userAgent,
    baseUrl: getGitHubApiUri(),
  });
};

export const loadGists = async (): Promise<Gist[]> => {
  const client = await getClient();
  if (!client) {
    return [];
  }

  try {
    const ghResponse = await client.request("GET /gists");
    if (ghResponse.status !== 200) {
      Logger.log(
        LogLevel.error,
        `Error retrieving gists: ${ghResponse.status}`,
      );
    }
    return (ghResponse.data as Gist[]).sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    );
  } catch (err) {
    Logger.log(LogLevel.error, `Error retrieving gists: ${err}`);
  }

  return [];
};

export const getGist = async (gistId: string): Promise<Gist | undefined> => {
  const client = await getClient();
  if (!client) {
    return undefined;
  }

  try {
    const ghResponse = await client.request(`GET /gists/${gistId}`);
    if (ghResponse.status !== 200) {
      Logger.log(
        LogLevel.error,
        `Error retrieving gist(${gistId}): ${ghResponse.status}`,
      );
    }
    return ghResponse.data as Gist;
  } catch (err) {
    Logger.log(LogLevel.error, `Error retrieving gist(${gistId}): ${err}`);
  }

  return undefined;
};
