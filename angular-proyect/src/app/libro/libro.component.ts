import { Component, OnInit } from '@angular/core';
import { APIService } from '../service/api.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})

export class LibroComponent {
  data: any[] = [];

  constructor(private apiService: APIService){};

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData(){
    this.apiService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    })
  }
}
