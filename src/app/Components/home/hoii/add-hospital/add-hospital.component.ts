import { Component, OnInit } from '@angular/core'
import { HospitalModel } from 'src/app/Models/hospital.model'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.scss']
})
export class AddHospitalComponent implements OnInit {
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
      const Hospital: HospitalModel = form.value
      const setHospital = await this.mc
        .setHospital(
          Hospital.hospitalName,
          Hospital.hospitalLocation,
          Hospital.hospitalContact,
          Hospital.pubKey
        )
        .send({
          from: this.account,
          gas: 5000000
        })
      console.log(
        'Log: AddHospitalComponent -> onSubmit -> setHospital',
        setHospital
      )
      if (setHospital.status) {
        alert('Success')
        form.resetForm()
      }
    } catch (err) {
      alert('Failed!! TryAgain')
      this.route.navigateByUrl('/')
    }
  }
}
