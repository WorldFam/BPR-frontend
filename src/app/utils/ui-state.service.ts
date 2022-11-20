import { Injectable } from '@angular/core';

@Injectable({providedIn: "root"})
export class UiStateService {

  private state: UIState;

  constructor() {}

  setState(state: UIState) {
    this.state = state;
    console.log(this.state)
    localStorage.setItem(state.key, JSON.stringify( this.state.tabState));
  }

  getState(state : UIState): UIState {
    const states = localStorage.getItem(state.key)
    if(states) {
      return {tabState: JSON.parse(localStorage.getItem(state.key))   }
    }
    return {tabState: state.defaultValue}
  }
}

export interface UIState {
  tabState: string;
  key?: string;
  defaultValue?: string;
}