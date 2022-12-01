import { WindowClose } from "./modules/windowClose.js";


// Funcion que cambia la posicion del icon al abrir o cerrar el submenu.
export const changeIconPosition = (status, index, position) => {
    const containerIcon = document.querySelectorAll('.container-icon');    
    const firstIcon = containerIcon[index].firstElementChild.classList.toggle('hidden');
    const secoundIcon = containerIcon[index].lastElementChild.classList.toggle('hidden');


    if (status == 'closeAndOpen') {
        containerIcon[position].firstElementChild.classList.remove('hidden');
        containerIcon[position].lastElementChild.classList.add('hidden');

        firstIcon;
        secoundIcon;

    } else {
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


    // Funcion que oculta o muestra un submenu y agrega o remueve la clase open-runy.
    changeStylesAndRemoveOrAddClass(toDo, position) {
     
        if (toDo == 'show') {       
            this.submenuElement[position].style.opacity = '1';
        
        } else {
            this.submenuElement[position].style.opacity = '0';

        }

        this.submenuElement[position].classList.toggle('open-runy');
    }

    
    // Funcion que cierra o cierra y abre un submenu.
    closeAndOpenSubmenu(index) {
        let close = false;
        let position;
    
        for (let i = 0; i < this.submenuElement.length; i++) {
            const submenu = this.submenuElement[i].classList.contains('open-runy');

            // Comprobamos si el elemento tiene la clase 'open-runy' y que sean de la misma posicion para cerrarlo
            if (submenu && i == index) {
                close = true;
                position = i;
    
            // En caso de que no sea de la misma posicion cerramos y abrimos un submenu.
            } else if (submenu && i != index) {
                position = i;
            }        
        }
    
    
        // Ocultamos el submenu.
        const hiddenSubmenu = this.changeStylesAndRemoveOrAddClass('hidden', position);
        
        // Cerramos submenu.
        if (close) {
            hiddenSubmenu;

            // Cambiamos la posicion del icono a Close.
            changeIconPosition('close', index);
        
        // Cerramos y abrimos submenu.
        } else {
            // Cerramos el submenu...
            hiddenSubmenu;

            // abrimos el nuevo submenu... 
            this.changeStylesAndRemoveOrAddClass('show', index);
            changeIconPosition('closeAndOpen', index, position);
        }
    }

    
    // Funcion que abre un submenu agregandole la clase 'open-runy' y cambiando los estilos del submenu.
    openSubmenu(index) {
        this.changeStylesAndRemoveOrAddClass('show', index);
        
        // al abrir el submenu cambiamos el icono a open.
        changeIconPosition('open', index);


        // Si esta abierto el submenuMore lo cerrramos.
        // const submenuMore = document.getElementById('submenu-more');

        // if (submenuMore.classList.contains('visible')) {
        //     submenuMore.classList.remove('visible');
        // }

        // const elementClassesOmit  = ['links__button', 'container-icon', 'container-icon__icon'];
        // windowClose.submenu(this.submenuElement, elementClassesOmit);
    }


    // Funcion principal.
    submenuMain (index) {
        let open = false;
    
        // Checamos si algun elemento contenga la clase 'open-runy'.
        for (const submenu of this.submenuElement) {
            if (submenu.classList.contains('open-runy')) {
                open = true;
            }
        }
    
    
        // Si lo contiene llamamos a la funcion que cierra o cierra y abre un submenu pasandole la posicion del elemento al que se le hizo click.
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


    // Funcion para iniciar.
    start() {
        // Obtenemos el valor de isNodeList True/False.
        const isnodelist = this.isNodeList();

        if (isnodelist) {

            // Al hacer click a cada uno de los elementos del 'btn-runy' llamamos el metodo principal.
            this.btnSubmenu.forEach( (btnElement, index) => {
                btnElement.addEventListener('click', () => {

                    this.submenuMain(index);

                    // closeSubmenuScroll.closeSubmenuWithScroll('submenu', ul);
                    // windowClose.windowCloseSubmenu();
                });
            });

            
        // En caso de que no sea un nodelist...
        } else {
            console.log('No es node list')
        }
    
    }
}



// Variables necesarias.
const btnRuny = document.querySelectorAll('.btn-runy');

const submenuRuny = document.querySelectorAll('.submenu-element-runy');

const elementClassesOmitRuny = 'item-skip';


// Objeto para abrir o cerrar un submenu.
const submenu = new SubmenuRuny(btnRuny, submenuRuny, elementClassesOmitRuny);
submenu.start()