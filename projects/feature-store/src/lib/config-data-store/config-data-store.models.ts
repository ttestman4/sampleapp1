export interface Airport {
    code: string;
    name: string;
}

export interface AirportData {
    data: Airport[];
}

export interface ConfigData {
    airports: Airport[];
}
