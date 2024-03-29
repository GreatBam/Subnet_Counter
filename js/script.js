// variables
let subnetNumberValue = document.getElementById("subnetNumberValue");
let hostNumberValue = document.getElementById("hostNumberValue");
let calculateButton = document.getElementById("calculateButton");
let result = document.getElementById("result");
let classRange = document.getElementById("classRange");
let subnetMask = document.getElementById("subnetMask");
let rangeSelection = document.getElementById("rangeSelection_container");
let ipRange = document.getElementById('ipRange');
let rangeSelectionNumber = document.getElementById("rangeSelectionValue");
let calculateIpButton = document.getElementById("calculateIpButton");
let ipAddressTable = document.getElementById("ipAddressTable_container");
let ipTable = document.getElementById("showIpTable");
let reset = document.getElementById("reset");
let classType = "";
let mask = "";
let subnetMaskDecimalValue = "";
let subBit = 0;
let hostBit = 0;
let maskCounter = 0;
let rangeSelect = 0;

// Bit number calculation, class identification, mask value
calculateButton.onclick = function() {
    //subnet number calculation
    let subnetValue = subnetNumberValue.value;
    let subnetReserve = (subnetValue * 0.1);
    let totalSubnetNumber = Math.ceil(parseFloat(subnetValue) + parseFloat(subnetReserve)).toFixed(1);
    let subBitNumber = Math.ceil((Math.log(totalSubnetNumber))/(Math.log(2)));
    //host number calculation
    let hostValue = hostNumberValue.value;
    let hostReserve = (hostValue * 0.1);
    let totalHostNumber = Math.ceil(parseFloat(hostValue) + parseFloat(hostReserve)).toFixed(1);
    let hostBitNumber = Math.ceil((Math.log(totalHostNumber+2))/(Math.log(2)));
    let bitSum = subBitNumber + hostBitNumber;

    // debug
    console.log("subnet reserve :" + subnetReserve);
    console.log("host reserve : " + hostReserve);
    console.log("total number of subnet : " + totalSubnetNumber);
    console.log("total number of host : " + totalHostNumber);
    console.log("total number of subnet bit : " + subBitNumber);
    console.log("total number of host bit : " + hostBitNumber);
    console.log("Bit sum : " + bitSum);

    // identify class and binary mask
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
        console.log("Binary mask : " + mask);
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
        console.log("Binary mask : " + mask);
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
            hostBit = (hostBitNumber - 8);
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
        console.log("Classe A");
        console.log("Binary mask : " + mask);
    }

    // decimal mask
    let subDecimal = parseInt(mask, 2)
    console.log("Decimal mask : " + subDecimal);

    // entire mask/submask value
    result.style.visibility = "visible";
    classRange.innerHTML = classType;
    if(classType == "C") {
        subnetMaskDecimalValue = `255.255.255.${subDecimal}`;
        subnetMask.innerHTML = subnetMaskDecimalValue;
        ipRange.innerHTML = "Choose between 0 and 255";
        rangeSelectionFunc(classType, subDecimal);
    } else if(classType == "B") {
        subnetMaskDecimalValue = `255.255.${subDecimal}.0`;
        subnetMask.innerHTML = subnetMaskDecimalValue;
        ipRange.innerHTML = "Choose between 16 and 31";
        rangeSelectionFunc(classType, subDecimal);
    } else if(classType == "A") {
        subnetMaskDecimalValue = `255.${subDecimal}.0.0`;
        subnetMask.innerHTML = subnetMaskDecimalValue;
        let rangeSelect = 0;
        ipAddressTableFunc(classType, subDecimal, rangeSelect);
    }
}

// Select ip range
function rangeSelectionFunc(classType, subDecimal) {
    rangeSelection.style.visibility = "visible";
    calculateIpButton.onclick = function() {
        rangeSelect = rangeSelectionNumber.value;
        ipAddressTableFunc(classType, subDecimal, rangeSelect);
    }
}

