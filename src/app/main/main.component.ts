import { Component, OnInit } from '@angular/core';
import {DataserviceService} from '../dataservice.service';
import {AppModule} from '../app.module';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public hdata = [["Sun, 17 May 2020 15:40:18 GMT",25],["Mon, 18 May 2020 16:46:18 GMT",18],["Tue, 19 May 2020 17:48:20 GMT",23],["Wed, 20 May 2020 16:44:08 GMT",19],["Thu, 21 May 2020 15:49:34 GMT",21],["Fri, 22 May 2020 16:45:18 GMT",24],["Sat, 23 May 2020 16:4:10 GMT",22]];
  
  currentDatas: any;
  hduration: any=[12,10,11,14,15,9,14];
  hdistance: any=[25,18,20,28,28,20,30];
  htimestamp: any = [];
  latestduration:any;
  latesttimestamp:any;
  latestdistance:any;
  totalDistance: any;
  averageDuration: any;
  averageDistance: any;
  averageSpeed: any;
  weekDistance: any;
  constructor(private data: DataserviceService) {
    this.data.currentData.subscribe(mdata=>{this.currentDatas=mdata;this.callevent()});

  }

  ngOnInit(): void {
  }
  getSum(total, num){
    return total+num;
  }
  calculateSpeed(){
    let totalTime = this.hduration.reduce(this.getSum,0);
    this.averageSpeed =  (this.totalDistance/totalTime).toFixed(2);
  }
  distanceweek(){
    this.weekDistance = 0;
    for (let i = this.hdistance.length-1,j=7; i >= 0 && j>0; i--,j--) {
      this.weekDistance += this.hdistance[i];
      console.log(this.weekDistance);
    }
  }

  callevent(){
    if(this.currentDatas){
      console.log(this.currentDatas);
      this.latestdistance = this.currentDatas["distance"];
      this.latestduration = this.currentDatas["duration"];
      this.latesttimestamp = this.currentDatas["timestamp"];
      this.hduration.push(parseInt(this.latestduration));
      this.hdistance.push(parseInt(this.latestdistance));
      
    }
    this.totalDistance = this.hdistance.reduce(this.getSum,0);
      this.averageDistance = (this.totalDistance/this.hdistance.length).toFixed(2);
      this.averageDuration = (this.hduration.reduce(this.getSum,0)/this.hduration.length).toFixed(2);
      this.distanceweek();
      this.calculateSpeed();
  }
}
