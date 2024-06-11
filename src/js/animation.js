// const guardLidogenerationList = document.querySelector('.js-guard-lidogeneration-list');
// const guardAboutList = document.querySelector('.js-guard-about-list');
// const guardServicesList = document.querySelector('.js-guard-services-list');


// let optionsLidogen = {
//     root: null,
//     rootMargin: '100px',
//     threshold: 1.0
// };
// let optionsAbout = {
//     root: null,
//     rootMargin: '700px',
//     threshold: 1.0
// };
// let optionsServices = {
//     root: null,
//     rootMargin: '550px',
//     threshold: 1.0
// };

// let observerLidogen = new IntersectionObserver(onLoad, optionsLidogen);
// let observerAbout = new IntersectionObserver(onLoad, optionsAbout);
// let observerServices = new IntersectionObserver(onLoad, optionsServices);

// observerLidogen.observe(guardLidogenerationList);
// observerAbout.observe(guardAboutList);
// observerServices.observe(guardServicesList);

// function onLoad(entries) {
//     entries.forEach((entry) => {
//         console.log(entry.target)
//         animationClassMaker(entry.target.children, 250, 'animate__fadeInRightBig', 'animate__fadeOutRightBig', entry.isIntersecting);
//     });
// };

// function animationClassMaker(elements, interval, classNameIn, classNameOut, isIntersecting) {

//     if (isIntersecting) {
//         runEntry()
//         // countAndAdjustClasses(elements, classNameIn, classNameOut);
//     }
//     if (!isIntersecting) {
//         runExit()
//         // countAndAdjustClasses(elements, classNameIn, classNameOut);
//     }

//     function runEntry() {
//         var index = 0;
//         var intervalId = setInterval(function () {
//             if (index < elements.length) {
//                 elements[index].classList.add(classNameIn);
//                 elements[index].classList.remove(classNameOut);
//                 index++;
//             } else {
//                 clearInterval(intervalId);
//                 // countAndAdjustClasses(elements, classNameIn, classNameOut);
//             }
//         }, interval);
//     }

//     function runExit() {
//         var index = elements.length - 1;
//         var intervalId = setInterval(function () {
//             if (index >= 0) {
//                 elements[index].classList.add(classNameOut);
//                 elements[index].classList.remove(classNameIn);
//                 index--;
//             } else {
//                 clearInterval(intervalId);
//                 // countAndAdjustClasses(elements, classNameIn, classNameOut);
//             }
//         }, 1); // якщо не треба буде послідовна анімація виходу то забрати інтервал
//     }

//     // перевіряє всі класи і додає ті що зависли під час швидкої зміни entry = фіксить баг
//     // function countAndAdjustClasses(elements, classNameIn, classNameOut) {
//     //     let countIn = 0;
//     //     let countOut = 0;

//     //     for (let i = 0; i < elements.length; i++) {
//     //         if (elements[i].classList.contains(classNameIn)) {
//     //             countIn++;
//     //         }
//     //         if (elements[i].classList.contains(classNameOut)) {
//     //             countOut++;
//     //         }
//     //     }

//     //     console.log(`Number of elements with class ${classNameIn}: ${countIn}`);
//     //     console.log(`Number of elements with class ${classNameOut}: ${countOut}`);

//     //     if (countOut > countIn) {
//     //         // Add classNameOut to elements that don't have it
//     //         for (let i = 0; i < elements.length; i++) {
//     //             if (!elements[i].classList.contains(classNameOut)) {
//     //                 elements[i].classList.add(classNameOut);
//     //                 elements[i].classList.remove(classNameIn);
//     //             }
//     //         }
//     //     } else {
//     //         // Add classNameIn to elements that don't have it
//     //         for (let i = 0; i < elements.length; i++) {
//     //             if (!elements[i].classList.contains(classNameIn)) {
//     //                 elements[i].classList.add(classNameIn);
//     //                 elements[i].classList.remove(classNameOut);
//     //             }
//     //         }
//     //     }
//     // }
// };


const guardLidogenerationList = document.querySelector('.js-guard-lidogeneration-list');
const guardAboutList = document.querySelector('.js-guard-about-list');
const guardServicesList = document.querySelector('.js-guard-services-list');

let optionsLidogen = {
    root: null,
    rootMargin: '100px',
    threshold: 1.0
};
let optionsAbout = {
    root: null,
    rootMargin: '700px',
    threshold: 1.0
};
let optionsServices = {
    root: null,
    rootMargin: '550px',
    threshold: 1.0
};

let observerLidogen = new IntersectionObserver(onLoad, optionsLidogen);
let observerAbout = new IntersectionObserver(onLoad, optionsAbout);
let observerServices = new IntersectionObserver(onLoad, optionsServices);

observerLidogen.observe(guardLidogenerationList);
observerAbout.observe(guardAboutList);
observerServices.observe(guardServicesList);

function onLoad(entries) {
    entries.forEach((entry) => {
        animationClassMaker(entry.target.children, 250, 'animate__fadeInRightBig', 'animate__fadeOutRightBig', entry.isIntersecting);
    });
}


function animationClassMaker(elements, interval, classNameIn, classNameOut, isIntersecting) {
    if (isIntersecting) {
        runAnimation(elements, interval, classNameIn, classNameOut, true);
    } else {
        runAnimation(elements, interval, classNameIn, classNameOut, false);
    }
}

function runAnimation(elements, interval, classNameIn, classNameOut, isEntry) {
    let index = 0;

    if (isEntry) {
        let currentIntervalId = setInterval(() => {
            if (index < elements.length) {
                elements[index].classList.add(classNameIn);
                elements[index].classList.remove(classNameOut);
                index++;
            } else { clearInterval(currentIntervalId); }
        }, interval);
    }
    if (!isEntry) {
        for (const element of elements) {
            element.classList.add(classNameOut);
            element.classList.remove(classNameIn);
        }

    }

    // function runEntry() {
    //         var index = 0;
    //         var intervalId = setInterval(function () {
    //             if (index < elements.length) {
    //                 elements[index].classList.add(classNameIn);
    //                 elements[index].classList.remove(classNameOut);
    //                 index++;
    //             } else {
    //                 clearInterval(intervalId);
    //                 // countAndAdjustClasses(elements, classNameIn, classNameOut);
    //             }
    //         }, interval);
    //     }
}
