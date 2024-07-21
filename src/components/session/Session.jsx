/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styles from "./session.module.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccessTime, CorporateFare } from "@mui/icons-material";

const Session = ({ session, currentDay }) => {
  const now = new Date();
  const sessionTime = new Date();
  sessionTime.setHours(session.time.startTime.split(":")[0]);
  sessionTime.setMinutes(session.time.startTime.split(":")[1]);

  const isCurrentSession =
    currentDay &&
    now >= sessionTime &&
    now <= sessionTime.setMinutes(sessionTime.getMinutes() + 90);

  return (
    <div
      className={`${`bg-white border border-border rounded-lg p-5 my-2.5`} ${
        isCurrentSession ? "bg-secondary" : ""
      }`}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="">
              <h2 className="text-xl text-text font-bold mb-2 md:text-2xl">
                {session.moduleName}
              </h2>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex items-center justify-start gap-1 py-1 px-2 rounded-md bg-primary text-white w-fit">
                  <AccessTime
                    fontSize="string"
                    className="text-lg md:text-xl"
                  />
                  <p className="text-sm font-medium md:text-base">
                    {new Date(session.time.startTime).toLocaleTimeString()} -{" "}
                    {new Date(session.time.endTime).toLocaleTimeString()}
                  </p>
                </div>

                <div className="flex items-center justify-start gap-1 py-1 px-2 rounded-md bg-secondary text-white w-fit">
                  <CorporateFare
                    fontSize="string"
                    className="text-lg md:text-xl"
                  />
                  <p className="text-sm font-medium md:text-base">
                    {session.location}
                  </p>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Session;
