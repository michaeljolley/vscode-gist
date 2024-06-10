import { GistViewDataProvider } from "../views/gistViewDataProvider";

export function refreshGists(dataProvider: GistViewDataProvider) {
  return async () => await dataProvider.refresh();
}
