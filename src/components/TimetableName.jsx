import React from "react";

const TimetableName = ({ timetable }) => {
  return (
    <div className="flex items-center justify-center text-xl font-bold text-soft-text px-5 py-3 bg-white border border-border rounded-xl shadow-md mb-5 md:text-2xl">
      <span>
        {timetable.year ? timetable.year : "Y"}.
        {timetable.semester ? timetable.semester : "S"}.
        {timetable.batch ? timetable.batch : "B"}.
        {timetable.faculty ? timetable.faculty : "F"}.
        {timetable.specialization ? timetable.specialization : "SPEC"}.
        {timetable.group ? timetable.group : "G"}
      </span>
      {timetable.subGroup && (
        <>
          .<span>{timetable.subGroup ? timetable.subGroup : "SG"}</span>
        </>
      )}
    </div>
  );
};

export default TimetableName;
