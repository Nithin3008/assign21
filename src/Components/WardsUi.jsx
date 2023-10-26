import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteWard } from "../Redux/wardPatientRedux";

const WardsUi = ({ data, edit, form }) => {
  const dispatch = useDispatch();
  console.log(data);
  return (
    <li className="border-4 list-none w-2/4 m-auto space-y-2 p-2 my-2">
      <p>
        <span className="font-medium text-xl">Ward Name : </span>
        {data.name}
      </p>

      <p>
        <span className="font-medium text-xl">Ward Number : </span>
        {data.wardNumber}
      </p>
      <p>
        <span className="font-medium text-xl">Ward Capacity : </span>
        {data.capacity}
      </p>
      <p>
        <span className="font-medium text-xl">Specializations : </span>
        {data.specializations}
      </p>

      <button
        onClick={() => dispatch(deleteWard(data._id))}
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

export default WardsUi;
