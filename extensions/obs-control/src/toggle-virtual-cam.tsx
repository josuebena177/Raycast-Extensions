import { getObs } from "./lib/obs";
import { showHUD } from "@raycast/api";
import { appInstalled, appNotInstallAlertDialog, showWebsocketConnectionErrorToast } from "./lib/utils";
import OBSWebSocket from "obs-websocket-js";

export default async function main() {
  if (!(await appInstalled())) {
    return appNotInstallAlertDialog();
  }

  let obs: OBSWebSocket;
  try {
    obs = await getObs();
  } catch {
    return showWebsocketConnectionErrorToast();
  }

  const { outputActive } = await obs.call("ToggleVirtualCam");

  if (outputActive) {
    showHUD("Virtual Camera started");
  } else {
    showHUD("Virtual Camera stopped");
  }
}
