import React from "react";
import styles from "./sessionCard.module.css";
import { Modal, UpdateSession } from "..";

const sessionCard = ({ session, fetchSessions }) => {
  const editSessionDesc = "Edit session data here.";
  return (
    <div className={styles.card}>
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
      <div className={styles.buttons}>
        <Modal
          title="Edit Session Data"
          description={editSessionDesc}
          content={
            <UpdateSession
              currentSessionId={session._id}
              fetchSessions={fetchSessions}
            />
          }
        >
          <button className={styles.updateButton}>Update</button>
        </Modal>
        <button className={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
};

export default sessionCard;
