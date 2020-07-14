export function getLastMonth() {
    let date = new Date();
    let firstDay = new Date(date.getFullYear() - 1, date.getMonth() -5, 1).getTime();
    let lastDay = new Date(date.getFullYear() - 1, date.getMonth() - 4, 0).getTime();
    return [firstDay, lastDay];
}

export function getGrandPeriod() {

}