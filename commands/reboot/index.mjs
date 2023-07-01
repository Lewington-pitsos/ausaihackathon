import { boot } from "../../util/screens.js";

const output = "Okay ;_;";

const pageHref = window.location.search;
const searchParams = new URLSearchParams(pageHref.substring(pageHref.indexOf('?')));

export { output };
export default () => boot(searchParams.get('goto'));
