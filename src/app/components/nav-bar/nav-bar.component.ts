
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MapComponent } from '../map/map.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent  {
  
  tabControl = new FormControl('dashboard')

  constructor(
    private router: Router
  ) {}
  
  
  setTab(tab:  MatButtonToggleChange) {
    this.router.navigate([`/${tab.value}`]);
  }

}
