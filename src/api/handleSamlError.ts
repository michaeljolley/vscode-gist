import { Octokit } from "@octokit/rest";
import { AuthenticationSession } from "vscode";

import { newSession } from "../authentication/authentication";
import Logger from "../logger";
import { getClient } from "./api";
import { LogLevel } from "../constants";

export async function handleSamlError<T>(
  session: AuthenticationSession,
  request: (client: Octokit) => Promise<T>,
): Promise<T> {
  try {
    const client = getClient(session.accessToken);
    return await request(client);
  } catch (error) {
    if (
      (error as Error).message.includes(
        "Resource protected by organization SAML enforcement.",
      )
    ) {
      Logger.log(LogLevel.error, "SAML error, re-authenticating");
      const session = await newSession(
        "Your organization is protected by SAML enforcement. Please sign-in again to continue.",
      );
      const client = getClient(session.accessToken);
      return await request(client);
    } else {
      throw error;
    }
  }
}
