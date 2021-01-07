import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import ModalAddUser from "./ModalAddUser";
import { MDBDataTableV5 } from 'mdbreact';
import { useDispatch, useSelector } from "react-redux";
import { setUserList } from "../actions/users";

const Users = () => {
  const [datatable, setDatatable] = React.useState();
  const { usersList: usersList } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  var columns = [
    {
      label: 'Name',
      field: 'name',
      width: 270,
    },
    {
      label: 'Email',
      field: 'email',
      width: 270,
    },
  ];

  useEffect(() => {
    dispatch(setUserList());
  }, []);

  useEffect(() => {
      var rows = usersList;
      var dataTableData = {columns:columns,rows:rows};
      setDatatable(dataTableData);
  }, [usersList]);



  return (<div>
    <ModalAddUser/><MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} searchTop searchBottom={false} />
  </div>);
};

export default Users;
