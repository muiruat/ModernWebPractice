const backToTop = document.getElementById("backtotop");

const checkScroll = () => {
    let pageYOffset = window.pageYOffset;

    if(pageYOffset !== 0) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}

const moveBackToTop = () => {
    if(window.pageYOffset > 0) {
        window.scrollTo({top: 0, behavior: "smooth"});
    }
}

window.addEventListener("scroll", checkScroll);
backToTop.addEventListener("click", moveBackToTop);

/* ----------------------------------------------------------------------------------------------------- */

const slidePrevList = document.getElementsByClassName("slide-prev");

const transformPrev = () => {
    
};

for(let i = 0; i < slidePrevList.length; i++) {
    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling; // ul 태그 선택
    let liList = classList.getElementsByTagName("li"); // ul 태그의 li 태그들 가져오기

    /*
     * 카드가 ul 태그 너비보다 넘치면 왼쪽 (PREV) 버튼 활성화
     * 카드가 ul 태그 너비보다 넘치지 않으면 왼쪽, 오른쪽 버튼 삭제
     */
    if(classList.clientWidth < (liList.length * 260)) {
        slidePrevList[i].classList.add("slide-prev-hover");
        slidePrevList[i].addEventListener("click", transformPrev);
    } else {
        const arrowContainer = slidePrevList[i].parentElement;
        arrowContainer.removeChild(slidePrevList[i].nextElementSibling);
        arrowContainer.removeChild(slidePrevList[i]);
    }
}
