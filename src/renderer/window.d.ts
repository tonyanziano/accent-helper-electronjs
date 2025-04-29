declare global {
  interface Window {
    // this object is exposed through the "preload.js" script on the "main" side of the project
    clipboard: {
      writeCharacter: (character: string) => void
    }
  }
}

export {};