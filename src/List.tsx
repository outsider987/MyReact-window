import classNames from 'classnames';
import React, { useEffect, useState, useRef, ComponentType, Component, ElementType } from 'react';
import shortid from 'shortid';


interface Props {
    height: number;
    rowheight: number;
    itemCount: number;
    index?: number;
    Children: ({ index }: ListChildComponentProps) => JSX.Element;
}

export interface ListChildComponentProps {
    index: number;
}

const List = ({ height, rowheight, itemCount, Children }: Props) => {
    const Rows = Array.from(Array(itemCount).keys());
    const currentIndex = useRef(0);
    let value2 = height / rowheight;
    value2 += 2;
    const [maxValue, setMaxValue] = useState(value2);

    useEffect(() => {
        let rowHeight = 0;
        const elementArrary2 = Array.prototype.slice.call(document.getElementsByClassName('tr')) as HTMLDivElement[];
        rowHeight = elementArrary2[0].clientHeight;

        const options = {
            root: document.getElementById('List'),
            rootMargin: `-${rowHeight}px 0px -${rowHeight}px 0px`,
            threshold: 0,
        };

        const onEnterView = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            for (let entry of entries) {
                if (entry.isIntersecting) {
                    const element = entry.target as HTMLDivElement;
                    const value = parseInt(element.style.top.split('hv')[0]);

                    if (value > height && value > currentIndex.current * rowheight) {
                        const reangeValue = value - height;
                        currentIndex.current = reangeValue / rowheight;
                        setMaxValue(value2 + currentIndex.current);

                        // const elementArrary = Array.prototype.slice.call(document.getElementsByClassName('tr'));
                    } else if (0 !== currentIndex.current && value <= currentIndex.current * rowheight) {
                        currentIndex.current = value / rowheight;
                        currentIndex.current -= 1;
                        setMaxValue(value2 + currentIndex.current > height ? height : value2 + currentIndex.current);
                    }
                }
            }
        };
        const watcher = new IntersectionObserver(onEnterView, options);
        const elementArrary = Array.prototype.slice.call(document.getElementsByClassName('tr'));
        for (let image of elementArrary) {
            watcher.observe(image);
        }
    }, [maxValue]);
   
    return (
        <div style={{ maxHeight: `${height}vh`, overflow: 'auto' }} id='List' className={classNames(` overflow-auto w-full relative`)}>
            <div
                className={`block  `}
                style={{
                    position: 'relative',
                    height: `${Rows?.length ? Rows?.length * rowheight : 2 * rowheight}vh`,
                }}
            >
                {Rows?.slice(currentIndex.current, maxValue).map((item, index) => (
                    <div
                        key={shortid.generate()}
                        className={`tr absolute`}
                        style={{
                            top: `${(index + currentIndex.current) * rowheight}vh`,
                            position: 'absolute',
                        }}
                    >
                        <Children index={index + currentIndex.current}></Children>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default List;
