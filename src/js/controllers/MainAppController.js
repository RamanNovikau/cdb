import { CovidDate, createCovidDate } from '../models/CovidData';
import { CovidDashboardView } from '../views/CovidDashboardView';

export class MainAppController {
    constructor() {
        this.model = new CovidDate();
        this.props = ['TotalConfirmed', 'TotalDeaths', 'TotalRecovered', 'NewConfirmed', 'NewDeaths', 'NewRecovered'];
        this.propId = 0;
        this.dashboardView = new CovidDashboardView();
        this.setUplocalListeners();
    }

    displayTable(value) {
        this.dashboardView.displayTable(value);
    }

    setUplocalListeners() {
        this.model.on('hasdata', () => {
            this.dashboardView.model = this.model;
            this.model.сountriesInfoSort(this.props[this.propId]);
            this.displayTable(this.props[this.propId]);
        });
        this.dashboardView.on('nextprop', () => {
            if (this.propId < this.props.length - 1) {
                this.propId += 1;
            } else {
                this.propId = 0;
            }
            this.model.сountriesInfoSort(this.props[this.propId]);
            this.dashboardView.displayTable(this.props[this.propId]);
        });
    }
}

