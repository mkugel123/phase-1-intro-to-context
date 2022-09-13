// Your code here
// employee = ['moish', 'kugel']

const dataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300],
    ["Byron", "Poodle", "Mascot", 3],
    ["Julius", "Caesar", "General", 27],
    ["Rafiki", "", "Aide", 10],
    ["Simba", "", "King", 100]
  ]



const createEmployeeRecord = function(array){
    const employeeRecord = {}
    employeeRecord.firstName = array[0]
    employeeRecord.familyName = array[1]
    employeeRecord.title = array[2]
    employeeRecord.payPerHour = array[3]
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []

    return employeeRecord
}



const createEmployeeRecords = function(arrayOfArrays){
    const employeeRecords = []
    arrayOfArrays.forEach((array) => {
       const employeeObject =  createEmployeeRecord(array)
        employeeRecords.push(employeeObject)
    })
    return employeeRecords
}

function createTimeInEvent(object, string){
    const clockIn = string.split(' ')
    const date = clockIn[0]
    const hour = parseInt(clockIn[1])
    const timeIn = {}
    timeIn.type = 'TimeIn'
    timeIn.date = date
    timeIn.hour = hour
    object.timeInEvents.push(timeIn)
    return object 
}

function createTimeOutEvent(object, string){
    const clockOut = string.split(' ')
    const date = clockOut[0]
    const hour = parseInt(clockOut[1])
    const timeOut = {}
    timeOut.type = 'TimeOut'
    timeOut.date = date
    timeOut.hour = hour
    object.timeOutEvents.push(timeOut)
    return object 
}



function hoursWorkedOnDate(employeeRecord, dateInput){ 
    const timeOutObjects = employeeRecord.timeOutEvents
    const timeInObjects = employeeRecord.timeInEvents
    console.log(timeOutObjects)
    let timeOut
    let timeIn

    for (const timeOutObject of timeOutObjects){
        if (timeOutObject.date === dateInput){
            timeOut = timeOutObject.hour
        }
    }

    for (const timeInObject of timeInObjects){
        if (timeInObject.date === dateInput){
            timeIn = timeInObject.hour
        }
    }

    const hourDifference = timeOut - timeIn;
    return hourDifference/100
}

function wagesEarnedOnDate(employeeRecord, dateInput){
    return hoursWorkedOnDate(employeeRecord, dateInput) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord, dateInput){
    let wage = 0
    employeeRecord.timeInEvents.forEach((event) => {
        dateInput = event.date
        wage += wagesEarnedOnDate(employeeRecord, dateInput)
    })
    return wage
}

function calculatePayroll(array){
    let payroll = 0
    array.forEach((employee) => {
        payroll += allWagesFor(employee)
    })
    return payroll
}

// console.log(createEmployeeRecord(employee))
