import { Component, OnInit } from '@angular/core'
import { Web3Service } from 'src/app/Services/Web3/web3.service'

@Component({
  selector: 'app-hospitalroute',
  templateUrl: './hospitalroute.component.html',
  styleUrls: ['./hospitalroute.component.scss']
})
export class HospitalrouteComponent implements OnInit {
  constructor(private web3service: Web3Service) {}

  ngOnInit() {
    if (typeof this.web3service.AccountSubscription !== 'undefined') {
      if (this.web3service.AccountSubscription.closed) {
        localStorage.setItem('isLogged', 'false')
        this.web3service.web3login()
      }
    } else {
      localStorage.setItem('isLogged', 'false')
      this.web3service.web3login()
    }
  }
}
