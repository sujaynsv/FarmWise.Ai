import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../i18n";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";

const CropYieldPrediction = () => {
  const { t, i18n } = useTranslation();
  const [load, setLoad] = useState(false);
  const [stateName, setStateName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [cropYear, setCropYear] = useState("");
  const [season, setSeason] = useState("");
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");
  const [prediction, setPrediction] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const lang = i18n.language;
  const statesAndDistricts = {
    "Andaman and Nicobar Islands": [
      "NICOBARS",
      "NORTH AND MIDDLE ANDAMAN",
      "SOUTH ANDAMANS"
    ],
    "Andhra Pradesh": [
      "ANANTAPUR",
      "CHITTOOR",
      "EAST GODAVARI",
      "GUNTUR",
      "KADAPA",
      "KRISHNA",
      "KURNOOL",
      "PRAKASAM",
      "SPSR NELLORE",
      "SRIKAKULAM",
      "VISAKHAPATANAM",
      "VIZIANAGARAM",
      "WEST GODAVARI"
    ],
    "Arunachal Pradesh": [
      "ANJAW",
      "CHANGLANG",
      "DIBANG VALLEY",
      "EAST KAMENG",
      "EAST SIANG",
      "KURUNG KUMEY",
      "LOHIT",
      "LONGDING",
      "LOWER DIBANG VALLEY",
      "LOWER SUBANSIRI",
      "NAMSAI",
      "PAPUM PARE",
      "TAWANG",
      "TIRAP",
      "UPPER SIANG",
      "UPPER SUBANSIRI",
      "WEST KAMENG",
      "WEST SIANG"
    ],
    Assam: [
      "BAKSA",
      "BARPETA",
      "BONGAIGAON",
      "CACHAR",
      "CHIRANG",
      "DARRANG",
      "DHEMAJI",
      "DHUBRI",
      "DIBRUGARH",
      "DIMA HASAO",
      "GOALPARA",
      "GOLAGHAT",
      "HAILAKANDI",
      "JORHAT",
      "KAMRUP",
      "KAMRUP METRO",
      "KARBI ANGLONG",
      "KARIMGANJ",
      "KOKRAJHAR",
      "LAKHIMPUR",
      "MARIGAON",
      "NAGAON",
      "NALBARI",
      "SIVASAGAR",
      "SONITPUR",
      "TINSUKIA",
      "UDALGURI"
    ],
    Bihar: [
      "ARARIA",
      "ARWAL",
      "AURANGABAD",
      "BANKA",
      "BEGUSARAI",
      "BHAGALPUR",
      "BHOJPUR",
      "BUXAR",
      "DARBHANGA",
      "GAYA",
      "GOPALGANJ",
      "JAMUI",
      "JEHANABAD",
      "KAIMUR (BHABUA)",
      "KATIHAR",
      "KHAGARIA",
      "KISHANGANJ",
      "LAKHISARAI",
      "MADHEPURA",
      "MADHUBANI",
      "MUNGER",
      "MUZAFFARPUR",
      "NALANDA",
      "NAWADA",
      "PASHCHIM CHAMPARAN",
      "PATNA",
      "PURBI CHAMPARAN",
      "PURNIA",
      "ROHTAS",
      "SAHARSA",
      "SAMASTIPUR",
      "SARAN",
      "SHEIKHPURA",
      "SHEOHAR",
      "SITAMARHI",
      "SIWAN",
      "SUPAUL",
      "VAISHALI"
    ],
    Chandigarh: ["CHANDIGARH"],
    Chhattisgarh: [
      "BALOD",
      "BALODA BAZAR",
      "BALRAMPUR",
      "BASTAR",
      "BEMETARA",
      "BIJAPUR",
      "BILASPUR",
      "DANTEWADA",
      "DHAMTARI",
      "DURG",
      "GARIYABAND",
      "JANJGIR-CHAMPA",
      "JASHPUR",
      "KABIRDHAM",
      "KANKER",
      "KONDAGAON",
      "KORBA",
      "KOREA",
      "MAHASAMUND",
      "MUNGELI",
      "NARAYANPUR",
      "RAIGARH",
      "RAIPUR",
      "RAJNANDGAON",
      "SUKMA",
      "SURAJPUR",
      "SURGUJA"
    ],
    "Dadra and Nagar Haveli": ["DADRA AND NAGAR HAVELI"],
    Goa: ["NORTH GOA", "SOUTH GOA"],
    Gujarat: [
      "AHMADABAD",
      "AMRELI",
      "ANAND",
      "BANAS KANTHA",
      "BHARUCH",
      "BHAVNAGAR",
      "DANG",
      "DOHAD",
      "GANDHINAGAR",
      "JAMNAGAR",
      "JUNAGADH",
      "KACHCHH",
      "KHEDA",
      "MAHESANA",
      "NARMADA",
      "NAVSARI",
      "PANCH MAHALS",
      "PATAN",
      "PORBANDAR",
      "RAJKOT",
      "SABAR KANTHA",
      "SURAT",
      "SURENDRANAGAR",
      "TAPI",
      "VADODARA",
      "VALSAD"
    ],
    Haryana: [
      "AMBALA",
      "BHIWANI",
      "FARIDABAD",
      "FATEHABAD",
      "GURGAON",
      "HISAR",
      "JHAJJAR",
      "JIND",
      "KAITHAL",
      "KARNAL",
      "KURUKSHETRA",
      "MAHENDRAGARH",
      "MEWAT",
      "PALWAL",
      "PANCHKULA",
      "PANIPAT",
      "REWARI",
      "ROHTAK",
      "SIRSA",
      "SONIPAT",
      "YAMUNANAGAR"
    ],
    "Himachal Pradesh": [
      "BILASPUR",
      "CHAMBA",
      "HAMIRPUR",
      "KANGRA",
      "KINNAUR",
      "KULLU",
      "LAHUL AND SPITI",
      "MANDI",
      "SHIMLA",
      "SIRMAUR",
      "SOLAN",
      "UNA"
    ],
    "Jammu and Kashmir ": [
      "ANANTNAG",
      "BADGAM",
      "BANDIPORA",
      "BARAMULLA",
      "DODA",
      "GANDERBAL",
      "JAMMU",
      "KARGIL",
      "KATHUA",
      "KISHTWAR",
      "KULGAM",
      "KUPWARA",
      "LEH LADAKH",
      "POONCH",
      "PULWAMA",
      "RAJAURI",
      "RAMBAN",
      "REASI",
      "SAMBA",
      "SHOPIAN",
      "SRINAGAR",
      "UDHAMPUR"
    ],
    Jharkhand: [
      "BOKARO",
      "CHATRA",
      "DEOGHAR",
      "DHANBAD",
      "DUMKA",
      "EAST SINGHBUM",
      "GARHWA",
      "GIRIDIH",
      "GODDA",
      "GUMLA",
      "HAZARIBAGH",
      "JAMTARA",
      "KHUNTI",
      "KODERMA",
      "LATEHAR",
      "LOHARDAGA",
      "PAKUR",
      "PALAMU",
      "RAMGARH",
      "RANCHI",
      "SAHEBGANJ",
      "SARAIKELA KHARSAWAN",
      "SIMDEGA",
      "WEST SINGHBHUM"
    ],
    Karnataka: [
      "BAGALKOT",
      "BANGALORE RURAL",
      "BELGAUM",
      "BELLARY",
      "BENGALURU URBAN",
      "BIDAR",
      "BIJAPUR",
      "CHAMARAJANAGAR",
      "CHIKBALLAPUR",
      "CHIKMAGALUR",
      "CHITRADURGA",
      "DAKSHIN KANNAD",
      "DAVANGERE",
      "DHARWAD",
      "GADAG",
      "GULBARGA",
      "HASSAN",
      "HAVERI",
      "KODAGU",
      "KOLAR",
      "KOPPAL",
      "MANDYA",
      "MYSORE",
      "RAICHUR",
      "RAMANAGARA",
      "SHIMOGA",
      "TUMKUR",
      "UDUPI",
      "UTTAR KANNAD",
      "YADGIR"
    ],
    Kerala: [
      "ALAPPUZHA",
      "ERNAKULAM",
      "IDUKKI",
      "KANNUR",
      "KASARAGOD",
      "KOLLAM",
      "KOTTAYAM",
      "KOZHIKODE",
      "MALAPPURAM",
      "PALAKKAD",
      "PATHANAMTHITTA",
      "THIRUVANANTHAPURAM",
      "THRISSUR",
      "WAYANAD"
    ],
    "Madhya Pradesh": [
      "AGAR MALWA",
      "ALIRAJPUR",
      "ANUPPUR",
      "ASHOKNAGAR",
      "BALAGHAT",
      "BARWANI",
      "BETUL",
      "BHIND",
      "BHOPAL",
      "BURHANPUR",
      "CHHATARPUR",
      "CHHINDWARA",
      "DAMOH",
      "DATIA",
      "DEWAS",
      "DHAR",
      "DINDORI",
      "GUNA",
      "GWALIOR",
      "HARDA",
      "HOSHANGABAD",
      "INDORE",
      "JABALPUR",
      "JHABUA",
      "KATNI",
      "KHANDWA",
      "KHARGONE",
      "MANDLA",
      "MANDSAUR",
      "MORENA",
      "NARSINGHPUR",
      "NEEMUCH",
      "PANNA",
      "RAISEN",
      "RAJGARH",
      "RATLAM",
      "REWA",
      "SAGAR",
      "SATNA",
      "SEHORE",
      "SEONI",
      "SHAHDOL",
      "SHAJAPUR",
      "SHEOPUR",
      "SHIVPURI",
      "SIDHI",
      "SINGRAULI",
      "TIKAMGARH",
      "UJJAIN",
      "UMARIA",
      "VIDISHA"
    ],
    Maharashtra: [
      "AHMEDNAGAR",
      "AKOLA",
      "AMRAVATI",
      "AURANGABAD",
      "BEED",
      "BHANDARA",
      "BULDHANA",
      "CHANDRAPUR",
      "DHULE",
      "GADCHIROLI",
      "GONDIA",
      "HINGOLI",
      "JALGAON",
      "JALNA",
      "KOLHAPUR",
      "LATUR",
      "MUMBAI",
      "NAGPUR",
      "NANDED",
      "NANDURBAR",
      "NASHIK",
      "OSMANABAD",
      "PALGHAR",
      "PARBHANI",
      "PUNE",
      "RAIGAD",
      "RATNAGIRI",
      "SANGLI",
      "SATARA",
      "SINDHUDURG",
      "SOLAPUR",
      "THANE",
      "WARDHA",
      "WASHIM",
      "YAVATMAL"
    ],
    Manipur: [
      "BISHNUPUR",
      "CHANDEL",
      "CHURACHANDPUR",
      "IMPHAL EAST",
      "IMPHAL WEST",
      "SENAPATI",
      "TAMENGLONG",
      "THOUBAL",
      "UKHRUL"
    ],
    Meghalaya: [
      "EAST GARO HILLS",
      "EAST JAINTIA HILLS",
      "EAST KHASI HILLS",
      "NORTH GARO HILLS",
      "RI BHOI",
      "SOUTH GARO HILLS",
      "SOUTH WEST GARO HILLS",
      "SOUTH WEST KHASI HILLS",
      "WEST GARO HILLS",
      "WEST JAINTIA HILLS",
      "WEST KHASI HILLS"
    ],
    Mizoram: [
      "AIZAWL",
      "CHAMPHAI",
      "KOLASIB",
      "LAWNGTLAI",
      "LUNGLEI",
      "MAMIT",
      "SAIHA",
      "SERCHHIP"
    ],
    Nagaland: [
      "DIMAPUR",
      "KIPHIRE",
      "KOHIMA",
      "LONGLENG",
      "MOKOKCHUNG",
      "MON",
      "PEREN",
      "PHEK",
      "TUENSANG",
      "WOKHA",
      "ZUNHEBOTO"
    ],
    Odisha: [
      "ANUGUL",
      "BALANGIR",
      "BALESHWAR",
      "BARGARH",
      "BHADRAK",
      "BOUDH",
      "CUTTACK",
      "DEOGARH",
      "DHENKANAL",
      "GAJAPATI",
      "GANJAM",
      "JAGATSINGHAPUR",
      "JAJAPUR",
      "JHARSUGUDA",
      "KALAHANDI",
      "KANDHAMAL",
      "KENDRAPARA",
      "KENDUJHAR",
      "KHORDHA",
      "KORAPUT",
      "MALKANGIRI",
      "MAYURBHANJ",
      "NABARANGPUR",
      "NAYAGARH",
      "NUAPADA",
      "PURI",
      "RAYAGADA",
      "SAMBALPUR",
      "SONEPUR",
      "SUNDARGARH"
    ],
    Puducherry: ["KARAIKAL", "MAHE", "PONDICHERRY", "YANAM"],
    Punjab: [
      "AMRITSAR",
      "BARNALA",
      "BATHINDA",
      "FARIDKOT",
      "FATEHGARH SAHIB",
      "FAZILKA",
      "FIROZEPUR",
      "GURDASPUR",
      "HOSHIARPUR",
      "JALANDHAR",
      "KAPURTHALA",
      "LUDHIANA",
      "MANSA",
      "MOGA",
      "MUKTSAR",
      "NAWANSHAHR",
      "PATHANKOT",
      "PATIALA",
      "RUPNAGAR",
      "S.A.S NAGAR",
      "SANGRUR",
      "TARN TARAN"
    ],
    Rajasthan: [
      "AJMER",
      "ALWAR",
      "BANSWARA",
      "BARAN",
      "BARMER",
      "BHARATPUR",
      "BHILWARA",
      "BIKANER",
      "BUNDI",
      "CHITTORGARH",
      "CHURU",
      "DAUSA",
      "DHOLPUR",
      "DUNGARPUR",
      "GANGANAGAR",
      "HANUMANGARH",
      "JAIPUR",
      "JAISALMER",
      "JALORE",
      "JHALAWAR",
      "JHUNJHUNU",
      "JODHPUR",
      "KARAULI",
      "KOTA",
      "NAGAUR",
      "PALI",
      "PRATAPGARH",
      "RAJSAMAND",
      "SAWAI MADHOPUR",
      "SIKAR",
      "SIROHI",
      "TONK",
      "UDAIPUR"
    ],
    Sikkim: [
      "EAST DISTRICT",
      "NORTH DISTRICT",
      "SOUTH DISTRICT",
      "WEST DISTRICT"
    ],
    "Tamil Nadu": [
      "ARIYALUR",
      "COIMBATORE",
      "CUDDALORE",
      "DHARMAPURI",
      "DINDIGUL",
      "ERODE",
      "KANCHIPURAM",
      "KANNIYAKUMARI",
      "KARUR",
      "KRISHNAGIRI",
      "MADURAI",
      "NAGAPATTINAM",
      "NAMAKKAL",
      "PERAMBALUR",
      "PUDUKKOTTAI",
      "RAMANATHAPURAM",
      "SALEM",
      "SIVAGANGA",
      "THANJAVUR",
      "THE NILGIRIS",
      "THENI",
      "THIRUVALLUR",
      "THIRUVARUR",
      "TIRUCHIRAPPALLI",
      "TIRUNELVELI",
      "TIRUPPUR",
      "TIRUVANNAMALAI",
      "TUTICORIN",
      "VELLORE",
      "VILLUPURAM",
      "VIRUDHUNAGAR"
    ],
    "Telangana ": [
      "ADILABAD",
      "HYDERABAD",
      "KARIMNAGAR",
      "KHAMMAM",
      "MAHBUBNAGAR",
      "MEDAK",
      "NALGONDA",
      "NIZAMABAD",
      "RANGAREDDI",
      "WARANGAL"
    ],
    Tripura: [
      "DHALAI",
      "GOMATI",
      "KHOWAI",
      "NORTH TRIPURA",
      "SEPAHIJALA",
      "SOUTH TRIPURA",
      "UNAKOTI",
      "WEST TRIPURA"
    ],
    "Uttar Pradesh": [
      "AGRA",
      "ALIGARH",
      "ALLAHABAD",
      "AMBEDKAR NAGAR",
      "AMETHI",
      "AMROHA",
      "AURAIYA",
      "AZAMGARH",
      "BAGHPAT",
      "BAHRAICH",
      "BALLIA",
      "BALRAMPUR",
      "BANDA",
      "BARABANKI",
      "BAREILLY",
      "BASTI",
      "BIJNOR",
      "BUDAUN",
      "BULANDSHAHR",
      "CHANDAULI",
      "CHITRAKOOT",
      "DEORIA",
      "ETAH",
      "ETAWAH",
      "FAIZABAD",
      "FARRUKHABAD",
      "FATEHPUR",
      "FIROZABAD",
      "GAUTAM BUDDHA NAGAR",
      "GHAZIABAD",
      "GHAZIPUR",
      "GONDA",
      "GORAKHPUR",
      "HAMIRPUR",
      "HAPUR",
      "HARDOI",
      "HATHRAS",
      "JALAUN",
      "JAUNPUR",
      "JHANSI",
      "KANNAUJ",
      "KANPUR DEHAT",
      "KANPUR NAGAR",
      "KASGANJ",
      "KAUSHAMBI",
      "KHERI",
      "KUSHI NAGAR",
      "LALITPUR",
      "LUCKNOW",
      "MAHARAJGANJ",
      "MAHOBA",
      "MAINPURI",
      "MATHURA",
      "MAU",
      "MEERUT",
      "MIRZAPUR",
      "MORADABAD",
      "MUZAFFARNAGAR",
      "PILIBHIT",
      "PRATAPGARH",
      "RAE BARELI",
      "RAMPUR",
      "SAHARANPUR",
      "SAMBHAL",
      "SANT KABEER NAGAR",
      "SANT RAVIDAS NAGAR",
      "SHAHJAHANPUR",
      "SHAMLI",
      "SHRAVASTI",
      "SIDDHARTH NAGAR",
      "SITAPUR",
      "SONBHADRA",
      "SULTANPUR",
      "UNNAO",
      "VARANASI"
    ],
    Uttarakhand: [
      "ALMORA",
      "BAGESHWAR",
      "CHAMOLI",
      "CHAMPAWAT",
      "DEHRADUN",
      "HARIDWAR",
      "NAINITAL",
      "PAURI GARHWAL",
      "PITHORAGARH",
      "RUDRA PRAYAG",
      "TEHRI GARHWAL",
      "UDAM SINGH NAGAR",
      "UTTAR KASHI"
    ],
    "West Bengal": [
      "24 PARAGANAS NORTH",
      "24 PARAGANAS SOUTH",
      "BANKURA",
      "BARDHAMAN",
      "BIRBHUM",
      "COOCHBEHAR",
      "DARJEELING",
      "DINAJPUR DAKSHIN",
      "DINAJPUR UTTAR",
      "HOOGHLY",
      "HOWRAH",
      "JALPAIGURI",
      "MALDAH",
      "MEDINIPUR EAST",
      "MEDINIPUR WEST",
      "MURSHIDABAD",
      "NADIA",
      "PURULIA"
    ]
  };

  const states = Object.keys(statesAndDistricts);

  const seasons = [
    "Kharif",
    "Whole Year",
    "Autumn",
    "Rabi",
    "Summer",
    "Winter"
  ];

  const crops = [
    "Apple",
    "Arcanut (Processed)",
    "Arecanut",
    "Arhar/Tur",
    "Ash Gourd",
    "Atcanut (Raw)",
    "Bajra",
    "Banana",
    "Barley",
    "Bean",
    "Beans & Mutter(Vegetable)",
    "Beet Root",
    "Ber",
    "Bhindi",
    "Bitter Gourd",
    "Black pepper",
    "Blackgram",
    "Bottle Gourd",
    "Brinjal",
    "Cabbage",
    "Cardamom",
    "Carrot",
    "Cashewnut",
    "Cashewnut Processed",
    "Cashewnut Raw",
    "Castor seed",
    "Cauliflower",
    "Citrus Fruit",
    "Coconut ",
    "Coffee",
    "Colocosia",
    "Cond-spcs other",
    "Coriander",
    "Cotton(lint)",
    "Cowpea(Lobia)",
    "Cucumber",
    "Drum Stick",
    "Dry chillies",
    "Dry ginger",
    "Garlic",
    "Ginger",
    "Gram",
    "Grapes",
    "Groundnut",
    "Guar seed",
    "Horse-gram",
    "Jack Fruit",
    "Jobster",
    "Jowar",
    "Jute",
    "Jute & mesta",
    "Kapas",
    "Khesari",
    "Korra",
    "Lab-Lab",
    "Lemon",
    "Lentil",
    "Linseed",
    "Litchi",
    "Maize",
    "Mango",
    "Masoor",
    "Mesta",
    "Moong(Green Gram)",
    "Moth",
    "Niger seed",
    "Oilseeds total",
    "Onion",
    "Orange",
    "Other  Rabi pulses",
    "Other Cereals & Millets",
    "Other Citrus Fruit",
    "Other Dry Fruit",
    "Other Fresh Fruits",
    "Other Kharif pulses",
    "Other Vegetables",
    "Paddy",
    "Papaya",
    "Peach",
    "Pear",
    "Peas  (vegetable)",
    "Peas & beans (Pulses)",
    "Perilla",
    "Pineapple",
    "Plums",
    "Pome Fruit",
    "Pome Granet",
    "Potato",
    "Pulses total",
    "Pump Kin",
    "Ragi",
    "Rajmash Kholar",
    "Rapeseed &Mustard",
    "Redish",
    "Ribed Guard",
    "Rice",
    "Ricebean (nagadal)",
    "Rubber",
    "Safflower",
    "Samai",
    "Sannhamp",
    "Sapota",
    "Sesamum",
    "Small millets",
    "Snak Guard",
    "Soyabean",
    "Sugarcane",
    "Sunflower",
    "Sweet potato",
    "Tapioca",
    "Tea",
    "Tobacco",
    "Tomato",
    "Total foodgrain",
    "Turmeric",
    "Turnip",
    "Urad",
    "Varagu",
    "Water Melon",
    "Wheat",
    "Yam",
    "other fibres",
    "other misc. pulses",
    "other oilseeds"
  ];

  const years = Array.from({ length: 2030 - 2025 + 1 }, (_, i) => 2025 + i);
  function onSearchSubmit() {
    setLoad(true);
    let url = "http://127.0.0.1:5001/predict-crop-yield";
    let body = JSON.stringify({
      State_Name: stateName,
      District_Name: districtName,
      Crop_Year: parseInt(cropYear),
      Season: season,
      Crop: crop,
      Area: parseFloat(area),
      lang: lang
    });

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: body
    })
      .then((response) => response.json())
      .then((data) => {
        setPrediction(data.predicted_yield);
        callGeminiAPI(data.predicted_yield);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoad(false);
      });
  }

  async function callGeminiAPI(cropYield) {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDaOJLsirOjK9yP5QidcySWcReyLSza6zo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `Give tips on improving crop yield of: ${cropYield} kg/ha based on the environmental conditions which are ${stateName}, ${districtName}, ${cropYear}, ${season}, ${crop}, ${area}. Keep your suggestions precise and only give the tips to improve the yield.`
                  }
                ]
              }
            ],
            generationConfig: { maxOutputTokens: 100 }
          })
        }
      );
      const data = await response.json();
      const botResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || t("no_ai_response");
      translateText(botResponse, lang);
    } catch (error) {
      console.error("Error fetching explanation from Gemini API:", error);
    }
  }

  async function translateText(text, targetLanguage) {
    try {
      const response = await fetch(
        "https://translation.googleapis.com/language/translate/v2?key=AIzaSyAWqg11gQCYgaJrCXCBl9ph4OQiVcHksSs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: text, target: targetLanguage })
        }
      );
      const data = await response.json();
      setBotResponse(data?.data?.translations?.[0]?.translatedText || text);
    } catch (error) {
      console.error("Error translating text:", error);
      setBotResponse(text);
    }
  }

  useEffect(() => {
    if (botResponse) {
      translateText(botResponse, lang);
    }
  }, [lang]);

  return (
    <>
      <section className="bg-gradient-to-b from-green-100 to-white py-16">
        <div className="grid place-items-center my-14">
          <div className="container bg-white p-10 rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <p className="text-2xl font-medium text-green-600 mb-6">
              {t("title_crop_yield")}
            </p>
            <div className="space-y-4">
              <select
                onChange={(e) => {
                  setStateName(e.target.value);
                  setDistrictName(""); // Reset district when state changes
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <select
                onChange={(e) => setDistrictName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                disabled={!stateName}
              >
                <option value="">Select District</option>
                {stateName &&
                  statesAndDistricts[stateName].map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
              </select>

              <select
                onChange={(e) => setCropYear(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Season</option>
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </select>

              <select
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Crop</option>
                {crops.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
              <input
                type="number"
                onChange={(e) => setArea(e.target.value)}
                placeholder={t("area_placeholder")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={onSearchSubmit}
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg mt-4"
            >
              {t("predict_button_crop_yield")}
            </button>
            {load ? (
              <p className="mt-4 text-center">{t("loading")}</p>
            ) : (
              prediction && (
                <p className="mt-4 text-center text-lg font-semibold">
                  {t("prediction", { yield: Number(prediction).toFixed(2) })}
                </p>
              )
            )}
            {botResponse && (
              <div className="bot-response mt-6">
                <p className="text-center text-xl font-semibold text-green-600">
                  {t("ai_explanation")}
                </p>
                <p className="text-center">{botResponse}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CropYieldPrediction;
