import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MinHeap } from './min-heap';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>('assets/graph.json');
  }
  
  getGames(): Observable<any> {
    return this.http.get<any>('assets/games.json');
  }

  getRecommendations(graph: any, userSelects: any, allGames: any, smoothing: number) {
    const howMany = 20;
    let edges: any = [];
    const coefficient = smoothing * 10;
    for (let i = 0; i < userSelects.length; i++) {
      let nodeData = graph[userSelects[i].select.id];
      for (let target in nodeData.edges) {
        if (nodeData.edges.hasOwnProperty(target)) {
          const myIndex = edges.findIndex((edge: any) => edge.target.id == target);
          if(myIndex == -1) {
            const currentScore = (nodeData.edges[target] / (graph[target].likes + coefficient)) * userSelects[i].weight;
            const currentEdge: any = { score: currentScore  / userSelects.length, target: this._findGame(allGames, target), likes: graph[target].likes};
            currentEdge.individualGames = {};
            currentEdge.individualGames[userSelects[i].select.id] = currentScore;
            edges.push(currentEdge);
          }
          else {
            const currentScore = (nodeData.edges[target] / (graph[target].likes + coefficient)) * userSelects[i].weight;
            edges[myIndex].score = edges[myIndex].score + (currentScore / userSelects.length);
            edges[myIndex].individualGames[userSelects[i].select.id] = currentScore;
          }
        }
      }
    }
    let heap = new MinHeap();

    edges.forEach((edge: any) => {
      heap.insert(edge);
      if (heap.size() > howMany) {
        heap.extractMin();
      }
    });

    let topEdges = [];
    while (heap.size() > 0) {
      topEdges.push(heap.extractMin());
    }
    return topEdges.reverse();
  }

  private _findGame(allGames: any, target: string) {
    return allGames.find((el: any) => el.id==target );
  }
}
