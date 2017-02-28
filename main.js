// Подхватываем переменную DOM img
var auto = document.querySelector("img");
// Подхватываем переменную DOM h1
var h1 = document.querySelector("h1");
// Подхватываем переменную DOM h1
var div = document.querySelector("div");

// При наведении мыши выполняем анонимную функцию
h1.addEventListener("mouseover", function( event ) {   
    // Добавляем класс с движением
    auto.classList.add("moveImg");        
    auto.classList.remove("reflect");
    div.classList.remove("divRef");

  });

// При уходе мыши с объекта выполняем анонимную функцию
h1.addEventListener("mouseout", function( event ) {   
    // Добавляем класс с движением
    auto.classList.remove("moveImg");
    auto.classList.add("reflect");
    div.classList.add("divRef");

  });