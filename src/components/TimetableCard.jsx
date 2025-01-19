import React from "react";

const TimetableCard = ({ timetable, onUpdate, onDelete }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4 max-w-3xl">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        {timetable.name}
      </h2>
      <div>
        <div className="flex gap-5 space-y-2">
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
        </div>
        <div className="flex gap-5 space-y-2">
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
          <p className="text-gray-700">
            <strong className="text-gray-600">Status:</strong>{" "}
            {timetable.status}
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onUpdate(session)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(session)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TimetableCard;
