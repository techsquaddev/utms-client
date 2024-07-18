import { FindTimetable, Wrapper } from "@/components";
import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

const Find = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Wrapper>
        <button
          className="mb-5 bg-white border border-border p-2 shadow-lg rounded-lg hover:bg-soft-gray transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          <ArrowBackIosNewIcon className="text-soft-text" />
        </button>
        <FindTimetable />
        <div className="mt-7 mb-4 p-5 bg-white border-2 border-primary rounded-3xl shadow-lg">
          <p className="text-soft-text text-center text-sm">
            You only have to find your timetable once. Then every time you visit
            SLIIT TMS, it will be directly displayed to you. We recommend adding
            SLIIT TMS as an app shortcut.
          </p>
        </div>
        <div className="p-5 bg-white border-2 border-secondary rounded-3xl shadow-lg">
          <p className="text-soft-text text-center text-sm">
            Some timetables may not be available in our system, if you can't
            find your timetable, please contact us by sending an email. We
            encourage batch representatives to inform us about timetable
            changes.
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

export default Find;
