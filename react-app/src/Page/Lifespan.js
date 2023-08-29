import './All.css';
import $ from "jquery";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, {useState} from "react";

export default function Lifespan() {
    
    // const [startDate, setStartDate] = useState(new Date());

    function cal(){
        if (! $("#birth").val()){
            alert("출생일을 입력해주세요.");
        } else if ($("#birth").val().length != 8){
            alert("출생일을 정확히 입력해주세요.");
            return;
        } else if ($("#birth").val().slice(0, 2) != "19" && $("#birth").val().slice(0, 2) != "20") {
            alert("1900년 이후 출생자만 입력 가능합니다.");
            return;
        }

        // #01. 만 나이 구하기

        // 출생일(birth), 현재 날짜 변수 : 년, 월, 일
        let my_year = $("#birth").val().slice(0, 4);
        let my_month = $("#birth").val().slice(4, 6);
        let my_date = $("#birth").val().slice(6, 8);
        let today = new Date();
        let now_year = today.getFullYear();
        let now_month = today.getMonth() + 1;
        let now_date = today.getDate();

        // 월이나 일이 잘못되었을 때 경고창 띄우기
        const thirty = ["02", "04", "06", "09", "11"]
        if (my_month == 0 || my_month > 12) {
            alert("출생일이나 기준일의 월을 확인해주세요.");
            return;
        } else if (my_date == 0 || my_date > 31) {
            alert("출생일이나 기준일의 일을 확인해주세요.");
            return;
        } else if (my_month == 2 && my_date > 28) {
            alert("2월은 28일까지 있습니다.");
            return;
        } else if (thirty.includes(my_month) && my_date > 30) {
            alert("해당 출생일이나 기준일의 월은 30일까지만 존재합니다.");
            return;
        };

        // 1월~12월까지 날짜
        const date_box = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // 1월 1일부터 출생일까지 지난 날짜 구하기
        let my_sum = 0
        for (let i=0; i < my_month-1; i++){
            my_sum += date_box[i];
        }
        my_sum = Number(my_sum);
        my_date = Number(my_date);
        my_sum += my_date;

        // 1월 1일부터 현재 날짜까지 지난 날짜 구하기
        let now_sum = 0
        for (let i=0; i < now_month-1; i++){
            now_sum += date_box[i];
        }
        now_sum = Number(now_sum);
        now_date = Number(now_date);
        now_sum += now_date;

        let age = now_year - my_year;
        if (now_sum - my_sum < 0){
            age -= 1;
        }

        if (age < 0 || (my_year == now_year && now_sum - my_sum < 0)) {
            alert('출생일은 오늘날짜를 넘을 수 없습니다');
            return;
        }

        
        // #02. '총 살 수 있는 날', '살아온 날', '앞으로 살 날' 구하기
        let total_day = (365 * $("#lifespan").val());
        if (! Number(total_day)) {
            $("#birth").val("");
            $("#lifespan").val("83.6");
            $("#result").html("-");
            $("#total_day").html("-");
            $("#past_day").html("-");
            $("#future_day").html("-");
            $("#graph_res").css({"width":"0%"});
            return;
        }
        let past_day = (365 * (now_year - my_year)) + (now_sum - my_sum);
        let future_day = total_day - past_day;
        $("#total_day").html(total_day.toLocaleString('en-US'));
        $("#past_day").html(past_day.toLocaleString('en-US'));
        $("#future_day").html(future_day.toLocaleString('en-US'));

        // #03. % 구하기
        let x = (past_day * 100) / total_day;
        x = x.toFixed(3);
        $("#result").html(x);
        if (x > 100) {
            x = 100;
            $("#total_day").css({"display":"none"});
            $("#future_day").css({"display":"none"});
        } else {
            $("#total_day").css({"display":""});
            $("#future_day").css({"display":""});
        }
        $("#graph_res").css({"width": x + "%", "transition" : "0.5s"});
    }

    // 초기화 버튼
    function reset() {
        $("#birth").val("");
        $("#lifespan").val("83.6");
        $("#result").html("-");
        $("#total_day").html("-");
        $("#past_day").html("-");
        $("#future_day").html("-");
        $("#graph_res").css({"width":"0%"});
    }

    return(
        <div>
            <div id="sec_user">
                <div id="input">
                    출생일<input type="text" maxLength="8" id="birth" autoComplete="off" placeholder="ex) 20010920"/>           
                    {/* 출생일<DatePicker className="dp" selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                    기대수명 <input type="text" id="lifespan" maxLength="5" defaultValue="83.6"/>세<br/>
                    <button id="calculation" onClick={cal}>계산</button>
                    <button id="reset" onClick={reset}>초기화</button>
                </div>
                <hr/>
                <div id="output">
                    <b>수명의 <span id="result">-</span>%만큼 인생을 지속했습니다.<br/></b>
                    <div id="graph">
                        <div id="graph_res"></div>
                    </div>
                    총 살 수 있는 날: <span id="total_day">-</span>일<br/>
                    살아온 날: <span id="past_day">-</span>일<br/>
                    앞으로 살 날: <span id="future_day">-</span>일<br/>
                </div>
            </div>
            <div id="sec_name">
                <h1>수명 계산기</h1>
                <div id="name_desc">
                    출생일 입력으로 지금까지 살아온 날이 기대수명의 몇 %인지 확인할 수 있습니다.
                    그래프와 앞으로 살 날의 수치를 통해 시간의 가치를 다시 한 번 생각해보는 건 어떨까요?<br/>
                    출생일은 1900년 01월 01일 이후로 입력 가능하고, 기대수명 값을 바꿀 수 있습니다.
                </div>
            </div>
        </div>
    );
}