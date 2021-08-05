import ReactPDF from '@react-pdf/renderer';
import React, { useState, useEffect, useRef } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import { useAlert } from 'react-alert'
import Footer from './Footer';
// import 'react-tabs/style/react-tabs.css';
import './Content.css'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Will from '../Will/Will';
import emailjs from 'emailjs-com';
import Logo from '../Banner/logo.png';

// Create styles


function Content() {
    const [tabIndex, setTabIndex] = useState(0);
    const [allownext,setAllownext]= useState(false);
    const alert = useAlert()
    const [name, setName] = useState('');
    const [sal, setSal] = useState('Mr');
    const [dob, setDob] = useState();
    const [spouse, setSpouse] = useState('');
    const [yom, setYom] = useState('');
    const [haveChilderen, setHaveChilderen] = useState('No')
    const [noOfChilderen, setNoOfChilderen] = useState(0);
    const [childeren, setChilderen] = useState([]);
    const [maritalStatus, setMaritalStatus] = useState('')
    const [occupation, setOccupation] = useState('Salaried');
    const [religion, setReligion] = useState("Hindu");
    const [present1, setpresent1] = useState('');
    const [present2, setpresent2] = useState('');
    const [presentCity, setpresentCity] = useState('');
    const [presentState, setPresentState] = useState('');
    const [presentCountry, setPresentCountry] = useState("India");
    const [presentPin, setPresentPin] = useState('');
    const [executors, setExecutors] = useState([{ sal: 'Mr', name: '', relation: '' }])
    useEffect(() => {
        const tempPersonal = JSON.parse(localStorage.getItem('personalDetails'));
        if (tempPersonal) {
            setSal(tempPersonal['sal'])
            setName(tempPersonal['name'])
            setDob(tempPersonal['dob'])
            setOccupation(tempPersonal['occupation'])
            setReligion(tempPersonal['religion'])
            setExecutors(tempPersonal['executors'])
            setSpouse(tempPersonal['spouse'])
            setMaritalStatus(tempPersonal['maritalStatus'])
            setHaveChilderen(tempPersonal['haveChilderen'])
            setNoOfChilderen(tempPersonal['noOfChilderen'])
            setChilderen(tempPersonal['childeren'])
        }
        const tempAddress = JSON.parse(localStorage.getItem('address'));
        if (tempAddress) {
            setpresent1(tempAddress['present1'])
            setpresent2(tempAddress['present2'])
            setpresentCity(tempAddress['presentCity'])
            setPresentState(tempAddress['presentState'])
            setPresentPin(tempAddress['presentPin'])
            setPresentCountry(tempAddress['presentCountry'])
        }
    }, [])
    function initializeChildren(e) {
        var number = e.target.value;
        setNoOfChilderen(number)
        const temp = [];
        for (var i = 0; i < e.target.value; i++) {
            temp.push({ index: i, childName: '', childAge: '' })
        }
        setChilderen(temp);
    }
    function setChildName(e, index) {
        const tempchild = childeren.splice(0)
        tempchild[index]['childName'] = e.target.value
        setChilderen(tempchild)
    }
    function setChildAge(e, index) {
        const tempchild = childeren.splice(0)
        tempchild[index]['childAge'] = e.target.value
        setChilderen(tempchild)
    }
    function setExecSal(e, index) {
        const tempchild = executors.splice(0)
        tempchild[index]['sal'] = e.target.value
        setExecutors(tempchild)
    }
    function setExecName(e, index) {
        const tempchild = executors.splice(0)
        tempchild[index]['name'] = e.target.value
        setExecutors(tempchild)
    }
    function setExecRelation(e, index) {
        const tempchild = executors.splice(0)
        tempchild[index]['relation'] = e.target.value
        setExecutors(tempchild)
    }
    function submitPersonal(e) {
        e.preventDefault();
        if ((maritalStatus === 'Married' && spouse && yom) || maritalStatus !== 'Married') {
            if (sal &&
                name &&
                dob &&
                occupation &&
                religion &&
                maritalStatus && executors) {
                const personalDetails = {
                    sal: sal,
                    name: name,
                    dob: dob,
                    occupation: occupation,
                    religion: religion,
                    executors: executors,
                    spouse: spouse,
                    maritalStatus: maritalStatus,
                    spouse: spouse,
                    yom: yom,
                    haveChilderen: haveChilderen,
                    noOfChilderen: noOfChilderen,
                    childeren: childeren
                }
                if (present1 && presentCity && presentState && presentPin && presentCountry) {
                    const address = {
                        present1: present1,
                        present2: present2,
                        presentCity: presentCity,
                        presentState: presentState,
                        presentPin: presentPin,
                        presentCountry: presentCountry,
                    }
                    localStorage.setItem('address', JSON.stringify(address));
                }
                else {
                    alert.show('All fields in Present Address are required')
                    return
                }
                localStorage.setItem('personalDetails', JSON.stringify(personalDetails));
                setTabIndex(1);
            }
            else {
                alert.show('All personal information fields are required')
            }
        }
        else {
            alert.show('Please enter spouse name!')
        }
    }
    function addExecutor(e) {
        e.preventDefault();
        const tempExec = executors.splice(0);
        tempExec.push({ sal: 'Mr', name: '', relation: '' })
        setExecutors(tempExec)
    }

    //Beneficiary details State variables
    const [benName, setBenName] = useState('')
    const [benSal, setBenSal] = useState('Mr')
    const [benDOB, setBenDOB] = useState();
    const [benRelation, setBenRelation] = useState();
    const [guardianSal, setGuardianSal] = useState('Mr');
    const [guardianName, setGuardianName] = useState('');
    const [guardianDOB, setGuardianDOB] = useState('');
    const [guardianRelation, setGuardianRelation] = useState('');
    const [beneficiary, setBeneficiary] = useState([]);
    const [beneficiaries, setbeneficiaries] = useState([]);
    const [benState, setbenState] = useState('')


    function addBeneficiary(e) {
        e.preventDefault();
        if (benSal && benName && benDOB && benRelation) {
            beneficiary.push(benSal);
            setBenSal('Mr');
            beneficiary.push(benName);
            setBenName('');
            beneficiary.push(benDOB);
            setBenDOB('');
            beneficiary.push(benRelation);
            setBenRelation('')
            if (getAge(benDOB) < 18 && guardianSal && guardianName && guardianDOB && guardianRelation) {
                if (guardianName && guardianRelation) {
                    if (getAge(guardianDOB) >= 18) {
                        beneficiary.push(guardianSal)
                        beneficiary.push(guardianName)
                        beneficiary.push(guardianDOB)
                        beneficiary.push(guardianRelation)
                        setGuardianDOB('')
                        setGuardianName('');
                        setGuardianRelation('')
                        setGuardianSal('Mr')
                    }
                    else {
                        alert.show('Guardian cannot be a minor!')
                        return
                    }
                }
                else {
                    alert.show('Please fill all fields!')
                    return
                }
            }
            beneficiaries.push(beneficiary);
            setBeneficiary([]);
            //console.log(beneficiaries);
            localStorage.setItem('beneficiaries', JSON.stringify(beneficiaries))
            alert.show('Beneficiary Added Succesfully')
        }
        else {
            alert.show('Please fill all fields!')
        }
    }
    useEffect(() => {
        const localbenef = JSON.parse(localStorage.getItem('beneficiaries'));
        console.log(localbenef)
        if (localbenef) {
            setbeneficiaries(localbenef);
        }
    }, [benState]);
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    function removeBeneficiary(index) {
        const temp = beneficiaries[index];
        setBenSal(temp[0]);
        setBenName(temp[1]);
        setBenDOB(temp[2]);
        setBenRelation(temp[3]);
        if (temp.length > 4) {
            setGuardianSal(temp[4])
            setGuardianName(temp[5])
            setGuardianDOB(temp[6])
            setGuardianRelation(temp[7])
        }
        const tempben = beneficiaries;
        tempben.splice(index, 1);
        console.log(tempben)
        setbeneficiaries([]);
        setbeneficiaries(tempben.length !== 0 ? tempben : []);
        localStorage.setItem('beneficiaries', JSON.stringify(beneficiaries))
        setImmovableAssets([]);
        setMovableAssets([]);
        localStorage.removeItem('immovableAssets')
        localStorage.removeItem('movableAssets')
        setbenState('updated');
        alert.show('Beneficiary Removed Succesfully')
    }
    //assets State variables
    const [assetType, setAssetType] = useState("Bank Account");
    const [assetType1, setAssetType1] = useState("Flat");
    const [share, setShare] = useState([0]);
    const [area, setArea] = useState('');
    const [assetAreaUnit, setAssetAreaUnit] = useState('')
    const [ownership, setOwnership] = useState('');
    const [description, setDescription] = useState('');
    const [assetAddress1, setAssetAddress1] = useState('');
    const [assetAddress2, setAssetAddress2] = useState('');
    const [assetCity, setAssetCity] = useState('');
    const [assetState, setAssetState] = useState('');
    const [assetPin, setAssetPin] = useState('');
    const [assetCountry, setAssetCountry] = useState('India');
    const [bankName, setBankName] = useState('');
    const [bankNumber, setBankNumber] = useState('');
    const [bankBranch, setBankBranch] = useState('');
    const [bankLocker, setBankLocker] = useState('');
    const [assetName, setAssetName] = useState('');
    const [policyName, setPolicyName] = useState('');
    const [policyNumber, setPolicyNumber] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [immovableAssets, setImmovableAssets] = useState([]);
    const [movableAssets, setMovableAssets] = useState([]);
    const [movVisible, setMovVisible] = useState('none');
    const [immovVisible, setImmovVisible] = useState('none');
    function initializeShare() {
        const tempShare = []
        if (beneficiaries.length === 0){
            alert.show('Please add beneficiary')
        }
        else{
        beneficiaries.map((ben, index) => {
            tempShare.push({ index: index, name: ben[1], dob: ben[2], value: 0 })
        })
        setTabIndex(2)
        setShare(tempShare);}


    }
    function handleShareChange(e, name, dob, index) {
        const tempshare = share.slice(0);
        console.log(index)
        if (tempshare.find(o => o.name === name)) {
            console.log(index)
            tempshare[index] = { index: index, name: name, dob: dob, value: e.target.value }
            setShare(tempshare);
        }
        else {
            console.log(index)
            tempshare.push({ index: index, name: name, dob: dob, value: e.target.value })
            setShare(tempshare);
        }
        var totalShare = 0;
        share.map((temp) => {
            totalShare = totalShare + Number(temp['value']);
        })
        if (totalShare === 100) {
            setResiduary(share);
            localStorage.setItem('residuary', JSON.stringify(share));
            setTabIndex(2)
        }
        // else {
        //     if (totalShare < 100)
        //         alert.show('Assign 100% of the residuary properties')
        //     else
        //         alert.show("More Than 100% Residuary Property Assigned")
        // }
    }
    useEffect(() => {
        const localImmovableAssets = JSON.parse(localStorage.getItem('immovableAssets'));
        const localMovableAssets = JSON.parse(localStorage.getItem('movableAssets'));
        console.log(localImmovableAssets)
        if (localImmovableAssets) {
            setImmovableAssets(localImmovableAssets);
        }
        if (localMovableAssets) {
            setMovableAssets(localMovableAssets);
        }
    }, [benState]);
    function addImmovableAsset(e) {
        var totalShare = 0;
        share.map((temp) => {
            totalShare = totalShare + Number(temp['value']);
        })
        
            

        
        if (totalShare === 100) {
            e.preventDefault();
            const tempAsset = {
                assetType: assetType1,
                area: area,
                assetAreaUnit: assetAreaUnit,
                ownership: ownership,
                assetAddress1: assetAddress1,
                assetAddress2: assetAddress2,
                assetCity: assetCity,
                assetState: assetState,
                assetPin: assetPin,
                assetCountry: assetCountry,
                description: ownership + ',\n' + 'Area: ' + area + ' ' + assetAreaUnit + '\n\nAddress:\n' + assetAddress1 + ', ' + assetAddress2 + ', ' + assetCity + ', ' + assetState + ', ' + assetPin,
                share:share

                }
           
            immovableAssets.push(tempAsset);
            setAssetType1('Flat');
            setAssetAreaUnit('');
            setArea('');
            setOwnership('');
            setDescription('');
            setAssetAddress1('');
            setAssetAddress2('');
            setAssetCity('');
            setAssetState('');
            setAssetPin('');
            setAssetCountry('');
            setShare([]);
            console.log(immovableAssets);
            localStorage.setItem("immovableAssets", JSON.stringify(immovableAssets));
            alert.show('Asset Added Succesfully')
            setAllownext(true);
        }
        else {

            if (totalShare < 100)
                alert.show('Please allocate total 100% to the property')
            else
                alert.show("You have over allocated property: Share % total for one asset should be 100%")

        }
    }
    function addAsset(e) {
        e.preventDefault();
        var totalShare = 0;
        share.map((temp) => {
            totalShare = totalShare + Number(temp['value']);
        })
        if (totalShare === 100) {
            if (assetType === 'Mutual Funds' || assetType === "Jewellery" || assetType === "Any other Investments" || assetType === "Electronics and Appliances" || assetType === "Digital Asset" || assetType === "Business Asset") {
                const tempAsset = {
                    assetType: assetType,
                    description: description,
                    share: share
                }
                movableAssets.push(tempAsset);
                setAssetType('Flat');
                setDescription('');
                setShare([]);
                console.log(movableAssets);
                localStorage.setItem("movableAssets", JSON.stringify(movableAssets));
            }
            else if (assetType === "Insurance Policies" || assetType === 'Bond Debentures') {
                const tempAsset = {
                    assetType: assetType,
                    assetName: assetName,
                    policyName: policyName,
                    policyNumber: policyNumber,
                    description: assetName + ' ' + policyNumber,
                    share: share
                }
                movableAssets.push(tempAsset);
                setAssetType('Flat');
                setDescription('');
                setShare([]);
                console.log(movableAssets);
                localStorage.setItem("movableAssets", JSON.stringify(movableAssets));
            }
            else if (assetType === "Vehicles") {
                const tempAsset = {
                    assetType: assetType,
                    brand: brand,
                    model: model,
                    vehicleNumber: vehicleNumber,
                    description: brand + ' ' + model,
                    share: share
                }
                movableAssets.push(tempAsset);
                setAssetType('Flat');
                setDescription('');
                setShare([]);
                console.log(movableAssets);
                localStorage.setItem("movableAssets", JSON.stringify(movableAssets));
            }
            else {
                const tempAsset = {
                    assetType: assetType,
                    bankNumber: bankNumber,
                    bankBranch: bankBranch,
                    bankName: bankName,
                    bankLocker: bankLocker,
                    description: bankName + ' ' + bankNumber,
                    share: share
                }
                movableAssets.push(tempAsset);
                setAssetType('Flat');
                setDescription('');
                setShare([]);
                console.log(movableAssets);
                localStorage.setItem("movableAssets", JSON.stringify(movableAssets));
            }
            alert.show('Asset Added Succesfully')
        }
        else {
            if (totalShare < 100)
                alert.show('Please allocate total 100% to the property')
            else
                alert.show("You have over allocated property: Share % total for one asset should be 100%")
        }
    }
    function removeImmovable(index) {
        const tempAsset = immovableAssets[index];
        setAssetType1(tempAsset["assetType"]);
        setArea(tempAsset['area']);
        setOwnership(tempAsset['ownership']);
        setDescription(tempAsset['description']);
        setAssetAddress1(tempAsset['assetAddress1']);
        setAssetAddress2(tempAsset['assetAddress2']);
        setAssetCity(tempAsset['assetCity']);
        setAssetState(tempAsset['assetState']);
        setAssetPin(tempAsset['assetPin']);
        setAssetCountry(tempAsset['assetCountry']);
        setShare(tempAsset['share'])
        const tempAssets = immovableAssets;
        tempAssets.splice(index, 1)
        setImmovableAssets([]);
        setImmovableAssets(tempAssets.length !== 0 ? tempAssets : []);
        localStorage.setItem('immovableAssets', JSON.stringify(immovableAssets))
        setbenState('update');
    }
    function removeMovable(index) {
        const tempAsset = movableAssets[index];
        setAssetType('');
        setAssetType(tempAsset['assetType']);
        console.log(tempAsset['assetType']);
        console.log(assetType);
        setDescription(tempAsset['description']);
        setShare(tempAsset['share']);

        const tempAssets = movableAssets;
        tempAssets.splice(index, 1)
        setMovableAssets([]);
        setMovableAssets(tempAssets.length !== 0 ? tempAssets : []);
        localStorage.setItem('movableAssets', JSON.stringify(movableAssets))
        setbenState('update');
    }
    const [alternate, setAlternate] = useState([])
    function initializeAlternate() {
        var tempAlt = []

        immovableAssets?.map((asset, index) => {
            tempAlt.push({ assesType: asset['assetType'], details: asset['description'], altDetails: '' })
        })
        movableAssets?.map((asset, index) => {
            tempAlt.push({ assesType: asset['assetType'], details: asset['description'], altDetails: '' })
        })
        setAlternate(tempAlt)
        checkValid();


    }
    function checkValid() {
        var totalShare = 0;
        share.map((temp) => {
            totalShare = totalShare + Number(temp['value']);
        })
        if (totalShare === 100) {
            setResiduary(share);
            localStorage.setItem('residuary', JSON.stringify(share));
            setTabIndex1(1)
        }
        if(allownext){
            setTabIndex1(1);
            return
        }
        else {
            
            if (totalShare < 100)
                alert.show('Please allocate total 100% to the property')
            else
                alert.show("You have over allocated property: Share % total for one asset should be 100%")
        }
    }
    function storeAlternate() {
        var filled = true;
        alternate?.map((alt) => {
            if (!alt['altDetails']) {
                alert.show("Please fill all alternate beneficiaries")
                filled = false;
                return
            }
        })
        if (filled) {
            localStorage.setItem('alternate', JSON.stringify(alternate))
            setTabIndex1(2)
        }
    }
    const handleExportWithComponent = (event) => {
                // PDF Downloading Code
                
            let temp =    localStorage.getItem('personalDetails')
            let temp1 =    localStorage.getItem('movableAssets')
            let temp2 =    localStorage.getItem('immovableAssets')

            console.log(temp)
            console.log(temp2)
            console.log(temp1)
// PDF Maker
var dd = {
    content: [
        { text: `WILL THAT IS STATEMENT OF ${temp['sal']} ${name.toUpperCase()} EXECUTED ON ${temp['date']}`, style: 'header' },
        { text: `I, ${temp['sal']} ${temp['name']} , age ${temp['age']} years, ${religion} by religion, occupation ${occupation}, ${presentCountry} Citizen , having residential address as ${present1}, ${present2}, ${presentCity} – ${presentPin}, do make this my last Will and Testament.`, style: 'subheader' },
        { text: '1. I have not made any will but if any made, I hereby revoke the same and declare this to be my last will and testament in India.', style: 'subheader' },
        { text: `2. Under this Will, I appoint my son Mr. Nikhil Sharma and my daughter Ms. Naina Sharma as the Executors of this Will and Trustees of my estate. They may act as executors either jointly or severally. The abovenamed executors shall take charge of my assets and properties after my death and procure Probate from the Competent Court to my Will having effect over all my assets and properties in India.`, style: 'subheader' },
        { text: `3. I got married to my wife ${spouse} in the year ${yom}.I have ${noOfChilderen}. The name/s of my children are as under:.`, style: 'subheader' },
        {
            style: 'tableExample',

            table: {
                widths: ['*', '*'],
                body: [
                    [{ text: 'Name', style: 'tableHeader' }, { text: 'Age (years)', style: 'tableHeader' }],
                    
                    //['Nikhil', '28'],
                    //['Naina', '25']
                ]
            }
        },
        { text: '4. My immovable assets and properties consist of following and after my death, I wish to bequeath my share in the below mentioned immovable properties to the persons mentioned in the table below:.', style: 'subheader' },
        {
            style: 'tableExample',
            table: {
                body: [
                    [
                        { text: 'Sr. No.', style: 'tableHeader' },
                        { text: 'Name of Asset', style: 'tableHeader' },
                        { text: 'Description Asset and Address', style: 'tableHeader' },
                        { text: 'Beneficiaries & percentage to beneficiary', style: 'tableHeader' },
                        { text: 'Relation with the Testaor', style: 'tableHeader' },
                    ],
                    // ['1', 'Flat', 'Solely owned, Area 600 sq.ft. Address: F-302, Palms Apartments,Whitefield, Bangalore – 560 066', 'Nikhil 100%', 'Son'],
                    // ['2', 'Flat', 'Solely owned, Area 600 sq.ft. Address: F-302, Palms Apartments,Whitefield, Bangalore – 560 066', 'Naina 100%', 'Daughter'],
                    // ['3', 'Flat', 'Solely owned, Area 600 sq.ft. Address: F-302, Palms Apartments,Whitefield, Bangalore – 560 066', 'Naina 100%', 'Daughter'],
                ]
            }
        },
        { text: '5. My movable assets and properties consist of following and after my death, I wish to bequeath my share in the below mentioned movable properties to the persons mentioned below:', style: 'subheader' },
        {
            style: 'tableExample',
            table: {
                body: [
                    [
                        { text: 'Sr. No.', style: 'tableHeader' },
                        { text: 'Name of Asset', style: 'tableHeader' },
                        { text: 'Description Asset and Address', style: 'tableHeader' },
                        { text: 'Beneficiaries & percentage to beneficiary', style: 'tableHeader' },
                        { text: 'Relation with the Testaor', style: 'tableHeader' },
                    ],
                    ['1', 'Bank account', 'Kotak Mahindra Bank, having Account No. 1234567890, Savings Account Address: Old Madras Road, Bangalore Branch', 'Nikhil 100%', 'Son'],
                    ['2', 'Safe Deposit Locker', 'Kotak Mahindra Bank, having Account No. 1234567890, Savings Account Address: Old Madras Road, Bangalore Branch', 'Naina 100%', 'Daughter'],
                    ['3', 'Flat', 'Solely owned, Area 600 sq.ft. Address: F-302, Palms Apartments,Whitefield, Bangalore – 560 066', 'Naina 100%', 'Daughter'],
                ]
            }
        },
        { text: '6. It is also my wish that, in case any of the above stated beneficiaries predecease me then the share of that beneficiary under this WILL shall devolve upon:', style: 'subheader' },
        {
            style: 'tableExample',
            table: {
                body: [
                    [
                        { text: 'Sr. No.', style: 'tableHeader' },
                        { text: 'Name of Asset', style: 'tableHeader' },
                        { text: 'Description Asset and Address', style: 'tableHeader' },
                        { text: 'Beneficiaries & percentage to beneficiary', style: 'tableHeader' },
                        { text: 'Relation with the Testaor', style: 'tableHeader' },
                    ],
                    //{immovableAssets.map((iA,index) => {
                    //   [index+1, iA['description']]
                    //})},
                    ['1', 'Bank account', 'Kotak Mahindra Bank, having Account No. 1234567890, Savings Account Address: Old Madras Road, Bangalore Branch', 'Nikhil 100%', 'Son'],
                    ['2', 'Safe Deposit Locker', 'Kotak Mahindra Bank, having Account No. 1234567890, Savings Account Address: Old Madras Road, Bangalore Branch', 'Naina 100%', 'Daughter'],
                    ['3', 'Flat', 'Solely owned, Area 600 sq.ft. Address: F-302, Palms Apartments,Whitefield, Bangalore – 560 066', 'Naina 100%', 'Daughter'],
                ]
            }
        },
        { text: '7. I believe that for the aforesaid properties I do not possess any other movable or immovable properties. However in case it is found that I have missed or forgotten to mention any of the properties held by me as on date or if I acquire or become entitled to any moveable or immovable properties other than mentioned herein above at the time of my death, I bequeath all such properties to the following persons:', style: 'subheader' },
        {
            style: 'tableExample',

            table: {
                widths: ['*', '*'],
                body: [
                    [{ text: 'List of Beneficiaries', style: 'tableHeader' }, { text: 'Percentage of bequeath', style: 'tableHeader' }],
                    ['Nikhil', '50%'],
                    ['Naina', '50%']
                ]
            }
        },
        { text: '8. I wish to appoint _______ as a guardian for the minor/minors who are the beneficiaries in the Will, till the time they turn major.', style: 'subheader' },
        { text: '9. I have made this Will out of my free will and while I am in sound health and in good understanding and in witness hereof I have put my signature hereunder in the presence of witnesses on this day of June, 2021', style: 'subheader' },
        { text: 'Signed by the within named Testator Mr. Rahul Sharma In our presence and we the undersigned Witnesses have, at the request of the Testator, in his presence and in the presence of each other, put our signatures as Witnesses ', style: 'subheader' },
        {
            style: 'tableExample',

            table: {
                widths: ['*', '*'],
                heights: 40,
                body: [
                    [{ text: 'WITNESS 1', style: 'tableHeader' }, { text: 'WITNESS 2', style: 'tableHeader' }],
                    [{ border: [true, false, true, false], alignment: 'left', text: 'Signature:' }, { border: [true, false, true, false], alignment: 'left', text: 'Signature:' }],
                    [{ border: [true, false, true, false], alignment: 'left', text: 'Name:' }, { border: [true, false, true, false], alignment: 'left', text: 'Name:' }],
                    [{ border: [true, false, true, false], alignment: 'left', text: 'Address:' }, { border: [true, false, true, false], alignment: 'left', text: 'Address:' }],
                    [{ border: [true, false, true, true], alignment: 'left', text: 'Date:' }, { border: [true, false, true, true], alignment: 'left', text: 'Date:' }],
                ]
            }
        },
        { text: `DTD THIS DAY OF ${temp['date']}`, style: 'header' },
        { text: `${sal} ${name}`, style: 'header' },
        { text: '.. TESTATOR', style: 'header' },
        { text: 'WILL', style: 'header' },
        { text: 'WILL made through WILL CREATOR by BAJAJ ALLIANZ powered by LawTarazoo', style: 'footer' },
        { text: 'For any legal queries contact on +91-9619792288 or mail on experts@lawtarazoo.com', style: 'footer' },
    ],
    styles: {
        header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: 'center'
        },
        subheader: {
            fontSize: 14,
            margin: [0, 10, 0, 5]
        },
        tableExample: {
            margin: [0, 5, 0, 15],
            alignment: 'center',
        },
        tableHeader: {
            bold: true,
            fontSize: 14,
            color: 'black'
        },
        footer: {
            bold: true,
            fontSize: 12,
            color: 'black',
            alignment: 'center',
            margin: [40, 20, 40, 10],
        }
    },
    defaultStyle: {
        // alignment: 'justify'
    }
    };
    window.pdfMake.createPdf(dd).download('myWill');
    };



    const pdfExportComponent = useRef();
    const [willPoint, setWillPoint] = useState(2)
    function getCurrentDate() {
        let separator = '/';
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
    }




    function setAltBen(e, index) {
        var tempAlt = alternate.splice(0)
        tempAlt[index]['altDetails'] = e.target.value
        setAlternate(tempAlt);
    }
    const [tabIndex1, setTabIndex1] = useState(0)
    const [residuary, setResiduary] = useState('');
    function setResiduary1() {
        var totalShare = 0;
        share.map((temp) => {
            totalShare = totalShare + Number(temp['value']);
        })
        if (totalShare === 100) {
            setResiduary(share);
            localStorage.setItem('residuary', JSON.stringify(share));
            setTabIndex(3)
        }
        else {
            if (totalShare < 100)
                alert.show('Assign 100% of the residuary properties')
            else
                alert.show("More Than 100% Residuary Property Assigned")
        }
    }
    return (
        <div className="content">
            <div className="content-sub">
                <Tabs selectedIndex={tabIndex} >
                    <TabList>
                        <Tab><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><p className="tab-progress">1</p>Personal Information</div></Tab>
                        <span className="connecting-line"></span>
                        <Tab><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><p className="tab-progress">2</p>Beneficiary</div></Tab>
                        <span className="connecting-line"></span>

                        <Tab><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><p className="tab-progress">3</p>Assets</div></Tab>
                        <span className="connecting-line"></span>

                        <Tab><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><p className="tab-progress">4</p>Your Will</div></Tab>
                    </TabList>

                    <TabPanel>
                        <h2>Personal Information</h2>
                        <form id='personal-form'>
                            <div className='form-row' >
                                <div className='form-item'>
                                    <label>Title: </label>
                                    <select value={sal ? sal : "Mr."} onChange={(e) => { setSal(e.target.value) }}>
                                        <option value="Mr">Mr.</option>
                                        <option value="Ms">Ms.</option>
                                        <option value="Mrs">Mrs.</option>
                                        <option value="">N/A</option>
                                    </select>
                                </div>
                                <div className='form-item' style={{ width: '23%' }}>
                                    <label> Full Name</label>
                                    <input required value={name ? name : ''} onChange={(e) => { setName(e.target.value) }}></input>
                                </div>
                                <div className='form-item' style={{ width: '30%', marginLeft: '180px' }}>
                                    <label>DOB</label>
                                    <input type='date' value={dob ? dob : ''} onChange={(e) => { setDob(e.target.value) }}></input>
                                </div>

                            </div>
                            <div className="form-row" style={{ marginTop: '20px' }}>
                                <div className='form-item' style={{ width: '30%' }}>
                                    <label>Occupation: </label>
                                    <p style={{ color: 'white' }}>(Note:Muslim religion followers shall require a customized Will due to distinctive Islamic
                                        laws. )</p>
                                    <select value={occupation ? occupation : 'Salaried'} onChange={(e) => { setOccupation(e.target.value); console.log(dob) }}>
                                        <option value="Salaried">Salaried</option>
                                        <option value="Professional">Professional</option>
                                        <option value="Business Owner">Business Owner</option>
                                        <option value="Agriculturist">Agriculturist</option>
                                        <option value="Retired">Retired</option>
                                        <option value="Homemaker">Homemaker</option>
                                        <option value="Student">Student</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className='form-item' style={{ width: '30%', marginLeft: '170px' }}>
                                    <label>Religion:</label>
                                    <p>(Note:Muslim religion followers shall require a customized Will due to distinctive Islamic
                                        laws. To know more contact us at experts@lawtarazoo.com)</p>
                                    <select value={religion ? religion : 'Hindu'} onChange={(e) => { setReligion(e.target.value) }}>
                                        <option value="Hindu">Hindu</option>
                                        <option value="Indian Christian">Indian Christian</option>
                                        <option value="Parsi">Parsi</option>
                                        <option value="Jain">Jain</option>
                                        <option value="Buddhist">Buddhist</option>
                                        <option value="Sikh">Sikh</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row" style={{ marginTop: '70px' }}>
                                <div className="form-item" >
                                    <label>Marital Status</label>
                                    <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)}>
                                        <option value="">-Select Marital Status-</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Widowed">Widowed</option>
                                        <option value="Divorced">Divorced</option>
                                    </select>
                                </div>
                                {maritalStatus === "Married" ?
                                    <>
                                        <div className="form-item">
                                            <label>Spouse's Name  </label>
                                            <input value={spouse} onChange={(e) => setSpouse(e.target.value)}></input>
                                        </div>
                                        <div className='form-item'>
                                            <label>Year of Marriage</label>
                                            <input value={yom} onChange={(e) => setYom(e.target.value)}></input>
                                        </div>
                                    </> : ""}
                                {maritalStatus === "Married" || maritalStatus === "Widowed" || maritalStatus === "Divorced" ?
                                    <div className="form-item">
                                        <label>Do you have childeren?</label>
                                        <select value={haveChilderen} onChange={(e) => setHaveChilderen(e.target.value)}>
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </select>
                                    </div> : ""}
                                {haveChilderen === 'Yes' ?
                                    <div className='form-item'>
                                        <label>Number of Children</label>
                                        <input type="number" min='1' max='10' value={noOfChilderen} onChange={(e) => initializeChildren(e)}></input>
                                    </div>
                                    : ''}
                            </div>
                            {haveChilderen === 'Yes' && maritalStatus !== 'Single' ?
                                <div>{childeren?.map((child, index) =>
                                    <div className='form-row'>
                                        <div className="form-item">
                                            <label>{index + 1}. Child Name</label>
                                            <input value={child['childName']} onChange={(e) => setChildName(e, index)}></input>
                                        </div>
                                        <div className="form-item">
                                            <label>Child Age</label>
                                            <input value={child['childAge']} onChange={(e) => setChildAge(e, index)}></input>
                                        </div>
                                    </div>)} </div> :
                                ''}

                            <h3>Present Address</h3>
                            <div className="form-row address-row">
                                <div className='form-item'>
                                    <div className="form-row"> <label>Address Line 1* </label><p style={{ marginLeft: '10px' }}> (House Number, Building Name, Etc)</p></div>
                                    <input style={{ width: '380px' }} value={present1 ? present1 : ''} onChange={(e) => { setpresent1(e.target.value) }}></input>
                                </div>


                                <div className='form-item'>
                                    <div className="form-row"> <label>Address Line 2 </label><p style={{ marginLeft: '10px' }}> (Street, Society, Colony Name)</p></div>

                                    <input style={{ width: '380px' }} value={present2 ? present2 : ''} onChange={(e) => { setpresent2(e.target.value) }}></input>
                                </div>

                            </div>
                            <div className="form-row">
                                <div className='form-item'>
                                    <label>City/Town*</label>
                                    <input value={presentCity ? presentCity : ''} onChange={(e) => { setpresentCity(e.target.value) }}></input>
                                </div>
                                <div className='form-item'>
                                    <label>State*</label>
                                    <input value={presentState ? presentState : ''} onChange={(e) => { setPresentState(e.target.value) }}></input>
                                </div>



                                <div className='form-item'>
                                    <label>Pin*</label>
                                    <input value={presentPin ? presentPin : ''} onChange={(e) => { setPresentPin(e.target.value) }}></input>
                                </div>
                                <div className='form-item'>
                                    <label>Country*</label>
                                    <input value={presentCountry ? presentCountry : ''} onChange={(e) => { setPresentCountry(e.target.value) }}></input>
                                </div>
                            </div>

                            <h3>Executor</h3>
                            <p className="note-para">(NOTE- An executor can be any person whom you trust e.g.
                                Beneficiary, friend, relative, etc. The responsibility of an executor is to
                                distribute the assets as mentioned by the author of the WILL.)</p>
                            {executors?.map((executor, index) =>
                                <div className="form-row">
                                    <div className='form-item'>
                                        <label>Title: </label>
                                        <select value={executor['sal']} onChange={(e) => setExecSal(e, index)}>
                                            <option value="Mr">Mr.</option>
                                            <option value="Ms">Ms.</option>
                                            <option value="Mrs">Mrs.</option>
                                            <option value="">N/A</option>
                                        </select>
                                    </div>
                                    <div className='form-item'>
                                        <label> Full Name*</label>
                                        <input value={executor['name']} onChange={(e) => setExecName(e, index)}></input>
                                    </div>
                                    <div className="form-item">
                                        <label>Relation*</label>
                                        <input value={executor['relation']} onChange={(e) => setExecRelation(e, index)}></input>
                                    </div>
                                    {executors.length === 1 || (executors.length === 2 && executors.length === index + 1) ?
                                        <div style={{ marginLeft:'30px',justifyContent: "right" }} className='form-row'>
                                            <button disabled={executors.length >= 3} onClick={(e) => addExecutor(e)} id="next-btn">Add Executor</button>
                                        </div> : ''}
                                </div>)}


                            <div style={{ justifyContent: "right" }} className='form-row'></div>

                            
                            <div style={{ justifyContent: "right" , paddingTop:'50px'}} className='form-row'>

                                <button type='submit' onClick={(e) => submitPersonal(e)} id="next-btn">Next: Add Beneficiary</button>
                            </div>

                        </form>
                    </TabPanel>
                    <TabPanel>
                        <h2>Beneficiary Details</h2>
                        <form id='beneficiary-form' style={{ marginTop: '60px' }}>
                            <div className='form-row'>
                                <div className='form-item'>
                                    <label>Title: </label>
                                    <select value={benSal} onChange={(e) => setBenSal(e.target.value)}>
                                        <option value="Mr">Mr.</option>
                                        <option value="Ms">Ms.</option>
                                        <option value="Mrs">Mrs.</option>
                                        <option value="">N/A</option>
                                    </select>
                                </div>
                                <div className='form-item'>
                                    <label> Full Name</label>
                                    <input value={benName} onChange={(e) => setBenName(e.target.value)}></input>
                                </div>
                                <div className='form-item'>
                                    <label>DOB</label>
                                    <input value={benDOB} onChange={(e) => setBenDOB(e.target.value)} type='date'></input>
                                </div>
                                <div className='form-item' style={{ width: '300px' }}>
                                    <label>Relation with Author of Will: </label>
                                    {/* <p style={{ width: '275px', fontSize: '16px' }} className="note-para">(eg. friend, son, sister, etc.)</p> */}
                                    <input value={benRelation} onChange={(e) => setBenRelation(e.target.value)} placeholder='eg.  friend, son, sister, etc. '></input>
                                </div>
                                {!(getAge(benDOB) < 18) ? <><div style={{ justifyContent: "right", paddingTop:'25px' }} className='form-row'>
                                    <button type='submit' onClick={addBeneficiary} id="add-beneficiary"><AddIcon /> Add Beneficiary</button>

                                </div></> : ''}
                            </div>
                            {
                                getAge(benDOB) < 18 ?
                                    <div>
                                        <h3>Guardian details</h3>
                                        <p className="note-para">As the listed beneficiary is Minor, kindly appoint a Guardian*<br />
                                            (Note: Guardian should be such a person who will act as a trustee and whatever assets are being receivable by a Minor under WILL be maintained by a Guardian on behalf of a minor till the time he turns 18 years of age.)
                                        </p>
                                        <div className='form-row'>
                                            <div className='form-item'>
                                                <label>Title: </label>
                                                <select value={guardianSal} onChange={(e) => setGuardianSal(e.target.value)}>
                                                    <option value="Mr">Mr.</option>
                                                    <option value="Ms">Ms.</option>
                                                    <option value="Mrs">Mrs.</option>
                                                    <option value="">N/A</option>
                                                </select>
                                            </div>
                                            <div className='form-item'>
                                                <label> Full Name</label>
                                                <input value={guardianName} onChange={(e) => setGuardianName(e.target.value)}></input>
                                            </div>
                                            <div className='form-item'>
                                                <label>DOB</label>
                                                <input value={guardianDOB} onChange={(e) => setGuardianDOB(e.target.value)} type='date'></input>
                                            </div>
                                            <div className='form-item'>
                                                <label>Relation with Minor: </label>
                                                <input value={guardianRelation} onChange={(e) => setGuardianRelation(e.target.value)}></input>
                                            </div>
                                            {(getAge(benDOB) < 18) ? <><div style={{ justifyContent: "right", marginLeft: 'auto' }} className='form-row'>
                                                <button type='submit' onClick={addBeneficiary} id="add-beneficiary"><AddIcon /> Add Beneficiary</button>

                                            </div></> : ''}
                                        </div>
                                    </div>
                                    : ''
                            }

                            <div style={{ justifyContent: "right", marginTop: '20px' }} className='form-row'>
                                <a onClick={() => { setTabIndex(0) }} id="next-btn">Previous</a>
                                <a onClick={() => { initializeShare() }} id="next-btn">Next: Asset Details</a>
                            </div>
                        </form>
                        {beneficiaries.length !== 0 ?
                            <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Relation</th>
                                        <th>Modify/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {beneficiaries.map((ben, index) =>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{ben[1]}</td>
                                            <td>{getAge(ben[2])}</td>
                                            <td>{ben[3]}</td>
                                            <td className="remove-btn"><CancelIcon onClick={() => removeBeneficiary(index)}></CancelIcon></td>
                                        </tr>)}
                                </tbody>
                            </table> : ''}
                    </TabPanel>
                    <TabPanel>
                        <Tabs selectedIndex={tabIndex1}>
                            <TabList style={{ display: 'none' }}>
                                <Tab>Assets</Tab>
                                <Tab></Tab>
                                <Tab></Tab>
                            </TabList>

                            <TabPanel>
                                <h2>Distribution of your Assets</h2>
                                <h3 onClick={() => setImmovVisible(immovVisible === "none" ? 'block' : 'none')} style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} className="asset-tab">My Immovable Property<ArrowDropDownIcon /></h3>
                                <div style={{ display: immovVisible }}>
                                    <form style={{ width: '100%' }}>
                                        <div className='form-row'>
                                            <div className='form-item'>
                                                <label>Asset Type: </label>
                                                <select value={assetType1} onChange={(e) => setAssetType1(e.target.value)}>
                                                    <option value="Flat">Flat</option>
                                                    <option value="Land">Land</option>
                                                    <option value="House">House</option>
                                                </select>
                                            </div>
                                        </div>
                                        {(assetType1 === "Flat" || assetType1 === "Land" || assetType1 === "House") ?
                                            <div>
                                                <div className='form-row'>
                                                    <div className='form-item'>
                                                        <label>Area of {assetType1} </label>
                                                        <input value={area} onChange={(e) => setArea(e.target.value)} ></input>
                                                    </div>
                                                    <div className='form-item'>
                                                        <label>Area Unit</label>
                                                        <select value={assetAreaUnit} onChange={(e) => setAssetAreaUnit(e.target.value)}>
                                                            <option value=''>-Select Area Unit-</option>
                                                            <option value='Acres'>Acres</option>
                                                            <option value='Gunthas'>Gunthas</option>
                                                            <option value='Sq. Metres'>Sq. Metres</option>
                                                            <option value="Sq. Feet">Sq. Feet</option>
                                                            <option value="Sq. Yards">Sq. Yards</option>
                                                            <option value="Hectare">Hectare</option>
                                                        </select>
                                                    </div>
                                                    <div className='form-item'>
                                                        <label>Ownership</label>
                                                        <div style={{ marginTop: "10px" }}>
                                                            <input type="radio" value="Solely Owned" checked={ownership === 'Solely Owned'} onClick={(e) => setOwnership(e.target.value)}></input>
                                                            <label>Solely Owned</label>
                                                            <input style={{ marginLeft: '15px' }} type="radio" value="Jointly Owned" checked={ownership === 'Jointly Owned'} onClick={(e) => setOwnership(e.target.value)}></input>
                                                            <label>Jointly Owned</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3>Detailed Address</h3>
                                                <div className="form-row address-row">
                                                    <div className='form-item'>

                                                        <div className="form-row"> <label>Address Line 1* </label><p style={{ marginLeft: '10px' }}> (House Number, Building Name, Etc)</p></div>
                                                        <input style={{ width: '380px' }} value={assetAddress1} onChange={(e) => setAssetAddress1(e.target.value)}></input>
                                                    </div>
                                                </div>
                                                <div className='form-row address-row'>
                                                    <div className='form-item'>
                                                        <div className="form-row"> <label>Address Line 2 </label><p style={{ marginLeft: '10px' }}> (Street, Society, Colony Name)</p></div>

                                                        <input style={{ width: '380px' }} value={assetAddress2} onChange={(e) => setAssetAddress2(e.target.value)}></input>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className='form-item'>
                                                        <label>City/Town*</label>
                                                        <input value={assetCity} onChange={(e) => setAssetCity(e.target.value)}></input>
                                                    </div>
                                                    <div className='form-item'>
                                                        <label>State*</label>
                                                        <input value={assetState} onChange={(e) => setAssetState(e.target.value)}></input>
                                                    </div>

                                                </div>
                                                <div className="form-row">
                                                    <div className='form-item'>
                                                        <label>Pin*</label>
                                                        <input value={assetPin} onChange={(e) => setAssetPin(e.target.value)}></input>
                                                    </div>
                                                    <div className='form-item'>
                                                        <label>Country*</label>
                                                        <input value={assetCountry} onChange={(e) => setAssetCountry(e.target.value)}></input>
                                                    </div>
                                                </div>
                                            </div>
                                            : ''
                                        }
                                        <h3>Allocate to: </h3>
                                        {beneficiaries.length !== 0 ?
                                            <table className="styled-table">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Name</th>
                                                        <th>% Share</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {beneficiaries.map((ben, index) =>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{ben[1]}</td>
                                        
                                                            <td><input value={share[index]? share[index]['value'] : 0} onChange={(e) => handleShareChange(e, ben[1], ben[2], index)} type="number" min="0" max="100"></input>%</td>
                                                        </tr>)}
                                                </tbody>
                                            </table> : ''}
                                        <div style={{ justifyContent: "right", marginTop: '20px' }} className='form-row'>
                                            <button type='submit' onClick={(e) => addImmovableAsset(e)} id="add-beneficiary"><AddIcon /> ADD ASSET</button>
                                        </div>
                                    </form>
                                    {immovableAssets.length !== 0 ? <h3>Immovable Assets Allocation</h3> : ''}
                                    {immovableAssets.length !== 0 ?
                                        <table className="styled-table">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Type</th>
                                                    <th>Details</th>
                                                    <th>Successors</th>
                                                    <th>Modify/Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {immovableAssets.map((iA, index) =>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{iA['assetType']}</td>
                                                        <td>{iA['description']}</td>
                                                        <td><ul>{iA["share"].map((share) => <li> {share['value'] !== '0' ? <span>{share["name"]} {share["value"]}% </span> : ''} </li>
                                                        )}</ul></td>
                                                        <td className="remove-btn"><CancelIcon onClick={() => removeImmovable(index)}></CancelIcon></td>
                                                    </tr>)}
                                            </tbody>
                                        </table> : ''}
                                </div>
                                <h3 onClick={() => setMovVisible(movVisible === "none" ? 'flex' : 'none')} style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} className="asset-tab">My Movable Property<ArrowDropDownIcon /></h3>

                                <div style={{ display: movVisible, transition: '0.3s' }}>
                                    <form style={{ width: '100%' }}>
                                        <div className='form-row'>
                                            <div className='form-item'>
                                                <label>Asset Type: </label>
                                                <select value={assetType} onChange={(e) => setAssetType(e.target.value)}>
                                                    <option value="Bank Account">Bank Account</option>
                                                    <option value="Fixed Deposit">Fixed Deposit</option>
                                                    <option value="Safe Deposit Locker">Safe Deposit Locker</option>
                                                    <option value="Shares and Demat Account">Shares and Demat Account</option>
                                                    <option value="Mutual Funds">Mutual Funds</option>
                                                    <option value="Postal Recurring">Postal Recurring</option>
                                                    <option value="National Savings Certificate(NSC)">National Savings Certificate(NSC)</option>
                                                    <option value="Public Provident Fund (PPF)/ Gratuity">Public Provident Fund (PPF)/ Gratuity</option>
                                                    <option value="Insurance Policies">Insurance Policies</option>
                                                    <option value="Bond Debentures">Bond Debentures</option>
                                                    <option value="Income & Pension Accounts">Income & Pension Accounts</option>
                                                    <option value="Business Asset">Business Assets</option>
                                                    <option value="Digital Asset">Digital Assets</option>
                                                    <option value="Electronics and Appliances">Electronics and Appliances</option>
                                                    <option value="Vehicles">Vehicles</option>
                                                    <option value="Jewellery">Jewellery</option>
                                                    <option value="Any other Investments">Any other Investments</option>
                                                </select>
                                            </div>
                                        </div>
                                        {(assetType === "Mutual Funds") ?
                                            < div className="form-row">
                                                <div className="form-item">
                                                    <label>Description of {assetType}</label>
                                                    <p>(*Note- Specify the
                                                        mutual funds held by you on present date and any change
                                                        subsequently is taken care of by the residuary clause in
                                                        the Will.)</p>
                                                    <textarea style={{ width: '600px', height: '250px' }} value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                                                </div>
                                            </div>
                                            : ''
                                        }
                                        {(assetType === "Jewellery") ?
                                            < div className="form-row">
                                                <div className="form-item">
                                                    <label>Description of {assetType}</label>

                                                    <textarea style={{ width: '600px', height: '250px' }}  value={description} onChange={(e) => setDescription(e.target.value)} placeholder='e.g.
Gold bangles, necklaces, silver ornaments,silver utensils, etc '></textarea>

                                                </div>
                                            </div>
                                            : ''
                                        }
                                        {(assetType === "Business Asset") ?
                                            < div className="form-row">
                                                <div className="form-item">
                                                    <label>Description of {assetType}</label>

                                                    <textarea style={{ width: '600px', height: '250px' }} placeholder='e.g.Share in the Partnership Firm XYZ, Proprietorship, or any business venture, etc.' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                                                </div>
                                            </div>
                                            : ''
                                        }
                                        {(assetType === "Digital Asset") ?
                                            < div className="form-row">
                                                <div className="form-item">
                                                    <label>Description of {assetType}</label>

                                                    <textarea style={{ width: '600px', height: '250px' }} placeholder='e.g. E-mail accounts, Website urls, Bitcoins, etc' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                                </div>
                                            </div>
                                            : ''
                                        }
                                        {(assetType === "Electronics and Appliances") ?
                                            < div className="form-row">
                                                <div className="form-item">
                                                    <label>Description of {assetType}</label>

                                                    <textarea style={{ width: '600px', height: '250px' }} placeholder='(e.g.
Laptops, Mobiles, Tablets, ipad, etc)' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                                </div>
                                            </div>
                                            : ''

                                        }
                                        {(assetType === "Any other Investments") ?
                                            < div className="form-row">
                                                <div className="form-item">
                                                    <label>Description of {assetType}</label>

                                                    <textarea style={{ width: '600px', height: '250px' }} placeholder='any
kind of investment apart from the list mentioned above' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                                </div>
                                            </div>
                                            : ''


                                        }

                                        {(assetType === 'Income & Pension Accounts' || assetType === 'Public Provident Fund (PPF)/ Gratuity' || assetType === 'Bank Account' || assetType === "Fixed Deposit" || assetType === "Safe Deposit Locker" || assetType === 'Shares and Demat Account') ?
                                            < div className="form-row">
                                                <div className="form-item">
                                                    <label>Bank{assetType === 'Shares and Demat Account' ? '/Company' : ''} Name</label>
                                                    <input value={bankName ? bankName : ''} onChange={(e) => setBankName(e.target.value)}></input>
                                                </div>
                                                <div className="form-item">
                                                    <label>{assetType === 'Shares and Demat Account' ? 'DMAT ' : ''}{assetType === 'Bank Account' || assetType === 'Safe Deposit Locker' || assetType === 'Shares and Demat Account' || assetType === 'Public Provident Fund (PPF)/ Gratuity' || assetType === 'Income & Pension Accounts' ? "Account" : ''}{assetType === 'Fixed Deposit' ? "FD" : ''} Number</label>
                                                    <input value={bankNumber ? bankNumber : ''} onChange={(e) => setBankNumber(e.target.value)}></input>
                                                </div>
                                                <div className="form-item">
                                                    <label>Branch{assetType === 'Shares and Demat Account' ? '/Address ' : ''}</label>
                                                    <input value={bankBranch ? bankBranch : ''} onChange={(e) => setBankBranch(e.target.value)}></input>
                                                </div>
                                                {assetType === 'Safe Deposit Locker' || assetType === 'Public Provident Fund (PPF)/ Gratuity' ?
                                                    <div className="form-item">
                                                        <label>{assetType === 'Public Provident Fund (PPF)/ Gratuity' ? 'PPF Number' : 'Locker Number'}</label>
                                                        <input value={bankLocker ? bankLocker : ''} onChange={(e) => setBankLocker(e.target.value)}></input>
                                                    </div>
                                                    : ''}
                                            </div>
                                            : ''}
                                        {assetType === "Postal Recurring" || assetType === 'National Savings Certificate(NSC)' ?
                                            <div className="form-row">
                                                <div className='form-item'>
                                                    <label>Name of the Bank/Post Office/Company</label>
                                                    <input value={bankName ? bankName : ''} onChange={(e) => setBankName(e.target.value)}></input>
                                                </div>
                                                <div className="form-item">
                                                    <label>{assetType === 'National Savings Certificate(NSC)' ? 'NSC ' : "Account "}Number</label>
                                                    <input value={bankNumber ? bankNumber : ''} onChange={(e) => setBankNumber(e.target.value)}></input>
                                                </div>
                                            </div>
                                            : ''}
                                        {assetType === 'Insurance Policies' || assetType === 'Bond Debentures' ?
                                            < div className="form-row">
                                                <div className="form-item">
                                                    <label>Name of {assetType === 'Insurance Policies' ? 'Insurance' : 'the Bond'}</label>
                                                    <input value={assetName ? assetName : ''} onChange={(e) => setAssetName(e.target.value)}></input>
                                                </div>
                                                <div className="form-item">
                                                    <label>{assetType === 'Insurance Policies' ? 'Policy ' : 'Bond '}Number</label>
                                                    <input value={policyNumber ? policyNumber : ''} onChange={(e) => setPolicyNumber(e.target.value)}></input>
                                                </div>
                                                {assetType === 'Insurance Policies' ?
                                                    <div className="form-item">
                                                        <label>Policy Name</label>
                                                        <input value={policyName ? policyName : ''} onChange={(e) => setPolicyName(e.target.value)}></input>
                                                    </div>
                                                    : ''}
                                            </div> : ''}
                                        {assetType === 'Vehicles' ?
                                            < div className="form-row">
                                                <div className="form-item">
                                                    <label>Vehicle Brand</label>
                                                    <input value={brand ? brand : ''} onChange={(e) => setBrand(e.target.value)}></input>
                                                </div>
                                                <div className="form-item">
                                                    <label>Model</label>
                                                    <input value={model ? model : ''} onChange={(e) => setModel(e.target.value)}></input>
                                                </div>
                                                <div className="form-item">
                                                    <label>Registration Number</label>
                                                    <input value={vehicleNumber ? vehicleNumber : ''} onChange={(e) => setVehicleNumber(e.target.value)}></input>
                                                </div>
                                            </div> : ''}
                                        <h3>Allocate to: </h3>
                                        {beneficiaries.length !== 0 ?
                                            <table className="styled-table">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Name</th>
                                                        <th>% Share</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {beneficiaries.map((ben, index) =>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{ben[1]}</td>
                                                            <td><input value={share[index] ? share[index]['value'] : 0} onChange={(e) => handleShareChange(e, ben[1], ben[2], index)} type="number" min="0" max="100"></input>%</td>
                                                        </tr>)}
                                                </tbody>
                                            </table> : ''}
                                        <div style={{ justifyContent: "right", marginTop: '20px' }} className='form-row'>
                                            <button type='submit' onClick={(e) => addAsset(e)} id="add-beneficiary"><AddIcon /> ADD ASSET</button>
                                        </div>
                                        {movableAssets.length !== 0 ? <h3>Movable Assets Allocation</h3> : ''}
                                        {movableAssets.length !== 0 ?
                                            <table className="styled-table">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Type</th>
                                                        <th>Details</th>
                                                        <th>Successors</th>
                                                        <th>Modify/Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {movableAssets.map((iA, index) =>
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{iA['assetType']}</td>
                                                            <td>{iA['description']}</td>
                                                            <td><ul>{iA["share"].map((share) => <li> {share['value'] !== '0' ? <span>{share["name"]} {share["value"]}% </span> : ''}</li>
                                                            )}</ul></td>
                                                            <td className="remove-btn"><CancelIcon onClick={() => removeMovable(index)}></CancelIcon></td>
                                                        </tr>)}
                                                </tbody>
                                            </table> : ''}

                                    </form>
                                </div>
                                <div style={{ justifyContent: "right", marginTop: '20px' }} className='form-row'>
                                    <a onClick={() => { setTabIndex(1) }} id="next-btn">Previous</a>
                                    <a onClick={() => { initializeAlternate() }} id="next-btn">Next: Alternate Beneficiary</a>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                
                                <h2>Details of Alternate Beneficiary</h2>
                                <p className="note-para">(Note- If any of the previously-stated Beneficiary predecease the author of  the Will by any reason, in such case who shall receive the assets or benefits under Will.)</p>
                                    
                                {alternate ?
                                    <table className="styled-table">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Asset Type</th>
                                                <th>Details</th>
                                                <th>Alternate Beneficiaries</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {alternate?.map((asset, index) =>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{asset['assesType']}</td>
                                                    <td>{asset['details']}</td>
                                                    <td><textarea style={{ width: '250px', height: '100px' }} width='300px' height="100px" placeholder="eg: Sunny Varma  Friend  100% or  Ashish Sachdeva Cousin 50% and Nikita Sachdeva Cousin 50%" value={asset['altDetails']} onChange={(e) => { setAltBen(e, index) }}></textarea></td>
                                                </tr>)}
                                        </tbody>
                                    </table> : ''}

                                <div style={{ justifyContent: "right", marginTop: '20px' }} className='form-row'>
                                    <a onClick={() => { setTabIndex1(0) }} id="next-btn">Previous</a>
                                    <a onClick={() => { storeAlternate() }} id="next-btn">Next: Residuary Clause</a>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <h2>Residuary Clause</h2>
                                <h3>Whom would you like to bequeth your residual properties?</h3>
                                <p className="note-para">(The properties which you have not included in the Will or which you might acquire in future)</p>
                                
                                {beneficiaries.length !== 0 ?
                                    <table className="styled-table">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Name</th>
                                                <th>% Share</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {beneficiaries.map((ben, index) =>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{ben[1]}</td>
                                                    <td><input value={share[index] ? share[index]['value'] : 0} onChange={(e) => handleShareChange(e, ben[1], ben[2], index)} type="number" min="0" max="100"></input>%</td>
                                                </tr>)}
                                        </tbody>
                                    </table> : ''}
                                <div style={{ justifyContent: "right", marginTop: '20px' }} className='form-row'>
                                    <a onClick={() => { setTabIndex1(1) }} id="next-btn">Previous</a>
                                    <a onClick={() => { setResiduary1() }} id="next-btn">Next: Residuary Clause</a>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </TabPanel>
                    <TabPanel>

                        
                        
    <div class="bts-container" style={{width:'350px', height:'350px', backgroundColor:'#ffffff',overflow:'hidden'}}>
      <img src={Logo} alt="" width="75%" style={{alignSelf:'center'}} />
      	<p style={{color:'#f27317', marginTop:'20px',textAlign:'center', fontSize:'20px', transitionDelay:'2s'}}>Email has been sent to the User!</p>
        
        
    
    
</div><div style={{ justifyContent: "right", marginTop: '20px' }} className='form-row'>
                            <a onClick={() => { setTabIndex(2) }} id="next-btn">Previous</a>
                            <button id='add-beneficiary' onClick={handleExportWithComponent } primary={true}>Download Will</button>
                    
                        </div>

                    </TabPanel>
                </Tabs>
            </div >
            <Footer />
        </div >
    )
}

export default Content
