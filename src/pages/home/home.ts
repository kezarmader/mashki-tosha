import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ContactProvider } from '../../providers/contactProviders/contactProvider';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public jamaats = [];

  constructor(public navCtrl: NavController, private contactProvider: ContactProvider) {

  }

  ngOnInit(): void {

  }

  public filterItems(event) {
    let val = event.target.value;
    
    this.contactProvider.getContacts().subscribe(data => {
      this.jamaats = data.filter(e => val && val.trim() != '' && e.jamaat.toLowerCase().indexOf(val.trim().toLowerCase()) != -1)
    });
  }
}
