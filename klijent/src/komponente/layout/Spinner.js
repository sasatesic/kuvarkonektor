import React, {Fragment} from "react";
import { Link, Redirect } from 'react-router-dom'
import spinner from './spinner.gif';

const Spinner = ({ odradjenaAutentikacija }) => {

    if(odradjenaAutentikacija) {
        return <Redirect to="/glavna"/>
    }

    return (
        <Fragment>
            <img
                src={spinner}
                style={{width: '200px', margin: 'auto', display: 'block'}}
                alt={'Loading...'}
            />
        </Fragment>
    );
};

export default Spinner;
