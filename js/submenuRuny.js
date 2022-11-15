import { WindowClose } from "./modules/windowClose.js";


// Funcion que cambia la posicion del icon al abrir o cerrar el submenu.
export const changeIconPosition = (status, index, position) => {
    // Obtenemos los dos icon.
    const containerIcon = document.querySelectorAll('.container-icon');
    
    // Agregamos y quitamos la clase 'hidden'.
    const firstIcon = containerIcon[index].firstElementChild.classList.toggle('hidden');
    const secoundIcon = containerIcon[index].lastElementChild.classList.toggle('hidden');


    // Validamos la funcion a realizar.
    if (status == 'closeAndOpen') {
        // Al cerrar el submenu cambiamos el icono a cerrado.
        containerIcon[position].firstElementChild.classList.remove('hidden');
        containerIcon[position].lastElementChild.classList.add('hidden');

        // Al abrir un nuevo submenu cambiamos de icono.
        firstIcon;
        secoundIcon;

    } else {
        // Cambiamos de abierto o cerrado el icono dependiendo de si tenga o no la clase 'hidden'.
        firstIcon;
        secoundIcon;
    }
}


const windowClose = new WindowClose();
    

export class SubmenuRuny {
    constructor(btnSubmenu, submenuElement, elementClassesOmit) {
        this.btnSubmenu = btnSubmenu;
        this.submenuElement = submenuElement;
        this.elementClassesOmit =  elementClassesOmit;
    }


    isNodeList() {
        let isnodelist = false;
        
        if (this.btnSubmenu.length >= 0 && this.submenuElement.length >= 0) {

            if (this.submenuElement.length === this.submenuElement.length) {
                isnodelist = true;
            }
        }

        return isnodelist;
    }


    hiddenSubmenu() {

        for (const element of this.submenuElement) {
            element.style.display = 'none';
        }
    }
    
    
    // Funcion que cierra o cierra y abre un submenu.
    closeAndOpenSubmenu(index) {
        let close = false;
        let position;
    
        for (let i = 0; i < this.submenuElement.length; i++) {
            const submenu = this.submenuElement[i].classList.contains('visible');

            // Comprobamos si el elemento tiene la clase 'visible' y que sean de la misma posicion para cerrarlo
            if (submenu && i == index) {
                close = true;
                position = i;
    
            // En caso de que no sea de la misma posicion cerramos y abrimos un submenu.
            } else if (submenu && i != index) {
                position = i;
            }        
        }
    
    
        const liRemoveClass = this.submenuElement[position].classList.remove('visible');
     
        // Cerramos submenu.
        if (close) {
            liRemoveClass;
            changeIconPosition('close', index);
        
        // Cerramos y abrimos submenu.
        } else {
            liRemoveClass;
            this.submenuElement[index].classList.add('visible');
            changeIconPosition('closeAndOpen', index, position);
        }
    }

    
    // Funcion que abre un submenu agregandole la clase 'visible'.
    openSubmenu(index) {
        this.submenuElement[index].classList.add('visible');
 
        // al abrir el submenu cambiamos el icono a open.
        changeIconPosition('open', index);


        // Si esta abierto el submenuMore lo cerrramos.
        const submenuMore = document.getElementById('submenu-more');

        if (submenuMore.classList.contains('visible')) {
            submenuMore.classList.remove('visible');
        }

        const elementClassesOmit  = ['links__button', 'container-icon', 'container-icon__icon'];
        windowClose.submenu(this.submenuElement, elementClassesOmit);
    }


    // Funcion principal.
    submenuMain (index) {
        let open = false;
    
        // Checamos si algun elemento contenga la clase 'visible'.
        for (const submenu of this.submenuElement) {
            if (submenu.classList.contains('visible')) {
                open = true;
            }
        }
    
    
        // Si lo contiene llamamos a la funcion que abre o cierra un submenu pasandole la posicion del elemento al que se hizo click.
        if (open) {
            this.closeAndOpenSubmenu(index);
            
        // En caso de que no la contenga llamamos a la funcion que abre un submenu.
        } else {
            this.openSubmenu(index);
        }
    }


    submenuMore(submenuMore) {
        this.submenuElement.forEach( (element, index) => {
            if (element.classList.contains('visible')) {
                element.classList.remove('visible');
                changeIconPosition('close', index);
            }
        })
                
        submenuMore.classList.toggle('visible');

        const clases = ['more-chapters', 'more-chapters__i']
        windowClose.submenu(submenuMore, clases)
    }



    start() {
        const isnodelist = this.isNodeList();

        this.hiddenSubmenu();
        if (isnodelist) {

            // Al hacer click a cada uno de los elementos de la  clase 'links__i' llamamos el metodo del objeto submenuMethods.
            this.btnSubmenu.forEach( (btnElement, index) => {
                btnElement.addEventListener('click', () => {

                    this.submenuMain(index);

                    // closeSubmenuScroll.closeSubmenuWithScroll('submenu', ul);
                    // windowClose.windowCloseSubmenu();
                });
            });

            
        } else {
            console.log('No es node list')
        }
    
    }
}