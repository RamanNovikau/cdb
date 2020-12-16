import EventEmitter from './EventEmitter';
var _ = require('lodash');

// async function getSummaryInfo() {
//     const url = 'https://api.covid19api.com/summary';
//     const res = await fetch(url);
//     const data = await res.json();
//     return data;
// }

// async function getAdditionalCountriesInfo() {
//     const url = 'https://restcountries.eu/rest/v2/all?fields=name;population;flag;alpha2Code';
//     const res = await fetch(url);
//     const data = await res.json();
//     return data;
// }

// const allData = Promise.all([getSummaryInfo(), getAdditionalCountriesInfo()]).then((responses) => {
//     const [globalInfo, summaryInfo, additionalInfo] = [responses[0].Global, responses[0].Countries, responses[1]];
//     const data = {};
//     summaryInfo.forEach((summaryCountry) => {
//         const additionalInfoForCurrentCountry = additionalInfo.find((country) => country.alpha2Code === summaryCountry.CountryCode);
//         summaryCountry.population = additionalInfoForCurrentCountry.population;
//         summaryCountry.flag = additionalInfoForCurrentCountry.flag;
//     });
//     data.GlobalInfo = globalInfo;
//     data.CountriesInfo = summaryInfo;
//     return data;
// })

export class CovidDate extends EventEmitter {
    constructor() {
        super();
        this.data = [];
        this.init();
    }

    init() {
        const allData = Promise.all([this.fetchData('https://api.covid19api.com/summary'),
        this.fetchData('https://restcountries.eu/rest/v2/all?fields=name;population;flag;alpha2Code')]).then((responses) => {
            const [globalInfo, summaryInfo, additionalInfo] = [responses[0].Global, responses[0].Countries, responses[1]];
            const data = {};
            summaryInfo.forEach((summaryCountry) => {
                const additionalInfoForCurrentCountry = additionalInfo.find((country) => country.alpha2Code === summaryCountry.CountryCode);
                summaryCountry.population = additionalInfoForCurrentCountry.population;
                summaryCountry.flag = additionalInfoForCurrentCountry.flag;
            });
            data.GlobalInfo = globalInfo;
            data.CountriesInfo = summaryInfo;
            return data;
        })
        allData.then((data) => {
            this.data = data;
            this.emit('hasdata');
        });
    }

    async fetchData(apiUrl) {
        const url = apiUrl;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }

    log() {
        console.log(this.data);
    }

    сountriesInfoSort(value) {
        this.data.CountriesInfo = _.orderBy(this.data.CountriesInfo, [value], ['desc']);
    }
}