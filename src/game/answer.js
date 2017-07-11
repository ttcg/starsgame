import React from 'react';

export class Answer extends React.Component {
    

    render() {
        return (
            <div className="col-md-5 card">                
                {this.props.chosenNumbers.map((number, i) =>
                    <span key={i} className="num"
                        onClick = {() => this.props.answerClick(number)}>
                        {number}
                    </span>
                )}
            </div>
        );
    }
}