import React from "react";

const TimetableCard = ({ timetable }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        {timetable.name}
      </h2>
      <div className="flex flex-col gap-2">
        <p className="text-gray-700">
          <strong className="text-gray-600">Year:</strong> {timetable.year}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-600">Semester:</strong>{" "}
          {timetable.semester}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-600">Batch:</strong> {timetable.batch}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-600">Faculty:</strong>{" "}
          {timetable.faculty}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-600">Specialization:</strong>{" "}
          {timetable.specialization}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-600">Group:</strong> {timetable.group}
        </p>
        {timetable.subGroup && (
          <p className="text-gray-700">
            <strong className="text-gray-600">SubGroup:</strong>{" "}
            {timetable.subGroup}
          </p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto">
          Update
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full sm:w-auto">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TimetableCard;
