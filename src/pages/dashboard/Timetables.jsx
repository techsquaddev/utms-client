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
    <div className="md:p-4 flex flex-col h-full mb-24 md:mb-0">
      <div className="flex justify-between transition-all duration-500">
        <span className="font-semibold text-2xl">Timetables</span>
      </div>
      <div className="flex mt-8 justify-start md:gap-4 md:pr-4 w-full">
        <Modal
          title="Find Timetable"
          description={searchFormDesc}
          content={<SearchForm />}
        >
          <Button className="md:bg-[#0455bf] bg-transparent rounded-3xl hover:bg-[#0455bf]/75">
            <span className="hidden md:block">Find Your Timetable</span>
            <img src={searchIco} className="w-8 h-8 block md:hidden" />
          </Button>
        </Modal>
        <Modal
          title="Add New Timetable"
          description={addTimetableDesc}
          content={<AddTimetable fetchTimetables={fetchTimetables} />}
        >
          <Button className="md:bg-[#0455bf] bg-transparent text-[#0455bf] md:text-white border border-[#0455bf] hover:bg-[#0455bf]/75 rounded-3xl">
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
                <Button className="md:bg-[#0455bf] border border-[#0455bf] bg-transparent text-[#0455bf] w-full hover:bg-[#0455bf]/75 rounded-none rounded-tl md:rounded-tl-none md:text-white">
                  <span>View Timetable</span>
                </Button>
              </Modal>
              <Button
                onClick={() =>
                  window.open(
                    `/dashboard/timetables/${timetable._id}/sessions`,
                    "_blank"
                  )
                }
                className="md:bg-[#0455bf] border-[#0455bf] bg-transparent text-[#0455bf] w-full hover:bg-[#0455bf]/75 rounded-none rounded-tr md:rounded-tr-none md:text-white border md:border-white/20"
              >
                <span>Manage Sessions</span>
              </Button>
              <Modal
                title="Edit Timetable Data"
                description={editTimetableDesc}
                content={<EditTimetable timetableId={timetable._id} />}
              >
                <Button
                  name="edit"
                  className="md:bg-[#0455bf] w-full hover:bg-[#0455bf]/75 border-[#0455bf] bg-transparent text-[#0455bf] rounded-none md:rounded-bl-none rounded-bl md:text-white border md:border-white/20"
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
                  <Button className="md:bg-[#0455bf] w-full hover:bg-[#0455bf]/75 border border-[#0455bf] bg-transparent text-[#0455bf] rounded-none rounded-br md:rounded-br-none md:rounded-r-xl md:text-white">
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
