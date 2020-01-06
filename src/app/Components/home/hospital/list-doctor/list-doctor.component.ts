import { Component, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'
import { DoctorModel } from 'src/app/Models/doctor.model'

@Component( {
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: [ './list-doctor.component.scss' ]
} )
export class ListDoctorComponent implements OnInit {
  displayedColumns: string[] = [
    'doctorId',
    'doctorName',
    'doctorLocation',
    'doctorContact',
    'doctorReputation',
    'pubKey',
    'remove'
  ]
  mc: any
  account: any

  dataSource = null
  constructor ( private route: Router, private web3service: Web3Service ) { }
  ngOnInit() {
    this.web3service.Web3Details$.subscribe( ( data: Web3Model ) => {
      this.account = data.account
      this.mc = data.medicare
    } )
    this.listDoctors()
  }
  applyFilter( filterValue: string ) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
  listDoctors = async () => {
    const doctor: DoctorModel[] = []
    const TotalDoctors = await this.mc.D_ID().call( { from: this.account } )
    for ( let i = 512;i < TotalDoctors;i++ ) {
      const unFormatedDoctor = await this.mc
        .Doctor( i )
        .call( { from: this.account } )
      if ( unFormatedDoctor.name !== '' ) {
        doctor.push( {
          doctorId: i,
          doctorName: unFormatedDoctor.name,
          doctorLocation: unFormatedDoctor.location,
          doctorContact: unFormatedDoctor.contact,
          doctorReputation: unFormatedDoctor.reputation,
          pubKey: unFormatedDoctor.pubadd
        } )
      }
      this.dataSource = new MatTableDataSource( doctor )
    }
  }
  removeDoctor = async D_ID => {
    const H_ID = localStorage.getItem( 'H_ID' )
    const RemoveDoctor = await this.mc.RemoveDoctor( H_ID, D_ID ).send( {
      from: this.account,
      gas: 5000000
    } )
    this.listDoctors()
  }
}
