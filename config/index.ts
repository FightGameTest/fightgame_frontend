let defaultExport = {
  afterDiscordLoginProductionUrl: "https://localhost:3000", //Use production url here
};

typeof window !== "undefined";

if (typeof window !== "undefined") {
  if (window.location.href.indexOf(":3000") > -1) {
    defaultExport.afterDiscordLoginProductionUrl = "https://localhost:3000";
  }
}

export default defaultExport;