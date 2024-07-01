import React, { useState } from "react";
import styles from "./addTimetableStepper.module.css";
import { ManageSessions } from "../../components";

const AddTimetableStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timetable, setTimetable] = useState({
    group: "",
    subGroup: "",
    year: "",
    semester: "",
    batch: "",
    faculty: "",
    specialization: "IT",
    status: "Pending",
    sessions: [],
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    {
      title: "Add Timetable Details",
      component: (
        <AddTimetableDetails
          timetable={timetable}
          setTimetable={setTimetable}
          nextStep={nextStep}
        />
      ),
    },
    {
      title: "Manage Sessions",
      component: (
        <ManageSessions
          timetable={timetable}
          setTimetable={setTimetable}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
    },
    {
      title: "Review and Submit",
      component: <ReviewAndSubmit timetable={timetable} prevStep={prevStep} />,
    },
  ];

  return (
    <div className={styles.stepper}>
      <div className={styles.stepperContainer}>
        <h1 className={styles.heading}>{steps[currentStep].title}</h1>
        <div className={styles.stepContent}>{steps[currentStep].component}</div>
        <div className={styles.navigation}>
          {currentStep > 0 && (
            <button onClick={prevStep} className={styles.navButton}>
              Previous
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button onClick={nextStep} className={styles.navButton}>
              Next
            </button>
          ) : (
            <button
              onClick={() => console.log("Submit Timetable:", timetable)}
              className={styles.navButton}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTimetableStepper;
