import React, { FC, useEffect, useState } from "react";
import "./CharInfo.scss";
import { CharacterInfo } from "../../types/types";
import Skeleton from "../skeleton/Skeleton";
import CharInfoView from "./CharInfoView/CharInfoView";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../app/errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

const CharInfo: FC<{charId: number | null}> = ({charId}) => {
    const [character, setCharacter] = useState<CharacterInfo | null>(null);

    const {loading, error, getCharacterInfo} = MarvelService();

    function updateInfoChar(id: number) {
        getCharacterInfo(id).then(res => {
            if(res) {
                setCharacter(res);
            }
        });
    }

    const onUpdateInfoChar = (id: number | null) => {
        if(id) {
            updateInfoChar(id);
        }
    }

    useEffect(() => {
        onUpdateInfoChar(charId);
    }, [charId]);

    return (
        <div className="char__info">
            {!character && <Skeleton />}
            {error && <ErrorMessage/>}
            {loading && <Spinner/>}
            {!(error || loading || !character) && <CharInfoView char={character}/>}
        </div>
    )
}

export default CharInfo;