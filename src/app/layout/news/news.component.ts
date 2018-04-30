import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Observable } from 'rxjs/Observable';
import { PublicationsService } from '../../services/publications.service';
import { ActivatedRoute } from '@angular/router';
export interface News {
    imageUrl: string;
    videoUrl: string;
    documentUrl: string;
    likes: number;
    description: string;
    title: string;
    publication_date: string;
}

export interface NewId extends News {
    id: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: [routerTransition()]
})
export class NewsComponent implements OnInit, OnDestroy {
    loadNews: boolean;
    nameCollection: string = '';
    imgUrl: string = '';
    newsServices: any;
    news = null;
    item: any;
    sub: any;

    constructor(newsService: PublicationsService) {
        this.loadNews = true;
        this.newsServices = newsService;
    }

    ngOnInit() {
        this.getNews();
        console.log(this.newsServices.getPublications);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public getNews() {
        this.sub = this.newsServices.getPublications()
        .subscribe(
          data => {
            this.news = data;

            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    }

    public delete(id) {
        this.newsServices.deletePublication(id);
    }

    // scrollHandler(e) {
    //     if (e === 'bottom') {
    //       this.page.more();
    //     }
}
