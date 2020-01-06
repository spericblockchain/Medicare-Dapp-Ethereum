import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/Services/Web3/web3.service';
import { Web3Model } from 'src/app/Models/web3.model';
import { NgForm } from '@angular/forms';
import { PatientModel } from 'src/app/Models/patient.model';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
} )
export class DoctorComponent implements OnInit {
  mc: any
  account: any
  id: number
  key: string
  constructor( private route: Router, private web3service: Web3Service ) { }
  ngOnInit() {
    this.web3service.Web3Details$.subscribe( ( data: Web3Model ) => {
      this.account = data.account
      this.mc = data.medicare
    } )
  }
  search = async () => {
    if ( this.id !== undefined ) {
      localStorage.setItem( 'patientId', JSON.stringify( this.id ) )
      this.route.navigateByUrl( '/Doctor/View-Patient' )
    } else {
      alert( 'No Value Enterd' )
    }

  }
  gen = async () => {
    if ( this.key !== undefined && this.id !== undefined ) {
      localStorage.setItem( 'patientKey', JSON.stringify( [this.key, this.id] ) )
      this.route.navigateByUrl( '/Doctor/Medical-Report' )

    } else {
      alert( 'No Value Enterd' )
    }


  }

}
