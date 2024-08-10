import { Wrapper } from "@/components";
import { contact } from "@/assets";

const Contact = () => {
  return (
    <div>
      <Wrapper>
        <div className="mt-10">
          <h1 className="text-center text-xl text-text font-bold">
            Contact Us
          </h1>
          <div className="mt-7 mb-4 p-5 mx-5 bg-white border-2 border-secondary rounded-3xl shadow-lg">
            <p className="text-soft-text text-left text-sm md:text-base">
              <span className="font-semibold bg-secondary">
                SLIIT 360 is an online material hub for SLIIT students.
              </span>{" "}
              In particular, we focus on providing user-friendly timetables
              instead of hard-to-read HTML schedules. In the near future, we
              plan to add important links and notices as well.
            </p>
            <br />
            <p className="text-soft-text text-left text-sm md:text-base">
              Currently, we are adding timetables to the system, so some
              timetables may not be available in the system. If you can't find
              your timetable, send us an email and we'll add it as soon as
              possible. But in the near future, we hope to provide features to
              add timetables yourself. So stay with us.
            </p>
          </div>
          <div className="p-5 mx-auto md:p-10">
            <img src={contact} alt="contact" className="w-full object-cover" />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Contact;
