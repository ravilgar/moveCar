/*
    _________________________________
    /////////////////////////////////
    
    Move Car
    
    - машинка должна двигаться при 
    наведении мышки на текст с 
    id="moveAuto"

    - машинка едет обратно, когда 
    мышка выходит за пределы текста
    с id="moveAuto"

    !! Дополнительно сделано:

    - машинка остановиться, достигнув 
    края трассы   

    - машинка остановиться и повернется 
    вокруг оси, вернувшись в начальное
    положение 
    ________________________________
    ////////////////////////////////

*/


//  ------------------------------------
//  Инициализируем глобальные переменные
//  ------------------------------------


// Объекты DOM

// Подхватываем переменную DOM img
var auto = document.querySelector("#auto");
// Трасса машинки
var track = document.querySelector("#track");
// Подхватываем переменную DOM h1
var h1 = document.querySelector("#moveAuto");


// Переменные для логики приложения

// Максимальный размер трассы
var maxWidth;
// Максимальный размер трассы получаем при следующих event-ах
var maxWidthEvents = ["load", "resize"];
// Позиция машинки на экране
var pos = 0;
// Переменные для проверки, что находимся внутри event-а
var conditionOfMouseover = false;
var conditionOfMouseout = false;
// Список event-ов и других объектов, воздействующих на поведение автомобиля
var moveEvents = {
    ahead: {
        events: ["touchstart", "mouseover"],
        purpose: moveAhead,
        conditionOfMouseover1: true,
        conditionOfMouseout2: false
    },
    back: {
        events: ["touchend", "mouseout"],
        purpose: moveBack,
        conditionOfMouseover1: false,
        conditionOfMouseout2: true
    }
};

//  ------------------------------------
//  Логика приложения
//  ------------------------------------

// Находим размер экрана при событиях из списка maxWidthEvents
for (var i = 0; i < maxWidthEvents.length; i++) {
    window.addEventListener(maxWidthEvents[i], function() {
        maxWidth = track.clientWidth;

    });
}

// Вешаем обработчики событий
Object.keys(moveEvents).forEach(function(key) {
    for (var i = 0; i < moveEvents[key].events.length; i++) {
        h1.addEventListener(moveEvents[key].events[i], function() {
            // Проверка, что находимся внутри ивента
            conditionOfMouseover = moveEvents[key].conditionOfMouseover1;
            conditionOfMouseout = moveEvents[key].conditionOfMouseout2;

            move(moveEvents[key].purpose);
        });
    }
});

// Функция задает движение машинке
function move(direction) {
    // Вызов функции move через каждые 5 миллисекунд
    var id = setInterval(move, 5);

    function move() {
        if (direction()[0]) {
            // Остановим вызов функции move
            clearInterval(id);
            // Добавляем класс для поворота машины вокруг оси
            auto.classList.toggle("reflect");
        } else {
            // Меняeм значение текущей позиции для машины
            direction()[1];
            auto.style.left = pos + 'px';
        }
    }
}

// При движении вперед
function moveAhead() {
    var condition = Boolean(pos >= (maxWidth - auto.clientWidth) || !conditionOfMouseover);
    return [condition, pos++];
}
// При движении назад
function moveBack() {
    var condition = Boolean(pos <= 0 || !conditionOfMouseout);
    return [condition, pos--];
}
