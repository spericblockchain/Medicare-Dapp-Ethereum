export interface ReportModel {
  reportId: number
  hospitalId: number
  doctorId: number
  reportedTime: string
  prescription: string
  allowedTime: number
  status: string
}
