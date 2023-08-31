import './All.css';
import $ from 'jquery';

export default function Agecalculator() {

    // 기본 실행 함수: 띠와 별자리 이미지를 숨김.
    $(document).ready(function() {
        $("#zodiac_kor_img").css("display", "none");
        $("#zodiac_eng_img").css("display", "none");
    });

    // '오늘' 버튼을 누르면 오늘 날짜가 입력된
    function putToday() {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        let date = today.getDate();
        let dateFormat = year + "" + (month < 9 ? "0" + (month+1) : month + 1) + "" + (date < 9 ? "0" + date : date);
        $("#a_standard").val(dateFormat);
    }

    // '초기화' 버튼
    function reset() {
        $("#a_birth").val("");
        $("#a_standard").val("");
        $("#a_result").html("0세");
        $("#zodiac_kor").html("띠");
        $("#zodiac_eng").html("별자리");
        $("#zodiac_kor_img").css("display", "none");
        $("#zodiac_eng_img").css("display", "none");
    }

    // 나이, 띠, 별자리 계산하는 함수
    function calculation() {
        // 출생일, 기준일 둘 중 하나라도 제대로 입력되지 않았을 때 경고창 띄우기.
        if ($("#a_birth").val() == false || $("#a_standard").val() == false) {
            alert("출생일과 기준일을 정확히 입력해주세요!");
            return;
        } else if ($("#a_birth").val().length != 8 || $("#a_standard").val().length !=8){
            alert("출생일과 기준일을 각각 8자리로 입력해주세요.");
            return;
        }

        // #01. 나이 계산 ▼

        // 1월~12월까지 날짜
        const date_box = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // 출생일(birth), 기준일(standard) 변수 : 년, 월, 일
        let my_year = $("#a_birth").val().slice(0, 4);
        let my_month = $("#a_birth").val().slice(4, 6);
        let my_date = $("#a_birth").val().slice(6, 8);
        let now_year = $("#a_standard").val().slice(0, 4);
        let now_month = $("#a_standard").val().slice(4, 6);
        let now_date = $("#a_standard").val().slice(6, 8);

        // 월이나 일이 잘못되었을 때 경고창 띄우기
        const thirty = ["02", "04", "06", "09", "11"]
        if (my_month == 0 || my_month > 12 || now_month == 0 || now_month > 12) {
            alert("출생일이나 기준일의 월을 확인해주세요.");
            return;
        } else if (my_date == 0 || my_date > 31 || now_date == 0 || now_date > 31) {
            alert("출생일이나 기준일의 일을 확인해주세요.");
            return;
        } else if ((my_month == 2 && my_date > 28) || now_month == 2 && now_date > 28) {
            alert("2월은 28일까지 있습니다.");
            return;
        } else if ((thirty.includes(my_month) && my_date > 30) || (thirty.includes(now_month) && now_date > 30)) {
            alert("해당 출생일이나 기준일의 월은 30일까지만 존재합니다.");
            return;
        };

        // 1월 1일부터 출생일까지 지난 날짜 구하기
        let my_sum = 0
        for (let i=0; i < my_month-1; i++){
            my_sum += date_box[i];
        }
        my_sum = Number(my_sum);
        my_date = Number(my_date);
        my_sum += my_date;

        // 1월 1일부터 기준일까지 지난 날짜 구하기
        let now_sum = 0
        for (let i=0; i < now_month-1; i++){
            now_sum += date_box[i];
        }
        now_sum = Number(now_sum);
        now_date = Number(now_date);
        now_sum += now_date;

        // 만 나이 구하기
        let age = now_year - my_year;
        if (age < 0 || (age == 0 && now_sum - my_sum < 0)) {
            alert("출생일이 기준일보다 늦을 수 없습니다.");
            return;
        };

        if (now_sum - my_sum < 0){
            age -= 1;
        }
        $("#a_result").html(age + "세");

        // #02. 띠 계산 ▼
        const zodiac_kor_box = ['원숭이', '닭', '개', '돼지', '쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양'];
        $("#zodiac_kor").html(zodiac_kor_box[my_year%12] + "띠");
        let new_addr = "img/zod_kor/"+ (my_year%12) +".png";
        $("#zodiac_kor_img").css("display", "");
        $("#zodiac_kor_img").attr({src: new_addr});
        

        // #03. 별자리 계산 ▼
        const zodiac_eng_box = {'물병자리':20, '물고기자리':50, '양자리':80, '황소자리':110, 
        '쌍둥이자리':131, '게자리':173, '사자자리':204, '처녀자리':235, '천칭자리':266, 
        '전갈자리':296, '궁수자리':327, '염소자리':359}
        let result = ""

        for (let key in zodiac_eng_box){
            if (my_sum < zodiac_eng_box[key]){
                if (result == ""){
                    result = "염소자리";
                }
                break;
            } else{
                result = key
            }
        }

        $("#zodiac_eng").html(result);
        let new_addr2 = "img/zod_eng/" + result + ".png";
        $("#zodiac_eng_img").css("display", "");
        $("#zodiac_eng_img").attr({src: new_addr2});
    }

    return(
        <>
            <div id="sec_user">
                <div id="a_input">
                    출생일 <input type="number" id="a_birth" autoComplete="off" placeholder=" 예) 19720101"/>
                    기준일 <input type="number" id="a_standard" autoComplete="off" placeholder=" 예) 20230822"/><button onClick={putToday} id="a_btn_today">오늘</button><br/>
                    <button id="a_btn_cal" onClick={calculation}>계산</button><button id="a_btn_reset" onClick={reset}>초기화</button>
                </div>
                <div id="a_output">
                    <span id="zodiac_kor">띠</span>
                    <p id="img_container"><img id="zodiac_kor_img" src="img/zod_kor/0.png"/></p>
                    <span id="a_result">0세</span>
                    <span id="zodiac_eng">별자리</span>
                    <p id="img_container2"><img id="zodiac_eng_img" src="img/zod_eng/물병자리.png"/></p>
                </div>
            </div>
            <div id="sec_name">
                <h1>나이 계산기</h1>
                <div id="name_desc">
                    2023년 6월 28일부터 '만 나이 통일법'이 적용되었습니다.
                    출생일을 입력하면 본인의 나이와 더불어, 띠와 별자리 정보도 제공됩니다.<br/>
                    출생일과 기준일은 8자로 입력할 수 있으며, 기준일은 변경이 가능합니다.
                </div>
            </div>
        </>
    );
}