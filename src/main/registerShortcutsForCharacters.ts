import { clipboard, globalShortcut } from "electron";
import { uIOhook, UiohookKey } from "uiohook-napi";
import { getStateManager } from "./inMemoryStateManager";

// this is a map of "shortcut" to "output value"
const shortcutMap: Record<string, string> = {
  // lowercase
  "Control+`+A": "à",
  "Control+`+E": "è",
  "Control+`+I": "ì",
  "Control+`+O": "ò",
  "Control+`+U": "ù",

  // uppercase
  "Shift+`+A": "À",
  "Shift+`+E": "È",
  "Shift+`+I": "Ì",
  "Shift+`+O": "Ò",
  "Shift+`+U": "Ù",

  // TODO: add other characters with right-facing accent "'"
};

export const registerShortcutsForCharacters = () => {
  for (const shortcut in shortcutMap) {
    const output = shortcutMap[shortcut];
    globalShortcut.register(shortcut, () => {
      if (getStateManager().appEnabled) {
        // copy the character to clipboard then press "Ctrl + V" to paste into current application
        clipboard.writeText(output);
        uIOhook.keyTap(UiohookKey.V, [UiohookKey.Ctrl]);
      }
    });
  }
};
