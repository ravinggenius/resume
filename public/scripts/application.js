$(document).ready(function () {
  $('section article').draggable({
    handle: 'header',
    opacity: 0.65,
    revert: true,
    revertDuration: 500,
    zIndex: 1000
  });
});
