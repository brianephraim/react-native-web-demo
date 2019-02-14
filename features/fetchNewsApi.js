/*
  This module provides an interface for interacting
  with newsapi.org.
*/
async function fetchNewsApi({ searchTerm, sortBy, page }) {
  /*
    By default use the "top-headlines" endpoint.
    "top-headlines" does not support sortBy.
    When sortBy is set, use the "everything" endpoint.
    Also use the "everything" endpoint when a searchTerm is set.

    topHeadlines is possible sortBy value,
    but it is meant to control the endpoint,
    not the actual search term parameter.
    Consider is a pseudo-sortBy.
    In this case, clear the sortBy for the actual fetch call.

  */
  sortBy = sortBy === 'topHeadlines' ? '' : sortBy;

  const params = ['apiKey=0750fd6773de4038bbcbb4d5d99083a9'];
  let endpoint = 'everything';
  if (!searchTerm && !sortBy) {
    params.push('country=us');
    endpoint = 'top-headlines';
  }
  if (searchTerm) {
    params.push(`q=${encodeURIComponent(searchTerm)}`);
  }
  if (sortBy) {
    params.push(`sortBy=${encodeURIComponent(sortBy)}`);
  }
  if (endpoint === 'everything' && !searchTerm) {
    /*
      newsapi requires a sources param under this condition.
      We want a broad set of sources.
      sources are limited at 20.
      Here are 20 sources picked from
      https://newsapi.org/s/google-news-api
    */
    const sources = [
      'abc-news',
      'associated-press',
      'axios',
      'bbc-news',
      'bloomberg',
      'buzzfeed',
      'cbs-news',
      'cnn',
      'fox-news',
      'msnbc',
      'nbc-news',
      'newsweek',
      'politico',
      'reuters',
      'the-guardian-uk',
      'the-hill',
      'the-new-york-times',
      'the-wall-street-journal',
      'the-washington-post',
      'usa-today',
    ];
    params.push(`sources=${sources.join(',')}`);
  }
  if (endpoint === 'everything') {
    params.push('language=en');
  }
  if (page) {
    params.push(`page=${page}`);
  }
  const url = `https://newsapi.org/v2/${endpoint}?${params.join('&')}`;
  const req = new Request(url);
  const fetchResponse = await fetch(req).then(response => response.json());
  if (fetchResponse.status !== 'ok') {
    throw new Error(JSON.stringify(fetchResponse));
  }
  return fetchResponse;
}

export default fetchNewsApi;
