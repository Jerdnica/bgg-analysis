import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  @Input() recommendations: any;
  @Input() allGames: any;
  individualGames: any = [];
  get displayedColumns (): string[] {
    const mainColumns = ['id','bgg', 'bggscore','bggtotal', 'name', 'score'];
    const individualGames = Object.keys(this.recommendations[0].individualGames);
    if(individualGames.length > 1) {
      this.individualGames = individualGames;
    }
    else {
      this.individualGames = [];
    }
    
    return mainColumns.concat(this.individualGames);
  }

  findGame(target: string) {
    return this.allGames.find((el: any) => el.id==target );
  }

}
