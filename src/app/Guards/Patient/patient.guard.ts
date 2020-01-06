import { Injectable } from '@angular/core'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router'
import { Observable } from 'rxjs'
import { Web3Model } from 'src/app/Models/web3.model'
import { Web3Service } from 'src/app/Services/Web3/web3.service'

@Injectable( {
  providedIn: 'root'
} )
export class PatientGuard implements CanActivate {
  private web3var: Web3Model
  constructor( private web3Service: Web3Service, private route: Router ) { }
  async canActivate(): Promise<boolean> {
    if ( typeof this.web3Service.AccountSubscription !== 'undefined' ) {
      if ( this.web3Service.AccountSubscription.closed ) {
        localStorage.setItem( 'isLogged', 'false' )
        await this.web3Service.web3login()
      }
    } else {
      localStorage.setItem( 'isLogged', 'false' )
      await this.web3Service.web3login()
    }
    this.web3var = await this.web3Service.Web3Details$.value
    const checkPatient = await this.web3var.medicare
      .checkPatient()
      .call( { from: this.web3var.account } )
    if ( checkPatient > 0 ) {
      localStorage.setItem( 'patientID', checkPatient )
      return true
    } else {
      alert( 'Sorry ! You are Not a Patient' )
      this.route.navigateByUrl( '/' )
    }
  }
}
