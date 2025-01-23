import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AccessTime,
  CorporateFare,
  Book,
  VpnKey,
  AccountCircle,
  Link,
  RssFeed,
} from "@mui/icons-material";
import { formatTime } from "@/lib/utils";

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
      className={`${`bg-gradient-to-t from-soft-blue to-white rounded-xl border border-border p-5 my-2.5 md:my-3`} ${
        isCurrentSession ? "border-secondary" : ""
      }`}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="">
              <h2 className="text-xl text-text font-bold mb-2 md:text-2xl">
                {session.moduleName}
              </h2>
              <div className="flex flex-col gap-1 md:flex-row md:gap-2">
                <div className="flex items-center justify-start gap-1.5 py-1 px-2 rounded-md bg-primary text-white w-fit">
                  <AccessTime
                    fontSize="string"
                    className="text-lg md:text-xl"
                  />
                  <p className="text-sm font-medium md:text-base">
                    {formatTime(session.time.startTime)} -{" "}
                    {formatTime(session.time.endTime)}
                  </p>
                </div>

                <div className="flex items-center justify-start gap-1.5 py-1 px-2 rounded-md bg-secondary text-white w-fit">
                  <CorporateFare
                    fontSize="string"
                    className="text-lg md:text-xl"
                  />
                  <p className="text-sm font-medium md:text-base">
                    {session.location}
                  </p>
                </div>
              </div>

              <div className="mt-1 flex gap-1 md:gap-2 md:mt-2">
                <div className="flex items-center justify-start gap-1.5 py-1 px-2 rounded-md bg-primary text-white w-fit">
                  <Book fontSize="string" className="text-lg md:text-xl" />
                  <p className="text-sm font-medium md:text-base">
                    {session.sessionType}
                  </p>
                </div>

                <div className="flex items-center justify-start gap-1.5 py-1 px-2 rounded-md bg-secondary text-white w-fit">
                  <RssFeed fontSize="string" className="text-lg md:text-xl" />
                  <p className="text-sm font-medium md:text-base">
                    {session.deliveryType}
                  </p>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="mt-4 border-t border-border">
            <div className="flex flex-col gap-1 md:flex-row md:gap-2">
              <div className="flex items-center justify-start gap-1.5 py-1 px-2 rounded-md bg-soft-gray text-soft-text w-fit">
                <VpnKey fontSize="string" className="text-lg md:text-xl" />
                <p className="text-sm font-medium md:text-base">
                  {session.moduleCode}
                </p>
              </div>
              {session.coordinator && (
                <div className="flex items-center justify-start gap-1.5 py-1 px-2 rounded-md bg-soft-gray text-soft-text w-fit">
                  <AccountCircle
                    fontSize="string"
                    className="text-lg md:text-xl"
                  />
                  <p className="text-sm font-medium md:text-base">
                    {session.coordinator}
                  </p>
                </div>
              )}
            </div>
            {session.sessionLink && (
              <div className="mt-1 flex items-center justify-start gap-1.5 py-1 px-2 rounded-md bg-soft-gray text-soft-text w-fit md:mt-2">
                <Link fontSize="string" className="text-lg md:text-xl" />
                <p className="text-sm font-medium md:text-base">
                  {session.sessionLink}
                </p>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Session;
