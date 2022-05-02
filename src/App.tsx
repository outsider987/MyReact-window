import List from './List';

import './index.css';
import React, { PropsWithChildren, } from 'react';
interface RowProps extends PropsWithChildren<unknown> {
    index?:number
}

export default function App() {
    const Row = (props?: RowProps) => {
        return <div>Row {props !== undefined ? props.index : 1}</div>;
    };
    
    return (
        <div className='App'>
            <div className='flex w-full'>
                <List height={50} rowheight={5} itemCount={50} Children={Row}></List>
            </div>
        </div>
    );
}
