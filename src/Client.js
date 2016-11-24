const projectId = "85e06f31-6a8f-405c-ba9c-dc7aed4ed373";
const previewApiKey = "ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAidWlkIjogInVzcl8wdk9qZW5EZFdCQ3hJQUJaaEw4dUIzIiwNCiAgImVtYWlsIjogIm1hcnRpbi5oZWp0bWFuZWtAa2VudGljby5jb20iLA0KICAiZ2l2ZW5fbmFtZSI6ICJDb21wb3NlIiwNCiAgImZhbWlseV9uYW1lIjogIlByb3RvdHlwZXMiLA0KICAicHJvamVjdF9pZCI6ICI4NWUwNmYzMS02YThmLTQwNWMtYmE5Yy1kYzdhZWQ0ZWQzNzMiLA0KICAianRpIjogIm5aRWJqcVY4dmFRU2o3V0YiLA0KICAidmVyIjogIjEuMC4wIiwNCiAgImF1ZCI6ICJwcmV2aWV3LmRlbGl2ZXIua2VudGljb2Nsb3VkLmNvbSINCn0.-GofeOa9pFmaUcZhm54ZkVwtvKN1_nYPDUO028lpXnY";

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