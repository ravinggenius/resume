$(function () {
  $('.section .section').draggable({
    handle: 'h3',
    opacity: 0.65,
    revert: true,
    revertDuration: 500,
    zIndex: 1000
  });
});