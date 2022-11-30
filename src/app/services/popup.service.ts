import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopUpService {
  constructor() {}

  makeTransformerPopup(data: any): string {
    return (
      `` +
      `<div>Transformer ID: ${data.transformer_id}</div>` +
      `<div>SRC Voltage: ${data.src_voltage}</div>` +
      `<div>DST Voltage: ${data.dst_voltage}</div>`
    );
  }

  makeGeneratorPopup(data: any): string {
    return (
      `` +
      `<div>Generator ID: ${data.generator_id}</div>` +
      `<div>Symbol: ${data.symbol}</div>` +
      `<div>Capacity: ${data.capacity}</div>`
    );
  }
}
