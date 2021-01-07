import React, { useState, useEffect } from "react";
import RecordService from "../services/record.service";
import { MDBDataTableV5 } from 'mdbreact';
import { useParams } from 'react-router';

const Records = () => {
  const { userId } = useParams();
  const [datatable, setDatatable] = React.useState();

  var columns = [
    {
      label: 'Enterance date',
      field: 'start',
      width: 150,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'Enterance date',
      },
    },
    {
      label: 'Exit date',
      field: 'end',
      width: 270,
    },
    {
      label: 'Duration',
      field: 'duration',
      width: 270,
    },
  ];

  useEffect(() => {
    RecordService.records(userId).then(
    (response) => {
      console.log(response);
      var rows = response.data.data;
      var dataTableData = {columns:columns,rows:rows};
      setDatatable(dataTableData); 

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

  return <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} searchTop searchBottom={false} />;
};

export default Records;
