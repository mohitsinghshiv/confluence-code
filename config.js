require("dotenv").config();

const {
  ALGOLIA_APP_ID,
  ALGOLIA_API_KEY,
  GOOGLE_INDEX_NAME,
  CONFLUENCE_INDEX_NAME,
  JIRA_INDEX_NAME,
  GOOGLE_DRIVE_URL,
  JIRA_WEBHOOK_URL,
} = process.env;

module.exports = {
  algoliaId: ALGOLIA_APP_ID,
  algoliaApiKey: ALGOLIA_API_KEY,
  googleIndexName: GOOGLE_INDEX_NAME,
  confluenceIndexName: CONFLUENCE_INDEX_NAME,
  jiraIndexName: JIRA_INDEX_NAME,
  googleDriveUrl: GOOGLE_DRIVE_URL,
  jiraWebHookurl: JIRA_WEBHOOK_URL,
};
