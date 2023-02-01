import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AddPerson from "./pages/AddPerson";
import EditPerson from "./pages/EditPerson";


import { useDispatch, useSelector } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";
import api from "./api/api";
import urls from "./api/urls";

function App() {
  const dispatch = useDispatch();
  const { personsState } = useSelector((state) => state);

  useEffect(() => {
    /* fetch persons */
    dispatch({ type: actionTypes.personActions.GET_PERSONS_START });
    api
      .get(urls.persons)
      .then((res) => {
        dispatch({
          type: actionTypes.personActions.GET_PERSONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.personActions.GET_PERSONS_FAIL,
          payload: "Serverda bir hata oluştu",
        });
      });
    
    
      
      
  }, []);

  if (personsState.success === false)
    return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-person" element={<AddPerson />} />
        <Route path="/edit-person/:personId" element={<EditPerson />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;