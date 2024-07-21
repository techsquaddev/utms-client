import React from "react";
import styles from "./sessionCard.module.css";
import { Button } from "../ui/button";
import UpdateSession from "./UpdateSession";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SessionCard = ({ session, onDelete, onUpdate }) => {
  return (
    <div className={` flex ${styles.card}`}>
      <div className={`w-full ${styles.left}`}>
        <h3 className={styles.title}>
          {session.moduleName} ({session.moduleCode})
        </h3>
        <div className={styles.details}>
          <p>
            <strong>Day:</strong> {session.day}
          </p>
          <p>
            <strong>Time:</strong>{" "}
            {new Date(session.time.startTime).toLocaleTimeString()} -{" "}
            {new Date(session.time.endTime).toLocaleTimeString()}
          </p>
          <p>
            <strong>Type:</strong> {session.sessionType}
          </p>
          <p>
            <strong>Location:</strong> {session.location}
          </p>
          {session.coordinator && (
            <p>
              <strong>Coordinator:</strong> {session.coordinator}
            </p>
          )}
          {session.deliveryType && (
            <p>
              <strong>Delivery Type:</strong> {session.deliveryType}
            </p>
          )}
          {session.sessionLink && (
            <p>
              <strong>Link:</strong>{" "}
              <a href={session.sessionLink}>{session.sessionLink}</a>
            </p>
          )}
        </div>
      </div>
      <div className="items-end p-5 justify-center flex">
        <UpdateSession session={session} />
        <Popover>
          <PopoverTrigger>
            <Button className="w-24 ml-2 bg-[#333333] rounded-full">
              Delete
            </Button>
          </PopoverTrigger>
          <PopoverContent side={"top"} className="max-w-fit" align={"end"}>
            <div>Are you sure you want to delete this Session?</div>
            <div className="w-full items-end justify-end flex">
              <Button
                className="w-24 ml-2 mt-2 bg-[#333333]"
                onClick={() => onDelete(session)}
              >
                Confirm
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default SessionCard;
