import { Time } from '@angular/common';

export enum TravelType {
    OneWay = 'One way',
    Return = 'Round trip',
    // MultiCity = 'Multi-city',
}
interface FlightDetailsCore {
    origin: string;
    destination: string;
    date: Date;
    travelOrder: number;
}

export interface FlightSearchDetails extends FlightDetailsCore {
    departureAfterTime: Time;
    departureBeforeTime: Time;
}

export interface FlightResultDetail extends FlightDetailsCore {
    name: string;
    departureTime: Time ;
    arrivalTime: Time ;
    duration: Time;
    price: number;
    flightNo: string;
    stops: number;
    multiple?: FlightResultDetail[];
}

export enum TravelClass {
    Economy = 'Economy',
    PremiumEconomy = 'Premium Economy',
    Business = 'Business',
    FirstClass = 'FirstClass',
}

export interface Criteria {
    flightSearchDetails: FlightSearchDetails[];
    passengers: number;
    travelType: TravelType;
    travelClass: TravelClass;
    bags: number;
    stops: number;
    price: number;

}

export enum ResultSortBy {
    BestFlights = 'Best Flights',
    Price = 'Price',
    DepartureTime = 'Departure time',
    ArrivalTime = 'Arrival time',
    Duration = 'Duration',
}

export interface Result {
    flightDetails: FlightResultDetail[][];
    sortBy: ResultSortBy;
}

export interface SearchState {
    criteria: Criteria;
    result: Result;
}
