import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meal-scheduler',
  templateUrl: './meal-scheduler.component.html',
  styleUrls: ['./meal-scheduler.component.css'],
})
export class MealSchedulerComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  roomNumbers;
  //TODO add a config setting to make these easier to change
  liveEndpoint: string = 'https://sbolc-006-meal-scheduler.herokuapp.com';
  testEndpoint: string = 'http://localhost:3001';

  mealDataToGet = new FormGroup({
    day: new FormControl(''),
    mealTime: new FormControl('', Validators.required),
  });

  getRoomNumbers(): void {
    console.log('get room numbers');
    console.log('this.mealDataToGet.value:', this.mealDataToGet.value);

    console.log('TODO: select params from radio button and dropdown values');
    var selectedDay = this.mealDataToGet.value.day;
    var selectedMealTime = this.mealDataToGet.value.mealTime;
    this.callForRoomNumbers(selectedDay, selectedMealTime);
  }

  callForRoomNumbers(day: string, mealTime: string) {
    const route = this.liveEndpoint + `/api/${day}/${mealTime}`;
    //var responseOptions

    this.http
      .get(route) //text
      .subscribe((data) => {
        this.roomNumbers = data;
        console.log('Async (I think) room numbers API call');
        //console.log(this.roomNumbers);
      });
  }
}
