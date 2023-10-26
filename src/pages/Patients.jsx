import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPatients,
  addPatient,
  updatePatient,
} from "../Redux/patientRedux";
import PatientsUi from "../Components/PatientsUi";
import { fetchWards } from "../Redux/wardPatientRedux";
const Patients = () => {
  const [displayForm, setDisplay] = useState(false);
  const [displayForm1, setDisplay1] = useState(false);

  const dispatch = useDispatch();
  const patientsList = useSelector((state) => state.patients);
  const wards = useSelector((state) => state.wards.wards);
  console.log(patientsList?.patients);
  function getPatientsForm(event) {
    event.preventDefault();
    const data = {
      name: event.target.patientname.value,
      age: event.target.age.value,
      gender: event.target.gender.value,
      medicalHistory: event.target.history.value,
      contact: event.target.contact.value,
      ward: event.target.ward.value,
      noOfDays: event.target.noOfDays.value,
    };
    console.log(data);
    dispatch(addPatient(data));
    setDisplay(!displayForm);
  }
  function UpdatePatientsForm(event) {
    event.preventDefault();

    console.log(editData);
    console.log(editData.ward);
    dispatch(updatePatient(editData));
    setDisplay1(!displayForm1);
  }
  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchWards());
  }, [dispatch]);
  function editForm() {
    setDisplay1(!displayForm1);
  }
  const [editData, setEditData] = useState({});
  function newEditData(data) {
    setEditData(data);
  }

  function editName(event) {
    const newName = { ...editData, name: event.target.value };
    setEditData(newName);
  }
  function editAge(event) {
    const editPatientData = { ...editData, age: event.target.value };
    setEditData(editPatientData);
  }
  function editMedicalHistory(event) {
    const editPatientData = { ...editData, medicalHistory: event.target.value };
    setEditData(editPatientData);
  }
  function editGender(event) {
    const editPatientData = { ...editData, gender: event.target.value };
    setEditData(editPatientData);
  }

  function editContact(event) {
    const editPatientData = { ...editData, contact: event.target.value };
    setEditData(editPatientData);
  }
  function editWard(event) {
    const editPatientData = { ...editData, ward: event.target.value };
    setEditData(editPatientData);
  }
  function editDays(event) {
    const editPatientData = { ...editData, noOfDays: event.target.value };
    setEditData(editPatientData);
  }

  return (
    <>
      {" "}
      <div
        style={{
          display: displayForm ? "block" : "none",
        }}
        className="fixed hidden inset-0 overflow-auto bg-black bg-opacity-40 z-50"
      >
        <form
          onSubmit={(e) => {
            getPatientsForm(e);
            e.target.reset();
          }}
          className="p-6 flex flex-col text-xl rounded-lg bg-white w-fit mt-36 mx-auto space-y-2 space-x-2 "
        >
          <label>Enter Patient Name</label>
          <input
            className="border-2 border-gray-400"
            required
            id="patientname"
            type="text"
          ></input>
          <label>Enter age</label>
          <input
            className="border-2 border-gray-400"
            required
            id="age"
            type="number"
          ></input>
          <label> Select Gender</label>
          <select id="gender">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label>Enter Medical History</label>
          <input
            className="border-2 border-gray-400"
            required
            id="history"
            type="string"
          ></input>
          <label>Enter Contact</label>
          <input
            className="border-2 border-gray-400"
            required
            id="contact"
            type="number"
          ></input>
          <label>
            Ward:{" "}
            <select id="ward">
              <option value="default">Select</option>
              {wards.map((ward) => (
                <option value={ward.name}>{ward.name}</option>
              ))}
            </select>
          </label>
          <label>No of Days in Hospital</label>
          <input
            className="border-2 border-gray-400"
            required
            id="noOfDays"
            type="number"
          ></input>

          <button
            className="border-2 p-2 bg-blue-500 border-blue-500 rounded-md"
            type="submit"
          >
            Submit
          </button>
          <button
            className="border-2 p-2 bg-red-500 border-red-500 rounded-md"
            onClick={() => setDisplay(!displayForm)}
          >
            Cancel
          </button>
        </form>
      </div>
      <div
        style={{
          display: displayForm1 ? "block" : "none",
        }}
        className="fixed hidden inset-0 overflow-auto bg-black bg-opacity-40 z-50"
      >
        <form
          onSubmit={(e) => {
            UpdatePatientsForm(e);
            e.target.reset();
          }}
          className="p-6 flex flex-col text-xl rounded-lg bg-white w-fit mt-36 mx-auto space-y-2 space-x-2 "
        >
          <label>Edit Patient Name</label>
          <input
            className="border-2 border-gray-400"
            required
            onChange={(e) => editName(e)}
            value={editData.name}
            id="name"
            type="text"
          ></input>
          <label>Edit age</label>
          <input
            className="border-2 border-gray-400"
            required
            id="age"
            value={editData.age}
            onChange={(e) => editAge(e)}
            type="number"
          ></input>
          <label> Select Gender</label>
          <select
            id="gender"
            onChange={(e) => editGender(e)}
            value={editData.gender}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label>Enter Medical History</label>
          <input
            className="border-2 border-gray-400"
            required
            id="history"
            type="string"
            onChange={(e) => editMedicalHistory(e)}
            value={editData.medicalHistory}
          ></input>
          <label>Enter Contact</label>
          <input
            className="border-2 border-gray-400"
            onChange={(e) => editContact(e)}
            required
            id="contact"
            type="number"
            value={editData.contact}
          ></input>
          <label>
            Edit Ward :
            <select
              id="ward"
              value={editData.ward}
              onChange={(e) => editWard(e)}
            >
              <option value="default">Select</option>
              {wards.map((ward) => (
                <option value={ward.name}>{ward.name}</option>
              ))}
            </select>
          </label>
          <label>Edit Days in Hospital</label>
          <input
            className="border-2 border-gray-400"
            required
            value={editData.noOfDays}
            id="noOfHospital"
            type="number"
          ></input>
          <button
            className="border-2 p-2 bg-blue-500 border-blue-500 rounded-md"
            type="submit"
          >
            Submit
          </button>
        </form>
        <button
          className="border-2 p-2 bg-red-500 border-red-500 rounded-md"
          onClick={() => setDisplay1(!displayForm1)}
        >
          Cancel
        </button>
      </div>
      <ul>
        {patientsList?.patients.map((val) => (
          <PatientsUi
            key={val._id}
            data={val}
            edit={newEditData}
            form={editForm}
          ></PatientsUi>
        ))}
      </ul>
      <div className="text-center">
        <button
          className="bg-blue-500 p-2 text-white rounded text-lg mt-2"
          onClick={() => setDisplay((s) => !s)}
        >
          Add Item
        </button>
      </div>
    </>
  );
};

export default Patients;
