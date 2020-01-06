import { async } from '@angular/core/testing'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'
import { NgForm } from '@angular/forms'
import { DoctorModel } from 'src/app/Models/doctor.model'

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {
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
      const Doctor: DoctorModel = form.value
      console.log('Log: AddDoctorComponent -> onSubmit -> Doctor', Doctor)
      const HospitalID = await this.mc
        .checkHospital()
        .call({ from: this.account })
      console.log(
        'Log: AddDoctorComponent -> onSubmit -> HospitalID',
        HospitalID
      )
      const setDoctor = await this.mc
        .setDoctor(
          HospitalID,
          Doctor.doctorName,
          Doctor.doctorLocation,
          Doctor.doctorContact,
          Doctor.pubKey
        )
        .send({
          from: this.account,
          gas: 5000000
        })
      console.log('Log: AddDoctorComponent -> onSubmit -> setDoctor', setDoctor)
      if (setDoctor.status) {
        alert('Success')
        form.resetForm()
      }
    } catch (err) {
      alert('Failed!! TryAgain')
      this.route.navigateByUrl('/')
    }
  }
}
