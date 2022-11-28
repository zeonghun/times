let news = [];
const getLatestNews = async () => {
  // API 호출
  let url = new URL("https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10");
  let header = new Headers({ "x-api-key": "Jk7pYEw39nkNbA-AJxDZuMRRBYmH6VfKV7x2XseqyhU" });
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  console.log(news);
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
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};
