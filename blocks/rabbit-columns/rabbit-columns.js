export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`rabbit-columns-${cols.length}-cols`);

  var k = 0;

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          ++k;
          if (k%2==0) {
            picWrapper.classList.add('columns-img-col');
            //picWrapper.add(onclick=function() { this.alert("Somon!"); });
          } else {
            picWrapper.classList.add('columns-img-col2');
            //picWrapper.add(onclick=function() { this.alert("Chiftele!"); });
          }
        }
      }
    });
  });
}
