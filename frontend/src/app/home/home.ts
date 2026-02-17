import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, RouterLink, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(private http: HttpClient) { }

  showProgessbar: boolean = false;
  response: any[] = [];
  title: string = ''

  getResponse() {

    if (!this.title.trim()) return;

    this.showProgessbar = true;
    this.http.get(`http://localhost/moviesearchapp/backend/api.php?title=${this.title}`).subscribe({
      next: (res: any) => {
        if (res) {
          setTimeout(() => {
            this.showProgessbar = false;
            this.response = res.Search || [];
          }, 1000);
        }
      },
      error: (err: any) => {
        this.showProgessbar = false;
        console.log('API Error', err);
      }
    })
  }

}
