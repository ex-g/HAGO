import './All.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Wordcounter, Vat, Lifespan, Discount, Bmi, Agecalculator } from ".";

export default function Home(){
    return(
        <>
        <div id="container">
            <div id="sec_user">
                <Link to="/wordcounter">
                    <div className="content" id="content1"><i class="fa-solid fa-font"></i><br/>글자 수 세기<br/>Word Counter</div>
                </Link>
                <Link to="/agecalculator">
                    <div className="content" id="content2"><i class="fa-solid fa-arrow-up-9-1"></i><br/>나이 계산기<br/>Age Calculator</div>
                </Link>
                <Link to="/bmi">
                    <div className="content" id="content3"><i class="fa-solid fa-weight-scale"></i><br/>체질량 계산기<br/>BMI Calculator</div>
                </Link>
                <Link to="/discount">
                    <div className="content" id="content4"><i class="fa-solid fa-percent"></i><br/>할인율 계산기<br/>Discount Calculator</div>
                </Link>
                <Link to="/lifespan">
                    <div className="content" id="content5"><i class="fa-solid fa-calendar-check"></i><br/>수명 계산기<br/>Lifespan</div>
                </Link>
                <Link to="/vat">
                    <div className="content" id="content6"><i class="fa-solid fa-plus"></i><br/>부가세 계산기<br/>VAT Calculator</div>
                </Link>
            </div>
            <div id="sec_name">
                <h1>HAGO</h1>
                <div id="name_desc">Have A Good One!<br/>
                    Python 언어를 기반으로 한 웹 프레임워크인 Django를 이용한 토이프로젝트입니다.
                    HAGO에서 다양한 계산 기능을 경험해보세요!
                </div>
            </div>
        </div>
    </>
            
    )
}