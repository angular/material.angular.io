import {Injectable} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Injectable({providedIn : 'root'})
export class ComponentSidenavService {
  private _sidenav: MatSidenav;

  constructor() {}

  get sidenav(): MatSidenav { return this._sidenav; }

  set sidenav(value: MatSidenav) { this._sidenav = value; }
}
