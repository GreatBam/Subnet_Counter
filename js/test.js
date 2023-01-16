// variables
let subnetNumberValue = document.getElementById("subnetNumberValue");
let hostNumberValue = document.getElementById("hostNumberValue");
let calculateButton = document.getElementById("calculateButton");
let result = document.getElementById("result");
let classRange = document.getElementById("classRange");
let subnetMask = document.getElementById("subnetMask");
let rangeSelection = document.getElementById("rangeSelection_container");
let rangeSelectionNumber = document.getElementById("rangeSelectionValue");
let calculateIpButton = document.getElementById("calculateIpButton");
let ipAddressTable = document.getElementById("ipAddressTable_container");
let ipTable = document.getElementById("showIpTable");

// Bit number calculation
calculateButton.onclick = function() {
    let classType = "";
    let mask = "";
    let subBit = 0;
    let hostBit = 0;
    let maskCounter = 0;
    let subnetValue = subnetNumberValue.value;
    let subnetReserve = (subnetValue * 0.1);
    let totalSubnetNumber = Math.ceil(parseFloat(subnetValue) + parseFloat(subnetReserve)).toFixed(1);
    let subBitNumber = Math.ceil((Math.log(totalSubnetNumber))/(Math.log(2)));
    console.log("number of subnet : " + subnetNumberValue.value);
    console.log("subnet reserve : " + subnetReserve);
    console.log("total number of subnet : " + totalSubnetNumber);
    console.log("total number of subnet bit : " + subBitValue);
    
    let hostValue = hostNumberValue.value;
    let hostReserve = (hostValue * 0.1);
    let totalHostNumber = Math.ceil(parseFloat(hostValue) + parseFloat(hostReserve)).toFixed(1);
    let hostBitNumber = Math.ceil((Math.log(totalHostNumber+2))/(Math.log(2)));
    console.log("number of host : " + hostNumberValue.value);
    console.log("host reserve : " + hostReserve);
    console.log("total number of host : " + totalHostNumber);
    console.log("total number of host bit : " + hostBitNumber);
    
    let bitSum = subBitNumber + hostBitNumber;

    if(bitSum <= 8) {
        classType = "C";
        classRange.innerHTML = classType;
        for(let i = 0; i < subBitNumber; i++) {
            mask += "1";
        }
        for(let j = 0; j < hostBitNumber; j++) {
            mask += "0";
        }
        if(bitSum < 8) {
            let delta = 8 - bitSum;
            for(let i = 0; i < delta; i++) {
                mask += "0";
            }
        }
        console.log("Classe C");
        console.log("Mask : " + mask);
    } else if(bitSum <= 16) {
        classType = "B";
        classRange.innerHTML = classType;
        if(hostBitNumber < 8) {
            subBit = 8 - hostBitNumber;
            for(let i = 0; i < subBit; i++) {
                mask += "1";
            }
            for(let j = 0; j < hostBitNumber; j++) {
                mask += "0";
            }
        } else {
            for(let j = 0; j < subBitNumber; j++) {
                mask += "1";
                maskCounter += 1;
            }
            if(subBitNumber < 8) {
                let delta = 8 - maskCounter;
                for(let i = 0; i < delta; i++) {
                    mask += "0";
                }
            }
        }
        console.log("Classe B");
        console.log("Mask : " + mask);
    } else {
        classType = "A";
        classRange.innerHTML = classType;
        if(hostBitNumber < 8) {
            subBit = 8 - hostBitNumber;
            for(let i = 0; i < subBit; i++) {
                mask += "1";
            }
            for(let j = 0; j < hostBitNumber; j++) {
                mask += "0";
            }
        } else if(hostBitNumber < 16) {
            let hostBit = (hostBitNumber - 8);
            subBit = 8 - hostBit;
            for(let i = 0; i < subBit; i++) {
                mask += "1";
            }
            for(let j = 0; j < hostBit; j++) {
                mask += "0";
            }
        } else {
            for(let j = 0; j < subBitNumber; j++) {
                mask += "1";
                maskCounter += 1;
            }
            if(subBitNumber < 8) {
                let delta = 8 - maskCounter;
                for(let i = 0; i < delta; i++) {
                    mask += "0";
                }
            }
        }
        console.log("Classe B");
        console.log("Mask : " + mask);
    }
    let subDecimal = parseInt(mask, 2)

    if(classType == "C") {
        subnetMaskDecimalValue = `255.255.255.${subDecimal}`;
        subnetMask.innerHTML = subnetMaskDecimalValue;
        rangeSelection(classType, mask);
    } else if(classType == "B") {
        subnetMaskDecimalValue = `255.255.${subDecimal}.0`;
        subnetMask.innerHTML = subnetMaskDecimalValue;
        rangeSelection(classType, mask);
    } else if(classType == "A") {
        subnetMaskDecimalValue = `255.${subDecimal}.0.0`;
        subnetMask.innerHTML = subnetMaskDecimalValue;
    }
    rangeSelect = 0;
    ipAddressTableFunc(classType, mask, rangeSelect);
}

function rangeSelection(classType, mask) {
    rangeSelection.style.visibility = "visible";
    calculateIpButton.onclick = function() {
        rangeSelect = rangeSelectionNumber.value;
        ipAddressTableFunc(classType, mask, rangeSelect);
    }
}

