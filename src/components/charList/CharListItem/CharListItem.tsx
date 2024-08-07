import React, { FC, useRef, useState } from 'react';
import { CharacterShort } from '../../../types/types';

const CharListItem: FC<{chars: CharacterShort[] | null, selectChar: (id: number) => void}> = ({chars, selectChar}) => {
    const [selected, setSelected] = useState(-1);

    const onSelectItem = (newActive: number) => {
        setSelected(newActive);
        selectChar(newActive);
    }

    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    if(!chars) {
        return null;
    } else {
        return(
            <ul className="char__grid">
                {chars.map((item, index) => (
                    <li key={item.id} 
                        tabIndex={0}
                        className={(item.id === selected) ? "char__item char__item_selected" : "char__item"}
                        ref={el => itemRefs.current[index] = el} 
                        onClick={() => onSelectItem(item.id)}
                        onKeyDown={(e) => {
                            if(e.key === " " || e.key === "Enter") {
                                onSelectItem(item.id);
                            }
                        }}>
                        <img src={item.thumbnail} alt={item.name}
                            className={(item.thumbnail.indexOf('image_not_available') === -1) ? "" : "char__item_nf"}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                ))}
            </ul>
        )
    }
}

export default CharListItem;