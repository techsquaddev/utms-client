import { Wrapper } from "@/components";
import { about } from "@/assets";

const About = () => {
  return (
    <div>
      <Wrapper>
        <div className="mt-10">
          <h1 className="text-center text-xl text-text font-bold md:text-2xl">
            About SLIIT 360
          </h1>
          <div className="mt-7 mb-4 p-5 mx-5 bg-white border-2 border-secondary rounded-3xl shadow-md">
            <p className="text-soft-text text-left text-sm md:text-base">
              <span className="font-semibold bg-secondary">
                Welcome to SLIIT 360, an online material hub for all students at
                SLIIT!
              </span>{" "}
              <br />
            </p>
            <br />
            <p className="text-soft-text text-left text-sm md:text-base">
              In this platform, we made it our goal to give everyone access to
              user-friendly timetables as opposed to hard-to-read HTML
              schedules. In the near future, we plan to add important links and
              notices here as well.
            </p>
          </div>

          <div className="mb-4 p-5 mx-5 bg-white border-2 border-secondary rounded-3xl shadow-md">
            <p className="text-soft-text text-left text-sm md:text-base">
              Currently, we are still adding timetables to the system, so you
              may find some timetables unavailable.
            </p>
            <br />
            <p className="text-soft-text text-left text-sm md:text-base">
              If someone finds that their timetables are missing from the
              system, they can add their timetable by registering with the
              system.
            </p>
          </div>

          <div className="p-5 mx-5 bg-white border-2 border-secondary rounded-3xl shadow-md">
            <p className="text-soft-text text-left text-sm md:text-base">
              We warmly invite all SLIIT students to register with the system
              and contribute to the collection of timetables. 😊
            </p>
          </div>

          <div className="p-5 mx-auto  md:p-10">
            <img src={about} alt="about" className="w-full object-cover" />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default About;
