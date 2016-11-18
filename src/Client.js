const projectId = "350c56bb-c7c2-457c-b627-c219da0c8f01";
const previewApiKey = "ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAidWlkIjogInVzcl8wdk9acUZFMjJyclY0QlFqektRVFFKIiwNCiAgImVtYWlsIjogIm1hcnRpbmhAa2VudGljby5jb20iLA0KICAiZ2l2ZW5fbmFtZSI6ICJNYXJ0aW4iLA0KICAiZmFtaWx5X25hbWUiOiAiSGVqdG1hbmVrIiwNCiAgInByb2plY3RfaWQiOiAiMzUwYzU2YmItYzdjMi00NTdjLWI2MjctYzIxOWRhMGM4ZjAxIiwNCiAgImp0aSI6ICJLTGdsU1MtNjRBUnZRbnBYIiwNCiAgInZlciI6ICIxLjAuMCIsDQogICJhdWQiOiAicHJldmlldy5kZWxpdmVyLmtlbnRpY29jbG91ZC5jb20iDQp9.VkpoRT98aZKpdzaucI4xo0mJb_8gnjYoEk48EXkKYGU";

function getJsonContent(url, options) {
  let headers = {}
  if (previewApiKey !== "") {
    headers = { headers: { "Authorization": "Bearer " + previewApiKey } }
    url = "https://previewkenticodeliverdev.global.ssl.fastly.net/" + projectId + "/" + url;
  } else {
    url = "https://kenticodeliverdev.global.ssl.fastly.net/" + projectId + "/" + url;
  }

  if (options) {
    let parameters = Object.getOwnPropertyNames(options).map((name) => encodeURIComponent(name) + "=" + encodeURIComponent(options[name]));
    if (parameters.length > 0) {
      url = url + "?" + parameters.join("&");
    }
  }

  return fetch(url, headers).then(checkStatus).then((response) => response.json());
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  let error = "HTTP error " + response.status + ": " + response.statusText;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

class Client {

  getItem(codename, options) {
    return getJsonContent("items/" + encodeURIComponent(codename), options);
  }

  getItems(options) {
    return getJsonContent("items", options);
  }
  
}

export default new Client();