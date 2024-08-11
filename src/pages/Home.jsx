import React from "react";
import object from "../assets/object.png";
import { Wrapper } from "../components";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Wrapper>
      <div className="pt-16">
        <h1 className="text-center font-bold text-xl text-text md:text-2xl">
          Welcome to SLIIT 360!
        </h1>

        <div className="px-4 md:px-10">
          <div className="mt-7 mb-4 p-5 bg-white border-2 border-secondary rounded-3xl shadow-lg">
            <p className="text-soft-text text-center text-sm md:text-base">
              Find your timetable once. It will automatically save to your
              browser!
            </p>
          </div>
          <div className="flex justify-center -mt-10 w-96">
            <img src={object} alt="object" className="w-full object-contain" />
          </div>
          <div className="mt-7">
            <Link to="/timetables/find">
              <button
                type="submit"
                className="px-6 py-4 w-full text-xl font-semibold bg-primary shadow-lg text-white rounded-lg hover:bg-dark-blue transition-colors duration-300"
              >
                Find My Timetable
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
