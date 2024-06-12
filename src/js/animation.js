const guardLidogenerationList = document.querySelector('.js-guard-lidogeneration-list');
const guardAboutList = document.querySelector('.js-guard-about-list');
const guardServicesList = document.querySelector('.js-guard-services-list');
let observers = [];

window.addEventListener('resize', initializeObservers);

initializeObservers();

function initializeObservers() {
    //////////////////////////////
    if (observers.length > 0) {
        observers.forEach(observer => observer.disconnect());
        observers = [];
    }
    //////////////////////////////
    const width = window.innerWidth;

    const options = {
        lidogen: {
            root: null,
            rootMargin: width < 768 ? '320px' : '100px',
            threshold: 1.0
        },
        about: {
            root: null,
            rootMargin: width < 768 ? '430px' : '700px',
            threshold: 1.0
        },
        services: {
            root: null,
            rootMargin: width < 768 ? '1220px' : '550px',
            threshold: 1.0
        }
    };

    function createObserver(element, options) {
        if (element) {
            const observer = new IntersectionObserver(onIntersectionHandler, options);
            observer.observe(element);
            observers.push(observer);
        }
    }

    createObserver(guardLidogenerationList, options.lidogen);
    createObserver(guardAboutList, options.about);
    createObserver(guardServicesList, options.services);
};

function onIntersectionHandler(entries) {
    entries.forEach((entry) => {
        if (entry.target.children.length > 0) {
            animationClassMaker(entry.target.children, 250, 'animate__fadeInRightBig', 'animate__fadeOutRightBig', entry.isIntersecting);
        }
    });
};

function animationClassMaker(elements, interval, classNameIn, classNameOut, isIntersecting) {

    if (isIntersecting) {
        runEntry()
    } else {
        runExit()
    }

    function runEntry() {
        let index = 0;
        const intervalId = setInterval(function () {
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
        for (const element of elements) {
            element.classList.add(classNameOut);
            element.classList.remove(classNameIn);
        }
    }
};

// перевіряє всі класи і додає ті що зависли під час швидкої зміни entry = фіксить баг
// потрібен коли і вхід і вихід анімації на інтервалах

// function countAndAdClasses(elements, classNameIn, classNameOut) {
//     let countIn = 0;
//     let countOut = 0;

//     for (let i = 0; i < elements.length; i++) {
//         if (elements[i].classList.contains(classNameIn)) {
//             countIn++;
//         }
//         if (elements[i].classList.contains(classNameOut)) {
//             countOut++;
//         }
//     }

//     console.log(`Number of elements with class ${classNameIn}: ${countIn}`);
//     console.log(`Number of elements with class ${classNameOut}: ${countOut}`);

//     if (countOut > countIn) {
//         // Add classNameOut to elements that don't have it
//         for (let i = 0; i < elements.length; i++) {
//             if (!elements[i].classList.contains(classNameOut)) {
//                 elements[i].classList.add(classNameOut);
//                 elements[i].classList.remove(classNameIn);
//             }
//         }
//     } else {
//         // Add classNameIn to elements that don't have it
//         for (let i = 0; i < elements.length; i++) {
//             if (!elements[i].classList.contains(classNameIn)) {
//                 elements[i].classList.add(classNameIn);
//                 elements[i].classList.remove(classNameOut);
//             }
//         }
//     }
// }