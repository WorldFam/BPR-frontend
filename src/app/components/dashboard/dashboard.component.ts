import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient} from '@angular/common/http';


const DATA: PersonData[] = [
  {
    name: "Judith Whitaker",
    phone: "(402) 761-3542",
    email: "quisque@google.couk",
    address: "770-1221 Augue Av.",
    list: 15,
    country: "Peru",
    region: "North Region",
    postalZip: "78397",
    numberrange: 5,
    currency: "$91.48",
    alphanumeric: "JUU02WTT4SC"
  },
  {
    name: "Uma Finley",
    phone: "(322) 375-4407",
    email: "malesuada.fames@google.org",
    address: "428-981 Bibendum. St.",
    list: 9,
    country: "China",
    region: "North Island",
    postalZip: "16343",
    numberrange: 7,
    currency: "$64.41",
    alphanumeric: "XCJ35TYX3TR"
  },
  {
    name: "Barrett Alvarez",
    phone: "(594) 714-3256",
    email: "sociis.natoque@yahoo.couk",
    address: "853-6913 Metus. Road",
    list: 5,
    country: "France",
    region: "Oslo",
    postalZip: "441041",
    numberrange: 8,
    currency: "$11.31",
    alphanumeric: "CFQ69VTL5FF"
  },
  {
    name: "Cameron Baldwin",
    phone: "1-981-598-1402",
    email: "vitae.dolor@outlook.com",
    address: "7428 Ac St.",
    list: 1,
    country: "South Korea",
    region: "Catalunya",
    postalZip: "383764",
    numberrange: 2,
    currency: "$57.07",
    alphanumeric: "QXX17YFM9UD"
  },
  {
    name: "Zachary Myers",
    phone: "1-514-365-4568",
    email: "habitant.morbi.tristique@outlook.ca",
    address: "202-5975 Sem Av.",
    list: 9,
    country: "United States",
    region: "Oslo",
    postalZip: "2537",
    numberrange: 8,
    currency: "$14.83",
    alphanumeric: "UAY00IVX7ER"
 },
 {
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "QXX17YFM9UD"
},
{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "QXX17YFM9UD"
},
{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "QXX17YFM9UD"
},
{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "QXX17YFM9UD"
},
{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "QXX17YFM9UD"
},
{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "QXX17YFM9UD"
},
{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "QXX17YFM9UD"
},{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "QXX17YFM9UD"
},{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "QXX17YFM9UD"
},{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "QXX17YFM9UD"
},{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "QXX17YFM9UD"
},{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "QXX17YFM9UD"
},{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "vgbh"
},{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "nnm"
},{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "QXX17YFM9UD"
},{
  name: "Cameron Baldwin",
  phone: "1-981-598-1402",
  email: "vitae.dolor@outlook.com",
  address: "7428 Ac St.",
  list: 1,
  country: "South Korea",
  region: "Catalunya",
  postalZip: "383764",
  numberrange: 2,
  currency: "$57.07",
  alphanumeric: "HELLOASD"
},
]

export interface PersonData {
name: string;
phone: string,
email: string,
address: string,
list : number,
country: string,
region: string,
postalZip: string,
numberrange: number,
currency: string,
alphanumeric: string
}

export interface PersonDataColumn{
header: string;
columnDef: string;
sort: boolean;
cell(PersonData): string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit  {
   columns : PersonDataColumn[] = [
    {
      columnDef: 'name',
      header: 'Source',
      sort: true,
      cell: (element: PersonData) => `${element.name}`,
    },
    {
      columnDef: 'phone',
      header: 'Country',
      sort: true,
      cell: (element: PersonData) => `${element.phone}`,
    },
    {
      columnDef: 'email',
      header: 'Bidding Zone',
      sort: true,
      cell: (element: PersonData) => `${element.email}`,
    },
    {
      columnDef: 'address',
      header: 'Event Status',
      sort: true,
      cell: (element: PersonData) => `${element.address}`,
    },
    {
      columnDef: 'list',
      header: 'Type of Event',
      sort: true,
      cell: (element: PersonData) => `${element.list}`,
    },
    {
      columnDef: 'country',
      header: 'Type of Unavailability',
      sort: true,
      cell: (element: PersonData) => `${element.country}`,
    },
    {
      columnDef: 'region',
      header: 'Affected Asset or Unit',
      sort: true,
      cell: (element: PersonData) => `${element.region}`,
    },
    {
      columnDef: 'postalZip',
      header: 'Published',
      sort: true,
      cell: (element: PersonData) => `${element.postalZip}`,
    },
    {
      columnDef: 'numberrange',
      header: 'Event Start',
      sort: true,
      cell: (element: PersonData) => `${element.numberrange}`,
    },
    {
      columnDef: 'currency',
      header: 'Event End',
      sort: true,
      cell: (element: PersonData) => `${element.currency}`,
    },
    {
      columnDef: 'alphanumeric',
      header: 'Available Capacity',
      sort: false,
      cell: (element: PersonData) => `${element.alphanumeric}`,
    },
 
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource = new MatTableDataSource(DATA);


  private url: string = 'http://localhost:7071/api/TriggerFunction?dateTo=www'
  items:Document[] = [];
  isLoadingResults = false;

  constructor(private _liveAnnouncer: LiveAnnouncer,private http:HttpClient) {
    this.http.get<Document[]>(this.url).subscribe(data => {
     
      this.items = data
  
      console.log(this.items)})
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getData() : PersonDataColumn[]{
    let personArray: PersonDataColumn[] = []
    DATA.forEach((value: PersonData, index: number,array : PersonData[]) => {
      personArray.push(
        // {
        //   header: value.address,
        //   columnDef: value.alphanumeric,
        //   cell.map(e => e.)
        // }
      )
  });
  console.log(personArray)
    return personArray;
  }



  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

