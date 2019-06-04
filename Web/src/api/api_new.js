import Axios from "axios";

let appUri = "http://localhost/ServerMonitor/";
if (process.env.NODE_ENV === "production") {
  appUri = document.location.href;
}

const apiUri = `${appUri}Monitor/`;
const oracleUri = `${appUri}OracleInstance`;
const sessionsUri = `${appUri}Sessions`;
const diskUri = `${apiUri}GetDiskUsage`;
const setOracleUri = `${appUri}OracleInstanceReservation`;
const tasksUri = `${appUri}Tasks/`;
// const hardwareUri = `${appUri}Hardware/`;
const hardwareUri = `${appUri}Hardware/GetAll`;
const iisUri = `${appUri}Iis/`; //TODO DELETE
const iisStopUri = `${appUri}Iis/Toggle`;
const iisWhitelistUri = `${appUri}Iis/Whitelist`;
const iisRecycleUri = `${iisUri}Recycle/`;
const linksUri = `${appUri}Links/`;
const settingsUri = `${appUri}Settings/`;

export function setIisApp(appList) {
  return Axios.post(iisStopUri, JSON.stringify(appList), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function setOracle(data) {
  return Axios.put(setOracleUri, data);
}

export function whitelistApp(app) {
  return Axios.post(`${iisWhitelistUri}/${app}`);
}

export function recycleApp(appName) {
  return Axios.post(`${iisRecycleUri}${appName}/`);
}

export function getServices() {
  return Axios.get(linksUri);
}

export function getHardware() {
  return Axios.get(hardwareUri);
}

export function getIisApps(prefix) {
const url = prefix? prefix:appUri;
  return Axios.get(`${url}Iis/`);
}

export function getDisk() {
  return Axios.get(diskUri);
}

export function getOracleInstancies() {
  return Axios.get(oracleUri);
}

export function setNote(data) {
  return Axios.post(`${appUri}Iis/SaveBuildNote`, data);
}

export function getUserSessions() {
  return Axios.get(`${sessionsUri}`);
}

export function killUser(data) {
  return Axios.delete(`${sessionsUri}/${data}`);
}

export function getTasks() {
  return Axios.get(tasksUri);
}

export function runTask(name) {
  return Axios.post(`${tasksUri}/${name}`);
}

export function getSettings(force) {
  const forceParam = !!force ? "?force=true" : "";
  return Axios.get(settingsUri + forceParam);
}

export function setSettings(settings) {
  return Axios.put(settingsUri, settings);
}

export function checkLink(data) {
  return Axios.post(`${linksUri}`, data);
}

export function getServerLinks(url) {
  return Axios.get(`${url}Settings`);
}

export function asd(urls) {
  
  const promises = urls.map(x => Axios.get(x.url));
  return Axios.all(promises);
}
