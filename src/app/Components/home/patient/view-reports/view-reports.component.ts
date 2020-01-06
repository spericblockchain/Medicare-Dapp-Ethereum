import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'
import { ReportModel } from 'src/app/Models/report.model'
import { PatientModel } from 'src/app/Models/patient.model'
import * as moment from 'moment'

export interface PeriodicElement {
  position: number
  hospitalid: number
  doctorid: number
  prescription: string
  reportedtime: number
  allowedtime: number
  status: string
  rate: any
}

const ELEMENT_DATA: PeriodicElement[] = [
  // {position: 1, hospitalid: 201, doctorid: 085, prescription: 'Hdfhjgfjdhgdfjghgdfhgajhfgfgfgds', reportedtime: 10, allowedtime: 12, status: 'yes'}
]

@Component( {
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: [ './view-reports.component.scss' ]
} )
export class ViewReportsComponent implements OnInit {
  displayedColumns: string[] = [ 'reportId', 'hospitalId', 'doctorId', 'prescription', 'reportedTime', 'allowedTime', 'rate' ]
  dataSource = null
  rating: number
  mc: any
  account: any
  dataSource1 = null
  Patient: PatientModel = JSON.parse( localStorage.getItem( 'patient' ) )
  constructor ( private route: Router, private web3service: Web3Service ) { }
  ngOnInit() {
    this.web3service.Web3Details$.subscribe( ( data: Web3Model ) => {
      this.account = data.account
      this.mc = data.medicare
    } )
    this.listReports()
  }
  listReports = async () => {
    const report: ReportModel[] = []
    for ( let i = 1;i <= this.Patient.patientReportList;i++ ) {
      const unFormatedreport = await this.mc.getPatientReports( this.Patient.patientId, i ).call( { from: this.account } )
      const reportedTime = moment( new Date( JSON.parse( unFormatedreport.time ) * 1000 ) ).format( 'DD/MM/YYYY' )
      report.push( {
        reportId: i,
        hospitalId: unFormatedreport.hospitalID,
        doctorId: unFormatedreport.doctorID,
        reportedTime,
        prescription: unFormatedreport.prescription,
        allowedTime: unFormatedreport.allowedTime,
        status: unFormatedreport.status
      } )
      this.dataSource = report
    }
  }
  Ratereport = async id => {
    try {
      if ( this.rating % 2 !== 0 ) { this.rating++ }
      if ( this.rating > 0 && this.rating <= 10 ) {
        const RateStatus = await this.mc.RateDoctor( this.Patient.patientId, id, this.rating ).send( {
          from: this.account,
          gas: 5000000
        } )
        if ( RateStatus.status ) {
          alert( 'Success' )
          this.rating = undefined
          this.listReports()
        }
      } else {
        alert( 'Rate Only to 1 - 10' )
        this.rating = undefined
      }
    } catch ( error ) {
      console.log( 'Log: ViewReportsComponent -> constructor -> error', error )

    }

  }


}
