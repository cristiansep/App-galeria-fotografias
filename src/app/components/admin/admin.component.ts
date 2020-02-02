import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Animations } from '../../animations/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [Animations]
})
export class AdminComponent implements OnInit {

  @HostBinding('@anim-admin') animAdmin;

  public identity: any;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { 
    this.identity = this.auth.getIdentity();
  }

  ngOnInit() {
  }

  logOut() {
    this.auth.logOut();
    this.router.navigate(['/login']);
  }

}
