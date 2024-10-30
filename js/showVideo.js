window.onload = function () {
    setTimeout(() => {
        document.querySelector(".screenLoader").style.visibility = 'hidden';
        // the best case to remove element from Dom to not allow any one make inspect return it 
        // document.querySelector(".screenLoader").remove();
        document.body.style.overflowY = 'auto';
    }, 0);
}
// Get parameter from url 
let params = new URLSearchParams(window.location.search);
let precherName = params.get("name");
let id  = params.get("id");
let autoComplet = "&amp;autoplay=1";
let showVideo = document.querySelector(".showVideo");
let url = "https://www.youtube.com/embed/";
// Array  conatin the  id and url of Videos 
let lecturesInfo = {
    bahly : [
        {id : 1 , url : "HEwVYisRRrk?si=rjjWdL_Na2tSBpRX"} , {id : 2 , url : "oIj9FA9P_k0?si=L4uiBRop_vBuEDQz"} ,
        {id : 3 , url : "P0Zl2dheVg4?si=GW2lZYybcL6X9P3b"} , {id : 4 , url : "8lpuibf8DV8?si=6yCfF0AXNgQWNhlF"} ,
        {id : 5 , url : "5nVz0tfvuXM?si=q7NdM4xHKDatlILK"} , {id : 6 , url : "fL5CIf1hdDc?si=G_AXKgIyh8lF-kcb"} ,
        {id : 7 , url : "FtFn6OLd3Bk?si=2rJF5aoYPj9Xg-Mu"} , {id : 8 , url : "ThJgImcwe38?si=HnwO1qXZhrfCxjJH"} ,
        {id : 9 , url : "b4YOzLZKOkQ?si=sSTZPj-9jBdbuxTT"} ,
    ],
    Elghaliz : [
         {id : 1 , url :  "lOQmKtx48uE?si=kMVIIMHTW2RgRQTE"}, {id : 2 , url :  "MtQAy_eTV7Q?si=thfxm1YSX-J-bzNX"},
         {id : 3 , url :  "wwfcwYQik0M?si=cvKEhTmpzZ2i4x7m"}, {id : 4 , url :  "zIyq6k_2QlE?si=k5MWnXb-IAQPltVQ"},
         {id : 5 , url :  "r5t4d5N9g2I?si=ol528nvPQWf3DWBu"}, {id : 6 , url  : "yJg8ctHdfYs?si=Jg2idEBknbUwfLN3"},
         {id : 7 , url  : "L9-0iqyItuo?si=0D2_474PpFrYXAXO"}, {id : 8 , url  : "lffA1zU1yvU?si=JIQc0z5xG1b9ApRI"},
         {id : 9 , url  : "YleY-E97aRo?si=A__lMcac-g7vbLuZ"}, {id : 10 , url : "iStlGevQfU0?si=eW195Eaqi1FsMWEz"},
         {id : 11 , url : "un8_dH1a9HY?si=R2CDe2dEYhkxjEJ4"},
    ] , 
     Ammer : [ 
        {id : 1 , url : "jLoWZZWCqbY?si=9n-ag_t_rxI3ccrX"} , {id : 2 , url : "Y-R4oCHR-Vg?si=oTL0j8IbKt1m0r5e"},
        {id : 3 , url : "cMVJeSauMgg?si=tw-__dB3g095iM85"} , {id : 4 , url : "zeMUoKB3OZ0?si=oAqKOpuIhxcsALCX"},
        {id : 5 , url : "q3Ps14yDq6M?si=-WnC7NhLnlDvLMDQ"} , {id : 6 , url : "w-vCTZezLuE?si=P-yzw4tu6-1M9PEA"},
        {id : 7 , url : "E4Po-pgVEQ8?si=-oZ0HENY583HParx"} , {id : 8 , url : "hGtYeLvVYSg?si=zRudDhTI_Xbe5tKf"},
        {id : 9 , url : "qctUpWNVGlo?si=Rky3kR65bb2dAFot"} , {id : 10 , url : "HeuOEm59ayE?si=XKzD5Dy6jtE1j15Q"},
        {id : 11 , url : "FECtD5Vu5xM?si=RtenoX3WFtHZTweg"} , {id : 12 , url : "54EFtkbeO2I?si=Q8GcfZirCBf5mM4-"},    
        {id : 13 , url : "uQTBmKAfEvQ?si=exomnj6KVeITjNyt"} , {id : 14 , url : "esS79OjqYCU?si=uN9O54j1vJY5wy4O"},    
        {id : 15 , url : "l4xjkhg6YwE?si=65eU5JnaWHEyQ_PQ"} , {id : 16 , url : "ZmO4iq8FA0Y?si=zYgcwebK8oBtMfm3"},    
    ]  
}
// add src to video 
let lectures = lecturesInfo[precherName];
   lectures.forEach((lecture) => {
      if (lecture.id == id){
         showVideo.src = url + lecture.url + autoComplet;  
      }
});

// get lectures from local storage 
let All_Lectures = document.createElement("div");
All_Lectures.classList.add("All_Lectures");
let localStorageLectures = JSON.parse(localStorage.getItem("lecture"));
localStorageLectures.forEach(lecture => {
  All_Lectures.innerHTML += lecture;
});


let All_Lectures_title = All_Lectures.querySelectorAll(".LecContainer .card");

// append other lecture to page 
let otherLecture  = document.querySelector(".videos .otherLectures");
All_Lectures_title.forEach((card , index) => {
    let title = '...' + card.querySelector(".info .title").innerHTML.slice(0 , 30);
    let show  = card.querySelector(".info .buttons .show").innerHTML ;
    let link_id = card.querySelector(".info .buttons .show").dataset.id;
    let imgSrc = card.querySelector(".info .image img").src.replace("http://127.0.0.1:5501/" , "../");
    otherLecture.innerHTML += `
        <div class="lecture_Holder flex-between px-4 my-4">
            <a href="" data-id="${link_id}" class = " play bg-green text-white  fw-medium px-4 py-2 rounded-2 ">${show}</a>
            <div class="lectureInfo flex-center">
                <p class="title fs-4 fw-400 me-2 mt-3">${title}</p>
                <div class="image rounded-circle overflow-hidden">
                    <img class="w-100 mw-100 h-100 mh-100 " src=${imgSrc} />
                </div>
            </div> 
        </div> 
        <p class="Block h-60p w-75 b mx-auto "></div>
    `;  
});
// 

let All_Lectures_links = document.querySelectorAll(".videos .otherLectures .lecture_Holder .play");
All_Lectures_links.forEach((link) => {
    link.addEventListener("click" , (e)=>{
        e.preventDefault();
        let id = e.target.dataset.id;
        console.log(id);
        lectures.forEach((lecture) => {
            if (lecture.id == id){
               showVideo.src = url + lecture.url + autoComplet;  
            }
      });
    });
});