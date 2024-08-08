import React, { FC } from "react";
import { Comic } from "../../../types/types";

const ComicsListItem: FC<{comics: Comic[] | null}> = ({comics}) => {
    const onSelectItem = (id: number) => {
        // here will be redirect soon
        return id;
    }

    if(comics) {
        return (
            <ul className="comics__grid">
                {comics.map((item, index) => (
                    <li key={index} 
                        tabIndex={0}
                        className="comics__item"
                        onClick={() => onSelectItem(item.id)}
                        onKeyDown={(e) => {
                            if(e.key === " " || e.key === "Enter") {
                                onSelectItem(item.id);
                            }
                        }}>
                        <a href="#">
                            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </a>
                    </li>
                ))}
            </ul>
        )
    } else {
        return null;
    }
}

export default ComicsListItem;