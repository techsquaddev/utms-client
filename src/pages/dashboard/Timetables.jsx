import React, { useEffect, useState } from "react";
import SearchForm from "@/components/manageTimetables/SearchForm";
import AddTimetable from "@/components/manageTimetables/AddTimetable";
import ViewTimetable from "@/components/manageTimetables/ViewTimetable";
import EditTimetable from "@/components/manageTimetables/EditTimetable";
import { Button } from "@/components/ui/button";
import { AlertModal, DataLoader, Modal, NotFound } from "@/components";
import { deleteTimetable, getAllTimetables } from "@/api/timetableApi";
import { toast } from "react-toastify";
import { useAuth } from "@/api/authContext";
import searchIco from "@/assets/search.png";
import { Link } from "react-router-dom";

const Timetables = () => {
  const [timetables, setTimetables] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const addTimetableDesc =
      "You can add a new timetable by submitting this form.",
    searchFormDesc = "You can find a specific timetable using this form.",
    viewTimetableDesc = "View Timetable Here",
    editTimetableDesc = "You can edit/ update this timetable here.",
    alertDesc =
      "This action cannot be undone. This will permanently delete selected timetable and all sessions associated with it.";

  const fetchTimetables = async () => {
    try {
      setIsLoading(true);
      const response = await getAllTimetables();
      setTimetables(response.data);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  const handleDelete = async (timetableId) => {
    try {
      const response = await deleteTimetable(timetableId);

      if (response.status === 200) {
        toast.success("Timetable deleted successfully! 🗑️");
        fetchTimetables();
      } else {
        toast.error("Failed to delete the timetable! ❌");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the timetable 😕"
      );
    }
  };

  if (error) {
    return <NotFound />;
  }

  if (isLoading) {
    return <DataLoader />;
  }

  return (
    <div className="md:p-4 flex flex-col h-full">
      <div className="flex justify-between transition-all duration-500">
        <span className="font-semibold text-2xl">Timetables</span>
      </div>
      <div className="flex mt-8 items-center justify-start gap-4">
        <Modal
          title="Find Timetable"
          description={searchFormDesc}
          content={<SearchForm />}
        >
          <Button className="bg-transparent md:bg-primary text-white hover:bg-transparent md:hover:bg-primary/80 rounded-xl">
            <span className="hidden md:block">Find Your Timetable</span>
            <img src={searchIco} className="w-8 h-8 block md:hidden" />
          </Button>
        </Modal>
        <Modal
          title="Add New Timetable"
          description={addTimetableDesc}
          content={<AddTimetable fetchTimetables={fetchTimetables} />}
        >
          <Button className="bg-gray-600 text-white hover:bg-gray-600/80 rounded-xl">
            Add New Timetable
          </Button>
        </Modal>
      </div>
      {/* List */}
      <div className="mt-4 box-border overflow-y-auto scrollbar">
        {timetables.map((timetable) => (
          <div
            className="mt-4 grid pb-4 md:pb-0 md:flex px-4 md:px-0 md:pl-4 md:mr-4 justify-between items-center cursor-pointer rounded md:rounded-xl bg-white hover:rounded-l-xl hover:bg-black/5"
            key={timetable.name}
          >
            <span
              onClick={() =>
                window.open(
                  `/dashboard/timetables/${timetable._id}/sessions`,
                  "_blank"
                )
              }
              className="text-lg my-4 md:my-0 text-gray-700 "
            >
              📅 {timetable.name}
            </span>

            <div className="grid grid-cols-2 md:flex gap-1 md:gap-0">
              <Modal
                title="View Timetable"
                description={viewTimetableDesc}
                content={<ViewTimetable timetableId={timetable._id} />}
              >
                <Button className="bg-primary text-white w-full rounded-none border-r hover:bg-primary/80">
                  <span>View Timetable</span>
                </Button>
              </Modal>
              <Link to={`/dashboard/timetables/${timetable._id}/sessions`}>
                <Button className="bg-gray-600 text-white w-full rounded-none border-r hover:bg-gray-600/80">
                  <span>Manage Sessions</span>
                </Button>
              </Link>
              <Modal
                title="Edit Timetable Data"
                description={editTimetableDesc}
                content={<EditTimetable timetableId={timetable._id} />}
              >
                <Button
                  name="edit"
                  className="bg-gray-600 text-white w-full rounded-none border-r hover:bg-gray-600/80"
                >
                  <span>Edit</span>
                </Button>
              </Modal>
              {user?.role === "admin" && (
                <AlertModal
                  title="Confirm Deletion"
                  description={alertDesc}
                  action={() => handleDelete(timetable._id)}
                >
                  <Button className="bg-gray-600 text-white w-full rounded-none hover:bg-gray-600/80">
                    Delete
                  </Button>
                </AlertModal>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetables;
