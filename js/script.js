// variables
let subnetNumberValue = document.getElementById("subnetNumberValue");
let hostNumberValue = document.getElementById("hostNumberValue");
let calculateButton = document.getElementById("calculateButton");
let result = document.getElementById("result");
let classRange = document.getElementById("classRange");
let subnetMask = document.getElementById("subnetMask");

let ipTable = document.getElementById("showIpTable").innerHTML;
let ipTableContent;

// functions
function subnetLog() {
    let subnetValue = subnetNumberValue.value;
    let subnetReserve = (subnetValue * 0.1);
    let totalSubnetNumber = Math.ceil(parseFloat(subnetValue) + parseFloat(subnetReserve)).toFixed(1);
    let subBitValue = Math.ceil((Math.log(totalSubnetNumber))/(Math.log(2)));
    console.log("number of subnet : " + subnetNumberValue.value);
    console.log("subnet reserve : " + subnetReserve);
    console.log("total number of subnet : " + totalSubnetNumber);
    return subBitValue;
}

function hostLog() {
    let hostValue = hostNumberValue.value;
    let hostReserve = (hostValue * 0.1);
    let totalHostNumber = Math.ceil(parseFloat(hostValue) + parseFloat(hostReserve)).toFixed(1);
    let hostBitNumber = Math.ceil((Math.log(totalHostNumber+2))/(Math.log(2)));
    console.log("number of host : " + hostNumberValue.value);
    console.log("host reserve : " + hostReserve);
    console.log("total number of host : " + totalHostNumber);
    return hostBitNumber;
}

function classRangeFunc(value) {
    let classRange = "";
    if(value <= 8) {
        classRange = "C";
    } else if(value <= 16) {
        classRange = "B";
    } else if(value <= 24) {
        classRange = "A";
    }
    return classRange;
}

function subMask(total, sub, host, classType) {
    let subBinary = "";
    let mask = "";
    for(let i = 0; i < sub; i++) {
        subBinary += "1";
    }
    for(let j = 0; j < host; j++) {
        subBinary += "0";
    }
    console.log("Subnet binary value : " + subBinary);
    
    switch(total) {
        case 7:
            subBinary += "0";
            break;
        case 6:
            subBinary += "00";
            break;
        case 5:
            subBinary += "000";
            break;
        case 4:
            subBinary += "0000";
            break;
    }
    console.log("Subnet binary value rounded : " + subBinary);

    let subDecimal = parseInt(subBinary, 2);
    console.log("Subnet deciaml value : " + subDecimal);

    switch(classType) {
        case "A":
            mask += `255.${subDecimal}.0.0`;
            break;
        case "B":
            mask += `255.255.${subDecimal}.0`;
            break;
        case "C":
            mask += `255.255.255.${subDecimal}`;
            break;
    }
    console.log(mask);
    return mask;
}

calculateButton.onclick = function() {
    result.style.visibility = "visible";

    let subnetBitNumber = subnetLog();
    let hostBitNumber = hostLog();
    let bitSum = subnetBitNumber + hostBitNumber;
    console.log("total number of bit : " + bitSum);

    let classRangeValue = classRangeFunc(bitSum);
    classRange.innerHTML = classRangeValue;
    classRange.style.color = "red";
    
    let subnetMaskValue = subMask(bitSum, subnetBitNumber, hostBitNumber, classRangeValue);
    subnetMask.innerHTML = subnetMaskValue;
    subnetMask.style.color = "red";
}

// function showIpTable() {
//     for(let i = 0;i < ipTableList.length; i++) {
//         ipTableContent += ```
//             <tr>
//                 <td id="ipAddressTable_table_subnetAddressValue">
//                     ${}
//                 </td>
//                 <td id="ipAddressTable_table_firstIpValue">
//                     ${}
//                 </td>
//                 <td id="ipAddressTable_table_lastIpValue">
//                     ${}
//                 </td>
//                 <td id="ipAddressTable_table_broadcastValue">
//                     ${}
//                 </td>
//             </tr>```;
//     }
    
//     ipTable = ipTableContent;
// }