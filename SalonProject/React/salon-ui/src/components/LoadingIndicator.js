import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
// import { Subject } from 'rxjs';

const Container = styled.div`  
    progress{
        margin-right: 2500px;
    }

    progress[value] {
        width: ${props => props.width}
    }

  .form-center {
    position: absolute !important;
    left: 75%;
    right: 75%;
  }
`;

const ProgressBar = () => {
    return(
        <Container color="lightBk-lue" width="250px">
            <progress value={100} max={100} />
            {/* <span>{(value / max) * 100}%</span>  */}
        </Container>
    );
};

ProgressBar.propTypes = {
    value: PropTypes.number,
    max: PropTypes.number,
}

ProgressBar.defaultProps = {
    max:100,
    color: "lightBk-lue",
    width: "250px"
}

export default ProgressBar;

