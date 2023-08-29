import './All.css';
import $ from 'jquery';

export default function Discount(){
    // 키다운 누르면 무조건 키업하기
    function up(){
        $("cost").trigger('onKeyUp');
    }

    function up2(){
        $("discount_rate").trigger('onKeyUp');
    }

    // 합계금액에 3자리마다 콤마 붙이기
    function comma(){
        let value = $("#cost").val();
        value = Number(value.replace(/,/gi, ""));
        if (isNaN(value)){
            $("#cost").val(0);
        } else {
            const res = value.toLocaleString('ko-KR');
            $("#cost").val(res);
        }
    }

    // 할인율에 3자리마다 콤마 붙이기
    function comma2(){
        let value = $("#discount_rate").val();
        value = Number(value.replace(/,/gi, ""));
        if (isNaN(value)){
            $("#discount_rate").val(0);
        } else {
            const res = value.toLocaleString('ko-KR');
            $("#discount_rate").val(res);
        }
    }

    // 계산
    function cal(){
        let cost = $("#cost").val().replace(/,/g, "");
        var rate = $("#discount_rate").val().replace(/,/g, "");
        var discount_price = cost * (rate / 100);
        var res = cost-discount_price;

        cost = Number(cost).toLocaleString('ko-KR');
        $("#res_cost").html(cost + "원");

        discount_price = Number(discount_price).toFixed(2).toLocaleString('ko-KR');
        res = Number(res).toFixed(2).toLocaleString('ko-KR');
        $("#res_discount").html(discount_price + "원");
        $("#d_result").html(res + "원");
    }

    // // 초기화 버튼
    function reset(){
        $("#cost").val("");
        $("#discount_rate").val("");
        $("#res_cost").html("-원");
        $("#res_discount").html("-원");
        $("#result").html("-원");
    }

    return(
        <div>
            <div id="sec_user">
                <div id="d_input">
                    <div id="cost_discount">
                        원가 <input type="text" id="cost" maxLength="13" placeholder="원가를 입력해주세요." onKeyUp={comma} onKeyDown={up}/> 원<br/>
                        할인율 <input type="text" id="discount_rate" maxLength="5" placeholder="할인율을 입력해주세요." onKeyUp={comma2}/> %<br/>
                    </div>
                    <button id="d_calculation" onClick={cal}>계산</button>
                    <button id="d_reset" onClick={reset}>초기화</button><br/>
                </div>
                <div id="d_output">
                    <div id="spans">
                        원가: <span id="res_cost">-원</span><br/>
                        할인금액: <span id="res_discount">-원</span><br/>
                        최종금액: <span id="d_result">-원</span>
                    </div>
                </div>
            </div>
            <div id="sec_name">
                <h1>할인율 계산기</h1>
                <div id="name_desc">
                    할인 금액과 최종 금액을 손쉽게 구할 수 있는 할인율 계산기입니다.
                    원가와 할인율을 입력하고 구매하려는 상품에 대한 정보를 얻어보세요!<br/>
                    (입력값은 숫자로 제한되며 원가는 10자리, 할인율은 4자리까지 입력 가능합니다.)
                </div>
            </div>
        </div>
    );
}