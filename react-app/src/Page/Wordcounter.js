import './All.css'
import $ from 'jquery';

export default function Wordcounter(){

    var cnt = 0;
    var ctrl = false;

    function cv(event){
        cnt ++;
        if (event.keyCode === 17){
            ctrl = true;
        } else if (cnt >= 3 && ctrl && event.keyCode === 86){
            alert("프로그램 속도 유지를 위해 연속 붙여넣기를 제한하고 있습니다.");
            result();
        };
    }

    function result(){
        cnt = 0;
        ctrl = false;
        console.log(ctrl);
        var content = $("#text").val();
        $("#spaceO").html("공백 포함: " + content.length.toLocaleString('ko-KR'));
        $("#spaceX").html("공백 미포함: " + content.replace(/\s/ig, "").length.toLocaleString('ko-KR'));
    }

    return (
        <>
            <div id="sec_user">
                <textarea name="text" id="text" maxLength="1000000" placeholder="글을 입력해주세요." onKeyDown={cv} onKeyUp={result}></textarea>
                <ul id="word_ul">
                    <span id="spaceO">공백 포함: 0</span><br/>
                    <span id="spaceX">공백 미포함: 0</span><br/>
                </ul>
            </div>
            <div id="sec_name">
                <h1>글자 수 세기</h1>
                <div id="name_desc">
                공백 포함일 때와 미포함일 때의 글자 수를 모두 알 수 있는 글자 수 세기 프로그램입니다.
                자기소개서 등을 작성할 때 이용해보세요!<br/>
                프로그램 속도 유지를 위해 연속 붙여넣기는 제한되며 1,000,000(백만)자까지만 입력 가능합니다.
                </div>
            </div>
        </>
    );
}