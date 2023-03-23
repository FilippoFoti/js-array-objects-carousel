// Inserisco le immagini dinamiche nell'array

const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

const itemsContainer = document.querySelector(".slider-items");
const itemsContainerBonus = document.querySelector(".slider-bonus");

let isPlayed = true;
let isNext = true;

for (let i = 0; i < images.length; i++) {
    const currentImg = images[i];

    const sliderItem = `<div class ="item">
                            <img src="${currentImg.image}" alt="">
                            <div class ="text"> 
                                <h3 class ="title">${currentImg.title}</h3>
                                <h4 class ="subtitle">${currentImg.text}</h4>
                            </div>
                        </div>`;
    const sliderBonus =`<div class ="bonus" index="${i}"><img src="${currentImg.image}" alt=""></div>`;
    itemsContainer.innerHTML += sliderItem;
    itemsContainerBonus.innerHTML += sliderBonus;
};

// Imposto la prima immagine e nascondo le altre in css
const itemsArray = document.getElementsByClassName("item");
console.log(itemsArray);

let activeItemIndex = 0;
itemsArray[activeItemIndex].classList.add("active");

const secondBonus = document.getElementsByClassName("bonus");
console.log(secondBonus);

secondBonus[activeItemIndex].classList.add("bonus-active");


// Click primo bottone
const nextBtn = document.querySelector(".next");
nextBtn.addEventListener("click", function() {
    nextSlide();
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 3000);
});

// Click secondo bottone 
const prevBtn = document.querySelector(".prev");
prevBtn.addEventListener("click", function () {
    prevSlide();
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 3000);
});


// AUTOPLAY

let autoplayInterval;

function nextSlide() {
    prevBtn.classList.remove("hidden");
    if (activeItemIndex < (itemsArray.length - 1)) {
        itemsArray[activeItemIndex].classList.remove("active");
        secondBonus[activeItemIndex].classList.remove("bonus-active");

        activeItemIndex++;

        itemsArray[activeItemIndex].classList.add("active");
        secondBonus[activeItemIndex].classList.add("bonus-active");
    } else {
        itemsArray[activeItemIndex].classList.remove("active");
        secondBonus[activeItemIndex].classList.remove("bonus-active");

        activeItemIndex = 0;

        itemsArray[activeItemIndex].classList.add("active");
        secondBonus[activeItemIndex].classList.add("bonus-active");
    }
};

function prevSlide() {
    if (activeItemIndex > 0) {
        // Rimuovo l'hidden dal bottone
        nextBtn.classList.remove("hidden");
    
        // Rimuovo active
        itemsArray[activeItemIndex].classList.remove("active");
        secondBonus[activeItemIndex].classList.remove("bonus-active");
    
        // Decremento
        activeItemIndex--;
    
        // aggiungo active alla nuova img
        itemsArray[activeItemIndex].classList.add("active");
        secondBonus[activeItemIndex].classList.add("bonus-active");
    
    } else {
        // Rimuovo active
        itemsArray[activeItemIndex].classList.remove("active");
        secondBonus[activeItemIndex].classList.remove("bonus-active");

        activeItemIndex = 4;

        // aggiungo active alla nuova img
        itemsArray[activeItemIndex].classList.add("active");
        secondBonus[activeItemIndex].classList.add("bonus-active");
    }
};

function startAutoplay(isNext) {
    if (isNext) return setInterval(nextSlide, 3000);
    return setInterval(prevSlide, 3000);
};

function stopAutoplay() {
    clearInterval(autoplayInterval);
};

autoplayInterval = startAutoplay(isNext);

// Bonus 2

itemsContainer.addEventListener("mouseover", function() {
    clearInterval(autoplayInterval)
});

itemsContainer.addEventListener("mouseout", function() {
    autoplayInterval = setInterval(nextSlide, 3000)
});

// Click dell'immagine

document.querySelectorAll(".bonus").forEach(x => x.addEventListener("click", ClickImage));

function ClickImage(event) {
    const index = event.currentTarget.getAttribute("index");
    activeItemIndex = parseInt(index);
    document.querySelector(".bonus-active").classList.remove("bonus-active");
    document.querySelector(".active").classList.remove("active");
    itemsArray[activeItemIndex].classList.add("active");
    secondBonus[activeItemIndex].classList.add("bonus-active");

    clearInterval(autoplayInterval)
    setTimeout(() => {
        autoplayInterval = startAutoplay(isNext);
    }, 100)
};

document.querySelector("start-stop").addEventListener("click", () => {
    isPlayed = !isPlayed;
    if(!isPlayed) return stopAutoplay()
    autoplayInterval = startAutoplay(isNext);
});

document.querySelector(".invert").addEventListener("click", () => {
    stopAutoplay()
    isNext = !isNext;
    autoplayInterval = startAutoplay(isNext);
});