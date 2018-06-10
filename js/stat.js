'use strict';

var CLOUD_WIDTH = 420; // ширина облака
var CLOUD_HEIGHT = 270; // высота облака
var CLOUD_X = 100; // начальная координата по оси Х
var CLOUD_Y = 10; // начальная координата по оси Y
var GAP = 10; // отступ по краям
var BAR_GAP = 50; // отступ между колонками
var BAR_WIDTH = 40; // ширина колонки
var MAX_BAR_HEIGHT = 150; // максимальная высота колонки
var TEXT_HEIGHT = 16; // высота шрифта

var textFloor = CLOUD_HEIGHT + CLOUD_Y - GAP; // нижний край текста
var barFloor = CLOUD_HEIGHT + CLOUD_Y - (GAP * 2 + TEXT_HEIGHT); // нижний край колонок

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + BAR_GAP, CLOUD_Y + GAP + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + BAR_GAP, CLOUD_Y + GAP + TEXT_HEIGHT * 2);

  var maxTime = Math.round(getMaxElement(times)); // максимальное время

  for (var i = 0; i < names.length; i++) {
    var actualHeight = MAX_BAR_HEIGHT * times[i] / maxTime; // высота актуальной колонки

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_GAP * (i + 1) + BAR_WIDTH * i, textFloor);

    ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + BAR_GAP * (i + 1) + BAR_WIDTH * i, barFloor - actualHeight, BAR_WIDTH, actualHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP * (i + 1) + BAR_WIDTH * i, barFloor - GAP - actualHeight);
  }

};
