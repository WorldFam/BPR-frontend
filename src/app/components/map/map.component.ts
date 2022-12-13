import { UnavailabilityMarketMessagesService } from 'src/app/services/dashboard/unavailability-market-messages.service';
import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ShapeService } from '../../services/map/shape.service';
import { WebSocketConnectionService } from '../../services/websocket-connection.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private states: any;
  private filteredCountries: any[] = [];
  private countries: any = [];
  //Sides
  private initStatesLayer() {
    this.states.features.forEach((element: any) => {
      if (this.countries != null) {
        this.countries.forEach((country) => {
          if (element.properties.name === country) {
            return this.filteredCountries.push(element);
          }
          return [];
        });
      }
    });

    const stateLayer = L.geoJSON(this.filteredCountries, {
      style: () => ({
        weight: 3,
        opacity: 0.5,
        color: '#FF0000',
        fillOpacity: 0.8,
        fillColor: '#FF0000',
      }),
    });
    this.map.addLayer(stateLayer);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [49.4521, 11.0767],
      zoom: 5,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  constructor(
    private shapeService: ShapeService,
    private webSocketConnectionService: WebSocketConnectionService
  ) {}

  ngAfterViewInit(): void {
    this.initMap();

    this.shapeService.getStateShapes().subscribe((states) => {
      this.states = states;
    });

    this.webSocketConnectionService.subscribeToWebSocket(
      'wss://bpr.webpubsub.azure.com:443/client/hubs/BPR?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2NzA5NDY0NDIsImV4cCI6MTY3MDk1MDA0MiwiaWF0IjoxNjcwOTQ2NDQyLCJhdWQiOiJodHRwczovL2Jwci53ZWJwdWJzdWIuYXp1cmUuY29tL2NsaWVudC9odWJzL0JQUiJ9.DOilvTehVVEDuhsNRFQA0LOWevty5TqpTEC6gy_5izo'
    ).subscribe(
      (data : UnavailabilityMarketMessagesService[]) => {
        data.map(obj => {
          if(obj["country"] != null)
          {
            this.countries.push(obj["country"])
          }
        })
        this.initStatesLayer();
      },
      (err) => console.error('ERROR WHEN GETTING OBJECTS' + err)
    );
  }
}
