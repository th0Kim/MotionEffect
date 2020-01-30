const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = "500";

// 캔버스는 css로 정의한 사이즈(브라우저에 보이는)와 아래(실제 픽셀 작업 면적)와 같은 사이즈 두개를 적용 시켜줘야 한다.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = "white"; // 기본 배경값
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.lineWidth = 2.5;

ctx.fillRect(0, 0, 500, 500);

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        // console.log('creating path in', x, y);
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        // console.log('creating line in', x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; // 컬러 바꿈
    ctx.fillStyle = color; // 배경색 바꿈
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size; // 브러쉬 사이즈 바꿈
}

function hadleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function hadleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function hadleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
    console.log(link);
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); //좌표값
    canvas.addEventListener("mousedown", startPainting); //클릭한 상태
    canvas.addEventListener("mouseup", stopPainting); //클릭 해제
    canvas.addEventListener("mouseleave", stopPainting); //그림 중단
    canvas.addEventListener("click", hadleCanvasClick); // 배경색 변경
    canvas.addEventListener("contextmenu", handleCM); // 우클릭 제거
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColor)
)

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", hadleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", hadleSaveClick);
}
