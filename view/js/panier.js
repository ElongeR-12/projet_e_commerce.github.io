'use strict'

function displayResume() {
    const LOCALSTORAGE = JSON.parse(localStorage.getItem('LOCALSTORE'));
    console.log(LOCALSTORAGE);

    let toClone = document.getElementsByClassName('resume-area');//récupérer l'élement html
    for(let i=1; i<LOCALSTORAGE.length; i++){	    
        let clone = toClone[0].cloneNode(true);//cloner l'élément et ses nodes      
        toClone[0].after(clone); //cloner l'élement clone après l'original
    }
}

displayResume();