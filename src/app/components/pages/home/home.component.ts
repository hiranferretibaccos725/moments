import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  baseApiUrl = environment.baseApiUrl;
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  faSearch = faSearch;
  searchTem: string = '';

  constructor(private MomentService: MomentService) {}

  ngOnInit(): void {
    this.MomentService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });
      this.allMoments = data;
      this.moments = data;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value);
    });
  }
}
