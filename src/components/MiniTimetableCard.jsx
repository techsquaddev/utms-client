import { Clock } from ".";
import { timetableBg, ad } from "@/assets";

const MiniTimetableCard = ({ timetable }) => {
  const getBackgroundImage = () => {
    if (
      timetable.year === "Y5" &&
      timetable.faculty.code === "FOC" &&
      timetable.semester === "S1"
    ) {
      return `url(${ad})`;
    } else {
      return `url(${timetableBg})`;
    }
  };

  const backgroundImageStyle = {
    backgroundImage: getBackgroundImage(),
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="flex justify-end h-40 p-3 bg-white rounded-xl shadow-md gap-5"
      style={backgroundImageStyle}
    >
      {timetable.year === "Y5" &&
      timetable.faculty.code === "FOC" &&
      timetable.semester === "S2" ? (
        ""
      ) : (
        <Clock />
      )}
    </div>
  );
};

export default MiniTimetableCard;
