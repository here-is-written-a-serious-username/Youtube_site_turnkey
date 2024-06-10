const guardLidogeneration = document.querySelector('.js-guard-lidogeneration');
const lidogenerationEl = document.querySelector('.lidogeneration__list');

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
};
let observer = new IntersectionObserver(onLoad, options);

let isRunning = false; // Змінна для відстеження стану виконання

observer.observe(guardLidogeneration);

function onLoad(entries) {

    entries.forEach((entry) => {
        // console.log(entry.isIntersecting)
        classWithInterval(lidogenerationEl.children, 500, 'animate__fadeInRightBig', 'animate__fadeOutRightBig', entry.isIntersecting);
    });

};

function classWithInterval(elements, interval, classNameIn, classNameOut, entry) {

    isRunning = true;

    if (entry) {
        runEntry()
    }
    if (!entry) {
        runExit()
    }

    aaa();

    function runEntry() {
        var index = 0;
        var intervalId = setInterval(function () {
            if (index < elements.length) {
                elements[index].classList.add(classNameIn);
                elements[index].classList.remove(classNameOut);
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, interval);
    }

    function runExit() {
        var index = elements.length - 1;
        var intervalId = setInterval(function () {
            if (index >= 0) {
                elements[index].classList.add(classNameOut);
                elements[index].classList.remove(classNameIn);
                index--;
            } else {
                clearInterval(intervalId);
            }
        }, interval);
    }

    function aaa() {

        let ddd = elements.classList.contains(classNameIn).length;

        console.log(ddd)

        // перебрати елементи і в кожного провірити чи є клас
        // від цього відштовхуватись, якщо немає 3 таких або 3 таких то знайти той де неспівпадає з більшістю і змінити

    }

}




// const guardLidogeneration = document.querySelector('.js-guard-lidogeneration');
// const lidogenerationEl = document.querySelector('.lidogeneration__list');

// let options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 1.0
// };

// let observer = new IntersectionObserver(onLoad, options);
// observer.observe(guardLidogeneration);

// let isRunning = false; // Змінна для відстеження стану виконання

// function onLoad(entries) {
//     entries.forEach((entry) => {
//         classWithInterval(lidogenerationEl.children, 250, 'animate__fadeInRightBig', 'animate__fadeOutRightBig', entry.isIntersecting);
//     });
// }

// function classWithInterval(elements, interval, classNameIn, classNameOut, entry) {
//     if (isRunning) return; // Якщо процес вже запущено, нічого не робити
//     isRunning = true;

//     function runEntry() {
//         let index = 0;
//         let intervalId = setInterval(function () {
//             if (index < elements.length) {
//                 elements[index].classList.add(classNameIn);
//                 elements[index].classList.remove(classNameOut);
//                 index++;
//             } else {
//                 clearInterval(intervalId);
//                 isRunning = false;

//                 if (!entry) {
//                     isRunning = true;
//                     runExit();
//                 }
//             }
//         }, interval);
//     }

//     function runExit() {
//         let index = elements.length - 1;
//         let intervalId = setInterval(function () {
//             if (index >= 0) {
//                 elements[index].classList.add(classNameOut);
//                 elements[index].classList.remove(classNameIn);
//                 index--;
//             } else {
//                 clearInterval(intervalId);
//                 isRunning = false;
//                 console.log(1)
//                 if (entry) {
//                     console.log(2)
//                     isRunning = true;
//                     runEntry();
//                 }
//             }
//         }, interval);
//     }

//     if (entry) {
//         runEntry();
//     }
//     if (!entry) {
//         runExit();
//     }
// }