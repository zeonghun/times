let news = [];
const getLatestNews = async () => {
  // API 호출
  let url = new URL("https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10");
  let header = new Headers({ "x-api-key": "Jk7pYEw39nkNbA-AJxDZuMRRBYmH6VfKV7x2XseqyhU" });
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  console.log(news);

  render();
};

const render=() =>{
  let newsHTML = "";
  newsHTML = news.map(news => {
    return `<div class="row news">
    <div class="col-lg-4">
      <img class="news-img" src="https://file2.nocutnews.co.kr/newsroom/image/2022/11/25/202211251912375295_0.jpg" />
    </div>
    <div class="col-lg-8">
      <h2>日 승리와 韓 무승부 맞힌 英 축구 '예언가'가 전망한 한국-가나전은?</h2>
      <p>'인간 문어'로 주목받는 크리스 서튼 영국 BBC 해설위원이 한국의 가나전 승리를 예상해 눈길을 끌었다.</p>
      <div>CBS노컷뉴스 박세운 기자 / 2022-11-25 19:19</div>
    </div>
  </div>`;
  });

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();

// 아이콘 버튼 액션
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
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
