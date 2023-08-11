import { DiaryEntry } from "../types/diaryEntryTypes";

interface EntriesListProps {
    diaries: DiaryEntry[],
}

const diaryListStyles = {
    listStyle: "none",
}

const EntriesList = (props: EntriesListProps) => {

    const allDiaries = props.diaries;

    if (!allDiaries) {
        return (
            <p>no diary entries found...</p>
        )
    }

    return (
        <div className="diary-list-wrap">
        <h2>Diary entries</h2>
        <ul style={diaryListStyles}>
            {allDiaries.map(diary => 
            <li key={diary.id}>
                <h3>{diary.date}</h3>
                <div>
                <p>visibility: {diary.visibility}</p>
                <p>weather: {diary.weather}</p>
                </div>
                <p>{diary.comment}</p>
            </li>
            )}
        </ul>
        </div>
    )
};

export default EntriesList