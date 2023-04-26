import { stringToHTML } from "../../scripts/template.js";

var k = 1;
var globalBlock;

/**
 *
 * @param {Element} block
 * @param {string} index
 */
function showCarouselImage(block, index) {
  const items = [...block.querySelectorAll(".carousel-item")];
  const visibleItemIdx = items.findIndex((item) =>
    item.classList.contains("carousel-item--visible")
  );
  // const show = (idx) => {
  //   const bullets = [...block.querySelectorAll("button.bullet-btn")];
  //   items.forEach((item) => item.classList.remove("carousel-item--visible"));
  //   bullets.forEach((button) => button.classList.remove("bullet-btn--active"));
  //   items[idx].classList.add("carousel-item--visible");
  //   bullets[idx].classList.add("bullet-btn--active");
  // };

  let itemIdxToShow = 0;
  switch (index) {
    case "next":
      itemIdxToShow = (visibleItemIdx + 1) % items.length;
      break;
    case "prev":
      itemIdxToShow = (visibleItemIdx + items.length - 1) % items.length;
      break;
    default:
      itemIdxToShow = parseInt(index, 10);
  }
  show(itemIdxToShow);
}

/**
 * @param {Element} block
 */
function initCarouselEvents(block) {
  /**
   *
   * @param {Event} evt
   */
  const onButtonClick = (evt) => {
    const { target: button } = evt;
    if (!button.dataset.nav) {
      return;
    }
    showCarouselImage(block, button.dataset.nav);
  };

  block.addEventListener("click", onButtonClick);
}

/**
 * @param {number} count
 */
function createCarouselControls(count) {
  const markup = stringToHTML(
    `<div class="carousel-controls">
        <div class="bullets">
            ${new Array(count)
              .fill()
              .map((_, idx) =>
                idx === 0
                  ? `<button class="bullet-btn bullet-btn--active" data-nav="${idx}">•</button>`
                  : `<button class="bullet-btn" data-nav="${idx}">•</button>`
              )
              .join("")}
        </div>
        <div class="nav-buttons">
            <button class="nav-btn" data-nav="prev">←</button>
            <button class="nav-btn" data-nav="next">→</button>
        </div>
    </div>`
  );

  return markup;
}

/**
 * @param {Element} block
 */
export default async function decorate(block) {
  globalBlock = block;
  const wrapper = block.parentElement;
  const section = block.closest("div.section");

  if (block.classList.contains("fullbleed")) {
    wrapper.classList.add("fullbleed-wrapper");
  }

  const carouselItems = [...block.querySelectorAll(":scope > div")];
  carouselItems.forEach((item, idx) => {
    const [picture, content] = item.querySelectorAll(":scope > div");

    item.classList.add(
      "carousel-item",
      idx === 0 ? "carousel-item--visible" : "carousel-item"
    );
    picture?.classList.add("carousel-pic");
    content?.classList.add("carousel-content");
  });

  if (carouselItems.length < 2) {
    return;
  }

  block.append(createCarouselControls(carouselItems.length));

  initCarouselEvents(block);
}

async function fadeOut( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s ease";

    el.style.opacity = 0;
    setTimeout(function() {
        //el.parentNode.removeChild(el);
    }, speed);
}

function fadeIn( el, speed ) {
  var seconds = speed/1000;
  el.style.transition = "opacity "+seconds+"s ease";

  el.style.opacity = 100;
  setTimeout(function() {
      //el.parentNode.removeChild(el);
  }, speed);
}

async function show(idx) {
  console.log("SHOW!");
  const items = [...globalBlock.querySelectorAll(".carousel-item")];
  const bullets = [...globalBlock.querySelectorAll("button.bullet-btn")];
  items.forEach((item) => {fadeOut(item, 1500);});
//  fadeOut(items[idx-1], 1500);
  bullets.forEach((button) => button.classList.remove("bullet-btn--active"));
  await new Promise(r => setTimeout(r, 500));
  items.forEach((item) => {item.classList.remove("carousel-item--visible");});
  items[idx].classList.add("carousel-item--visible");
  bullets[idx].classList.add("bullet-btn--active");
  await new Promise(r => setTimeout(r, 100));
  //items.forEach((item) => {fadeIn(item, 1500);});
  fadeIn(items[idx], 1500);
}

async function changePage() {
  ++k;
  console.log("k = "+k);

  await show(k-1);

  //await new Promise(r => setTimeout(r, 2000));

  if (k>=3) {
    k = 0;
  }
}

setInterval(changePage, 3000);
