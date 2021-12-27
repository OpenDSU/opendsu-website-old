const {setConfig, getConfig, addHook, setSkin} = WebCardinal.preload;
const {define} = WebCardinal.components;

async function initializeWebCardinalConfig() {
  const config = getConfig();
  config.translations = false;
  console.log("preload config", config);

  return config;
}

const config = await initializeWebCardinalConfig();
setConfig(config);

addHook("beforePageLoads", "webcardinal-skins", () => {
  setSkin("advanced");
  WebCardinal.state.translations = true;
});

addHook("beforePageLoads", "webcardinal-cheatsheet", () => {
  console.log("Hello Cheatsheet!");
});

define("webc-xyz-cheatsheet", {shadow: true});
define("webc-xyz-preferences");
define("webc-xyz-slider");
