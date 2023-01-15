// variables
let subnetNumberValue = document.getElementById("subnetNumberValue");
let hostNumberValue = document.getElementById("hostNumberValue");
let calculateButton = document.getElementById("calculateButton");
let neededBitSr = document.getElementById("neededBitSr");
let neededBitIp = document.getElementById("neededBitIp");

let maskTable = document.getElementById("showMaskTable").innerHTML;
let ipTable = document.getElementById("showIpTable").innerHTML;
let maskTableContent;
let ipTableContent;

// functions
calculateButton.onclick = function() {
    console.log("subnetNumberValue : " + subnetNumberValue.value);
    console.log("hostNumberValue : " + hostNumberValue.value);

    let subnetValue = subnetNumberValue.value;
    let hostValue = hostNumberValue.value;

    let subnetReserve = (subnetValue * 0.1);
    let hostReserve = (hostValue * 0.1);

    console.log("totalSubnetNumber : " + subnetReserve);
    console.log("totalHostNumber : " + hostReserve);

    let totalSubnetNumber = (parseFloat(subnetValue) + parseFloat(subnetReserve)).toFixed(2);
    let totalHostNumber = (parseFloat(hostValue) + parseFloat(hostReserve)).toFixed(2);

    console.log("totalSubnetNumber : " + totalSubnetNumber);
    console.log("totalHostNumber : " + totalHostNumber);

    let subnetBitNumber = Math.ceil((Math.log(totalSubnetNumber))/(Math.log(2)));
    let hostBitNumber = Math.ceil((Math.log(totalHostNumber))/(Math.log(2)));

    console.log("subnetBitNumber : " + subnetBitNumber);
    console.log("hostBitNumber : " + hostBitNumber);

    neededBitSr.innerHTML = subnetBitNumber;
    neededBitIp.innerHTML = hostBitNumber;
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