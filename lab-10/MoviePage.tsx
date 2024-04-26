import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TEntry, TEntryResponse } from './types';

const fetcher = async (
    id: string,
    successCallback: (r: TEntry | null) => void,
    errorCallback: (e: string | null) => void
) => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=197a5b5f&i=${encodeURIComponent(id)}&plot=full`);
    const json = await (response.json() as Promise<TEntryResponse>);
    if (json.Response === 'True') {
        errorCallback(null);
        successCallback(json);
    } else {
        errorCallback(json.Error);
        successCallback(null);
    }
};

const MoviePage: FC = () => {
    const { id = '' } = useParams<{ id: string }>();
    const [info, setInfo] = useState<TEntry | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetcher(id, setInfo, setError);
    }, [id]);

    if (error) {
        return (
            <>
                <h1>{error}</h1>
                <Link to="/">Go back</Link>
            </>
        );
    }

    return (
        <div className="movie-page">
            <img className="poster" src={info?.Poster} alt={info?.Title} />
            <div className="info">
                <h1>{info?.Title}</h1>
                <p>
                    A {info?.Year} {info?.Type}
                </p>
                <hr />
                <p>{info?.Plot}</p>
                <Link to="/">Go back</Link>
            </div>
        </div>
    );
};

export default MoviePage;
