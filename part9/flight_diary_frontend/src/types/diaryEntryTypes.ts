export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
}

export interface initialEmptyDiary {
    date: string;
    weather: string;
    visibility: string;
    comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>