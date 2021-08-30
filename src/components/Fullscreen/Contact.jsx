import React from "react";
import { MdEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import Group from "../../static/group.png";
const Contact = () => {
  return (
    <>
      <div
        className="container"
        style={{ overflow: "hidden", boxShadow: "none" }}
      >
        <div className="row margin-top">
          <div
            className="col-sm-4 block1"
            style={{ justifySelf: "center", borderRight: "1px solid grey" }}
          >
            <img
              src={Group}
              alt=""
              style={{
                transform: "scale(0.9)",
                marginLeft: "50px",
                marginRight: "auto",
                width: "50%",
              }}
            ></img>
            <h4 style={{ color: "#0072bc", marginLeft: "60px" }}>
              Customer Support{" "}
            </h4>
          </div>
          <div className="col-sm-8">
            <div className="row">
              <div className="col-sm-12 block2">
                <h4 style={{ marginTop: "20px", marginLeft: "20px" }}>
                  {" "}
                  For any assistance, you can connect with the Customer Support
                  at :
                </h4>
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
                    <MdEmail size={50} /> experts@lawtarazoo.com
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
      </div>
    </>
  );
};

export default Contact;
