import { MDBBtn } from "mdbreact";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RecordService from "../services/record.service";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [recordStatus, setRecordStatus] = useState("");
  const [isEntered, setIsEntered] = useState(false);
  
  useEffect(() => {
    RecordService.lastRecord().then(
      (response) => {
        let record = response.data.data;
        if(record){
          let recordsRendered = "";
          if(record.end == null){
            recordsRendered = "You entered at "+record.start;
            setIsEntered(true);
          }else{
            recordsRendered = "You have'nt entered yet";
            setIsEntered(false);
          }
        setRecordStatus(recordsRendered);
      }
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

          console.log(_content);
      }
    );
  }, []);

  /** on enter */
  const handleEnter = (e) => {
    RecordService.enter().then(
      (response) => {
        setRecordStatus("You entered at "+response.data.data.start);
        setIsEntered(true);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

          console.log(_content);
      }
    );
  };

  /** on exit */
  const handleExit = (e) => {
    RecordService.exit().then(
      (response) => {
        setRecordStatus("You exited at "+response.data.data.end);
        setIsEntered(false);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

          console.log(_content);
      }
    );
  };

  return (
    <div>
      <h1>{currentUser.companyName}</h1>
      {currentUser.isCompanyOwner 
      ? 
      <p>You can manage your workers attendance from here</p>
      : 
      <div>
      <p>{recordStatus}</p>
      <MDBBtn color="success" size="lg" disabled={isEntered} onClick={handleEnter}>
        Enter
      </MDBBtn>
      <MDBBtn color="danger" size="lg" disabled={!isEntered} onClick={handleExit}>
        Exit
      </MDBBtn>
      </div>
      }
    </div>
  );
};

export default Home;
