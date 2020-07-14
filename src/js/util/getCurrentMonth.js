export function getCurrentMonthMilliseconds() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();
    return [firstDay, lastDay];
}

export function getCurrentMonth() {
    const monthData = getCurrentMonthMilliseconds();
    let currentMonthDate = [];
    monthData.forEach(month => {
        const d = new Date(month.toString() * 1);
        const dFormat = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`.split(' ');
        currentMonthDate.push(dFormat);
    });
    return currentMonthDate;
}