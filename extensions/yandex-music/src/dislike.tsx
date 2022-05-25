import { closeMainWindow } from "@raycast/api";
import { runJSInYandexMusicTab } from "./utils";

export default async () => {
  if (await runJSInYandexMusicTab("document.querySelector('.player-controls__btn.d-like_on').click();")) {
    await closeMainWindow();
  }
};
