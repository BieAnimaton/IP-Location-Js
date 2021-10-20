const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
localIpBtn = inputPart.querySelector("button"),
wIcon = wrapper.querySelector(".ip-part img"),
map = wrapper.querySelector(".map span a"),
arrowBack = wrapper.querySelector("header i");

const apiKey = '62daf4fb22f747cfaee1436e8bd61cbc';
let api;

inputField.addEventListener("keyup", e => {
    // se pressionar o botão Enter e o valor não for nulo
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

localIpBtn.addEventListener("click", () => {
    api = `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}&ip_address=`;
    fetchData();
});

function requestApi(ip) {
    api = `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}&ip_address=${ip}`;
    fetchData();
}

function fetchData() {
    infoTxt.innerText = "Obtendo detalhes do IP...";
    infoTxt.classList.add("pending");
    // coleta os dados da API e manda à função weatherDetails
    fetch(api).then(
        response => response.json().then(
            result => ipDetails(result)
        )
    );
}

function ipDetails(info) {
    infoTxt.classList.replace("pending", "error");
    if(info.cod == "404") {
        infoTxt.innerText = `${inputField.value} ocorreu um erro.`;
    } else {
        // coletando as informações do Json
        const {flag} = info;
        const {city, continent, continent_code, country, country_code, region, region_iso_code, ip_address, latitude, longitude, security, currency, timezone} = info;

        // passando as informações para um elemento HTML
        wIcon.src = flag.png;
        wrapper.querySelector(".city").innerText = `${city}, ${region_iso_code}`;
        wrapper.querySelector(".continent").innerText = `${continent}, ${continent_code}`;
        wrapper.querySelector(".country").innerText = `${country}, ${country_code}`;
        wrapper.querySelector(".region").innerText = `${region}, ${region_iso_code}`;
        map.href = `https://www.google.com/maps/search/${latitude},${longitude}/@2,12.9978113,17z?hl=pt-br`;
        wrapper.querySelector(".map span a").innerText = "Map Locaton";
        wrapper.querySelector(".ip-address span").innerText = ip_address;
        wrapper.querySelector(".lat-long span").innerText = `${latitude}, ${longitude}`;
        wrapper.querySelector(".security span").innerText = security.is_vpn;
        wrapper.querySelector(".currency span").innerText = `${currency.currency_code}, ${currency.currency_name}`;
        wrapper.querySelector(".timezone span").innerText = timezone.current_time;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
    }
}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});