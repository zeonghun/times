let news = [];
let page = 1;
let total_pages = 0;
let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) => menu.addEventListener("click", (event) => getNewsByTopic(event)));
let searchButton = document.getElementById("search-button");
let url;

const getNews = async () => {
  // API 호출
  try {
    let header = new Headers({ "x-api-key": "mqlQ8InoIkapq3Vi6J0Rpyeat7t-m-CPkT54GJx-nu8" });
    url.searchParams.set("page", page); // &page 추가
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    if (response.status == 200) {
      // 예외처리
      if (data.total_hits == 0) {
        throw new Error("검색된 결과가 없습니다.");
      }
      news = data.articles;
      total_pages = data.total_pages;
      page = data.page;
      console.log(news);
      render();
      pagenation();
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

const pagenation = () => {
  // 페이지네이션
  let pagenationHTML = "";
  let pageGroup = Math.ceil(page / 5);
  let last = pageGroup * 5;
  let first = last - 4;
  pagenationHTML = ` <li class="page-item">
  <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${page - 1})">
    <span aria-hidden="true">&lt;</span>
  </a>
</li>`;
  for (let i = first; i <= last; i++) {
    pagenationHTML += `<li class="page-item ${page == i ? "active" : ""}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`;
  }

  pagenationHTML = ` <li class="page-item">
  <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page + 1})">
    <span aria-hidden="true">&gt;</span>
  </a>
</li>`;
  document.querySelector(".pagination").innerHTML = pagenationHTML;
};

const moveToPage = (pageNum) => {
  // 페이지 이동
  page = pageNum;
  getNews();
};

getLatestNews();

// 아이콘 버튼 액션
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
