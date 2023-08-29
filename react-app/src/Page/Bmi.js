import './All.css';
import $ from 'jquery';

export default function Bmi(){
    // 기본 실행 함수: 현재 표시 상태를 숨김
    $(document).ready(function() {
        $("#stick").css("display", "none");
    });
    
    function cal(){
        // bmi 지수 구하기
        let cm = $("#height").val();
        let kg = $("#weight").val();
        if (cm < 0 || cm > 300 || kg < 0 || kg > 1000){
            alert("키와 몸무게를 정확히 입력해주세요!\n\n \
            키: 0~300, 몸무게: 0~1000");
            return;
        } else if (cm == false || kg == false){
            alert("키와 몸무게를 모두 정확하게 입력해주세요.");
            return;
        }

        let res = kg / (cm**2) * 10000;
        res = res.toFixed(2)
        $("#bmi").html(res);

        // 비만도 구하기
        if (res < 18.5){
            $("#b_result").html("저체중");
        } else if (res < 23){
            $("#b_result").html("정상");
        } else if (res < 25){
            $("#b_result").html("과체중");
        } else{
            $("#b_result").html("비만");
        };

        // 현재 상태 표시
        let height = 30;
        let plus = res - 17;
        if (res < 17){
            height = 30;
        } else if (res > 26){
            height = 330;
        } else {
            height = plus * 30 + 30;
        }
        // $("#stick").css({"height" : height+"px", "display" : "", "transition" : "0.4s"});
        // console.log($("#stick").css());
        // $("#stick").style.color = "red";
        document.getElementById("stick").style.display = "";
        document.getElementById("stick").style.height = height + "px";
        document.getElementById("stick").style.transition = "0.4s";
    }

    function reset(){
        $("#height").val("");
        $("#weight").val("");
        $("#result").html("");
        $("#bmi").html("");
        $("#stick").css("display", "none");
    }
    return(
        <>
            <div id="sec_user">
                <div id="b_input">
                    <div id="height_weight">
                        신장 <input id="height" type="number" placeholder="키를 입력해주세요."/> cm<br/>
                        체중 <input id="weight" type="number" placeholder="몸무게를 입력해주세요."/> kg<br/>
                    </div>
                    <button id="b_calculation" onClick={cal}>계산</button>
                    <button id="b_reset" onClick={reset}>초기화</button><br/>
                </div>
                <div id="b_output">
                    <div id="result_bmi">
                        비만도 결과: <span id="b_result"></span><br/>
                        BMI 지수: <span id="bmi"></span>
                    </div>
                    <ul id="bmi_ul">
                        <p id="num1">18.5</p>
                        <p id="num2">23</p>
                        <p id="num3">25</p>
                    </ul>               
                    <div id="color">
                        <div id="color_box4">비만</div>
                        <div id="color_box3">과체중</div>
                        <div id="color_box2">정상</div>
                        <div id="color_box1">저체중</div>
                        <div id="stick"></div>
                    </div>
                </div>
            </div>
            <div id="sec_name">
                <h1>체질량 계산기</h1>
                <div id="name_desc">
                    BMI는 'Body Mass Index(바디 매스 인덱스)'의 줄임말로, '체질량 지수'를 의미합니다. 
                    몸무게(kg)를 키(m)의 제곱으로 나눠 결과를 산출할 수 있습니다.<br/>
                    (키는 0~300, 몸무게는 0~1000으로 입력값이 제한됩니다.)
                </div>
            </div>
        </>
    );
}