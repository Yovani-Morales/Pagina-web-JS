// Funcion que cambia la posicion del icon al abrir o cerrar el submenu.
function changeIconPosition (status, index, previousIndex) {
    const containerIcon = document.querySelectorAll('.container-icon');
    let position = index;

    function addOrRemoveIcon () {
        containerIcon[position].firstElementChild.classList.toggle('hidden');
        containerIcon[position].lastElementChild.classList.toggle('hidden');
    }

    // Cerrar y abrir icono...
    if (status == 'closeAndOpen') {
        // Abrir
        addOrRemoveIcon();

        // Cerrar
        position = previousIndex;
        addOrRemoveIcon();

    // Cerrar o abrir icono...
    } else {
        addOrRemoveIcon();
    }
}

// Clase que cierra un submenu al hacer scroll.
class CloseSubmenuScroll {
    constructor(submenuElement, index) {
        this.submenu = submenuElement;
        this.index = index;
    }

    scrolling () {

        if (this.submenu.classList.contains('open-runy')) {
            console.log('Removing...')
            this.submenu.style.display = 'none';
            this.submenu.classList.remove('open-runy');

            // // Cambiamos la posicion del icono a cerrado.
            // changeIconPosition('close', this.index);
            // console.log('Cerramos con el scroll.')
        } else {
            console.log('AHHHH')
        }
    }

    closeSubmenu() {
        window.addEventListener('scroll', this.scrolling);
        console.log(this.index)
    }
}

// Clase que cierra un submenu al hacer click en cualquier parte de la pagina web.
class CloseSubmenuScreen {
    closeSubmenu(submenuElement, index) {
        window.addEventListener('click', (clickedElement) => {
            const submemuOpen = submenuElement.classList.contains('open-runy')
            const clickedElementContainsClass = clickedElement.target.classList.contains('element-skip-runy');

            // Si el submenu esta abierto y no contiene la clase para omitit cerramos...
            if (submemuOpen && !clickedElementContainsClass) {
                submenuElement.style.display = 'none';
                submenuElement.classList.remove('open-runy');
                console.log('Me cerraron :(')
            } else {
                console.log('Pasaste :)');
            }
        })
    }
}

class SubmenuRuny {
    constructor() {
        this.btnSubmenu = document.querySelectorAll('.btn-runy');
        this.submenuElement = document.querySelectorAll('.submenu-element-runy');
        this.setOfSubmenus = false;
    }

    // Retorna True/False/Mensaje dependiendo de si solo es un submenu, conjunto de submenus o no existe ningun submenu.
    howManySubmenus() {
        let value;
        const btnSubmenuLen = this.btnSubmenu.length;
        const submenuElementLen = this.submenuElement.length;
    
        // Validar que exitan botones y submenus...
        if (btnSubmenuLen > 0 || submenuElementLen > 0) {

            // Cuando solo exista un boton y un submenu...
            if (btnSubmenuLen == 1 && submenuElementLen == 1) {
                value = false;
            // Cuando existan mas de dos...    
            } else if (btnSubmenuLen == submenuElementLen) {
                value = true;
            // Cuando existan unos y otros no...
            } else {
                value = 'no coinciden (alguna clase no agregada)'
            }
            
        } else {
            value = 'la longitud de ambas es  0. Ninguna clase agregada';
        }

        return value;
    }

    // Funcion que oculta o muestra un submenu y agrega o remueve la clase open-runy.
    changeStylesAndRemoveOrAddClass(toDo, submenuElement, index) {
        const windowScroll = new CloseSubmenuScroll(submenuElement, index);
        const windowClick = new CloseSubmenuScreen();

        if (toDo == 'show') {
            submenuElement.style.display = 'block';

            // Cerramos el submenu al hacer scroll.
            console.log('Listening scroll...')
            windowScroll.closeSubmenu();

            // Cerramos el submenu al hacer click en cualquier parte de la pantalla.
            // console.log('Listening click...')
            // windowClick.closeSubmenu(submenuElement, index);
        
        } else {
            submenuElement.style.display = 'none';
        }

        submenuElement.classList.toggle('open-runy');
    }

    // Cerrar submemu...
    closeSubmenu(submenuElement, index) {
        console.log('Closed...')
        // Para un solo submenu...
        if (this.setOfSubmenus == false) {
            this.changeStylesAndRemoveOrAddClass('hidden', submenuElement);
            changeIconPosition('close', index);

        // Para un conjunto de submenus...
        } else {
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
            const hiddenSubmenu = this.changeStylesAndRemoveOrAddClass('hidden', this.submenuElement[position]);
            
            // Cerramos submenu.
            if (close) {                
                hiddenSubmenu;
    
                // Cambiamos la posicion del icono a Close.
                changeIconPosition('close', position);
            
            // Cerramos y abrimos submenu.
            } else {
                // Cerramos el submenu...
                hiddenSubmenu;
    
                // abrimos el nuevo submenu... 
                this.changeStylesAndRemoveOrAddClass('show', submenuElement, index);
                changeIconPosition('closeAndOpen', index, position);
            }    
        }
    }
    
    // Abrir submenu...
    openSubmenu(submenuElement, index) {
        console.log('Open...')
        this.changeStylesAndRemoveOrAddClass('show', submenuElement, index);
        
        // Cambiamos el icono a open.
        changeIconPosition('open', index);
    }

    // Funcion para el conjunto de submenus...
    multipleSubmenu (submenuElement, index) {
        let open = false;

        // Comprobamos si algun submenu contiene la clase 'open-runy'.
        for (const submenu of this.submenuElement) {
            if (submenu.classList.contains('open-runy')) {
                open = true;
            }
        }

        if (open) {
            // Cerramos o cerramos y abrimos un submenu...
            this.closeSubmenu(submenuElement, index);
        } else {
            // Abrimos un submenu...
            this.openSubmenu(submenuElement, index);
        }
    }

    // Funcion para un solo submenu...
    onlySubmenu(submenuElement) {
        if (submenuElement.classList.contains('open-runy')) {
            this.closeSubmenu(submenuElement, 0);
        } else {
            this.openSubmenu(submenuElement, 0);
        }
    }

    start() {
        this.setOfSubmenus = this.howManySubmenus();

        // Cuando es un conjunto de submenus...
        if (this.setOfSubmenus == true) {
            this.btnSubmenu.forEach( (btnElement, index) => {
                btnElement.addEventListener('click', () => {
                    this.multipleSubmenu(this.submenuElement[index], index);
                });
            });
            
        // En caso de que solo haya un submenu...
        } else if (this.setOfSubmenus == false) {
            this.btnSubmenu[0].addEventListener('click', () => {                
                this.onlySubmenu(this.submenuElement[0]);
            });

        // Finalmente cuando no se han agregado clases (btnSubmenu/SubmenuELement) o unas si y otras no...
        } else {
            console.warn(`Botones (${this.btnSubmenu.length}), submenus (${this.submenuElement.length}) ${this.setOfSubmenus}.`)
        }
    }
}

// Objeto para abrir o cerrar un submenu.
const submenu = new SubmenuRuny();
submenu.start()

// Proyecto pausado 21/12/2022
// Razon adquirir mas conocimiento de la logica de programacion