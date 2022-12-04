// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import * as L from 'leaflet';
// import { PopUpService } from './popup.service';
// //import { MarkersWithColors } from './markersWithColors';

// // Need to figure it out with markersWithColors

// @Injectable({
//   providedIn: 'root',
// })
// export class MarkerService {
//   //capitals: string = '/assets/data/europe-capitals.geojson';
//   transformers: string = '../../assets/data/transformers.json';
//   generators: string = '../../assets/data/generators.json'; //Feed here with api the ones that are new?
//   isInsideCheck = (value: string) =>
//     [
//       ',"under_construction"=>"1"\'',
//       ',"under_construction"=>"0"\'',
//       ',"annotation"=>"Megalopoli"',
//       ',"tie_line_station"=>"1"',
//       ',"annotation"=>"Messochora"',
//       ',"annotation"=>"llarion"',
//       ',"mb_symbol"=>"fossil_mixed"',
//       ',"mb_symbol"=>"other_nl"',
//       ',"duplicate"=>"2"',
//       ',"duplicate"=>"3"',
//       ',"duplicate"=>"1"',
//       ',"mb_symbol"=>"hydro_mixed"',
//       ',"duplicate"=>"30"',
//       ',"annotation"=>""',
//       ',"duplicate"=>"34"',
//       ',"duplicate"=>"50"',
//       ',"duplicate"=>"4"',
//       ',"duplicate"=>"40"',
//       ',"annotation"=>""',
//       ',"mb_symbol"=>"power_plus_sub"',
//       ',"annotation"=>"Grafenrheinfeld"',
//       ',"tie_line_station"=>"0"',
//       ',"annotation"=>"BorWin,beta"',
//       ',"annotation"=>"BorWin,gamma"',
//     ].includes(value);

//   redIcon = new L.Icon({
//     iconUrl:
//       'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//     shadowUrl:
//       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });
//   greenIcon = new L.Icon({
//     iconUrl:
//       'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
//     shadowUrl:
//       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });
//   HTMLIcon = L.divIcon({
//     html: '<div class="map_marker"></div>',
//     className: 'dummy',
//   });
//   convertedPoints: string = '';

//   constructor(private http: HttpClient, private popupService: PopUpService) {}

//   setTransformerMarkers(map: L.Map): void {
//     this.http.get(this.transformers).subscribe((res: any) => {
//       for (const c of res.places) {
//         for (const d of c) {
//           const lon = d.geometry[0];
//           const lat = d.geometry[1];
//           const marker = L.marker([lat, lon], { icon: this.redIcon });
//           marker.bindPopup(this.popupService.makeTransformerPopup(d));
//           //marker.addTo(map);
//         }
//       }
//     });
//   }
//   setGeneratorMarkers(map: L.Map): void {
//     this.http.get(this.generators).subscribe((res: any) => {
//       for (var c of res.places) {
//         for (var d of c) {
//           if (
//             d.P != ',"under_construction"=>"1"\'' &&
//             d.P != ',"under_construction"=>"0"\'' &&
//             d.P != ',"annotation"=>"Megalopoli"' &&
//             d.P != ',"tie_line_station"=>"1"' &&
//             d.P != ',"annotation"=>"Messochora"' &&
//             d.P != ',"annotation"=>"llarion"' &&
//             d.P != ',"mb_symbol"=>"fossil_mixed"' &&
//             d.P != ',"mb_symbol"=>"other_nl"' &&
//             d.P != ',"duplicate"=>"2"' &&
//             d.P != ',"duplicate"=>"3"' &&
//             d.P != ',"duplicate"=>"1"' &&
//             d.P != ',"mb_symbol"=>"hydro_mixed"' &&
//             d.P != ',"duplicate"=>"30"' &&
//             d.P != ',"duplicate"=>"34"' &&
//             d.P != ',"annotation"=>""' &&
//             d.P != ',"duplicate"=>"50"' &&
//             d.P != ',"mb_symbol"=>"power_plus_sub"' &&
//             d.P != ',"duplicate"=>"4"' &&
//             d.P != ',"duplicate"=>"40"' &&
//             d.P != ',"annotation"=>"Grafenrheinfeld"' &&
//             d.P != ',"tie_line_station"=>"0"' &&
//             d.P != ',"annotation"=>"BorWin,beta"' &&
//             d.P != ',"annotation"=>"BorWin,gamma"'
//           ) {
//             const lon = d.P[0];
//             const lat = d.P[1];
//             const marker = L.marker([lat, lon], { icon: this.greenIcon });
//             marker.bindPopup(this.popupService.makeGeneratorPopup(d));
//             //marker.addTo(map);
//           }
//         }
//       }
//     });
//   }
// }
