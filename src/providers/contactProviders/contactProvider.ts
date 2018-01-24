import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ContactProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactProvider {

  constructor(public http: Http) { }

  public getContacts() {
    return this.http.get("assets/mockup/contacts.json")
      .map(
        (response: Response) => response.json()
      );
  }
}
