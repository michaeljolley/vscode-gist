import * as vscode from "vscode";
import { LogLevel } from "./constants";

export default abstract class Logger {
  private static _channel = vscode.window.createOutputChannel("GitHub Gist");

  public static log(
    logLevel: LogLevel,
    message: string,
    ...optionalParams: any[]
  ): void {
    const captains: any = console;

    let level = logLevel || LogLevel.info;

    const getTime = (): {
      hours: string;
      minutes: string;
      seconds: string;
    } => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const prefix = (value: number): string => {
        return value < 10 ? `0${value}` : `${value}`;
      };
      return {
        hours: prefix(hours),
        minutes: prefix(minutes),
        seconds: prefix(seconds),
      };
    };

    const { hours, minutes, seconds } = getTime();
    const log = `[${hours}:${minutes}:${seconds}] ${message}`;

    captains[level](log, ...optionalParams);

    if (this._channel && level !== LogLevel.debug) {
      this._channel.appendLine(log);
    }
  }

  public static showLog(): void {
    this._channel.show();
  }
}
