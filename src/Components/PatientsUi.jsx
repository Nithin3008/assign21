import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePatient } from "../Redux/patientRedux";

const PatientsUi = ({ data, edit, form }) => {
  const dispatch = useDispatch();
  return (
    <li className="border-4 list-none w-2/4 m-auto space-y-2 p-2 my-2">
      <p>
        <span className="font-medium text-xl">Student Name : </span>
        {data.name}
      </p>
      <p>
        <span className="font-medium text-xl">Student Age : </span>
        {data.age}
      </p>

      <p>
        <span className="font-medium text-xl">Student Gender : </span>
        {data.gender}
      </p>
      <p>
        <span className="font-medium text-xl">Student Attendance : </span>
        {data.medicalHistory}
      </p>
      <p>
        <span className="font-medium text-xl">Student Marks : </span>
        {data.contact}
      </p>
      <p>
        <span className="font-medium text-xl">Student Class : </span>
        {data.ward}
      </p>
      {/* <p>
    <span className="font-medium text-xl">Student School : </span>
    {data.School}
  </p> */}
      <button
        onClick={() => dispatch(deletePatient(data._id))}
        className="bg-red-500 p-2 text-white rounded text-lg "
      >
        Delete
      </button>
      <button
        className="bg-red-500 p-2 text-white rounded text-lg ml-2"
        onClick={() => {
          edit(data);
          form();
        }}
      >
        Edit
      </button>
    </li>
  );
};

export default PatientsUi;
