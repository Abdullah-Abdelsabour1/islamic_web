// fetch adkar 
async function getAdkar() {
    let res = await fetch("../Json_file/adkar.json");
    let data = await res.json();
    let time = ["مرة", "مرتان", "مرات", "مرة"];
    defultthkr();
    function defultthkr() {
        data.morningAdkar.forEach((thkr) => {
            document.getElementById("thkrContent").innerHTML +=
                `<div class ="content" id="content">
                <p class="thkr">${thkr.content}</p> 
                 <p class="time"> ${tafqit(thkr.count, { Subject: time ,  Feminine:"on" })}</p>  
            </div>`;
            // btn copy 
            let copyButtons = document.querySelectorAll(".copyButton");
            copyButtons.forEach((btn) => {
                btn.addEventListener('click', (e) => copyText(e.target));
            });
        });
    }

    function getMorningAdkar(e) {
        document.getElementById("heading").innerHTML = `${e.target.dataset.name}`;
        document.getElementById("thkrContent").innerHTML = "";
        data.morningAdkar.forEach((thkr) => {
            document.getElementById("thkrContent").innerHTML +=
                `<div class ="content" id="content">
                <p class="thkr">${thkr.content}</p> 
                <p class="time"> ${tafqit(thkr.count, { Subject: time ,  Feminine:"on" })}</p>  
            </div>`;
        });       
    }

    function getAfterNoonAdkar(e) {
       
        document.getElementById("heading").innerHTML = `${e.target.dataset.name}`;
        document.getElementById("thkrContent").innerHTML = "";
        data.AfterNoonAdkar.forEach((thkr) => {
            document.getElementById("thkrContent").innerHTML +=
                `<div class ="content" id="content">
                <p class="thkr">${thkr.content}</p> 
                 <p class="time"> ${tafqit(thkr.count, { Subject: time ,  Feminine:"on" })}</p>  
            </div>`;
        });
       
    }

    function getSleepingAdkar(e) {
        document.getElementById("heading").innerHTML = `${e.target.dataset.name}`;
        document.getElementById("thkrContent").innerHTML = "";
        data.sleepingAdkar.forEach((thkr) => {
            console.log(thkr.content);
            document.getElementById("thkrContent").innerHTML +=
                `<div class ="content" id="content">
                <p class="thkr">${thkr.content}</p> 
                 <p class="time"> ${tafqit(thkr.count, { Subject: time ,  Feminine:"on" })}</p>  
            </div>`;
        });

       
    }

    function getPrayingAdkar(e) {
        document.getElementById("heading").innerHTML = `${e.target.dataset.name}`;
        document.getElementById("thkrContent").innerHTML = "";
        data.prayingAdkar.forEach((thkr) => {
            document.getElementById("thkrContent").innerHTML +=
                `<div class ="content" id="content">
               <p class="thkr">${thkr.content}</p> 
                <p class="time"> ${tafqit(thkr.count, { Subject: time ,  Feminine:"on" })}</p>  
            </div>`;
        });
       
    }

    // choose the link of thkr 
    let MorninngThkr = document.getElementById("MorninngThkr");
    MorninngThkr.addEventListener("click", getMorningAdkar);

    let AfterNoonThkr = document.getElementById("AfterNoonThkr");
    AfterNoonThkr.addEventListener("click", getAfterNoonAdkar);

    let prayingThkr = document.getElementById("prayingThkr");
    prayingThkr.closest('.swiper-slide').addEventListener("click", getPrayingAdkar);

    let sleepingThkr = document.getElementById("sleepingThkr");
    sleepingThkr.addEventListener("click", getSleepingAdkar);

}
getAdkar();
var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });