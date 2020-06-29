/* [ CSS ] */
import '../css/index.scss';

/* [ Router ] */
import { Router } from '../router/router';

/* [ Components ] */
import { HomeComponent } from "../components/Home/Home";
import { LoginComponent } from "../components/Login/Login";
import { RegisterComponent } from "../components/Register/Register";

/* TODO use this later*/
import { ValidateComponent } from "../components/ValidateRegistration/ValidateRegistration";


import { NotFoundComponent} from '../components/NotFound/NotFound';
import { Sidebar } from "../components/SidebarComponent/Sidebar";
import { ProductComponent } from "../components/Product/Product";


/* [ Router ] */
let router = new Router();
let app = document.querySelector('#app');


// router.on('/:component/product', function(component) {
//     app.innerHTML = ProductComponent.main(component), ProductComponent.render(component);
// })

router.on('/', function() {
    app.innerHTML = HomeComponent.render(), HomeComponent.handleRedirect();
});

router.on('/:component', function(component) {
    app.innerHTML = Sidebar.main(component), Sidebar.render(component);
})

router.on('/:component/product', function(component) {
    app.innerHTML = ProductComponent.main(component), ProductComponent.render(component), ProductComponent.goBack();
})

router.on('/login', function() {
    app.innerHTML = LoginComponent.render(), LoginComponent.loginRequest();
});

router.on('/register', function() {
    app.innerHTML = RegisterComponent.render(), RegisterComponent.newRegistration();
});

router.on('/validate/:tokenid', function(tokenid) {
    app.innerHTML = ValidateComponent.validateUser();
});

router.on('/404', function() {
    // Print 'page not found' or something...
    // Current (pre-nav) page still appears as URL
    app.innerHTML = NotFoundComponent.render();
});