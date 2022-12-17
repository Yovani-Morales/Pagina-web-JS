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

    closeSubmenu(submenuElement) {
        // Escuchamos el evento scroll
        window.addEventListener('scroll', () => {

            // Recoremos cada uno de los submenus y si esta abierto lo cerramos.
            submenuElement.forEach((element, index) => {
                if (element.classList.contains('open-runy')) {
                    element.style.display = 'none';
                    element.classList.remove('open-runy');

                    // Cambiamos de posicion a cerrado el icono.
                    changeIconPosition('close', index);
                }
            })


        })    
    
    }
}

// Clase que cierra un submenu al hacer click en cualquier parte de la pagina web.
class CloseSubmenuScreen {

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
   

    closeSubmenu(submenuElement, elementClassesToOmit) {
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

class SubmenuRuny {
    constructor(btnSubmenu, submenuElement, elementClassesOmit) {
        this.btnSubmenu = btnSubmenu;
        this.submenuElement = submenuElement;
        this.elementClassesOmit =  elementClassesOmit;
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
    changeStylesAndRemoveOrAddClass(toDo, submenuElement) {
        const windowScroll = new CloseSubmenuScroll();
        const windowClick = new CloseSubmenuScreen();

        if (toDo == 'show') {
            submenuElement.style.display = 'block';

            // Cerramos el submenu al hacer scroll.
            windowScroll.closeSubmenu(this.submenuElement);

            // Cerramos el submenu al hacer click en cualquier parte de la pantalla.
            windowClick.closeSubmenu(this.submenuElement, this.elementClassesOmit);
        
        } else {
            submenuElement.style.display = 'none';
        }

        submenuElement.classList.toggle('open-runy');
    }

    // Cerrar submemu...
    closeSubmenu(submenuElement, index) {
        // Para un solo submenu...
        if (this.setOfSubmenus == false) {
            this.changeStylesAndRemoveOrAddClass('hidden', submenuElement);

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
                changeIconPosition('close', index);
            
            // Cerramos y abrimos submenu.
            } else {
                // Cerramos el submenu...
                hiddenSubmenu;
    
                // abrimos el nuevo submenu... 
                this.changeStylesAndRemoveOrAddClass('show', submenuElement);
                changeIconPosition('closeAndOpen', index, position);
            }    
        }
    }
    
    // Abrir submenu...
    openSubmenu(submenuElement, index) {
        this.changeStylesAndRemoveOrAddClass('show', submenuElement);
        
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
            this.closeSubmenu(submenuElement);
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

// Variables necesarias.
const btnRuny = document.querySelectorAll('.btn-runy');
const submenuRuny = document.querySelectorAll('.submenu-element-runy');
const elementClassesOmitRuny = document.querySelectorAll('element-skip-runy');

// Objeto para abrir o cerrar un submenu.
const submenu = new SubmenuRuny(btnRuny, submenuRuny, elementClassesOmitRuny);
submenu.start()