export interface IAuthState {
  authChecked: boolean;
  loggedIn: boolean;
  isLoading: boolean;
  currentUser: {};
}

export type IAuthReducer = (
  state: IAuthState | undefined,
  action: {
    type: string;
    payload: any;
  }
) => {
  authChecked: boolean;
  loggedIn: boolean;
  currentUser: any;
};
