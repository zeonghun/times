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
