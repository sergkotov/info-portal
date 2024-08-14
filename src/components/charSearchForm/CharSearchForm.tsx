import React, { FC, useState } from "react";
import { Form, Formik, Field, ErrorMessage as FormikErrorMessage } from "formik";
import './CharSearchForm.scss';
import MarvelService from "../../services/MarvelService";
import * as Yup from "yup";
import { Character } from "../../types/types";
import ErrorMessage from "../app/errorMessage/ErrorMessage";
import { Link } from "react-router-dom";


const CharSearchForm: FC = () => {
    const [char, setChar] = useState<Character[] | null>(null);
    const {loading, error, getCharacterByName, clearError} = MarvelService();
    
    const onCharLoaded = (char: Character[]) => {
        setChar(char);
    }

    const updateChar = (charName: string) => {
        clearError();
        getCharacterByName(charName)
            .then(onCharLoaded)
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{ charName: '' }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('Name is Required')
                })}
                onSubmit={({charName}) => {
                    updateChar(charName);
                }}
                >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm;