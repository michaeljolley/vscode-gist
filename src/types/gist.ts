/* eslint-disable @typescript-eslint/naming-convention */
import { File } from "./file";

export type Gist = {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  node_id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  files: Record<string, File>;
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  comments: number;
  comments_url: string;
  truncated: boolean;
};
