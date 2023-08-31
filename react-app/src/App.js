import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Wordcounter, Vat, Lifespan, Discount, Bmi, Agecalculator, Home } from "./Page"
import DisplayAds from './DisplayAds';


export default function App() {
  return (
    <BrowserRouter>
      <nav><Link to="/">HAGO</Link></nav>
      <div id="menu">
        <li id="link1"><Link to="/wordcounter">글자 수 세기</Link></li>
        <li id="link2"><Link to="/agecalculator">나이 계산기</Link></li>
        <li id="link3"><Link to="/bmi">체질량 계산기</Link></li>
        <li id="link4"><Link to="/discount">할인율 계산기</Link></li>
        <li id="link5"><Link to="/lifespan">수명 계산기</Link></li>
        <li id="link6"><Link to="/vat">부가세 계산기</Link></li>
      </div>

      <DisplayAds/>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/wordcounter" element={<Wordcounter/>}/>
      <Route path="/agecalculator" element={<Agecalculator/>}/>
      <Route path="/bmi" element={<Bmi/>}/>
      <Route path="/discount" element={<Discount/>}/>
      <Route path="/lifespan" element={<Lifespan/>}/>
      <Route path="/vat" element={<Vat/>}/>
    </Routes>
    <div id="sec_desc"></div>
    </BrowserRouter>
  );
}