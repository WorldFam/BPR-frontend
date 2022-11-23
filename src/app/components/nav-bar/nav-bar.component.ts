
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { UiStateService,UIState } from 'src/app/utils/ui-state.service'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  tabControl: string;
  key: string = 'tabState'
  defaultValue: string = 'dashboard'

  constructor(private uiStateService: UiStateService,
    private router: Router
  ) {
  }
 
  ngOnInit() {
    const state = this.uiStateService.getState(this.getCurrentTabState());
    this.tabControl = state.state;
  }

  setTabState(tabEvent: MatButtonToggleChange) {
    this.router.navigate([`/${tabEvent.value}`]);
    const currentState = this.getCurrentTabState()
    this.uiStateService.setState(currentState);
    }

  getCurrentTabState(): UIState {
   return { state: this.tabControl, key: this.key, defaultValue: this.defaultValue }
  }

  
}

