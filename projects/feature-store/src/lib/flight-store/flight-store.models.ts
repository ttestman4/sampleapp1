import { Time } from '@angular/common';
import { EntityState } from '@ngrx/entity';

export enum TravelType {
    OneWay = 'One way',
    Return = 'Round trip',
    MultiCity = 'Multi-city',
}
interface FlightDetailsCore {
    origin: string;
    destination: string;
    date: Date;
    travelOrder: number;
}

export interface FlightSearchDetail extends FlightDetailsCore {
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

export enum PassengerType {
    Adult = 'Adult',
    Child = 'Child',
    InfantInSeat = 'Infant in Seat',
    InfantOnLap = 'Infant on Lap',
}

export interface Passenger {
    type: PassengerType;
    count: number;
}

export enum TravelClass {
    Economy = 'Economy',
    PremiumEconomy = 'Premium Economy',
    Business = 'Business',
    FirstClass = 'FirstClass',
}

export interface Criteria {
    flightSearchDetails: EntityState<FlightSearchDetail>;
    passengers: Passenger[];
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
    flightDetails: FlightResultDetail[];
    sortBy: ResultSortBy;
}

export interface SearchState {
    criteria: Criteria;
    result: Result;
}
