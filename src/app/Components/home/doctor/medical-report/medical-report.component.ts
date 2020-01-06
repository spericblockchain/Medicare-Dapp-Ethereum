import { ReportModel } from 'src/app/Models/report.model'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'
import { NgForm } from '@angular/forms'
import { DoctorModel } from 'src/app/Models/doctor.model'

@Component( {
  selector: 'app-medical-report',
  templateUrl: './medical-report.component.html',
  styleUrls: ['./medical-report.component.scss']
} )
export class MedicalReportComponent implements OnInit {
  mc: any
  account: any

  constructor( private route: Router, private web3service: Web3Service ) { }
  ngOnInit() {
    this.web3service.Web3Details$.subscribe( ( data: Web3Model ) => {
      this.account = data.account
      this.mc = data.medicare
    } )
  }
  onSubmit = async ( form: NgForm ) => {
    const prescription = form.value.prescription
    const allowedTime = form.value.allowedTime
    const keyAndId = JSON.parse( localStorage.getItem( 'patientKey' ) )
    const doctorId = JSON.parse( localStorage.getItem( 'doctorId' ) )
    try {
      const patient = await this.mc.Patient( keyAndId[1] ).call( { from: this.account } )
      if ( patient.pubadd === keyAndId[0] ) {
        const reportStatus = await this.mc.GenarateMR( keyAndId[1], doctorId, prescription, allowedTime ).send( {
          from: this.account,
          gas: 5000000
        } )
        if ( reportStatus.status ) {
          alert( 'Success' )
          form.resetForm()
        }
      } else {
        alert( 'Wrong Patient Key' )
        this.route.navigateByUrl( '/Doctor' )
      }
    } catch ( error ) {
      console.log( 'Log: MedicalReportComponent -> onSubmit -> error', error )

    }

  }
}