function ipAddressTableFunc(classType, mask, rangeSelect) {
    let iterate = 0;
    let loop = 0;
    let back = 0;
    let iterate2 = 0;
    ipAddressTable.style.visibility = "visible";
    switch(mask) {
        case 0:
            iterate += 0;
            break;
        case 128:
            iterate += 2;
            break;
        case 192:
            iterate += 4;
            break;
        case 224:
            iterate += 8;
            break;
        case 240:
            iterate += 16;
            break;
        case 248:
            iterate += 32;
            break;
        case 252:
            iterate += 64;
            break;
        case 254:
            iterate += 128;
            break;
        case 255:
            iterate += 1;
            break;
    }
    let ipRoot = 0;
    switch(classType) {
        case "A":
            ipRoot += 0;
            if(iterate == 0) {
                loop += 1;
            } else {
                loop = iterate;
                loop = Math.pow(loop, 3);
                ipTableContent += ```
                <tr>
                    <td id="ipAddressTable_table_subnetAddressValue">
                        ${ipRoot}.0.0.0
                    </td>
                    <td id="ipAddressTable_table_firstIpValue">
                        ${ipRoot}.0.0.${(iterate+1)}
                    </td>
                    <td id="ipAddressTable_table_lastIpValue">
                        ${ipRoot}.0.0.${((iterate*2)-2)}
                    </td>
                    <td id="ipAddressTable_table_broadcastValue">
                        ${ipRoot}.0.0.${((iterate*2)-1)}
                    </td>
                </tr>```;
            }
            for(let i = 0;i < loop; i++) {
                ipTableContent += ```
                <tr>
                    <td id="ipAddressTable_table_subnetAddressValue">
                        ${ipRoot}.${iterate}.${iterate}.${iterate}
                    </td>
                    <td id="ipAddressTable_table_firstIpValue">
                        ${ipRoot}.${iterate}.${iterate}.${iterate}
                    </td>
                    <td id="ipAddressTable_table_lastIpValue">
                        
                    </td>
                    <td id="ipAddressTable_table_broadcastValue">
                        
                    </td>
                </tr>```;
            }

        case "B":
            back = iterate;
            ipRoot += rangeSelect;
            if(iterate == 0) {
                loop += 1;
            } else {
                loop = iterate;
                loop = Math.pow(loop, 3);
                ipTableContent += ```
                <tr>
                    <td id="ipAddressTable_table_subnetAddressValue">
                        172.${rangeSelect}.0.0
                    </td>
                    <td id="ipAddressTable_table_firstIpValue">
                        172.${rangeSelect}.0.0
                    </td>
                    <td id="ipAddressTable_table_lastIpValue">
                        172.${rangeSelect}.0.${((iterate*2)-2)}
                    </td>
                    <td id="ipAddressTable_table_broadcastValue">
                        172.${rangeSelect}.0.${((iterate*2)-1)}
                    </td>
                </tr>```;
            }
            for(let i = 0;i < loop; i++) {
                ipTableContent += ```
                <tr>
                    <td id="ipAddressTable_table_subnetAddressValue">
                        172.${rangeSelect}.${iterate2}.${iterate}
                    </td>
                    <td id="ipAddressTable_table_firstIpValue">
                        172.${rangeSelect}.${iterate2}.${(iterate+1)}
                    </td>
                    <td id="ipAddressTable_table_lastIpValue">
                        172.${rangeSelect}.${iterate2}.${((iterate*2)-2)}
                    </td>
                    <td id="ipAddressTable_table_broadcastValue">
                        172.${rangeSelect}.${iterate2}.${((iterate*2)-1)}
                    </td>
                </tr>```;
                iterate = (iterate * 2)
                if(iterate >= 255) {
                    iterate = back;
                    if(iterate2 == 0) {
                        iterate2 = back;
                    } else {
                        iterate2 = iterate2 * 2;
                    }
                }
            }
        case "C":
            back = iterate;
            ipRoot += rangeSelect;
            if(iterate == 0) {
                loop += 1;
            } else {
                loop = iterate;
                loop = Math.pow(loop, 3);
                ipTableContent += ```
                <tr>
                    <td id="ipAddressTable_table_subnetAddressValue">
                        172.${rangeSelect}.0.0
                    </td>
                    <td id="ipAddressTable_table_firstIpValue">
                        172.${rangeSelect}.0.0
                    </td>
                    <td id="ipAddressTable_table_lastIpValue">
                        172.${rangeSelect}.0.${((iterate*2)-2)}
                    </td>
                    <td id="ipAddressTable_table_broadcastValue">
                        172.${rangeSelect}.0.${((iterate*2)-1)}
                    </td>
                </tr>```;
            }
            for(let i = 0;i < loop; i++) {
                ipTableContent += ```
                <tr>
                    <td id="ipAddressTable_table_subnetAddressValue">
                        172.168.${rangeSelect}.${iterate}
                    </td>
                    <td id="ipAddressTable_table_firstIpValue">
                        172.168.${rangeSelect}.${(iterate+1)}
                    </td>
                    <td id="ipAddressTable_table_lastIpValue">
                        172.168.${rangeSelect}.${((iterate*2)-2)}
                    </td>
                    <td id="ipAddressTable_table_broadcastValue">
                        172.168.${rangeSelect}.${((iterate*2)-1)}
                    </td>
                </tr>```;
                iterate = (iterate * 2)
            }
    }
    ipTable.innerHTML = ipTableContent;
}