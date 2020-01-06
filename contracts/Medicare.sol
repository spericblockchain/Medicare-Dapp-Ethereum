pragma solidity ^0.5.15;
import './SafeMath.sol';
contract Medicare {
  using SafeMath for uint256;
  address public HOII;
  constructor() public {
    HOII = msg.sender;
  }
  struct HospitalDetails{
    string name;
    string location;
    string contact;
    uint reputation;
    address pubadd;
  }
  struct DoctorDetails{
    uint hospitalID;
    string name;
    string location;
    string contact;
    uint reputation;
    address pubadd;
  }
  struct MedicalReportDetails{
    uint hospitalID;
    uint doctorID;
    uint time;
    string prescription;
    uint allowedTime;
    uint rate;
    bool status;
  }
  struct PatientDetails{
    string name;
    string location;
    string contact;
    uint age;
    uint sex;
    string bloodGroup;
    uint reportList;
    address pubadd;
    mapping (uint => MedicalReportDetails) Reports;
  }
  struct Rate{
    uint totalPatients;
    uint totalRates;
  }
  mapping (uint => Rate) HospitalReputation;
  mapping (uint => Rate) DoctorReputation;
  mapping(uint => HospitalDetails)public Hospital;
  mapping(uint => DoctorDetails) public Doctor;
  mapping(uint => PatientDetails) public Patient;
  // mapping(address => mapping (uint => MedicalReportDetails)) Reports;
  uint public H_ID = 256;
  uint public D_ID = 512;
  uint public P_ID = 1024;
  modifier onlyHOII(){
    require(HOII == msg.sender,"only HOII");
    _;
  }
  modifier onlyHospital(uint id){
    require(Hospital[id].pubadd == msg.sender,"only Hospital");
    _;
  }
  modifier onlyDoctor(uint id){
    require(Doctor[id].pubadd == msg.sender,"only Doctor");
    _;
  }
  modifier isStatusFalseNoSameDoctor(uint pId,uint dId){
    if(Patient[pId].Reports[Patient[pId].reportList].doctorID == dId){
      require(Patient[pId].Reports[Patient[pId].reportList].status == true,'Last Report Not Valid yet , conselt another doc');
    }
    _;
  }
  // modifier checkAllowedTime(uint pID,uint rID){
  //     require((Patient[pID].Reports[rID].allowedTime - now) < 0,'Cant Rate now , wait until allowed time over ');
  //   _;
  // }
  modifier onlyPatient(uint id){
    require(Patient[id].pubadd == msg.sender,"only Patient");
    _;
  }
  function setHospital(
    string memory _name,
    string memory _location,
    string memory _contact,
    address _pubadd) public onlyHOII{
    Hospital[H_ID] = HospitalDetails(
      _name,
      _contact,
      _location,
      0,
      _pubadd);
      HospitalReputation[H_ID].totalPatients = 0;
      HospitalReputation[H_ID].totalRates = 0;
    H_ID++;
  }
  function RemoveHospital(uint _HID) public onlyHOII{
    delete Hospital[_HID];
    delete HospitalReputation[_HID];

  }
  function setDoctor(
    uint _HID,
    string memory _name,
    string memory _location,
    string memory _contact,
    address _pubadd) public onlyHospital(_HID){
    Doctor[D_ID] = DoctorDetails(
      _HID,
      _name,
      _contact,
      _location,
      0,
      _pubadd);
    DoctorReputation[D_ID].totalPatients = 0;
    DoctorReputation[D_ID].totalRates = 0;
    D_ID++;
  }
  function RemoveDoctor(uint _HID,uint _DID) public onlyHospital(_HID){
    delete Doctor[_DID];
  }
  function PatientRegister(
    string memory _name,
    string memory _location,
    string memory _contact,
    uint _age,
    uint sex,
    string memory bloodGroup) public {
    Patient[P_ID] = PatientDetails(
      _name,
      _location,
      _contact,
      _age,
      sex,
      bloodGroup,
      0,
      msg.sender);
    P_ID++;
  }
  function GenarateMR(
    uint _patientID,
    uint _doctorID,
    string memory _prescription,
    uint _allowedTime) public onlyDoctor(_doctorID) isStatusFalseNoSameDoctor(_patientID,_doctorID) {
    Patient[_patientID].reportList++;
    Patient[_patientID].Reports[Patient[_patientID].reportList] = MedicalReportDetails(
      Doctor[_doctorID].hospitalID,_doctorID,now,_prescription,_allowedTime,0,false);
    DoctorReputation[_doctorID].totalPatients++;
    HospitalReputation[Doctor[_doctorID].hospitalID].totalPatients++;
  }

  function RateDoctor(uint _PID,uint _reportID,uint _rating) public  {
    uint docID = Patient[_PID].Reports[_reportID].doctorID;
    uint hosID = Doctor[docID].hospitalID;
    DoctorReputation[docID].totalRates = DoctorReputation[docID].totalRates + _rating;
    HospitalReputation[hosID].totalRates = HospitalReputation[hosID].totalRates + _rating;
    Doctor[docID].reputation = DoctorReputation[docID].totalRates.div(DoctorReputation[docID].totalPatients);
    Hospital[hosID].reputation = HospitalReputation[hosID].totalRates.div(HospitalReputation[hosID].totalPatients);
    Patient[_PID].Reports[_reportID].status = true;
    Patient[_PID].Reports[_reportID].rate = _rating;
  }
  function getPatientReports(uint pId,uint rId) public view returns(
    uint hospitalID,
    uint doctorID,
    uint time,
    string memory prescription,
    uint allowedTime,
    bool status) {
      MedicalReportDetails memory report = Patient[pId].Reports[rId];
      return(
        report.hospitalID,report.doctorID,report.time,report.prescription,report.allowedTime,report.status
      );
  }

  function checkHospital() public view returns (uint status) {
    for (uint index = 256; index <= H_ID; index++) {
      if (msg.sender == Hospital[index].pubadd) {
        return index;
      }
    }
    return 0;
  }
  function checkDoctor() public view returns (uint status) {
    for (uint index = 512; index <= D_ID; index++) {
      if (msg.sender == Doctor[index].pubadd) {
        if(Hospital[Doctor[index].hospitalID].pubadd != 0x0000000000000000000000000000000000000000){
      return index;
        }
      }
    }
    return 0;
  }
  function checkPatient() public view returns (uint status) {
    for (uint index = 1024; index <= P_ID; index++) {
      if (msg.sender == Patient[index].pubadd) {
        return index;
      }
    }
    return 0;
  }
}
