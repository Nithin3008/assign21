import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatients } from "../Redux/patientRedux";
import { fetchWards } from "../Redux/wardPatientRedux";
const Hospital = () => {
  const patients = useSelector((state) => state.patients.patients);
  const wards = useSelector((state) => state.wards.wards);
  const dispatch = useDispatch();
  const [topWard, setTopWard] = useState({});
  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchWards());
  }, [dispatch]);
  console.log(topWard);
  useEffect(() => {
    let ward = wards.reduce(
      (topPerformingWard, currentWard) => {
        if (currentWard.capacity > topPerformingWard.capacity) {
          return currentWard;
        }
        return topPerformingWard;
      },
      { capacity: 0 }
    );

    setTopWard(ward);
  }, [wards]);
  const totalNoOfBeds = wards.reduce((acc, val) => acc + val.capacity, 0);
  const occupancyRate = (patients.length / totalNoOfBeds) * 100;
  const averageLengthOfStay =
    patients.reduce((acc, val) => acc + val.noOfDays, 0) / patients.length;
  console.log(averageLengthOfStay);
  console.log(occupancyRate, patients.length);
  return (
    <div className="flex flex-col">
      {" "}
      <span className="text-xl">
        Total Number of Patients: {patients.length}
      </span>
      <span className="text-lg">
        Occupancy:{" "}
        {wards.reduce((occupancy, currentWard) => {
          return occupancy + currentWard.capacity;
        }, 0) - patients.length}
      </span>
      <span className="text-xl">Top performing ward: {topWard.name}</span>
      <p>Current Occupancy Rate : {occupancyRate}</p>
      <p>Average length of Stay: {averageLengthOfStay}</p>
    </div>
  );
};

export default Hospital;
