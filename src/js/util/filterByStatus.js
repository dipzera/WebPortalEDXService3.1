import { getSiblings } from "./getSiblings";

function filterSelection(c) {
    let x = document.getElementsByClassName("table__row");
    if (c == "Total") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (let i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

// Show filtered elements
function w3AddClass(element, name) {
    let arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (let i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
    let arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (let i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

function handleButtonState() {

}


export { filterSelection, w3AddClass, w3RemoveClass, handleButtonState };














// let tableRows = table.children;
//
// filterSelection('Total');
// const btnsState = document.querySelectorAll('.filter-item__status-list-btn');
// for (let i = 0; i < btnsState.length; i++) {
//     btnsState[i].addEventListener('click', function() {
//         btnsState[i].classList.add('active');
//         let siblings = getSiblings(this);
//         siblings.forEach(sibling => sibling.classList.remove('active'));
//         filterSelection(this.id);
//     })
// }
//
//
//
// const btnsDate = document.querySelectorAll('.filter-item__time-link');
// for (let i = 0; i < btnsDate.length; i++) {
//     btnsDate[i].addEventListener('click', function() {
//         btnsDate[i].classList.add('active');
//         let siblings = getSiblings(this);
//         siblings.forEach(sibling => sibling.classList.remove('active'));
//
//         if (this.id == 'day') {
//             let current = new Date();
//             let tomorrow = new Date(current);
//             tomorrow.setDate(tomorrow.getDate() - 3);
//
//             console.log(current);
//             let tomorrowMS = current.getTime();
//             let currMS = tomorrow.getTime();
//             for (let i = 0; i < tableRows.length; i++) {
//                 const rowDataset = [tableRows[i].dataset.date];
//                 rowDataset.filter(row => {
//                     if (row > currMS && row < tomorrowMS) {
//                         let siblings = getSiblings(tableRows[i]);
//                         siblings.forEach(el => el.style.display = 'none');
//                     }
//                 });
//                 // const filteredBody = rowDataset.filter(row => row.dataset.date > currMS && row.dataset.date < tomorowMS);
//                 // console.log(filteredBody);
//             }
//         } else if (this.id == 'week') {
//             let currentWeek = getCurrentWeek();
//             for (let i = 0; i < tableRows.length; i++) {
//                 tableRows[i].style.display = 'table-row';
//                 const rowDataset = [tableRows[i].dataset.date];
//                 rowDataset.filter(row => {
//                     if (row > currentWeek[0] && row < currentWeek[1]) {
//                         let siblings = getSiblings(tableRows[i]);
//                         siblings.forEach(el => el.style.display = 'none');
//                     }
//                 })
//             }
//         } else if (this.id == 'month') {
//             let currentMonth = getCurrentMonthMilliseconds();
//             for (let i = 0; i < tableRows.length; i++) {
//                 tableRows[i].style.display = 'table-row';
//                 const rowDataset = [tableRows[i].dataset.date];
//                 rowDataset.filter(row => {
//                     if (row > currentMonth[0] && row < currentMonth[1]) {
//                         let siblings = getSiblings(tableRows[i]);
//                         siblings.forEach(el => el.style.display = 'none');
//                     }
//                 })
//             }
//         }
//     })
// }