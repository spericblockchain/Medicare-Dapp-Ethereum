import { ViewReportsComponent } from './Components/home/patient/view-reports/view-reports.component'
import { PatientrouteComponent } from './Components/home/patient/patientroute/patientroute.component'
import { ViewPatientComponent } from './Components/home/doctor/view-patient/view-patient.component'
import { MedicalReportComponent } from './Components/home/doctor/medical-report/medical-report.component'
import { DoctorrouteComponent } from './Components/home/doctor/doctorroute/doctorroute.component'
import { ListDoctorComponent } from './Components/home/hospital/list-doctor/list-doctor.component'
import { AddDoctorComponent } from './Components/home/hospital/add-doctor/add-doctor.component'
import { HospitalrouteComponent } from './Components/home/hospital/hospitalroute/hospitalroute.component'
import { HoiirouteComponent } from './Components/home/hoii/hoiiroute/hoiiroute.component'
import { AddHospitalComponent } from './Components/home/hoii/add-hospital/add-hospital.component'
import { PatientComponent } from './Components/home/patient/patient.component'
import { DoctorComponent } from './Components/home/doctor/doctor.component'
import { HospitalComponent } from './Components/home/hospital/hospital.component'
import { HomeComponent } from './Components/home/home.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HoiiComponent } from './Components/home/hoii/hoii.component'
import { ListHospitalComponent } from './Components/home/hoii/list-hospital/list-hospital.component'
import { HoiiGuard } from './Guards/Hoii/hoii.guard'
import { HospitalGuard } from './Guards/Hospital/hospital.guard'
import { DoctorGuard } from './Guards/Doctor/doctor.guard'
import { PatientDashboardComponent } from './Components/home/patient/patient-dashboard/patient-dashboard.component'
import { PatientGuard } from './Guards/Patient/patient.guard'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'HOII',
    component: HoiirouteComponent,
    canActivate: [HoiiGuard],
    children: [
      {
        path: '',
        component: HoiiComponent
      },
      {
        path: 'Add-Hospital',
        component: AddHospitalComponent
      },
      {
        path: 'List-Hospital',
        component: ListHospitalComponent
      }
    ]
  },
  {
    path: 'Hospital',
    component: HospitalrouteComponent,
    canActivate: [HospitalGuard],
    children: [
      { path: '', component: HospitalComponent },
      {
        path: 'Add-Doctor',
        component: AddDoctorComponent
      },
      {
        path: 'List-Doctor',
        component: ListDoctorComponent
      }
    ]
  },
  {
    path: 'Doctor',
    component: DoctorrouteComponent,
    canActivate: [DoctorGuard],
    children: [
      {
        path: '',
        component: DoctorComponent
      },
      {
        path: 'Medical-Report',
        component: MedicalReportComponent
      },
      {
        path: 'View-Patient',
        component: ViewPatientComponent
      }
    ]
  },
  {
    path: 'Patient',
    component: PatientrouteComponent,
    children: [
      { path: '', component: PatientComponent },
      {
        path: 'Dashboard',
        component: PatientDashboardComponent,
        canActivate: [PatientGuard]
      },
      {
        path: 'View-Reports',
        component: ViewReportsComponent,
        canActivate: [PatientGuard]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
