import React from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import Group from "../../static/group.png";

const Mobilecontact = () => {
  return (
    <>
      <div
        className="container-fluid"
        style={{
          overflow: "hidden",
          boxShadow: "none",
          borderBottom: "2px solid grey",
        }}
      >
        <div className="row margin-top  content">
          <h1
            style={{ color: "#0072bc", textAlign: "center", fontSize: "24px" }}
          >
            {" "}
            Customer Support{" "}
          </h1>

          <img
            src={Group}
            alt=""
            style={{ transform: "scale(0.9)", marginLeft: "22%", width: "50%" }}
          ></img>
        </div>
        <div className="col-sm-8">
          <div className="row">
            <div className="col-sm-12 block2 ">
              <h2
                style={{
                  marginTop: "10%",
                  marginLeft: "10%",
                  textAlign: "center",
                  fontSize: "19px",
                  color: "grey",
                  marginRight: "10%",
                }}
              >
                {" "}
                For any assistance, you can connect with the Customer Support at
                :
              </h2>
              <div
                className="col-md-10"
                style={{ marginTop: "10px", textAlign: "left" }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    textAlign: "center",
                    color: "#0072bc",
                    marginRight: "20px",
                  }}
                >
                  <MdEmail size={50} />{" "}
                  <Link to="experts@lawtarazoo.com">
                    experts@lawtarazoo.com
                  </Link>
                </p>
                <p
                  style={{
                    fontSize: "19px",
                    textAlign: "center",
                    marginTop: "30px",
                    color: "#0072bc",
                    marginRight: "75px",
                  }}
                >
                  <FiPhoneCall size={40} /> +91-9619792288
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 hidden-xs empty-block"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mobilecontact;
