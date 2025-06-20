// modules/search/search.js

const axios = require("axios");

module.exports = async function handleSearch(query) {
  const cleaned = query.toLowerCase();
  const isSearch = cleaned.startsWith("search") || cleaned.startsWith("find");

  if (!isSearch) return false;

  const searchQuery = query.replace(/^(search|find)\s+for\s+/i, "").replace(/^(search|find)\s+/i, "").trim();
  
  try {
    const response = await axios.get(`https://api.duckduckgo.com/?q=${encodeURIComponent(searchQuery)}&format=json`);
    if (response.data.AbstractText) {
      return response.data.AbstractText;
    } else if (response.data.RelatedTopics && response.data.RelatedTopics.length > 0) {
      return response.data.RelatedTopics[0].Text || "I found something, but it's hard to summarize.";
    } else {
      return "Sorry, I couldn't find a direct answer, but you can check online.";
    }
  } catch (err) {
    return "I couldn't perform the search. Make sure you're connected to the internet.";
  }
};
