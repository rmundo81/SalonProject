import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
// import { Subject } from 'rxjs';

const Container = styled.div`  
    progress{
        margin-right: 8px;
    }

    progress[value] {
        width: ${props => props.width}
    }

  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

const ProgressBar = ({ value, max, color, width }) => {
    console.log("Value = "+value);
    return(
        <Container color={color} width={width}>
            <progress value={value} max={max} />
            <span>{(value / max) * 100}%</span> 
        </Container>
    );
};

ProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
    max: PropTypes.number,
}

ProgressBar.defaultProps = {
    max:100,
    color: "lightBk-lue",
    width: "250px"
}

export default ProgressBar;

