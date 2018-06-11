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
var RED_COLOR = 'rgba(255, 0, 0, 1)'; // цвет столбика гистограммы для текущего игрока

// отрисовка облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// поиск максимального числа в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// получение случайного цвета
// тип аргументов red, green, blue: int
var getRandomColor = function (red, green, blue) {
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
// obj = описание столбика гистограммы, тип: объект со свойствами index(int), color(string), name(string), time(int)
// maxTime = максимальное время среди всех игроков, тип: int
var drawHistogramBar = function (ctx, obj, maxTime) {
  ctx.fillStyle = obj.color;
  if (obj.name === 'Вы') {
    ctx.fillStyle = RED_COLOR;
  }
  var barHeight = MAX_BAR_HEIGHT * obj.time / maxTime; // высота колонки
  var barCoordinateX = CLOUD_X + BAR_GAP * (obj.index + 1) + BAR_WIDTH * obj.index; // координата по оси Х
  var barCoordinateY = CLOUD_HEIGHT + CLOUD_Y - (GAP * 2 + TEXT_HEIGHT) - barHeight; // координата по оси Y
  ctx.fillRect(barCoordinateX, barCoordinateY, BAR_WIDTH, barHeight);
};

// отрисовка текста
// text = текст, тип: string
// coordinateX = координата по оси Х, тип: int
// coordinateY = координата по оси Y, тип: int
var drawText = function (ctx, text, coordinateX, coordinateY) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText(text, coordinateX, coordinateY);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var headingCoordinateX = CLOUD_X + BAR_GAP;
  var firstStringCoordinateY = CLOUD_Y + GAP + TEXT_HEIGHT;
  var secondStringCoordinateY = CLOUD_Y + GAP + TEXT_HEIGHT * 2;
  drawText(ctx, 'Ура вы победили!', headingCoordinateX, firstStringCoordinateY);
  drawText(ctx, 'Список результатов:', headingCoordinateX, secondStringCoordinateY);

  var maxTime = Math.round(getMaxElement(times)); // максимальное время

  for (var i = 0; i < names.length; i++) {
    var playerName = names[i];
    var playerNameCoordinateX = CLOUD_X + BAR_GAP * (i + 1) + BAR_WIDTH * i;
    var playerNameCoordinateY = CLOUD_HEIGHT + CLOUD_Y - GAP;
    drawText(ctx, playerName, playerNameCoordinateX, playerNameCoordinateY);

    var histogramBar = {
      index: i,
      color: getRandomColor(0, 0, 255),
      name: names[i],
      time: times[i]
    };
    drawHistogramBar(ctx, histogramBar, maxTime);

    var playerTime = Math.round(times[i]);
    var playerTimeCoordinateX = CLOUD_X + BAR_GAP * (i + 1) + BAR_WIDTH * i;
    var playerTimeCoordinateY = CLOUD_HEIGHT + CLOUD_Y - (GAP * 2 + TEXT_HEIGHT) - GAP - MAX_BAR_HEIGHT * times[i] / maxTime;
    drawText(ctx, playerTime, playerTimeCoordinateX, playerTimeCoordinateY);
  }

};


