export async function fetchArticleInfo(articleTitle, language) {
  const wikipediaAPIURL = `https://${language}.wikipedia.org/w/api.php`;
  const url = `${wikipediaAPIURL}?action=query&format=json&prop=extracts&exintro&titles=${articleTitle}&origin=*`;
  const response = await fetch(url);
  const data = await response.json();

  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  const articleData = pages[pageId];

  return {
    title: articleData.title,
    extract: articleData.extract,
    fullurl: `https://${language}.wikipedia.org/wiki/${articleData.title.replaceAll(' ', '_')}`,
  };
}
