import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logoutClick(event: any){
    event.preventDefault();

    this.authenticationService.logout();
  }

}
