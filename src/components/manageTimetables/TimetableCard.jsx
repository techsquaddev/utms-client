import React from "react";
import { AlertModal, Modal } from "..";
import EditTimetable from "./EditTimetable";
import { deleteTimetable } from "@/api/timetableApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TimetableCard = ({ timetable, fetchTimetable }) => {
  const navigate = useNavigate();

  const editTimetableDesc = "You can edit/ update this timetable here.";
  const alertDesc =
    "This action cannot be undone. This will permanently delete selected timetable and all sessions associated with it.";

  const handleDelete = async () => {
    try {
      const response = await deleteTimetable(timetable._id);

      if (response.status === 200) {
        toast.success("Timetable deleted successfully! 🗑️");
        navigate("/dashboard/timetables");
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

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        {timetable.name}
      </h2>
      <div className="flex flex-col gap-2">
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
      </div>
      <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
        <Modal
          title="Edit Timetable Data"
          description={editTimetableDesc}
          content={
            <EditTimetable
              timetableId={timetable._id}
              fetchTimetable={fetchTimetable}
            />
          }
        >
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto">
            Update
          </button>
        </Modal>
        <AlertModal
          title="Confirm Deletion"
          description={alertDesc}
          action={() => handleDelete()}
        >
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full sm:w-auto">
            Delete
          </button>
        </AlertModal>
      </div>
    </div>
  );
};

export default TimetableCard;
