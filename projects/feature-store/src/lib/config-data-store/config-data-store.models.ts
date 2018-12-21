export interface Airport {
    code: string;
    name: string;
    city: string;
    displayText: string;
}

export interface ConfigData {
    airports: Airport[];
}
