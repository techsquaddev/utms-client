import { useEffect, useState } from "react";
import { SessionsContainer, TimetableName, Wrapper } from "../components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MiniTimetableCard from "@/components/miniTimetableCard/MiniTimetableCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getSpecificTimetable } from "@/api/timetableApi";

const Timetable = () => {
  const { timetableId } = useParams();
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const localStorageTimetable = localStorage.getItem("timetable");
        if (localStorageTimetable) {
          const details = JSON.parse(localStorageTimetable);
          if (details._id === timetableId) {
            setTimetable(details);
            return;
          }
        }

        // Fetch from the database if not found in local storage
        const response = await getSpecificTimetable(timetableId);
        setTimetable(response);
      } catch (error) {
        setError(error.response.message);
      }
    };

    fetchTimetable();
  }, [timetableId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDay(now.getDay());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!timetable) {
    return <div>Loading...</div>;
  }

  const backPage = async () => {
    const timetable = localStorage.getItem("timetable");
    if (timetable) {
      localStorage.removeItem("timetable");
    }
    navigate("/timetables/find");
  };

  return (
    <div>
      <Wrapper>
        <div className="flex items-center gap-6 mb-5">
          <AlertDialog>
            <AlertDialogTrigger>
              <button className="bg-soft-red border border-red-alert p-2 shadow-lg rounded-lg hover:bg-soft-gray transition-colors duration-300">
                <ArrowBackIosNewIcon className="text-red-alert" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your timetable from the local storage.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => backPage()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

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

        <TimetableName timetable={timetable} />
        <MiniTimetableCard />
        <SessionsContainer sessions={timetable.sessions} />
      </Wrapper>
    </div>
  );
};

export default Timetable;
