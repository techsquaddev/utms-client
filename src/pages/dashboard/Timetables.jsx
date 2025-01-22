import React, { useEffect, useState } from "react";
import SearchForm from "@/components/manageTimetables/SearchForm";
import AddTimetable from "@/components/manageTimetables/AddTimetable";
import ViewTimetable from "@/components/manageTimetables/ViewTimetable";
import EditTimetable from "@/components/manageTimetables/EditTimetable";
import { Button } from "@/components/ui/button";
import { AlertModal, Modal } from "@/components";
import { deleteTimetable, getAllTimetables } from "@/api/timetableApi";
import { toast } from "react-toastify";
import { useAuth } from "@/api/authContext";

const Timetables = () => {
  const [timetables, setTimetables] = useState([]);
  const [error, setError] = useState(null);
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
      const response = await getAllTimetables();
      setTimetables(response.data);
    } catch (error) {
      setError(error.response.data.message);
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
    return <div>Error: {error}</div>;
  }

  if (!timetables) {
    return <div>Where be the timetables?!</div>;
  }

  return (
    <div className="p-4 flex flex-col w-full h-[90%]">
      <div className="flex justify-between h-fit">
        <span className="text-2xl">Timetables</span>
      </div>
      <div className="flex mt-8 justify-between w-full">
        <Modal
          title="Find Timetable"
          description={searchFormDesc}
          content={<SearchForm />}
        >
          <Button className="bg-[#333333] rounded-3xl">
            Find Your Timetable
          </Button>
        </Modal>
        <Modal
          title="Add New Timetable"
          description={addTimetableDesc}
          content={<AddTimetable fetchTimetables={fetchTimetables} />}
        >
          <Button className="bg-[#333333] rounded-3xl">
            Add New Timetable
          </Button>
        </Modal>
      </div>
      {/* List */}
      <div className="mt-6 px-8 h-inherit box-border overflow-y-auto scrollbar">
        {timetables.map((timetable) => (
          <div
            className="mt-4 px-5 flex justify-between items-center cursor-pointer rounded-xl bg-white hover:rounded-l-xl hover:bg-gray-100"
            key={timetable.name}
          >
            <span
              onClick={() =>
                window.open(
                  `/dashboard/timetables/sessions/${timetable._id}`,
                  "_blank"
                )
              }
              className="text-lg text-gray-700"
            >
              📅 {timetable.name}
            </span>

            <div className="flex">
              <Modal
                title="View Timetable"
                description={viewTimetableDesc}
                content={<ViewTimetable timetableId={timetable._id} />}
              >
                <Button className="bg-[#333333] rounded-none text-white">
                  <span>View Timetable</span>
                </Button>
              </Modal>
              <Button
                onClick={() =>
                  window.open(
                    `/dashboard/timetables/sessions/${timetable._id}`,
                    "_blank"
                  )
                }
                className="bg-[#333333] rounded-none text-white"
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
                  className="bg-[#333333] rounded-none text-white border border-white/20"
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
                  <Button className="bg-[#333333] rounded-none rounded-r-2xl text-white">
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
