import { changeIconPosition } from "../submenuRuny.js";


// Clase que cierra un submenu al hacer scroll.
export class CloseSubmenuScroll {

    closeSubmenuWithScroll(whatSubmenu, submenuElement) {

        // Escuchamos el evento scroll
        window.addEventListener('scroll', () => {

            // Cerramos el submenuMore al hacer scroll.
            if (whatSubmenu == 'submenuMore') {
                if (submenuElement.classList.contains('visible')) {
                    submenuElement.classList.remove('visible');
                }
            
            // Cerramos el submenu al hacer scroll.
            } else {
                // Recoremos cada uno de los submenus y si esta abierto lo cerramos.
                submenuElement.forEach((element, index) => {
                    if (element.classList.contains('visible')) {
                        element.classList.remove('visible');

                        // Cambiamos de posicion a cerrado el icono.
                        changeIconPosition('close', index);
                    }
                })
            }


        })    
    
    }
}