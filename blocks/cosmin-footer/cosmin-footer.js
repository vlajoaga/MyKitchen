import { stringToHTML } from "../../scripts/template.js"

/**
 * @param {Element} block
 */
export default async function decorate(block) {
    const aici = stringToHTML("<marquee><b>Eat like there's no tomorrow!!!</b></marquee>")
    block.append(aici);
  }
