import React, { FC, useState } from 'react';
import { CharacterShort } from '../../../types/types';

const CharListItem: FC<{chars: CharacterShort[] | null, selectChar: (id: number) => void}> = ({chars, selectChar}) => {
    const [selected, setSelected] = useState(-1);

    const onSelectItem = (newActive: number) => {
        setSelected(newActive);
        selectChar(newActive);
    }

    if(!chars) {
        return null;
    } else {
        return(
            <ul className="char__grid">
                {chars.map(item => (
                    <li key={item.id} className={(item.id === selected) ? "char__item char__item_selected" : "char__item"} 
                        onClick={() => onSelectItem(item.id)}>
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