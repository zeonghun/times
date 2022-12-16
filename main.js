let news = [];
let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) => menu.addEventListener("click", (event) => getNewsByTopic(event)));
let searchButton = document.getElementById("search-button");
let url;

const getNews = async () => {
  // API 호출
  try {
    let header = new Headers({ "x-api-key": "mqlQ8InoIkapq3Vi6J0Rpyeat7t-m-CPkT54GJx-nu8" });
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    if (response.status == 200) {
      // 예외처리
      if (data.total_hits == 0) {
        throw new Error("검색된 결과가 없습니다.");
      }
      news = data.articles;
      console.log(news);
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL("https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10");
  getNews();
};

const getNewsByTopic = async (event) => {
  // 카테고리별 검색
  let topic = event.target.textContent.toLowerCase();
  url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`);
  getNews();
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    // inline: Text 박스가 옆으로 보여짐
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const searchNews = async () => {
  // 키워드 검색
  let keyword = document.getElementById("search-input").value;
  url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`);
  getNews();
};

const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return `<div class="row news">
    <div class="col-lg-4">
    <img class="news-img"
    src="${item.media || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}" />
    </div>
    <div class="col-lg-8">
      <h2>${item.title}</h2>
      <p>${item.summary == null || item.summary == "" ? "내용없음" : item.summary.length > 200 ? item.summary.substring(0, 200) + "..." : item.summary}</p>
      <div>${item.rights || "no source"}  ${moment(item.published_date).fromNow()}</div>
    </div>
  </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (message) => {
  // 에러 메시지 출력
  let errorHTML = `<div class="alert alert-danger text-center" role="alert">
  ${message}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

getLatestNews();

// 아이콘 버튼 액션
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
