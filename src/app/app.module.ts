/** @format */

import { MainNavComponent } from './Components/other/main-nav/main-nav.component'
import { MaterialModule } from './Modules/material/material.module'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HoiiComponent } from './Components/home/hoii/hoii.component'
import { HospitalComponent } from './Components/home/hospital/hospital.component'
import { DoctorComponent } from './Components/home/doctor/doctor.component'
import { PatientComponent } from './Components/home/patient/patient.component'
import { HomeComponent } from './Components/home/home.component'
import { AddHospitalComponent } from './Components/home/hoii/add-hospital/add-hospital.component'
import { ListHospitalComponent } from './Components/home/hoii/list-hospital/list-hospital.component'
import { AddDoctorComponent } from './Components/home/hospital/add-doctor/add-doctor.component'
import { ListDoctorComponent } from './Components/home/hospital/list-doctor/list-doctor.component'
import { ViewPatientComponent } from './Components/home/doctor/view-patient/view-patient.component'
import { MedicalReportComponent } from './Components/home/doctor/medical-report/medical-report.component'

import { ViewReportsComponent } from './Components/home/patient/view-reports/view-reports.component'
import { HoiirouteComponent } from './Components/home/hoii/hoiiroute/hoiiroute.component'
import { HospitalrouteComponent } from './Components/home/hospital/hospitalroute/hospitalroute.component'
import { DoctorrouteComponent } from './Components/home/doctor/doctorroute/doctorroute.component'
import { PatientrouteComponent } from './Components/home/patient/patientroute/patientroute.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PatientDashboardComponent } from './Components/home/patient/patient-dashboard/patient-dashboard.component'

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HoiiComponent,
    HospitalComponent,
    DoctorComponent,
    PatientComponent,
    HomeComponent,
    AddHospitalComponent,
    ListHospitalComponent,
    AddDoctorComponent,
    ListDoctorComponent,
    ViewPatientComponent,
    MedicalReportComponent,

    ViewReportsComponent,
    HoiirouteComponent,
    HospitalrouteComponent,
    DoctorrouteComponent,
    PatientrouteComponent,
    PatientDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
