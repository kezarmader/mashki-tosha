import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactProvider } from '../../providers/contactProviders/contactProvider';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { Searchbar } from 'ionic-angular/components/searchbar/searchbar';

export class timingModel {
  dinner: boolean;
  lunch: boolean;
  breakfast: boolean;

  constructor() {
    this.dinner = true;
    this.breakfast = true;
    this.lunch = true;
  }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  @ViewChild("searchBarModel") searchBarModel: Searchbar;

  public filterChange: Observable<any>;
  public jamaats: Observable<any[]>;
  public jamaatCollection: AngularFireList<any>;
  public filterArgs: string = '';

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private afd: AngularFireDatabase) {

  }

  filterCondition(item, filter) {
    return item.name.toLowerCase().indexOf(filter.toLowerCase()) != -1
      || item.poc.filter(poc => {
        return poc.name.toLowerCase().indexOf(filter.toLowerCase()) != -1
              || poc.phone.toLowerCase().indexOf(filter.toLowerCase()) != -1
      }).length > 0
  }

  ngAfterViewInit(): void {
    this.filterChange = this.searchBarModel.ionChange;
    
    this.jamaatCollection = this.afd.list('/jamaats');
    
    this.searchBarModel.ionChange.emit();
    
    var combineList = Observable.combineLatest(this.jamaatCollection.valueChanges(), this.filterChange)
      .map(argList => {
        var data = argList[0];
        var filterValue = argList[1].value;

        var filtered = data.filter(d => {
          return this.filterCondition(d, filterValue);
        });

        return filtered;
      });

    this.jamaats = combineList
      .map((jamaats) => jamaats.sort((i1, i2) => {
        if (i1.name.toLowerCase() > i2.name.toLowerCase()) return 1;
        if (i1.name.toLowerCase() < i2.name.toLowerCase()) return -1;
        return 0;
      }))
      .map((jamaats) => {
        var items = [];
        jamaats.forEach((j) => {
          var item = { name: j.name.toUpperCase(), header: true, timing: j.timing ? j.timing : new timingModel() };
          items.push(item);

          if (j.poc) {
            j.poc.forEach(p => {
              var item = { name: p.name, phone: p.phone, content: true };
              items.push(item);
            });
          }
          else {
            j.poc = [];
          }
        });

        return items;
      });
  }
}
