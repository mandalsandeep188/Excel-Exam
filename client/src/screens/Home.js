import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Service from "../Components/Service";

export default function Home() {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 welcome order-2 order-lg-1">
            <h1>Welcome to Excel Exam</h1>
            <h6>
              Here you can test your knowledge by practicing in real exam
              format. Make your own tests and track your progress to improve.
              So, start excelling exams today.
            </h6>
            <button type="button" className="btn btn-primary">
              Start Now
            </button>
          </div>
          <div className="col-md-6 order-1">
            <img src="school.png" className="img-fluid"></img>
          </div>
        </div>
        <div className="row services">
          <h1 className="text-center">Our Services</h1>
          <Service
            icon="laptop"
            title="Online Tests"
            description="Take online tests in environment same as exams with proper
                  time limit and question structure. Questions are close as exam
                  types and some previous year questions."
          />
          <Service
            icon="line-chart"
            title="Practice to Improve"
            description="Make your own tests with choice of number of questions and
                    time limit. You can practice anytime from your selected
                    chapters,subject, or class to excel in each aspects of exam."
          />
          <Service
            icon="pie-chart"
            title="Proper analysis"
            description="We record your progress and give proper analysis of each test
                    so that your improvement can be visible to you. Your profile
                    have all your test results with progress report."
          />
        </div>
        {/* TODO: 1. Typing test with a vector 
                  2. Footer with social icons */}
      </div>
    </>
  );
}
