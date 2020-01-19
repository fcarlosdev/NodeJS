const http = require("http");
const api = require("./api");
const routes = require("./utils/routes");

let server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  let url = req.url;
  if (url === routes.ROOT || url === routes.LIST_USERS) {
    res.end(api.getUsers());
  } else if (url.includes(routes.FIND_USER)) {
    res.end(api.getUser(getParamId(url)));
  } else if (url.includes(routes.ADD_USER)) {
    let name = url
      .substr(url.indexOf("=") + 1, url.length)
      .replace(/%22/g, " ")
      .replace(/%20/g, " ");
    api.addUser({ id: 0, name: name });
    res.end("User added");
  } else if (url.includes(routes.REMOVE_USER)) {
    api.removeUser(getParamId(url));
    res.end("User removed");
  } else if (url.includes(routes.UPDATE_USER)) {
    if (api.updateUser(getParameters(url)) ){
        res.end("User updated");
    } else  {
        res.end("User doesn't exists");
    }
  } else {
    res.end("Node study");
  }
});

server.listen(3000, "localhost", () => {
  console.log("Server listening on port 3000");
});

const getParamId = fromUrl => {
  let char_split = fromUrl.includes("=") ? "=" : "/";
  return fromUrl
    .split(char_split)
    .filter(n => !isNaN(parseInt(n)) && isFinite(n));
};

const getParameters = fromUrl => {
  return fromUrl
    .split("/")
    .filter(param => param.includes("="))
    .map(param => {
      let equalSignalPos = param.indexOf("=") + 1;
      return param.substr(equalSignalPos, param.length);
    });
};
