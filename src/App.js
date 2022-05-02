import React from 'react';
import Accordion from './Components/Accordion';
import Search from './Components/Search';

const items = [
    {
        title: 'What is React',
        content: 'React is a fontend javascript framework'
    },
    {
        title: 'Why use React?',
        content: 'React is favorite JS library among developers'
    },
    {
        title: "How do we use React",
        content: "You use React by creating components"
    }
]

export default () => {
    return (
        <div>
            <br/>
            <Search></Search>
            {/* <Accordion items={items}/> */}
        </div>
    );
}