import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  UrgentMarketMessagesInfrastructure,
  FilterEntity,
} from 'src/app/models/urgent-market-messages-infrastructure.model';
import { __values } from 'tslib';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // @Input()
  // options: UrgentMarketMessagesInfrastructure<FilterEntity>;

  // @Input()
  // isLoadingOptions: boolean;

  // @Output()
  // selectedOptions: FilterEntity[];
}
