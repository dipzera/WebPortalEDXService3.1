import { HomeComponent } from "../Home/Home";
import { ReceivedInvoice } from './SidebarComponents/ReceivedInvoice/ReceivedInvoice';
import { Dashboard } from './SidebarComponents/Dashboard/Dashboard';
import { ReceivedOrder } from "./SidebarComponents/ReceivedOrder/ReceivedOrder";
import { SentInvoice } from "./SidebarComponents/SentInvoice/SentInvoice";
import { SentOrder } from "./SidebarComponents/SentOrder/SentOrder";
import {NotFoundComponent} from "../NotFound/NotFound";
import { Settings } from "./SidebarComponents/Settings/Settings";

export const Sidebar = {
    main: (component) => {
        if (component === 'received-invoice') {
            localStorage.setItem('Component', component);
            return HomeComponent.render();
        } else if (component === 'sent-invoice') {
            localStorage.setItem('Component', component);

            return HomeComponent.render();
        } else if (component === 'received-order') {
            localStorage.setItem('Component', component);

            return HomeComponent.render();
        } else if (component === 'sent-order') {
            localStorage.setItem('Component', component);

            return HomeComponent.render();
        } else if (component === 'dashboard') {
            localStorage.setItem('Component', component);

            return HomeComponent.render();
        } else if(component === 'settings') {
            return HomeComponent.render();
        }else {
            return NotFoundComponent.render();
        }
    },
    render: () => {
        const main = document.querySelector('.main');

        /* Here I get all the sidebar links(elements) and remove the localStorage state */
        /* FIXME [ Fix this later on, this approach is not the best and reliable one ] */
        document.querySelectorAll('.sidebar-inner__nav ul li').forEach(link => link.addEventListener('click', function() {
            localStorage.removeItem('ButtonState');
            localStorage.removeItem('dateButtonState');
        }))

        if (window.location.hash === '#/received-invoice') {
            ReceivedInvoice.render(main);
        } else if (window.location.hash === '#/dashboard') {
            Dashboard.render(main);
        } else if (window.location.hash === '#/sent-invoice') {
            SentInvoice.render(main);
        } else if (window.location.hash === '#/received-order') {
            ReceivedOrder.render(main);
        } else if (window.location.hash === '#/sent-order') {
            SentOrder.render(main);
        } else if (window.location.hash === '#/settings') {
            Settings.render(main);
        }
    }
}