window.onload = function () {
    setTimeout(() => {
        document.querySelector(".screenLoader").style.visibility = 'hidden';
        // the best case to remove element from Dom to not allow any one make inspect return it 
        // document.querySelector(".screenLoader").remove();
        document.body.style.overflowY = 'auto';
    }, 0);

    let scrollTop = document.querySelector(".scrollTop");
    window.onscroll = function () {
        if (window.scrollY >= 400) {
            scrollTop.style.display = "block";
        }
        else {
            scrollTop.style.display = "none";
        }
    }
    scrollTop.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
   
}

document.addEventListener('DOMContentLoaded', function () { 
     // Get All lectures and show videos
     let lectures = document.querySelectorAll(".lectures .card .show");
     let lec = document.querySelectorAll(".lectures");
     let LecArr = [];
     
     lec.forEach((e) => {
         LecArr.push(e.innerHTML);
     });
     localStorage.setItem("lecture" , JSON.stringify(LecArr));
      lectures.forEach((lecture) => {
         lecture.addEventListener("click", function (e) {
         let name = e.target.dataset.name;
         let id = e.target.dataset.id ;
             window.location.href = 'showVideo.html?id=' + id + '&name=' + name ;
         });
     });
});

function convertNumberToArabic(number) {
    const formatter = new Intl.NumberFormat('ar');
    return formatter.format(number);
}     


// Get toggle Menu 
let toggleBurger = document.querySelector(".toggleBurger");
let side__Bar = document.querySelector(".side__Bar");
let close = document.querySelector(".close")
toggleBurger.addEventListener('click', () => {
    side__Bar.classList.add("active");
});
close.addEventListener('click', () => {
    side__Bar.classList.remove("active");
});


// // fetch adkar 
// async function getAdkar() {
//     let res = await fetch("../Json_file/adkar.json");
//     let data = await res.json();
//     let time = ["مرة", "مرتان", "مرات", "مرة"];
//     defultthkr();
//     function defultthkr() {
//         data.morningAdkar.forEach((thkr) => {
//             document.getElementById("thkrContent").innerHTML +=
//                 `<div class ="content" id="content">
//                 <p class="thkr">${thkr.content}</p> 
//                  <p class="time"> ${tafqit(thkr.count, { Subject: time ,  Feminine:"on" })}</p>  
//             </div>`;
//             // btn copy 
//             let copyButtons = document.querySelectorAll(".copyButton");
//             copyButtons.forEach((btn) => {
//                 btn.addEventListener('click', (e) => copyText(e.target));
//             });
//         });
//     }

//     function getMorningAdkar(e) {
//         document.getElementById("heading").innerHTML = `${e.target.dataset.name}`;
//         document.getElementById("thkrContent").innerHTML = "";
//         data.morningAdkar.forEach((thkr) => {
//             document.getElementById("thkrContent").innerHTML +=
//                 `<div class ="content" id="content">
//                 <p class="thkr">${thkr.content}</p> 
//                 <p class="time"> ${tafqit(thkr.count, { Subject: time ,  Feminine:"on" })}</p>  
//             </div>`;
//         });       
//     }

//     function getAfterNoonAdkar(e) {
       
//         document.getElementById("heading").innerHTML = `${e.target.dataset.name}`;
//         document.getElementById("thkrContent").innerHTML = "";
//         data.AfterNoonAdkar.forEach((thkr) => {
//             document.getElementById("thkrContent").innerHTML +=
//                 `<div class ="content" id="content">
//                 <p class="thkr">${thkr.content}</p> 
//                  <p class="time"> ${tafqit(thkr.count, { Subject: time ,  Feminine:"on" })}</p>  
//             </div>`;
//         });
       
//     }

//     function getSleepingAdkar(e) {
//         document.getElementById("heading").innerHTML = `${e.target.dataset.name}`;
//         document.getElementById("thkrContent").innerHTML = "";
//         data.sleepingAdkar.forEach((thkr) => {
//             console.log(thkr.content);
//             document.getElementById("thkrContent").innerHTML +=
//                 `<div class ="content" id="content">
//                 <p class="thkr">${thkr.content}</p> 
//                  <p class="time"> ${tafqit(thkr.count, { Subject: time ,  Feminine:"on" })}</p>  
//             </div>`;
//         });

       
//     }

//     function getPrayingAdkar(e) {
//         document.getElementById("heading").innerHTML = `${e.target.dataset.name}`;
//         document.getElementById("thkrContent").innerHTML = "";
//         data.prayingAdkar.forEach((thkr) => {
//             document.getElementById("thkrContent").innerHTML +=
//                 `<div class ="content" id="content">
//                <p class="thkr">${thkr.content}</p> 
//                 <p class="time"> ${tafqit(thkr.count, { Subject: time ,  Feminine:"on" })}</p>  
//             </div>`;
//         });
       
//     }

//     // choose the link of thkr 
//     let MorninngThkr = document.getElementById("MorninngThkr");
//     MorninngThkr.addEventListener("click", getMorningAdkar);

//     let AfterNoonThkr = document.getElementById("AfterNoonThkr");
//     AfterNoonThkr.addEventListener("click", getAfterNoonAdkar);

//     let prayingThkr = document.getElementById("prayingThkr");
//     prayingThkr.closest('.swiper-slide').addEventListener("click", getPrayingAdkar);

//     let sleepingThkr = document.getElementById("sleepingThkr");
//     sleepingThkr.addEventListener("click", getSleepingAdkar);

// }
// getAdkar();
// var swiper = new Swiper(".mySwiper", {
//     slidesPerView: "auto",
//     spaceBetween: 30,
//     freeMode: true,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//   });

function copyText(targetElment) {
    // Get the text content from the div
    let textToCopy = targetElment.closest(".copyButton").parentNode.textContent;
    // Create a temporary textarea element
    let textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    // Select the text within the textarea
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    // Copy the selected text to the clipboard
    document.execCommand('copy');
    // Remove the textarea
    document.body.removeChild(textarea);
}
 