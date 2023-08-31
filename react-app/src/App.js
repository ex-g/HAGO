import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Wordcounter, Vat, Lifespan, Discount, Bmi, Agecalculator, Home } from "./Page"
import $ from 'jquery';
import DisplayAds from './DisplayAds';


export default function App() {

  // menu를 보여줌.
  function show_menu(){
    $("#menu").css("display", "");
    $("bar").css("display", "none");
  };

  if (matchMedia("screen and (min-width: 320px) and (max-device-width: 1023px)").matches){
    // 기본 실행 함수 : menu를 숨김.
    $(document).ready(function() {
      $("#menu").css("display", "none");
    });

    // menu 레이어 바깥 아무데나 클릭하면 레이어가 사라짐.
    $(function(){
      $(document).mousedown(function( e ){
        if( $("#menu").is(":visible") ) {
          $("#menu").each(function(){
            var l_position = $(this).offset();
            l_position.right = parseInt(l_position.left) + ($(this).width());
            l_position.bottom = parseInt(l_position.top) + parseInt($(this).height());
    
            if( ( l_position.left <= e.pageX && e.pageX <= l_position.right )
              && ( l_position.top <= e.pageY && e.pageY <= l_position.bottom ) ) {
            } else {
              $(this).hide();
            }
          });
        }
      });
      
      $("bar").click(function(){
        if( !$("#menu").is(":visible") ) {
          $("#menu").show();
        }
      });
    });
  }

  return (
    <BrowserRouter>
      <nav><Link to="/">HAGO</Link></nav>
      <i class="fa-solid fa-bars" id="bar" onClick={show_menu}></i>
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