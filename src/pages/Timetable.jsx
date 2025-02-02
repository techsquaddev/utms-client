import { useEffect, useState } from "react";
import {
  AlertModal,
  NotFound,
  SessionsContainer,
  TimetableName,
  TimetableSkeleton,
  Wrapper,
} from "../components";
import { useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import MiniTimetableCard from "@/components/MiniTimetableCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "react-toastify";
import { getSpecificTimetable } from "@/api/timetableApi";

const Timetable = () => {
  const { timetableId } = useParams();
  const [timetable, setTimetable] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [isTimetable, setIsTimetable] = useState(false);
  const [prevTimetable, setPrevTimetable] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const alertDesc =
      "This action cannot be undone. This will permanently delete your timetable from the local storage.",
    alertSaveDesc =
      "This action cannot be undone. This will remove your previously saved timetable from the local storage.";

  const fetchTimetable = async () => {
    try {
      const localStorageTimetable = localStorage.getItem("timetable");
      if (localStorageTimetable) {
        setPrevTimetable(true);
        const details = JSON.parse(localStorageTimetable);
        if (details._id === timetableId) {
          setTimetable(details);
          setSessions(details.sessions);
          setIsTimetable(true);
          return;
        }
      }

      // Fetch from the database if not found in local storage
      const response = await getSpecificTimetable(timetableId);
      setTimetable(response.data);
      setSessions(response.data.sessions);
    } catch (error) {
      setError(error);
      toast.error("Error loading timetable! 😕");
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, [timetableId]);

  if (error) {
    return <NotFound />;
  }

  if (!timetable) {
    return (
      <div>
        <TimetableSkeleton />
      </div>
    );
  }

  const goBack = () => {
    if (prevTimetable) {
      localStorage.removeItem("timetable");
    }
    navigate("/timetables/find");
  };

  const saveTimetable = () => {
    if (prevTimetable) {
      localStorage.removeItem("timetable");
    }
    localStorage.setItem("timetable", JSON.stringify(timetable));
    toast.success("Timetable saved successfully! 🥳");
    fetchTimetable();
  };

  return (
    <div>
      <Wrapper>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-6">
            <AlertModal
              title="Are you absolutely sure?"
              description={alertDesc}
              action={goBack}
            >
              <button className="bg-soft-red border border-red-alert p-2 shadow-lg rounded-lg hover:bg-soft-gray transition-colors duration-300">
                <ArrowBackIosNewIcon className="text-red-alert" />
              </button>
            </AlertModal>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/timetables/find">Find</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Timetable</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {!isTimetable &&
            (prevTimetable ? (
              <AlertModal
                title="Are you absolutely sure?"
                description={alertSaveDesc}
                action={saveTimetable}
              >
                <button className="bg-green-100 border text-green-600 font-medium border-green-600 py-2 px-3 shadow-lg rounded-lg hover:bg-green-50 transition-colors duration-300">
                  SAVE
                </button>
              </AlertModal>
            ) : (
              <button
                onClick={saveTimetable}
                className="bg-green-100 border text-green-600 font-medium border-green-600 py-2 px-3 shadow-lg rounded-lg hover:bg-green-50 transition-colors duration-300"
              >
                SAVE
              </button>
            ))}
        </div>

        <TimetableName timetable={timetable} />
        <MiniTimetableCard timetable={timetable} />
        <SessionsContainer sessions={sessions} />
      </Wrapper>
    </div>
  );
};

export default Timetable;
