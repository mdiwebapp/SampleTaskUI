import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NytApiService } from '../services/nyt-api.service';
import { NytArticle } from '../models/nyt-article';
import { ApiKeyModel } from '../models/api-key-model'; 


@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.css']
})
export class TopStoriesComponent implements OnInit {
  articles: NytArticle[] = [];
  apiKeyForm: FormGroup;
  isLoading: boolean = false;
  constructor(private formBuilder: FormBuilder, private nytApiService: NytApiService) { }

  ngOnInit(): void {
    this.apiKeyForm = this.formBuilder.group({
      apiKey: ['', Validators.required]
    });
  }

  fetchTopStories(): void {
    if (this.apiKeyForm.valid) {
      this.isLoading = true;
      const apiKeyModel: ApiKeyModel = {
        apiKey: this.apiKeyForm.value.apiKey
      };
      this.nytApiService.fetchTopStories(apiKeyModel)
      .subscribe(
        articles => {
          this.articles = articles;
          this.isLoading = false; // Set loading state to false once data is fetched
        },
        error => {
          console.error('Error fetching top stories:', error);
          this.isLoading = false; // Set loading state to false in case of error
        }
      );
    }
  }
}
