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

// отрисовка облака
var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// поиск максимального числа в массиве
var getMaxElement = function(arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// получение случайного цвета
var getRandomColor = function(red, green, blue) {
  if (red === undefined) {
    red = (Math.round(Math.random() * 255));
  }
  if (green === undefined) {
    green = (Math.round(Math.random() * 255));
  }
  if (blue === undefined) {
    blue = (Math.round(Math.random() * 255));
  }
  var color = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + Math.random() + ')';
  return color;
};

// отрисовка столбика гистограммы
var drawHistogramBar = function(ctx, color, index, name, time, maxTime) {
  var actualHeight = MAX_BAR_HEIGHT * time / maxTime; // высота актуальной колонки

  ctx.fillStyle = color;
  if (name === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  }

  ctx.fillRect(CLOUD_X + BAR_GAP * (index + 1) + BAR_WIDTH * index, barFloor - actualHeight, BAR_WIDTH, actualHeight);
};

// отрисовка текста (с одинаковой координатой Х)
var drawText = function(ctx, style, index, text, coordinateY) {
  ctx.fillStyle = style;
  ctx.fillText(text, CLOUD_X + BAR_GAP * (index + 1) + BAR_WIDTH * index, coordinateY);
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + BAR_GAP, CLOUD_Y + GAP + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + BAR_GAP, CLOUD_Y + GAP + TEXT_HEIGHT * 2);

  var maxTime = Math.round(getMaxElement(times)); // максимальное время

  for (var i = 0; i < names.length; i++) {
    drawText(ctx, '#000', i, names[i], textFloor);
    drawHistogramBar(ctx, getRandomColor(0, 0, 255), i, names[i], times[i], maxTime);
    drawText(ctx, '#000', i, Math.round(times[i]), barFloor - GAP - MAX_BAR_HEIGHT * times[i] / maxTime);
  }

};


