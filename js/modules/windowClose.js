import { changeIconPosition } from "../submenuRuny.js";


// Clase que cierra un submenu al hacer click en cualquier parte de la pagina web.
export class WindowClose {

    // Metodo que retorna true o false si el elemento al que se le hizo click contiene una clase dada.
    checkIfContainsClass(clickedElement, elementClassesToOmit) {
        let containsClass = false;

        for (const elementClass of elementClassesToOmit) {
            if (clickedElement.classList.contains(elementClass)) {
                containsClass = true;
            }
        }

        return (containsClass ? true : false);
        
    };
   

    submenu(submenuElement, elementClassesToOmit) {
        window.addEventListener('click', (clickedElement) => {
            const clickedElementContainsClass = this.checkIfContainsClass(clickedElement.target, elementClassesToOmit);
            let isNodeList = false

            console.log(clickedElement.target);

            if (submenuElement.length >= 0) {
                isNodeList = true
            }
            
            if (isNodeList) {

                submenuElement.forEach(element => {
                    if (element.classList.contains('visible') && !clickedElementContainsClass) {
                        element.classList.remove('visible');
                        console.log('Si entro')
                  
                    } else {
                        console.log('No me entro bro!')
                    }
                });

            } else {
                if (submenuElement.classList.contains('visible') && !clickedElementContainsClass) {
                    submenuElement.classList.remove('visible');
                    console.log('no soy un arry y entre :D')
                }
            }


        })
    }
}

