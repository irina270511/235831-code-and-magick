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
var CURRENT_PLAYER = 'Вы'; // наименование текущего игрока

/**
 * Рисует облако прямоугольной формы на canvas.
 *
 * @param {function} ctx - вызов контекста canvas.
 * @param {number} x - координата по оси Х.
 * @param {number} y - координата по оси Y.
 * @param {string} color - цвет облака.
 */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
 * Ищет максимальное число в массиве
 *
 * @param {array} arr - массив из чисел.
 * @return {number} maxElement - возвращает максимальное число в массиве.
 */
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

/**
 * Генерирует цвет - либо по заданным параметрам RGBA, либо случайным образом.
 *
 * @param {(number|null)} red - красный цвет, число от 0 до 255. Если равен null, то задается случайным образом.
 * @param {(number|null)} green - зеленый цвет, число от 0 до 255. Если равен null, то задается случайным образом.
 * @param {(number|null)} blue - синий цвет, число от 0 до 255. Если равен null, то задается случайным образом.
 * @param {(number|null)} saturation - насыщенность, число от 0 до 1. Если равна null, то задается случайным образом.
 * @return {string} color - цвет.
 */
var getColor = function (red, green, blue, saturation) {
  if (red === null) {
    red = (Math.round(Math.random() * 255));
  }
  if (green === null) {
    green = (Math.round(Math.random() * 255));
  }
  if (blue === null) {
    blue = (Math.round(Math.random() * 255));
  }
  if (saturation === null) {
    saturation = Math.random();
  }
  var color = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + saturation + ')';
  return color;
};

/**
 * Рисует столбик гистограммы времен. Высота столбика формируется в зависимости от количества милисекунд. Максимальное время занимает всю высоту гистограммы.
 *
 * @param {Object} histogramBar - описание столбика гистограммы, объект со свойствами index, color, name, time.
 * @param {number} histogramBar.index - порядковый номер столбика гистограммы.
 * @param {string} histogramBar.color - цвет столбика гистограммы.
 * @param {string} histogramBar.name - имя игрока, чьи результаты отображает данный столбика гистограммы.
 * @param {number} histogramBar.time - время игрока, чьи результаты отображает данный столбика гистограммы.
 * @param {number} maxTime - максимальное время среди всех игроков, из чьих результатов рисуется гистограмма.
 */
var drawHistogramBar = function (ctx, histogramBar, maxTime) {
  ctx.fillStyle = histogramBar.color;
  if (histogramBar.name === CURRENT_PLAYER) {
    ctx.fillStyle = RED_COLOR;
  }
  var barHeight = MAX_BAR_HEIGHT * histogramBar.time / maxTime; // высота колонки

  var barCoordinateX = CLOUD_X + BAR_GAP * (histogramBar.index + 1) + BAR_WIDTH * histogramBar.index; // координата по оси Х
  var barCoordinateY = CLOUD_HEIGHT + CLOUD_Y - (GAP * 2 + TEXT_HEIGHT) - barHeight; // координата по оси Y
  ctx.fillRect(barCoordinateX, barCoordinateY, BAR_WIDTH, barHeight);
};

/**
 * Рисует текст на canvas.
 *
 * @param {function} ctx - вызов контекста canvas.
 * @param {number} x - координата по оси Х.
 * @param {number} y - координата по оси Y.
 * @param {string} text - текст.
 */
var drawText = function (ctx, text, x, y) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText(text, x, y);
};

/**
 * Отображает окно (облако на canvas) со статистикой времени игры среди текущего и других игроков.
 *
 * @param {function} ctx - вызов контекста canvas.
 * @param {array} names - массив из имен игроков.
 * @param {array} times - массив из времен игры, соответствует времени прохождения игры соответствующих игроков из массива имен.
 */
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var headingCoordinateX = CLOUD_X + BAR_GAP; // координаты по оси Х для строк заголовка
  var firstStringCoordinateY = CLOUD_Y + GAP + TEXT_HEIGHT; // координата по оси Y для первой строки заголовка
  var secondStringCoordinateY = CLOUD_Y + GAP + TEXT_HEIGHT * 2; // координата по оси Y для второй строки заголовка
  drawText(ctx, 'Ура вы победили!', headingCoordinateX, firstStringCoordinateY);
  drawText(ctx, 'Список результатов:', headingCoordinateX, secondStringCoordinateY);

  var maxTime = Math.round(getMaxElement(times)); // максимальное время

  for (var i = 0; i < names.length; i++) {
    var playerName = names[i]; // имя текущего игрока
    var playerNameCoordinateX = CLOUD_X + BAR_GAP * (i + 1) + BAR_WIDTH * i; // координата по оси Х для отрисовки имени текущего игрока
    var playerNameCoordinateY = CLOUD_HEIGHT + CLOUD_Y - GAP; // координата по оси Y для отрисовки имени текущего игрока
    drawText(ctx, playerName, playerNameCoordinateX, playerNameCoordinateY);

    var histogramBar = {
      index: i,
      color: getColor(0, 0, 255, null),
      name: names[i],
      time: times[i]
    };
    drawHistogramBar(ctx, histogramBar, maxTime);

    var playerTime = Math.round(times[i]); // Время текущего игрока

    // Координата по оси Х для отрисовки времени текущего игрока
    // Рассчитывается исходя из начальной координаты по оси Х, прибавляется ширина уже отрисованных колонок и отступов между ними
    var playerTimeCoordinateX = CLOUD_X + BAR_GAP * (i + 1) + BAR_WIDTH * i;

    // Координата по оси Y для отрисовки времени текущего игрока
    // Рассчитывается исходя из начальной координаты по оси Y и высоты облака, отнимается высота трех отступов (между текстом и нижним краем, между текстом и столбиком с двух сторон), высота строки и высота самого столбика
    var playerTimeCoordinateY = CLOUD_HEIGHT + CLOUD_Y - GAP * 3 - TEXT_HEIGHT - (MAX_BAR_HEIGHT * times[i] / maxTime);
    drawText(ctx, playerTime, playerTimeCoordinateX, playerTimeCoordinateY);
  }

};
