import { FC, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import Card from './Card';
import { TEntry, TEntryType, TSearchResponse } from './types';

const fetcher = debounce(
    async (
        search: string,
        typeFilter: string,
        successCallback: (r: TEntry[] | null) => void,
        errorCallback: (e: string | null) => void
    ) => {
        if (search.length) {
            const response = await fetch(
                `http://www.omdbapi.com/?apikey=197a5b5f&s=${encodeURIComponent(search)}&type=${typeFilter}`
            );
            const json: TSearchResponse = await response.json();
            if (json.Response === 'True') {
                successCallback(json.Search);
                errorCallback(null);
            } else {
                errorCallback(json.Error);
            }
        } else {
            successCallback(null);
            errorCallback(null);
        }
    },
    500,
    { trailing: true }
);

const categories = {
    all: '',
    movie: 'movie',
    series: 'series',
    episode: 'episode',
} as const;

const Catalog: FC = () => {
    const [searchString, setSearchString] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<TEntryType>('');
    const [lastSearchResults, setLastSearchResults] = useState<TEntry[] | null>(null);
    const [searchError, setSearchError] = useState<string | null>(null);

    useEffect(() => {
        fetcher(searchString, categoryFilter, setLastSearchResults, setSearchError);
    }, [searchString, categoryFilter]);

    const applyFilter = (category: TEntryType) => {
        setCategoryFilter(category);
    };

    return (
        <>
            <header className="col">
                <div className="row">
                <h1>Full Catalog</h1>
                <div className="filter">
                    {Object.entries(categories).map(([categoryKey, categoryValue]) => (
                        <button
                            key={categoryKey}
                            className={categoryFilter === categoryValue ? 'active' : undefined}
                            onClick={() => applyFilter(categoryValue)}
                        >
                            {categoryKey}
                        </button>
                    ))}
                </div>
                </div>
                <input
                    type="text"
                    placeholder="Search Cinema"
                    value={searchString}
                    onChange={(e) => setSearchString(e.currentTarget.value)}
                />
            </header>
            <div className="catalog">
                {(searchError && <span className="gray">{searchError}</span>) ??
                    lastSearchResults?.map((info) => <Card key={info.imdbID} info={info} />) ?? (
                        <span className="gray"></span>
                    )}
            </div>
        </>
    );
};

export default Catalog;
