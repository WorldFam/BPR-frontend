import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { UrgentMarketMessagesService } from 'src/app/services/urgent-market-messages.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private _liveAnnouncer: LiveAnnouncer, private urgentMarketMessage: UrgentMarketMessagesService) {
    
  }
  ngOnInit(): void {
  }

}
