import React, { Component } from "react";
import LocalizedContextValue from "../../../Models/Types/LocalizedContextValue.js";
import translations from '../../../Presentation/translation/translations.json';
import LocalizedContext from "./LocalizedContext";
import LocalizedContextProviderState from './LocalizedContextProviderState';

export default class LocalizedContextProvider extends Component<{}, LocalizedContextProviderState> {
    
    static SUPPORTED_LANGUAGES = ['fr', 'en'];

    state = {
        language : "en"
    }

    private _translate = (key : string) : string => {
        const { language } = this.state;
        const localizations : { 
            [key : string] : {
                [key : string] : string
            }
        } = translations;

        try {
            return localizations[key][language];
        } catch (error) {
            return `[${key}]`;
        }
    }

    private _changeLanguage = (language : string) : void => {
        if (!LocalizedContextProvider.SUPPORTED_LANGUAGES.includes(language)) {
            throw new Error(`Unsupported language: ${language}`);
        }

        this.setState({ language });
    }

    private _computeProviderValue = () : LocalizedContextValue => {
        return {
            language : this.state.language,
            supportedLanguages : LocalizedContextProvider.SUPPORTED_LANGUAGES,
            changeLanguage : this._changeLanguage,
            translate : this._translate,
        };
    }

    render() {
        return (
            <LocalizedContext.Provider value={this._computeProviderValue()}>
                {this.props.children}
            </LocalizedContext.Provider>
        );
    }
}