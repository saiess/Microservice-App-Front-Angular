import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { 

    this.authenticationService.cuurentUser$.subscribe(

      userModel => this.loggedIn = userModel != null
    )
  }

  ngOnInit(): void {
  }

  logoutClick(event: any){
    event.preventDefault();

    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }

}
