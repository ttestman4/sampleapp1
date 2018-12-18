export interface Airport {
    code: string;
    name: string;
    city: string;
}

export interface AirportData {
    data: Airport[];
}

export interface ConfigData {
    airports: Airport[];
}


