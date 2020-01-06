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
}

@Component( {
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: [ './view-patient.component.scss' ]
} )
export class ViewPatientComponent implements OnInit {
  displayedColumns: string[] = [ 'reportId', 'hospitalId', 'doctorId', 'prescription', 'reportedTime', 'allowedTime', 'status' ];
  dataSource = null
  mc: any
  account: any
  dataSource1 = null
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
  constructor ( private route: Router, private web3service: Web3Service ) { }
  ngOnInit() {
    this.web3service.Web3Details$.subscribe( ( data: Web3Model ) => {
      this.account = data.account
      this.mc = data.medicare
    } )
    this.listReports()
  }

  listReports = async () => {
    try {
      const PatientID: number = JSON.parse( localStorage.getItem( 'patientId' ) )
      console.log( 'Log: ViewPatientComponent -> listReports -> PatientID', PatientID )
      const user = await this.mc
        .Patient( PatientID )
        .call( { from: this.account } )
      this.patient = {
        patientId: PatientID,
        patientName: user.name,
        patientLocation: user.location,
        patientContact: user.contact,
        patientBloodGroup: user.bloodGroup,
        patientAge: user.age,
        patientSex: user.sex,
        patientReportList: user.reportList,
        pubKey: user.pubadd
      }
      const report: ReportModel[] = []
      for ( let i = 1;i <= this.patient.patientReportList;i++ ) {
        const unFormatedreport = await this.mc.getPatientReports( PatientID, i ).call( { from: this.account } )
        const reportedTime = moment( new Date( JSON.parse( unFormatedreport.time ) * 1000 ) ).format( 'DD/MM/YYYY' )
        report.push( {
          reportId: i,
          hospitalId: unFormatedreport.hospitalID,
          doctorId: unFormatedreport.doctorID,
          reportedTime,
          prescription: unFormatedreport.prescription,
          allowedTime: unFormatedreport.allowedTime,
          status: ( unFormatedreport.status ? 'Patient Verified' : 'Patient Not Verified' )
        } )
        this.dataSource = report
        console.log( 'Log: ViewPatientComponent -> listReports -> report', report )
      }
    } catch ( error ) {
      console.log( 'Log: ViewPatientComponent -> listReports -> error', error )

    }
  }

}
