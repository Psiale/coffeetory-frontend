/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
import axios from 'axios';
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import { fetchPostRawMaterials } from '../../redux/actions/data';
import { createInput } from '../../helpers';

const RawMaterialComponent = ({ fetchPostRawMaterials, business }) => {
  const [values, setValues] = useState({
    name: '',
    totalAmount: '',
  });
  // const history = useHistory();

  const handleSubmit = event => {
    console.log(axios.defaults.headers.common);
    fetchPostRawMaterials(`business/${business.id}/raw_materials`,
      {
        name: values.name,
        total_amount: values.totalAmount,
        remaining_amount: values.totalAmount,
      }).then(
      event.preventDefault(),
      console.log(
        {
          name: values.name,
          totalAmount: values.totalAmount,
          remainingAmount: values.totalAmount,
        },
      ),
    );
  };
  const handleChange = evt => {
    const { value } = evt.target;
    setValues({
      ...values,
      [evt.target.name]: value,
    });

    console.log(values);
  };

  return (
    <>
      <span> Add a new Raw Material </span>
      <form onSubmit={handleSubmit}>
        {createInput('name', values.name, handleChange)}
        {createInput('totalAmount', values.totalAmount, handleChange)}
        <input type="submit" value="Create Raw Material" />
      </form>
    </>
  );
};

RawMaterialComponent.propTypes = {
  fetchPostRawMaterials: Proptypes.func.isRequired,
  business: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }).isRequired,
};

const mapStateToProps = state => ({
  loading: state.dataStore.loading,
  business: state.dataStore.business,
});

const mapDispatchToProps = dispatch => ({
  fetchPostRawMaterials: (endpoint, data) => dispatch(fetchPostRawMaterials(endpoint, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialComponent);
