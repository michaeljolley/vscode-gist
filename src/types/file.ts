/* eslint-disable @typescript-eslint/naming-convention */
export type File = {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
  truncated: boolean;
  content?: string;
};