// show ip address table
function ipAddressTableFunc(classType, subDecimal, rangeSelect) {
    ipAddressTable.style.visibility = "visible";
    let iterate = 0;
    let step = 0;
    let step2 = 0;
    let step3 = 0;
    let increase = 0;
    let loop = 0;
    let ipTableContent = "<table class='ipAddressTable'><thead id='ipAddressTable_table_head'><th class='ipAddressTable_table_sr_title'>Adresse de sous réseau</th><th class='ipAddressTable_table_firstip_title'>Première adresse IP</th><th class='ipAddressTable_table_lastip_title'>Dernière adresse IP</th><th class='ipAddressTable_table_broadcast_title'>Adresse de diffusion</th></thead>";
    switch(subDecimal) {
        case 0:
            iterate += 0;
            increase += 0;
            break;
        case 128:
            iterate += 2;
            increase += 128;
            break;
        case 192:
            iterate += 4;
            increase += 64;
            break;
        case 224:
            iterate += 8;
            increase += 32;
            break;
        case 240:
            iterate += 16;
            increase += 16;
            break;
        case 248:
            iterate += 32;
            increase += 8;
            break;
        case 252:
            iterate += 64;
            increase += 4;
            break;
        case 254:
            iterate += 128;
            increase += 2;
            break;
        case 255:
            iterate += 1;
            increase += 1;
            break;
    }
    console.log("Increase value : " + increase);
    switch(classType) {
        case "A":
            loop = Math.pow(iterate, 3);
            for(let i = 0;i < loop; i++) {
                ipTableContent += '<tr><td class="ipAddressTable_table_sr_value">172.'+step3+'.'+step2+'.'+step+'</td><td class="ipAddressTable_table_firstIp_value">10.'+step3+'.'+step2+'.'+(step+1)+'</td><td class="ipAddressTable_table_lastIp_value">10.'+step3+'.'+step2+'.'+((step+increase)-2)+'</td><td class="ipAddressTable_table_broadcast_value">10.'+step3+'.'+step2+'.'+((step+increase)-1)+'</td></tr>';
                if((step+increase) >= 255) {
                    step2 += 1;
                    step = 0;
                    if(step2 > 255) {
                        step3 += 1;
                        step2 = 0;
                        if(step3 > 255) {
                            loop = 0;
                        }
                    }
                } else {
                    step += increase;
                }
            }
            break;
        case "B":
            loop = 256 * iterate;
            for(let i = 0;i < loop; i++) {
                ipTableContent += '<tr><td class="ipAddressTable_table_sr_value">172.'+rangeSelect+'.'+step2+'.'+step+'</td><td class="ipAddressTable_table_firstIp_value">172.'+rangeSelect+'.'+step2+'.'+(step+1)+'</td><td class="ipAddressTable_table_lastIp_value">172.'+rangeSelect+'.'+step2+'.'+((step+increase)-2)+'</td><td class="ipAddressTable_table_broadcast_value">172.'+rangeSelect+'.'+step2+'.'+((step+increase)-1)+'</td></tr>';
                if((step + increase) >= 255) {
                    step2 += 1;
                    step = 0;
                    // if(step2 > 255) {
                    //     loop = 0;
                    // }
                } else {
                    step += increase;
                }
            }
            break;
        case "C":
            for(let i = 0;i < iterate; i++) {
                ipTableContent += '<tr><td class="ipAddressTable_table_sr_value">192.168.'+rangeSelect+'.'+step+'</td><td class="ipAddressTable_table_firstIp_value">192.168.'+rangeSelect+'.'+(step+1)+'</td><td class="ipAddressTable_table_lastIp_value">192.168.'+rangeSelect+'.'+((step+increase)-2)+'</td><td class="ipAddressTable_table_broadcast_value">192.168.'+rangeSelect+'.'+((step+increase)-1)+'</td></tr>';
                step += increase;   
            }
            break;
    }
    ipTableContent += "</table>";
    ipTable.innerHTML = ipTableContent;
}

// reload page
reset.onclick = function() {
    location.reload();
}

// const table = document.createElement("table")
// const body = document.createElement("tbody")
// const tr = document.createElement("tr")
// const td = document.createElement("td")
// const td2 = document.createElement("td")

// td.textContent = "TD content"
// td2.textContent = "TD2 content"
// tr.appendChild(td)
// body.appendChild(tr)
// table.appendChild(body)
// document.body.appendChild(table)