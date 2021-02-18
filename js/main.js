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

/*
 * 보이는 카드 리스트를 오른쪽으로 이동
 */
const transformNext = (event) => {
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;
    const classList = slideNext.parentElement.parentElement.nextElementSibling; // ul 태그 선택
    let activeLi = classList.getAttribute("data-position");
    const liList = classList.getElementsByTagName("li");

    /*
     * 하나의 카드라도 왼쪽으로 이동했다면, 오른쪽으로 갈 수 있음
     */
    if(Number(activeLi) < 0) {
        activeLi = Number(activeLi) + 260;

        /*
         * 왼쪽에 있던 카드가 오른쪽으로 갔다면, 다시 왼쪽으로 갈 수 있으므로 왼쪽 버튼 활성화
         */
        slidePrev.style.color = "#2f3059";
        slidePrev.classList.add("slide-prev-hover");
        slidePrev.addEventListener("click", transformPrev);

        //보이는 카드 리스트의 activeLi 값이 왼쪽 끝의 값인 0 일 경우 오른쪽 버튼 비활성화
        if(Number(activeLi) === 0) {
            slideNext.style.color = '#cfd8dc';
            slideNext.classList.remove('slide-next-hover');
            slideNext.removeEventListener('click', transformNext);
        }
    }

    /*
     * 보이는 카드 리스트를 오른쪽으로 이동
     * 카드 리스트의 data-position 값 설정
     */
    classList.style.transition = "transform 1s";
    classList.style.transform = "translateX(" + String(activeLi) + "px)";
    classList.setAttribute("data-position", activeLi);
}

/*
 * 보이는 카드 리스트를 왼쪽으로 이동
 */
const transformPrev = (event) => {
    const slidePrev = event.target;
    const slideNext = slidePrev.nextElementSibling;
    const classList = slidePrev.parentElement.parentElement.nextElementSibling; // ul 태그 선택
    let activeLi = classList.getAttribute("data-position");
    const liList = classList.getElementsByTagName("li");

    /*
     * 보이는 카드 리스트의 너비보다 카드들의 길이가 길면
     * 카드 리스트의 data-position 값 -260
     * 오른쪽 버튼 활성화
     */
    if(classList.clientWidth < (liList.length * 260 + Number(activeLi))) {
        activeLi = Number(activeLi) - 260;

        /*
         * 이동 후 보이는 카드 리스트의 너비보다 카드들의 길이가 작으면
         * 왼쪽 버튼 비활성화
         */
        if(classList.clientWidth > (liList.length * 260 + Number(activeLi))) {
            slidePrev.style.color = "#cfd8dc";
            slidePrev.classList.remove("slide-prev-hover");
            slidePrev.removeEventListener("click", transformPrev);
        }

        slideNext.style.color = "#2f3059";
        slideNext.classList.add("slide-next-hover");
        slideNext.addEventListener("click", transformNext);
    }

    /*
     * 보이는 카드 리스트를 왼쪽으로 이동
     * 카드 리스트의 data-position 값 설정
     */
    classList.style.transition = "transform 1s";
    classList.style.transform = "translateX(" + String(activeLi) + "px)";
    classList.setAttribute("data-position", activeLi);
};

/*
 * 각각의 왼쪽 버튼 접근
 */
for(let i = 0; i < slidePrevList.length; i++) {
    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling; // 카드 리스트 가져오기
    let liList = classList.getElementsByTagName("li"); // 카드 리스트의 카드들 가져오기

    /*
     * 보이는 카드 리스트의 너비보다 카드들의 길이가 길면 왼쪽 버튼 활성화
     * 보이는 카드 리스트의 너비보다 카드들의 길이가 길지 않으면 왼쪽, 오른쪽 버튼 삭제
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
