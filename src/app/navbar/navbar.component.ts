import { Component, Inject, OnInit, PLATFORM_ID, Renderer2, ElementRef, ViewChild, HostListener } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public isDarkMode = true;
  private isBrowserEnv = false;
  protected isMenuOpen = false;

  @ViewChild('navbarWrapper') navbarWrapper!: ElementRef;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowserEnv = isPlatformBrowser(this.platformId);
    console.log(this.isDarkMode)
  }

  ngOnInit() {
    if (!this.isBrowserEnv) return; // Skip on server

    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.isDarkMode = true;
      this.renderer.addClass(this.document.body, 'darkmode');
    }
    else {
      this.isDarkMode = false;
    }
    console.log(this.isDarkMode)
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

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    if (!this.isBrowserEnv || !this.isMenuOpen) return;

    const clickedInside = this.navbarWrapper.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.closeMenu();
    }
  }

  @HostListener('window:scroll')
  handleScroll() {
    if (!this.isBrowserEnv || !this.isMenuOpen) return;

    this.closeMenu();
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.renderer.removeClass(this.document.body, 'menu-open');
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      this.renderer.addClass(this.document.body, 'menu-open');
    } else {
      this.renderer.removeClass(this.document.body, 'menu-open');
    }
  }



}
