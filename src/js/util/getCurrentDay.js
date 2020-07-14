export function getCurrentDay() {
    let MyDate = new Date();
    const today = ('0' + MyDate.getDate()).slice(-2) + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + MyDate.getFullYear();
    return today;
}