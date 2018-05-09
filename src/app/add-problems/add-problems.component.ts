import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ContestService } from './../services/contest.service';
import { FormControl } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';

@Component({
  selector: 'app-add-problems',
  templateUrl: './add-problems.component.html',
  styleUrls: ['./add-problems.component.css']
})
export class AddProblemsComponent implements OnInit {
  //@Input('contest') contest: any; 
    constructor(private contestService: ContestService){}
    problem: any;

    countries: any[];

    filteredProblems: string[];

    filteredCountriesMultiple: any[];

    brands: string[] = ['Audi','BMW','Fiat','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];

    filteredBrands: any[];

    brand: string;

   
  ngOnInit() {
    
  }
  
  filterProblems(event) {
    let query = event.query;
    console.log('query ',query);
    this.contestService.searchProblemByName(query).subscribe(
      data=>{
        this.filteredProblems = data;
        console.log(this.filteredProblems);
      },
      err=>{
        console.log('ERRO ',err);
      }
    );
  }
  addProblem(problem){
    
  }
  
}
