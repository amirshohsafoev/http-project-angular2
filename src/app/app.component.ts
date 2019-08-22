import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPposts()
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        'https://http-project-angular.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPposts()
  }

  onClearPosts() {
    // Send Http request
  }

  //requesting data
  private fetchPposts(){
    this.http
    .get('https://http-project-angular.firebaseio.com/posts.json')
    .pipe(map(responseData=>{
      const postsArray = []
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          postsArray.push({...responseData[key], id: key})
        }
      }
      return postsArray
    }))
    .subscribe(posts => {
      console.log(posts)
    })
  }
}
