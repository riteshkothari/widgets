import React, {useState, useEffect} from "react";
import axios from 'axios';
import Accordion from "./Accordion";

const Search = () => {
    const [term, setTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    useEffect( () => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        }
    },[term]);
    
    useEffect(() => {
        const search = async() => {
            var baseUrl = `https://en.wikipedia.org/w/api.php`
            
            const {data} = await axios.get(baseUrl, { 
                params : {
                    action: 'query',
                    list: 'search',
                    format: 'json',
                    origin: '*',
                    srsearch: debouncedTerm
                }
            });

            setResults(data.query.search);
        };

        debouncedTerm && search();

    }, [debouncedTerm]);

    const renderedResults = results.map( (result) => {
        return (
            <div className="item" key={result.pageid}>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <br/>
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
                <div className="extra">
                    <div className="ui right floated content">
                        <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
                    </div>
                </div>
            </div>
        )
    })

    return ( 
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input className="input" value={term} 
                        onChange={(e) => setTerm(e.target.value)}>
                    </input>
                </div>
            </div>
            <div className="ui divided items">
                {renderedResults}
            </div>
        </div>
    );
}

export default Search;