import { Injectable } from '@angular/core';

@Injectable({providedIn: "root"})
export class UiStateService {

  private state: UIState;

  setState(state: UIState) {
    this.state = state;
    console.log(this.state)
    localStorage.setItem(state.key, JSON.stringify( this.state.state));
  }

  getState(props : UIState): UIState {
    const state = localStorage.getItem(props.key)
    if(state) {
      return {state: JSON.parse(localStorage.getItem(props.key)) }
    }
    return {state: props.defaultValue}
  }
}

export interface UIState {
  state: string;
  key?: string;
  defaultValue?: string;
}