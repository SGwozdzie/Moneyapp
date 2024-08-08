import store from "../store/index";

export function withReduxState(loader) {
  return async (args) => {
    const state = store.getState();
    return loader({ ...args, state });
  };
}
