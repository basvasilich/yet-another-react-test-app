// @flow
export type AppStoreType = {
  balance: {
    [string]: {
      currency: string,
      value: number
    }
  },
  offline: boolean
};
export type ActionType = {type: string, payload?: Object};
export type AppComponentType = {};
export type DispatchType = (action: ActionType | ThunkActionType | PromiseActionType) => any;
export type GetStateType = () => AppStoreType;
export type ThunkActionType = (dispatch: DispatchType, getState: GetStateType) => any;
export type PromiseActionType = Promise<ActionType>;
