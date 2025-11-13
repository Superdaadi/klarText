import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDarkMode = false;
  private isBrowserEnv = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Determine environment once in constructor
    this.isBrowserEnv = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (!this.isBrowserEnv) return; // Skip on server

    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.isDarkMode = true;
      this.renderer.addClass(this.document.body, 'darkmode');
    }
  }

  toggleTheme() {
    if (!this.isBrowserEnv) return;

    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.renderer.addClass(this.document.body, 'darkmode');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(this.document.body, 'darkmode');
      localStorage.setItem('theme', 'light');
    }
  }

}
