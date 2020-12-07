import React, { Fragment, useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { gql, useQuery } from "@apollo/client";

// { getMetrics, selectOption }
const Selector = ({ selectOption }) => {
  const GET_MESSAGES = gql`
    query {
      getMetrics
    }
  `;

  const [options, setOptions] = useState([]);
  const { data } = useQuery(GET_MESSAGES);

  useEffect(() => {
    if (!data) {
      return;
    } else {
      const filters = data.getMetrics.map((data) => {
        return { key: data, text: data, value: data };
      });

      return setOptions([...options, ...filters]);
    }
  }, [data]);

  const optionHandler = (e, data) => {
    selectOption(data.value);
  };

  return (
    <Fragment>
      {data ? (
        <Dropdown
          onChange={optionHandler}
          style={{ width: "600px" }}
          placeholder="Select"
          multiple
          selection
          options={options}
          fluid
        />
      ) : null}
    </Fragment>
  );
};

export default Selector;
