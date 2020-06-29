import { HomeComponent } from "../Home/Home";
import { ReceivedInvoice } from './SidebarComponents/ReceivedInvoice/ReceivedInvoice';
import { Dashboard } from './SidebarComponents/Dashboard/Dashboard';
import { ReceivedOrder } from "./SidebarComponents/ReceivedOrder/ReceivedOrder";
import { SentInvoice } from "./SidebarComponents/SentInvoice/SentInvoice";
import { SentOrder } from "./SidebarComponents/SentOrder/SentOrder";
import {NotFoundComponent} from "../NotFound/NotFound";

export const Sidebar = {
    main: (component) => {
        if (component === 'received-invoice') {
            return HomeComponent.render();
        } else if (component === 'sent-invoice') {
            return HomeComponent.render();
        } else if (component === 'received-order') {
            return HomeComponent.render();
        } else if (component === 'sent-order') {
            return HomeComponent.render();
        } else if (component === 'dashboard') {
            return HomeComponent.render();
        } else {
            return NotFoundComponent.render();
        }
    },
    render: () => {
        const main = document.querySelector('.main');
        if (window.location.hash === '#/received-invoice') {
                setTimeout(() => {
                ReceivedInvoice.render(main);
            }, 0);
        } else if (window.location.hash === '#/dashboard') {
            Dashboard.render(main);
        } else if (window.location.hash === '#/sent-invoice') {
            SentInvoice.render(main);
        } else if (window.location.hash === '#/received-order') {
            ReceivedOrder.render(main);
        } else if (window.location.hash === '#/sent-order') {
            SentOrder.render(main);
        }
    }
}