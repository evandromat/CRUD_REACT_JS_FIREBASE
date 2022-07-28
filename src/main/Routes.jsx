import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";
import UserCrud from "../components/users/UserCrud";

export default props =>
    <Routes>
        <Route exact path='/' element={<Home></Home>}></Route>
        <Route path='/users' element={<UserCrud></UserCrud>}></Route>
        <Route path='*' element={<Home></Home>}></Route>
    </Routes>