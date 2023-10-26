import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWard, fetchWards, updateWard } from "../Redux/wardPatientRedux";
import WardsUi from "../Components/WardsUi";
const Wards = () => {
  const [displayForm, setDisplay] = useState(false);
  const [displayForm1, setDisplay1] = useState(false);

  const dispatcher = useDispatch();
  const wardsList = useSelector((state) => state.wards);
  console.log(wardsList.wards);
  function getWardForm(event) {
    event.preventDefault();
    const data = {
      name: event.target.wardname.value,
      wardNumber: event.target.wardNumber.value,
      capacity: event.target.capacity.value,
      specializations: event.target.specializations.value,
    };
    console.log(data);
    dispatcher(addWard(data));
    setDisplay(!displayForm);
  }
  function UpdateTeacherForm(event) {
    event.preventDefault();

    console.log(editData);
    dispatcher(updateWard(editData));
    setDisplay1(!displayForm1);
  }
  useEffect(() => {
    dispatcher(fetchWards());
  }, [dispatcher]);
  function editForm() {
    setDisplay1(!displayForm1);
  }
  const [editData, setEditData] = useState({});
  function newEditData(data) {
    setEditData(data);
  }

  function editName(event) {
    const editWard = { ...editData, name: event.target.value };
    setEditData(editWard);
  }
  function editWardNumber(event) {
    const editWard = { ...editData, wardNumber: event.target.value };
    setEditData(editWard);
  }
  function editCapacity(event) {
    const editWard = { ...editData, capacity: event.target.value };
    setEditData(editWard);
  }
  function editSpecialization(event) {
    const editWard = { ...editData, specializations: event.target.value };
    setEditData(editWard);
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
            getWardForm(e);
            e.target.reset();
          }}
          className="p-6 flex flex-col text-xl rounded-lg bg-white w-fit mt-36 mx-auto space-y-2 space-x-2 "
        >
          <label>Enter Ward Name</label>
          <input
            className="border-2 border-gray-400"
            required
            id="wardname"
            type="text"
          ></input>
          <label>Enter Ward Number</label>
          <input
            className="border-2 border-gray-400"
            required
            id="wardNumber"
            type="number"
          ></input>
          <label>Enter Capacity</label>
          <input
            className="border-2 border-gray-400"
            required
            id="capacity"
            type="number"
          ></input>
          <label>Enter Specializations</label>
          <input
            className="border-2 border-gray-400"
            required
            id="specializations"
            type="string"
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
            UpdateTeacherForm(e);
            e.target.reset();
          }}
          className="p-6 flex flex-col text-xl rounded-lg bg-white w-fit mt-36 mx-auto space-y-2 space-x-2 "
        >
          <label>Edit Ward Name</label>
          <input
            className="border-2 border-gray-400"
            required
            id="wardname"
            onChange={(e) => editName(e)}
            value={editData.name}
            type="text"
          ></input>
          <label>Edit Ward Number</label>
          <input
            className="border-2 border-gray-400"
            required
            id="wardNumber"
            onChange={(e) => editWardNumber(e)}
            value={editData.wardNumber}
            type="number"
          ></input>
          <label>Edit Capacity</label>
          <input
            className="border-2 border-gray-400"
            required
            value={editData.capacity}
            onChange={(e) => editCapacity(e)}
            type="number"
            id="capacity"
          ></input>
          <label>Edit Specialization</label>
          <input
            className="border-2 border-gray-400"
            required
            onChange={(e) => editSpecialization(e)}
            value={editData.specializations}
            type="string"
            id="specializations"
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
        {wardsList?.wards.map((val) => (
          <WardsUi
            key={val._id}
            data={val}
            edit={newEditData}
            form={editForm}
          ></WardsUi>
        ))}
      </ul>
      <div className="text-center">
        <button
          className="bg-blue-500 p-2 text-white rounded text-lg mt-2"
          onClick={() => setDisplay((s) => !s)}
        >
          Add New Teacher
        </button>
      </div>
    </>
  );
};

export default Wards;
