// Importamos la libreria.
import { SubmenuRuny } from "./submenuRuny.js";



// Variables necesarias.
const btnSubmenu = document.querySelectorAll('.links__i');
const submenuElement = document.querySelectorAll('.submenu-element');
const elementClassesOmit = ['class one', 'class two', 'class three'];



// Objeto para abrir o cerrar un submenu.
const submenuRuny = new SubmenuRuny(btnSubmenu, submenuElement, elementClassesOmit);

submenuRuny.start()