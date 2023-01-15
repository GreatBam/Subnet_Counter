// variables
let subnetNumberValue = document.getElementById("subnetNumberValue");
let hostNumberValue = document.getElementById("hostNumberValue");
let calculateButton = document.getElementById("calculateButton");
let result = document.getElementById("result");
let neededBitSr = document.getElementById("neededBitSr");
let neededBitIp = document.getElementById("neededBitIp");
let classRange = document.getElementById("classRange");

let maskTable = document.getElementById("showMaskTable").innerHTML;
let ipTable = document.getElementById("showIpTable").innerHTML;
let maskTableContent;
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

function subMask(total, sub, host) {
    let subBinary = "";
    for(let i = 0; i < sub; i++) {
        subBinary += "1";
    }
    for(let j = 0; j < host; j++) {
        subBinary += "0";
    }
    console.log("Subnet binary value : " + subBinary);
    
    let subDecimal = parseInt(subBinary, 2);
    console.log("Subnet deciaml value : " + subDecimal);
    
    // switch(total) {
    //     case 8:
    //         sum = total;
    //     case 7:
    //         sum = total*10;
    //     case 6:
    //         sum = total*100;
    //     case 5:
    //         sum = total*1000;
    //     case 4:
    //         sum = total*10000;
    //     case 3:
    //         sum = total*100000;
    //     case 2:
    //         sum = total*1000000;
    //     case 1:
    //         sum = total*10000000;
    // }
}

calculateButton.onclick = function() {
    result.style.visibility = "visible";

    let subnetBitNumber = subnetLog();
    let hostBitNumber = hostLog();
    let bitSum = subnetBitNumber + hostBitNumber;
    console.log("total number of subnet bit : " + hostBitNumber);
    console.log("total number of host bit : " + subnetBitNumber);
    neededBitSr.innerHTML = subnetBitNumber;
    neededBitIp.innerHTML = hostBitNumber;

    
    let classRangeValue = classRangeFunc(bitSum);
    classRange.innerHTML = classRangeValue;
    classRange.style.color = "red";

    let subnetMask = subMask(bitSum, subnetBitNumber, hostBitNumber);

}

// function showMaskTable() {
//     for(let i = 0;i < maskTableList.length; i++) {
//         maskTableContent += ```
//             <tr>
//                 <td id="subnetMask_table_mask">
//                     ${}
//                 </td>
//             </tr>```;
//     }

//     maskTable = maskTableContent;
// }

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