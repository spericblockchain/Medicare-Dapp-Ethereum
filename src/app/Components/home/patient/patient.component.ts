import { async } from '@angular/core/testing'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'
import { PatientModel } from 'src/app/Models/patient.model'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  gender: string
  mc: any
  account: any

  constructor(private route: Router, private web3service: Web3Service) {}
  ngOnInit() {
    this.web3service.Web3Details$.subscribe((data: Web3Model) => {
      this.account = data.account
      this.mc = data.medicare
    })
  }
  onSubmit = async (form: NgForm) => {
    try {
      const Patient: PatientModel = form.value
      Patient.patientSex = JSON.parse(this.gender)
      console.log('Log: PatientComponent -> onSubmit -> Patient', Patient)
      const PatientRegister = await this.mc
        .PatientRegister(
          Patient.patientName,
          Patient.patientLocation,
          Patient.patientContact,
          Patient.patientAge,
          Patient.patientSex,
          Patient.patientBloodGroup
        )
        .send({
          from: this.account,
          gas: 5000000
        })
      console.log(
        'Log: PatientComponent -> onSubmit -> PatientRegister',
        PatientRegister
      )

      if (PatientRegister.status) {
        Patient.patientId = await this.mc
          .checkPatient()
          .call({ from: this.account })
        alert('Success !! Your Id is ' + Patient.patientId)
        form.resetForm()
      }
    } catch (err) {
      console.log('Log: PatientComponent -> onSubmit -> err', err)
      alert('Failed!! TryAgain')
      this.route.navigateByUrl('/')
    }
  }
  login = async () => {
    this.route.navigateByUrl('/Patient/Dashboard')
  }
}
