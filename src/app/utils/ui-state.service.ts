import { Injectable } from '@angular/core';

@Injectable({providedIn: "root"})
export class UiStateService {

  private state: UIState;

  setState(state: UIState) {
    this.state = state;
    sessionStorage.setItem(state.key, JSON.stringify( this.state.state));
  }

  getState(props : UIState): UIState {
    const state = sessionStorage.getItem(props.key)
    if(state) {
      return {state: JSON.parse(sessionStorage.getItem(props.key)) }
    }
    return {state: props.defaultValue}
  }
}

export interface UIState {
  state: string;
  key?: string;
  defaultValue?: string;
}