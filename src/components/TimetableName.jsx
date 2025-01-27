import React from "react";

const TimetableName = ({ timetable }) => {
  return (
    <div className="flex items-center justify-center text-xl font-bold text-soft-text px-5 py-3 bg-white border border-border rounded-xl shadow-md mb-5 md:text-2xl">
      <span>
        {timetable.year ? timetable.year : "📌"}.
        {timetable.semester ? timetable.semester : "📌"}.
        {timetable.batch ? timetable.batch : "📌"}.
        {timetable.faculty.code ? timetable.faculty.code : "📌"}.
        {timetable.specialization.code ? timetable.specialization.code : "📌"}.
        {timetable.group ? timetable.group : "📌"}
      </span>
      {timetable.subGroup && (
        <>
          .<span>{timetable.subGroup ? timetable.subGroup : "📌"}</span>
        </>
      )}
    </div>
  );
};

export default TimetableName;
