import { Component, OnInit } from '@angular/core'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { PatientModel } from 'src/app/Models/patient.model'
import { Web3Model } from 'src/app/Models/web3.model'

@Component( {
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: [ './patient-dashboard.component.scss' ]
} )
export class PatientDashboardComponent implements OnInit {
  id: any
  patient: PatientModel = {
    patientId: 0,
    patientName: '',
    patientLocation: '',
    patientContact: '',
    patientBloodGroup: '',
    patientAge: 0,
    patientSex: 0,
    patientReportList: 0,
    pubKey: ''
  }
  mc: any
  account: any
  constructor ( private web3service: Web3Service ) { }

  ngOnInit() {
    if ( typeof this.web3service.AccountSubscription !== 'undefined' ) {
      if ( this.web3service.AccountSubscription.closed ) {
        localStorage.setItem( 'isLogged', 'false' )
        this.web3service.web3login()
      }
    } else {
      localStorage.setItem( 'isLogged', 'false' )
      this.web3service.web3login()
    }
    this.web3service.Web3Details$.subscribe( ( data: Web3Model ) => {
      this.account = data.account
      this.mc = data.medicare
    } )
    this.listPatientData()
  }
  listPatientData = async () => {
    try {
      const user = await this.mc
        .Patient( localStorage.getItem( 'patientID' ) )
        .call( { from: this.account } )
      console.log(
        'Log: PatientDashboardComponent -> listPatientData -> user',
        user
      )
      this.patient = {
        patientId: JSON.parse( localStorage.getItem( 'patientID' ) ),
        patientName: user.name,
        patientLocation: user.location,
        patientContact: user.contact,
        patientBloodGroup: user.bloodGroup,
        patientAge: user.age,
        patientSex: user.sex,
        patientReportList: user.reportList,
        pubKey: this.account
      }
      localStorage.setItem( 'patient', JSON.stringify( this.patient ) )
    } catch ( error ) {
      console.log( error )
    }
  }
}
