import { async } from '@angular/core/testing'
import { HospitalModel } from 'src/app/Models/hospital.model'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-list-hospital',
  templateUrl: './list-hospital.component.html',
  styleUrls: ['./list-hospital.component.scss']
})
export class ListHospitalComponent implements OnInit {
  displayedColumns: string[] = [
    'hospitalId',
    'hospitalName',
    'hospitalLocation',
    'hospitalContact',
    'hospitalReputation',
    'pubKey',
    'remove'
  ]
  mc: any
  account: any

  dataSource = null
  constructor(private route: Router, private web3service: Web3Service) {}
  ngOnInit() {
    this.web3service.Web3Details$.subscribe((data: Web3Model) => {
      this.account = data.account
      this.mc = data.medicare
    })
    this.listHospitels()
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
  listHospitels = async () => {
    const hospital: HospitalModel[] = []
    const TotalHospitals = await this.mc.H_ID().call({ from: this.account })
    for (let i = 256; i < TotalHospitals; i++) {
      const unFormatedHospital = await this.mc
        .Hospital(i)
        .call({ from: this.account })
      if (unFormatedHospital.name !== '') {
        hospital.push({
          hospitalId: i,
          hospitalName: unFormatedHospital.name,
          hospitalLocation: unFormatedHospital.location,
          hospitalContact: unFormatedHospital.contact,
          hospitalReputation: unFormatedHospital.reputation,
          pubKey: unFormatedHospital.pubadd
        })
      }
      this.dataSource = new MatTableDataSource(hospital)
    }
  }
  removeHospital = async id => {
    console.log(id)
    const RemoveHospital = await this.mc.RemoveHospital(id).send({
      from: this.account,
      gas: 5000000
    })
    this.listHospitels()
    console.log(
      'Log: ListHospitalComponent -> constructor -> RemoveHospital',
      RemoveHospital
    )
  }
}
