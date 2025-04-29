// This class just serves as a super simple in-memory state store that can use for
// global state without having to install and configure something like redux.
class InMemoryStateManager {
  public appEnabled: boolean = true;
  constructor() {}
}

let singleton: InMemoryStateManager;
export const getStateManager = () => {
  if (!singleton) {
    singleton = new InMemoryStateManager();
  }
  return singleton;
}