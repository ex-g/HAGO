import './All.css';
import $ from 'jquery';

export default function Vat() {

    // // 합계금액에 3자리마다 콤마 붙이기
    function comma(){
        let value = $("#total_price").val();
        value = Number(value.replace(/,/gi, ""));
        if (isNaN(value)) {
            $("#total_price").val(0);
        } else {
            const res = value.toLocaleString('ko-KR');
            $("#total_price").val(res);
        }
    }

    // 합계금액을 알고 있을 때: 계산
    function cal1(){
        let total = $("#total_price").val().replace(/,/g, "");
        let result = (total / 1.1).toFixed(2);
        let tax = (total-result).toFixed(2);
        result = Number(result).toLocaleString('en-US');
        tax = Number(tax).toLocaleString('en-US');
        $("#supply_result").val(result);
        $("#tax_result1").val(tax);
    }

    // 합계금액을 알고 있을 때: 초기화
    function reset1(){
        $("#total_price").val("");
        $("#supply_result").val("");
        $("#tax_result1").val("");
    }

    // 공급가액에 3자리마다 콤마 붙이기
    function supply_comma(){
        let value = $("#supply_price").val();
        value = Number(value.replace(/,/gi, ""));
        if (isNaN(value)) {
            $("#supply_price").val(0);
        } else {
            const res = value.toLocaleString('ko-KR');
            $("#supply_price").val(res);
        }
    }

    // 공급가액을 알고 있을 때: 계산
    function cal2(){
        let supply = $("#supply_price").val().replace(/,/g, "");
        let result = (supply * 1.1).toFixed(2);
        let tax = (result-supply).toFixed(2);
        result = Number(result).toLocaleString('en-US');
        tax = Number(tax).toLocaleString('en-US');
        $("#total_result").val(result.toLocaleString('en-US'));
        $("#tax_result2").val(tax.toLocaleString('en-US'));
    }

    // 공급가액을 알고 있을 때: 초기화
    function reset2(){
        $("#supply_price").val("");
        $("#total_result").val("");
        $("#tax_result2").val("");
    }
    return (
        <div>
            <div id="sec_user">
                <div id="total">
                    <div id="explain1">합계금액을 알고 있다면? ▼</div>
                    합계금액 <input type="text" maxLength="18" id="total_price" placeholder="합계금액을 입력해주세요. " onKeyUp={comma}/> 원<br/>
                    <button id="btn_calculation1" onClick={cal1}>계산</button>
                    <button id="btn_reset1" onClick={reset1}>초기화</button><br/>
                    공급가액 <input type="text" id="supply_result" disabled/> 원<br/>
                    부가세액 <input type="text" id="tax_result1" disabled/> 원
                </div>
                <div id="supply">
                    <div id="explain2">공급가액을 알고 있다면? ▼</div>
                    공급가액 <input type="text" maxLength="18" id="supply_price" placeholder="공급가액을 입력해주세요. " onKeyUp={supply_comma}/> 원<br/>
                    <button id="btn_calculation2" onClick={cal2}>계산</button>
                    <button id="btn_reset2" onClick={reset2}>초기화</button><br/>
                    합계금액 <input type="text" id="total_result" disabled/> 원<br/>
                    부가세액 <input type="text" id="tax_result2" disabled/> 원
                </div>
        </div>
            <div id="sec_name">
                <h1>부가세 계산기</h1>
                <div id="name_desc">
                    2023년 기준 상품에 대한 부가가치세는 10%입니다.
                    합계금액이나 공급가액을 알고 있으면 부가세액을 쉽게 구할 수 있습니다.<br/>
                    (입력값은 숫자로 제한되며 18자리까지 입력할 수 있습니다.)
                </div>
            </div>
        </div>
    )
}
