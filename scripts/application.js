$(function () {
  $('.section .section').draggable({
    handle: 'h3',
    opacity: 0.65,
    revert: true,
    revertDuration: 250,
    zIndex: 1000
  });
});
