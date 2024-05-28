import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataProviderService } from './data-provider.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {MatSliderModule } from '@angular/material/slider'; 
import { MatIconModule } from '@angular/material/icon';
import { ResultsComponent } from './results/results.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ResultsComponent, FormsModule, MatFormFieldModule, MatSelectModule, NgxMatSelectSearchModule, MatButtonModule, MatDividerModule, MatIconModule, MatDividerModule, MatSliderModule, MatTooltipModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'bgg-front';
  graph: any;
  games: Array<any> = [];
  bayesConstant = 50;
  selects: { select: {id: string, name: string}, weight: number }[] = [];
  filteredGames: any = [];
  recommendations: any;

  constructor(private _dataProviderService: DataProviderService, private _fb: FormBuilder){}
  
  ngOnInit(): void {
    this._dataProviderService.getData().subscribe((data) => {
      //debugger;
      this.graph = data;
    });
    this._dataProviderService.getGames().subscribe((data) => {
      this.games = data;
      this.filteredGames = data;
    });
    this.addSelect();
  }

  addSelect(): void {
    const newSelectId = `select${this.selects.length + 1}`;
    this.selects.push({select: { id: newSelectId, name: 'DEFAULT_SELECT_NAME'}, weight: 1 });
  }
  
  filterGames(searchString: string) {
    this.filteredGames = this.games.filter((val) => val.name.toLowerCase().includes(searchString.toLowerCase()))
  }

  removeSelect(index: number): void {
    this.selects.splice(index, 1);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const userSelects = this.selects.filter((el) => el.select.name !== 'DEFAULT_SELECT_NAME');
    this.recommendations = this._dataProviderService.getRecommendations(this.graph, userSelects, this.games, this.bayesConstant);
  }

}
