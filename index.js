// Your code here
function createEmployeeRecord([first, family, jobTitle, pay]) {
    let employee = {
        firstName: first,
        familyName: family,
        title: jobTitle,
        payPerHour: pay,
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeObj, dateStamp) {
    let hour = parseInt(dateStamp.substring(11))
    let date = dateStamp.substring(0, 10)
    employeeObj.timeInEvents.push({
        type: 'TimeIn',
        hour: hour,
        date: date
    })
    return employeeObj
}

function createTimeOutEvent(employeeObj, dateStamp) {
    let hour = parseInt(dateStamp.substring(11))
    let date = dateStamp.substring(0, 10)
    employeeObj.timeOutEvents.push({
        type: 'TimeOut',
        hour: hour,
        date: date
    })
    return employeeObj
}

function hoursWorkedOnDate(employeeObj, date) {
    let timeIn = employeeObj.timeInEvents.find(timeInEvent => timeInEvent.date === date)

    let timeOut = employeeObj.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date)

    let hoursWorked = parseInt((timeOut.hour - timeIn.hour)/100)

    return hoursWorked
}

function wagesEarnedOnDate(employeeObj, date) {
    let hoursWorked = hoursWorkedOnDate(employeeObj, date)
    let payOwed = hoursWorked * employeeObj.payPerHour
    return payOwed
}

function allWagesFor(employeeObj) {

    let dateArray = employeeObj.timeInEvents.map(element => element.date)

    let payOwedArray = dateArray.map(date => wagesEarnedOnDate(employeeObj, date))

    let totalPayOwed = payOwedArray.reduce((a, b) => a + b)

    return totalPayOwed
}

function calculatePayroll(employeeRecords) {

    let employeeWagesArray = employeeRecords.map(employee => allWagesFor(employee))

    let totalPayroll = employeeWagesArray.reduce((previousValue, currentValue) => previousValue + currentValue)

    return totalPayroll
}