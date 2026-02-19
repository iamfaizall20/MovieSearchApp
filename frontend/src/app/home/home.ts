import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(private http: HttpClient) { }

  showProgessbar: boolean = false;
  showErrorMessage: boolean = false;
  response: any[] = [];
  title: string = '';

  defaultPoster: string = 'assets/no-image.png';

  getResponse() {

    if (!this.title.trim()) return;

    this.showProgessbar = true;
    this.showErrorMessage = false;
    this.response = [];

    this.http.get(
      `http://localhost/moviesearchapp/backend/api.php?title=${encodeURIComponent(this.title)}`
    ).subscribe({
      next: (res: any) => {

        this.showProgessbar = false;

        if (res.Search && res.Search.length > 0) {
          this.response = res.Search;
          this.showErrorMessage = false;
        } else {
          this.showErrorMessage = true;
        }
      },
      error: () => {
        this.showProgessbar = false;
        this.showErrorMessage = true;
      }
    });
  }

  // Fallback for broken image links
  handleImageError(event: any) {
    const img = event.target as HTMLImageElement;

    if (img.src !== this.defaultPoster) {
      img.src = this.defaultPoster;
    }
  }

}
