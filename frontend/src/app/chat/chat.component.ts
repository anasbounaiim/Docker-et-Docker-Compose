import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MarkdownComponent } from 'ngx-markdown';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    MarkdownComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  public message: string = '';
  public response: string = '';
  public loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  askChatBot(): void {
    if (!this.message.trim()) return;

    this.loading = true;

    this.http
      .get(`${environment.backendHost}/chat?message=${encodeURIComponent(this.message)}`, {
        responseType: 'text',
      })
      .subscribe({
        next: (value: string) => {
          this.response = value;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error contacting chatbot:', err);
          this.response = 'An error occurred. Please try again.';
          this.loading = false;
        },
      });
  }
}
